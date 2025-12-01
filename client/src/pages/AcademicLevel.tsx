import { useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Award, GraduationCap, Target, Lightbulb, ChevronRight } from "lucide-react";
import { setSEOMetaTags, pageMetadata } from "@/lib/seo";
import elementaryImage from "@assets/generated_images/elementary_school_classroom_children_learning.png";
import primaryImage from "@assets/generated_images/primary_school_interactive_learning_classroom.png";
import secondaryImage from "@assets/generated_images/secondary_school_stem_learning_classroom.png";
import higherSecondaryImage from "@assets/generated_images/higher_secondary_college_learning_environment.png";

interface AcademicLevelProps {
  level: "elementary" | "primary" | "secondary" | "higher-secondary";
}

const levelData = {
  elementary: {
    title: "Elementary School",
    subtitle: "Building Strong Foundations",
    grades: "Grades 1-4",
    ageGroup: "Ages 6-10",
    image: elementaryImage,
    color: "from-blue-600 to-blue-700",
    accentColor: "bg-blue-50 text-blue-700",
    description: "Our Elementary program lays the foundation for lifelong learning with a focus on basic literacy, numeracy, and social skills. We create a nurturing environment where young learners develop confidence, curiosity, and a genuine love for learning.",
    curriculum: [
      { icon: BookOpen, title: "English Language & Literature", desc: "Building reading and writing skills" },
      { icon: Lightbulb, title: "Mathematics", desc: "Number sense and problem-solving" },
      { icon: Users, title: "Environmental Studies", desc: "Exploring the world around us" },
      { icon: Award, title: "Arts & Crafts", desc: "Creative expression" },
      { icon: Target, title: "Hindi", desc: "Language learning" },
      { icon: GraduationCap, title: "Physical Education", desc: "Health and fitness" },
    ],
    focus: [
      "Strong reading and writing skills development",
      "Number sense and mathematical thinking",
      "Social and emotional learning",
      "Creative thinking and imagination",
      "Building confidence and self-esteem",
      "Curiosity-driven exploration",
    ],
    highlight: "We believe in play-based learning where children learn through activities, games, and hands-on experiences, making education fun and memorable.",
  },
  primary: {
    title: "Primary School",
    subtitle: "Interactive Learning & Growth",
    grades: "Grades 5-7",
    ageGroup: "Ages 10-13",
    image: primaryImage,
    color: "from-green-600 to-green-700",
    accentColor: "bg-green-50 text-green-700",
    description: "The Primary program introduces more structured learning while maintaining an engaging and supportive environment. Students develop deeper conceptual understanding and begin to specialize in different subject areas.",
    curriculum: [
      { icon: BookOpen, title: "English", desc: "Advanced language skills" },
      { icon: Lightbulb, title: "Mathematics", desc: "Algebraic thinking" },
      { icon: Target, title: "Science", desc: "Experimental learning" },
      { icon: Users, title: "Social Studies", desc: "History and geography" },
      { icon: Award, title: "Computer Science", desc: "Digital literacy" },
      { icon: GraduationCap, title: "Arts & Sports", desc: "Holistic development" },
    ],
    focus: [
      "Core academic skill strengthening",
      "Introduction to scientific method",
      "Critical thinking development",
      "Study habits and time management",
      "Collaborative learning experiences",
      "Leadership qualities development",
    ],
    highlight: "We emphasize project-based learning where students work on real-world problems, developing creativity and practical problem-solving abilities.",
  },
  secondary: {
    title: "Secondary School",
    subtitle: "Advanced Studies & Excellence",
    grades: "Grades 8-10",
    ageGroup: "Ages 13-16",
    image: secondaryImage,
    color: "from-purple-600 to-purple-700",
    accentColor: "bg-purple-50 text-purple-700",
    description: "Our Secondary program prepares students for board examinations while focusing on comprehensive subject knowledge and skill development. We provide rigorous academics balanced with character formation.",
    curriculum: [
      { icon: BookOpen, title: "English", desc: "Literature and communication" },
      { icon: Lightbulb, title: "Mathematics", desc: "Advanced concepts" },
      { icon: Target, title: "Science (Physics, Chemistry, Biology)", desc: "Laboratory-based learning" },
      { icon: Users, title: "Social Science", desc: "History, geography, civics" },
      { icon: Award, title: "Computer Applications", desc: "Technology skills" },
      { icon: GraduationCap, title: "Physical Education", desc: "Sports and wellness" },
    ],
    focus: [
      "In-depth subject knowledge",
      "Board exam preparation",
      "Analytical and reasoning skills",
      "Science laboratory experience",
      "Career guidance and counseling",
      "Regular progress assessment",
    ],
    highlight: "Our state-of-the-art laboratories and experienced faculty ensure students gain hands-on experience in science and develop conceptual clarity essential for higher studies.",
  },
  "higher-secondary": {
    title: "Higher Secondary (Junior College)",
    subtitle: "College-Level Excellence",
    grades: "Grades 11-12",
    ageGroup: "Ages 16-18",
    image: higherSecondaryImage,
    color: "from-orange-600 to-orange-700",
    accentColor: "bg-orange-50 text-orange-700",
    description: "Our Higher Secondary program offers specialized streams to prepare students for higher education and competitive examinations. We guide young adults toward success in their chosen fields.",
    curriculum: [
      { icon: BookOpen, title: "Science Stream", desc: "PCM / PCB specialization" },
      { icon: Lightbulb, title: "Commerce Stream", desc: "Business and economics" },
      { icon: Target, title: "Arts Stream", desc: "Humanities and social sciences" },
      { icon: Users, title: "English", desc: "Communication excellence" },
      { icon: Award, title: "Stream-Specific Subjects", desc: "Advanced studies" },
      { icon: GraduationCap, title: "Career Guidance", desc: "College preparation" },
    ],
    focus: [
      "Stream-specific in-depth study",
      "Board examination excellence",
      "Competitive exam preparation",
      "College entrance guidance",
      "Professional skill development",
      "Independent learning abilities",
    ],
    highlight: "We provide comprehensive college preparation with expert guidance, ensuring our students are well-prepared for competitive entrances and excel in their chosen streams.",
  },
};

