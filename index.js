var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  StatusType: () => StatusType,
  UserRole: () => UserRole,
  categories: () => categories,
  favorites: () => favorites,
  incidents: () => incidents,
  insertCategorySchema: () => insertCategorySchema,
  insertIncidentSchema: () => insertIncidentSchema,
  insertServiceSchema: () => insertServiceSchema,
  insertUptimeHistorySchema: () => insertUptimeHistorySchema,
  insertUserSchema: () => insertUserSchema,
  loginUserSchema: () => loginUserSchema,
  passwordResets: () => passwordResets,
  services: () => services,
  updateServiceStatusSchema: () => updateServiceStatusSchema,
  uptimeHistory: () => uptimeHistory,
  users: () => users
});
import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var StatusType, UserRole, categories, services, uptimeHistory, incidents, users, favorites, passwordResets, insertCategorySchema, insertServiceSchema, insertUptimeHistorySchema, insertIncidentSchema, updateServiceStatusSchema, insertUserSchema, loginUserSchema;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    StatusType = {
      UP: "operational",
      DEGRADED: "degraded",
      DOWN: "down"
    };
    UserRole = {
      USER: "user",
      ADMIN: "admin"
    };
    categories = pgTable("categories", {
      id: serial("id").primaryKey(),
      name: text("name").notNull().unique(),
      icon: text("icon").notNull(),
      slug: text("slug").notNull().unique()
    });
    services = pgTable("services", {
      id: serial("id").primaryKey(),
      name: text("name").notNull(),
      logo: text("logo").notNull(),
      categoryId: integer("category_id").notNull(),
      status: text("status").notNull().default(StatusType.UP),
      responseTime: integer("response_time").default(0),
      lastChecked: timestamp("last_checked").defaultNow(),
      uptimePercentage: integer("uptime_percentage").default(100),
      slug: text("slug").notNull().unique()
    });
    uptimeHistory = pgTable("uptime_history", {
      id: serial("id").primaryKey(),
      serviceId: integer("service_id").notNull(),
      date: timestamp("date").notNull(),
      uptimePercentage: integer("uptime_percentage").notNull(),
      status: text("status").notNull(),
      responseTime: integer("response_time").default(0),
      downtimeMinutes: integer("downtime_minutes").default(0)
    });
    incidents = pgTable("incidents", {
      id: serial("id").primaryKey(),
      serviceId: integer("service_id").notNull(),
      title: text("title").notNull(),
      description: text("description").notNull(),
      startTime: timestamp("start_time").notNull(),
      endTime: timestamp("end_time"),
      status: text("status").notNull()
    });
    users = pgTable("users", {
      id: serial("id").primaryKey(),
      username: text("username").notNull().unique(),
      password: text("password").notNull(),
      email: text("email").notNull().unique(),
      role: text("role").notNull().default(UserRole.USER),
      createdAt: timestamp("created_at").defaultNow()
    });
    favorites = pgTable("favorites", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      serviceId: integer("service_id").notNull().references(() => services.id, { onDelete: "cascade" }),
      createdAt: timestamp("created_at").defaultNow()
    });
    passwordResets = pgTable("password_resets", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      token: text("token").notNull().unique(),
      expiresAt: timestamp("expires_at").notNull(),
      createdAt: timestamp("created_at").defaultNow()
    });
    insertCategorySchema = createInsertSchema(categories).pick({
      name: true,
      icon: true,
      slug: true
    });
    insertServiceSchema = createInsertSchema(services).pick({
      name: true,
      logo: true,
      categoryId: true,
      status: true,
      responseTime: true,
      slug: true
    });
    insertUptimeHistorySchema = createInsertSchema(uptimeHistory).pick({
      serviceId: true,
      date: true,
      uptimePercentage: true,
      status: true,
      responseTime: true,
      downtimeMinutes: true
    });
    insertIncidentSchema = createInsertSchema(incidents).pick({
      serviceId: true,
      title: true,
      description: true,
      startTime: true,
      endTime: true,
      status: true
    });
    updateServiceStatusSchema = z.object({
      status: z.enum([StatusType.UP, StatusType.DEGRADED, StatusType.DOWN]),
      responseTime: z.number().optional()
    });
    insertUserSchema = createInsertSchema(users).pick({
      username: true,
      password: true,
      email: true,
      role: true
    }).extend({
      password: z.string().min(6, "La password deve essere di almeno 6 caratteri"),
      email: z.string().email("Inserisci un'email valida")
    });
    loginUserSchema = z.object({
      username: z.string().email("Inserisci un'email valida"),
      password: z.string().min(6, "La password deve essere di almeno 6 caratteri")
    });
  }
});

// server/db.ts
var db_exports = {};
__export(db_exports, {
  db: () => db,
  ensureFavoritesTable: () => ensureFavoritesTable,
  ensurePasswordResetsTable: () => ensurePasswordResetsTable,
  pool: () => pool
});
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import "dotenv/config";
async function ensureFavoritesTable() {
  if (process.env.NODE_ENV !== "development") return;
  const sql3 = `
    CREATE TABLE IF NOT EXISTS favorites (
      id serial PRIMARY KEY,
      user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      service_id integer NOT NULL REFERENCES services(id) ON DELETE CASCADE,
      created_at timestamp DEFAULT now()
    );
  `;
  try {
    await pool.query(sql3);
    console.log("\u2705 ensureFavoritesTable: favorites table exists or was created");
  } catch (err) {
    console.error("Failed to ensure favorites table exists:", err);
  }
}
async function ensurePasswordResetsTable() {
  if (process.env.NODE_ENV !== "development") return;
  const sql3 = `
    CREATE TABLE IF NOT EXISTS password_resets (
      id serial PRIMARY KEY,
      user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token text NOT NULL UNIQUE,
      expires_at timestamp NOT NULL,
      created_at timestamp DEFAULT now()
    );
  `;
  try {
    await pool.query(sql3);
    console.log("\u2705 ensurePasswordResetsTable: password_resets table exists or was created");
  } catch (err) {
    console.error("Failed to ensure password_resets table exists:", err);
  }
}
var pool, db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    neonConfig.webSocketConstructor = ws;
    if (!process.env.DATABASE_URL) {
      throw new Error("Environment variable DATABASE_URL is required. Set it in your hosting provider (Render, Neon, etc.) and do NOT commit credentials to the repo.");
    }
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle({ client: pool, schema: schema_exports });
  }
});

