import { useState, useRef } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Hero from '@/react-app/components/Hero';
import SectionTitle from '@/react-app/components/SectionTitle';
import useScrollAnimation from '@/react-app/hooks/useScrollAnimation';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const formRef = useRef<HTMLDivElement>(null);
  const formVisible = useScrollAnimation(formRef);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappMessage = `Hi, I'm contacting you regarding Kilbil High School & Jr College.

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}
Message: ${formData.message}

Looking forward to your response.`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/919309272458?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
    
    // Reset form
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-20">
      <Hero
        title="Get in Touch"
        subtitle="We'd Love to Hear From You"
        image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&h=600&fit=crop"
        height="medium"
      />

      {/* Contact Information */}
      <section className="py-20 px-4 bg-gradient-to-br from-pale-beige to-soft-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Contact Information"
            subtitle="Multiple ways to reach us"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="inline-block bg-pale-beige p-4 rounded-full mb-4">
                <MapPin className="text-royal-blue" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Address</h3>
              <p className="text-gray-600">
                Survey No - 77<br />
                Near Shrushti Hotel, Shrusti Chowk<br />
                Pimple Gurav - 411061, Pune
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="inline-block bg-pale-beige p-4 rounded-full mb-4">
                <Phone className="text-royal-blue" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600">
                Main: 08128352815<br />
                Admissions: +91 9309272458<br />
                WhatsApp: +91 9309272458
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="inline-block bg-pale-beige p-4 rounded-full mb-4">
                <Mail className="text-terracotta" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600">
                General: info@kilbilschool.edu<br />
                Admissions: admissions@kilbilschool.edu<br />
                Principal: principal@kilbilschool.edu
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="inline-block bg-pale-beige p-4 rounded-full mb-4">
                <Clock className="text-slate-gray" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Office Hours</h3>
              <p className="text-gray-600">
                Monday - Saturday<br />
                9:00 AM - 2:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section
        ref={formRef}
        className={`py-20 px-4 bg-white transition-all duration-1000 ${
          formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Have questions about admissions, academics, or anything else? Fill out the form and our team 
                will get back to you through WhatsApp.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-pale-beige p-3 rounded-lg">
                    <Phone className="text-royal-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Quick Response</h4>
                    <p className="text-gray-600">We typically respond within 2 hours on WhatsApp</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-pale-beige p-3 rounded-lg">
                    <svg className="text-royal-blue w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.251"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">WhatsApp Communication</h4>
                    <p className="text-gray-600">Direct communication through WhatsApp for faster responses</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pale-beige to-soft-white p-8 rounded-2xl shadow-xl border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+91 1234567890"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="admissions">Admissions Inquiry</option>
                    <option value="academics">Academic Information</option>
                    <option value="facilities">Facilities Tour</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-all hover:scale-105 flex items-center justify-center space-x-2 shadow-xl"
                >
                  <span>Send via WhatsApp</span>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.251"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Visit Our Campus"
            subtitle="Find us on the map"
          />
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl shadow-2xl overflow-hidden h-96 flex items-center justify-center">
            <div className="text-center p-6">
              <MapPin size={48} className="text-gray-500 mx-auto mb-4" />
              <p className="text-gray-600 text-lg font-semibold mb-2">Visit Our Campus</p>
              <p className="text-gray-700 text-sm">Survey No - 77, Near Shrushti Hotel</p>
              <p className="text-gray-700 text-sm">Shrusti Chowk, Pimple Gurav-411061, Pune</p>
              <a 
                href="https://goo.gl/maps/your-location-link" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-royal-blue text-white px-6 py-2 rounded-full hover:bg-slate-gray transition-all"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-royal-blue to-slate-gray text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Visit?</h2>
          <p className="text-xl mb-8 text-gray-200">
            Schedule a campus tour and experience our facilities firsthand
          </p>
          <button 
            onClick={() => {
              const message = "Hi, I would like to schedule a campus tour for Kilbil High School & Jr College. Please let me know the available times.";
              const whatsappURL = `https://wa.me/919309272458?text=${encodeURIComponent(message)}`;
              window.open(whatsappURL, '_blank');
            }}
            className="bg-golden-yellow text-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-terracotta hover:text-white transition-all hover:scale-105 shadow-xl"
          >
            Schedule Campus Tour
          </button>
        </div>
      </section>
    </div>
  );
}
