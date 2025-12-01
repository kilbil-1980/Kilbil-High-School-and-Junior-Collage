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
import { Plus, Trash2, ChevronLeft, ChevronRight, Edit2, X } from "lucide-react";
import type { Facility } from "@shared/schema";

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

export function AdminFacilities() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const { data: facilitiesData } = useQuery<FacilitiesResponse>({
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
  });

  const facilities = facilitiesData?.facilities || [];
  const pagination = facilitiesData?.pagination;

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => 
      editingId 
        ? apiRequest("PATCH", `/api/facilities/${editingId}`, data)
        : apiRequest("POST", "/api/facilities", data),
    onSuccess: () => {
      toast({ 
        title: "Success", 
        description: editingId ? "Facility updated successfully" : "Facility added successfully" 
      });
      setFormData({ name: "", description: "", imageUrl: "" });
      setEditingId(null);
      setCurrentPage(1);
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

  const handleEdit = (facility: Facility) => {
    setEditingId(facility.id);
    setFormData({
      name: facility.name,
      description: facility.description,
      imageUrl: facility.imageUrl || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", description: "", imageUrl: "" });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {editingId ? (
              <>
                <Edit2 className="w-5 h-5" />
                Edit Facility
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Add Facility
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

            <div className="flex gap-2">
              <Button type="submit" disabled={createMutation.isPending} data-testid="button-create-facility" className="flex-1">
                {createMutation.isPending ? (editingId ? "Updating..." : "Adding...") : (editingId ? "Update Facility" : "Add Facility")}
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
          <CardTitle>Current Facilities</CardTitle>
        </CardHeader>
        <CardContent>
          {allFacilities.length === 0 ? (
            <p className="text-muted-foreground text-center py-8" data-testid="text-no-facilities">
              No facilities added yet
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {facilities.map((facility) => (
                  <Card key={facility.id} className="overflow-hidden hover-elevate flex flex-col" data-testid={`facility-${facility.id}`}>
                    <div className="h-48 overflow-hidden bg-muted">
                      {facility.imageUrl ? (
                        <img
                          src={facility.imageUrl}
                          alt={facility.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base line-clamp-2">{facility.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 pb-3">
                      <p className="text-xs text-muted-foreground line-clamp-3">{facility.description}</p>
                    </CardContent>
                    <div className="flex gap-2 px-6 pb-4 border-t pt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(facility)}
                        className="flex-1"
                        data-testid={`button-edit-facility-${facility.id}`}
                      >
                        <Edit2 className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteConfirm(facility.id)}
                        className="flex-1"
                        data-testid={`button-delete-facility-${facility.id}`}
                      >
                        <Trash2 className="w-3 h-3 mr-1 text-destructive" />
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 pt-4 border-t">
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
