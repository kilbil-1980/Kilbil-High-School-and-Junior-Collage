import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import type { Faculty } from "@shared/schema";
import defaultAvatar from "@assets/generated_images/default_faculty_avatar.png";
import { setSEOMetaTags, pageMetadata } from "@/lib/seo";

export default function FacultyPage() {
  useEffect(() => {
    setSEOMetaTags({
      title: pageMetadata.about_faculty.title,
      description: pageMetadata.about_faculty.description,
      url: window.location.href
    });
  }, []);
  const { data: facultyList, isLoading } = useQuery<Faculty[]>({
    queryKey: ["/api/faculty"],
  });

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facultyList.map((member) => (
              <Link key={member.id} href={`/faculty/${member.id}`}>
                <Card className="hover-elevate active-elevate-2 cursor-pointer h-full flex flex-col" data-testid={`card-faculty-${member.id}`}>
                  <CardHeader className="pb-2 pt-3 px-4">
                    <div className="flex flex-col items-center">
                      <Avatar className="w-16 h-16 mb-2">
                        <AvatarImage src={member.photo || defaultAvatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-center text-base">{member.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 px-4 py-2">
                    <div className="space-y-1 text-xs">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-muted-foreground text-xs">Subject:</span>
                        <span className="text-sm">{member.subject}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-muted-foreground text-xs">Qualification:</span>
                        <span className="text-sm">{member.qualification}</span>
                      </div>
                      {member.experience && (
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-muted-foreground text-xs">Experience:</span>
                          <span className="text-sm">{member.experience}</span>
                        </div>
                      )}
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-muted-foreground text-xs">Bio:</span>
                        <span className="text-xs line-clamp-1">{member.bio}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
