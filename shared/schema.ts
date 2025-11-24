import { pgTable, text, varchar, timestamp, integer, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const announcements = pgTable("announcements", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  date: timestamp("date").notNull(),
  priority: integer("priority").notNull().default(0),
});

export const faculty = pgTable("faculty", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  qualification: text("qualification").notNull(),
  experience: text("experience").notNull(),
  photo: text("photo"),
  subject: text("subject").notNull(),
  bio: text("bio").notNull(),
  order: integer("order").notNull().default(0),
});

export const timetables = pgTable("timetables", {
  id: varchar("id").primaryKey(),
  category: text("category").notNull(),
  periods: text("periods").notNull(),
});

export const admissions = pgTable("admissions", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  className: text("class_name").notNull(),
  birthCertificate: text("birth_certificate"),
  reportCard: text("report_card"),
  transferCertificate: text("transfer_certificate"),
  photographs: text("photographs"),
  addressProof: text("address_proof"),
  parentIdProof: text("parent_id_proof"),
  submittedAt: timestamp("submitted_at").notNull(),
});

export const careers = pgTable("careers", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  qualifications: text("qualifications"),
  experience: text("experience"),
  createdAt: timestamp("created_at").notNull(),
});

export const galleryImages = pgTable("gallery_images", {
  id: varchar("id").primaryKey(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
  uploadedAt: timestamp("uploaded_at").notNull(),
});

export const facilities = pgTable("facilities", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  order: integer("order").notNull().default(0),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey(),
  studentName: text("student_name").notNull(),
  studentClass: text("student_class").notNull(),
  message: text("message").notNull(),
  rating: integer("rating").notNull().default(5),
  photo: text("photo"),
  order: integer("order").notNull().default(0),
});

export const insertAnnouncementSchema = createInsertSchema(announcements).omit({ id: true });
export const insertFacultySchema = createInsertSchema(faculty).omit({ id: true, order: true }).extend({
  photo: z.string().optional(),
  order: z.number().optional().default(0),
});
export const insertTimetableSchema = createInsertSchema(timetables).omit({ id: true });
export const insertAdmissionSchema = createInsertSchema(admissions).omit({ id: true }).extend({
  birthCertificate: z.string().optional(),
  reportCard: z.string().optional(),
  transferCertificate: z.string().optional(),
  photographs: z.string().optional(),
  addressProof: z.string().optional(),
  parentIdProof: z.string().optional(),
});

export const insertCareerSchema = createInsertSchema(careers).omit({ id: true, createdAt: true }).extend({
  qualifications: z.string().optional(),
  experience: z.string().optional(),
});
export const insertGalleryImageSchema = createInsertSchema(galleryImages).omit({ id: true }).extend({
  caption: z.string().optional(),
});
export const insertFacilitySchema = createInsertSchema(facilities).omit({ id: true, order: true }).extend({
  imageUrl: z.string().optional(),
  order: z.number().optional().default(0),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true, order: true }).extend({
  photo: z.string().optional(),
  rating: z.number().min(1).max(5).optional().default(5),
  order: z.number().optional().default(0),
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({ id: true, createdAt: true });

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;

export type Faculty = typeof faculty.$inferSelect;
export type InsertFaculty = z.infer<typeof insertFacultySchema>;

export type Timetable = typeof timetables.$inferSelect;
export type InsertTimetable = z.infer<typeof insertTimetableSchema>;

export type Admission = typeof admissions.$inferSelect;
export type InsertAdmission = z.infer<typeof insertAdmissionSchema>;

export type Career = typeof careers.$inferSelect;
export type InsertCareer = z.infer<typeof insertCareerSchema>;

export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;

export type Facility = typeof facilities.$inferSelect;
export type InsertFacility = z.infer<typeof insertFacilitySchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export interface Period {
  name: string;
  time: string;
  isBreak?: boolean;
}
