import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Faculty } from "@shared/schema";
import defaultAvatar from "@assets/generated_images/default_faculty_avatar.png";
import { setSEOMetaTags, pageMetadata } from "@/lib/seo";
import { BookOpen, Award } from "lucide-react";

interface FacultyResponse {
  faculty: Faculty[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export default function FacultyPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    setSEOMetaTags({
      title: pageMetadata.about_faculty.title,
      description: pageMetadata.about_faculty.description,
      url: window.location.href
    });
  }, []);

  const { data: facultyData, isLoading } = useQuery<FacultyResponse>({
    queryKey: ["/api/faculty", currentPage],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(currentPage),
        limit: String(ITEMS_PER_PAGE),
      });
      const res = await fetch(`/api/faculty?${params}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch faculty");
      return res.json();
    },
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
    staleTime: 4000,
  });

  const facultyList = facultyData?.faculty || [];
  const pagination = facultyData?.pagination;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 text-center">Our Faculty</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                </CardHeader>
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
          <h1 className="text-4xl font-bold mb-4" data-testid="text-page-title">Our Faculty</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Meet our dedicated team of experienced educators committed to your success
          </p>
        </div>

        {(!facultyList || facultyList.length === 0) ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground" data-testid="text-no-faculty">
                No faculty members to display at the moment. Please check back later.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {facultyList.map((member) => (
                <Link key={member.id} href={`/faculty/${member.id}`}>
                  <Card className="hover-elevate active-elevate-2 cursor-pointer h-full flex flex-col overflow-hidden" data-testid={`card-faculty-${member.id}`}>
                    <CardHeader className="bg-gradient-to-b from-primary/5 to-transparent pb-4 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Avatar className="w-24 h-24 border-2 border-primary/20">
                          <AvatarImage src={member.photo || defaultAvatar} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2 w-full">
                          <h3 className="font-bold text-lg leading-tight">{member.name}</h3>
                          <Badge variant="outline" className="mx-auto">
                            <BookOpen className="w-3 h-3 mr-1" />
                            {member.subject}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4 pt-4">
                      <div className="space-y-3">
                        <div className="pb-3 border-b">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Qualification</p>
                          <p className="text-sm font-medium">{member.qualification}</p>
                        </div>
                        {member.experience && (
                          <div className="pb-3 border-b">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              Experience
                            </p>
                            <p className="text-sm font-medium">{member.experience}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">About</p>
                          <p className="text-sm text-muted-foreground line-clamp-3">{member.bio}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
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