// server/storage.ts
import session from "express-session";
import connectPg from "connect-pg-simple";
import { and, desc, eq, sql } from "drizzle-orm";
var MemStorage, DatabaseStorage, storage;
var init_storage = __esm({
  "server/storage.ts"() {
    "use strict";
    init_schema();
    init_db();
    MemStorage = class {
      categories = /* @__PURE__ */ new Map();
      services = /* @__PURE__ */ new Map();
      history = /* @__PURE__ */ new Map();
      incidents = /* @__PURE__ */ new Map();
      users = /* @__PURE__ */ new Map();
      favorites = /* @__PURE__ */ new Map();
      categoryCurrentId = 1;
      serviceCurrentId = 1;
      historyCurrentId = 1;
      incidentCurrentId = 1;
      passwordResetCurrentId = 1;
      sessionStore;
      constructor() {
        this.categories = /* @__PURE__ */ new Map();
        this.services = /* @__PURE__ */ new Map();
        this.history = /* @__PURE__ */ new Map();
        this.incidents = /* @__PURE__ */ new Map();
        this.users = /* @__PURE__ */ new Map();
        const MemoryStore = __require("memorystore")(session);
        this.sessionStore = new MemoryStore({
          checkPeriod: 864e5
          // prune expired entries every 24h
        });
        this.initializeData();
      }
      // Categories
      async getCategories() {
        return Array.from(this.categories.values());
      }
      async getCategoryById(id) {
        return this.categories.get(id);
      }
      async getCategoryBySlug(slug) {
        return Array.from(this.categories.values()).find(
          (category) => category.slug === slug
        );
      }
      async createCategory(insertCategory) {
        const id = this.categoryCurrentId++;
        const category = { ...insertCategory, id };
        this.categories.set(id, category);
        return category;
      }
      // Services
      async getServices() {
        return Array.from(this.services.values());
      }
      async getServiceById(id) {
        return this.services.get(id);
      }
      async getServiceBySlug(slug) {
        return Array.from(this.services.values()).find(
          (service) => service.slug === slug
        );
      }
      async getServicesByCategory(categoryId) {
        return Array.from(this.services.values()).filter(
          (service) => service.categoryId === categoryId
        );
      }
      async createService(insertService) {
        const id = this.serviceCurrentId++;
        const service = {
          ...insertService,
          id,
          lastChecked: /* @__PURE__ */ new Date(),
          uptimePercentage: 100,
          responseTime: insertService.responseTime !== void 0 ? insertService.responseTime : null,
          status: insertService.status !== void 0 ? String(insertService.status) : String(StatusType.UP)
        };
        this.services.set(id, service);
        return service;
      }
      async updateServiceStatus(id, status) {
        const service = this.services.get(id);
        if (!service) return void 0;
        const updatedService = {
          ...service,
          status: status.status,
          lastChecked: /* @__PURE__ */ new Date(),
          responseTime: status.responseTime !== void 0 ? status.responseTime : service.responseTime
        };
        this.services.set(id, updatedService);
        return updatedService;
      }
      // Uptime History
      async getUptimeHistory(serviceId, limit = 18) {
        const result = await db.select().from(uptimeHistory).where(eq(uptimeHistory.serviceId, serviceId)).orderBy(desc(uptimeHistory.date)).limit(limit);
        return result.map((history) => ({
          ...history,
          downtimeMinutes: history.downtimeMinutes ?? null
        }));
      }
      async createUptimeHistory(insertHistory) {
        const id = this.historyCurrentId++;
        const history = {
          ...insertHistory,
          id,
          responseTime: insertHistory.responseTime || null,
          downtimeMinutes: insertHistory.downtimeMinutes ?? null
        };
        this.history.set(id, history);
        return history;
      }
      // Incidents
      async getIncidents(serviceId, limit = 5) {
        const serviceIncidents = Array.from(this.incidents.values()).filter((incident) => incident.serviceId === serviceId).sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
        return serviceIncidents.slice(0, limit);
      }
      async createIncident(insertIncident) {
        const id = this.incidentCurrentId++;
        const incident = {
          ...insertIncident,
          id,
          endTime: insertIncident.endTime || null
        };
        this.incidents.set(id, incident);
        return incident;
      }
      async updateIncident(id, incidentUpdate) {
        const incident = this.incidents.get(id);
        if (!incident) return void 0;
        const updatedIncident = { ...incident, ...incidentUpdate };
        this.incidents.set(id, updatedIncident);
        return updatedIncident;
      }
      // Stats
      async getStatusSummary() {
        const services3 = await this.getServices();
        const operational = services3.filter((s) => s.status === StatusType.UP).length;
        const degraded = services3.filter((s) => s.status === StatusType.DEGRADED).length;
        const down = services3.filter((s) => s.status === StatusType.DOWN).length;
        let lastChecked = /* @__PURE__ */ new Date(0);
        services3.forEach((service) => {
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
      async getUserById(id) {
        return this.users.get(id);
      }
      async getUserByUsername(username) {
        return Array.from(this.users.values()).find(
          (user) => user.username === username
        );
      }
      async getUserByEmail(email) {
        return Array.from(this.users.values()).find(
          (user) => user.email === email
        );
      }
      async createUser(user) {
        const id = this.users.size + 1;
        const newUser = {
          ...user,
          id,
          role: UserRole.USER,
          createdAt: /* @__PURE__ */ new Date()
        };
        this.users.set(id, newUser);
        return newUser;
      }
      // Password resets (memory)
      async createPasswordReset(userId, token, expiresAt) {
        const id = this.passwordResetCurrentId++;
        const reset = { id, userId, token, expiresAt, createdAt: /* @__PURE__ */ new Date() };
        this.incidents.set(`pr_${id}`, reset);
        return reset;
      }
      async getPasswordResetByToken(token) {
        const items = Array.from(this.incidents.values()).filter((v) => v.token === token);
        return items.length ? items[0] : void 0;
      }
      async deletePasswordResetById(id) {
        this.incidents.delete(`pr_${id}`);
      }
      async updateUserPassword(userId, newHashedPassword) {
        const user = Array.from(this.users.values()).find((u) => u.id === userId);
        if (!user) throw new Error("User not found");
        user.password = newHashedPassword;
        this.users.set(user.id, user);
      }
      // Favorites
      async getFavorites(userId) {
        const userFavorites = this.favorites.get(userId);
        return userFavorites ? Array.from(userFavorites) : [];
      }
      async addFavorite(userId, serviceId) {
        if (!this.favorites.has(userId)) {
          this.favorites.set(userId, /* @__PURE__ */ new Set());
        }
        this.favorites.get(userId).add(serviceId);
      }
      async removeFavorite(userId, serviceId) {
        const userFavorites = this.favorites.get(userId);
        if (userFavorites) {
          userFavorites.delete(serviceId);
        }
      }
      // Helper method to seed initial data
      initializeData() {
        const categoriesData = [
          { name: "Games", icon: "fa-gamepad", slug: "games" },
          { name: "Browser & AI", icon: "fa-globe", slug: "browser-ai" },
          { name: "Social", icon: "fa-users", slug: "social" },
          { name: "Connection", icon: "fa-wifi", slug: "connection" },
          { name: "Bank", icon: "fa-landmark", slug: "bank" },
          { name: "Streaming", icon: "fa-play", slug: "streaming" },
          { name: "Mail", icon: "fa-envelope", slug: "mail" },
          { name: "Shopping", icon: "fa-shopping-cart", slug: "shopping" },
          { name: "Various", icon: "fa-ellipsis-h", slug: "various" }
        ];
        categoriesData.forEach((category) => {
          this.createCategory(category);
        });
        const servicesData = [
          // Games
          { name: "Steam", logo: "fab fa-steam", categoryId: 1, status: StatusType.UP, responseTime: 118, slug: "steam" },
          { name: "Roblox", logo: "fas fa-cube", categoryId: 1, status: StatusType.DEGRADED, responseTime: 342, slug: "roblox" },
          { name: "Epic Games", logo: "fas fa-gamepad", categoryId: 1, status: StatusType.UP, responseTime: 98, slug: "epic-games" },
          { name: "Rockstar", logo: "fas fa-star", categoryId: 1, status: StatusType.DOWN, responseTime: 0, slug: "rockstar" },
          { name: "Mojang", logo: "fas fa-cube", categoryId: 1, status: StatusType.UP, responseTime: 125, slug: "mojang" },
          { name: "Xbox", logo: "fab fa-xbox", categoryId: 1, status: StatusType.UP, responseTime: 104, slug: "xbox" },
          { name: "PlayStation", logo: "fab fa-playstation", categoryId: 1, status: StatusType.UP, responseTime: 112, slug: "playstation" },
          // Browser & AI
          { name: "Google", logo: "fab fa-google", categoryId: 2, status: StatusType.UP, responseTime: 56, slug: "google" },
          { name: "Open AI", logo: "fas fa-robot", categoryId: 2, status: StatusType.DEGRADED, responseTime: 487, slug: "openai" },
          { name: "Microsoft", logo: "fab fa-microsoft", categoryId: 2, status: StatusType.UP, responseTime: 78, slug: "microsoft" },
          { name: "Chrome", logo: "fab fa-chrome", categoryId: 2, status: StatusType.UP, responseTime: 64, slug: "chrome" },
          { name: "Brave", logo: "fas fa-shield-alt", categoryId: 2, status: StatusType.UP, responseTime: 72, slug: "brave" },
          // Social
          { name: "Twitter (X)", logo: "fab fa-twitter", categoryId: 3, status: StatusType.UP, responseTime: 124, slug: "twitter" },
          { name: "Meta", logo: "fab fa-facebook", categoryId: 3, status: StatusType.UP, responseTime: 143, slug: "meta" },
          { name: "TikTok", logo: "fab fa-tiktok", categoryId: 3, status: StatusType.UP, responseTime: 165, slug: "tiktok" },
          { name: "Discord", logo: "fab fa-discord", categoryId: 3, status: StatusType.DEGRADED, responseTime: 222, slug: "discord" },
          // Connection
          { name: "Vodafone", logo: "fas fa-wifi", categoryId: 4, status: StatusType.UP, responseTime: 76, slug: "vodafone" },
          { name: "TIM", logo: "fas fa-wifi", categoryId: 4, status: StatusType.UP, responseTime: 82, slug: "tim" },
          // Streaming
          { name: "Prime Video", logo: "fab fa-amazon", categoryId: 6, status: StatusType.UP, responseTime: 97, slug: "prime-video" },
          { name: "YouTube", logo: "fab fa-youtube", categoryId: 6, status: StatusType.UP, responseTime: 88, slug: "youtube" },
          { name: "Twitch", logo: "fab fa-twitch", categoryId: 6, status: StatusType.DOWN, responseTime: 0, slug: "twitch" }
        ];
        const moreServices = [
          // Bank
          { name: "Banca Monte dei Paschi di Siena", logo: "fas fa-university", categoryId: 5, status: StatusType.UP, responseTime: 120, slug: "mps" },
          { name: "UniCredit", logo: "fas fa-university", categoryId: 5, status: StatusType.UP, responseTime: 115, slug: "unicredit" },
          { name: "Banco BPM", logo: "fas fa-university", categoryId: 5, status: StatusType.UP, responseTime: 110, slug: "bpm" },
          { name: "Intesa Sanpaolo", logo: "fas fa-university", categoryId: 5, status: StatusType.UP, responseTime: 105, slug: "intesa-sanpaolo" },
          { name: "Apple Pay", logo: "fab fa-apple-pay", categoryId: 5, status: StatusType.UP, responseTime: 100, slug: "apple-pay" },
          { name: "BNL", logo: "fas fa-university", categoryId: 5, status: StatusType.UP, responseTime: 100, slug: "bnl" },
          { name: "Revolut", logo: "fas fa-university", categoryId: 5, status: StatusType.UP, responseTime: 100, slug: "revolut" },
          { name: "Mastercard", logo: "fab fa-cc-mastercard", categoryId: 5, status: StatusType.UP, responseTime: 100, slug: "mastercard" },
          { name: "Fineco", logo: "fas fa-university", categoryId: 5, status: StatusType.UP, responseTime: 100, slug: "fineco" },
          { name: "Visa", logo: "fab fa-cc-visa", categoryId: 5, status: StatusType.UP, responseTime: 100, slug: "visa" },
          { name: "Mediolanum", logo: "fas fa-university", categoryId: 5, status: StatusType.UP, responseTime: 110, slug: "mediolanum" },
          // Altri servizi vari
          { name: "Fascicolo Sanitario", logo: "fas fa-notes-medical", categoryId: 9, status: StatusType.UP, responseTime: 150, slug: "fascicolo-sanitario" }
        ];
        servicesData.forEach((service) => {
          this.createService(service);
        });
        moreServices.forEach((service) => {
          this.createService(service);
        });
        const today = /* @__PURE__ */ new Date();
        const createHistory = (serviceId, daysBack, uptimePercentage, status) => {
          const date = /* @__PURE__ */ new Date();
          date.setDate(today.getDate() - daysBack);
          this.createUptimeHistory({
            serviceId,
            date,
            uptimePercentage,
            status,
            responseTime: Math.floor(Math.random() * 200) + 50
          });
        };
        for (let i = 0; i < 7; i++) {
          createHistory(1, i, i === 1 ? 99.1 : 100, i === 1 ? StatusType.DEGRADED : StatusType.UP);
          createHistory(2, i, i < 2 ? 95.2 : 100, i < 2 ? StatusType.DEGRADED : StatusType.UP);
          createHistory(4, i, i < 3 ? 80 : 100, i < 3 ? StatusType.DOWN : StatusType.UP);
        }
        const steamIncidents = [
          {
            serviceId: 1,
            title: "API Outage",
            description: "Steam API services experienced downtime affecting login and purchases.",
            startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 8, 14, 23),
            endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 8, 17, 42),
            status: StatusType.DOWN
          },
          {
            serviceId: 1,
            title: "Performance Degradation",
            description: "Game downloads were slower than normal due to CDN issues.",
            startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10, 9, 14),
            endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10, 11, 47),
            status: StatusType.DEGRADED
          }
        ];
        steamIncidents.forEach((incident) => {
          this.createIncident(incident);
        });
        const rockstarIncidents = [
          {
            serviceId: 4,
            title: "Major Outage",
            description: "All Rockstar services are currently experiencing a major outage.",
            startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 10, 15),
            endTime: null,
            status: StatusType.DOWN
          }
        ];
        rockstarIncidents.forEach((incident) => {
          this.createIncident(incident);
        });
      }
    };
    DatabaseStorage = class {
      sessionStore;
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
      async getCategories() {
        return await db.select().from(categories);
      }
      async getCategoryById(id) {
        const [category] = await db.select().from(categories).where(eq(categories.id, id));
        return category;
      }
      async getCategoryBySlug(slug) {
        const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
        return category;
      }
      async createCategory(category) {
        const [inserted] = await db.insert(categories).values(category).returning();
        return inserted;
      }
      // Services
      async getServices() {
        return await db.select().from(services);
      }
      async getServiceById(id) {
        const [service] = await db.select().from(services).where(eq(services.id, id));
        return service;
      }
      async getServiceBySlug(slug) {
        const [service] = await db.select().from(services).where(eq(services.slug, slug));
        return service;
      }
      async getServicesByCategory(categoryId) {
        return await db.select().from(services).where(eq(services.categoryId, categoryId));
      }
      async createService(service) {
        const [inserted] = await db.insert(services).values({
          ...service,
          lastChecked: /* @__PURE__ */ new Date(),
          uptimePercentage: 100
        }).returning();
        return inserted;
      }
      async updateServiceStatus(id, status) {
        const [updated] = await db.update(services).set({
          status: status.status,
          lastChecked: /* @__PURE__ */ new Date(),
          responseTime: status.responseTime !== void 0 ? status.responseTime : void 0
        }).where(eq(services.id, id)).returning();
        return updated;
      }
      // Uptime History
      async getUptimeHistory(serviceId, limit = 7) {
        return await db.select().from(uptimeHistory).where(eq(uptimeHistory.serviceId, serviceId)).orderBy(desc(uptimeHistory.date)).limit(limit);
      }
      async createUptimeHistory(history) {
        const [inserted] = await db.insert(uptimeHistory).values(history).returning();
        return inserted;
      }
      // Incidents
      async getIncidents(serviceId, limit = 5) {
        return await db.select().from(incidents).where(eq(incidents.serviceId, serviceId)).orderBy(desc(incidents.startTime)).limit(limit);
      }
      async createIncident(incident) {
        const [inserted] = await db.insert(incidents).values(incident).returning();
        return inserted;
      }
      async updateIncident(id, incidentUpdate) {
        const [updated] = await db.update(incidents).set(incidentUpdate).where(eq(incidents.id, id)).returning();
        return updated;
      }
      // Users
      async getUserById(id) {
        const [user] = await db.select().from(users).where(eq(users.id, id));
        return user;
      }
      async getUserByUsername(username) {
        const [user] = await db.select().from(users).where(eq(users.username, username));
        return user;
      }
      async getUserByEmail(email) {
        const [user] = await db.select().from(users).where(eq(users.email, email));
        return user;
      }
      async createUser(user) {
        const [inserted] = await db.insert(users).values(user).returning();
        return inserted;
      }
      // Stats
      async getStatusSummary() {
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
          lastChecked: summary.last_checked ? new Date(summary.last_checked) : /* @__PURE__ */ new Date()
        };
      }
      // Favorites methods
      async getFavorites(userId) {
        const results = await db.select({
          serviceId: favorites.serviceId
        }).from(favorites).where(eq(favorites.userId, userId));
        return results.map((f) => f.serviceId);
      }
      async addFavorite(userId, serviceId) {
        console.log("Storage: Adding favorite - userId:", userId, "serviceId:", serviceId);
        try {
          await db.insert(favorites).values({ userId, serviceId }).onConflictDoNothing();
          console.log("Storage: Favorite added successfully");
        } catch (error) {
          console.error("Storage: Error adding favorite:", error);
          throw error;
        }
      }
      async removeFavorite(userId, serviceId) {
        await db.delete(favorites).where(and(
          eq(favorites.userId, userId),
          eq(favorites.serviceId, serviceId)
        ));
      }
      // Password resets (database)
      async createPasswordReset(userId, token, expiresAt) {
        const [inserted] = await db.insert(passwordResets).values({ userId, token, expiresAt }).returning();
        return inserted;
      }
      async getPasswordResetByToken(token) {
        const [row] = await db.select().from(passwordResets).where(eq(passwordResets.token, token));
        return row;
      }
      async deletePasswordResetById(id) {
        await db.delete(passwordResets).where(eq(passwordResets.id, id));
      }
      async updateUserPassword(userId, newHashedPassword) {
        await db.update(users).set({ password: newHashedPassword }).where(eq(users.id, userId));
      }
    };
    storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
  }
});

