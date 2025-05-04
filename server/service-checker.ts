import axios, { AxiosRequestConfig } from 'axios';
import { storage } from './storage';
import { StatusType, type Service, type InsertUptimeHistory, type InsertIncident } from '../shared/schema.ts';

interface CheckResult {
  status: typeof StatusType[keyof typeof StatusType];
  responseTime: number;
}

export async function checkService(service: Service): Promise<CheckResult> {
  const startTime = Date.now();
  let status = StatusType.UP;
  let responseTime = 0;
  
  try {
    // Build the URL from the service slug
    const url = getServiceURL(service);
    
    const options: AxiosRequestConfig = {
      timeout: 10000, // 10 seconds timeout
      validateStatus: () => true,  // Don't throw on error status codes
    };
    
    const response = await axios.get(url, options);
    responseTime = Date.now() - startTime;
    
    // Check status code
    if (response.status >= 500) {
      status = StatusType.DOWN;
    } else if (response.status >= 400 || responseTime > 5000) {
      status = StatusType.DEGRADED;
    }
  } catch (error) {
    // Network error or timeout
    status = StatusType.DOWN;
  }
  
  return { status, responseTime: status === StatusType.DOWN ? 0 : responseTime };
}

function getServiceURL(service: Service): string {
  // Map service names/slugs to actual URLs
  const urlMap: Record<string, string> = {
    'google': 'https://www.google.com',
    'youtube': 'https://www.youtube.com',
    'meta': 'https://www.facebook.com',
    'twitter': 'https://twitter.com',
    'discord': 'https://discord.com',
    'steam': 'https://store.steampowered.com',
    'netflix': 'https://www.netflix.com',
    'twitch': 'https://www.twitch.tv',
    'microsoft': 'https://www.microsoft.com',
    'openai': 'https://chat.openai.com',
    'epic-games': 'https://www.epicgames.com',
    'rockstar': 'https://www.rockstargames.com',
    'mojang': 'https://www.minecraft.net',
    'roblox': 'https://www.roblox.com',
    'tiktok': 'https://www.tiktok.com',
    'vodafone': 'https://www.vodafone.com',
    'tim': 'https://www.tim.it',
    'chrome': 'https://www.google.com/chrome',
    'playstation': 'https://www.playstation.com',
    'xbox': 'https://www.xbox.com',
  };
  
  // Get URL from map or fallback to generic URL
  return urlMap[service.slug] || `https://www.${service.slug}.com`;
}

async function updateServiceStatus(service: Service, checkResult: CheckResult): Promise<void> {
  // Update service status
  const updatedService = await storage.updateServiceStatus(service.id, {
    status: checkResult.status,
    responseTime: checkResult.responseTime
  });
  
  if (!updatedService) return;
  
  // Record uptime history
  const historyEntry: InsertUptimeHistory = {
    serviceId: service.id,
    date: new Date(),
    status: checkResult.status,
    responseTime: checkResult.responseTime,
    uptimePercentage: checkResult.status === StatusType.UP ? 100 : 
                      checkResult.status === StatusType.DEGRADED ? 95 : 0
  };
  await storage.createUptimeHistory(historyEntry);
  
  // Create incident if status changed to DOWN
  if (service.status !== StatusType.DOWN && checkResult.status === StatusType.DOWN) {
    const incident: InsertIncident = {
      serviceId: service.id,
      title: `${service.name} Outage Detected`,
      description: `Automatic monitoring detected that ${service.name} is currently down.`,
      startTime: new Date(),
      endTime: null,
      status: StatusType.DOWN
    };
    await storage.createIncident(incident);
  }
  
  // Update existing incident if service recovered
  if (service.status === StatusType.DOWN && checkResult.status !== StatusType.DOWN) {
    // Find most recent open incident for this service
    const incidents = await storage.getIncidents(service.id);
    const openIncident = incidents.find(inc => inc.endTime === null);
    
    if (openIncident) {
      await storage.updateIncident(openIncident.id, {
        endTime: new Date(),
        status: checkResult.status
      });
    }
  }
}

export async function checkAllServices(): Promise<Date> {
  const services = await storage.getServices();
  const timestamp = new Date();
  
  // Check each service and update its status
  for (const service of services) {
    try {
      const result = await checkService(service);
      await updateServiceStatus(service, result);
    } catch (error) {
      console.error(`Error checking service ${service.name}:`, error);
    }
  }
  
  return timestamp;
}