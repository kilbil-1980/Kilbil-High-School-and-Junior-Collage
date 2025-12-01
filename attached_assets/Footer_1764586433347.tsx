import { Link } from 'react-router';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-royal-blue to-slate-gray text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-golden-yellow">Kilbil High School</h3>
            <p className="text-sm text-gray-300">
              Nurturing Minds, Building Futures. Excellence in education since 1980.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-golden-yellow transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-golden-yellow">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-golden-yellow transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-yellow-400 transition-colors">
                  Academics
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-yellow-400 transition-colors">
                  Admissions
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-yellow-400 transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-golden-yellow">Programs</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/admissions?program=Pre-Primary" className="hover:text-yellow-400 transition-colors cursor-pointer">
                  Pre-Primary
                </Link>
              </li>
              <li>
                <Link to="/admissions?program=Primary School" className="hover:text-yellow-400 transition-colors cursor-pointer">
                  Primary School
                </Link>
              </li>
              <li>
                <Link to="/admissions?program=Secondary School" className="hover:text-yellow-400 transition-colors cursor-pointer">
                  Secondary School
                </Link>
              </li>
              <li>
                <Link to="/admissions?program=Junior College" className="hover:text-yellow-400 transition-colors cursor-pointer">
                  Junior College
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-golden-yellow">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Survey No - 77, Near Shrushti Hotel, Shrusti Chowk, Pimple Gurav-411061</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="flex-shrink-0" />
                <span>08128352815</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="flex-shrink-0" />
                <span>info@kilbilschool.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-gray mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Kilbil High School & Jr College. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
