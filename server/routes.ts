import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import archiver from "archiver";
import PDFDocument from "pdfkit";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
import { db } from "./storage";
import { auditLogs } from "@shared/schema";
import { 
  insertAnnouncementSchema,
  insertFacultySchema,
  insertTimetableSchema,
  insertAdmissionSchema,
  insertGalleryImageSchema,
  insertFacilitySchema,
  insertTestimonialSchema,
  insertCareerSchema
} from "@shared/schema";

// Helper function to log audit events
async function logAuditEvent(req: Request, action: string, tableName: string, recordId: string, oldData?: any, newData?: any) {
  try {
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';
    const adminUsername = (req.session as any)?.adminUsername || 'anonymous';
    console.log(`[AUDIT LOG] Action: ${action}, Table: ${tableName}, Admin: ${adminUsername}, Record: ${recordId}`);
    await db.insert(auditLogs).values({
      id: randomUUID(),
      action,
      tableName,
      recordId,
      adminUsername,
      ipAddress: typeof ipAddress === 'string' ? ipAddress : ipAddress[0],
      userAgent: typeof userAgent === 'string' ? userAgent : 'unknown',
      oldData: oldData ? JSON.stringify(oldData) : null,
      newData: newData ? JSON.stringify(newData) : null,
    });
  } catch (error) {
    console.error("Failed to log audit event:", error);
  }
}

