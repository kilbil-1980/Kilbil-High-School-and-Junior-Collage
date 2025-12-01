import { useRef } from 'react';
import { BookOpen, FlaskConical, Trophy, Laptop, Building2, Theater } from 'lucide-react';
import Hero from '@/react-app/components/Hero';
import SectionTitle from '@/react-app/components/SectionTitle';
import useScrollAnimation from '@/react-app/hooks/useScrollAnimation';

export default function Facilities() {
  const facilitiesRef = useRef<HTMLDivElement>(null);
  const facilitiesVisible = useScrollAnimation(facilitiesRef);

  const facilities = [
    {
      icon: <BookOpen size={48} />,
      title: 'Academic Book Bank',
      description: 'Extensive collection of academic books and learning resources available to support student learning across all subjects.',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop',
    },
    {
      icon: <FlaskConical size={48} />,
      title: 'Science Laboratories',
      description: 'Well-equipped Physics, Chemistry, and Biology labs with modern equipment for hands-on learning.',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop',
    },
    {
      icon: <Laptop size={48} />,
      title: 'Computer Center',
      description: 'State-of-the-art computer labs with latest hardware and software for technology education.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    },
    {
      icon: <Trophy size={48} />,
      title: 'Recreation Playground',
      description: 'Well-maintained playground facilities for sports and physical activities, promoting fitness and overall health.',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
    },
    {
      icon: <Theater size={48} />,
      title: 'Auditorium',
      description: 'Modern auditorium with seating capacity of 500+ for events, performances, and assemblies.',
      image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800&h=600&fit=crop',
    },
    {
      icon: <Building2 size={48} />,
      title: 'Smart Classrooms',
      description: 'Air-conditioned classrooms equipped with digital boards and multimedia teaching aids.',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <Hero
        title="World-Class Facilities"
        subtitle="State-of-the-Art Infrastructure for Holistic Development"
        image="https://images.unsplash.com/photo-1562774053-701939374585?w=1600&h=600&fit=crop"
        height="medium"
      />

      {/* Facilities Grid */}
      <section
        ref={facilitiesRef}
        className={`py-20 px-4 bg-white transition-all duration-1000 ${
          facilitiesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Our Facilities"
            subtitle="Everything your child needs to excel"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-royal-blue mb-4">{facility.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-royal-blue transition-colors">
                    {facility.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 px-4 bg-gradient-to-br from-pale-beige to-soft-white">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Additional Amenities"
            subtitle="Comprehensive support for student well-being"
          />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">School Information</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-royal-blue rounded-full mt-2"></div>
                  <span className="text-gray-700">Established in May 1980</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span className="text-gray-700">State Board curriculum</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span className="text-gray-700">English medium of instruction</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span className="text-gray-700">Co-educational institution</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span className="text-gray-700">Private Unaided management</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Student Support</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-golden-yellow rounded-full mt-2"></div>
                  <span className="text-gray-700">Medical support facilities on campus</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Academic book bank for students</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Recreation playground for physical activities</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Comprehensive learning environment</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Rated 4.1/5 stars by parents</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-royal-blue to-slate-gray text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Experience Our Campus</h2>
          <p className="text-xl mb-8 text-gray-200">
            Schedule a visit to see our facilities in person and meet our staff
          </p>
          <button className="bg-golden-yellow text-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-terracotta hover:text-white transition-all hover:scale-105 shadow-xl">
            Schedule Campus Tour
          </button>
        </div>
      </section>
    </div>
  );
}