export default function AcademicLevel({ level }: AcademicLevelProps) {
  const [, navigate] = useLocation();
  const data = levelData[level];

  useEffect(() => {
    const levelTitle = data.title.replace(/\s+/g, "_").toLowerCase();
    setSEOMetaTags({
      title: data.title,
      description: data.description,
      url: window.location.href
    });
  }, [data]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Image */}
      <div className={`relative bg-gradient-to-r ${data.color} text-white overflow-hidden`}>
        <div className="absolute inset-0">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${data.color} opacity-70`}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur rounded-full">
              <span className="text-sm font-semibold text-white">{data.ageGroup}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4" data-testid="text-level-title">
              {data.title}
            </h1>
            <p className="text-2xl text-white/90 mb-6">{data.subtitle}</p>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Image Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-12 relative z-10">
        <div className="rounded-xl overflow-hidden shadow-2xl h-96 md:h-[500px]">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className={`${data.accentColor} border-0`}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <BookOpen className="w-8 h-8 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Grade Level</h3>
                  <p className="text-sm opacity-80" data-testid="text-grades">{data.grades}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${data.accentColor} border-0`}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Age Group</h3>
                  <p className="text-sm opacity-80" data-testid="text-age-group">{data.ageGroup}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${data.accentColor} border-0`}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Award className="w-8 h-8 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Focus</h3>
                  <p className="text-sm opacity-80">Excellence & Growth</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Curriculum Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Curriculum & Subjects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.curriculum.map((subject, index) => {
              const Icon = subject.icon;
              return (
                <Card key={index} className="hover-elevate transition-all" data-testid={`card-curriculum-${index}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${data.accentColor}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{subject.title}</h3>
                        <p className="text-sm text-muted-foreground">{subject.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Focus Areas */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Our Focus Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.focus.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-muted rounded-lg hover-elevate transition-all"
                data-testid={`text-focus-${index}`}
              >
                <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Teaching Approach */}
        <Card className={`${data.accentColor} border-0 mb-12`}>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Lightbulb className="w-8 h-8" />
              Our Teaching Philosophy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed" data-testid="text-teaching-approach">
              {data.highlight}
            </p>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center py-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover how our {data.title.toLowerCase()} program can help your child achieve academic excellence and personal growth.
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
