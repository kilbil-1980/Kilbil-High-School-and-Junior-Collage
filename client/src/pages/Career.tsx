import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, GraduationCap, Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Career } from "@shared/schema";
import { setSEOMetaTags, pageMetadata } from "@/lib/seo";

export default function Career() {
  useEffect(() => {
    setSEOMetaTags({
      title: pageMetadata.career.title,
      description: pageMetadata.career.description,
      url: window.location.href
    });
  }, []);
  const { data: careers } = useQuery<Career[]>({
    queryKey: ["/api/careers"],
  });
  return (
    <div className="min-h-screen bg-soft-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-pale-beige rounded-full border border-golden-yellow/30">
            <span className="text-royal-blue font-semibold text-sm">Join Our Team</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 text-royal-blue" data-testid="text-page-title">Career Opportunities</h1>
          <p className="text-lg text-muted-foreground">
            Join our team of dedicated educators and make a difference
          </p>
        </div>

        <Card className="mb-8 border-t-4" style={{borderTopColor: '#1E3A8A'}}>
          <CardHeader>
            <CardTitle className="text-2xl text-royal-blue">Why Work With Us?</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <Heart className="w-8 h-8 flex-shrink-0" style={{color: '#DC4A38'}} />
              <div>
                <h3 className="font-semibold mb-2">Meaningful Work</h3>
                <p className="text-sm text-muted-foreground">Shape young minds and contribute to the future of education</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Users className="w-8 h-8 flex-shrink-0" style={{color: '#0EA5E9'}} />
              <div>
                <h3 className="font-semibold mb-2">Supportive Environment</h3>
                <p className="text-sm text-muted-foreground">Work with experienced colleagues in a collaborative atmosphere</p>
              </div>
            </div>
            <div className="flex gap-4">
              <GraduationCap className="w-8 h-8 flex-shrink-0" style={{color: '#FCD34D'}} />
              <div>
                <h3 className="font-semibold mb-2">Professional Growth</h3>
                <p className="text-sm text-muted-foreground">Opportunities for training and career development</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Briefcase className="w-8 h-8 flex-shrink-0" style={{color: '#1E3A8A'}} />
              <div>
                <h3 className="font-semibold mb-2">Competitive Benefits</h3>
                <p className="text-sm text-muted-foreground">Attractive salary packages and benefits</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 border-t-4" style={{borderTopColor: '#DC4A38'}}>
          <CardHeader>
            <CardTitle className="text-royal-blue">Current Openings</CardTitle>
          </CardHeader>
          <CardContent>
            {!careers || careers.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No job openings at the moment. Check back soon!</p>
            ) : (
              <div className="space-y-4">
                {careers.map((career) => (
                  <div key={career.id} className="border rounded-md p-4 hover-elevate" data-testid={`card-opening-${career.id}`}>
                    <h3 className="font-semibold text-lg mb-2">{career.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{career.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {career.qualifications && (
                        <span className="text-xs bg-accent px-2 py-1 rounded">{career.qualifications}</span>
                      )}
                      {career.experience && (
                        <span className="text-xs bg-accent px-2 py-1 rounded">{career.experience}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-t-4" style={{borderTopColor: '#0EA5E9'}}>
          <CardHeader>
            <CardTitle className="text-royal-blue">How to Apply</CardTitle>
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
