import { useRef } from 'react';
import { BookOpen, FlaskConical, Globe, Calculator, Palette, Music } from 'lucide-react';
import Hero from '@/react-app/components/Hero';
import SectionTitle from '@/react-app/components/SectionTitle';
import useScrollAnimation from '@/react-app/hooks/useScrollAnimation';

export default function Academics() {
  const prePrimaryRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const jrCollegeRef = useRef<HTMLDivElement>(null);

  const prePrimaryVisible = useScrollAnimation(prePrimaryRef);
  const primaryVisible = useScrollAnimation(primaryRef);
  const secondaryVisible = useScrollAnimation(secondaryRef);
  const jrCollegeVisible = useScrollAnimation(jrCollegeRef);

  return (
    <div className="min-h-screen pt-20">
      <Hero
        title="Academic Excellence"
        subtitle="Comprehensive Programs for Every Stage of Learning"
        image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&h=600&fit=crop"
        height="medium"
      />

      {/* Pre-Primary */}
      <section
        ref={prePrimaryRef}
        className={`py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50 transition-all duration-1000 ${
          prePrimaryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-royal-blue font-semibold text-sm">AGES 3-5</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 mt-2">Pre-Primary Education</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our pre-primary program focuses on play-based learning, fostering creativity, social skills, 
                and early cognitive development in a nurturing English medium environment. Part of our comprehensive 
                State Board curriculum offerings.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-royal-blue p-2 rounded-lg mt-1">
                    <Palette className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Creative Learning</h4>
                    <p className="text-gray-600">Art, music, and hands-on activities</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-600 p-2 rounded-lg mt-1">
                    <BookOpen className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Early Literacy</h4>
                    <p className="text-gray-600">Reading readiness and language skills</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-600 p-2 rounded-lg mt-1">
                    <Music className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Physical Development</h4>
                    <p className="text-gray-600">Motor skills and active play</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop"
                alt="Pre-primary students"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Primary School */}
      <section
        ref={primaryRef}
        className={`py-20 px-4 bg-white transition-all duration-1000 ${
          primaryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop"
                alt="Primary school students"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <span className="text-royal-blue font-semibold text-sm">GRADES 1-5</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 mt-2">Primary School</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Building strong academic foundations in core subjects while developing critical thinking, 
                problem-solving abilities, and good study habits.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <BookOpen size={24} />, subject: 'English' },
                  { icon: <Calculator size={24} />, subject: 'Mathematics' },
                  { icon: <FlaskConical size={24} />, subject: 'Science' },
                  { icon: <Globe size={24} />, subject: 'Social Studies' },
                ].map((item, index) => (
                  <div key={index} className="bg-pale-beige p-4 rounded-xl flex items-center space-x-3">
                    <div className="text-royal-blue">{item.icon}</div>
                    <span className="font-semibold text-gray-800">{item.subject}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary School */}
      <section
        ref={secondaryRef}
        className={`py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50 transition-all duration-1000 ${
          secondaryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-royal-blue font-semibold text-sm">GRADES 6-10</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 mt-2">Secondary School</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Comprehensive curriculum preparing students for board examinations and future academic pursuits, 
                with emphasis on STEM subjects, languages, and social sciences.
              </p>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <h4 className="font-bold text-gray-800 mb-2">Core Subjects</h4>
                  <p className="text-gray-600">Mathematics, Science, English, Social Studies, Hindi</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <h4 className="font-bold text-gray-800 mb-2">Practical Learning</h4>
                  <p className="text-gray-600">Well-equipped laboratories for Physics, Chemistry, Biology, and Computer Science</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <h4 className="font-bold text-gray-800 mb-2">Exam Preparation</h4>
                  <p className="text-gray-600">Comprehensive coaching for board examinations with proven results</p>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop"
                alt="Secondary school students"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Junior College */}
      <section
        ref={jrCollegeRef}
        className={`py-20 px-4 bg-white transition-all duration-1000 ${
          jrCollegeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Junior College (Grades 11-12)"
            subtitle="Advanced learning paths for college-bound students"
          />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-royal-blue to-slate-gray text-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Science Stream</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-golden-yellow rounded-full"></span>
                  <span>Physics, Chemistry, Mathematics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  <span>Physics, Chemistry, Biology</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  <span>Computer Science</span>
                </li>
              </ul>
              <p className="mt-6 text-gray-200">
                Preparation for engineering, medical, and science careers
              </p>
            </div>

            <div className="bg-gradient-to-br from-golden-yellow to-terracotta text-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Commerce Stream</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span>Accountancy</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span>Business Studies</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span>Economics</span>
                </li>
              </ul>
              <p className="mt-6 text-gray-100">
                Foundation for business, finance, and management careers
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-gray to-royal-blue text-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Arts Stream</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-golden-yellow rounded-full"></span>
                  <span>History, Geography</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-pink-300 rounded-full"></span>
                  <span>Political Science</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-pink-300 rounded-full"></span>
                  <span>Psychology, Sociology</span>
                </li>
              </ul>
              <p className="mt-6 text-gray-200">
                Preparation for humanities, social sciences, and liberal arts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-royal-blue to-slate-gray text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Excellence in Every Stream</h2>
          <p className="text-xl mb-8 text-gray-200">
            Choose the path that's right for your child's future
          </p>
          <a
            href="/admissions"
            className="inline-block bg-golden-yellow text-gray-800 px-8 py-4 rounded-full font-bold hover:bg-terracotta hover:text-white transition-all hover:scale-105"
          >
            Apply for Admission
          </a>
        </div>
      </section>
    </div>
  );
}
