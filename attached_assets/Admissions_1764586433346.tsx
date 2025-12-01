import { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { FileText, User, CheckCircle, Calendar, ArrowRight } from 'lucide-react';
import Hero from '@/react-app/components/Hero';
import SectionTitle from '@/react-app/components/SectionTitle';
import useScrollAnimation from '@/react-app/hooks/useScrollAnimation';

export default function Admissions() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    message: '',
  });

  const location = useLocation();
  const processRef = useRef<HTMLDivElement>(null);
  const requirementsRef = useRef<HTMLDivElement>(null);
  const applicationRef = useRef<HTMLDivElement>(null);

  const processVisible = useScrollAnimation(processRef);
  const requirementsVisible = useScrollAnimation(requirementsRef);
  const applicationVisible = useScrollAnimation(applicationRef);

  // Check for program parameter in URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const program = searchParams.get('program');
    if (program) {
      setFormData(prev => ({ ...prev, program }));
    }
  }, [location.search]);

  const admissionSteps = [
    {
      icon: <FileText size={32} />,
      title: 'Submit Application',
      description: 'Fill out the online application form with required details and documents',
    },
    {
      icon: <User size={32} />,
      title: 'Entrance Assessment',
      description: 'Attend the entrance test or interview based on the grade level',
    },
    {
      icon: <CheckCircle size={32} />,
      title: 'Review & Approval',
      description: 'Application review by our admissions committee',
    },
    {
      icon: <Calendar size={32} />,
      title: 'Enrollment',
      description: 'Complete enrollment formalities and begin your journey with us',
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi, I want to apply for admission at Kilbil High School & Jr College.

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Program: ${formData.program}
Message: ${formData.message}

Please provide me with further information about the admission process.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/919309272458?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  const scrollToApplication = () => {
    applicationRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-20">
      <Hero
        title="Admissions"
        subtitle="Join Our Community of Learners"
        image="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1600&h=600&fit=crop"
        height="medium"
      />

      {/* Admissions Open Banner */}
      <section className="py-12 px-4 bg-gradient-to-r from-golden-yellow to-terracotta">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Admissions Open for 2025-26</h2>
          <p className="text-xl text-gray-700 mb-6">
            Applications are now being accepted for all grades. Limited seats available!
          </p>
          <button 
            onClick={scrollToApplication}
            className="bg-royal-blue text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-gray transition-all hover:scale-105 shadow-xl"
          >
            Apply Now
          </button>
        </div>
      </section>

      {/* Admission Process */}
      <section
        ref={processRef}
        className={`py-20 px-4 bg-white transition-all duration-1000 ${
          processVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <SectionTitle
                title="Admission Process"
                subtitle="Simple steps to join our school"
                centered={false}
              />
              <p className="text-lg text-gray-700 leading-relaxed">
                Our admission process is designed to be straightforward and transparent. As a Co-ed, Private Unaided institution 
                established in 1980, we welcome students from diverse backgrounds who demonstrate a commitment to learning and 
                personal growth. We offer State Board curriculum in English medium from Pre-Primary to Higher Secondary levels.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=800&h=600&fit=crop"
                alt="Happy student and parent"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {admissionSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="bg-pale-beige p-4 rounded-full text-royal-blue">
                      {step.icon}
                    </div>
                  </div>
                  <div className="absolute -top-3 -left-3 bg-golden-yellow text-gray-800 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-sm text-center">{step.description}</p>
                </div>
                {index < admissionSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="text-sky-blue" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section
        ref={applicationRef}
        className={`py-20 px-4 bg-gradient-to-br from-pale-beige to-soft-white transition-all duration-1000 ${
          applicationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="Apply Now"
            subtitle="Start your admission process"
          />
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Student's Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all"
                    placeholder="Enter student's name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Parent's Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent transition-all"
                    placeholder="parent@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Parent's Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+91 9876543210"
                  />
                </div>

                <div>
                  <label htmlFor="program" className="block text-sm font-semibold text-gray-700 mb-2">
                    Program/Grade *
                  </label>
                  <select
                    id="program"
                    name="program"
                    required
                    value={formData.program}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Program</option>
                    <option value="Pre-Primary">Pre-Primary (Ages 3-5)</option>
                    <option value="Primary School">Primary School (Grades 1-5)</option>
                    <option value="Secondary School">Secondary School (Grades 6-10)</option>
                    <option value="Junior College">Junior College (Grades 11-12)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Any specific questions or requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-all hover:scale-105 flex items-center justify-center space-x-2 shadow-xl"
              >
                <span>Continue on WhatsApp</span>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.251"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section
        ref={requirementsRef}
        className={`py-20 px-4 bg-white transition-all duration-1000 ${
          requirementsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Admission Requirements"
            subtitle="Documents and eligibility criteria"
          />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Required Documents</h3>
              <ul className="space-y-4">
                {[
                  'Birth certificate (original and photocopy)',
                  'Previous school leaving certificate (if applicable)',
                  'Transfer certificate from previous school',
                  'Latest mark sheets or report cards',
                  'Passport-size photographs (4 copies)',
                  'Address proof (Aadhaar card, utility bill, etc.)',
                  'Parent ID proof (Aadhaar, Passport, Driving License)',
                  'Medical certificate with immunization records',
                ].map((doc, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Age Criteria</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-royal-blue pl-4 py-2">
                  <h4 className="font-bold text-gray-800">Pre-Primary</h4>
                  <p className="text-gray-600">3-5 years as of June 1st</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4 py-2">
                  <h4 className="font-bold text-gray-800">Grade 1</h4>
                  <p className="text-gray-600">6 years as of June 1st</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4 py-2">
                  <h4 className="font-bold text-gray-800">Grades 2-10</h4>
                  <p className="text-gray-600">Age as per grade level norms</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4 py-2">
                  <h4 className="font-bold text-gray-800">Grade 11</h4>
                  <p className="text-gray-600">Completion of Grade 10 with required marks</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-pale-beige rounded-xl">
                <h4 className="font-bold text-gray-800 mb-2">Important Note</h4>
                <p className="text-gray-700 text-sm">
                  Admission is subject to availability of seats and fulfillment of eligibility criteria. 
                  Priority may be given to siblings of current students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-20 px-4 bg-gradient-to-br from-pale-beige to-soft-white">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="Fee Structure"
            subtitle="Transparent and competitive pricing"
          />
          <div className="bg-gradient-to-br from-royal-blue to-slate-gray text-white p-8 rounded-2xl shadow-xl">
            <p className="text-lg mb-6">
              For detailed information about our fee structure, payment schedules, and available scholarships, 
              please contact our admissions office.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                  const message = "Hi, I would like to know about the fee structure and admission details for Kilbil High School & Jr College. Please share the prospectus and fee details.";
                  const whatsappURL = `https://wa.me/919309272458?text=${encodeURIComponent(message)}`;
                  window.open(whatsappURL, '_blank');
                }}
                className="bg-golden-yellow text-gray-800 px-6 py-3 rounded-full font-bold hover:bg-terracotta hover:text-white transition-all"
              >
                Get Fee Details on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-golden-yellow to-terracotta">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Have Questions?</h2>
          <p className="text-xl text-gray-700 mb-8">
            Our admissions team is here to help you through every step of the process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const message = "Hi, I have some questions about the admission process at Kilbil High School & Jr College. Can you help me?";
                const whatsappURL = `https://wa.me/919309272458?text=${encodeURIComponent(message)}`;
                window.open(whatsappURL, '_blank');
              }}
              className="inline-flex items-center justify-center space-x-2 bg-royal-blue text-white px-8 py-4 rounded-full font-bold hover:bg-slate-gray transition-all hover:scale-105 shadow-lg"
            >
              <span>Contact Us on WhatsApp</span>
              <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => {
                const message = "Hi, I would like to schedule a campus tour for Kilbil High School & Jr College. Please let me know the available times.";
                const whatsappURL = `https://wa.me/919309272458?text=${encodeURIComponent(message)}`;
                window.open(whatsappURL, '_blank');
              }}
              className="bg-white text-gray-800 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
            >
              Schedule a Campus Tour
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
