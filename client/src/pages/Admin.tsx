import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock } from "lucide-react";
import { AdminAnnouncements } from "@/components/admin/AdminAnnouncements";
import { AdminFaculty } from "@/components/admin/AdminFaculty";
import { AdminTimetables } from "@/components/admin/AdminTimetables";
import { AdminAdmissions } from "@/components/admin/AdminAdmissions";
import { AdminGallery } from "@/components/admin/AdminGallery";
import { AdminFacilities } from "@/components/admin/AdminFacilities";
import { AdminCareer } from "@/components/admin/AdminCareer";
import { AdminManagement } from "@/components/admin/AdminManagement";

export default function Admin() {
  const [adminRole, setAdminRole] = useState<string | null>(null);

  useEffect(() => {
    // Get admin role from session (stored after login)
    const checkRole = async () => {
      try {
        const res = await fetch("/api/admin/check", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          // In a real app, we'd fetch the role from a dedicated endpoint
          // For now, we'll try to get it from sessionStorage set during login
          const role = sessionStorage.getItem("adminRole");
          if (role) setAdminRole(role);
        }
      } catch (error) {
        console.error("Failed to check admin role:", error);
      }
    };
    checkRole();
  }, []);

  const isMasterAdmin = adminRole === "master-admin";

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4" data-testid="text-page-title">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Manage your school website content
          </p>
        </div>

        <Tabs defaultValue="announcements" className="w-full">
          <TabsList className={`grid w-full ${isMasterAdmin ? 'grid-cols-4 lg:grid-cols-8' : 'grid-cols-3 lg:grid-cols-7'} mb-8`}>
            {isMasterAdmin && (
              <TabsTrigger value="management" data-testid="tab-management" className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
            )}
            <TabsTrigger value="announcements" data-testid="tab-announcements">Announcements</TabsTrigger>
            <TabsTrigger value="faculty" data-testid="tab-faculty">Faculty</TabsTrigger>
            <TabsTrigger value="timetables" data-testid="tab-timetables">Timetables</TabsTrigger>
            <TabsTrigger value="admissions" data-testid="tab-admissions">Admissions</TabsTrigger>
            <TabsTrigger value="gallery" data-testid="tab-gallery">Gallery</TabsTrigger>
            <TabsTrigger value="facilities" data-testid="tab-facilities">Facilities</TabsTrigger>
            <TabsTrigger value="career" data-testid="tab-career">Career</TabsTrigger>
          </TabsList>

          {isMasterAdmin && (
            <TabsContent value="management">
              <AdminManagement />
            </TabsContent>
          )}

          <TabsContent value="announcements">
            <AdminAnnouncements />
          </TabsContent>

          <TabsContent value="faculty">
            <AdminFaculty />
          </TabsContent>

          <TabsContent value="timetables">
            <AdminTimetables />
          </TabsContent>

          <TabsContent value="admissions">
            <AdminAdmissions />
          </TabsContent>

          <TabsContent value="gallery">
            <AdminGallery />
          </TabsContent>

          <TabsContent value="facilities">
            <AdminFacilities />
          </TabsContent>

          <TabsContent value="career">
            <AdminCareer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
