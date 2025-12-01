import { Link } from "wouter";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Kilbil High School</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Established in 1980, Kilbil High School & Junior Collage is committed to providing quality education and nurturing young minds for a brighter future.
            </p>
            <div className="mt-4">
              <div className="text-sm text-muted-foreground">School Code: 27251902803</div>
              <div className="text-sm text-muted-foreground">Medium: English | State Board</div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/about/president" className="block text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-president">
                President's Message
              </Link>
              <Link href="/academics/elementary" className="block text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-academics">
                Academics
              </Link>
              <Link href="/facilities" className="block text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-facilities">
                Facilities
              </Link>
              <Link href="/gallery" className="block text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-gallery">
                Gallery
              </Link>
              <Link href="/contact" className="block text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-contact">
                Contact Us
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Survey No - 77, Near Shrushti Hotel, Shrusti Chowk, Pimple Gurav - 411061
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:08128352815" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-phone">
                  08128352815
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:info@kilbilschool.edu" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-email">
                  info@kilbilschool.edu
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <div>Mon - Sat: 7:30 AM - 4:30 PM</div>
                  <div>Sunday: Closed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Kilbil High School & Junior Collage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