// server/auth.ts
var auth_exports = {};
__export(auth_exports, {
  comparePasswords: () => comparePasswords,
  hashPassword: () => hashPassword,
  setupAuth: () => setupAuth
});
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session2 from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { fromZodError } from "zod-validation-error";
async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}
async function comparePasswords(supplied, stored) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = await scryptAsync(supplied, salt, 64);
  return timingSafeEqual(hashedBuf, suppliedBuf);
}
function setupAuth(app2) {
  const sessionSettings = {
    secret: process.env.SESSION_SECRET || "dev-secret-key",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1e3 * 60 * 60 * 24 * 7,
      // 1 week
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    },
    store: storage.sessionStore
  };
  app2.use(session2(sessionSettings));
  app2.use(passport.initialize());
  app2.use(passport.session());
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username"
        // In realtà riceviamo l'email dal frontend
      },
      async (email, password, done) => {
        try {
          const user = await storage.getUserByEmail(email);
          if (!user) {
            return done(null, false, { message: "Email non registrata" });
          }
          const isValid = await comparePasswords(password, user.password);
          if (!isValid) {
            return done(null, false, { message: "Password non valida" });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await storage.getUserById(id);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  app2.post("/api/register", async (req, res) => {
    try {
      const parseResult = insertUserSchema.safeParse(req.body);
      if (!parseResult.success) {
        const errorMessage = fromZodError(parseResult.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      const existingEmail = await storage.getUserByEmail(req.body.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email gi\xE0 registrata" });
      }
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username gi\xE0 in uso" });
      }
      const hashedPassword = await hashPassword(req.body.password);
      const user = await storage.createUser({
        ...req.body,
        password: hashedPassword
      });
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Login fallito dopo la registrazione" });
        }
        const u = user;
        const { password: _password, ...userWithoutPassword } = u;
        res.status(201).json(userWithoutPassword);
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Registrazione fallita" });
    }
  });
  app2.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info?.message || "Autenticazione fallita" });
      }
      req.login(user, (err2) => {
        if (err2) {
          return next(err2);
        }
        const u2 = user;
        const { password: _password2, ...userWithoutPassword } = u2;
        return res.json(userWithoutPassword);
      });
    })(req, res, next);
  });
  app2.post("/api/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout fallito" });
      }
      res.status(200).json({ message: "Logout effettuato con successo" });
    });
  });
  app2.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Non autenticato" });
    }
    if (req.user) {
      const user = req.user;
      const { password: _password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } else {
      res.status(401).json({ message: "Non autenticato" });
    }
  });
}
var scryptAsync;
var init_auth = __esm({
  "server/auth.ts"() {
    "use strict";
    init_storage();
    init_schema();
    scryptAsync = promisify(scrypt);
  }
});

