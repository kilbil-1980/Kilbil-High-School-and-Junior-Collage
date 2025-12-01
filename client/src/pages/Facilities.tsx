import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import type { Facility } from "@shared/schema";
import labImage from "@assets/generated_images/science_laboratory_facility.png";
import libraryImage from "@assets/generated_images/school_library_facility.png";
import sportsImage from "@assets/generated_images/sports_ground_facility.png";
import medicalImage from "@assets/generated_images/medical_room_facility.png";
import { setSEOMetaTags, pageMetadata } from "@/lib/seo";

const defaultImages: Record<string, string> = {
  "Science Laboratory": labImage,
  "Library": libraryImage,
  "Sports Ground": sportsImage,
  "Medical Room": medicalImage,
};

export default function Facilities() {
  useEffect(() => {
    setSEOMetaTags({
      title: pageMetadata.facilities.title,
      description: pageMetadata.facilities.description,
      url: window.location.href
    });
  }, []);
  const { data: facilities, isLoading } = useQuery<Facility[]>({
    queryKey: ["/api/facilities"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 text-center">Our Facilities</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <Skeleton className="h-48 w-full rounded-t-md" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-pale-beige rounded-full border border-golden-yellow/30">
            <span className="text-royal-blue font-semibold text-sm">Our Campus</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 text-royal-blue" data-testid="text-page-title">World-Class Facilities</h1>
          <p className="text-lg text-slate-gray max-w-3xl mx-auto">
            Modern infrastructure designed for comprehensive development
          </p>
        </div>

        {(!facilities || facilities.length === 0) ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground" data-testid="text-no-facilities">
                Facility information will be available soon.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, idx) => {
              const colors = ['#1E3A8A', '#DC4A38', '#0EA5E9', '#FCD34D', '#475569', '#FEF3E2'];
              const color = colors[idx % colors.length];
              return (
                <Card key={facility.id} className="overflow-hidden hover-elevate border-t-4 transition-all" style={{borderTopColor: color}} data-testid={`card-facility-${facility.id}`}>
                  <div className="h-48 overflow-hidden">
                    <img
                      src={facility.imageUrl || defaultImages[facility.name] || labImage}
                      alt={facility.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-royal-blue">{facility.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-gray">{facility.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