const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/announcements", async (req, res) => {
    try {
      const announcements = await storage.getAnnouncements();
      res.json(announcements);
    } catch (error) {
      console.error("[GET /api/announcements] Error:", error);
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
      await logAuditEvent(req, "CREATE", "announcements", announcement.id, null, announcement);
      res.status(201).json(announcement);
    } catch (error: any) {
      console.error("Announcement error:", error);
      res.status(400).json({ message: error?.message || "Invalid announcement data" });
    }
  });

  app.patch("/api/announcements/:id", async (req, res) => {
    try {
      const old = await storage.getAnnouncements().then(a => a.find(x => x.id === req.params.id));
      const { title, content, priority } = req.body;
      // Validate only the provided fields
      if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
      }
      const updateData = {
        title,
        content,
        priority: priority || 0,
        date: old?.date || new Date(), // Keep existing date or use current
      };
      const parsed = insertAnnouncementSchema.parse(updateData);
      const updated = await storage.updateAnnouncement(req.params.id, parsed);
      await logAuditEvent(req, "UPDATE", "announcements", req.params.id, old, updated);
      res.json(updated);
    } catch (error: any) {
      console.error("Announcement update error:", error);
      res.status(400).json({ message: error?.message || "Invalid announcement data" });
    }
  });

  app.delete("/api/announcements/:id", async (req, res) => {
    try {
      const old = await storage.getAnnouncements().then(a => a.find(x => x.id === req.params.id));
      await storage.deleteAnnouncement(req.params.id);
      await logAuditEvent(req, "DELETE", "announcements", req.params.id, old, null);
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
      await logAuditEvent(req, "CREATE", "faculty", faculty.id, null, faculty);
      res.status(201).json(faculty);
    } catch (error: any) {
      console.error("Faculty error:", error);
      res.status(400).json({ message: error?.message || "Invalid faculty data" });
    }
  });

  app.patch("/api/faculty/:id", async (req, res) => {
    try {
      const old = await storage.getFaculty().then(f => f.find(x => x.id === req.params.id));
      const parsed = insertFacultySchema.parse(req.body);
      const updated = await storage.updateFaculty(req.params.id, parsed);
      await logAuditEvent(req, "UPDATE", "faculty", req.params.id, old, updated);
      res.json(updated);
    } catch (error: any) {
      console.error("Faculty update error:", error);
      res.status(400).json({ message: error?.message || "Invalid faculty data" });
    }
  });

  app.delete("/api/faculty/:id", async (req, res) => {
    try {
      const old = await storage.getFaculty().then(f => f.find(x => x.id === req.params.id));
      await storage.deleteFaculty(req.params.id);
      await logAuditEvent(req, "DELETE", "faculty", req.params.id, old, null);
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
      await logAuditEvent(req, "CREATE", "timetables", timetable.id, null, timetable);
      res.status(201).json(timetable);
    } catch (error) {
      res.status(400).json({ message: "Invalid timetable data" });
    }
  });

  app.patch("/api/timetables/:id", async (req, res) => {
    try {
      const old = await storage.getTimetables().then(t => t.find(x => x.id === req.params.id));
      const parsed = insertTimetableSchema.parse(req.body);
      const updated = await storage.updateTimetable(req.params.id, parsed);
      await logAuditEvent(req, "UPDATE", "timetables", req.params.id, old, updated);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ message: "Invalid timetable data" });
    }
  });

  app.delete("/api/timetables/:id", async (req, res) => {
    try {
      const old = await storage.getTimetables().then(t => t.find(x => x.id === req.params.id));
      await storage.deleteTimetable(req.params.id);
      await logAuditEvent(req, "DELETE", "timetables", req.params.id, old, null);
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
      console.error("[GET /api/admissions] Error:", error);
      res.status(500).json({ message: "Failed to fetch admissions" });
    }
  });

  app.post("/api/admissions/send-email", upload.single("file"), async (req, res) => {
    try {
      const { name, email, phone, className, lastSchool, fileUrls } = req.body;
      
      if (!name || !email || !phone || !className) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const admissionData = {
        name,
        email,
        phone,
        className,
        lastSchool: lastSchool || undefined,
        birthCertificateUrl: fileUrls?.birthCertificate || undefined,
        reportCardUrl: fileUrls?.reportCard || undefined,
        transferCertificateUrl: fileUrls?.transferCertificate || undefined,
        photographsUrl: fileUrls?.photographs || undefined,
        addressProofUrl: fileUrls?.addressProof || undefined,
        parentIdProofUrl: fileUrls?.parentIdProof || undefined,
        submittedAt: new Date(),
      };

      const parsed = insertAdmissionSchema.parse(admissionData);
      const admission = await storage.createAdmission(parsed);
      await logAuditEvent(req, "CREATE", "admissions", admission.id, null, admission);

      const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
      let emailBody = `New Admission Application\n\n`;
      emailBody += `Student Name: ${name}\n`;
      emailBody += `Email: ${email}\n`;
      emailBody += `Phone: ${phone}\n`;
      emailBody += `Class Applying For: ${className}\n`;
      if (lastSchool) {
        emailBody += `Last School: ${lastSchool}\n`;
      }
      emailBody += `\nDocument Links:\n`;
      
      if (fileUrls?.birthCertificate) {
        emailBody += `Birth Certificate: ${fileUrls.birthCertificate}\n`;
      }
      if (fileUrls?.reportCard) {
        emailBody += `Report Card: ${fileUrls.reportCard}\n`;
      }
      if (fileUrls?.transferCertificate) {
        emailBody += `Transfer Certificate: ${fileUrls.transferCertificate}\n`;
      }
      if (fileUrls?.photographs) {
        emailBody += `Photographs: ${fileUrls.photographs}\n`;
      }
      if (fileUrls?.addressProof) {
        emailBody += `Address Proof: ${fileUrls.addressProof}\n`;
      }
      if (fileUrls?.parentIdProof) {
        emailBody += `Parent ID Proof: ${fileUrls.parentIdProof}\n`;
      }

      const subject = `New Admission Request — ${name}`;
      const mailtoLink = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      
      res.json({ mailtoLink, admission });
    } catch (error: any) {
      console.error("Send email error:", error);
      res.status(400).json({ message: error?.message || "Failed to send email" });
    }
  });

  app.post("/api/admissions/upload-file", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file provided" });
      }

      const base64Data = req.file.buffer.toString('base64');
      const dataUrl = `data:${req.file.mimetype};base64,${base64Data}`;
      
      res.json({ url: dataUrl });
    } catch (error: any) {
      console.error("File upload error:", error);
      res.status(400).json({ message: error?.message || "Failed to upload file" });
    }
  });

  app.delete("/api/admissions/:id", async (req, res) => {
    try {
      const old = await storage.getAdmission(req.params.id);
      await storage.deleteAdmission(req.params.id);
      await logAuditEvent(req, "DELETE", "admissions", req.params.id, old, null);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete admission" });
    }
  });

  app.get("/api/gallery", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 12;
      const category = req.query.category as string || "all";
      
      let images = await storage.getGalleryImages();
      
      // Filter by category if provided and not "all"
      if (category && category !== "all") {
        images = images.filter(img => img.category === category);
      }
      
      // Calculate pagination
      const total = images.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const paginatedImages = images.slice(startIndex, startIndex + limit);
      
      res.json({
        images: paginatedImages,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasMore: page < totalPages
        }
      });
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
      await logAuditEvent(req, "CREATE", "gallery_images", image.id, null, image);
      res.status(201).json(image);
    } catch (error: any) {
      console.error("Gallery error:", error);
      res.status(400).json({ message: error?.message || "Invalid gallery image data" });
    }
  });

  app.patch("/api/gallery/:id", async (req, res) => {
    try {
      const old = await storage.getGalleryImages().then(g => g.find(x => x.id === req.params.id));
      const parsed = insertGalleryImageSchema.parse(req.body);
      const updated = await storage.updateGalleryImage(req.params.id, parsed);
      await logAuditEvent(req, "UPDATE", "gallery_images", req.params.id, old, updated);
      res.json(updated);
    } catch (error: any) {
      console.error("Gallery update error:", error);
      res.status(400).json({ message: error?.message || "Invalid gallery image data" });
    }
  });

  app.delete("/api/gallery/:id", async (req, res) => {
    try {
      const old = await storage.getGalleryImages().then(g => g.find(x => x.id === req.params.id));
      await storage.deleteGalleryImage(req.params.id);
      await logAuditEvent(req, "DELETE", "gallery_images", req.params.id, old, null);
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
      await logAuditEvent(req, "CREATE", "facilities", facility.id, null, facility);
      res.status(201).json(facility);
    } catch (error: any) {
      console.error("Facility error:", error);
      res.status(400).json({ message: error?.message || "Invalid facility data" });
    }
  });

  app.patch("/api/facilities/:id", async (req, res) => {
    try {
      const old = await storage.getFacilities().then(f => f.find(x => x.id === req.params.id));
      const parsed = insertFacilitySchema.parse(req.body);
      const updated = await storage.updateFacility(req.params.id, parsed);
      await logAuditEvent(req, "UPDATE", "facilities", req.params.id, old, updated);
      res.json(updated);
    } catch (error: any) {
      console.error("Facility update error:", error);
      res.status(400).json({ message: error?.message || "Invalid facility data" });
    }
  });

  app.delete("/api/facilities/:id", async (req, res) => {
    try {
      const old = await storage.getFacilities().then(f => f.find(x => x.id === req.params.id));
      await storage.deleteFacility(req.params.id);
      await logAuditEvent(req, "DELETE", "facilities", req.params.id, old, null);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete facility" });
    }
  });

  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const parsed = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(parsed);
      await logAuditEvent(req, "CREATE", "testimonials", testimonial.id, null, testimonial);
      res.status(201).json(testimonial);
    } catch (error: any) {
      console.error("Testimonial error:", error);
      res.status(400).json({ message: error?.message || "Invalid testimonial data" });
    }
  });

  app.delete("/api/testimonials/:id", async (req, res) => {
    try {
      const old = await storage.getTestimonials().then(t => t.find(x => x.id === req.params.id));
      await storage.deleteTestimonial(req.params.id);
      await logAuditEvent(req, "DELETE", "testimonials", req.params.id, old, null);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete testimonial" });
    }
  });

  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getAdminUser(username);
      
      if (!user) {
        console.log(`[ADMIN LOGIN] ✗ Failed for user: ${username} - user not found`);
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (passwordMatch) {
        (req.session as any).adminLoggedIn = true;
        (req.session as any).adminUsername = username;
        (req.session as any).adminRole = user.role;
        console.log(`[ADMIN LOGIN] ✓ Success for user: ${username} (${user.role})`);
        res.json({ success: true, role: user.role });
      } else {
        console.log(`[ADMIN LOGIN] ✗ Failed for user: ${username} - wrong password`);
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("[ADMIN LOGIN] Error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.get("/api/admin/all-users", async (req, res) => {
    try {
      if ((req.session as any)?.adminRole !== "master-admin") {
        return res.status(403).json({ message: "Only master admins can view this" });
      }
      const users = await storage.getAllAdminUsers();
      const sanitized = users.map(u => ({ id: u.id, username: u.username, role: u.role, createdAt: u.createdAt }));
      res.json(sanitized);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.post("/api/admin/create-user", async (req, res) => {
    try {
      if ((req.session as any)?.adminRole !== "master-admin") {
        return res.status(403).json({ message: "Only master admins can create users" });
      }
      const { username, password, role } = req.body;
      if (!username || !password || !role) {
        return res.status(400).json({ message: "Username, password, and role are required" });
      }
      const user = await storage.createAdminUser({ username, password, role });
      await logAuditEvent(req, "CREATE", "admin_users", username, null, { username, role });
      res.status(201).json({ username: user.username, role: user.role });
    } catch (error: any) {
      console.error("Create admin error:", error);
      res.status(400).json({ message: error?.message || "Failed to create user" });
    }
  });

  app.delete("/api/admin/user/:username", async (req, res) => {
    try {
      if ((req.session as any)?.adminRole !== "master-admin") {
        return res.status(403).json({ message: "Only master admins can delete users" });
      }
      const old = await storage.getAdminUser(req.params.username);
      await storage.deleteAdminUser(req.params.username);
      await logAuditEvent(req, "DELETE", "admin_users", req.params.username, { username: old?.username, role: old?.role }, null);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  app.patch("/api/admin/user/:username", async (req, res) => {
    try {
      if ((req.session as any)?.adminRole !== "master-admin") {
        return res.status(403).json({ message: "Only master admins can update users" });
      }
      const { password, role } = req.body;
      const old = await storage.getAdminUser(req.params.username);
      const updates: any = {};
      if (password) updates.password = password;
      if (role) updates.role = role;
      const user = await storage.updateAdminUser(req.params.username, updates);
      await logAuditEvent(req, "UPDATE", "admin_users", req.params.username, { username: old?.username, role: old?.role }, { username: user.username, role: user.role });
      res.json({ username: user.username, role: user.role });
    } catch (error) {
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  app.get("/api/admin/check", async (req, res) => {
    if ((req.session as any)?.adminLoggedIn) {
      res.json({ authenticated: true });
    } else {
      res.status(401).json({ authenticated: false });
    }
  });

  app.post("/api/admin/logout", async (req, res) => {
    (req.session as any).adminLoggedIn = false;
    (req.session as any).adminUsername = undefined;
    res.json({ success: true });
  });

  app.get("/api/careers", async (req, res) => {
    try {
      const careers = await storage.getCareers();
      res.json(careers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch careers" });
    }
  });

  app.post("/api/careers", async (req, res) => {
    try {
      const parsed = insertCareerSchema.parse(req.body);
      const career = await storage.createCareer(parsed);
      await logAuditEvent(req, "CREATE", "careers", career.id, null, career);
      res.status(201).json(career);
    } catch (error: any) {
      console.error("Career error:", error);
      res.status(400).json({ message: error?.message || "Invalid career data" });
    }
  });

  app.patch("/api/careers/:id", async (req, res) => {
    try {
      const old = await storage.getCareers().then(c => c.find(x => x.id === req.params.id));
      const { title, description, qualifications, experience } = req.body;
      // Validate required fields
      if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
      }
      const updateData = {
        title,
        description,
        qualifications: qualifications || "",
        experience: experience || "",
        createdAt: old?.createdAt || new Date(), // Keep existing createdAt
      };
      const parsed = insertCareerSchema.parse(updateData);
      const updated = await storage.updateCareer(req.params.id, parsed);
      await logAuditEvent(req, "UPDATE", "careers", req.params.id, old, updated);
      res.json(updated);
    } catch (error: any) {
      console.error("Career update error:", error);
      res.status(400).json({ message: error?.message || "Invalid career data" });
    }
  });

  app.delete("/api/careers/:id", async (req, res) => {
    try {
      const old = await storage.getCareers().then(c => c.find(x => x.id === req.params.id));
      await storage.deleteCareer(req.params.id);
      await logAuditEvent(req, "DELETE", "careers", req.params.id, old, null);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete career" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
