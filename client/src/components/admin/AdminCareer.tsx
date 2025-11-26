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
import { Plus, Trash2, Briefcase } from "lucide-react";
import type { Career } from "@shared/schema";

export function AdminCareer() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    qualifications: "",
    experience: "",
  });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { data: careersData } = useQuery<Career[]>({
    queryKey: ["/api/careers"],
  });

  const careers = careersData?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => apiRequest("POST", "/api/careers", data),
    onSuccess: () => {
      toast({ title: "Success", description: "Career opening added successfully" });
      setFormData({ title: "", description: "", qualifications: "", experience: "" });
      queryClient.invalidateQueries({ queryKey: ["/api/careers"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/careers/${id}`, {}),
    onSuccess: () => {
      toast({ title: "Success", description: "Career opening removed successfully" });
      setDeleteConfirm(null);
      queryClient.invalidateQueries({ queryKey: ["/api/careers"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast({ title: "Error", description: "Please fill required fields", variant: "destructive" });
      return;
    }
    createMutation.mutate(formData);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Job Opening
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="career-title">Job Title *</Label>
              <Input
                id="career-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Mathematics Teacher"
                data-testid="input-career-title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="career-desc">Description *</Label>
              <Textarea
                id="career-desc"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Job description and responsibilities"
                rows={3}
                data-testid="textarea-career-description"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="career-qual">Qualifications</Label>
              <Input
                id="career-qual"
                value={formData.qualifications}
                onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                placeholder="e.g., B.Ed, M.Sc"
                data-testid="input-career-qualifications"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="career-exp">Experience Required</Label>
              <Input
                id="career-exp"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="e.g., 2+ years"
                data-testid="input-career-experience"
              />
            </div>

            <Button type="submit" disabled={createMutation.isPending} data-testid="button-create-career">
              {createMutation.isPending ? "Adding..." : "Add Opening"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Current Openings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!careers || careers.length === 0 ? (
            <p className="text-muted-foreground text-center py-8" data-testid="text-no-careers">
              No job openings yet
            </p>
          ) : (
            <div className="space-y-3">
              {careers.map((career) => (
                <div key={career.id} className="border rounded-md p-4" data-testid={`career-${career.id}`}>
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h4 className="font-semibold">{career.title}</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteConfirm(career.id)}
                      data-testid={`button-delete-career-${career.id}`}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{career.description}</p>
                  {career.qualifications && (
                    <p className="text-xs text-muted-foreground mb-1">
                      <span className="font-medium">Qualifications:</span> {career.qualifications}
                    </p>
                  )}
                  {career.experience && (
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Experience:</span> {career.experience}
                    </p>
                  )}
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
            Are you sure you want to delete this career opening? This action cannot be undone.
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
