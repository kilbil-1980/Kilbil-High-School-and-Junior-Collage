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
import { Plus, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Facility } from "@shared/schema";

export function AdminFacilities() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data: allFacilities = [] } = useQuery<Facility[]>({
    queryKey: ["/api/facilities"],
  });

  const totalPages = Math.ceil(allFacilities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const facilities = allFacilities.slice(startIndex, startIndex + itemsPerPage);

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => apiRequest("POST", "/api/facilities", data),
    onSuccess: () => {
      toast({ title: "Success", description: "Facility added successfully" });
      setFormData({ name: "", description: "", imageUrl: "" });
      queryClient.invalidateQueries({ queryKey: ["/api/facilities"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/facilities/${id}`, {}),
    onSuccess: () => {
      toast({ title: "Success", description: "Facility removed successfully" });
      setDeleteConfirm(null);
      queryClient.invalidateQueries({ queryKey: ["/api/facilities"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description) {
      toast({ title: "Error", description: "Please fill required fields", variant: "destructive" });
      return;
    }
    createMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Facility
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
                placeholder="e.g., Science Laboratory"
                data-testid="input-facility-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fac-desc">Description *</Label>
              <Textarea
                id="fac-desc"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the facility"
                rows={3}
                data-testid="textarea-facility-description"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fac-image">Image URL (Optional)</Label>
              <Input
                id="fac-image"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
                data-testid="input-facility-image"
              />
            </div>

            <Button type="submit" disabled={createMutation.isPending} data-testid="button-create-facility">
              {createMutation.isPending ? "Adding..." : "Add Facility"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Facilities</CardTitle>
        </CardHeader>
        <CardContent>
          {allFacilities.length === 0 ? (
            <p className="text-muted-foreground text-center py-8" data-testid="text-no-facilities">
              No facilities added yet
            </p>
          ) : (
            <div className="space-y-4">
              <div className="space-y-3">
                {facilities.map((facility) => (
                  <div key={facility.id} className="border rounded-md p-4" data-testid={`facility-${facility.id}`}>
                    <div className="flex justify-between items-start gap-3 mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold">{facility.name}</h4>
                        {facility.imageUrl && (
                          <img
                            src={facility.imageUrl}
                            alt={facility.name}
                            className="w-full h-32 object-cover rounded-md mt-2"
                          />
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteConfirm(facility.id)}
                        data-testid={`button-delete-facility-${facility.id}`}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{facility.description}</p>
                  </div>
                ))}
              </div>

              {allFacilities.length > itemsPerPage && (
                <div className="flex items-center justify-between pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages} ({allFacilities.length} total)
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
            Are you sure you want to delete this facility? This action cannot be undone.
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
