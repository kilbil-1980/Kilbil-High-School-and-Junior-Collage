import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Users, BookOpen, Heart, Trophy, Lightbulb } from "lucide-react";
import { setSEOMetaTags, pageMetadata } from "@/lib/seo";

export default function WhyUs() {
  useEffect(() => {
    setSEOMetaTags({
      title: pageMetadata.about_why_us.title,
      description: pageMetadata.about_why_us.description,
      url: window.location.href
    });
  }, []);
  const reasons = [
    {
      icon: Award,
      title: "40+ Years of Excellence",
      description: "Established in 1980, we have a proven track record of academic success and student development.",
    },
    {
      icon: Users,
      title: "Experienced Faculty",
      description: "Our dedicated teachers bring years of expertise and passion for education to every classroom.",
    },
    {
      icon: BookOpen,
      title: "Comprehensive Curriculum",
      description: "State Board curriculum from Elementary to Higher Secondary, designed for holistic development.",
    },
    {
      icon: Heart,
      title: "Nurturing Environment",
      description: "We provide a safe, inclusive, and supportive atmosphere where every student can thrive.",
    },
    {
      icon: Trophy,
      title: "Outstanding Facilities",
      description: "Modern classrooms, well-equipped labs, extensive library, sports ground, and medical support.",
    },
    {
      icon: Lightbulb,
      title: "Holistic Development",
      description: "Focus on academics, sports, arts, and character building for well-rounded growth.",
    },
  ];

  return (
    <div className="min-h-screen bg-soft-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-pale-beige rounded-full border border-golden-yellow/30">
            <span className="text-royal-blue font-semibold text-sm">Our Strengths</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 text-royal-blue" data-testid="text-page-title">Why Choose Kilbil?</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover what makes Kilbil High School & Junior Collage the preferred choice for quality education in Pune
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Card key={index} className="hover-elevate border-t-4" style={{borderTopColor: ['#1E3A8A', '#DC4A38', '#0EA5E9', '#FCD34D', '#475569', '#FEF3E2'][index % 6]}} data-testid={`card-reason-${index}`}>
                <CardHeader>
                  <Icon className="w-12 h-12 mb-4" style={{color: ['#1E3A8A', '#DC4A38', '#0EA5E9', '#FCD34D', '#475569', '#FEF3E2'][index % 6]}} />
                  <CardTitle className="text-xl text-royal-blue">{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{reason.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-gradient-to-r from-pale-beige to-soft-white border-2" style={{borderColor: '#DC4A38'}}>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-royal-blue">Our Commitment</h2>
            <div className="space-y-4 text-muted-foreground">
              <p data-testid="text-commitment-1">
                At Kilbil High School & Junior Collage, we are committed to providing an educational experience that goes beyond textbooks and examinations. We believe in nurturing curious, confident, and compassionate individuals who are prepared to make positive contributions to society.
              </p>
              <p data-testid="text-commitment-2">
                Our approach combines academic rigor with opportunities for creative expression, physical development, and social growth. We maintain small class sizes to ensure personalized attention, and our teachers work closely with each student to identify and develop their unique strengths.
              </p>
              <p data-testid="text-commitment-3">
                We invite you to visit our campus, meet our faculty, and experience the Kilbil difference for yourself. Join us in our mission to shape the leaders and innovators of tomorrow.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
