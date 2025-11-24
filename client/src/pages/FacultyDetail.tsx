import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Faculty } from "@shared/schema";
import defaultAvatar from "@assets/generated_images/default_faculty_avatar.png";

export default function FacultyDetail() {
  const [, params] = useRoute("/faculty/:id");
  const facultyId = params?.id;

  const { data: facultyList, isLoading } = useQuery<Faculty[]>({
    queryKey: ["/api/faculty"],
  });

  const faculty = facultyList?.find(f => f.id === facultyId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-10 w-32 mb-8" />
          <Card>
            <CardHeader>
              <Skeleton className="w-32 h-32 rounded-full mx-auto mb-4" />
              <Skeleton className="h-8 w-48 mx-auto mb-2" />
              <Skeleton className="h-6 w-32 mx-auto" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!faculty) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4" data-testid="text-not-found">Faculty member not found.</p>
              <Link href="/about/faculty">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Faculty
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/about/faculty">
          <Button variant="ghost" className="mb-8" data-testid="button-back">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Faculty
          </Button>
        </Link>

        <Card>
          <CardHeader className="text-center">
            <Avatar className="w-32 h-32 mx-auto mb-6">
              <AvatarImage src={faculty.photo || defaultAvatar} alt={faculty.name} />
              <AvatarFallback className="text-3xl">{faculty.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-3xl mb-3" data-testid="text-faculty-name">{faculty.name}</CardTitle>
            <Badge variant="secondary" className="text-base px-4 py-1">{faculty.subject}</Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Qualification</h3>
              <p className="text-muted-foreground" data-testid="text-qualification">{faculty.qualification}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Experience</h3>
              <p className="text-muted-foreground" data-testid="text-experience">{faculty.experience}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">About</h3>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-bio">{faculty.bio}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
