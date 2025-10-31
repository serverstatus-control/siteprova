import axios, { AxiosRequestConfig } from 'axios';
import { storage } from './storage';
import { StatusType, type Service, type InsertUptimeHistory, type InsertIncident } from '../shared/schema';
import { updateDailyDowntime } from './downtime-calculator';

interface CheckResult {
  status: typeof StatusType[keyof typeof StatusType];
  responseTime: number;
}

export async function checkService(service: Service): Promise<CheckResult> {
  const startTime = Date.now();
  let status: typeof StatusType[keyof typeof StatusType] = StatusType.UP;
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

  const result = { status, responseTime: status === StatusType.DOWN ? 0 : responseTime };
  
  // Aggiorna il downtime se il servizio è down
  if (status === StatusType.DOWN) {
    await updateDailyDowntime(service.id, new Date());
  }
  
  return result;
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
  'sky-wifi': 'https://www.sky.it',
  'linkem': 'https://www.linkem.com/it/',
  'verymobile': 'https://www.verymobile.it',
  'ho-mobile': 'https://www.ho-mobile.it',
  'eolo': 'https://www.eolo.it',
  'tiscali': 'https://www.tiscali.it',
  'kena': 'https://www.kenamobile.it',
  'postemobile': 'https://www.postemobile.it',
  'coopvoce': 'https://www.coopvoce.it',
    'chrome': 'https://www.google.com/chrome',
    'playstation': 'https://www.playstation.com',
      'virgilio': 'https://mail.virgilio.it',
      'libero': 'https://mail.libero.it',
      'tiscali-mail': 'https://mail.tiscali.it',
    // Added explicit mappings for new services
    'instagram': 'https://www.instagram.com',
    'whatsapp': 'https://www.whatsapp.com',
    'telegram': 'https://telegram.org',
    'reddit': 'https://www.reddit.com',
    'spotify': 'https://www.spotify.com',
    'paypal': 'https://www.paypal.com',
    'prime-video': 'https://www.primevideo.com',
  'tinder': 'https://tinder.com',
  // Browsers extra
  'firefox': 'https://www.mozilla.org/firefox/',
  'edge': 'https://www.microsoft.com/edge',
  'opera': 'https://www.opera.com',
  'duckduckgo': 'https://duckduckgo.com',
    // Streaming extra
    'disney-plus': 'https://www.disneyplus.com',
    'dazn': 'https://www.dazn.com',
    'now': 'https://www.nowtv.com',
    'mediaset-infinity': 'https://mediasetinfinity.mediaset.it',
    'raiplay': 'https://www.raiplay.it',
    'paramount-plus': 'https://www.paramountplus.com',
    'apple-tv-plus': 'https://tv.apple.com',
    'sky-go': 'https://www.sky.it',
  'crunchyroll': 'https://www.crunchyroll.com',
  'sky': 'https://www.sky.it',
  'discovery-plus': 'https://www.discoveryplus.com',
    // Mail
    'gmail': 'https://mail.google.com',
    'outlook': 'https://outlook.live.com',
    'yahoo': 'https://mail.yahoo.com',
    'proton': 'https://mail.proton.me',
    'icloud': 'https://www.icloud.com/mail',
    // Shopping
    'amazon': 'https://www.amazon.com',
    'ebay': 'https://www.ebay.com',
    'aliexpress': 'https://www.aliexpress.com',
    'shein': 'https://www.shein.com',
    'zalando': 'https://www.zalando.com',
  'poste-italiane-shop': 'https://www.poste.it',
  'temu': 'https://www.temu.com',
  'esselunga': 'https://www.esselunga.it',
  'coop': 'https://www.coop.it',
  'conad': 'https://www.conad.it',
  'carrefour': 'https://www.carrefour.it',
  'vinted': 'https://www.vinted.it',
  'ikea': 'https://www.ikea.com',
    // Social extra
    'snapchat': 'https://www.snapchat.com',
    'pinterest': 'https://www.pinterest.com',
    'linkedin': 'https://www.linkedin.com',
    // Dev/Cloud
    'github': 'https://github.com',
    'gitlab': 'https://gitlab.com',
    'cloudflare': 'https://www.cloudflare.com',
    'aws': 'https://aws.amazon.com',
    'azure': 'https://azure.microsoft.com',
    'google-cloud': 'https://cloud.google.com',
    'digitalocean': 'https://www.digitalocean.com',
    'ovh': 'https://www.ovh.com',
    // ISP Italia
    'iliad': 'https://www.iliad.it',
    'windtre': 'https://www.windtre.it',
    'fastweb': 'https://www.fastweb.it',
    // Banche e pagamenti extra
  'credit-agricole': 'https://www.credit-agricole.it/',
  'american-express': 'https://www.americanexpress.com/it-it/',
  'hype': 'https://www.hype.it/',
  'bper': 'https://www.bper.it/',
    'poste-italiane': 'https://www.poste.it',
    'postepay': 'https://postepay.poste.it',
    'n26': 'https://n26.com',
    'ing': 'https://www.ing.com',
    'satispay': 'https://www.satispay.com',
    'stripe': 'https://stripe.com',
    // Giochi/piattaforme
    'battle-net': 'https://www.battle.net',
    'ubisoft': 'https://www.ubisoft.com',
    'riot-games': 'https://www.riotgames.com',
    'gog': 'https://www.gog.com',
    'itch-io': 'https://itch.io',
    // Betting
    'sisal': 'https://www.sisal.it',
    'bet365': 'https://www.bet365.com',
    'betfair': 'https://www.betfair.it',
    'william-hill': 'https://www.williamhill.it',
    'bwin': 'https://www.bwin.it',
    'lottomatica': 'https://www.lottomatica.it',
    'snai': 'https://www.snai.it',
    // Music
    'apple-music': 'https://music.apple.com',
    'youtube-music': 'https://music.youtube.com',
    'amazon-music': 'https://music.amazon.com',
    'deezer': 'https://www.deezer.com',
    'soundcloud': 'https://soundcloud.com',
    'tidal': 'https://tidal.com',
    'shazam': 'https://www.shazam.com',
    'bandcamp': 'https://bandcamp.com',
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
                      checkResult.status === StatusType.DEGRADED ? 95 : 0,
    downtimeMinutes: checkResult.status === StatusType.DOWN ? 5 : 0 // Imposta 5 minuti di downtime per ogni check fallito
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