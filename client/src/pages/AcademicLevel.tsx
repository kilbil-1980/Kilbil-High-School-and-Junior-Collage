import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Award, Clock } from "lucide-react";

interface AcademicLevelProps {
  level: "elementary" | "primary" | "secondary" | "higher-secondary";
}

const levelData = {
  elementary: {
    title: "Elementary",
    grades: "Grades 1-4",
    ageGroup: "Ages 6-10",
    description: "Our Elementary program lays the foundation for lifelong learning with a focus on basic literacy, numeracy, and social skills.",
    curriculum: [
      "English Language and Literature",
      "Mathematics",
      "Environmental Studies",
      "Hindi",
      "Art and Craft",
      "Physical Education",
    ],
    focus: [
      "Building strong reading and writing skills",
      "Developing number sense and problem-solving abilities",
      "Encouraging curiosity and exploration",
      "Fostering social and emotional development",
      "Creating a love for learning",
    ],
  },
  primary: {
    title: "Primary",
    grades: "Grades 5-7",
    ageGroup: "Ages 10-13",
    description: "The Primary program introduces more structured learning while maintaining an engaging and supportive environment.",
    curriculum: [
      "English",
      "Mathematics",
      "Science",
      "Social Studies",
      "Hindi",
      "Computer Science",
      "Art and Music",
      "Physical Education",
    ],
    focus: [
      "Strengthening core academic skills",
      "Introduction to scientific thinking",
      "Development of critical thinking abilities",
      "Building study habits and time management",
      "Encouraging participation in co-curricular activities",
    ],
  },
  secondary: {
    title: "Secondary",
    grades: "Grades 8-10",
    ageGroup: "Ages 13-16",
    description: "Our Secondary program prepares students for board examinations while focusing on comprehensive subject knowledge and skill development.",
    curriculum: [
      "English",
      "Mathematics",
      "Science (Physics, Chemistry, Biology)",
      "Social Science (History, Geography, Civics)",
      "Hindi",
      "Computer Applications",
      "Physical Education",
    ],
    focus: [
      "Rigorous academic preparation for SSC Board exams",
      "In-depth subject knowledge and conceptual understanding",
      "Development of analytical and reasoning skills",
      "Guidance for career path selection",
      "Regular assessments and progress tracking",
    ],
  },
  "higher-secondary": {
    title: "Higher Secondary (Junior College)",
    grades: "Grades 11-12",
    ageGroup: "Ages 16-18",
    description: "Our Higher Secondary program offers specialized streams to prepare students for higher education and competitive examinations.",
    curriculum: [
      "Science Stream (PCM/PCB)",
      "Commerce Stream",
      "Arts Stream",
      "English",
      "Additional subjects based on stream",
    ],
    focus: [
      "Stream-specific in-depth study",
      "Preparation for HSC Board examinations",
      "Career counseling and college guidance",
      "Competitive exam preparation support",
      "Development of independent learning skills",
    ],
  },
};

export default function AcademicLevel({ level }: AcademicLevelProps) {
  const data = levelData[level];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-level-title">{data.title}</h1>
          <div className="flex justify-center gap-6 text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span data-testid="text-grades">{data.grades}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span data-testid="text-age-group">{data.ageGroup}</span>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {data.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary" />
                Curriculum
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {data.curriculum.map((subject, index) => (
                  <li key={index} className="flex items-start gap-2" data-testid={`text-curriculum-${index}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{subject}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6 text-secondary" />
                Focus Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {data.focus.map((item, index) => (
                  <li key={index} className="flex items-start gap-2" data-testid={`text-focus-${index}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-accent">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Our Teaching Approach</h2>
            <p className="text-muted-foreground leading-relaxed" data-testid="text-teaching-approach">
              At Kilbil High School & Junior Collage, we believe in student-centered learning that encourages active participation, critical thinking, and collaborative problem-solving. Our experienced teachers use a combination of traditional and modern teaching methods to ensure every student understands concepts thoroughly and develops a genuine interest in learning. We maintain small class sizes to provide individual attention and regularly assess progress to help students reach their full potential.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
