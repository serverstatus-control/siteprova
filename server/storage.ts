import {
  categories,
  services,
  uptimeHistory,
  incidents,
  users,
  favorites,
  passwordResets,
  type Category,
  type Service,
  type UptimeHistory,
  type Incident,
  type User,
  type PasswordReset,
  type InsertCategory,
  type InsertService,
  type InsertUptimeHistory,
  type InsertIncident,
  type InsertUser,
  StatusType,
  type UpdateServiceStatus,
  UserRole
} from "../shared/schema";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { drizzle } from "drizzle-orm/node-postgres";
import { db } from './db';
import fs from 'fs/promises';
import path from 'path';
import { and, desc, eq, sql } from 'drizzle-orm';

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

  // Password resets
  createPasswordReset(userId: number, token: string, expiresAt: Date): Promise<any>;
  getPasswordResetByToken(token: string): Promise<any | undefined>;
  deletePasswordResetById(id: number): Promise<void>;
  updateUserPassword(userId: number, newHashedPassword: string): Promise<void>;

  // Favorites
  getFavorites(userId: number): Promise<number[]>;
  addFavorite(userId: number, serviceId: number): Promise<void>;
  removeFavorite(userId: number, serviceId: number): Promise<void>;

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
  private categories = new Map<number, Category>();
  private services = new Map<number, Service>();
  private history = new Map<number, UptimeHistory>();
  private incidents = new Map<number, Incident>();
  private users = new Map<number, User>();
  private favorites = new Map<number, Set<number>>();
  private categoryCurrentId = 1;
  private serviceCurrentId = 1;
  private historyCurrentId = 1;
  private incidentCurrentId = 1;
  private passwordResetCurrentId = 1;
  sessionStore: any;

  constructor() {
  this.categories = new Map();
  this.services = new Map();
  this.history = new Map();
  this.incidents = new Map();
  this.users = new Map();
    
    // Initialize session store for memory storage
    // @ts-ignore - dynamic import workaround for ESM
    import('memorystore').then((mod: any) => {
      const MemoryStore = mod.default(session);
      this.sessionStore = new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
      });
    });

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
      uptimePercentage: 100,
      responseTime: insertService.responseTime !== undefined ? insertService.responseTime : null,
      status: insertService.status !== undefined ? String(insertService.status) : String(StatusType.UP),
    } as unknown as Service;
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
  async getUptimeHistory(serviceId: number, limit = 18): Promise<UptimeHistory[]> {
    // In memory mode, return from in-memory history instead of DB
    const items = Array.from(this.history.values())
      .filter(h => h.serviceId === serviceId)
      .sort((a, b) => (b.date?.getTime?.() ?? 0) - (a.date?.getTime?.() ?? 0));
    return items.slice(0, limit);
  }

  async createUptimeHistory(insertHistory: InsertUptimeHistory): Promise<UptimeHistory> {
    const id = this.historyCurrentId++;
    const history: UptimeHistory = { 
      ...insertHistory, 
      id,
      responseTime: insertHistory.responseTime || null
      ,
      downtimeMinutes: insertHistory.downtimeMinutes ?? null
    };
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
    const incident: Incident = { 
      ...insertIncident, 
      id,
      endTime: insertIncident.endTime || null
    };
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

    // Determine the most recent lastChecked across services
    let lastChecked = new Date(0);
    services.forEach(service => {
      if (service.lastChecked && service.lastChecked > lastChecked) {
        lastChecked = service.lastChecked;
      }
    });

    return {
      operational,
      degraded,
      down,
      lastChecked
    };
  }

  // Users
  async getUserById(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      user => user.username === username
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      user => user.email === email
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.users.size + 1;
    const newUser: User = {
      ...user,
      id,
      role: UserRole.USER,
      createdAt: new Date()
    };
    this.users.set(id, newUser);
    return newUser;
  }

  // Password resets (memory)
  async createPasswordReset(userId: number, token: string, expiresAt: Date): Promise<any> {
    const id = this.passwordResetCurrentId++;
    const reset = { id, userId, token, expiresAt, createdAt: new Date() };
    // reuse incidents map to store resets for simplicity in memory mode
    (this.incidents as any).set(`pr_${id}`, reset);
    return reset;
  }

  async getPasswordResetByToken(token: string): Promise<any | undefined> {
    const items = Array.from((this.incidents as any).values()).filter((v: any) => v.token === token);
    return items.length ? items[0] : undefined;
  }

  async deletePasswordResetById(id: number): Promise<void> {
    (this.incidents as any).delete(`pr_${id}`);
  }

  async updateUserPassword(userId: number, newHashedPassword: string): Promise<void> {
    const user = Array.from(this.users.values()).find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    (user as any).password = newHashedPassword;
    this.users.set(user.id, user);
  }

  // Favorites
  async getFavorites(userId: number): Promise<number[]> {
    const userFavorites = this.favorites.get(userId);
    return userFavorites ? Array.from(userFavorites) : [];
  }

  async addFavorite(userId: number, serviceId: number): Promise<void> {
    if (!this.favorites.has(userId)) {
      this.favorites.set(userId, new Set<number>());
    }
    this.favorites.get(userId)!.add(serviceId);
  }

  async removeFavorite(userId: number, serviceId: number): Promise<void> {
    const userFavorites = this.favorites.get(userId);
    if (userFavorites) {
      userFavorites.delete(serviceId);
    }
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
      { name: 'Various', icon: 'fa-ellipsis-h', slug: 'various' },
      { name: 'Cloud', icon: 'fa-cloud', slug: 'cloud' },
      { name: 'Betting', icon: 'fa-dice', slug: 'betting' },
      { name: 'Music', icon: 'fa-music', slug: 'music' }
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
  { name: 'Brave', logo: 'fas fa-shield-alt', categoryId: 2, status: StatusType.UP, responseTime: 72, slug: 'brave' },
  { name: 'Firefox', logo: 'fab fa-firefox', categoryId: 2, status: StatusType.UP, responseTime: 70, slug: 'firefox' },
  { name: 'Edge', logo: 'fab fa-edge', categoryId: 2, status: StatusType.UP, responseTime: 68, slug: 'edge' },
  { name: 'Opera', logo: 'fab fa-opera', categoryId: 2, status: StatusType.UP, responseTime: 75, slug: 'opera' },
  { name: 'DuckDuckGo', logo: 'fab fa-duckduckgo', categoryId: 2, status: StatusType.UP, responseTime: 66, slug: 'duckduckgo' },
      
      // Social
      { name: 'Twitter (X)', logo: 'fab fa-twitter', categoryId: 3, status: StatusType.UP, responseTime: 124, slug: 'twitter' },
      { name: 'Meta', logo: 'fab fa-facebook', categoryId: 3, status: StatusType.UP, responseTime: 143, slug: 'meta' },
      { name: 'TikTok', logo: 'fab fa-tiktok', categoryId: 3, status: StatusType.UP, responseTime: 165, slug: 'tiktok' },
  { name: 'Discord', logo: 'fab fa-discord', categoryId: 3, status: StatusType.DEGRADED, responseTime: 222, slug: 'discord' },
  // Social extras commonly used
  { name: 'Instagram', logo: 'fab fa-instagram', categoryId: 3, status: StatusType.UP, responseTime: 120, slug: 'instagram' },
  { name: 'WhatsApp', logo: 'fab fa-whatsapp', categoryId: 3, status: StatusType.UP, responseTime: 110, slug: 'whatsapp' },
  { name: 'Telegram', logo: 'fab fa-telegram', categoryId: 3, status: StatusType.UP, responseTime: 130, slug: 'telegram' },
  { name: 'Reddit', logo: 'fab fa-reddit', categoryId: 3, status: StatusType.UP, responseTime: 140, slug: 'reddit' },
  { name: 'Tinder', logo: 'fab fa-tinder', categoryId: 3, status: StatusType.UP, responseTime: 150, slug: 'tinder' },
      
      // Connection
      { name: 'Vodafone', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 76, slug: 'vodafone' },
      { name: 'TIM', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 82, slug: 'tim' },
      
      // Streaming
      { name: 'Prime Video', logo: 'fab fa-amazon', categoryId: 6, status: StatusType.UP, responseTime: 97, slug: 'prime-video' },
      { name: 'YouTube', logo: 'fab fa-youtube', categoryId: 6, status: StatusType.UP, responseTime: 88, slug: 'youtube' },
  { name: 'Twitch', logo: 'fab fa-twitch', categoryId: 6, status: StatusType.DOWN, responseTime: 0, slug: 'twitch' },
  { name: 'Spotify', logo: 'fab fa-spotify', categoryId: 6, status: StatusType.UP, responseTime: 95, slug: 'spotify' }
    ];

    // Servizi bancari e pagamenti completi
  const moreServices: InsertService[] = [
      // Bank
      { name: 'Banca Monte dei Paschi di Siena', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 120, slug: 'mps' },
      { name: 'UniCredit', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 115, slug: 'unicredit' },
      { name: 'Banco BPM', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 110, slug: 'bpm' },
      { name: 'Intesa Sanpaolo', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 105, slug: 'intesa-sanpaolo' },
      { name: 'Apple Pay', logo: 'fab fa-apple-pay', categoryId: 5, status: StatusType.UP, responseTime: 100, slug: 'apple-pay' },
      { name: 'BNL', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 100, slug: 'bnl' },
      { name: 'Revolut', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 100, slug: 'revolut' },
      { name: 'Mastercard', logo: 'fab fa-cc-mastercard', categoryId: 5, status: StatusType.UP, responseTime: 100, slug: 'mastercard' },
      { name: 'Fineco', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 100, slug: 'fineco' },
      { name: 'Visa', logo: 'fab fa-cc-visa', categoryId: 5, status: StatusType.UP, responseTime: 100, slug: 'visa' },
      { name: 'Mediolanum', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 110, slug: 'mediolanum' },
      { name: 'Credit Agricole', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 110, slug: 'credit-agricole' },
      { name: 'American Express', logo: 'fab fa-cc-amex', categoryId: 5, status: StatusType.UP, responseTime: 110, slug: 'american-express' },
      { name: 'Hype', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 110, slug: 'hype' },
      { name: 'BPER', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 110, slug: 'bper' },
      // Altri servizi vari
      { name: 'Fascicolo Sanitario', logo: 'fas fa-notes-medical', categoryId: 9, status: StatusType.UP, responseTime: 150, slug: 'fascicolo-sanitario' }
    ];

    // Extra services found in other files (seed.ts, previous versions)
    const extraServices: InsertService[] = [
      // Games extras
      { name: 'Aternos', logo: 'fas fa-server', categoryId: 1, status: StatusType.UP, responseTime: 200, slug: 'aternos' },
      { name: 'EA Sports', logo: 'fas fa-futbol', categoryId: 1, status: StatusType.UP, responseTime: 180, slug: 'easports' },
      { name: 'Nintendo', logo: 'fas fa-gamepad', categoryId: 1, status: StatusType.UP, responseTime: 160, slug: 'nintendo' },
      { name: 'Supercell', logo: 'fas fa-mobile-alt', categoryId: 1, status: StatusType.UP, responseTime: 170, slug: 'supercell' },
      { name: 'Valorant', logo: 'fas fa-crosshairs', categoryId: 1, status: StatusType.UP, responseTime: 150, slug: 'valorant' },
      { name: 'Among Us', logo: 'fas fa-user-astronaut', categoryId: 1, status: StatusType.UP, responseTime: 140, slug: 'among-us' },
      { name: 'Gran Turismo', logo: 'fas fa-flag-checkered', categoryId: 1, status: StatusType.UP, responseTime: 130, slug: 'gran-turismo' },
      // Streaming extras
      { name: 'Netflix', logo: 'fas fa-film', categoryId: 6, status: StatusType.UP, responseTime: 97, slug: 'netflix' }
    ];

    // Ulteriori servizi popolari per coprire i casi più comuni
    const evenMoreServices: InsertService[] = [
      // Streaming aggiuntivi
      { name: 'Disney+', logo: 'fas fa-film', categoryId: 6, status: StatusType.UP, responseTime: 110, slug: 'disney-plus' },
      { name: 'DAZN', logo: 'fas fa-football-ball', categoryId: 6, status: StatusType.UP, responseTime: 120, slug: 'dazn' },
      { name: 'NOW', logo: 'fas fa-tv', categoryId: 6, status: StatusType.UP, responseTime: 115, slug: 'now' },
      { name: 'Mediaset Infinity', logo: 'fas fa-film', categoryId: 6, status: StatusType.UP, responseTime: 130, slug: 'mediaset-infinity' },
      { name: 'RaiPlay', logo: 'fas fa-film', categoryId: 6, status: StatusType.UP, responseTime: 125, slug: 'raiplay' },
      { name: 'Paramount+', logo: 'fas fa-film', categoryId: 6, status: StatusType.UP, responseTime: 120, slug: 'paramount-plus' },
      { name: 'Apple TV+', logo: 'fab fa-apple', categoryId: 6, status: StatusType.UP, responseTime: 100, slug: 'apple-tv-plus' },
      { name: 'Sky Go', logo: 'fas fa-satellite-dish', categoryId: 6, status: StatusType.UP, responseTime: 135, slug: 'sky-go' },
  { name: 'Crunchyroll', logo: 'fas fa-film', categoryId: 6, status: StatusType.UP, responseTime: 120, slug: 'crunchyroll' },
  { name: 'Sky', logo: 'fas fa-tv', categoryId: 6, status: StatusType.UP, responseTime: 120, slug: 'sky' },
  { name: 'Discovery+', logo: 'fas fa-film', categoryId: 6, status: StatusType.UP, responseTime: 120, slug: 'discovery-plus' },

      // Mail
      { name: 'Gmail', logo: 'fas fa-envelope', categoryId: 7, status: StatusType.UP, responseTime: 80, slug: 'gmail' },
      { name: 'Outlook', logo: 'fas fa-envelope', categoryId: 7, status: StatusType.UP, responseTime: 90, slug: 'outlook' },
  { name: 'Yahoo Mail', logo: 'fas fa-envelope', categoryId: 7, status: StatusType.UP, responseTime: 100, slug: 'yahoo' },
  { name: 'Virgilio Mail', logo: 'fas fa-envelope', categoryId: 7, status: StatusType.UP, responseTime: 95, slug: 'virgilio' },
  { name: 'Libero Mail', logo: 'fas fa-envelope', categoryId: 7, status: StatusType.UP, responseTime: 95, slug: 'libero' },
  { name: 'Tiscali Mail', logo: 'fas fa-envelope', categoryId: 7, status: StatusType.UP, responseTime: 95, slug: 'tiscali-mail' },

      // Shopping
      { name: 'Amazon', logo: 'fab fa-amazon', categoryId: 8, status: StatusType.UP, responseTime: 90, slug: 'amazon' },
      { name: 'eBay', logo: 'fab fa-ebay', categoryId: 8, status: StatusType.UP, responseTime: 110, slug: 'ebay' },
      { name: 'AliExpress', logo: 'fas fa-shopping-bag', categoryId: 8, status: StatusType.UP, responseTime: 130, slug: 'aliexpress' },
      { name: 'Shein', logo: 'fas fa-tshirt', categoryId: 8, status: StatusType.UP, responseTime: 130, slug: 'shein' },
  { name: 'Zalando', logo: 'fas fa-shoe-prints', categoryId: 8, status: StatusType.UP, responseTime: 120, slug: 'zalando' },
  { name: 'Poste Italiane (Shop)', logo: 'fas fa-shopping-cart', categoryId: 8, status: StatusType.UP, responseTime: 120, slug: 'poste-italiane-shop' },
  { name: 'Temu', logo: 'fas fa-shopping-bag', categoryId: 8, status: StatusType.UP, responseTime: 130, slug: 'temu' },
  { name: 'Esselunga', logo: 'fas fa-shopping-basket', categoryId: 8, status: StatusType.UP, responseTime: 120, slug: 'esselunga' },
  { name: 'Coop', logo: 'fas fa-shopping-basket', categoryId: 8, status: StatusType.UP, responseTime: 120, slug: 'coop' },
  { name: 'Conad', logo: 'fas fa-shopping-basket', categoryId: 8, status: StatusType.UP, responseTime: 120, slug: 'conad' },
  { name: 'Carrefour', logo: 'fas fa-shopping-basket', categoryId: 8, status: StatusType.UP, responseTime: 120, slug: 'carrefour' },
  { name: 'Vinted', logo: 'fas fa-tshirt', categoryId: 8, status: StatusType.UP, responseTime: 120, slug: 'vinted' },
  { name: 'IKEA', logo: 'fas fa-couch', categoryId: 8, status: StatusType.UP, responseTime: 120, slug: 'ikea' },

      // Social aggiuntivi
      { name: 'Snapchat', logo: 'fab fa-snapchat', categoryId: 3, status: StatusType.UP, responseTime: 120, slug: 'snapchat' },
      { name: 'Pinterest', logo: 'fab fa-pinterest', categoryId: 3, status: StatusType.UP, responseTime: 120, slug: 'pinterest' },
      { name: 'LinkedIn', logo: 'fab fa-linkedin', categoryId: 3, status: StatusType.UP, responseTime: 120, slug: 'linkedin' },

  // Cloud
  { name: 'GitHub', logo: 'fab fa-github', categoryId: 10, status: StatusType.UP, responseTime: 100, slug: 'github' },
  { name: 'GitLab', logo: 'fab fa-gitlab', categoryId: 10, status: StatusType.UP, responseTime: 110, slug: 'gitlab' },
  { name: 'Cloudflare', logo: 'fas fa-cloud', categoryId: 10, status: StatusType.UP, responseTime: 80, slug: 'cloudflare' },
  { name: 'AWS', logo: 'fab fa-aws', categoryId: 10, status: StatusType.UP, responseTime: 120, slug: 'aws' },
  { name: 'Azure', logo: 'fab fa-microsoft', categoryId: 10, status: StatusType.UP, responseTime: 120, slug: 'azure' },
  { name: 'Google Cloud', logo: 'fab fa-google', categoryId: 10, status: StatusType.UP, responseTime: 120, slug: 'google-cloud' },
  
    // Music (nuova categoria)
    { name: 'Apple Music', logo: 'fab fa-apple', categoryId: 12, status: StatusType.UP, responseTime: 100, slug: 'apple-music' },
    { name: 'YouTube Music', logo: 'fab fa-youtube', categoryId: 12, status: StatusType.UP, responseTime: 100, slug: 'youtube-music' },
    { name: 'Amazon Music', logo: 'fab fa-amazon', categoryId: 12, status: StatusType.UP, responseTime: 100, slug: 'amazon-music' },
    { name: 'Deezer', logo: 'fas fa-music', categoryId: 12, status: StatusType.UP, responseTime: 100, slug: 'deezer' },
    { name: 'SoundCloud', logo: 'fab fa-soundcloud', categoryId: 12, status: StatusType.UP, responseTime: 100, slug: 'soundcloud' },
    { name: 'TIDAL', logo: 'fas fa-music', categoryId: 12, status: StatusType.UP, responseTime: 100, slug: 'tidal' },
    { name: 'Shazam', logo: 'fas fa-music', categoryId: 12, status: StatusType.UP, responseTime: 100, slug: 'shazam' },
    { name: 'Bandcamp', logo: 'fas fa-music', categoryId: 12, status: StatusType.UP, responseTime: 100, slug: 'bandcamp' },
    

      // ISP Italia
      { name: 'Iliad', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 100, slug: 'iliad' },
      { name: 'WindTre', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 100, slug: 'windtre' },
  { name: 'Fastweb', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 100, slug: 'fastweb' },
  { name: 'Sky Wifi', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 110, slug: 'sky-wifi' },
  { name: 'Linkem', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 120, slug: 'linkem' },
  { name: 'Very Mobile', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 110, slug: 'verymobile' },
  { name: 'ho. Mobile', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 110, slug: 'ho-mobile' },
  { name: 'EOLO', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 110, slug: 'eolo' },
  { name: 'Tiscali', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 115, slug: 'tiscali' },
  { name: 'Kena Mobile', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 115, slug: 'kena' },
  { name: 'PosteMobile', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 115, slug: 'postemobile' },
  { name: 'CoopVoce', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 115, slug: 'coopvoce' },

      // Banche e pagamenti aggiuntivi
      { name: 'Poste Italiane', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 120, slug: 'poste-italiane' },
      { name: 'PostePay', logo: 'fas fa-credit-card', categoryId: 5, status: StatusType.UP, responseTime: 120, slug: 'postepay' },
      { name: 'ING', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 120, slug: 'ing' },
      { name: 'Satispay', logo: 'fas fa-mobile-alt', categoryId: 5, status: StatusType.UP, responseTime: 120, slug: 'satispay' },

      // Giochi/piattaforme aggiuntive
      { name: 'Battle.net', logo: 'fas fa-gamepad', categoryId: 1, status: StatusType.UP, responseTime: 120, slug: 'battle-net' },
      { name: 'Ubisoft', logo: 'fas fa-gamepad', categoryId: 1, status: StatusType.UP, responseTime: 120, slug: 'ubisoft' },
      { name: 'Riot Games', logo: 'fas fa-gamepad', categoryId: 1, status: StatusType.UP, responseTime: 120, slug: 'riot-games' },
    ];

    const baseline = [...servicesData, ...moreServices, ...extraServices, ...evenMoreServices];
    const seen = new Set<string>();
    baseline.forEach(svc => {
      if (!seen.has(svc.slug)) {
        seen.add(svc.slug);
        this.createService(svc);
      }
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

// File-backed storage to persist data locally when DATABASE_URL is not set
export class FileStorage extends MemStorage {
  private filePath: string;

  constructor(filePath?: string) {
    super();
    // Default to projectRoot/server/data/storage.json
    const defaultPath = path.resolve(process.cwd(), 'server', 'data', 'storage.json');
    this.filePath = filePath || defaultPath;
    // Load persisted data if available (overrides seeded demo data)
    void this.loadFromFile();
  }

  private async ensureDir() {
    const dir = path.dirname(this.filePath);
    try {
      await fs.mkdir(dir, { recursive: true });
    } catch {
      // ignore
    }
  }

  private serialize() {
    // Convert Maps to arrays and Sets to arrays for JSON
    return {
      categories: Array.from((this as any).categories.values()),
      services: Array.from((this as any).services.values()),
      history: Array.from((this as any).history.values()),
      incidents: Array.from((this as any).incidents.values()),
      users: Array.from((this as any).users.values()),
      favorites: (Array.from((this as any).favorites.entries()) as [number, Set<number>][])
        .map(([userId, set]) => ({ userId, services: Array.from(set) })),
      counters: {
        categoryCurrentId: (this as any).categoryCurrentId,
        serviceCurrentId: (this as any).serviceCurrentId,
        historyCurrentId: (this as any).historyCurrentId,
        incidentCurrentId: (this as any).incidentCurrentId,
        passwordResetCurrentId: (this as any).passwordResetCurrentId,
      }
    };
  }

  private async saveToFile() {
    try {
      await this.ensureDir();
      const tmp = `${this.filePath}.tmp`;
      const data = JSON.stringify(this.serialize(), null, 2);
      try {
        await fs.writeFile(tmp, data, 'utf8');
        await fs.rename(tmp, this.filePath);
      } catch (err: any) {
        // Fallback: write directly if tmp/rename fails (Windows ENOENT race etc.)
        await fs.writeFile(this.filePath, data, 'utf8');
      }
    } catch (err) {
      console.error('FileStorage save error:', err);
    }
  }

  private async loadFromFile() {
    try {
      const content = await fs.readFile(this.filePath, 'utf8');
      const parsed = JSON.parse(content);

      // Restore maps
  (this as any).categories = new Map<number, Category>((parsed.categories || []).map((c: Category) => [c.id, { ...c } as any]));
      (this as any).services = new Map<number, Service>((parsed.services || []).map((s: Service) => [s.id, { ...s, lastChecked: s?.lastChecked ? new Date(s.lastChecked as any) : undefined } as any]));
      (this as any).history = new Map<number, UptimeHistory>((parsed.history || []).map((h: UptimeHistory) => [h.id, { ...h, date: h?.date ? new Date(h.date as any) : undefined } as any]));
      (this as any).incidents = new Map<number, Incident>((parsed.incidents || []).map((i: Incident) => [i.id, { ...i, startTime: i?.startTime ? new Date(i.startTime as any) : undefined, endTime: i?.endTime ? new Date(i.endTime as any) : null } as any]));
      (this as any).users = new Map<number, User>((parsed.users || []).map((u: User) => [u.id, { ...u, createdAt: u?.createdAt ? new Date(u.createdAt as any) : undefined } as any]));
      const favs = new Map<number, Set<number>>();
      for (const f of parsed.favorites || []) {
        favs.set(Number(f.userId), new Set<number>((f.services || []).map((x: any) => Number(x))));
      }
      (this as any).favorites = favs;

      // Restore counters (fallback to max + 1 when missing)
      const counters = parsed.counters || {};
  (this as any).categoryCurrentId = counters.categoryCurrentId || (Math.max(0, ...(Array.from((this as any).categories.keys()) as number[])) + 1);
  (this as any).serviceCurrentId = counters.serviceCurrentId || (Math.max(0, ...(Array.from((this as any).services.keys()) as number[])) + 1);
  (this as any).historyCurrentId = counters.historyCurrentId || (Math.max(0, ...(Array.from((this as any).history.keys()) as number[])) + 1);
  (this as any).incidentCurrentId = counters.incidentCurrentId || (Math.max(0, ...(Array.from((this as any).incidents.keys()) as number[])) + 1);
      (this as any).passwordResetCurrentId = counters.passwordResetCurrentId || 1;

      // Ensure baseline categories exist (aggiunte nuove categorie dopo il primo avvio)
      const baselineCategories: InsertCategory[] = [
        { name: 'Games', icon: 'fa-gamepad', slug: 'games' },
        { name: 'Browser & AI', icon: 'fa-globe', slug: 'browser-ai' },
        { name: 'Social', icon: 'fa-users', slug: 'social' },
        { name: 'Connection', icon: 'fa-wifi', slug: 'connection' },
        { name: 'Bank', icon: 'fa-landmark', slug: 'bank' },
        { name: 'Streaming', icon: 'fa-play', slug: 'streaming' },
        { name: 'Mail', icon: 'fa-envelope', slug: 'mail' },
        { name: 'Shopping', icon: 'fa-shopping-cart', slug: 'shopping' },
        { name: 'Various', icon: 'fa-ellipsis-h', slug: 'various' },
        { name: 'Cloud', icon: 'fa-cloud', slug: 'cloud' },
        { name: 'Betting', icon: 'fa-dice', slug: 'betting' },
        { name: 'Music', icon: 'fa-music', slug: 'music' },
      ];
      const existingCategories = Array.from((this as any).categories.values()) as Category[];
      const existingBySlug = new Set(existingCategories.map(c => c.slug));
      for (const cat of baselineCategories) {
        if (!existingBySlug.has(cat.slug)) {
          await this.createCategory(cat);
        }
      }

      // Rimuovi eventuali servizi esplicitamente deprecati
      const removedSlugs = new Set<string>(['gog', 'itch-io']);
      let anyRemoved = false;
      ((this as any).services as Map<number, Service>).forEach((s: Service, id: number) => {
        if (s && removedSlugs.has((s as any).slug)) {
          (this as any).services.delete(id);
          anyRemoved = true;
        }
      });
      if (anyRemoved) {
        // riallinea il contatore se necessario
        (this as any).serviceCurrentId = Math.max(0, ...(Array.from((this as any).services.keys()) as number[])) + 1;
        await this.saveToFile();
      }
      // After loading, ensure baseline services exist (merge missing ones)
  const baselineMissing: InsertService[] = (() => {
        // Recreate the same baseline used in initializeData
        const baseGames: InsertService[] = [
          { name: 'Steam', logo: 'fab fa-steam', categoryId: 1, status: StatusType.UP, responseTime: 118, slug: 'steam' },
          { name: 'Roblox', logo: 'fas fa-cube', categoryId: 1, status: StatusType.DEGRADED, responseTime: 342, slug: 'roblox' },
          { name: 'Epic Games', logo: 'fas fa-gamepad', categoryId: 1, status: StatusType.UP, responseTime: 98, slug: 'epic-games' },
          { name: 'Rockstar', logo: 'fas fa-star', categoryId: 1, status: StatusType.DOWN, responseTime: 0, slug: 'rockstar' },
          { name: 'Mojang', logo: 'fas fa-cube', categoryId: 1, status: StatusType.UP, responseTime: 125, slug: 'mojang' },
          { name: 'Xbox', logo: 'fab fa-xbox', categoryId: 1, status: StatusType.UP, responseTime: 104, slug: 'xbox' },
          { name: 'PlayStation', logo: 'fab fa-playstation', categoryId: 1, status: StatusType.UP, responseTime: 112, slug: 'playstation' },
          { name: 'Aternos', logo: 'fas fa-server', categoryId: 1, status: StatusType.UP, responseTime: 200, slug: 'aternos' },
          { name: 'EA Sports', logo: 'fas fa-futbol', categoryId: 1, status: StatusType.UP, responseTime: 180, slug: 'easports' },
          { name: 'Nintendo', logo: 'fas fa-gamepad', categoryId: 1, status: StatusType.UP, responseTime: 160, slug: 'nintendo' },
          { name: 'Supercell', logo: 'fas fa-mobile-alt', categoryId: 1, status: StatusType.UP, responseTime: 170, slug: 'supercell' },
          { name: 'Valorant', logo: 'fas fa-crosshairs', categoryId: 1, status: StatusType.UP, responseTime: 150, slug: 'valorant' },
          { name: 'Among Us', logo: 'fas fa-user-astronaut', categoryId: 1, status: StatusType.UP, responseTime: 140, slug: 'among-us' },
          { name: 'Gran Turismo', logo: 'fas fa-flag-checkered', categoryId: 1, status: StatusType.UP, responseTime: 130, slug: 'gran-turismo' }
        ];
        const baseBrowserAI: InsertService[] = [
          { name: 'Google', logo: 'fab fa-google', categoryId: 2, status: StatusType.UP, responseTime: 56, slug: 'google' },
          { name: 'Open AI', logo: 'fas fa-robot', categoryId: 2, status: StatusType.DEGRADED, responseTime: 487, slug: 'openai' },
          { name: 'Microsoft', logo: 'fab fa-microsoft', categoryId: 2, status: StatusType.UP, responseTime: 78, slug: 'microsoft' },
          { name: 'Chrome', logo: 'fab fa-chrome', categoryId: 2, status: StatusType.UP, responseTime: 64, slug: 'chrome' },
          { name: 'Brave', logo: 'fas fa-shield-alt', categoryId: 2, status: StatusType.UP, responseTime: 72, slug: 'brave' },
          { name: 'Firefox', logo: 'fab fa-firefox', categoryId: 2, status: StatusType.UP, responseTime: 70, slug: 'firefox' },
          { name: 'Edge', logo: 'fab fa-edge', categoryId: 2, status: StatusType.UP, responseTime: 68, slug: 'edge' },
          { name: 'Opera', logo: 'fab fa-opera', categoryId: 2, status: StatusType.UP, responseTime: 75, slug: 'opera' },
          { name: 'DuckDuckGo', logo: 'fab fa-duckduckgo', categoryId: 2, status: StatusType.UP, responseTime: 66, slug: 'duckduckgo' },
        ];
        const baseSocial: InsertService[] = [
          { name: 'Twitter (X)', logo: 'fab fa-twitter', categoryId: 3, status: StatusType.UP, responseTime: 124, slug: 'twitter' },
          { name: 'Meta', logo: 'fab fa-facebook', categoryId: 3, status: StatusType.UP, responseTime: 143, slug: 'meta' },
          { name: 'TikTok', logo: 'fab fa-tiktok', categoryId: 3, status: StatusType.UP, responseTime: 165, slug: 'tiktok' },
          { name: 'Discord', logo: 'fab fa-discord', categoryId: 3, status: StatusType.DEGRADED, responseTime: 222, slug: 'discord' },
          { name: 'Instagram', logo: 'fab fa-instagram', categoryId: 3, status: StatusType.UP, responseTime: 120, slug: 'instagram' },
          { name: 'WhatsApp', logo: 'fab fa-whatsapp', categoryId: 3, status: StatusType.UP, responseTime: 110, slug: 'whatsapp' },
          { name: 'Telegram', logo: 'fab fa-telegram', categoryId: 3, status: StatusType.UP, responseTime: 130, slug: 'telegram' },
          { name: 'Reddit', logo: 'fab fa-reddit', categoryId: 3, status: StatusType.UP, responseTime: 140, slug: 'reddit' },
          { name: 'Tinder', logo: 'fab fa-tinder', categoryId: 3, status: StatusType.UP, responseTime: 150, slug: 'tinder' },
        ];
        const baseConnection: InsertService[] = [
          { name: 'Vodafone', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 76, slug: 'vodafone' },
          { name: 'TIM', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 82, slug: 'tim' },
        ];
        const baseStreaming: InsertService[] = [
          { name: 'Prime Video', logo: 'fab fa-amazon', categoryId: 6, status: StatusType.UP, responseTime: 97, slug: 'prime-video' },
          { name: 'YouTube', logo: 'fab fa-youtube', categoryId: 6, status: StatusType.UP, responseTime: 88, slug: 'youtube' },
          { name: 'Twitch', logo: 'fab fa-twitch', categoryId: 6, status: StatusType.DOWN, responseTime: 0, slug: 'twitch' },
          { name: 'Netflix', logo: 'fas fa-film', categoryId: 6, status: StatusType.UP, responseTime: 97, slug: 'netflix' }
          ,
          { name: 'Spotify', logo: 'fab fa-spotify', categoryId: 6, status: StatusType.UP, responseTime: 95, slug: 'spotify' }
        ];
        const baseBank: InsertService[] = [
          { name: 'Banca MPS', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 120, slug: 'mps' },
          { name: 'UniCredit', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 115, slug: 'unicredit' },
          { name: 'Banco BPM', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 110, slug: 'bpm' },
          { name: 'Intesa Sanpaolo', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 105, slug: 'intesa-sanpaolo' },
          { name: 'Apple Pay', logo: 'fab fa-apple-pay', categoryId: 5, status: StatusType.UP, responseTime: 100, slug: 'apple-pay' },
          { name: 'BNL', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 100, slug: 'bnl' },
          { name: 'Revolut', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 100, slug: 'revolut' },
          { name: 'Mastercard', logo: 'fab fa-cc-mastercard', categoryId: 5, status: StatusType.UP, responseTime: 100, slug: 'mastercard' },
          { name: 'Fineco', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 100, slug: 'fineco' },
          { name: 'Visa', logo: 'fab fa-cc-visa', categoryId: 5, status: StatusType.UP, responseTime: 100, slug: 'visa' },
          { name: 'Mediolanum', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 110, slug: 'mediolanum' },
          { name: 'Credit Agricole', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 110, slug: 'credit-agricole' },
          { name: 'American Express', logo: 'fab fa-cc-amex', categoryId: 5, status: StatusType.UP, responseTime: 110, slug: 'american-express' },
          { name: 'Hype', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 110, slug: 'hype' },
          { name: 'BPER', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 110, slug: 'bper' },
          { name: 'PayPal', logo: 'fab fa-paypal', categoryId: 5, status: StatusType.UP, responseTime: 100, slug: 'paypal' }
        ];
        const baseVarious: InsertService[] = [
          { name: 'Fascicolo Sanitario', logo: 'fas fa-notes-medical', categoryId: 9, status: StatusType.UP, responseTime: 150, slug: 'fascicolo-sanitario' }
        ];
        // Estensione dei baseline con molti servizi aggiuntivi
        const baseMail: InsertService[] = [
          { name: 'Gmail', logo: 'fas fa-envelope', categoryId: 7, status: StatusType.UP, responseTime: 80, slug: 'gmail' },
          { name: 'Outlook', logo: 'fas fa-envelope', categoryId: 7, status: StatusType.UP, responseTime: 90, slug: 'outlook' },
          { name: 'Yahoo Mail', logo: 'fas fa-envelope', categoryId: 7, status: StatusType.UP, responseTime: 100, slug: 'yahoo' },
          { name: 'Virgilio Mail', logo: 'fas fa-envelope', categoryId: 7, status: StatusType.UP, responseTime: 95, slug: 'virgilio' },
          { name: 'Libero Mail', logo: 'fas fa-envelope', categoryId: 7, status: StatusType.UP, responseTime: 95, slug: 'libero' },
          { name: 'Tiscali Mail', logo: 'fas fa-envelope', categoryId: 7, status: StatusType.UP, responseTime: 95, slug: 'tiscali-mail' },
        ];
        const baseShopping: InsertService[] = [
          { name: 'Amazon', logo: 'fab fa-amazon', categoryId: 8, status: StatusType.UP, responseTime: 90, slug: 'amazon' },
          { name: 'eBay', logo: 'fab fa-ebay', categoryId: 8, status: StatusType.UP, responseTime: 110, slug: 'ebay' },
          { name: 'AliExpress', logo: 'fas fa-shopping-bag', categoryId: 8, status: StatusType.UP, responseTime: 130, slug: 'aliexpress' },
          { name: 'Shein', logo: 'fas fa-tshirt', categoryId: 8, status: StatusType.UP, responseTime: 130, slug: 'shein' },
          { name: 'Zalando', logo: 'fas fa-shoe-prints', categoryId: 8, status: StatusType.UP, responseTime: 120, slug: 'zalando' },
          { name: 'Poste Italiane (Shop)', logo: 'fas fa-shopping-cart', categoryId: 8, status: StatusType.UP, responseTime: 120, slug: 'poste-italiane-shop' },
          { name: 'Temu', logo: 'fas fa-shopping-bag', categoryId: 8, status: StatusType.UP, responseTime: 130, slug: 'temu' },
          { name: 'Esselunga', logo: 'fas fa-shopping-basket', categoryId: 8, status: StatusType.UP, responseTime: 120, slug: 'esselunga' },
          { name: 'Coop', logo: 'fas fa-shopping-basket', categoryId: 8, status: StatusType.UP, responseTime: 120, slug: 'coop' },
          { name: 'Conad', logo: 'fas fa-shopping-basket', categoryId: 8, status: StatusType.UP, responseTime: 120, slug: 'conad' },
          { name: 'Carrefour', logo: 'fas fa-shopping-basket', categoryId: 8, status: StatusType.UP, responseTime: 120, slug: 'carrefour' },
          { name: 'Vinted', logo: 'fas fa-tshirt', categoryId: 8, status: StatusType.UP, responseTime: 120, slug: 'vinted' },
          { name: 'IKEA', logo: 'fas fa-couch', categoryId: 8, status: StatusType.UP, responseTime: 120, slug: 'ikea' },
        ];
        const baseSocialMore: InsertService[] = [
          { name: 'Snapchat', logo: 'fab fa-snapchat', categoryId: 3, status: StatusType.UP, responseTime: 120, slug: 'snapchat' },
          { name: 'Pinterest', logo: 'fab fa-pinterest', categoryId: 3, status: StatusType.UP, responseTime: 120, slug: 'pinterest' },
          { name: 'LinkedIn', logo: 'fab fa-linkedin', categoryId: 3, status: StatusType.UP, responseTime: 120, slug: 'linkedin' },
        ];
        const baseDev: InsertService[] = [
          { name: 'GitHub', logo: 'fab fa-github', categoryId: 10, status: StatusType.UP, responseTime: 100, slug: 'github' },
          { name: 'GitLab', logo: 'fab fa-gitlab', categoryId: 10, status: StatusType.UP, responseTime: 110, slug: 'gitlab' },
          { name: 'Cloudflare', logo: 'fas fa-cloud', categoryId: 10, status: StatusType.UP, responseTime: 80, slug: 'cloudflare' },
          { name: 'AWS', logo: 'fab fa-aws', categoryId: 10, status: StatusType.UP, responseTime: 120, slug: 'aws' },
          { name: 'Azure', logo: 'fab fa-microsoft', categoryId: 10, status: StatusType.UP, responseTime: 120, slug: 'azure' },
          { name: 'Google Cloud', logo: 'fab fa-google', categoryId: 10, status: StatusType.UP, responseTime: 120, slug: 'google-cloud' },
          { name: 'DigitalOcean', logo: 'fas fa-water', categoryId: 10, status: StatusType.UP, responseTime: 120, slug: 'digitalocean' },
          { name: 'OVH', logo: 'fas fa-server', categoryId: 10, status: StatusType.UP, responseTime: 120, slug: 'ovh' },
        ];
        const baseISP: InsertService[] = [
          { name: 'Iliad', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 100, slug: 'iliad' },
          { name: 'WindTre', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 100, slug: 'windtre' },
          { name: 'Fastweb', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 100, slug: 'fastweb' },
          { name: 'Sky Wifi', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 110, slug: 'sky-wifi' },
          { name: 'Linkem', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 120, slug: 'linkem' },
          { name: 'Very Mobile', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 110, slug: 'verymobile' },
          { name: 'ho. Mobile', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 110, slug: 'ho-mobile' },
          { name: 'EOLO', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 110, slug: 'eolo' },
          { name: 'Tiscali', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 115, slug: 'tiscali' },
          { name: 'Kena Mobile', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 115, slug: 'kena' },
          { name: 'PosteMobile', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 115, slug: 'postemobile' },
          { name: 'CoopVoce', logo: 'fas fa-wifi', categoryId: 4, status: StatusType.UP, responseTime: 115, slug: 'coopvoce' },
        ];
        const baseBanksMore: InsertService[] = [
          { name: 'Poste Italiane', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 120, slug: 'poste-italiane' },
          { name: 'PostePay', logo: 'fas fa-credit-card', categoryId: 5, status: StatusType.UP, responseTime: 120, slug: 'postepay' },
          { name: 'N26', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 120, slug: 'n26' },
          { name: 'ING', logo: 'fas fa-university', categoryId: 5, status: StatusType.UP, responseTime: 120, slug: 'ing' },
          { name: 'Satispay', logo: 'fas fa-mobile-alt', categoryId: 5, status: StatusType.UP, responseTime: 120, slug: 'satispay' },
          { name: 'Stripe', logo: 'fas fa-credit-card', categoryId: 5, status: StatusType.UP, responseTime: 120, slug: 'stripe' },
        ];
        const baseGamesMore: InsertService[] = [
          { name: 'Battle.net', logo: 'fas fa-gamepad', categoryId: 1, status: StatusType.UP, responseTime: 120, slug: 'battle-net' },
          { name: 'Ubisoft', logo: 'fas fa-gamepad', categoryId: 1, status: StatusType.UP, responseTime: 120, slug: 'ubisoft' },
          { name: 'Riot Games', logo: 'fas fa-gamepad', categoryId: 1, status: StatusType.UP, responseTime: 120, slug: 'riot-games' },
          // Removed GOG and itch.io per richiesta
        ];
        const baseStreamingMore: InsertService[] = [
          { name: 'Disney+', logo: 'fas fa-film', categoryId: 6, status: StatusType.UP, responseTime: 110, slug: 'disney-plus' },
          { name: 'DAZN', logo: 'fas fa-football-ball', categoryId: 6, status: StatusType.UP, responseTime: 120, slug: 'dazn' },
          { name: 'NOW', logo: 'fas fa-tv', categoryId: 6, status: StatusType.UP, responseTime: 115, slug: 'now' },
          { name: 'Mediaset Infinity', logo: 'fas fa-film', categoryId: 6, status: StatusType.UP, responseTime: 130, slug: 'mediaset-infinity' },
          { name: 'RaiPlay', logo: 'fas fa-film', categoryId: 6, status: StatusType.UP, responseTime: 125, slug: 'raiplay' },
          { name: 'Paramount+', logo: 'fas fa-film', categoryId: 6, status: StatusType.UP, responseTime: 120, slug: 'paramount-plus' },
          { name: 'Apple TV+', logo: 'fab fa-apple', categoryId: 6, status: StatusType.UP, responseTime: 100, slug: 'apple-tv-plus' },
          { name: 'Sky Go', logo: 'fas fa-satellite-dish', categoryId: 6, status: StatusType.UP, responseTime: 135, slug: 'sky-go' },
          { name: 'Crunchyroll', logo: 'fas fa-film', categoryId: 6, status: StatusType.UP, responseTime: 120, slug: 'crunchyroll' },
          { name: 'Sky', logo: 'fas fa-tv', categoryId: 6, status: StatusType.UP, responseTime: 120, slug: 'sky' },
          { name: 'Discovery+', logo: 'fas fa-film', categoryId: 6, status: StatusType.UP, responseTime: 120, slug: 'discovery-plus' },
        ];
        const baseBetting: InsertService[] = [
          { name: 'Sisal', logo: 'fas fa-dice', categoryId: 11, status: StatusType.UP, responseTime: 120, slug: 'sisal' },
          { name: 'bet365', logo: 'fas fa-dice', categoryId: 11, status: StatusType.UP, responseTime: 120, slug: 'bet365' },
          { name: 'Betfair', logo: 'fas fa-dice', categoryId: 11, status: StatusType.UP, responseTime: 120, slug: 'betfair' },
          { name: 'William Hill', logo: 'fas fa-dice', categoryId: 11, status: StatusType.UP, responseTime: 120, slug: 'william-hill' },
          { name: 'bwin', logo: 'fas fa-dice', categoryId: 11, status: StatusType.UP, responseTime: 120, slug: 'bwin' },
          { name: 'Lottomatica', logo: 'fas fa-dice', categoryId: 11, status: StatusType.UP, responseTime: 120, slug: 'lottomatica' },
          { name: 'SNAI', logo: 'fas fa-dice', categoryId: 11, status: StatusType.UP, responseTime: 120, slug: 'snai' },
        ];
        const baseMusic: InsertService[] = [
          { name: 'Apple Music', logo: 'fab fa-apple', categoryId: 12, status: StatusType.UP, responseTime: 100, slug: 'apple-music' },
          { name: 'YouTube Music', logo: 'fab fa-youtube', categoryId: 12, status: StatusType.UP, responseTime: 100, slug: 'youtube-music' },
          { name: 'Amazon Music', logo: 'fab fa-amazon', categoryId: 12, status: StatusType.UP, responseTime: 100, slug: 'amazon-music' },
          { name: 'Deezer', logo: 'fas fa-music', categoryId: 12, status: StatusType.UP, responseTime: 100, slug: 'deezer' },
          { name: 'SoundCloud', logo: 'fab fa-soundcloud', categoryId: 12, status: StatusType.UP, responseTime: 100, slug: 'soundcloud' },
          { name: 'TIDAL', logo: 'fas fa-music', categoryId: 12, status: StatusType.UP, responseTime: 100, slug: 'tidal' },
          { name: 'Shazam', logo: 'fas fa-music', categoryId: 12, status: StatusType.UP, responseTime: 100, slug: 'shazam' },
          { name: 'Bandcamp', logo: 'fas fa-music', categoryId: 12, status: StatusType.UP, responseTime: 100, slug: 'bandcamp' },
        ];
        const baseline = [
          ...baseGames,
          ...baseBrowserAI,
          ...baseSocial,
          ...baseConnection,
          ...baseStreaming,
          ...baseBank,
          ...baseVarious,
          ...baseMail,
          ...baseShopping,
          ...baseSocialMore,
          ...baseDev,
          ...baseISP,
          ...baseBanksMore,
          ...baseGamesMore,
          ...baseStreamingMore,
          ...baseBetting,
          ...baseMusic,
        ];
  const existingSlugs = new Set<string>((Array.from((this as any).services.values()) as Service[]).map((s) => s.slug));
        return baseline.filter(s => !existingSlugs.has(s.slug));
      })();
      if (baselineMissing.length) {
        for (const svc of baselineMissing) {
          await this.createService(svc);
        }
        await this.saveToFile();
      }
    } catch (err: any) {
      if (err?.code !== 'ENOENT') {
        console.warn('FileStorage load warning:', err?.message || err);
      }
      // First run: ensure directory exists and persist seeded data
      await this.saveToFile();
    }
  }

  // Override mutating methods to persist automatically
  async createCategory(category: InsertCategory): Promise<Category> {
    const res = await super.createCategory(category);
    await this.saveToFile();
    return res;
  }
  async createService(service: InsertService): Promise<Service> {
    const res = await super.createService(service);
    await this.saveToFile();
    return res;
  }
  async updateServiceStatus(id: number, status: UpdateServiceStatus): Promise<Service | undefined> {
    const res = await super.updateServiceStatus(id, status);
    await this.saveToFile();
    return res;
  }
  async createUptimeHistory(history: InsertUptimeHistory): Promise<UptimeHistory> {
    const res = await super.createUptimeHistory(history);
    await this.saveToFile();
    return res;
  }
  async createIncident(incident: InsertIncident): Promise<Incident> {
    const res = await super.createIncident(incident);
    await this.saveToFile();
    return res;
  }
  async updateIncident(id: number, update: Partial<InsertIncident>): Promise<Incident | undefined> {
    const res = await super.updateIncident(id, update);
    await this.saveToFile();
    return res;
  }
  async createUser(user: InsertUser): Promise<User> {
    const res = await super.createUser(user);
    await this.saveToFile();
    return res;
  }
  async createPasswordReset(userId: number, token: string, expiresAt: Date): Promise<any> {
    const res = await super.createPasswordReset(userId, token, expiresAt);
    await this.saveToFile();
    return res;
  }
  async deletePasswordResetById(id: number): Promise<void> {
    await super.deletePasswordResetById(id);
    await this.saveToFile();
  }
  async updateUserPassword(userId: number, newHashedPassword: string): Promise<void> {
    await super.updateUserPassword(userId, newHashedPassword);
    await this.saveToFile();
  }
  async addFavorite(userId: number, serviceId: number): Promise<void> {
    await super.addFavorite(userId, serviceId);
    await this.saveToFile();
  }
  async removeFavorite(userId: number, serviceId: number): Promise<void> {
    await super.removeFavorite(userId, serviceId);
    await this.saveToFile();
  }
}

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
    if (!db) return [];
    return await db.select().from(categories);
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    if (!db) return undefined;
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category;
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    if (!db) return undefined;
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    if (!db) throw new Error('DB not available');
    const [inserted] = await db.insert(categories).values(category).returning();
    return inserted;
  }

  // Services
  async getServices(): Promise<Service[]> {
    if (!db) return [];
    return await db.select().from(services);
  }

  async getServiceById(id: number): Promise<Service | undefined> {
    if (!db) return undefined;
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    if (!db) return undefined;
    const [service] = await db.select().from(services).where(eq(services.slug, slug));
    return service;
  }

  async getServicesByCategory(categoryId: number): Promise<Service[]> {
    if (!db) return [];
    return await db.select().from(services).where(eq(services.categoryId, categoryId));
  }

  async createService(service: InsertService): Promise<Service> {
    if (!db) throw new Error('DB not available');
    const [inserted] = await db.insert(services).values({
      ...service,
      lastChecked: new Date(),
      uptimePercentage: 100
    }).returning();
    return inserted;
  }

  async updateServiceStatus(id: number, status: UpdateServiceStatus): Promise<Service | undefined> {
    if (!db) return undefined;
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
    if (!db) return [];
    return await db.select()
      .from(uptimeHistory)
      .where(eq(uptimeHistory.serviceId, serviceId))
      .orderBy(desc(uptimeHistory.date))
      .limit(limit);
  }

  async createUptimeHistory(history: InsertUptimeHistory): Promise<UptimeHistory> {
    if (!db) throw new Error('DB not available');
    const [inserted] = await db.insert(uptimeHistory).values(history).returning();
    return inserted;
  }

  // Incidents
  async getIncidents(serviceId: number, limit = 5): Promise<Incident[]> {
    if (!db) return [];
    return await db.select()
      .from(incidents)
      .where(eq(incidents.serviceId, serviceId))
      .orderBy(desc(incidents.startTime))
      .limit(limit);
  }

  async createIncident(incident: InsertIncident): Promise<Incident> {
    if (!db) throw new Error('DB not available');
    const [inserted] = await db.insert(incidents).values(incident).returning();
    return inserted;
  }

  async updateIncident(id: number, incidentUpdate: Partial<InsertIncident>): Promise<Incident | undefined> {
    if (!db) return undefined;
    const [updated] = await db.update(incidents)
      .set(incidentUpdate)
      .where(eq(incidents.id, id))
      .returning();
    return updated;
  }
  
  // Users
  async getUserById(id: number): Promise<User | undefined> {
    if (!db) return undefined;
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!db) return undefined;
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    if (!db) return undefined;
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    if (!db) throw new Error('DB not available');
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
    if (!db) return { operational: 0, degraded: 0, down: 0, lastChecked: new Date() };
    // Get counts of services by status
    const results = await db.execute(sql`
      SELECT 
        SUM(CASE WHEN status = ${StatusType.UP} THEN 1 ELSE 0 END) as operational,
        SUM(CASE WHEN status = ${StatusType.DEGRADED} THEN 1 ELSE 0 END) as degraded,
        SUM(CASE WHEN status = ${StatusType.DOWN} THEN 1 ELSE 0 END) as down,
        MAX(last_checked) as last_checked
      FROM ${services}
    `);
    
  const summary: any = results.rows[0];
    
    return {
      operational: Number(summary.operational) || 0,
      degraded: Number(summary.degraded) || 0,
      down: Number(summary.down) || 0,
      lastChecked: summary.last_checked ? new Date(summary.last_checked) : new Date()
    };
  }

  // Favorites methods
  async getFavorites(userId: number): Promise<number[]> {
    if (!db) return [];
    const results = await db.select({
      serviceId: favorites.serviceId,
    })
    .from(favorites)
    .where(eq(favorites.userId, userId));
    
    return results.map(f => f.serviceId);
  }

  async addFavorite(userId: number, serviceId: number): Promise<void> {
    if (!db) return;
    console.log("Storage: Adding favorite - userId:", userId, "serviceId:", serviceId);
    try {
      await db.insert(favorites)
        .values({ userId, serviceId })
        .onConflictDoNothing();
      console.log("Storage: Favorite added successfully");
    } catch (error) {
      console.error("Storage: Error adding favorite:", error);
      throw error;
    }
  }

  async removeFavorite(userId: number, serviceId: number): Promise<void> {
    if (!db) return;
    await db.delete(favorites)
      .where(and(
        eq(favorites.userId, userId),
        eq(favorites.serviceId, serviceId)
      ));
  }

  // Password resets (database)
  async createPasswordReset(userId: number, token: string, expiresAt: Date): Promise<any> {
    if (!db) throw new Error('DB not available');
    const [inserted] = await db.insert(passwordResets).values({ userId, token, expiresAt }).returning();
    return inserted;
  }

  async getPasswordResetByToken(token: string): Promise<any | undefined> {
    if (!db) return undefined;
    const [row] = await db.select().from(passwordResets).where(eq(passwordResets.token, token));
    return row;
  }

  async deletePasswordResetById(id: number): Promise<void> {
    if (!db) return;
    await db.delete(passwordResets).where(eq(passwordResets.id, id));
  }

  async updateUserPassword(userId: number, newHashedPassword: string): Promise<void> {
    if (!db) return;
    await db.update(users).set({ password: newHashedPassword }).where(eq(users.id, userId));
  }
}

// Uncomment to use memory storage for development
// export const storage = new MemStorage(); 

// Choose storage implementation based on DATABASE_URL presence
// If DATABASE_URL is not set, use in-memory storage (good for local dev and for rendering UI changes
// without a DB). When DATABASE_URL is present, use the real DatabaseStorage.
export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new FileStorage();
