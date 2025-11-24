import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import archiver from "archiver";
import PDFDocument from "pdfkit";
import { randomUUID } from "crypto";
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
    await db.insert(auditLogs).values({
      id: randomUUID(),
      action,
      tableName,
      recordId,
      adminUsername: (req.session as any)?.username || 'anonymous',
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
      console.error("[GET /api/admissions] Error:", error);
      res.status(500).json({ message: "Failed to fetch admissions" });
    }
  });

  app.post("/api/admissions", upload.fields([
    { name: 'birthCertificate', maxCount: 1 },
    { name: 'reportCard', maxCount: 1 },
    { name: 'transferCertificate', maxCount: 1 },
    { name: 'photographs', maxCount: 1 },
    { name: 'addressProof', maxCount: 1 },
    { name: 'parentIdProof', maxCount: 1 }
  ]), async (req, res) => {
    try {
      const files = req.files as any || {};
      const admissionData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        className: req.body.className,
        lastSchool: req.body.lastSchool,
        birthCertificate: files.birthCertificate ? files.birthCertificate[0].buffer.toString('base64') : undefined,
        reportCard: files.reportCard ? files.reportCard[0].buffer.toString('base64') : undefined,
        transferCertificate: files.transferCertificate ? files.transferCertificate[0].buffer.toString('base64') : undefined,
        photographs: files.photographs ? files.photographs[0].buffer.toString('base64') : undefined,
        addressProof: files.addressProof ? files.addressProof[0].buffer.toString('base64') : undefined,
        parentIdProof: files.parentIdProof ? files.parentIdProof[0].buffer.toString('base64') : undefined,
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

  app.delete("/api/admissions/clear-all", async (req, res) => {
    try {
      const all = await storage.getAdmissions();
      await storage.deleteAllAdmissions();
      for (const admission of all) {
        await logAuditEvent(req, "DELETE", "admissions", admission.id, admission, null);
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to clear admissions" });
    }
  });

  app.get("/api/admissions/download-all", async (req, res) => {
    try {
      const admissions = await storage.getAdmissions();
      if (admissions.length === 0) {
        return res.status(404).json({ message: "No admissions to download" });
      }

      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', `attachment; filename="all-admissions-${new Date().toISOString().split('T')[0]}.zip"`);

      const archive = archiver('zip', { zlib: { level: 9 } });
      archive.on('error', (err) => {
        console.error('Archive error:', err);
        res.status(500).json({ message: "Failed to create archive" });
      });
      archive.pipe(res);

      const docMap: Record<string, string> = {
        birthCertificate: 'birth-certificate',
        reportCard: 'report-card',
        transferCertificate: 'transfer-certificate',
        photographs: 'photographs',
        addressProof: 'address-proof',
        parentIdProof: 'parent-id-proof'
      };

      let processed = 0;
      for (const admission of admissions) {
        const folder = `${admission.name}`;
        
        const pdfDoc = new PDFDocument();
        const pdfChunks: Buffer[] = [];
        pdfDoc.on('data', (chunk: Buffer) => pdfChunks.push(chunk));
        pdfDoc.on('end', () => {
          const pdfBuffer = Buffer.concat(pdfChunks);
          archive.append(pdfBuffer, { name: `${folder}/applicant-details.pdf` });
          
          for (const [key, filename] of Object.entries(docMap)) {
            const base64Data = admission[key as keyof typeof admission];
            if (base64Data && typeof base64Data === 'string') {
              const buffer = Buffer.from(base64Data, 'base64');
              archive.append(buffer, { name: `${folder}/${filename}.bin` });
            }
          }

          processed++;
          if (processed === admissions.length) {
            archive.finalize();
          }
        });

        pdfDoc.fontSize(16).text('Admission Application Details', { underline: true });
        pdfDoc.moveDown();
        pdfDoc.fontSize(12);
        pdfDoc.text(`Student Name: ${admission.name}`);
        pdfDoc.text(`Email: ${admission.email}`);
        pdfDoc.text(`Phone: ${admission.phone}`);
        pdfDoc.text(`Class Applying For: ${admission.className}`);
        if (admission.lastSchool) {
          pdfDoc.text(`Last School: ${admission.lastSchool}`);
        }
        pdfDoc.text(`Submitted Date: ${new Date(admission.submittedAt).toLocaleString()}`);
        pdfDoc.end();
      }
    } catch (error) {
      console.error("Download all error:", error);
      res.status(500).json({ message: "Failed to download all documents" });
    }
  });

  app.get("/api/admissions/:id/download", async (req, res) => {
    try {
      const admission = await storage.getAdmission(req.params.id);
      if (!admission) {
        return res.status(404).json({ message: "Admission not found" });
      }

      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', `attachment; filename="admission-${req.params.id}.zip"`);

      const archive = archiver('zip', { zlib: { level: 9 } });
      
      archive.on('error', (err) => {
        console.error('Archive error:', err);
        res.status(500).json({ message: "Failed to create archive" });
      });

      archive.pipe(res);

      // Create PDF with applicant details
      const pdfDoc = new PDFDocument();
      const pdfChunks: Buffer[] = [];
      
      pdfDoc.on('data', (chunk: Buffer) => {
        pdfChunks.push(chunk);
      });

      pdfDoc.on('end', () => {
        const pdfBuffer = Buffer.concat(pdfChunks);
        archive.append(pdfBuffer, { name: 'applicant-details.pdf' });

        // Add document files
        const docMap: Record<string, string> = {
          birthCertificate: 'birth-certificate',
          reportCard: 'report-card',
          transferCertificate: 'transfer-certificate',
          photographs: 'photographs',
          addressProof: 'address-proof',
          parentIdProof: 'parent-id-proof'
        };

        for (const [key, filename] of Object.entries(docMap)) {
          const base64Data = admission[key as keyof typeof admission];
          if (base64Data && typeof base64Data === 'string') {
            const buffer = Buffer.from(base64Data, 'base64');
            archive.append(buffer, { name: `${filename}.bin` });
          }
        }

        archive.finalize();
      });

      pdfDoc.fontSize(16).text('Admission Application Details', { underline: true });
      pdfDoc.moveDown();
      pdfDoc.fontSize(12);
      pdfDoc.text(`Student Name: ${admission.name}`);
      pdfDoc.text(`Email: ${admission.email}`);
      pdfDoc.text(`Phone: ${admission.phone}`);
      pdfDoc.text(`Class Applying For: ${admission.className}`);
      if (admission.lastSchool) {
        pdfDoc.text(`Last School: ${admission.lastSchool}`);
      }
      pdfDoc.text(`Submitted Date: ${new Date(admission.submittedAt).toLocaleString()}`);
      pdfDoc.end();
    } catch (error) {
      console.error("Download error:", error);
      res.status(500).json({ message: "Failed to download documents" });
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
      await logAuditEvent(req, "CREATE", "gallery_images", image.id, null, image);
      res.status(201).json(image);
    } catch (error: any) {
      console.error("Gallery error:", error);
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
      
      console.log(`[ADMIN LOGIN] Attempt for user: ${username}, Found: ${!!user}, Password match: ${user && user.password === password}`);
      
      if (user && user.password === password) {
        (req.session as any).adminLoggedIn = true;
        (req.session as any).adminUsername = username;
        console.log(`[ADMIN LOGIN] ✓ Success for user: ${username}`);
        res.json({ success: true });
      } else {
        console.log(`[ADMIN LOGIN] ✗ Failed for user: ${username}`);
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("[ADMIN LOGIN] Error:", error);
      res.status(500).json({ message: "Login failed" });
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
