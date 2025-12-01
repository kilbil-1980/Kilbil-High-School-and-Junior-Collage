import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

interface FacilitiesResponse {
  facilities: Facility[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export default function Facilities() {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    setSEOMetaTags({
      title: pageMetadata.facilities.title,
      description: pageMetadata.facilities.description,
      url: window.location.href
    });
  }, []);

  const { data: facilitiesData, isLoading } = useQuery<FacilitiesResponse>({
    queryKey: ["/api/facilities", currentPage],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(currentPage),
        limit: String(ITEMS_PER_PAGE),
      });
      const res = await fetch(`/api/facilities?${params}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch facilities");
      return res.json();
    },
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
    staleTime: 4000,
  });

  const facilities = facilitiesData?.facilities || [];
  const pagination = facilitiesData?.pagination;

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
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-page-title">Our Facilities</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Modern infrastructure and well-equipped facilities for comprehensive education
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {facilities.map((facility) => (
                <Card key={facility.id} className="overflow-hidden hover-elevate" data-testid={`card-facility-${facility.id}`}>
                  <div className="h-48 overflow-hidden">
                    <img
                      src={facility.imageUrl || defaultImages[facility.name] || labImage}
                      alt={facility.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{facility.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{facility.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  data-testid="button-prev-page"
                  className="rounded-full"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: pagination.totalPages }).map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        data-testid={`button-page-${pageNum}`}
                        className="rounded-full"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
                  disabled={!pagination.hasMore}
                  data-testid="button-next-page"
                  className="rounded-full"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
