import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { updateServiceStatusSchema, insertIncidentSchema } from "../shared/schema.ts";
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

  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
