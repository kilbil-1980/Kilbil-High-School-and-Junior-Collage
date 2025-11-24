// SEO utility functions for meta tags and structured data

interface SEOConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

const SITE_NAME = "Kilbil High School & Junior College";
const SITE_URL = typeof window !== 'undefined' ? window.location.origin : "https://kilbil.edu.in";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export function setSEOMetaTags(config: SEOConfig) {
  const title = `${config.title} | ${SITE_NAME}`;
  const description = config.description;
  const image = config.image || DEFAULT_IMAGE;
  const url = config.url || SITE_URL;

  // Set title
  document.title = title;

  // Update or create meta tags
  const updateMetaTag = (name: string, content: string, isProperty = false) => {
    const attr = isProperty ? "property" : "name";
    let tag = document.querySelector(`meta[${attr}="${name}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute(attr, name);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  };

  // Standard meta tags
  updateMetaTag("description", description);
  updateMetaTag("viewport", "width=device-width, initial-scale=1.0");
  updateMetaTag("theme-color", "#8B3D3D");
  updateMetaTag("keywords", "Kilbil High School, Junior College, Pimple Gurav, Pune, Education, School, Academics");

  // Open Graph tags
  updateMetaTag("og:title", title, true);
  updateMetaTag("og:description", description, true);
  updateMetaTag("og:image", image, true);
  updateMetaTag("og:url", url, true);
  updateMetaTag("og:type", config.type || "website", true);
  updateMetaTag("og:site_name", SITE_NAME, true);

  // Twitter tags
  updateMetaTag("twitter:card", "summary_large_image");
  updateMetaTag("twitter:title", title);
  updateMetaTag("twitter:description", description);
  updateMetaTag("twitter:image", image);

  // Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", url);
}

export function setStructuredData(data: Record<string, any>) {
  let script = document.querySelector('script[type="application/ld+json"]');
  if (!script) {
    script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export const pageMetadata = {
  home: {
    title: "Home",
    description: "Welcome to Kilbil High School & Junior College. Established in 1980, offering quality education in elementary, primary, secondary, and higher secondary classes in Pimple Gurav, Pune."
  },
  about_president: {
    title: "President Message",
    description: "Read the message from the President of Kilbil High School & Junior College about the school's vision and mission."
  },
  about_director: {
    title: "Director Message",
    description: "Discover the Director's message about academic excellence and student development at Kilbil High School."
  },
  about_principal: {
    title: "Principal Message",
    description: "Learn from the Principal about the values and educational approach at Kilbil High School & Junior College."
  },
  about_why_us: {
    title: "Why Choose Us",
    description: "Explore the unique features and advantages of choosing Kilbil High School for your child's education."
  },
  about_faculty: {
    title: "Faculty",
    description: "Meet our experienced and dedicated faculty members at Kilbil High School & Junior College."
  },
  academics: {
    title: "Academics",
    description: "Explore our comprehensive academic programs for elementary, primary, secondary, and higher secondary levels."
  },
  timetable: {
    title: "Timetable",
    description: "View the class timetables for all academic levels at Kilbil High School & Junior College."
  },
  admissions: {
    title: "Admissions",
    description: "Apply for admission to Kilbil High School & Junior College. We accept applications for all class levels."
  },
  facilities: {
    title: "Facilities",
    description: "Discover our modern facilities including classrooms, laboratories, library, sports grounds, and more."
  },
  gallery: {
    title: "Gallery",
    description: "View photos and moments from school events, celebrations, and academic activities at Kilbil High School."
  },
  career: {
    title: "Career",
    description: "Explore career opportunities at Kilbil High School & Junior College. Join our talented team."
  },
  contact: {
    title: "Contact Us",
    description: "Get in touch with Kilbil High School & Junior College. We're located in Pimple Gurav, Pune."
  },
  announcements: {
    title: "Announcements",
    description: "Stay updated with the latest announcements and news from Kilbil High School & Junior College."
  }
};

export function getOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kilbil High School & Junior College",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "description": "A premier educational institution in Pimple Gurav, Pune, established in 1980.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Pimple Gurav",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411061",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Student Admissions",
      "telephone": "+91-XXXXX-XXXXX"
    },
    "sameAs": [
      "https://www.facebook.com/kilbil",
      "https://twitter.com/kilbil"
    ]
  };
}

export function getSchoolStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "School",
    "name": "Kilbil High School & Junior College",
    "url": SITE_URL,
    "image": DEFAULT_IMAGE,
    "description": "A premier high school and junior college in Pimple Gurav, Pune.",
    "educationalLevel": ["Elementary", "Primary", "Secondary", "Higher Secondary"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Pimple Gurav",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411061",
      "addressCountry": "IN"
    }
  };
}
