import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { updateServiceStatusSchema, insertIncidentSchema } from "../shared/schema";
import { fromZodError } from "zod-validation-error";
import { checkAllServices } from "./service-checker";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  setupAuth(app);
  
  // API routes with /api prefix
  const apiRouter = express.Router();



  // Get all categories
  apiRouter.get("/categories", async (_req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Get category by slug
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

  // Get all services
  apiRouter.get("/services", async (_req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  // Get service by slug
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

  // Get services by category
  apiRouter.get("/categories/:categoryId/services", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId, 10);
      if (isNaN(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }

      const services = await storage.getServicesByCategory(categoryId);
      res.json(services);
    } catch (error) {
      console.error(`Error fetching services for category ${req.params.categoryId}:`, error);
      res.status(500).json({ message: "Failed to fetch services for category" });
    }
  });

  // Update service status
  apiRouter.patch("/services/:id/status", async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id, 10);
      if (isNaN(serviceId)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }

      const parseResult = updateServiceStatusSchema.safeParse(req.body);
      if (!parseResult.success) {
        const errorMessage = fromZodError(parseResult.error).message;
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

  // Get uptime history for a service
  apiRouter.get("/services/:id/history", async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id, 10);
      if (isNaN(serviceId)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }

      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
      const history = await storage.getUptimeHistory(serviceId, limit);
      res.json(history);
    } catch (error) {
      console.error(`Error fetching history for service ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to fetch service history" });
    }
  });

  // Get incidents for a service
  apiRouter.get("/services/:id/incidents", async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id, 10);
      if (isNaN(serviceId)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }

      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
      const incidents = await storage.getIncidents(serviceId, limit);
      res.json(incidents);
    } catch (error) {
      console.error(`Error fetching incidents for service ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to fetch service incidents" });
    }
  });

  // Get status summary
  apiRouter.get("/status-summary", async (_req, res) => {
    try {
      const summary = await storage.getStatusSummary();
      res.json(summary);
    } catch (error) {
      console.error("Error fetching status summary:", error);
      res.status(500).json({ message: "Failed to fetch status summary" });
    }
  });

  // Run check now (real check of all services)
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
        lastChecked: lastChecked
      });
    } catch (error) {
      console.error("Error running service check:", error);
      res.status(500).json({ message: "Failed to run service check" });
    }
  });

  // Create incident
  apiRouter.post("/incidents", async (req, res) => {
    try {
      const parseResult = insertIncidentSchema.safeParse(req.body);
      if (!parseResult.success) {
        const errorMessage = fromZodError(parseResult.error).message;
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

  // Forgot password - generate token and (optionally) send email
  apiRouter.post('/forgot-password', async (req, res) => {
    try {
      const { email } = req.body || {};
      if (!email) return res.status(400).json({ message: 'Email richiesta' });

      const user = await storage.getUserByEmail(email);
      if (!user) {
        // Do not reveal whether email exists
        return res.json({ message: 'Se l\'email è registrata, riceverai istruzioni per il reset.' });
      }

  // Generate token (use dynamic import for ESM)
  const { randomBytes } = await import('crypto');
  const token = randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

      const reset = await storage.createPasswordReset(user.id, token, expiresAt);

  // If SMTP configured, send email. Otherwise log token (for local dev)
      // Load nodemailer dynamically (ESM-safe)
      const _nodemailer = await import('nodemailer');
      const nodemailer = _nodemailer.default || _nodemailer;
      // If SMTP configured, send real email
      if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        });

        const resetUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
        await transporter.sendMail({
          from: process.env.SMTP_FROM || 'no-reply@example.com',
          to: user.email,
          subject: 'Password reset',
          text: `Per resettare la password visita: ${resetUrl}`,
          html: `<p>Per resettare la password visita: <a href="${resetUrl}">${resetUrl}</a></p>`
        });
      } else if (process.env.NODE_ENV === 'development' || (process.env.BASE_URL || '').includes('localhost')) {
        // Use Ethereal test account to send a preview email in development
        try {
          const testAccount = await nodemailer.createTestAccount();
          const transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
              user: testAccount.user,
              pass: testAccount.pass,
            }
          });

          const resetUrl = `${process.env.BASE_URL || 'http://localhost:5173'}/reset-password?token=${token}`;
          const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || 'no-reply@example.com',
            to: user.email,
            subject: 'Password reset (dev preview)',
            text: `Per resettare la password visita: ${resetUrl}`,
            html: `<p>Per resettare la password visita: <a href="${resetUrl}">${resetUrl}</a></p>`
          });

          const previewUrl = nodemailer.getTestMessageUrl(info);
          console.log('Ethereal preview URL:', previewUrl);
        } catch (err) {
          console.log('Password reset token (no SMTP configured):', token);
        }
      } else {
        console.log('Password reset token (no SMTP configured):', token);
      }

      // In development include token in the response to allow easy local testing
      const resp: any = { message: 'Se l\'email è registrata, riceverai istruzioni per il reset.' };
      if (process.env.NODE_ENV === 'development' || (process.env.BASE_URL || '').includes('localhost')) {
        resp.token = token;
        resp.resetUrl = `${process.env.BASE_URL || 'http://localhost:5173'}/reset-password?token=${token}`;
      }

      return res.json(resp);
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ message: 'Impossibile processare la richiesta' });
    }
  });

  // Reset password endpoint
  apiRouter.post('/reset-password', async (req, res) => {
    try {
      const { token, password } = req.body || {};
      if (!token || !password) return res.status(400).json({ message: 'Token e password richiesti' });

      const reset = await storage.getPasswordResetByToken(token);
      if (!reset) return res.status(400).json({ message: 'Token non valido o scaduto' });

      const expiresAt = new Date(reset.expiresAt || reset.expires_at);
      if (expiresAt.getTime() < Date.now()) {
        // Clean up expired
        await storage.deletePasswordResetById(reset.id);
        return res.status(400).json({ message: 'Token scaduto' });
      }

      // Hash new password
      const { hashPassword } = await import('./auth');
      const hashed = await hashPassword(password);

      await storage.updateUserPassword(reset.userId, hashed);
      await storage.deletePasswordResetById(reset.id);

      return res.json({ message: 'Password aggiornata con successo' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ message: 'Impossibile resettare la password' });
    }
  });

  // Update incident (mark as resolved)
  apiRouter.patch("/incidents/:id", async (req, res) => {
    try {
      const incidentId = parseInt(req.params.id, 10);
      if (isNaN(incidentId)) {
        return res.status(400).json({ message: "Invalid incident ID" });
      }

      const { endTime, status } = req.body;
      
      // Update the incident
      const updatedIncident = await storage.updateIncident(incidentId, { 
        endTime: endTime || new Date().toISOString(),
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

  // Get user's favorites
  apiRouter.get("/favorites", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Non autenticato" });
    }
    try {
      const userId = (req.user as any).id;
      const favorites = await storage.getFavorites(userId);
      res.json(favorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ message: "Failed to fetch favorites" });
    }
  });

  // Add a favorite
  apiRouter.post("/favorites/:serviceId", async (req, res) => {
    console.log("POST /favorites/:serviceId - Auth check");
    if (!req.isAuthenticated()) {
      console.log("User not authenticated");
      return res.status(401).json({ message: "Non autenticato" });
    }
    try {
      const userId = (req.user as any).id;
      const serviceId = parseInt(req.params.serviceId, 10);
      
      console.log("Adding favorite - User:", userId, "Service:", serviceId);

      if (isNaN(serviceId)) {
        console.log("Invalid service ID:", req.params.serviceId);
        return res.status(400).json({ message: "Invalid service ID" });
      }

      // Verify service exists
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
      if (error instanceof Error && (error as any).stack) {
        console.error((error as any).stack);
      }
      const payload: any = { message: error instanceof Error ? error.message : "Failed to add favorite" };
      if (process.env.NODE_ENV === 'development' && error instanceof Error) {
        payload.stack = error.stack;
      }
      res.status(500).json(payload);
    }
  });

  // Remove a favorite
  apiRouter.delete("/favorites/:serviceId", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Non autenticato" });
    }
    try {
      const userId = (req.user as any).id;
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

  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
