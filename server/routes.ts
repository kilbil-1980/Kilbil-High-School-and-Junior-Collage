import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { 
  insertAnnouncementSchema,
  insertFacultySchema,
  insertTimetableSchema,
  insertAdmissionSchema,
  insertGalleryImageSchema,
  insertFacilitySchema
} from "@shared/schema";

const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/announcements", async (req, res) => {
    try {
      const announcements = await storage.getAnnouncements();
      res.json(announcements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch announcements" });
    }
  });

  app.post("/api/announcements", async (req, res) => {
    try {
      const announcementData = {
        ...req.body,
        date: new Date(),
      };
      const parsed = insertAnnouncementSchema.parse(announcementData);
      const announcement = await storage.createAnnouncement(parsed);
      res.status(201).json(announcement);
    } catch (error: any) {
      console.error("Announcement error:", error);
      res.status(400).json({ message: error?.message || "Invalid announcement data" });
    }
  });

  app.delete("/api/announcements/:id", async (req, res) => {
    try {
      await storage.deleteAnnouncement(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete announcement" });
    }
  });

  app.get("/api/faculty", async (req, res) => {
    try {
      const faculty = await storage.getFaculty();
      res.json(faculty);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch faculty" });
    }
  });

  app.post("/api/faculty", async (req, res) => {
    try {
      const parsed = insertFacultySchema.parse(req.body);
      const faculty = await storage.createFaculty(parsed);
      res.status(201).json(faculty);
    } catch (error: any) {
      console.error("Faculty error:", error);
      res.status(400).json({ message: error?.message || "Invalid faculty data" });
    }
  });

  app.delete("/api/faculty/:id", async (req, res) => {
    try {
      await storage.deleteFaculty(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete faculty" });
    }
  });

  app.get("/api/timetables", async (req, res) => {
    try {
      const timetables = await storage.getTimetables();
      res.json(timetables);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch timetables" });
    }
  });

  app.post("/api/timetables", async (req, res) => {
    try {
      const parsed = insertTimetableSchema.parse(req.body);
      const timetable = await storage.createTimetable(parsed);
      res.status(201).json(timetable);
    } catch (error) {
      res.status(400).json({ message: "Invalid timetable data" });
    }
  });

  app.delete("/api/timetables/:id", async (req, res) => {
    try {
      await storage.deleteTimetable(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete timetable" });
    }
  });

  app.get("/api/admissions", async (req, res) => {
    try {
      const admissions = await storage.getAdmissions();
      res.json(admissions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch admissions" });
    }
  });

  app.post("/api/admissions", upload.single('document'), async (req, res) => {
    try {
      const admissionData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        className: req.body.className,
        documentName: req.file?.originalname,
        documentData: req.file ? req.file.buffer.toString('base64') : undefined,
        submittedAt: new Date(),
      };

      const parsed = insertAdmissionSchema.parse(admissionData);
      const admission = await storage.createAdmission(parsed);
      res.status(201).json(admission);
    } catch (error: any) {
      console.error("Admission error:", error);
      res.status(400).json({ message: error?.message || "Invalid admission data" });
    }
  });

  app.get("/api/gallery", async (req, res) => {
    try {
      const images = await storage.getGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery images" });
    }
  });

  app.post("/api/gallery", async (req, res) => {
    try {
      const imageData = {
        ...req.body,
        uploadedAt: new Date(),
      };
      const parsed = insertGalleryImageSchema.parse(imageData);
      const image = await storage.createGalleryImage(parsed);
      res.status(201).json(image);
    } catch (error: any) {
      console.error("Gallery error:", error);
      res.status(400).json({ message: error?.message || "Invalid gallery image data" });
    }
  });

  app.delete("/api/gallery/:id", async (req, res) => {
    try {
      await storage.deleteGalleryImage(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete gallery image" });
    }
  });

  app.get("/api/facilities", async (req, res) => {
    try {
      const facilities = await storage.getFacilities();
      res.json(facilities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch facilities" });
    }
  });

  app.post("/api/facilities", async (req, res) => {
    try {
      const parsed = insertFacilitySchema.parse(req.body);
      const facility = await storage.createFacility(parsed);
      res.status(201).json(facility);
    } catch (error: any) {
      console.error("Facility error:", error);
      res.status(400).json({ message: error?.message || "Invalid facility data" });
    }
  });

  app.delete("/api/facilities/:id", async (req, res) => {
    try {
      await storage.deleteFacility(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete facility" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
