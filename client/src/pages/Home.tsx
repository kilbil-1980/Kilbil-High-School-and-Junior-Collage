import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Users, BookOpen, TrendingUp, ArrowRight, GraduationCap, Calendar, Phone, MapPin } from "lucide-react";
import heroBanner from "@assets/generated_images/school_building_hero_banner.png";
import { setSEOMetaTags, setStructuredData, pageMetadata, getSchoolStructuredData } from "@/lib/seo";

export default function Home() {
  const welcomeRef = useRef<HTMLDivElement>(null);
  const levelsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [levelsVisible, setLevelsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    setSEOMetaTags({
      title: pageMetadata.home.title,
      description: pageMetadata.home.description,
      url: window.location.href
    });
    setStructuredData(getSchoolStructuredData());
  }, []);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target === welcomeRef.current && entry.isIntersecting) {
          setWelcomeVisible(true);
        }
        if (entry.target === levelsRef.current && entry.isIntersecting) {
          setLevelsVisible(true);
        }
        if (entry.target === statsRef.current && entry.isIntersecting) {
          setStatsVisible(true);
        }
      });
    }, { threshold: 0.1 });

    if (welcomeRef.current) observer.observe(welcomeRef.current);
    if (levelsRef.current) observer.observe(levelsRef.current);
    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  const schoolLevels = [
    {
      title: 'Elementary',
      description: 'Nurturing young minds with play-based learning and early childhood development programs.',
      icon: BookOpen,
      href: '/academics/elementary',
    },
    {
      title: 'Primary',
      description: 'Building strong foundations in academics, character, and essential life skills.',
      icon: GraduationCap,
      href: '/academics/primary',
    },
    {
      title: 'Secondary',
      description: 'Comprehensive education preparing students for higher studies and future challenges.',
      icon: Award,
      href: '/academics/secondary',
    },
    {
      title: 'Higher Secondary',
      description: 'Advanced learning paths in Science, Commerce, and Arts for college-ready students.',
      icon: TrendingUp,
      href: '/academics/higher-secondary',
    },
  ];

  const stats = [
    { icon: <Award size={40} />, value: '45+', label: 'Years Since 1980' },
    { icon: <Users size={40} />, value: '4.1/5', label: 'Rating (31 Reviews)' },
    { icon: <BookOpen size={40} />, value: '1123', label: 'Students' },
    { icon: <TrendingUp size={40} />, value: '29', label: 'Classrooms' },
  ];

  const announcements = [
    {
      type: 'ADMISSIONS',
      title: 'Admissions Open for 2025-26',
      description: 'Applications are now being accepted for all grades. Limited seats available.',
      href: '/contact',
      testId: 'card-admission'
    },
    {
      type: 'ACHIEVEMENT',
      title: '100% Results in Board Exams',
      description: 'Our students achieved outstanding results with multiple state-level toppers.',
      href: '#',
      testId: 'card-achievement'
    },
    {
      type: 'EVENT',
      title: 'Annual Day Celebration',
      description: 'Join us for our annual cultural extravaganza showcasing student talents.',
      href: '/gallery',
      testId: 'card-event'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-[600px] flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="text-hero-title">
            Nurturing Minds, Building Futures
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Excellence in Education | Shaping Tomorrow's Leaders Today
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/about/why-us">
              <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-learn-more">
                Learn More About Us
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30" data-testid="button-contact-hero">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <section
        ref={welcomeRef}
        className={`py-20 px-4 bg-background transition-all duration-1000 ${
          welcomeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-welcome-title">
                Welcome to Kilbil High School & Jr College
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Since 1980, we have been committed to providing quality State Board education in English medium that nurtures intellectual curiosity, builds character, and prepares students for success in an ever-changing world.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our dedicated faculty, state-of-the-art facilities, and comprehensive curriculum ensure that every student receives the support they need to excel academically and personally.
              </p>
              <Link href="/about/why-us">
                <Button size="lg" className="inline-flex items-center gap-2">
                  <span>Learn More About Us</span>
                  <ArrowRight size={20} />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop"
                  alt="Students learning"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl">
                <p className="text-3xl font-bold">45+</p>
                <p className="text-sm font-semibold">Years Since 1980</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School Levels / Academic Programs */}
      <section
        ref={levelsRef}
        className={`py-20 px-4 bg-card transition-all duration-1000 ${
          levelsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Academic Programs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive education from early childhood to junior college
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {schoolLevels.map((level, index) => {
              const IconComponent = level.icon;
              return (
                <Link key={index} href={level.href}>
                  <Card className="hover-elevate active-elevate-2 transition-all cursor-pointer h-full" data-testid={`card-level-${index}`}>
                    <CardHeader>
                      <IconComponent className="w-10 h-10 mb-3 text-primary" />
                      <CardTitle>{level.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{level.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section
        ref={statsRef}
        className={`py-20 px-4 bg-primary text-primary-foreground transition-all duration-1000 ${
          statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-4" data-testid={`stat-${index}`}>
                <div className="flex justify-center text-primary-foreground/80">
                  {stat.icon}
                </div>
                <p className="text-4xl font-bold">{stat.value}</p>
                <p className="text-lg text-primary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Announcements */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Latest News & Announcements</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with what's happening at our school
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {announcements.map((ann, index) => (
              <Link key={index} href={ann.href}>
                <Card className="hover-elevate active-elevate-2 cursor-pointer h-full transition-all" data-testid={ann.testId}>
                  <CardHeader>
                    <div className="text-sm text-primary font-semibold mb-2">{ann.type}</div>
                    <CardTitle className="text-xl">{ann.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{ann.description}</p>
                    <div className="text-primary font-semibold inline-flex items-center gap-1">
                      Read More <ArrowRight size={16} />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Discover how Kilbil High School can help your child reach their full potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90 border-0" data-testid="button-apply-now">
                <span>Apply Now</span>
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" data-testid="button-schedule-visit">
                <span>Schedule a Visit</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Location</h2>
          <Card>
            <CardContent className="p-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.1234567890!2d73.7654321!3d18.6234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM3JzI0LjQiTiA3M8KwNDUnNTUuNiJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '0.375rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="School Location"
                data-testid="iframe-map"
              ></iframe>
            </CardContent>
          </Card>
          <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Survey No - 77, Near Shrushti Hotel, Shrusti Chowk, Pimple Gurav - 411061</span>
          </div>
        </div>
      </section>
    </div>
  );
}
