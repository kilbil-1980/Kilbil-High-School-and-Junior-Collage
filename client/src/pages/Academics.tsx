import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { setSEOMetaTags, pageMetadata } from "@/lib/seo";
import elementaryImage from "@assets/generated_images/elementary_school_classroom_children_learning.png";
import primaryImage from "@assets/generated_images/primary_school_interactive_learning_classroom.png";
import secondaryImage from "@assets/generated_images/secondary_school_stem_learning_classroom.png";
import higherSecondaryImage from "@assets/generated_images/higher_secondary_college_learning_environment.png";
import { ChevronRight } from "lucide-react";

interface AcademicLevel {
  id: string;
  title: string;
  description: string;
  ageGroup: string;
  image: string;
  features: string[];
  color: string;
  textColor: string;
}

const academicLevels: AcademicLevel[] = [
  {
    id: "elementary",
    title: "Elementary School",
    description: "Foundational Learning & Character Development",
    ageGroup: "Ages 5-7",
    image: elementaryImage,
    features: [
      "Foundational literacy and numeracy skills",
      "Playful learning approach with activities",
      "Social-emotional development",
      "Creative expression through arts and crafts",
      "Play-based learning methodology",
    ],
    color: "from-blue-50 to-blue-100",
    textColor: "text-blue-700",
  },
  {
    id: "primary",
    title: "Primary School",
    description: "Interactive Learning & Skill Building",
    ageGroup: "Ages 8-11",
    image: primaryImage,
    features: [
      "Core subjects with interactive methods",
      "Project-based learning activities",
      "Scientific thinking development",
      "Language skills enhancement",
      "Collaborative learning experiences",
    ],
    color: "from-green-50 to-green-100",
    textColor: "text-green-700",
  },
  {
    id: "secondary",
    title: "Secondary School",
    description: "Advanced Studies & Specialization",
    ageGroup: "Ages 12-15",
    image: secondaryImage,
    features: [
      "STEM subjects with lab facilities",
      "Subject specialization options",
      "Critical thinking development",
      "Competitive exam preparation",
      "Co-curricular activities integration",
    ],
    color: "from-purple-50 to-purple-100",
    textColor: "text-purple-700",
  },
  {
    id: "higher-secondary",
    title: "Higher Secondary",
    description: "Professional Guidance & Career Readiness",
    ageGroup: "Ages 16-18",
    image: higherSecondaryImage,
    features: [
      "Stream-based education (Science, Commerce, Arts)",
      "College entrance exam coaching",
      "Personality development programs",
      "Career counseling services",
      "Modern educational infrastructure",
    ],
    color: "from-orange-50 to-orange-100",
    textColor: "text-orange-700",
  },
];

export default function Academics() {
  const [, navigate] = useLocation();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  useEffect(() => {
    setSEOMetaTags({
      title: pageMetadata.academics?.title || "Academics | Kilbil High School & Junior College",
      description: pageMetadata.academics?.description || "Explore our comprehensive academic programs from Elementary to Higher Secondary education",
      url: window.location.href
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/90 to-primary/70 text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%27%20height=%2760%27%20viewBox=%270%200%2060%2060%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg%20fill=%27none%27%20fill-rule=%27evenodd%27%3E%3Cg%20fill=%27%23ffffff%27%20fill-opacity=%270.1%27%3E%3Cpath%20d=%27M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-page-title">Academic Excellence</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Comprehensive education from elementary through higher secondary, fostering intellectual growth and character development
          </p>
        </div>
      </div>

      {/* Academic Levels Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {academicLevels.map((level) => (
            <div
              key={level.id}
              className="group cursor-pointer"
              onClick={() => setSelectedLevel(selectedLevel === level.id ? null : level.id)}
              data-testid={`card-academic-level-${level.id}`}
            >
              <Card className="overflow-hidden h-full hover-elevate transition-all duration-300">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={level.image}
                    alt={level.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent`}></div>
                </div>

                {/* Content Section */}
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-1">{level.title}</CardTitle>
                      <CardDescription className="text-sm font-medium text-primary">{level.ageGroup}</CardDescription>
                    </div>
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${level.color}`}>
                      <ChevronRight className={`w-5 h-5 ${level.textColor} transition-transform group-hover:translate-x-1`} />
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-4">{level.description}</p>

                  {/* Expandable Features */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      selectedLevel === level.id ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="space-y-2 pt-4 border-t">
                      {level.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${level.textColor.replace("text-", "bg-")}`}></div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Key Highlights Section */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-8 border border-primary/10">
          <h2 className="text-2xl font-bold mb-6">Why Choose Our Academic Programs?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Expert Faculty", description: "Experienced educators dedicated to student excellence" },
              { title: "Modern Facilities", description: "State-of-the-art labs and learning spaces" },
              { title: "Holistic Development", description: "Academic + extracurricular + personality development" },
              { title: "Personalized Attention", description: "Small class sizes ensuring individual focus" },
            ].map((highlight, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 h-6 rounded-full bg-primary"></div>
                </div>
                <h3 className="font-semibold mb-2">{highlight.title}</h3>
                <p className="text-sm text-muted-foreground">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Enroll?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join Kilbil High School & Junior College and experience comprehensive education that shapes future leaders
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
              Apply Now
            </Button>
            <Button size="lg" variant="outline" data-testid="button-contact" onClick={() => navigate("/contact")}>
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
