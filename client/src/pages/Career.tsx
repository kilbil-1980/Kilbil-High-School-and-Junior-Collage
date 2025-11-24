import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, GraduationCap, Heart } from "lucide-react";

export default function Career() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-page-title">Career Opportunities</h1>
          <p className="text-lg text-muted-foreground">
            Join our team of dedicated educators and make a difference
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Why Work With Us?</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <Heart className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Meaningful Work</h3>
                <p className="text-sm text-muted-foreground">Shape young minds and contribute to the future of education</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Users className="w-8 h-8 text-secondary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Supportive Environment</h3>
                <p className="text-sm text-muted-foreground">Work with experienced colleagues in a collaborative atmosphere</p>
              </div>
            </div>
            <div className="flex gap-4">
              <GraduationCap className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Professional Growth</h3>
                <p className="text-sm text-muted-foreground">Opportunities for training and career development</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Briefcase className="w-8 h-8 text-secondary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Competitive Benefits</h3>
                <p className="text-sm text-muted-foreground">Attractive salary packages and benefits</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current Openings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-4 hover-elevate" data-testid="card-opening-1">
                <h3 className="font-semibold text-lg mb-2">Mathematics Teacher (Secondary)</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  We are looking for an experienced Mathematics teacher for grades 8-10. Candidate should have strong subject knowledge and passion for teaching.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-accent px-2 py-1 rounded">Full-time</span>
                  <span className="text-xs bg-accent px-2 py-1 rounded">B.Ed Required</span>
                  <span className="text-xs bg-accent px-2 py-1 rounded">2+ years experience</span>
                </div>
              </div>

              <div className="border rounded-md p-4 hover-elevate" data-testid="card-opening-2">
                <h3 className="font-semibold text-lg mb-2">Science Teacher (Higher Secondary)</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Seeking a qualified Science teacher for Physics/Chemistry/Biology for grades 11-12. Strong academic background preferred.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-accent px-2 py-1 rounded">Full-time</span>
                  <span className="text-xs bg-accent px-2 py-1 rounded">M.Sc + B.Ed</span>
                  <span className="text-xs bg-accent px-2 py-1 rounded">3+ years experience</span>
                </div>
              </div>

              <div className="border rounded-md p-4 hover-elevate" data-testid="card-opening-3">
                <h3 className="font-semibold text-lg mb-2">Physical Education Teacher</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Looking for an energetic sports teacher to conduct physical education classes and manage sports activities.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-accent px-2 py-1 rounded">Full-time</span>
                  <span className="text-xs bg-accent px-2 py-1 rounded">B.P.Ed</span>
                  <span className="text-xs bg-accent px-2 py-1 rounded">1+ years experience</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How to Apply</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground" data-testid="text-apply-instructions">
              Interested candidates can send their resume and cover letter to{" "}
              <a href="mailto:careers@kilbilschool.edu" className="text-primary hover:underline" data-testid="link-careers-email">
                careers@kilbilschool.edu
              </a>
              {" "}or call us at{" "}
              <a href="tel:08128352815" className="text-primary hover:underline" data-testid="link-careers-phone">
                08128352815
              </a>
              {" "}for more information.
            </p>
            <p className="text-sm text-muted-foreground">
              Please include "Application for [Position Name]" in the subject line of your email.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
