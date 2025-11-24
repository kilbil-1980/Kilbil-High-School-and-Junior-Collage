import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function DirectorMessage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center" data-testid="text-page-title">Director's Message</h1>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <Users className="w-16 h-16 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2">Mrs. Priya Sharma</CardTitle>
                <p className="text-muted-foreground">Director, Kilbil High School & Junior Collage</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p data-testid="text-message-1">
              Dear Students, Parents, and Well-wishers,
            </p>
            <p data-testid="text-message-2">
              As the Director of Kilbil High School & Junior Collage, I am honored to lead an institution that has been a beacon of quality education in Pune for over 40 years. Our school stands on the pillars of academic excellence, moral values, and holistic development.
            </p>
            <p data-testid="text-message-3">
              In today's rapidly changing world, education must prepare students not just for exams, but for life. At Kilbil, we focus on developing well-rounded individuals who are academically strong, emotionally balanced, and socially responsible. Our curriculum is designed to challenge students intellectually while providing ample opportunities for creative expression and personal growth.
            </p>
            <p data-testid="text-message-4">
              We take pride in our experienced and dedicated faculty who go beyond their call of duty to ensure each student receives individual attention and support. Our modern infrastructure, well-equipped laboratories, extensive library, and sports facilities provide the perfect environment for comprehensive learning.
            </p>
            <p data-testid="text-message-5">
              We believe in fostering a culture of inclusivity, respect, and collaboration. Our students learn to appreciate diversity, work in teams, and develop leadership qualities that will serve them throughout their lives. We encourage innovation, critical thinking, and a love for lifelong learning.
            </p>
            <p data-testid="text-message-6">
              I invite you to explore what Kilbil has to offer and become part of our vibrant community. Together, we will continue to uphold our tradition of excellence while preparing our students for the opportunities and challenges of tomorrow.
            </p>
            <p className="font-medium text-foreground pt-4">
              Best wishes,<br />
              Mrs. Priya Sharma<br />
              Director
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
