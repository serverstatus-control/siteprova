import {
  categories,
  services,
  uptimeHistory,
  incidents,
  users,
  type Category,
  type Service,
  type UptimeHistory,
  type Incident,
  type User,
  type InsertCategory,
  type InsertService,
  type InsertUptimeHistory,
  type InsertIncident,
  type InsertUser,
  StatusType,
  type UpdateServiceStatus
} from "../shared/schema.ts";
import session from "express-session";
import connectPg from "connect-pg-simple";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Services
  getServices(): Promise<Service[]>;
  getServiceById(id: number): Promise<Service | undefined>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  getServicesByCategory(categoryId: number): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateServiceStatus(id: number, status: UpdateServiceStatus): Promise<Service | undefined>;

  // Uptime History
  getUptimeHistory(serviceId: number, limit?: number): Promise<UptimeHistory[]>;
  createUptimeHistory(history: InsertUptimeHistory): Promise<UptimeHistory>;

  // Incidents
  getIncidents(serviceId: number, limit?: number): Promise<Incident[]>;
  createIncident(incident: InsertIncident): Promise<Incident>;
  updateIncident(id: number, incident: Partial<InsertIncident>): Promise<Incident | undefined>;

  // Users
  getUserById(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Stats
  getStatusSummary(): Promise<{
    operational: number;
    degraded: number;
    down: number;
    lastChecked: Date;
  }>;
  
  // Session store for authentication
  sessionStore: any;
}

export class MemStorage implements IStorage {
  private categories: Map<number, Category>;
  private services: Map<number, Service>;
  private history: Map<number, UptimeHistory>;
  private incidents: Map<number, Incident>;

  private categoryCurrentId: number;
  private serviceCurrentId: number;
  private historyCurrentId: number;
  private incidentCurrentId: number;

  constructor() {
    this.categories = new Map();
    this.services = new Map();
    this.history = new Map();
    this.incidents = new Map();

    this.categoryCurrentId = 1;
    this.serviceCurrentId = 1;
    this.historyCurrentId = 1;
    this.incidentCurrentId = 1;

    // Initialize with sample data
    this.initializeData();
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug
    );
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryCurrentId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Services
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getServiceById(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    return Array.from(this.services.values()).find(
      (service) => service.slug === slug
    );
  }

  async getServicesByCategory(categoryId: number): Promise<Service[]> {
    return Array.from(this.services.values()).filter(
      (service) => service.categoryId === categoryId
    );
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = this.serviceCurrentId++;
    const service: Service = { 
      ...insertService, 
      id, 
      lastChecked: new Date(),
      uptimePercentage: 100
    };
    this.services.set(id, service);
    return service;
  }

  async updateServiceStatus(id: number, status: UpdateServiceStatus): Promise<Service | undefined> {
    const service = this.services.get(id);
    if (!service) return undefined;

    const updatedService: Service = {
      ...service,
      status: status.status,
      lastChecked: new Date(),
      responseTime: status.responseTime !== undefined ? status.responseTime : service.responseTime,
    };
    this.services.set(id, updatedService);
    return updatedService;
  }

  // Uptime History
  async getUptimeHistory(serviceId: number, limit = 7): Promise<UptimeHistory[]> {
    const histories = Array.from(this.history.values())
      .filter((history) => history.serviceId === serviceId)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
    
    return histories.slice(0, limit);
  }

  async createUptimeHistory(insertHistory: InsertUptimeHistory): Promise<UptimeHistory> {
    const id = this.historyCurrentId++;
    const history: UptimeHistory = { ...insertHistory, id };
    this.history.set(id, history);
    return history;
  }

  // Incidents
  async getIncidents(serviceId: number, limit = 5): Promise<Incident[]> {
    const serviceIncidents = Array.from(this.incidents.values())
      .filter((incident) => incident.serviceId === serviceId)
      .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
    
    return serviceIncidents.slice(0, limit);
  }

  async createIncident(insertIncident: InsertIncident): Promise<Incident> {
    const id = this.incidentCurrentId++;
    const incident: Incident = { ...insertIncident, id };
    this.incidents.set(id, incident);
    return incident;
  }

  async updateIncident(id: number, incidentUpdate: Partial<InsertIncident>): Promise<Incident | undefined> {
    const incident = this.incidents.get(id);
    if (!incident) return undefined;

    const updatedIncident: Incident = { ...incident, ...incidentUpdate };
    this.incidents.set(id, updatedIncident);
    return updatedIncident;
  }

  // Stats
  async getStatusSummary(): Promise<{
    operational: number;
    degraded: number;
    down: number;
    lastChecked: Date;
  }> {
    const services = await this.getServices();
    const operational = services.filter(s => s.status === StatusType.UP).length;
    const degraded = services.filter(s => s.status === StatusType.DEGRADED).length;
    const down = services.filter(s => s.status === StatusType.DOWN).length;

    // Find the most recent check
    let lastChecked = new Date(0);
    services.forEach(service => {
      if (service.lastChecked > lastChecked) {
        lastChecked = service.lastChecked;
      }
    });

    return {
      operational,
      degraded,
      down,
      lastChecked: lastChecked
    };
  }

