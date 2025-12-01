import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Users, BookOpen, GraduationCap, MapPin, Calendar, Phone, Star, ArrowRight } from "lucide-react";
import heroBanner from "@assets/generated_images/school_building_hero_banner.png";
import { setSEOMetaTags, setStructuredData, pageMetadata, getSchoolStructuredData } from "@/lib/seo";

export default function Home() {
  useEffect(() => {
    setSEOMetaTags({
      title: pageMetadata.home.title,
      description: pageMetadata.home.description,
      url: window.location.href
    });
    setStructuredData(getSchoolStructuredData());
  }, []);

  return (
    <div className="min-h-screen">
      <div 
        className="relative h-[600px] flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 58, 138, 0.8) 0%, rgba(71, 85, 105, 0.7) 100%), url(${heroBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-golden-yellow to-transparent"></div>
        <div className="text-center px-4 max-w-4xl relative z-10">
          <div className="inline-block mb-4 px-4 py-2 bg-golden-yellow/20 rounded-full border border-golden-yellow/40">
            <span className="text-golden-yellow font-semibold text-sm">Excellence Since 1980</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-poppins" data-testid="text-hero-title">
            Kilbil High School & Junior College
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-white/95">
            Nurturing Young Minds, Building Tomorrow's Leaders
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/admissions">
              <Button size="lg" className="bg-golden-yellow text-royal-blue hover:bg-terracotta hover:text-white font-semibold" data-testid="button-apply-now">
                Apply Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/about/why-us">
              <Button size="lg" className="border-2 border-golden-yellow text-golden-yellow bg-transparent hover:bg-golden-yellow/10" data-testid="button-learn-more">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center border-2 border-royal-blue/20 hover:border-royal-blue/50 transition-colors">
            <CardContent className="pt-6">
              <Calendar className="w-8 h-8 mx-auto mb-3" style={{color: '#1E3A8A'}} />
              <div className="text-2xl font-bold mb-1 text-royal-blue" data-testid="text-established">1980</div>
              <div className="text-sm text-slate-gray">Established</div>
            </CardContent>
          </Card>
          <Card className="text-center border-2 border-terracotta/20 hover:border-terracotta/50 transition-colors">
            <CardContent className="pt-6">
              <Users className="w-8 h-8 mx-auto mb-3" style={{color: '#DC4A38'}} />
              <div className="text-2xl font-bold mb-1 text-terracotta" data-testid="text-students">1123</div>
              <div className="text-sm text-slate-gray">Students</div>
            </CardContent>
          </Card>
          <Card className="text-center border-2 border-sky-blue/20 hover:border-sky-blue/50 transition-colors">
            <CardContent className="pt-6">
              <Star className="w-8 h-8 mx-auto mb-3" style={{color: '#0EA5E9'}} />
              <div className="text-2xl font-bold mb-1" style={{color: '#0EA5E9'}} data-testid="text-rating">4.1</div>
              <div className="text-sm text-slate-gray">Rating (31 reviews)</div>
            </CardContent>
          </Card>
          <Card className="text-center border-2 border-golden-yellow/20 hover:border-golden-yellow/50 transition-colors">
            <CardContent className="pt-6">
              <BookOpen className="w-8 h-8 mx-auto mb-3" style={{color: '#FCD34D'}} />
              <div className="text-2xl font-bold mb-1 text-royal-blue" data-testid="text-classrooms">29</div>
              <div className="text-sm text-slate-gray">Classrooms</div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/academics/elementary">
              <Card className="hover-elevate active-elevate-2 cursor-pointer h-full" data-testid="card-academics">
                <CardHeader>
                  <GraduationCap className="w-10 h-10 mb-3 text-primary" />
                  <CardTitle>Academics</CardTitle>
                  <CardDescription>
                    Comprehensive curriculum from Elementary to Higher Secondary
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/admissions">
              <Card className="hover-elevate active-elevate-2 cursor-pointer h-full" data-testid="card-admissions">
                <CardHeader>
                  <Users className="w-10 h-10 mb-3 text-secondary" />
                  <CardTitle>Admissions</CardTitle>
                  <CardDescription>
                    Join our community and start your educational journey
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/gallery">
              <Card className="hover-elevate active-elevate-2 cursor-pointer h-full" data-testid="card-gallery">
                <CardHeader>
                  <Award className="w-10 h-10 mb-3 text-primary" />
                  <CardTitle>Gallery</CardTitle>
                  <CardDescription>
                    Browse our photo collection of events and achievements
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/contact">
              <Card className="hover-elevate active-elevate-2 cursor-pointer h-full" data-testid="card-contact">
                <CardHeader>
                  <Phone className="w-10 h-10 mb-3 text-secondary" />
                  <CardTitle>Contact</CardTitle>
                  <CardDescription>
                    Get in touch with us for any queries or information
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>

        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Principal's Message</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center">
                    <Users className="w-16 h-16 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground leading-relaxed mb-4" data-testid="text-principal-preview">
                    Welcome to Kilbil High School & Junior Collage. For over four decades, we have been committed to providing quality education that shapes young minds and builds strong character. Our experienced faculty and modern facilities create an environment where students can thrive academically, socially, and emotionally.
                  </p>
                  <Link href="/about/principal">
                    <Button variant="outline" data-testid="button-read-more-principal">
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
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
      </div>
    </div>
  );
}
