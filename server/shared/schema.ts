import { pgTable, text, serial, integer, boolean, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const StatusType = {
  UP: "operational",
  DEGRADED: "degraded",
  DOWN: "down"
} as const;

export const UserRole = {
  USER: "user",
  ADMIN: "admin"
} as const;

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  icon: text("icon").notNull(),
  slug: text("slug").notNull().unique(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo").notNull(),
  categoryId: integer("category_id").notNull(),
  status: text("status").notNull().default(StatusType.UP),
  responseTime: integer("response_time").default(0),
  lastChecked: timestamp("last_checked").defaultNow(),
  uptimePercentage: integer("uptime_percentage").default(100),
  slug: text("slug").notNull().unique(),
});

export const uptimeHistory = pgTable("uptime_history", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").notNull(),
  date: timestamp("date").notNull(),
  uptimePercentage: integer("uptime_percentage").notNull(),
  status: text("status").notNull(),
  responseTime: integer("response_time").default(0),
  downtimeMinutes: integer("downtime_minutes").default(0),
});

export const incidents = pgTable("incidents", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  status: text("status").notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default(UserRole.USER),
  createdAt: timestamp("created_at").defaultNow(),
});

// Nuova tabella per i preferiti
export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  serviceId: integer("service_id").notNull().references(() => services.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const passwordResets = pgTable("password_resets", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  icon: true,
  slug: true,
});

export const insertServiceSchema = createInsertSchema(services).pick({
  name: true,
  logo: true,
  categoryId: true,
  status: true,
  responseTime: true,
  slug: true,
});

export const insertUptimeHistorySchema = createInsertSchema(uptimeHistory).pick({
  serviceId: true,
  date: true,
  uptimePercentage: true,
  status: true,
  responseTime: true,
  downtimeMinutes: true,
});

export const insertIncidentSchema = createInsertSchema(incidents).pick({
  serviceId: true,
  title: true,
  description: true,
  startTime: true,
  endTime: true,
  status: true,
});

export const updateServiceStatusSchema = z.object({
  status: z.enum([StatusType.UP, StatusType.DEGRADED, StatusType.DOWN]),
  responseTime: z.number().optional(),
});

export const insertUserSchema = createInsertSchema(users)
  .pick({
    username: true,
    password: true,
    email: true,
    role: true,
  })
  .extend({
    password: z.string().min(6, "La password deve essere di almeno 6 caratteri"),
    email: z.string().email("Inserisci un'email valida"),
  });

export const loginUserSchema = z.object({
  username: z.string().email("Inserisci un'email valida"),
  password: z.string().min(6, "La password deve essere di almeno 6 caratteri"),
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type InsertUptimeHistory = z.infer<typeof insertUptimeHistorySchema>;
export type InsertIncident = z.infer<typeof insertIncidentSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type Category = typeof categories.$inferSelect;
export type Service = typeof services.$inferSelect;
export type UptimeHistory = typeof uptimeHistory.$inferSelect;
export type Incident = typeof incidents.$inferSelect;
export type User = typeof users.$inferSelect;
export type UpdateServiceStatus = z.infer<typeof updateServiceStatusSchema>;
export type Favorite = typeof favorites.$inferSelect;
export type PasswordReset = typeof passwordResets.$inferSelect;
