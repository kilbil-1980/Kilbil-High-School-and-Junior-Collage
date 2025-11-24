import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { eq, desc } from "drizzle-orm";
import bcrypt from "bcrypt";

const { Pool } = pg;
import type { 
  Announcement, InsertAnnouncement,
  Faculty, InsertFaculty,
  Timetable, InsertTimetable,
  Admission, InsertAdmission,
  GalleryImage, InsertGalleryImage,
  Facility, InsertFacility,
  Testimonial, InsertTestimonial,
  Career, InsertCareer,
  AdminUser, InsertAdminUser
} from "@shared/schema";
import * as schema from "@shared/schema";
import { randomUUID } from "crypto";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

export interface IStorage {
  getAnnouncements(): Promise<Announcement[]>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  deleteAnnouncement(id: string): Promise<void>;

  getFaculty(): Promise<Faculty[]>;
  createFaculty(faculty: InsertFaculty): Promise<Faculty>;
  deleteFaculty(id: string): Promise<void>;

  getTimetables(): Promise<Timetable[]>;
  createTimetable(timetable: InsertTimetable): Promise<Timetable>;
  deleteTimetable(id: string): Promise<void>;

  getAdmissions(): Promise<Admission[]>;
  createAdmission(admission: InsertAdmission): Promise<Admission>;
  deleteAdmission(id: string): Promise<void>;
  getAdmission(id: string): Promise<Admission | undefined>;
  deleteAllAdmissions(): Promise<void>;

  getGalleryImages(): Promise<GalleryImage[]>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  deleteGalleryImage(id: string): Promise<void>;

  getFacilities(): Promise<Facility[]>;
  createFacility(facility: InsertFacility): Promise<Facility>;
  deleteFacility(id: string): Promise<void>;

  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  deleteTestimonial(id: string): Promise<void>;

  getCareers(): Promise<Career[]>;
  createCareer(career: InsertCareer): Promise<Career>;
  deleteCareer(id: string): Promise<void>;

  getAdminUser(username: string): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  getAllAdminUsers(): Promise<AdminUser[]>;
  deleteAdminUser(username: string): Promise<void>;
  updateAdminUser(username: string, user: Partial<InsertAdminUser>): Promise<AdminUser>;
}

export class DatabaseStorage implements IStorage {
  async getAnnouncements(): Promise<Announcement[]> {
    try {
      const results = await db.select().from(schema.announcements).orderBy(desc(schema.announcements.date));
      return results;
    } catch (error) {
      console.error("[getAnnouncements] Database error:", error);
      throw error;
    }
  }

  async createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement> {
    const [result] = await db.insert(schema.announcements).values({
      id: randomUUID(),
      ...announcement,
      date: new Date(),
    }).returning();
    return result;
  }

  async deleteAnnouncement(id: string): Promise<void> {
    await db.delete(schema.announcements).where(eq(schema.announcements.id, id));
  }

  async getFaculty(): Promise<Faculty[]> {
    const results = await db.select().from(schema.faculty).orderBy(schema.faculty.order);
    return results;
  }

  async createFaculty(faculty: InsertFaculty): Promise<Faculty> {
    const [result] = await db.insert(schema.faculty).values({
      id: randomUUID(),
      ...faculty,
    }).returning();
    return result;
  }

  async deleteFaculty(id: string): Promise<void> {
    await db.delete(schema.faculty).where(eq(schema.faculty.id, id));
  }

  async getTimetables(): Promise<Timetable[]> {
    const results = await db.select().from(schema.timetables);
    return results;
  }

  async createTimetable(timetable: InsertTimetable): Promise<Timetable> {
    const [result] = await db.insert(schema.timetables).values({
      id: randomUUID(),
      ...timetable,
    }).returning();
    return result;
  }

  async deleteTimetable(id: string): Promise<void> {
    await db.delete(schema.timetables).where(eq(schema.timetables.id, id));
  }

  async getAdmissions(): Promise<Admission[]> {
    try {
      const results = await db.select().from(schema.admissions).orderBy(desc(schema.admissions.submittedAt));
      return results;
    } catch (error) {
      console.error("[getAdmissions] Database error:", error);
      throw error;
    }
  }

