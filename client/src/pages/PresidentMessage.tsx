import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { setSEOMetaTags, pageMetadata } from "@/lib/seo";

export default function PresidentMessage() {
  useEffect(() => {
    setSEOMetaTags({
      title: pageMetadata.about_president.title,
      description: pageMetadata.about_president.description,
      url: window.location.href
    });
  }, []);

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center" data-testid="text-page-title">President's Message</h1>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <Users className="w-16 h-16 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2">Dr. Rajesh Kumar</CardTitle>
                <p className="text-muted-foreground">President, Kilbil Education Trust</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p data-testid="text-message-1">
              It is with great pride and joy that I welcome you to Kilbil High School & Junior Collage. Since our establishment in 1980, we have been dedicated to creating an educational institution that not only imparts knowledge but also builds character and values in our students.
            </p>
            <p data-testid="text-message-2">
              Education is the foundation of a strong society, and at Kilbil, we believe in providing a holistic learning experience. Our commitment goes beyond textbooks and examinations. We strive to create an environment where students can explore their interests, develop critical thinking skills, and grow into responsible citizens.
            </p>
            <p data-testid="text-message-3">
              Over the past four decades, we have witnessed thousands of students walk through our doors and emerge as confident individuals ready to make their mark in the world. This has been possible due to our dedicated faculty, supportive parents, and most importantly, our enthusiastic students.
            </p>
            <p data-testid="text-message-4">
              As we continue to evolve and adapt to the changing educational landscape, our core values remain unchanged - integrity, excellence, and compassion. We are committed to providing state-of-the-art facilities, experienced teachers, and a nurturing environment that allows every child to reach their full potential.
            </p>
            <p data-testid="text-message-5">
              I invite you to join our Kilbil family and be part of this remarkable journey of learning and growth. Together, we will continue to build a brighter future for our children and our community.
            </p>
            <p className="font-medium text-foreground pt-4">
              Warm regards,<br />
              Dr. Rajesh Kumar<br />
              President
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