// server/index.ts
import "dotenv/config";
import express3 from "express";
import cors from "cors";

// server/routes.ts
init_storage();
init_schema();
import express from "express";
import { createServer } from "http";
import { fromZodError as fromZodError2 } from "zod-validation-error";

// server/service-checker.ts
init_storage();
init_schema();
import axios from "axios";

// server/downtime-calculator.ts
init_db();
init_schema();
import { eq as eq2, and as and2, sql as sql2 } from "drizzle-orm";
async function calculateDailyDowntime(serviceId, date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  const checks = await db.select().from(uptimeHistory).where(and2(
    eq2(uptimeHistory.serviceId, serviceId),
    sql2`${uptimeHistory.date} >= ${startOfDay}`,
    sql2`${uptimeHistory.date} <= ${endOfDay}`
  )).orderBy(uptimeHistory.date);
  let totalDowntimeMinutes = 0;
  let lastStatus = "operational";
  let lastCheckTime = startOfDay;
  for (const check of checks) {
    const currentCheckTime = new Date(check.date);
    if (lastStatus === "down") {
      const downtimeMinutes = (currentCheckTime.getTime() - lastCheckTime.getTime()) / (1e3 * 60);
      totalDowntimeMinutes += downtimeMinutes;
    }
    lastStatus = check.status;
    lastCheckTime = currentCheckTime;
  }
  if (lastStatus === "down") {
    const downtimeMinutes = (endOfDay.getTime() - lastCheckTime.getTime()) / (1e3 * 60);
    totalDowntimeMinutes += downtimeMinutes;
  }
  return Math.round(totalDowntimeMinutes);
}
async function updateDailyDowntime(serviceId, date) {
  const downtimeMinutes = await calculateDailyDowntime(serviceId, date);
  await db.update(uptimeHistory).set({ downtimeMinutes }).where(and2(
    eq2(uptimeHistory.serviceId, serviceId),
    sql2`DATE(${uptimeHistory.date}) = DATE(${date})`
  ));
  return downtimeMinutes;
}

