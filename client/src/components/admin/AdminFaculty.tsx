import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Trash2, Edit2, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Faculty } from "@shared/schema";
import defaultAvatar from "@assets/generated_images/default_faculty_avatar.png";

export function AdminFaculty() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    qualification: "",
    experience: "",
    subject: "",
    bio: "",
    photo: "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: allFacultyList = [] } = useQuery<Faculty[]>({
    queryKey: ["/api/faculty"],
  });

  const filteredList = allFacultyList
    .filter((f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.subject.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .reverse(); // Recently added first

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const facultyList = filteredList.slice(startIndex, startIndex + itemsPerPage);

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => 
      editingId 
        ? apiRequest("PATCH", `/api/faculty/${editingId}`, data)
        : apiRequest("POST", "/api/faculty", data),
    onSuccess: () => {
      toast({ 
        title: "Success", 
        description: editingId ? "Faculty member updated successfully" : "Faculty member added successfully" 
      });
      setFormData({ name: "", qualification: "", experience: "", subject: "", bio: "", photo: "" });
      setPhotoFile(null);
      setEditingId(null);
      setCurrentPage(1);
      queryClient.invalidateQueries({ queryKey: ["/api/faculty"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/faculty/${id}`, {}),
    onSuccess: () => {
      toast({ title: "Success", description: "Faculty member removed successfully" });
      setDeleteConfirm(null);
      queryClient.invalidateQueries({ queryKey: ["/api/faculty"] });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.qualification || !formData.subject || !formData.bio) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }

    let photoBase64 = "";
    if (photoFile) {
      photoBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(photoFile);
      });
    }

    // When editing without new photo, keep existing photo; otherwise use new photo
    const photoToSend = photoBase64 || (editingId ? formData.photo : undefined) || "";
    createMutation.mutate({ ...formData, photo: photoToSend });
  };

  const handleEdit = (faculty: Faculty) => {
    setEditingId(faculty.id);
    setFormData({
      name: faculty.name,
      qualification: faculty.qualification,
      experience: faculty.experience,
      subject: faculty.subject,
      bio: faculty.bio,
      photo: faculty.photo || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", qualification: "", experience: "", subject: "", bio: "", photo: "" });
    setPhotoFile(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {editingId ? (
              <>
                <Edit2 className="w-5 h-5" />
                Edit Faculty Member
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Add Faculty Member
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fac-name">Name *</Label>
              <Input
                id="fac-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full name"
                data-testid="input-faculty-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fac-subject">Subject *</Label>
              <Input
                id="fac-subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g., Mathematics, Science"
                data-testid="input-faculty-subject"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fac-qual">Qualification *</Label>
              <Input
                id="fac-qual"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                placeholder="e.g., M.Sc., B.Ed."
                data-testid="input-faculty-qualification"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fac-exp">Experience</Label>
              <Input
                id="fac-exp"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="e.g., 10 years"
                data-testid="input-faculty-experience"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fac-bio">Bio *</Label>
              <Textarea
                id="fac-bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Brief introduction"
                rows={3}
                data-testid="textarea-faculty-bio"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fac-photo">Photo (Optional)</Label>
              <Input
                id="fac-photo"
                type="file"
                onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                accept=".jpg,.jpeg,.png"
                data-testid="input-faculty-photo"
              />
              <p className="text-xs text-muted-foreground">Accepted formats: JPG, PNG (Max 5MB)</p>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={createMutation.isPending} data-testid="button-create-faculty" className="flex-1">
                {createMutation.isPending ? (editingId ? "Updating..." : "Adding...") : (editingId ? "Update Faculty Member" : "Add Faculty Member")}
              </Button>
              {editingId && (
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleCancelEdit}
                  data-testid="button-cancel-edit"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <CardTitle>Current Faculty</CardTitle>
            <Input
              placeholder="Search by name or subject..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-[250px]"
              data-testid="input-faculty-search"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredList.length === 0 ? (
            <p className="text-muted-foreground text-center py-8" data-testid="text-no-faculty">
              {searchQuery ? "No faculty members found" : "No faculty members yet"}
            </p>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {facultyList.map((faculty) => (
                  <Card key={faculty.id} className="hover-elevate active-elevate-2" data-testid={`faculty-${faculty.id}`}>
                    <CardHeader className="pb-3">
                      <div className="flex flex-col items-center">
                        <Avatar className="w-20 h-20 mb-3">
                          <AvatarImage src={faculty.photo || defaultAvatar} alt={faculty.name} />
                          <AvatarFallback>{faculty.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-center text-lg">{faculty.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2 text-sm">
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-muted-foreground">Subject:</span>
                          <span>{faculty.subject}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-muted-foreground">Qualification:</span>
                          <span>{faculty.qualification}</span>
                        </div>
                        {faculty.experience && (
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold text-muted-foreground">Experience:</span>
                            <span>{faculty.experience}</span>
                          </div>
                        )}
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-muted-foreground">Bio:</span>
                          <span className="text-xs line-clamp-2">{faculty.bio}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(faculty)}
                          data-testid={`button-edit-faculty-${faculty.id}`}
                          className="flex-1"
                        >
                          <Edit2 className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteConfirm(faculty.id)}
                          data-testid={`button-delete-faculty-${faculty.id}`}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredList.length > itemsPerPage && (
                <div className="flex items-center justify-between pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages} ({filteredList.length} total)
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      data-testid="button-prev-page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      data-testid="button-next-page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirm !== null} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this faculty member? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm && deleteMutation.mutate(deleteConfirm)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
