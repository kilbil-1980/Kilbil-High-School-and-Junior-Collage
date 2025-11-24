import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { AdminAnnouncements } from "@/components/admin/AdminAnnouncements";
import { AdminFaculty } from "@/components/admin/AdminFaculty";
import { AdminTimetables } from "@/components/admin/AdminTimetables";
import { AdminAdmissions } from "@/components/admin/AdminAdmissions";
import { AdminGallery } from "@/components/admin/AdminGallery";
import { AdminFacilities } from "@/components/admin/AdminFacilities";
import { AdminCareer } from "@/components/admin/AdminCareer";

export default function Admin() {
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
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 mb-8">
            <TabsTrigger value="announcements" data-testid="tab-announcements">Announcements</TabsTrigger>
            <TabsTrigger value="faculty" data-testid="tab-faculty">Faculty</TabsTrigger>
            <TabsTrigger value="timetables" data-testid="tab-timetables">Timetables</TabsTrigger>
            <TabsTrigger value="admissions" data-testid="tab-admissions">Admissions</TabsTrigger>
            <TabsTrigger value="gallery" data-testid="tab-gallery">Gallery</TabsTrigger>
            <TabsTrigger value="facilities" data-testid="tab-facilities">Facilities</TabsTrigger>
            <TabsTrigger value="career" data-testid="tab-career">Career</TabsTrigger>
          </TabsList>

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
