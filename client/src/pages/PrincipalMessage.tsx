import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function PrincipalMessage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center" data-testid="text-page-title">Principal's Message</h1>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <Users className="w-16 h-16 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2">Mr. Amit Deshmukh</CardTitle>
                <p className="text-muted-foreground">Principal, Kilbil High School & Junior Collage</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p data-testid="text-message-1">
              Welcome to Kilbil High School & Junior Collage!
            </p>
            <p data-testid="text-message-2">
              As the Principal of this esteemed institution, I am privileged to work with some of the brightest young minds and the most dedicated educators. Every day at Kilbil is an opportunity to learn, grow, and make a positive difference in the lives of our students.
            </p>
            <p data-testid="text-message-3">
              Education at Kilbil goes beyond the classroom. We believe in creating an enriching environment where students are encouraged to question, explore, and discover. Our teaching methodology combines traditional values with modern pedagogical approaches, ensuring that students receive a well-balanced education that prepares them for higher studies and future careers.
            </p>
            <p data-testid="text-message-4">
              Our experienced faculty members are committed to academic excellence and the overall development of each student. We maintain small class sizes to ensure personalized attention, and our teachers work closely with parents to support every child's unique learning journey. Regular assessments, constructive feedback, and individualized support help students achieve their academic goals.
            </p>
            <p data-testid="text-message-5">
              Beyond academics, we offer numerous opportunities for students to develop their talents in sports, arts, music, and various co-curricular activities. We believe that participation in these activities builds confidence, teamwork, and leadership skills that are essential for success in life.
            </p>
            <p data-testid="text-message-6">
              We maintain a safe, inclusive, and nurturing environment where every student feels valued and respected. Our discipline policy emphasizes responsibility and respect, helping students develop into well-mannered and ethical individuals.
            </p>
            <p data-testid="text-message-7">
              I encourage all students to make the most of the opportunities available at Kilbil. Work hard, stay curious, be kind, and always strive for excellence. To parents, thank you for entrusting us with your child's education. We look forward to partnering with you in this incredible journey.
            </p>
            <p className="font-medium text-foreground pt-4">
              Sincerely,<br />
              Mr. Amit Deshmukh<br />
              Principal
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
