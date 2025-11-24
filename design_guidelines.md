# Design Guidelines for Kilbil High School & Junior Collage Website

## Design Approach
**Reference-Based Approach**: Inspired by raika.school style - warm, humanized, and child-friendly educational website design.

## Core Visual Identity

### Color Palette
- **Primary**: Soft maroon (warm, educational)
- **Secondary**: Pastel green (growth, freshness)
- **Neutral**: Creamy white, warm gray
- **Avoid**: Default AI colors - use custom, thoughtful combinations

### Typography
- Clean, readable sans-serif fonts
- Hierarchy: Large headings for sections, medium for cards, comfortable body text
- Warm, welcoming tone throughout copy

### Background Strategy
- **Global body background**: Single background image across entire site
- **Section-level backgrounds**: Multiple background images for different sections
- **Layering**: Use semi-transparent overlays for text readability

## Layout System

### Spacing
Use Tailwind units: 4, 6, 8, 12, 16, 20, 24 for consistent rhythm

### Component Design
- **Cards**: Rounded corners (rounded-xl), soft shadows
- **Glassmorphism**: Subtle frosted glass effects on overlays and cards
- **Smooth animations**: Page transitions, hover states, scroll reveals
- **Mobile-first**: Fully responsive across all breakpoints

## Page-Specific Requirements

### Home Page
- **Hero Section**: Full-width banner with background image, school name, tagline
- **Announcement Ticker**: Scrolling bar below navbar showing latest announcement
- **Quick Links Grid**: Cards for Academics, Admissions, Gallery, Contact
- **School Highlights**: Est. 1980, 4.1 rating (31 reviews), Boys 613, Girls 510, State Board, Co-Ed
- **Principal Message Preview**: Photo, excerpt with "Read More" button
- **Embedded Google Map**: Interactive map to school location
- **Footer**: School info, working hours, contact details

### About Section
- **President's Message**: Photo, full message, warm background
- **Director's Message**: Similar layout with different content
- **Principal's Message**: Expanded version from home preview
- **Why Us**: Grid of reasons with icons and descriptions
- **Faculties**: Dynamic directory with cards showing photo, name, subject, qualification. Click opens detailed profile

### Academics
- Four subsections: Elementary, Primary, Secondary, Higher Secondary
- Each with curriculum details, images, and age groups
- Visual hierarchy distinguishing each level

### Dynamic Timetable
- **Three Categories**: Morning Batch, Afternoon Batch, Junior College
- **Table Layout**: Period names, times, breaks highlighted, lunch slot
- **Visual Design**: Clean grid, color-coded periods, easy to scan
- Illustrated, similar to provided screenshot reference

### Admissions
- **Form Section**: Name, Email, Phone, Class selection, Document upload
- **Contextual Info**: Admission process, requirements, deadlines
- **Call-to-Action**: Prominent submit button

### Facilities
- **Grid Layout**: Labs, Library, Sports Ground, Book Bank, Medical Room
- **Each Facility**: Image + title + description
- **Icons**: Relevant icons for each facility type

### Gallery
- **Multi-category Grid**: Filter by category
- **Lightbox Viewer**: Click image for full-screen view
- **Masonry Layout**: Varied image sizes for visual interest

### Announcements Page
- **List View**: All announcements with date, title, description
- **Latest First**: Chronological ordering
- **Card Design**: Each announcement as a distinct card

### Contact
- **Contact Form**: Name, email, message fields
- **School Details**: Address, phone, email, school code
- **Map Integration**: Embedded Google Maps
- **Working Hours**: Clearly displayed

## Navigation

### Navbar
- **Sticky**: Remains visible on scroll
- **Logo**: School name/emblem on left
- **Menu Items**: Home, About (dropdown), Academics (dropdown), Admissions, Facilities, Gallery, Career, Contact
- **Mobile**: Hamburger menu with smooth animation
- **Background**: Glassmorphism effect or solid with slight transparency

### Footer
- **Three Columns**: About School, Quick Links, Contact Info
- **Social Media Icons**: If applicable
- **Copyright**: School name and year

## Image Strategy

### Images Needed
- Hero banner (school building or students)
- Background images for body and sections
- Faculty photos (professional headshots)
- Facility images (labs, library, playground, etc.)
- Gallery images (events, activities, achievements)
- President, Director, Principal photos
- Icons for features and facilities (use Heroicons)

### Image Treatment
- **Overlays**: Dark semi-transparent for text readability
- **Rounded Corners**: Consistent with card design
- **Aspect Ratios**: Maintain consistency within sections

## Interactive Elements

### Buttons
- **Primary CTA**: Solid maroon, white text, rounded
- **Secondary**: Outlined, maroon border
- **On Images**: Blurred backgrounds, no hover interactions (built-in states handle it)

### Cards
- Hover: Subtle lift with increased shadow
- Click: Scale down slightly for feedback

### Forms
- Consistent input styling across all forms
- Clear labels, placeholder text
- Validation feedback (red for errors, green for success)

## Admin Dashboard Design
- Clean, functional interface (not public-facing, so simpler aesthetic)
- Tables for viewing data (announcements, applications, faculty)
- Forms for adding/editing content
- Upload interfaces for images
- Clear action buttons (Add, Edit, Delete)

## Accessibility & Performance
- Proper heading hierarchy (h1, h2, h3)
- Alt text for all images
- Keyboard navigation support
- Fast loading with optimized images
- Smooth scrolling and transitions (not excessive)

## Mobile Responsiveness
- Stack cards vertically on mobile
- Hamburger menu for navigation
- Touch-friendly button sizes (min 44px)
- Readable text without zooming
- Optimized images for mobile bandwidth

This design creates a warm, inviting, professional school website that feels humanized and child-friendly while maintaining credibility and functionality.