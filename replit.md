# Kilbil High School & Junior Collage Website

## Overview

This is a full-stack web application for Kilbil High School & Junior Collage in Pimple Gurav, Pune. The website serves as a comprehensive digital presence for the school, established in 1980, providing information about academics, faculty, admissions, facilities, and school activities. The design follows a warm, humanized, and child-friendly approach inspired by modern educational websites, featuring soft color palettes (maroon primary, pastel green secondary) and emphasizing visual appeal through background images, glassmorphism effects, and smooth animations.

The application includes both a public-facing website and an admin dashboard for content management, allowing staff to update announcements, faculty information, timetables, gallery images, and facilities without touching code.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool and development server.

**Routing**: Wouter (lightweight client-side routing) handles navigation between pages including Home, About sections (President/Director/Principal messages, Why Us, Faculty), Academics (Elementary, Primary, Secondary, Higher Secondary), Admissions, Facilities, Gallery, Career, Contact, Announcements, and Admin dashboard.

**UI Component Library**: Shadcn UI components (Radix UI primitives) provide the design system with custom Tailwind CSS configuration. The design uses the "new-york" style variant with custom color tokens for primary (maroon), secondary (green), and neutral tones.

**State Management**: TanStack Query (React Query) manages server state, data fetching, caching, and mutations. Forms use React Hook Form with Zod validation resolvers.

**Styling Approach**: Tailwind CSS with custom configuration including design tokens for colors, spacing, and shadows. The theme supports glassmorphism effects, elevation layers, and responsive design with mobile-first breakpoints. CSS variables enable dynamic theming.

**Design Patterns**: Component composition with reusable UI primitives, container/presentational component separation, and consistent use of shadcn/ui patterns. The Navbar and Footer are global components, while page-specific components handle their own data fetching.

### Backend Architecture

**Runtime**: Node.js with Express.js framework running in ESNext module format.

**API Design**: RESTful endpoints under `/api/*` namespace handle CRUD operations for announcements, faculty, timetables, admissions, gallery images, and facilities. The API returns JSON responses with appropriate HTTP status codes.

**Request Processing**: Express middleware handles JSON body parsing, URL encoding, and raw body capture for verification. Request logging middleware tracks API call duration and responses.

**Development vs Production**: Separate entry points (`index-dev.ts` and `index-prod.ts`) handle development with Vite HMR middleware and production with static file serving from the built `dist/public` directory.

**Storage Layer**: Abstracted through an `IStorage` interface with an in-memory implementation (`MemStorage`). The interface defines methods for all CRUD operations, making it easy to swap to database-backed storage without changing business logic. Currently uses Map-based in-memory storage with UUID-based identifiers.

**File Uploads**: Multer middleware configured for file handling (currently memory storage) to support document uploads in admission forms and image uploads for gallery/faculty photos.

### Data Storage

**Schema Definition**: Drizzle ORM defines database schemas in `shared/schema.ts` with PostgreSQL dialect. Tables include announcements, faculty, timetables, admissions, gallery_images, and facilities.

**Database Configuration**: Configured for PostgreSQL via `@neondatabase/serverless` driver. Connection details read from `DATABASE_URL` environment variable. Drizzle Kit handles migrations in the `migrations` directory.

**Data Models**: Zod schemas generated from Drizzle tables using `drizzle-zod` provide runtime validation for API inputs. All models include UUID primary keys, timestamps where relevant, and appropriate field types (text, varchar, integer, timestamp).

**Current Implementation**: The application uses in-memory storage (MemStorage class) as a placeholder. Database schema is defined but not actively used, allowing easy migration to PostgreSQL by swapping the storage implementation.

### External Dependencies

**UI Components**: Radix UI primitives (@radix-ui/*) provide accessible, unstyled components for accordion, dialog, dropdown, navigation menu, popover, select, tabs, toast notifications, and more.

**Styling**: Tailwind CSS for utility-first styling with PostCSS processing. Class Variance Authority (CVA) and clsx for conditional class composition.

**Forms**: React Hook Form for form state management with @hookform/resolvers for Zod schema validation integration.

**Date Handling**: date-fns library for date formatting and manipulation.

**HTTP Client**: Native Fetch API with custom wrapper functions in `lib/queryClient.ts` for consistent error handling and request formatting.

**Development Tools**: Replit-specific plugins for error overlay, cartographer, and dev banner in development mode. TypeScript for type safety across the entire stack.

**Asset Management**: Vite alias configuration allows importing assets from `@assets` directory. Generated placeholder images stored in `attached_assets/generated_images/`.

**Session Management**: connect-pg-simple package available for PostgreSQL-backed session storage (prepared for authentication implementation).