  // Users
  async getUserByEmail(email: string): Promise<User | undefined> {
    // Per l'implementazione in memoria, simula un utente di test
    if (email === "test@example.com") {
      return {
        id: 1,
        username: "test",
        password: "hashedpassword",
        email: "test@example.com",
        role: UserRole.USER,
        createdAt: new Date()
      };
    }
    return undefined;
  }

  // Helper method to seed initial data
  private initializeData() {
    // Initialize categories
    const categoriesData: InsertCategory[] = [
      { name: 'Games', icon: 'fa-gamepad', slug: 'games' },
      { name: 'Browser & AI', icon: 'fa-globe', slug: 'browser-ai' },
      { name: 'Social', icon: 'fa-users', slug: 'social' },
      { name: 'Connection', icon: 'fa-wifi', slug: 'connection' },
      { name: 'Bank', icon: 'fa-landmark', slug: 'bank' },
      { name: 'Streaming', icon: 'fa-play', slug: 'streaming' },
      { name: 'Mail', icon: 'fa-envelope', slug: 'mail' },
      { name: 'Shopping', icon: 'fa-shopping-cart', slug: 'shopping' },
      { name: 'Various', icon: 'fa-ellipsis-h', slug: 'various' }
    ];

    categoriesData.forEach(category => {
      this.createCategory(category);
    });

    // Initialize services
    const servicesData: InsertService[] = [
      // Games
      { name: 'Steam', logo: 'fab fa-steam', categoryId: 1, status: StatusType.UP, responseTime: 118, slug: 'steam' },
      { name: 'Roblox', logo: 'fas fa-cube', categoryId: 1, status: StatusType.DEGRADED, responseTime: 342, slug: 'roblox' },
      { name: 'Epic Games', logo: 'fas fa-gamepad', categoryId: 1, status: StatusType.UP, responseTime: 98, slug: 'epic-games' },
      { name: 'Rockstar', logo: 'fas fa-star', categoryId: 1, status: StatusType.DOWN, responseTime: 0, slug: 'rockstar' },
      { name: 'Mojang', logo: 'fas fa-cube', categoryId: 1, status: StatusType.UP, responseTime: 125, slug: 'mojang' },
      { name: 'Xbox', logo: 'fab fa-xbox', categoryId: 1, status: StatusType.UP, responseTime: 104, slug: 'xbox' },
      { name: 'PlayStation', logo: 'fab fa-playstation', categoryId: 1, status: StatusType.UP, responseTime: 112, slug: 'playstation' },
      
      // Browser & AI
      { name: 'Google', logo: 'fab fa-google', categoryId: 2, status: StatusType.UP, responseTime: 56, slug: 'google' },
      { name: 'Open AI', logo: 'fas fa-robot', categoryId: 2, status: StatusType.DEGRADED, responseTime: 487, slug: 'openai' },
      { name: 'Microsoft', logo: 'fab fa-microsoft', categoryId: 2, status: StatusType.UP, responseTime: 78, slug: 'microsoft' },
      { name: 'Chrome', logo: 'fab fa-chrome', categoryId: 2, status: StatusType.UP, responseTime: 64, slug: 'chrome' },
      
      // Social
      { name: 'Twitter (X)', logo: 'fab fa-twitter', categoryId: 3, status: StatusType.UP, responseTime: 124, slug: 'twitter' },
      { name: 'Meta', logo: 'fab fa-facebook', categoryId: 3, status: StatusType.UP, responseTime: 143, slug: 'meta' },
      { name: 'TikTok', logo: 'fab fa-tiktok', categoryId: 3, status: StatusType.UP, responseTime: 165, slug: 'tiktok' },
      { name: 'Discord', logo: 'fab fa-discord', categoryId: 3, status: StatusType.DEGRADED, responseTime: 222, slug: 'discord' },
      
      // Connection
      { name: 'Vodafone', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 76, slug: 'vodafone' },
      { name: 'TIM', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 82, slug: 'tim' },
      
      // Streaming
      { name: 'Netflix', logo: 'fas fa-film', categoryId: 6, status: StatusType.UP, responseTime: 97, slug: 'netflix' },
      { name: 'YouTube', logo: 'fab fa-youtube', categoryId: 6, status: StatusType.UP, responseTime: 88, slug: 'youtube' },
      { name: 'Twitch', logo: 'fab fa-twitch', categoryId: 6, status: StatusType.DOWN, responseTime: 0, slug: 'twitch' }
    ];

    servicesData.forEach(service => {
      this.createService(service);
    });

    // Initialize uptime history
    const today = new Date();
    const createHistory = (serviceId: number, daysBack: number, uptimePercentage: number, status: string) => {
      const date = new Date();
      date.setDate(today.getDate() - daysBack);
      
      this.createUptimeHistory({
        serviceId,
        date,
        uptimePercentage,
        status: status as any,
        responseTime: Math.floor(Math.random() * 200) + 50
      });
    };

    // Steam history
    for (let i = 0; i < 7; i++) {
      // For Steam
      createHistory(1, i, i === 1 ? 99.1 : 100, i === 1 ? StatusType.DEGRADED : StatusType.UP);
      
      // For Roblox - with degraded performance on more recent days
      createHistory(2, i, i < 2 ? 95.2 : 100, i < 2 ? StatusType.DEGRADED : StatusType.UP);
      
      // For Rockstar - with downtime on recent days
      createHistory(4, i, i < 3 ? 80 : 100, i < 3 ? StatusType.DOWN : StatusType.UP);
    }

    // Create some incidents
    const steamIncidents = [
      {
        serviceId: 1,
        title: 'API Outage',
        description: 'Steam API services experienced downtime affecting login and purchases.',
        startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 8, 14, 23),
        endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 8, 17, 42),
        status: StatusType.DOWN
      },
      {
        serviceId: 1,
        title: 'Performance Degradation',
        description: 'Game downloads were slower than normal due to CDN issues.',
        startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10, 9, 14),
        endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10, 11, 47),
        status: StatusType.DEGRADED
      }
    ];

    steamIncidents.forEach(incident => {
      this.createIncident(incident);
    });

    const rockstarIncidents = [
      {
        serviceId: 4,
        title: 'Major Outage',
        description: 'All Rockstar services are currently experiencing a major outage.',
        startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 10, 15),
        endTime: null,
        status: StatusType.DOWN
      }
    ];

    rockstarIncidents.forEach(incident => {
      this.createIncident(incident);
    });
  }
}