// server/service-checker.ts
async function checkService(service) {
  const startTime = Date.now();
  let status = StatusType.UP;
  let responseTime = 0;
  try {
    const url = getServiceURL(service);
    const options = {
      timeout: 1e4,
      // 10 seconds timeout
      validateStatus: () => true
      // Don't throw on error status codes
    };
    const response = await axios.get(url, options);
    responseTime = Date.now() - startTime;
    if (response.status >= 500) {
      status = StatusType.DOWN;
    } else if (response.status >= 400 || responseTime > 5e3) {
      status = StatusType.DEGRADED;
    }
  } catch (error) {
    status = StatusType.DOWN;
  }
  const result = { status, responseTime: status === StatusType.DOWN ? 0 : responseTime };
  if (status === StatusType.DOWN) {
    await updateDailyDowntime(service.id, /* @__PURE__ */ new Date());
  }
  return result;
}
function getServiceURL(service) {
  const urlMap = {
    "google": "https://www.google.com",
    "youtube": "https://www.youtube.com",
    "meta": "https://www.facebook.com",
    "twitter": "https://twitter.com",
    "discord": "https://discord.com",
    "steam": "https://store.steampowered.com",
    "netflix": "https://www.netflix.com",
    "twitch": "https://www.twitch.tv",
    "microsoft": "https://www.microsoft.com",
    "openai": "https://chat.openai.com",
    "epic-games": "https://www.epicgames.com",
    "rockstar": "https://www.rockstargames.com",
    "mojang": "https://www.minecraft.net",
    "roblox": "https://www.roblox.com",
    "tiktok": "https://www.tiktok.com",
    "vodafone": "https://www.vodafone.com",
    "tim": "https://www.tim.it",
    "chrome": "https://www.google.com/chrome",
    "playstation": "https://www.playstation.com",
    "xbox": "https://www.xbox.com"
  };
  return urlMap[service.slug] || `https://www.${service.slug}.com`;
}
async function updateServiceStatus(service, checkResult) {
  const updatedService = await storage.updateServiceStatus(service.id, {
    status: checkResult.status,
    responseTime: checkResult.responseTime
  });
  if (!updatedService) return;
  const historyEntry = {
    serviceId: service.id,
    date: /* @__PURE__ */ new Date(),
    status: checkResult.status,
    responseTime: checkResult.responseTime,
    uptimePercentage: checkResult.status === StatusType.UP ? 100 : checkResult.status === StatusType.DEGRADED ? 95 : 0,
    downtimeMinutes: checkResult.status === StatusType.DOWN ? 5 : 0
    // Imposta 5 minuti di downtime per ogni check fallito
  };
  await storage.createUptimeHistory(historyEntry);
  if (service.status !== StatusType.DOWN && checkResult.status === StatusType.DOWN) {
    const incident = {
      serviceId: service.id,
      title: `${service.name} Outage Detected`,
      description: `Automatic monitoring detected that ${service.name} is currently down.`,
      startTime: /* @__PURE__ */ new Date(),
      endTime: null,
      status: StatusType.DOWN
    };
    await storage.createIncident(incident);
  }
  if (service.status === StatusType.DOWN && checkResult.status !== StatusType.DOWN) {
    const incidents2 = await storage.getIncidents(service.id);
    const openIncident = incidents2.find((inc) => inc.endTime === null);
    if (openIncident) {
      await storage.updateIncident(openIncident.id, {
        endTime: /* @__PURE__ */ new Date(),
        status: checkResult.status
      });
    }
  }
}
async function checkAllServices() {
  const services3 = await storage.getServices();
  const timestamp2 = /* @__PURE__ */ new Date();
  for (const service of services3) {
    try {
      const result = await checkService(service);
      await updateServiceStatus(service, result);
    } catch (error) {
      console.error(`Error checking service ${service.name}:`, error);
    }
  }
  return timestamp2;
}

