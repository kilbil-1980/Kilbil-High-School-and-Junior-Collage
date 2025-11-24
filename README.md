# Kilbil High School & Junior College Website

A comprehensive full-stack web application for Kilbil High School & Junior College in Pimple Gurav, Pune, India. Built with modern technologies, this platform provides a complete digital presence including public-facing website, admin content management system, student admissions, faculty management, and comprehensive audit logging.

**Established**: 1980  
**Location**: Pimple Gurav, Pune, India

---

## Table of Contents

1. [Technologies & Stack](#technologies--stack)
2. [Project Structure](#project-structure)
3. [Features](#features)
4. [Database Architecture](#database-architecture)
5. [API Documentation](#api-documentation)
6. [Admin Dashboard](#admin-dashboard)
7. [Setup & Installation](#setup--installation)
8. [Environment Variables](#environment-variables)
9. [Running the Application](#running-the-application)
10. [Deployment](#deployment)

---

## Technologies & Stack

### Frontend
- **React 18.3.1** - UI library with functional components and hooks
- **TypeScript 5.6.3** - Type-safe JavaScript
- **Vite 5.4.20** - Modern build tool with hot module replacement
- **TanStack Query (React Query) 5.60.5** - Server state management and data fetching
- **Wouter 3.3.5** - Lightweight client-side routing (alternative to React Router)
- **React Hook Form 7.55.0** - Efficient form state management
- **Zod 3.24.2** - TypeScript-first schema validation
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - High-quality accessible UI components built on Radix UI
- **Lucide React 0.453.0** - Beautiful SVG icon library
- **Framer Motion 11.13.1** - Animation library
- **Radix UI Primitives** - Accessible component primitives

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 4.21.2** - Web application framework
- **TypeScript** - Type-safe backend development
- **tsx 4.20.5** - TypeScript execution for development

### Database & ORM
- **PostgreSQL** - Relational database via Neon serverless
- **Drizzle ORM 0.39.1** - Type-safe database queries
- **Drizzle Kit 0.31.4** - Database migrations and introspection
- **drizzle-zod 0.7.0** - Zod schema generation from Drizzle tables
- **@neondatabase/serverless 0.10.4** - Serverless PostgreSQL driver

### Security & Sessions
- **bcrypt 6.0.0** - Password hashing (9 rounds)
- **express-session 1.18.1** - Session management
- **connect-pg-simple 10.0.0** - PostgreSQL session store
- **passport 0.7.0** - Authentication middleware (prepared for expansion)
- **passport-local 1.0.0** - Local authentication strategy

### File Handling & Processing
- **multer 2.0.2** - File upload middleware
- **archiver 7.0.1** - ZIP file creation for document exports
- **pdfkit 0.17.2** - PDF document generation (prepared for certificates)

### Data & Utilities
- **date-fns 3.6.0** - Date formatting and manipulation
- **recharts 2.15.2** - Data visualization library
- **zod-validation-error 3.4.0** - User-friendly validation error messages
- **class-variance-authority 0.7.1** - Component styling variants
- **tailwind-merge 2.6.0** - Utility class merging

### Development Tools
- **Replit Vite Plugins**
  - @replit/vite-plugin-cartographer - Code mapping
  - @replit/vite-plugin-dev-banner - Development banner
  - @replit/vite-plugin-runtime-error-modal - Runtime error overlay
- **PostCSS 8.4.47** - CSS transformation
- **Autoprefixer 10.4.20** - CSS vendor prefixes
- **@tailwindcss/typography** - Typography styles
- **@tailwindcss/vite** - Tailwind CSS for Vite

---

## Project Structure

```
kilbil-school-website/
├── client/                           # Frontend React application
│   └── src/
│       ├── pages/                    # Page components
│       │   ├── Home.tsx              # Landing page
│       │   ├── Admin.tsx             # Admin dashboard container
│       │   ├── Announcements.tsx     # Public announcements page
│       │   ├── Admissions.tsx        # Admission form page
│       │   ├── Faculty.tsx           # Faculty listing page
│       │   ├── FacultyDetail.tsx     # Individual faculty profile
│       │   ├── AcademicLevel.tsx     # Academic levels (Elementary, Primary, Secondary, Higher Secondary)
│       │   ├── Timetable.tsx         # Student timetable page
│       │   ├── Facilities.tsx        # School facilities page
│       │   ├── Gallery.tsx           # Image gallery page
│       │   ├── Career.tsx            # Career opportunities page
│       │   ├── Contact.tsx           # Contact form page
│       │   ├── PresidentMessage.tsx  # President message
│       │   ├── DirectorMessage.tsx   # Director message
│       │   ├── PrincipalMessage.tsx  # Principal message
│       │   ├── WhyUs.tsx             # Why choose our school
│       │   └── not-found.tsx         # 404 page
│       ├── components/
│       │   ├── Navbar.tsx            # Navigation bar
│       │   ├── Footer.tsx            # Footer
│       │   ├── AnnouncementTicker.tsx # Scrolling announcement ticker
│       │   ├── AdminLogin.tsx        # Admin login form
│       │   ├── ScrollToTop.tsx       # Route change scroll-to-top
│       │   ├── admin/                # Admin dashboard components
│       │   │   ├── AdminAuditLogs.tsx    # Audit logging viewer
│       │   │   ├── AdminManagement.tsx   # Admin user CRUD
│       │   │   ├── AdminAnnouncements.tsx # Announcement management
│       │   │   ├── AdminFaculty.tsx      # Faculty management
│       │   │   ├── AdminTimetables.tsx   # Timetable management
│       │   │   ├── AdminAdmissions.tsx   # Admissions management
│       │   │   ├── AdminGallery.tsx      # Gallery management
│       │   │   ├── AdminFacilities.tsx   # Facilities management
│       │   │   ├── AdminCareer.tsx       # Career postings management
│       │   │   └── AdminTestimonials.tsx # Testimonials management
│       │   └── ui/                   # shadcn/ui components
│       │       ├── button.tsx
│       │       ├── card.tsx
│       │       ├── input.tsx
│       │       ├── form.tsx
│       │       ├── select.tsx
│       │       ├── textarea.tsx
│       │       ├── alert-dialog.tsx
│       │       └── ... (20+ UI components)
│       ├── lib/
│       │   └── queryClient.ts        # TanStack Query configuration
│       ├── hooks/
│       │   └── use-toast.ts          # Toast notification hook
│       ├── App.tsx                   # Root app component with routing
│       ├── main.tsx                  # React entry point
│       └── index.css                 # Global styles and CSS variables
├── server/
│   ├── routes.ts                     # API route handlers
│   ├── storage.ts                    # Database abstraction layer
│   ├── index-dev.ts                  # Development server entry
│   ├── index-prod.ts                 # Production server entry
│   └── vite.ts                       # Vite dev server integration
├── shared/
│   └── schema.ts                     # Drizzle ORM schema definitions
├── vite.config.ts                    # Vite configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── postcss.config.js                 # PostCSS configuration
├── tsconfig.json                     # TypeScript configuration
├── drizzle.config.ts                 # Drizzle ORM configuration
├── package.json                      # Project dependencies
└── README.md                          # This file
```

---

## Features

### Public Website Features

#### Home Page
- School overview and introduction
- Key highlights and achievements
- News/announcements ticker
- Quick navigation to key sections
- Call-to-action buttons for admissions and contact

#### About Section
- **President's Message** - School leadership vision
- **Director's Message** - Academic direction and strategy
- **Principal's Message** - Day-to-day school operations
- **Why Us** - Unique value propositions and differentiators

#### Academics
- **Elementary Section** - Classes 1-2
- **Primary Section** - Classes 3-5
- **Secondary Section** - Classes 6-8
- **Higher Secondary Section** - Classes 9-12, Junior College

#### Faculty Directory
- Complete faculty listing with photos
- Individual faculty profiles with:
  - Qualifications
  - Experience
  - Subject specialization
  - Personal bio
- Searchable and sortable interface

#### Timetables
- Class-wise timetables for:
  - Morning Batch
  - Afternoon Batch
  - Junior College
- Period-wise scheduling with break/lunch indicators
- Admin-editable timetable management

#### Admissions
- Online admission form with fields:
  - Student name, email, phone
  - Class selection
  - Previous school (optional)
  - Six document uploads:
    - Birth certificate
    - Report card
    - Transfer certificate
    - Photographs
    - Address proof
    - Parent ID proof
- Real-time form validation
- Document upload with base64 encoding
- Confirmation message on successful submission

#### Facilities
- Showcase of school facilities:
  - Classrooms
  - Labs
  - Sports grounds
  - Library
  - Cafeteria
  - etc.
- Facility descriptions and photos
- Highlight key amenities

#### Gallery
- Multi-category image gallery
- Categories: Events, Activities, Campus Views, etc.
- Captions and descriptions
- Responsive image grid layout

#### Career Opportunities
- Job postings from school
- Required qualifications
- Experience requirements
- Application information
- Contact details

#### Announcements
- Scrolling announcement ticker
- Latest news and updates
- Public announcements page with full details
- Priority-based ordering

#### Testimonials
- Student and parent testimonials
- Ratings (1-5 stars)
- Student photos and class information
- Carousel/rotation display

#### Contact
- Contact form for inquiries
- School location and hours
- Contact information
- Google Maps integration (prepared)

### Admin Dashboard Features

#### Authentication & Authorization
- **Master Admin Role**
  - Full CRUD on sub-admin accounts
  - Can manage all content
  - Default credentials: `masteradmin / masteradmin@kilbil1980`
  
- **Sub-Admin Role**
  - Content management only
  - Cannot create/delete other admins
  - Example credentials: `admin / kilbil123456`

#### Admin Users Management
- Create new admin accounts
- Delete existing admins
- Assign roles (master-admin, sub-admin)
- Password hashing with bcrypt (9 rounds)
- Role-based access control

#### Content Management

**Announcements**
- Create, edit, delete announcements
- Title and content management
- Priority settings for ticker ordering
- Automatic timestamp tracking

**Faculty Management**
- Add new faculty members
- Upload faculty photos
- Manage qualifications and experience
- Subject assignment
- Bio/description editing
- Faculty ordering/sequencing
- Delete faculty records

**Timetables**
- Create timetable for different batches:
  - Morning Batch
  - Afternoon Batch
  - Junior College
- Configure periods (name, time, break indicator)
- **Edit timetables** - Modify existing timetables
- **Delete with confirmation** - Confirmation dialog before deletion
- JSON-based period storage

**Admissions Management**
- View all student admission forms
- Download individual student documents as ZIP
- Download all admission documents
- Delete admission records
- View full student information
- Document management

**Gallery Management**
- Upload images to gallery
- Categorize images
- Add captions and descriptions
- Delete images
- Image ordering

**Facilities Management**
- Add facility information
- Upload facility photos
- Edit descriptions
- Reorder facilities
- Delete facilities

**Career Management**
- Post job openings
- Title, description, qualifications, experience
- Edit job postings
- Delete with confirmation dialog
- Display on public career page

**Testimonials Management**
- Add student/parent testimonials
- Upload testimonial photos
- Rating system (1-5 stars)
- Student class and name tracking
- Edit testimonials
- Delete testimonials
- Reorder testimonials

#### Audit Logging
- Comprehensive audit trail of ALL admin actions
- Captures:
  - Action type (CREATE, UPDATE, DELETE)
  - Table name
  - Record ID
  - Admin username (not anonymous)
  - IP address
  - User agent
  - Old data (before change)
  - New data (after change)
  - Timestamp
- Searchable and filterable audit logs
- Historical data retention
- Tracks all CRUD operations across:
  - Users (Admin Management)
  - Announcements
  - Faculty
  - Timetables
  - Admissions
  - Gallery
  - Facilities
  - Career
  - Testimonials

---

## Database Architecture

### Services Used
- **PostgreSQL Database**: Neon serverless PostgreSQL
- **Connection**: Via `@neondatabase/serverless` driver
- **Connection String**: Retrieved from `DATABASE_URL` environment variable
- **ORM**: Drizzle ORM with TypeScript-first approach
- **Session Store**: PostgreSQL (via connect-pg-simple)

### Database Tables & Schema

#### 1. **admin_users** - Administrator accounts
```sql
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL,  -- bcrypt hashed (9 rounds)
  role VARCHAR(50) NOT NULL DEFAULT 'sub-admin',  -- 'master-admin' or 'sub-admin'
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

**TypeScript Type:**
```typescript
type AdminUser = {
  id: number;
  username: string;
  password: string;  // hashed
  role: 'master-admin' | 'sub-admin';
  createdAt: Date;
};
```

#### 2. **announcements** - School announcements
```sql
CREATE TABLE announcements (
  id VARCHAR(36) PRIMARY KEY,  -- UUID
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date TIMESTAMP NOT NULL,
  priority INTEGER NOT NULL DEFAULT 0
);
```

**TypeScript Type:**
```typescript
type Announcement = {
  id: string;
  title: string;
  content: string;
  date: Date;
  priority: number;
};
```

#### 3. **faculty** - Faculty member information
```sql
CREATE TABLE faculty (
  id VARCHAR(36) PRIMARY KEY,  -- UUID
  name TEXT NOT NULL,
  qualification TEXT NOT NULL,
  experience TEXT NOT NULL,
  photo TEXT,  -- base64 or URL
  subject TEXT NOT NULL,
  bio TEXT NOT NULL,
  order INTEGER NOT NULL DEFAULT 0
);
```

**TypeScript Type:**
```typescript
type Faculty = {
  id: string;
  name: string;
  qualification: string;
  experience: string;
  photo?: string;
  subject: string;
  bio: string;
  order: number;
};
```

#### 4. **timetables** - Class timetables
```sql
CREATE TABLE timetables (
  id VARCHAR(36) PRIMARY KEY,  -- UUID
  category TEXT NOT NULL,  -- 'Morning Batch', 'Afternoon Batch', 'Junior College'
  periods TEXT NOT NULL  -- JSON array of periods
);
```

**Period Structure (JSON):**
```typescript
type Period = {
  name: string;     // e.g., "Mathematics", "English"
  time: string;     // e.g., "8:00 AM - 9:00 AM"
  isBreak?: boolean; // true for break/lunch periods
};
```

**TypeScript Type:**
```typescript
type Timetable = {
  id: string;
  category: string;
  periods: string;  // JSON stringified Period[]
};
```

#### 5. **admissions** - Student admission forms
```sql
CREATE TABLE admissions (
  id VARCHAR(36) PRIMARY KEY,  -- UUID
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  class_name TEXT NOT NULL,
  last_school TEXT,  -- Optional
  birth_certificate TEXT,  -- base64 document
  report_card TEXT,  -- base64 document
  transfer_certificate TEXT,  -- base64 document
  photographs TEXT,  -- base64 document
  address_proof TEXT,  -- base64 document
  parent_id_proof TEXT,  -- base64 document
  submitted_at TIMESTAMP NOT NULL
);
```

**TypeScript Type:**
```typescript
type Admission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  className: string;
  lastSchool?: string;
  birthCertificate?: string;
  reportCard?: string;
  transferCertificate?: string;
  photographs?: string;
  addressProof?: string;
  parentIdProof?: string;
  submittedAt: Date;
};
```

#### 6. **careers** - Job postings
```sql
CREATE TABLE careers (
  id VARCHAR(36) PRIMARY KEY,  -- UUID
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  qualifications TEXT,
  experience TEXT,
  created_at TIMESTAMP NOT NULL
);
```

**TypeScript Type:**
```typescript
type Career = {
  id: string;
  title: string;
  description: string;
  qualifications?: string;
  experience?: string;
  createdAt: Date;
};
```

#### 7. **gallery_images** - Gallery images
```sql
CREATE TABLE gallery_images (
  id VARCHAR(36) PRIMARY KEY,  -- UUID
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,  -- base64 or URL
  caption TEXT,
  uploaded_at TIMESTAMP NOT NULL
);
```

**TypeScript Type:**
```typescript
type GalleryImage = {
  id: string;
  category: string;
  imageUrl: string;
  caption?: string;
  uploadedAt: Date;
};
```

#### 8. **facilities** - School facilities
```sql
CREATE TABLE facilities (
  id VARCHAR(36) PRIMARY KEY,  -- UUID
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,  -- base64 or URL
  order INTEGER NOT NULL DEFAULT 0
);
```

**TypeScript Type:**
```typescript
type Facility = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  order: number;
};
```

#### 9. **testimonials** - Student/Parent testimonials
```sql
CREATE TABLE testimonials (
  id VARCHAR(36) PRIMARY KEY,  -- UUID
  student_name TEXT NOT NULL,
  student_class TEXT NOT NULL,
  message TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  photo TEXT,  -- base64 or URL
  order INTEGER NOT NULL DEFAULT 0
);
```

**TypeScript Type:**
```typescript
type Testimonial = {
  id: string;
  studentName: string;
  studentClass: string;
  message: string;
  rating: number;  -- 1-5
  photo?: string;
  order: number;
};
```

#### 10. **audit_logs** - Administrative action audit trail
```sql
CREATE TABLE audit_logs (
  id VARCHAR(36) PRIMARY KEY,  -- UUID
  action TEXT NOT NULL,  -- 'CREATE', 'UPDATE', 'DELETE'
  table_name TEXT NOT NULL,
  record_id TEXT NOT NULL,
  admin_username TEXT,
  ip_address TEXT,
  user_agent TEXT,
  old_data TEXT,  -- JSON string (nullable)
  new_data TEXT,  -- JSON string (nullable)
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

**TypeScript Type:**
```typescript
type AuditLog = {
  id: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  tableName: string;
  recordId: string;
  adminUsername?: string;
  ipAddress?: string;
  userAgent?: string;
  oldData?: string;  // JSON stringified
  newData?: string;  -- JSON stringified
  timestamp: Date;
};
```

---

## API Documentation

### Base URL
All API endpoints are prefixed with `/api/`

### Authentication
- Session-based authentication using `express-session`
- Admin login required for content management endpoints
- Public endpoints accessible without authentication

### Common Response Format
All responses return JSON with appropriate HTTP status codes.

---

### Announcements API

#### GET /api/announcements
Get all announcements (ordered by date descending)

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "School Reopening",
    "content": "School reopens on...",
    "date": "2024-11-24T10:00:00Z",
    "priority": 1
  }
]
```

#### POST /api/announcements
Create new announcement (requires admin auth)

**Request:**
```json
{
  "title": "Announcement Title",
  "content": "Full announcement content"
}
```

**Response:** `201 Created` with created announcement object

**Audit Log:** ✅ Logged as CREATE

#### DELETE /api/announcements/:id
Delete announcement (requires admin auth)

**Response:** `204 No Content`

**Audit Log:** ✅ Logged as DELETE with old data

---

### Faculty API

#### GET /api/faculty
Get all faculty members (ordered by order field)

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Dr. John Smith",
    "qualification": "B.Ed, M.A",
    "experience": "10 years",
    "subject": "Mathematics",
    "bio": "Experienced math educator...",
    "photo": "base64_string_or_url",
    "order": 1
  }
]
```

#### POST /api/faculty
Create new faculty member (requires admin auth)

**Request:**
```json
{
  "name": "Faculty Name",
  "qualification": "Qualifications",
  "experience": "Experience details",
  "subject": "Subject taught",
  "bio": "Biography",
  "photo": "base64_image"
}
```

**Response:** `201 Created`

**Audit Log:** ✅ Logged as CREATE

#### DELETE /api/faculty/:id
Delete faculty member (requires admin auth)

**Response:** `204 No Content`

**Audit Log:** ✅ Logged as DELETE

---

### Timetables API

#### GET /api/timetables
Get all timetables

**Response:**
```json
[
  {
    "id": "uuid",
    "category": "Morning Batch",
    "periods": "[{\"name\":\"Period 1\",\"time\":\"8:00 AM - 9:00 AM\",\"isBreak\":false}]"
  }
]
```

#### POST /api/timetables
Create new timetable (requires admin auth)

**Request:**
```json
{
  "category": "Morning Batch",
  "periods": "[{\"name\":\"Period 1\",\"time\":\"8:00 AM - 9:00 AM\",\"isBreak\":false}]"
}
```

**Response:** `201 Created`

**Audit Log:** ✅ Logged as CREATE

#### PATCH /api/timetables/:id
Update timetable (requires admin auth)

**Request:**
```json
{
  "category": "Morning Batch",
  "periods": "[...]"
}
```

**Response:** `200 OK` with updated timetable

**Audit Log:** ✅ Logged as UPDATE with old and new data

#### DELETE /api/timetables/:id
Delete timetable (requires admin auth)

**Response:** `204 No Content`

**Audit Log:** ✅ Logged as DELETE with old data

---

### Admissions API

#### GET /api/admissions
Get all admission forms (requires admin auth)

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Student Name",
    "email": "student@example.com",
    "phone": "9876543210",
    "className": "Class 9",
    "lastSchool": "Previous School Name",
    "birthCertificate": "base64_document",
    "reportCard": "base64_document",
    "transferCertificate": "base64_document",
    "photographs": "base64_document",
    "addressProof": "base64_document",
    "parentIdProof": "base64_document",
    "submittedAt": "2024-11-24T10:00:00Z"
  }
]
```

#### POST /api/admissions
Submit new admission form (public endpoint)

**Request:** `multipart/form-data`
- name: string
- email: string
- phone: string
- className: string
- lastSchool: string (optional)
- birthCertificate: file
- reportCard: file
- transferCertificate: file
- photographs: file
- addressProof: file
- parentIdProof: file

**Response:** `201 Created`

#### DELETE /api/admissions/:id
Delete admission form (requires admin auth)

**Response:** `204 No Content`

**Audit Log:** ✅ Logged as DELETE

#### DELETE /api/admissions/clear-all
Delete all admission forms (requires admin auth)

**Response:** `204 No Content`

**Audit Log:** ✅ Logged individually for each deletion

#### GET /api/admissions/download/:id
Download single student's documents as ZIP

**Response:** ZIP file download

#### GET /api/admissions/download-all
Download all students' documents as ZIP

**Response:** ZIP file download

---

### Gallery API

#### GET /api/gallery
Get all gallery images (ordered by upload date)

**Response:**
```json
[
  {
    "id": "uuid",
    "category": "Events",
    "imageUrl": "base64_image",
    "caption": "Event photo",
    "uploadedAt": "2024-11-24T10:00:00Z"
  }
]
```

#### POST /api/gallery
Upload gallery image (requires admin auth)

**Request:**
```json
{
  "category": "Events",
  "imageUrl": "base64_image",
  "caption": "Optional caption"
}
```

**Response:** `201 Created`

**Audit Log:** ✅ Logged as CREATE

#### DELETE /api/gallery/:id
Delete gallery image (requires admin auth)

**Response:** `204 No Content`

**Audit Log:** ✅ Logged as DELETE

---

### Facilities API

#### GET /api/facilities
Get all facilities (ordered by order field)

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Library",
    "description": "Well-stocked library with...",
    "imageUrl": "base64_image",
    "order": 1
  }
]
```

#### POST /api/facilities
Create facility (requires admin auth)

**Request:**
```json
{
  "name": "Facility Name",
  "description": "Description",
  "imageUrl": "base64_image"
}
```

**Response:** `201 Created`

**Audit Log:** ✅ Logged as CREATE

#### DELETE /api/facilities/:id
Delete facility (requires admin auth)

**Response:** `204 No Content`

**Audit Log:** ✅ Logged as DELETE

---

### Careers API

#### GET /api/careers
Get all job postings

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Mathematics Teacher",
    "description": "We are looking for...",
    "qualifications": "B.Ed, M.Sc",
    "experience": "3+ years",
    "createdAt": "2024-11-24T10:00:00Z"
  }
]
```

#### POST /api/careers
Post job opening (requires admin auth)

**Request:**
```json
{
  "title": "Job Title",
  "description": "Job description",
  "qualifications": "Required qualifications",
  "experience": "Experience required"
}
```

**Response:** `201 Created`

**Audit Log:** ✅ Logged as CREATE

#### DELETE /api/careers/:id
Delete job posting (requires admin auth)

**Response:** `204 No Content`

**Audit Log:** ✅ Logged as DELETE with old data

---

### Testimonials API

#### GET /api/testimonials
Get all testimonials (ordered by order field)

**Response:**
```json
[
  {
    "id": "uuid",
    "studentName": "Student Name",
    "studentClass": "Class 10",
    "message": "Great school...",
    "rating": 5,
    "photo": "base64_image",
    "order": 1
  }
]
```

#### POST /api/testimonials
Add testimonial (requires admin auth)

**Request:**
```json
{
  "studentName": "Name",
  "studentClass": "Class 10",
  "message": "Testimonial message",
  "rating": 5,
  "photo": "base64_image"
}
```

**Response:** `201 Created`

**Audit Log:** ✅ Logged as CREATE

#### DELETE /api/testimonials/:id
Delete testimonial (requires admin auth)

**Response:** `204 No Content`

**Audit Log:** ✅ Logged as DELETE

---

### Admin Users API

#### GET /api/admin/users
Get all admin users (master-admin only)

**Response:**
```json
[
  {
    "id": 1,
    "username": "admin",
    "role": "sub-admin",
    "createdAt": "2024-11-24T10:00:00Z"
  }
]
```

#### POST /api/admin/users
Create new admin user (master-admin only)

**Request:**
```json
{
  "username": "newadmin",
  "password": "secure_password",
  "role": "sub-admin"
}
```

**Response:** `201 Created`

**Audit Log:** ✅ Logged as CREATE

#### DELETE /api/admin/users/:username
Delete admin user (master-admin only)

**Response:** `204 No Content`

**Audit Log:** ✅ Logged as DELETE

#### POST /api/admin/login
Admin login

**Request:**
```json
{
  "username": "admin",
  "password": "password"
}
```

**Response:** `200 OK` - Session created with httpOnly cookie

#### GET /api/admin/check
Check if admin is authenticated

**Response:**
```json
{
  "username": "admin",
  "role": "sub-admin"
}
```

#### POST /api/admin/logout
Logout admin

**Response:** `204 No Content`

---

### Audit Logs API

#### GET /api/audit-logs
Get all audit logs (requires admin auth)

**Query Parameters:**
- `action`: Filter by CREATE, UPDATE, DELETE
- `tableName`: Filter by table
- `adminUsername`: Filter by admin
- `limit`: Number of records (default 100)
- `offset`: Pagination offset

**Response:**
```json
[
  {
    "id": "uuid",
    "action": "CREATE",
    "tableName": "announcements",
    "recordId": "uuid",
    "adminUsername": "admin",
    "ipAddress": "192.168.1.1",
    "userAgent": "Mozilla/5.0...",
    "oldData": null,
    "newData": "{\"title\":\"...\"}",
    "timestamp": "2024-11-24T10:00:00Z"
  }
]
```

---

## Admin Dashboard

### Accessing Admin Panel
1. Navigate to `/admin`
2. Enter credentials:
   - **Master Admin**: `masteradmin / masteradmin@kilbil1980`
   - **Sub-Admin**: `admin / kilbil123456`

### Admin Tabs & Features

1. **Admin Users** (Master-Admin Only)
   - View all admin accounts
   - Create new sub-admins
   - Delete admin accounts
   - Role assignment

2. **Announcements**
   - Create announcements
   - Delete announcements
   - Priority ordering
   - Automatic ticker display

3. **Faculty**
   - Add faculty members
   - Upload faculty photos
   - Manage qualifications and experience
   - Set faculty order/sequencing
   - Delete faculty records

4. **Timetables**
   - Create batch timetables
   - **Edit existing timetables**
   - Configure periods (name, time, break indicator)
   - **Delete with confirmation dialog**

5. **Admissions**
   - View student admission forms
   - Download individual student documents as ZIP
   - Download all documents as ZIP
   - Delete admission records
   - View full applicant information

6. **Gallery**
   - Upload images to categories
   - Add captions
   - Delete images
   - Image organization

7. **Facilities**
   - Add facility information
   - Upload facility photos
   - Edit descriptions
   - Reorder facilities
   - Delete facilities

8. **Career**
   - Post job openings
   - Edit job listings
   - Delete with confirmation
   - Manage qualifications and requirements

9. **Testimonials**
   - Add student testimonials
   - Upload testimonial photos
   - Set rating (1-5 stars)
   - Reorder testimonials
   - Delete testimonials

10. **Audit Logs**
    - View all admin actions
    - Filter by action, table, admin, date
    - See old and new data
    - Track IP addresses and user agents

---

## Design System

### Color Palette
- **Primary**: Maroon (#8B4545)
- **Secondary**: Pastel Green (#A8D5BA)
- **Background**: Creamy White (#FAF8F5)
- **Accent**: Warm tones for highlights

### Components
All UI components use shadcn/ui built on Radix UI primitives:
- Buttons with multiple variants
- Forms with validation
- Select dropdowns
- Dialogs and alerts
- Cards and containers
- Input fields
- Textareas
- Navigation menus

### Responsive Design
- Mobile-first approach
- Tailwind CSS breakpoints
- Adaptive layouts for all screen sizes
- Touch-friendly admin interface

---

## Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- PostgreSQL database (Neon serverless recommended)
- Git for version control

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kilbil-school-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (see Environment Variables section)

4. **Push database schema**
   ```bash
   npm run db:push
   ```

5. **Initialize master admin account**
   The database will automatically initialize with default master admin on first start.

---

## Environment Variables

Create a `.env.local` file (development) or configure in Replit secrets:

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Server
PORT=5000
NODE_ENV=development

# Session
SESSION_SECRET=your-secure-session-secret-here

# Optional
VITE_API_URL=http://localhost:5000
```

### Explanation
- **DATABASE_URL**: PostgreSQL connection string from Neon
- **SESSION_SECRET**: Random string for session encryption
- **NODE_ENV**: development or production
- **VITE_API_URL**: API base URL for frontend (optional)

---

## Running the Application

### Development Mode
```bash
npm run dev
```
- Frontend runs on `http://localhost:5000` (Vite dev server)
- Backend runs on the same port with API at `/api/*`
- Hot module replacement (HMR) enabled for frontend changes
- Auto-reload for backend changes

### Production Build
```bash
npm run build
npm run start
```

### Type Checking
```bash
npm run check
```

### Database Migrations
```bash
npm run db:push          # Safe push of schema changes
npm run db:push --force  # Force push if data-loss warning
```

---

## Deployment

### Hosting Options
- **Replit**: Native support (recommended for this project)
- **Vercel**: For frontend only (with separate backend)
- **Railway**: Full-stack deployment
- **Fly.io**: Container-based deployment
- **Heroku**: Classic Node.js hosting

### Pre-deployment Checklist
- [ ] Environment variables configured
- [ ] Database migrations run successfully
- [ ] Admin credentials set
- [ ] All features tested
- [ ] SSL certificates configured (if custom domain)
- [ ] Build tested locally

### Replit Deployment
1. Push code to Replit
2. Configure environment variables in Secrets
3. Deploy using Replit's native deployment
4. App will be available at `<project>.replit.dev` or custom domain

### Production Considerations
- Enable HTTPS only
- Set secure session cookies
- Use strong SESSION_SECRET
- Regular database backups
- Monitor audit logs for suspicious activity
- Implement rate limiting for API endpoints
- Content Security Policy headers

---

## Performance Optimization

### Frontend Optimization
- Vite tree-shaking removes unused code
- React component lazy loading
- Image optimization and responsive images
- CSS-in-JS with Tailwind (minimal CSS bundle)
- Code splitting for routes

### Backend Optimization
- Connection pooling with Neon serverless
- Drizzle ORM query optimization
- Caching with React Query
- Efficient file compression for downloads
- Request logging for monitoring

### Database Optimization
- Indexed primary keys
- Efficient query patterns
- Connection pooling
- Regular maintenance

---

## Security

### Authentication & Authorization
- bcrypt password hashing (9 rounds)
- Session-based authentication
- Role-based access control (RBAC)
- Master-admin and sub-admin roles
- Secure HTTP-only session cookies

### Data Protection
- Base64 encoding for file uploads (stored in database)
- No plain text passwords
- Audit logging for all changes
- IP address and user agent tracking
- HTTPS recommended for production

### Input Validation
- Zod schema validation on all inputs
- Type-safe database queries
- Server-side validation for all mutations
- File size limits on uploads

---

## Troubleshooting

### Common Issues

**Database Connection Error**
- Verify DATABASE_URL is correct
- Check PostgreSQL is running (if local)
- Verify firewall/network access

**Build Errors**
- Clear `node_modules` and `.next`: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run check`

**Migration Issues**
- Use `npm run db:push --force` to override safety checks
- Don't manually edit migration files

**Admin Login Not Working**
- Check admin credentials
- Verify database has admin_users table
- Check SESSION_SECRET is set

---

## File Upload & Storage

### Current Implementation
- Files stored as base64 in PostgreSQL
- Maximum file size handled by multer (default 50MB)
- Supported formats: Any (validated by frontend MIME type)

### Document Types Handled
- PDF documents (birth certificate, transfer certificate, etc.)
- Images (JPEG, PNG, WebP)
- All encoded to base64 for database storage

---

## API Rate Limiting
Currently not implemented. Recommended for production:
- Implement express-rate-limit middleware
- Limit authentication attempts
- Limit document downloads
- Implement per-IP rate limiting

---

## Monitoring & Logging

### Audit Logs
Access via `/api/audit-logs` endpoint. Tracks:
- All admin CRUD operations
- Admin username
- IP address
- Timestamp
- Old and new data values
- Table and record ID

### Console Logging
Development mode includes:
- Request logging
- Database query logging
- Error logging with stack traces

---

## Future Enhancements

- [ ] Email notifications for admissions
- [ ] SMS alerts for announcements
- [ ] Student portal login
- [ ] Parent-teacher communication
- [ ] Fee management system
- [ ] Student performance tracking
- [ ] Advanced analytics dashboard
- [ ] API rate limiting
- [ ] Content caching layer
- [ ] CDN integration for static files

---

## License

MIT License - See LICENSE file for details

---

## Support & Contribution

For issues, feature requests, or contributions:
1. Create a GitHub issue with detailed description
2. Fork the repository
3. Create a feature branch
4. Submit a pull request

---

## Documentation Version

**Version**: 1.0.0  
**Last Updated**: November 24, 2024  
**Project Status**: Production-Ready

---

## Contact

**School**: Kilbil High School & Junior College  
**Location**: Pimple Gurav, Pune, India  
**Established**: 1980

For school-related inquiries, please use the Contact form on the website.
