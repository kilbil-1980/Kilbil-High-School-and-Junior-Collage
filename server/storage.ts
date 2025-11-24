import type { 
  Announcement, InsertAnnouncement,
  Faculty, InsertFaculty,
  Timetable, InsertTimetable,
  Admission, InsertAdmission,
  GalleryImage, InsertGalleryImage,
  Facility, InsertFacility
} from "@shared/schema";
import { randomUUID } from "crypto";

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

  getGalleryImages(): Promise<GalleryImage[]>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  deleteGalleryImage(id: string): Promise<void>;

  getFacilities(): Promise<Facility[]>;
  createFacility(facility: InsertFacility): Promise<Facility>;
  deleteFacility(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private announcements: Map<string, Announcement>;
  private faculty: Map<string, Faculty>;
  private timetables: Map<string, Timetable>;
  private admissions: Map<string, Admission>;
  private galleryImages: Map<string, GalleryImage>;
  private facilities: Map<string, Facility>;

  constructor() {
    this.announcements = new Map();
    this.faculty = new Map();
    this.timetables = new Map();
    this.admissions = new Map();
    this.galleryImages = new Map();
    this.facilities = new Map();

    this.seedInitialData();
  }

  private seedInitialData() {
    const announcement1: Announcement = {
      id: randomUUID(),
      title: "Welcome to the New Academic Year 2024-25!",
      content: "We are excited to begin a new year of learning and growth. Classes commence from June 15th. All students are requested to report on time with proper uniform.",
      date: new Date(),
      priority: 1,
    };
    this.announcements.set(announcement1.id, announcement1);

    const announcement2: Announcement = {
      id: randomUUID(),
      title: "Annual Sports Day",
      content: "Annual Sports Day will be held on December 10th. Participation from all students is mandatory. Practice sessions will begin next week.",
      date: new Date(Date.now() - 86400000),
      priority: 0,
    };
    this.announcements.set(announcement2.id, announcement2);

    const faculty1: Faculty = {
      id: randomUUID(),
      name: "Dr. Sunita Patil",
      qualification: "M.Sc. Mathematics, B.Ed., Ph.D.",
      experience: "15 years of teaching experience",
      subject: "Mathematics",
      bio: "Dr. Patil is passionate about making mathematics accessible and enjoyable for all students. She specializes in innovative teaching methods that help students develop strong problem-solving skills.",
      photo: "",
      order: 0,
    };
    this.faculty.set(faculty1.id, faculty1);

    const faculty2: Faculty = {
      id: randomUUID(),
      name: "Mr. Rahul Desai",
      qualification: "M.Sc. Physics, B.Ed.",
      experience: "12 years of teaching experience",
      subject: "Physics",
      bio: "Mr. Desai brings physics concepts to life through practical demonstrations and real-world applications. His engaging teaching style makes complex topics easy to understand.",
      photo: "",
      order: 1,
    };
    this.faculty.set(faculty2.id, faculty2);

    const morningPeriods = [
      { name: "Assembly", time: "7:30 AM - 7:45 AM", isBreak: false },
      { name: "Period 1 - English", time: "7:45 AM - 8:30 AM", isBreak: false },
      { name: "Period 2 - Mathematics", time: "8:30 AM - 9:15 AM", isBreak: false },
      { name: "Short Break", time: "9:15 AM - 9:25 AM", isBreak: true },
      { name: "Period 3 - Science", time: "9:25 AM - 10:10 AM", isBreak: false },
      { name: "Period 4 - Social Studies", time: "10:10 AM - 10:55 AM", isBreak: false },
      { name: "Lunch Break", time: "10:55 AM - 11:25 AM", isBreak: true },
      { name: "Period 5 - Hindi", time: "11:25 AM - 12:10 PM", isBreak: false },
      { name: "Period 6 - Computer Science", time: "12:10 PM - 12:55 PM", isBreak: false },
      { name: "Period 7 - Physical Education", time: "12:55 PM - 1:40 PM", isBreak: false },
    ];

    const timetable1: Timetable = {
      id: randomUUID(),
      category: "Morning Batch",
      periods: JSON.stringify(morningPeriods),
    };
    this.timetables.set(timetable1.id, timetable1);

    const afternoonPeriods = [
      { name: "Period 1 - English", time: "1:00 PM - 1:45 PM", isBreak: false },
      { name: "Period 2 - Mathematics", time: "1:45 PM - 2:30 PM", isBreak: false },
      { name: "Short Break", time: "2:30 PM - 2:40 PM", isBreak: true },
      { name: "Period 3 - Science", time: "2:40 PM - 3:25 PM", isBreak: false },
      { name: "Period 4 - Social Studies", time: "3:25 PM - 4:10 PM", isBreak: false },
      { name: "Break", time: "4:10 PM - 4:20 PM", isBreak: true },
      { name: "Period 5 - Activities", time: "4:20 PM - 5:05 PM", isBreak: false },
    ];

    const timetable2: Timetable = {
      id: randomUUID(),
      category: "Afternoon Batch",
      periods: JSON.stringify(afternoonPeriods),
    };
    this.timetables.set(timetable2.id, timetable2);

    const collegePeriods = [
      { name: "Period 1", time: "8:00 AM - 9:00 AM", isBreak: false },
      { name: "Period 2", time: "9:00 AM - 10:00 AM", isBreak: false },
      { name: "Short Break", time: "10:00 AM - 10:15 AM", isBreak: true },
      { name: "Period 3", time: "10:15 AM - 11:15 AM", isBreak: false },
      { name: "Period 4", time: "11:15 AM - 12:15 PM", isBreak: false },
      { name: "Lunch Break", time: "12:15 PM - 1:00 PM", isBreak: true },
      { name: "Period 5", time: "1:00 PM - 2:00 PM", isBreak: false },
      { name: "Period 6", time: "2:00 PM - 3:00 PM", isBreak: false },
    ];

    const timetable3: Timetable = {
      id: randomUUID(),
      category: "Junior College",
      periods: JSON.stringify(collegePeriods),
    };
    this.timetables.set(timetable3.id, timetable3);

    const facility1: Facility = {
      id: randomUUID(),
      name: "Science Laboratory",
      description: "Well-equipped science labs with modern apparatus for Physics, Chemistry, and Biology experiments. Students get hands-on experience with practical applications of scientific concepts.",
      imageUrl: "",
      order: 0,
    };
    this.facilities.set(facility1.id, facility1);

    const facility2: Facility = {
      id: randomUUID(),
      name: "Library",
      description: "Our extensive library houses over 5,000 books covering various subjects. Comfortable reading spaces and digital resources support research and independent learning.",
      imageUrl: "",
      order: 1,
    };
    this.facilities.set(facility2.id, facility2);

    const facility3: Facility = {
      id: randomUUID(),
      name: "Sports Ground",
      description: "Large outdoor sports ground for cricket, football, athletics, and other sports activities. Regular physical education classes and inter-school competitions are held here.",
      imageUrl: "",
      order: 2,
    };
    this.facilities.set(facility3.id, facility3);

    const facility4: Facility = {
      id: randomUUID(),
      name: "Medical Room",
      description: "Dedicated medical room with trained staff to handle minor injuries and health emergencies. First aid and basic medical support available during school hours.",
      imageUrl: "",
      order: 3,
    };
    this.facilities.set(facility4.id, facility4);

    const facility5: Facility = {
      id: randomUUID(),
      name: "Book Bank",
      description: "Our book bank provides textbooks to students, ensuring no child is deprived of learning materials due to financial constraints. Books are maintained and updated regularly.",
      imageUrl: "",
      order: 4,
    };
    this.facilities.set(facility5.id, facility5);
  }

  async getAnnouncements(): Promise<Announcement[]> {
    return Array.from(this.announcements.values()).sort((a, b) => 
      b.date.getTime() - a.date.getTime()
    );
  }

  async createAnnouncement(insertAnnouncement: InsertAnnouncement): Promise<Announcement> {
    const announcement: Announcement = {
      id: randomUUID(),
      ...insertAnnouncement,
      date: new Date(),
    };
    this.announcements.set(announcement.id, announcement);
    return announcement;
  }

  async deleteAnnouncement(id: string): Promise<void> {
    this.announcements.delete(id);
  }

  async getFaculty(): Promise<Faculty[]> {
    return Array.from(this.faculty.values()).sort((a, b) => a.order - b.order);
  }

  async createFaculty(insertFaculty: InsertFaculty): Promise<Faculty> {
    const faculty: Faculty = {
      id: randomUUID(),
      ...insertFaculty,
      order: this.faculty.size,
    };
    this.faculty.set(faculty.id, faculty);
    return faculty;
  }

  async deleteFaculty(id: string): Promise<void> {
    this.faculty.delete(id);
  }

  async getTimetables(): Promise<Timetable[]> {
    return Array.from(this.timetables.values());
  }

  async createTimetable(insertTimetable: InsertTimetable): Promise<Timetable> {
    const timetable: Timetable = {
      id: randomUUID(),
      ...insertTimetable,
    };
    this.timetables.set(timetable.id, timetable);
    return timetable;
  }

  async deleteTimetable(id: string): Promise<void> {
    this.timetables.delete(id);
  }

  async getAdmissions(): Promise<Admission[]> {
    return Array.from(this.admissions.values()).sort((a, b) => 
      b.submittedAt.getTime() - a.submittedAt.getTime()
    );
  }

  async createAdmission(insertAdmission: InsertAdmission): Promise<Admission> {
    const admission: Admission = {
      id: randomUUID(),
      ...insertAdmission,
      submittedAt: new Date(),
    };
    this.admissions.set(admission.id, admission);
    return admission;
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    return Array.from(this.galleryImages.values()).sort((a, b) => 
      b.uploadedAt.getTime() - a.uploadedAt.getTime()
    );
  }

  async createGalleryImage(insertImage: InsertGalleryImage): Promise<GalleryImage> {
    const image: GalleryImage = {
      id: randomUUID(),
      ...insertImage,
      uploadedAt: new Date(),
    };
    this.galleryImages.set(image.id, image);
    return image;
  }

  async deleteGalleryImage(id: string): Promise<void> {
    this.galleryImages.delete(id);
  }

  async getFacilities(): Promise<Facility[]> {
    return Array.from(this.facilities.values()).sort((a, b) => a.order - b.order);
  }

  async createFacility(insertFacility: InsertFacility): Promise<Facility> {
    const facility: Facility = {
      id: randomUUID(),
      ...insertFacility,
      order: this.facilities.size,
    };
    this.facilities.set(facility.id, facility);
    return facility;
  }

  async deleteFacility(id: string): Promise<void> {
    this.facilities.delete(id);
  }
}

export const storage = new MemStorage();
