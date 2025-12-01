import { useRef } from 'react';
import { Target, Eye, Heart, Award, Users, BookOpen, GraduationCap, Building } from 'lucide-react';
import Hero from '@/react-app/components/Hero';
import SectionTitle from '@/react-app/components/SectionTitle';
import useScrollAnimation from '@/react-app/hooks/useScrollAnimation';

export default function About() {
  const visionRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const facilitiesRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  const visionVisible = useScrollAnimation(visionRef);
  const historyVisible = useScrollAnimation(historyRef);
  const facilitiesVisible = useScrollAnimation(facilitiesRef);
  const highlightsVisible = useScrollAnimation(highlightsRef);

  return (
    <div className="min-h-screen pt-20">
      <Hero
        title="About Kilbil High School & Jr College"
        subtitle="A Legacy of Excellence in Education Since 1980"
        image="https://images.unsplash.com/photo-1562774053-701939374585?w=1600&h=600&fit=crop"
        height="medium"
      />

      {/* School Highlights */}
      <section
        ref={highlightsRef}
        className={`py-20 px-4 bg-gradient-to-br from-pale-beige to-soft-white transition-all duration-1000 ${
          highlightsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Why Choose Kilbil High School"
            subtitle="Excellence that sets us apart"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-royal-blue p-4 rounded-full">
                  <GraduationCap className="text-white" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Established 1980</h3>
              <p className="text-gray-600">Over 45 years of educational excellence and proven track record</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-golden-yellow p-4 rounded-full">
                  <Award className="text-white" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">4.1/5 Rating</h3>
              <p className="text-gray-600">Highly rated by parents and students (31 reviews)</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-terracotta p-4 rounded-full">
                  <BookOpen className="text-white" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">State Board</h3>
              <p className="text-gray-600">Comprehensive State Board curriculum with English medium</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-slate-gray p-4 rounded-full">
                  <Users className="text-white" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Co-ed Institution</h3>
              <p className="text-gray-600">Inclusive learning environment for all students</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Welcome to Kilbil High School & Jr College
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Kilbil High School & Jr College in Pimple Gurav, Pune is a prestigious educational institution that has been 
                nurturing young minds since May 1980. Operating as a Private Unaided, Co-educational institution, we provide 
                quality education from Pre-Primary to Higher Secondary levels.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                With an excellent education while fostering a nurturing environment for students' holistic development, we have 
                established a strong reputation for excellence. Our comprehensive State Board curriculum delivered in English medium 
                ensures students receive a global standard of education.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our operating hours are Monday to Saturday from 9:00 AM to 2:00 PM, providing a structured yet flexible learning 
                environment that caters to diverse student needs.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop"
                alt="Students learning"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-golden-yellow text-gray-800 p-6 rounded-xl shadow-xl">
                <p className="text-3xl font-bold">45+</p>
                <p className="text-sm font-semibold">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section
        ref={visionRef}
        className={`py-20 px-4 bg-gradient-to-br from-pale-beige to-soft-white transition-all duration-1000 ${
          visionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-royal-blue to-slate-gray text-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                  <Eye className="text-white" size={28} />
                </div>
                <h3 className="text-3xl font-bold">Our Vision</h3>
              </div>
              <p className="text-lg leading-relaxed">
                To be a beacon of educational excellence in Pimple Gurav and beyond, fostering holistic development and 
                creating global citizens who are compassionate, innovative, and committed to making a positive impact on society. 
                We strive to provide world-class education that prepares students for the challenges of tomorrow.
              </p>
            </div>

            <div className="bg-gradient-to-br from-golden-yellow to-terracotta text-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                  <Target className="text-white" size={28} />
                </div>
                <h3 className="text-3xl font-bold">Our Mission</h3>
              </div>
              <p className="text-lg leading-relaxed">
                To provide quality State Board education that nurtures intellectual curiosity, builds strong character, and equips 
                students with the skills and values necessary to thrive in a rapidly changing world. We ensure every student receives 
                the attention and support they need to excel academically and personally.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mt-16">
            <SectionTitle title="Our Core Values" subtitle="Principles that guide everything we do" />
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: <Award size={32} />, title: 'Excellence', desc: 'Striving for the highest standards in education' },
                { icon: <Heart size={32} />, title: 'Compassion', desc: 'Caring for students and our community' },
                { icon: <Target size={32} />, title: 'Integrity', desc: 'Honesty and ethical behavior in all actions' },
                { icon: <Eye size={32} />, title: 'Innovation', desc: 'Creative thinking and modern teaching methods' },
              ].map((value, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex justify-center text-royal-blue mb-4">{value.icon}</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h4>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* History & Journey */}
      <section
        ref={historyRef}
        className={`py-20 px-4 bg-white transition-all duration-1000 ${
          historyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="Our Journey" subtitle="A proud history of educational excellence" />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop"
                alt="School building"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <div className="border-l-4 border-royal-blue pl-6 py-2">
                <h4 className="text-2xl font-bold text-gray-800 mb-2">Established in 1980</h4>
                <p className="text-gray-700 leading-relaxed">
                  Kilbil High School & Jr College was founded in May 1980 with a vision to provide quality education 
                  to students in Pimple Gurav, Pune. What began as a modest institution has grown into a comprehensive 
                  educational center serving students from Pre-Primary through Higher Secondary.
                </p>
              </div>

              <div className="border-l-4 border-golden-yellow pl-6 py-2">
                <h4 className="text-2xl font-bold text-gray-800 mb-2">45+ Years of Service</h4>
                <p className="text-gray-700 leading-relaxed">
                  Over the past four and a half decades, we have remained committed to our founding principles of 
                  academic excellence, character development, and holistic education. Our dedication has earned us 
                  a 4.1-star rating from parents and students alike.
                </p>
              </div>

              <div className="border-l-4 border-terracotta pl-6 py-2">
                <h4 className="text-2xl font-bold text-gray-800 mb-2">Growing Community</h4>
                <p className="text-gray-700 leading-relaxed">
                  Today, we take pride in being a trusted educational institution in Pimple Gurav, with comprehensive 
                  levels of schooling including Primary, Upper Primary, Secondary, and Higher Secondary education, 
                  all delivered through State Board curriculum in English medium.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School Facilities */}
      <section
        ref={facilitiesRef}
        className={`py-20 px-4 bg-gradient-to-br from-pale-beige to-soft-white transition-all duration-1000 ${
          facilitiesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            title="Our Facilities"
            subtitle="Well-equipped campus supporting holistic education"
          />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-royal-blue p-4 rounded-full">
                  <BookOpen className="text-white" size={32} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Academic Book Bank</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Extensive collection of academic books and learning resources available to support student learning 
                across all subjects and grade levels.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-golden-yellow p-4 rounded-full">
                  <Users className="text-white" size={32} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Recreation Playground</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Well-maintained playground facilities for sports and physical activities, promoting fitness and 
                overall health among students.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-terracotta p-4 rounded-full">
                  <Heart className="text-white" size={32} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Medical Support</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                On-campus medical facilities with trained staff to ensure student health and safety throughout 
                the school day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Programs */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Academic Excellence"
            subtitle="Comprehensive programs from Pre-Primary to Higher Secondary"
          />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-royal-blue to-slate-gray text-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Our Academic Offerings</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-golden-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-lg">Primary Education</h4>
                    <p className="text-gray-200">Foundation building for young learners</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-golden-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-lg">Upper Primary</h4>
                    <p className="text-gray-200">Developing critical thinking skills</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-golden-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-lg">Secondary Education</h4>
                    <p className="text-gray-200">Comprehensive board exam preparation</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-golden-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-lg">Higher Secondary (Jr College)</h4>
                    <p className="text-gray-200">College preparation in Science, Commerce & Arts</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-golden-yellow to-terracotta text-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Key Features</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-lg">State Board Curriculum</h4>
                    <p className="text-gray-100">Aligned with Maharashtra State Board standards</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-lg">English Medium</h4>
                    <p className="text-gray-100">All subjects taught in English for global readiness</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-lg">Co-educational</h4>
                    <p className="text-gray-100">Inclusive environment for all students</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-lg">Private Unaided</h4>
                    <p className="text-gray-100">Independent governance ensuring quality standards</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-royal-blue to-slate-gray text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Building className="text-golden-yellow" size={64} />
          </div>
          <h2 className="text-4xl font-bold mb-4">Visit Our Campus</h2>
          <p className="text-xl mb-2 text-gray-200">Survey No - 77, Near Shrushti Hotel</p>
          <p className="text-xl mb-8 text-gray-200">Shrusti Chowk, Pimple Gurav-411061, Pune</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-golden-yellow text-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-terracotta hover:text-white transition-all hover:scale-105 shadow-xl"
            >
              Contact Us
            </a>
            <a
              href="/admissions"
              className="inline-block bg-white text-royal-blue px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
            >
              Apply for Admission
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