import { db } from './db';
import { and, desc, eq, gte, lte, sql } from 'drizzle-orm';

export class DatabaseStorage implements IStorage {
  sessionStore: any;

  constructor() {
    const PostgresStore = connectPg(session);
    this.sessionStore = new PostgresStore({
      conObject: {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === "production"
      },
      createTableIfMissing: true
    });
  }
  // Categories
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category;
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [inserted] = await db.insert(categories).values(category).returning();
    return inserted;
  }

  // Services
  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getServiceById(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.slug, slug));
    return service;
  }

  async getServicesByCategory(categoryId: number): Promise<Service[]> {
    return await db.select().from(services).where(eq(services.categoryId, categoryId));
  }

  async createService(service: InsertService): Promise<Service> {
    const [inserted] = await db.insert(services).values({
      ...service,
      lastChecked: new Date(),
      uptimePercentage: 100
    }).returning();
    return inserted;
  }

  async updateServiceStatus(id: number, status: UpdateServiceStatus): Promise<Service | undefined> {
    const [updated] = await db.update(services)
      .set({
        status: status.status,
        lastChecked: new Date(),
        responseTime: status.responseTime !== undefined ? status.responseTime : undefined,
      })
      .where(eq(services.id, id))
      .returning();
    return updated;
  }

  // Uptime History
  async getUptimeHistory(serviceId: number, limit = 7): Promise<UptimeHistory[]> {
    return await db.select()
      .from(uptimeHistory)
      .where(eq(uptimeHistory.serviceId, serviceId))
      .orderBy(desc(uptimeHistory.date))
      .limit(limit);
  }

  async createUptimeHistory(history: InsertUptimeHistory): Promise<UptimeHistory> {
    const [inserted] = await db.insert(uptimeHistory).values(history).returning();
    return inserted;
  }

  // Incidents
  async getIncidents(serviceId: number, limit = 5): Promise<Incident[]> {
    return await db.select()
      .from(incidents)
      .where(eq(incidents.serviceId, serviceId))
      .orderBy(desc(incidents.startTime))
      .limit(limit);
  }

  async createIncident(incident: InsertIncident): Promise<Incident> {
    const [inserted] = await db.insert(incidents).values(incident).returning();
    return inserted;
  }

  async updateIncident(id: number, incidentUpdate: Partial<InsertIncident>): Promise<Incident | undefined> {
    const [updated] = await db.update(incidents)
      .set(incidentUpdate)
      .where(eq(incidents.id, id))
      .returning();
    return updated;
  }
  
  // Users
  async getUserById(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [inserted] = await db.insert(users).values(user).returning();
    return inserted;
  }

  // Stats
  async getStatusSummary(): Promise<{
    operational: number;
    degraded: number;
    down: number;
    lastChecked: Date;
  }> {
    // Get counts of services by status
    const results = await db.execute(sql`
      SELECT 
        SUM(CASE WHEN status = ${StatusType.UP} THEN 1 ELSE 0 END) as operational,
        SUM(CASE WHEN status = ${StatusType.DEGRADED} THEN 1 ELSE 0 END) as degraded,
        SUM(CASE WHEN status = ${StatusType.DOWN} THEN 1 ELSE 0 END) as down,
        MAX(last_checked) as last_checked
      FROM ${services}
    `);
    
    const summary = results.rows[0];
    
    return {
      operational: Number(summary.operational) || 0,
      degraded: Number(summary.degraded) || 0,
      down: Number(summary.down) || 0,
      lastChecked: summary.last_checked ? new Date(summary.last_checked) : new Date()
    };
  }
}

// Uncomment to use memory storage for development
// export const storage = new MemStorage(); 

// Use database storage
export const storage = new DatabaseStorage();
