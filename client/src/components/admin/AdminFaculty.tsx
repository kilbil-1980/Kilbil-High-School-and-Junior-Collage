import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Trash2 } from "lucide-react";
import type { Faculty } from "@shared/schema";

export function AdminFaculty() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    qualification: "",
    experience: "",
    subject: "",
    bio: "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { data: facultyList } = useQuery<Faculty[]>({
    queryKey: ["/api/faculty"],
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => apiRequest("POST", "/api/faculty", data),
    onSuccess: () => {
      toast({ title: "Success", description: "Faculty member added successfully" });
      setFormData({ name: "", qualification: "", experience: "", subject: "", bio: "" });
      setPhotoFile(null);
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

    createMutation.mutate({ ...formData, photo: photoBase64 || undefined });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Faculty Member
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

            <Button type="submit" disabled={createMutation.isPending} data-testid="button-create-faculty">
              {createMutation.isPending ? "Adding..." : "Add Faculty Member"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Faculty</CardTitle>
        </CardHeader>
        <CardContent>
          {!facultyList || facultyList.length === 0 ? (
            <p className="text-muted-foreground text-center py-8" data-testid="text-no-faculty">
              No faculty members yet
            </p>
          ) : (
            <div className="space-y-3">
              {facultyList.map((faculty) => (
                <div key={faculty.id} className="border rounded-md p-4" data-testid={`faculty-${faculty.id}`}>
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <div>
                      <h4 className="font-semibold">{faculty.name}</h4>
                      <p className="text-sm text-primary">{faculty.subject}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteConfirm(faculty.id)}
                      data-testid={`button-delete-faculty-${faculty.id}`}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{faculty.qualification} | {faculty.experience}</p>
                </div>
              ))}
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