// server/routes.ts
init_auth();
async function registerRoutes(app2) {
  setupAuth(app2);
  const apiRouter = express.Router();
  apiRouter.get("/categories", async (_req, res) => {
    try {
      const categories2 = await storage.getCategories();
      res.json(categories2);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });
  apiRouter.get("/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error(`Error fetching category ${req.params.slug}:`, error);
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });
  apiRouter.get("/services", async (_req, res) => {
    try {
      const services3 = await storage.getServices();
      res.json(services3);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });
  apiRouter.get("/services/:slug", async (req, res) => {
    try {
      const service = await storage.getServiceBySlug(req.params.slug);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      console.error(`Error fetching service ${req.params.slug}:`, error);
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });
  apiRouter.get("/categories/:categoryId/services", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId, 10);
      if (isNaN(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      const services3 = await storage.getServicesByCategory(categoryId);
      res.json(services3);
    } catch (error) {
      console.error(`Error fetching services for category ${req.params.categoryId}:`, error);
      res.status(500).json({ message: "Failed to fetch services for category" });
    }
  });
  apiRouter.patch("/services/:id/status", async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id, 10);
      if (isNaN(serviceId)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }
      const parseResult = updateServiceStatusSchema.safeParse(req.body);
      if (!parseResult.success) {
        const errorMessage = fromZodError2(parseResult.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      const status = parseResult.data;
      const updatedService = await storage.updateServiceStatus(serviceId, status);
      if (!updatedService) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(updatedService);
    } catch (error) {
      console.error(`Error updating service status ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to update service status" });
    }
  });
  apiRouter.get("/services/:id/history", async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id, 10);
      if (isNaN(serviceId)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }
      const limit = req.query.limit ? parseInt(req.query.limit, 10) : void 0;
      const history = await storage.getUptimeHistory(serviceId, limit);
      res.json(history);
    } catch (error) {
      console.error(`Error fetching history for service ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to fetch service history" });
    }
  });
  apiRouter.get("/services/:id/incidents", async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id, 10);
      if (isNaN(serviceId)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }
      const limit = req.query.limit ? parseInt(req.query.limit, 10) : void 0;
      const incidents2 = await storage.getIncidents(serviceId, limit);
      res.json(incidents2);
    } catch (error) {
      console.error(`Error fetching incidents for service ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to fetch service incidents" });
    }
  });
  apiRouter.get("/status-summary", async (_req, res) => {
    try {
      const summary = await storage.getStatusSummary();
      res.json(summary);
    } catch (error) {
      console.error("Error fetching status summary:", error);
      res.status(500).json({ message: "Failed to fetch status summary" });
    }
  });
  apiRouter.post("/check-now", async (_req, res) => {
    try {
      console.log("Starting service check of all services...");
      const lastChecked = await checkAllServices();
      const summary = await storage.getStatusSummary();
      console.log("Service check completed. Results:", {
        operational: summary.operational,
        degraded: summary.degraded,
        down: summary.down
      });
      res.json({
        message: "Service check completed",
        lastChecked
      });
    } catch (error) {
      console.error("Error running service check:", error);
      res.status(500).json({ message: "Failed to run service check" });
    }
  });
  apiRouter.post("/incidents", async (req, res) => {
    try {
      const parseResult = insertIncidentSchema.safeParse(req.body);
      if (!parseResult.success) {
        const errorMessage = fromZodError2(parseResult.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      const incident = parseResult.data;
      const createdIncident = await storage.createIncident(incident);
      res.status(201).json(createdIncident);
    } catch (error) {
      console.error("Error creating incident:", error);
      res.status(500).json({ message: "Failed to create incident" });
    }
  });
  apiRouter.post("/forgot-password", async (req, res) => {
    try {
      const { email } = req.body || {};
      if (!email) return res.status(400).json({ message: "Email richiesta" });
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.json({ message: "Se l'email \xE8 registrata, riceverai istruzioni per il reset." });
      }
      const { randomBytes: randomBytes2 } = await import("crypto");
      const token = randomBytes2(32).toString("hex");
      const expiresAt = new Date(Date.now() + 1e3 * 60 * 60);
      const reset = await storage.createPasswordReset(user.id, token, expiresAt);
      const _nodemailer = await import("nodemailer");
      const nodemailer = _nodemailer.default || _nodemailer;
      if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });
        const resetUrl = `${process.env.BASE_URL || "http://localhost:3000"}/reset-password?token=${token}`;
        await transporter.sendMail({
          from: process.env.SMTP_FROM || "no-reply@example.com",
          to: user.email,
          subject: "Password reset",
          text: `Per resettare la password visita: ${resetUrl}`,
          html: `<p>Per resettare la password visita: <a href="${resetUrl}">${resetUrl}</a></p>`
        });
      } else if (process.env.NODE_ENV === "development" || (process.env.BASE_URL || "").includes("localhost")) {
        try {
          const testAccount = await nodemailer.createTestAccount();
          const transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
              user: testAccount.user,
              pass: testAccount.pass
            }
          });
          const resetUrl = `${process.env.BASE_URL || "http://localhost:3000"}/reset-password?token=${token}`;
          const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || "no-reply@example.com",
            to: user.email,
            subject: "Password reset (dev preview)",
            text: `Per resettare la password visita: ${resetUrl}`,
            html: `<p>Per resettare la password visita: <a href="${resetUrl}">${resetUrl}</a></p>`
          });
          const previewUrl = nodemailer.getTestMessageUrl(info);
          console.log("Ethereal preview URL:", previewUrl);
        } catch (err) {
          console.log("Password reset token (no SMTP configured):", token);
        }
      } else {
        console.log("Password reset token (no SMTP configured):", token);
      }
      const resp = { message: "Se l'email \xE8 registrata, riceverai istruzioni per il reset." };
      if (process.env.NODE_ENV === "development" || (process.env.BASE_URL || "").includes("localhost")) {
        resp.token = token;
        resp.resetUrl = `${process.env.BASE_URL || "http://localhost:3000"}/reset-password?token=${token}`;
      }
      return res.json(resp);
    } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).json({ message: "Impossibile processare la richiesta" });
    }
  });
  apiRouter.post("/reset-password", async (req, res) => {
    try {
      const { token, password } = req.body || {};
      if (!token || !password) return res.status(400).json({ message: "Token e password richiesti" });
      const reset = await storage.getPasswordResetByToken(token);
      if (!reset) return res.status(400).json({ message: "Token non valido o scaduto" });
      const expiresAt = new Date(reset.expiresAt || reset.expires_at);
      if (expiresAt.getTime() < Date.now()) {
        await storage.deletePasswordResetById(reset.id);
        return res.status(400).json({ message: "Token scaduto" });
      }
      const { hashPassword: hashPassword2 } = await Promise.resolve().then(() => (init_auth(), auth_exports));
      const hashed = await hashPassword2(password);
      await storage.updateUserPassword(reset.userId, hashed);
      await storage.deletePasswordResetById(reset.id);
      return res.json({ message: "Password aggiornata con successo" });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({ message: "Impossibile resettare la password" });
    }
  });
  apiRouter.patch("/incidents/:id", async (req, res) => {
    try {
      const incidentId = parseInt(req.params.id, 10);
      if (isNaN(incidentId)) {
        return res.status(400).json({ message: "Invalid incident ID" });
      }
      const { endTime, status } = req.body;
      const updatedIncident = await storage.updateIncident(incidentId, {
        endTime: endTime || (/* @__PURE__ */ new Date()).toISOString(),
        status
      });
      if (!updatedIncident) {
        return res.status(404).json({ message: "Incident not found" });
      }
      res.json(updatedIncident);
    } catch (error) {
      console.error(`Error updating incident ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to update incident" });
    }
  });
  apiRouter.get("/favorites", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Non autenticato" });
    }
    try {
      const userId = req.user.id;
      const favorites2 = await storage.getFavorites(userId);
      res.json(favorites2);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ message: "Failed to fetch favorites" });
    }
  });
  apiRouter.post("/favorites/:serviceId", async (req, res) => {
    console.log("POST /favorites/:serviceId - Auth check");
    if (!req.isAuthenticated()) {
      console.log("User not authenticated");
      return res.status(401).json({ message: "Non autenticato" });
    }
    try {
      const userId = req.user.id;
      const serviceId = parseInt(req.params.serviceId, 10);
      console.log("Adding favorite - User:", userId, "Service:", serviceId);
      if (isNaN(serviceId)) {
        console.log("Invalid service ID:", req.params.serviceId);
        return res.status(400).json({ message: "Invalid service ID" });
      }
      const svc = await storage.getServiceById(serviceId);
      if (!svc) {
        console.log("Service not found for id:", serviceId);
        return res.status(404).json({ message: "Service not found" });
      }
      console.log("Calling storage.addFavorite");
      await storage.addFavorite(userId, serviceId);
      console.log("Favorite added successfully");
      res.status(201).json({ message: "Favorite added successfully" });
    } catch (error) {
      console.error("Error adding favorite:", error);
      if (error instanceof Error && error.stack) {
        console.error(error.stack);
      }
      const payload = { message: error instanceof Error ? error.message : "Failed to add favorite" };
      if (process.env.NODE_ENV === "development" && error instanceof Error) {
        payload.stack = error.stack;
      }
      res.status(500).json(payload);
    }
  });
  apiRouter.delete("/favorites/:serviceId", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Non autenticato" });
    }
    try {
      const userId = req.user.id;
      const serviceId = parseInt(req.params.serviceId, 10);
      if (isNaN(serviceId)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }
      await storage.removeFavorite(userId, serviceId);
      res.status(200).json({ message: "Favorite removed successfully" });
    } catch (error) {
      console.error("Error removing favorite:", error);
      res.status(500).json({ message: "Failed to remove favorite" });
    }
  });
  app2.use("/api", apiRouter);
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { visualizer } from "rollup-plugin-visualizer";
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var vite_config_default = defineConfig(({ mode }) => {
  const projectRoot = process.cwd().endsWith(path.sep + "client") || process.cwd().endsWith("/client") ? process.cwd() : path.resolve(__dirname, "client");
  const env = loadEnv(mode, process.cwd(), "");
  const isGithubPages = process.env.GITHUB_PAGES === "true" || process.env.NODE_ENV === "github-pages";
  const isRender = process.env.RENDER === "true" || !!process.env.RENDER_EXTERNAL_HOSTNAME;
  const isProduction = mode === "production";
  const base = isGithubPages || isRender ? "/siteprova/" : "/";
  return {
    base,
    plugins: [
      react(),
      // Analisi del bundle solo in produzione
      ...process.env.ANALYZE === "true" ? [
        visualizer({
          filename: "bundle-analysis.html",
          open: true,
          gzipSize: true,
          brotliSize: true
        })
      ] : []
    ],
    server: {
      port: 3e3,
      strictPort: true,
      fs: {
        allow: ["."]
      },
      proxy: {
        "/api": {
          target: "http://localhost:3001",
          changeOrigin: true
        }
      },
      // Gestisce correttamente il routing SPA 
      historyApiFallback: true,
      hmr: { overlay: false },
      watch: { usePolling: true, ignored: ["**/node_modules/**", "**/dist/**", "**/.git/**"] },
      cors: true
    },
    resolve: {
      alias: {
        "@": path.resolve(projectRoot, "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(projectRoot, "public"),
        "@components": path.resolve(projectRoot, "src", "components"),
        "@pages": path.resolve(projectRoot, "src", "pages"),
        "@styles": path.resolve(projectRoot, "src", "styles"),
        "@lib": path.resolve(projectRoot, "src", "lib"),
        "@hooks": path.resolve(projectRoot, "src", "hooks")
      },
      // Evita duplicati di React che possono causare errori HMR e optimize deps
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"]
    },
    root: projectRoot,
    publicDir: path.resolve(projectRoot, "public"),
    build: {
      // Su Render pubblichiamo sotto /siteprova: mettiamo l'output in una sottocartella
      outDir: isRender ? path.join("dist", "siteprova") : "dist",
      emptyOutDir: true,
      sourcemap: process.env.NODE_ENV === "development",
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendor";
            }
            if (id.includes("@radix-ui")) {
              return "radix-ui";
            }
            if (id.includes("@tanstack/react-query")) {
              return "react-query";
            }
            if (id.includes("wouter")) {
              return "router";
            }
            if (id.includes("framer-motion")) {
              return "framer-motion";
            }
            if (id.includes("lucide-react") || id.includes("react-icons")) {
              return "icons";
            }
            if (id.includes("zod") || id.includes("react-hook-form")) {
              return "forms";
            }
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
          // Ottimizzazione per file specifici
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      },
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === "production",
          drop_debugger: true,
          pure_funcs: ["console.log", "console.info", "console.debug"]
        }
      },
      chunkSizeWarningLimit: 500,
      assetsDir: "assets",
      target: "esnext",
      reportCompressedSize: false
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "wouter",
        "lucide-react",
        "framer-motion",
        "zod",
        "react-hook-form"
      ],
      exclude: ["@fortawesome/fontawesome-free"]
    },
    cacheDir: "node_modules/.vite"
  };
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const clientRoot = path2.resolve(import.meta.dirname, "..", "client");
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true,
    root: clientRoot
  };
  const vite = await createViteServer({
    ...vite_config_default,
    root: clientRoot,
    configFile: false,
    resolve: {
      alias: {
        "@": path2.resolve(clientRoot, "src"),
        "@shared": path2.resolve(import.meta.dirname, "..", "shared"),
        "@components": path2.resolve(clientRoot, "src", "components"),
        "@hooks": path2.resolve(clientRoot, "src", "hooks"),
        "@pages": path2.resolve(clientRoot, "src", "pages"),
        "@lib": path2.resolve(clientRoot, "src", "lib"),
        "@assets": path2.resolve(clientRoot, "public")
      }
    },
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(clientRoot, "index.html");
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      template = template.replace(
        `src="./src/main.tsx"`,
        `src="./src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distRoot = path2.resolve(import.meta.dirname, "..", "client", "dist");
  const distSiteprova = path2.join(distRoot, "siteprova");
  const distPath = fs.existsSync(distSiteprova) ? distSiteprova : distRoot;
  if (!fs.existsSync(distPath)) {
    console.warn(
      `[serveStatic] Static build directory not found: ${distPath}. Skipping static middleware.`
    );
    return;
  }
  app2.use("/assets", express2.static(path2.join(distPath, "assets")));
  app2.use("/favicon.svg", express2.static(path2.join(distPath, "favicon.svg")));
  app2.use("/favicon.png", express2.static(path2.join(distPath, "favicon.png")));
  app2.get(["/", "/*"], (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express3();
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
var allowedOriginsRaw = process.env.CORS_ORIGINS || process.env.CORS_ORIGIN || "";
var allowedOrigins = allowedOriginsRaw.split(",").map((s) => s.trim()).filter(Boolean);
var defaultAllowedOrigins = [
  "http://localhost:3000",
  "https://serverstatus-control.github.io",
  "https://siteprova.onrender.com"
];
var finalAllowedOrigins = allowedOrigins.length > 0 ? allowedOrigins : defaultAllowedOrigins;
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    console.log("CORS check for origin:", origin);
    console.log("Allowed origins:", finalAllowedOrigins);
    const isAllowed = finalAllowedOrigins.some((allowed) => {
      if (origin === allowed) return true;
      if (allowed === "https://serverstatus-control.github.io" && origin.startsWith("https://serverstatus-control.github.io")) return true;
      return origin.startsWith(allowed);
    });
    if (isAllowed) {
      console.log("CORS allowed for:", origin);
      return callback(null, true);
    }
    console.log("CORS rejected for:", origin);
    callback(new Error("CORS not allowed by server"));
  },
  credentials: true
}));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
var CHECK_INTERVAL = 20 * 60 * 1e3;
var isChecking = false;
var nextCheckTimeout;
async function scheduleNextCheck() {
  if (nextCheckTimeout) {
    clearTimeout(nextCheckTimeout);
  }
  nextCheckTimeout = setTimeout(runCheck, CHECK_INTERVAL);
}
async function runCheck() {
  if (isChecking) {
    console.log("Un controllo \xE8 gi\xE0 in corso, salto questo intervallo");
    scheduleNextCheck();
    return;
  }
  isChecking = true;
  try {
    console.log("Esecuzione controllo automatico dei servizi...");
    await checkAllServices();
    console.log("Controllo automatico completato");
  } catch (error) {
    console.error("Errore durante il controllo automatico:", error);
  } finally {
    isChecking = false;
    scheduleNextCheck();
  }
}
(async () => {
  const server = await registerRoutes(app);
  try {
    if (process.env.NODE_ENV === "development") {
      const { ensureFavoritesTable: ensureFavoritesTable2, ensurePasswordResetsTable: ensurePasswordResetsTable2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      await ensureFavoritesTable2();
      await ensurePasswordResetsTable2();
    }
  } catch (err) {
    console.error("Error while ensuring dev DB schema:", err);
  }
  console.log("Avvio del sistema di controllo automatico dei servizi ogni 20 minuti!");
  console.log("Primo controllo automatico programmato tra 20 minuti!");
  scheduleNextCheck();
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error("Unhandled error handled by middleware:", err);
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = process.env.PORT || 3e3;
  server.listen(port, () => {
    log(`serving on port ${port}`);
  });
})();