  async createAdmission(admission: InsertAdmission): Promise<Admission> {
    const [result] = await db.insert(schema.admissions).values({
      id: randomUUID(),
      ...admission,
      submittedAt: new Date(),
    }).returning();
    return result;
  }

  async deleteAdmission(id: string): Promise<void> {
    await db.delete(schema.admissions).where(eq(schema.admissions.id, id));
  }

  async getAdmission(id: string): Promise<Admission | undefined> {
    const results = await db.select().from(schema.admissions).where(eq(schema.admissions.id, id));
    return results && results.length > 0 ? results[0] : undefined;
  }

  async deleteAllAdmissions(): Promise<void> {
    await db.delete(schema.admissions);
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    const results = await db.select().from(schema.galleryImages).orderBy(desc(schema.galleryImages.uploadedAt));
    return results;
  }

  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const [result] = await db.insert(schema.galleryImages).values({
      id: randomUUID(),
      ...image,
      uploadedAt: new Date(),
    }).returning();
    return result;
  }

  async deleteGalleryImage(id: string): Promise<void> {
    await db.delete(schema.galleryImages).where(eq(schema.galleryImages.id, id));
  }

  async getFacilities(): Promise<Facility[]> {
    const results = await db.select().from(schema.facilities).orderBy(schema.facilities.order);
    return results;
  }

  async createFacility(facility: InsertFacility): Promise<Facility> {
    const [result] = await db.insert(schema.facilities).values({
      id: randomUUID(),
      ...facility,
    }).returning();
    return result;
  }

  async deleteFacility(id: string): Promise<void> {
    await db.delete(schema.facilities).where(eq(schema.facilities.id, id));
  }

  async getTestimonials(): Promise<Testimonial[]> {
    const results = await db.select().from(schema.testimonials).orderBy(schema.testimonials.order);
    return results;
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [result] = await db.insert(schema.testimonials).values({
      id: randomUUID(),
      ...testimonial,
    }).returning();
    return result;
  }

  async deleteTestimonial(id: string): Promise<void> {
    await db.delete(schema.testimonials).where(eq(schema.testimonials.id, id));
  }

  async getCareers(): Promise<Career[]> {
    const results = await db.select().from(schema.careers).orderBy(desc(schema.careers.createdAt));
    return results;
  }

  async createCareer(career: InsertCareer): Promise<Career> {
    const [result] = await db.insert(schema.careers).values({
      id: randomUUID(),
      ...career,
      createdAt: new Date(),
    }).returning();
    return result;
  }

  async deleteCareer(id: string): Promise<void> {
    await db.delete(schema.careers).where(eq(schema.careers.id, id));
  }

  async getAdminUser(username: string): Promise<AdminUser | undefined> {
    try {
      const results = await db.select().from(schema.adminUsers).where(eq(schema.adminUsers.username, username));
      return results && results.length > 0 ? results[0] : undefined;
    } catch (error) {
      console.error("Error getting admin user:", error);
      return undefined;
    }
  }

  async getAllAdminUsers(): Promise<AdminUser[]> {
    try {
      const results = await db.select().from(schema.adminUsers);
      return results;
    } catch (error) {
      console.error("Error getting all admin users:", error);
      return [];
    }
  }

  async createAdminUser(user: InsertAdminUser): Promise<AdminUser> {
    const hashedPassword = await bcrypt.hash(user.password, 9);
    const [result] = await db.insert(schema.adminUsers).values({
      ...user,
      password: hashedPassword,
    }).returning();
    return result;
  }

  async deleteAdminUser(username: string): Promise<void> {
    await db.delete(schema.adminUsers).where(eq(schema.adminUsers.username, username));
  }

  async updateAdminUser(username: string, updates: Partial<InsertAdminUser>): Promise<AdminUser> {
    const updateData: any = { ...updates };
    if (updates.password) {
      updateData.password = await bcrypt.hash(updates.password, 9);
    }
    const [result] = await db.update(schema.adminUsers).set(updateData).where(eq(schema.adminUsers.username, username)).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
