import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import type { GalleryImage } from "@shared/schema";

export function AdminGallery() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    category: "",
    imageUrl: "",
    caption: "",
  });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState("all");
  const itemsPerPage = 12;

  const { data } = useQuery<{ images: GalleryImage[]; pagination: any }>({
    queryKey: ["/api/gallery?limit=1000"],
  });

  const allImages = (data?.images || []).sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
  const categories = ["all", ...Array.from(new Set(allImages.map((img) => img.category)))];
  
  const filteredImages = filterCategory === "all" 
    ? allImages 
    : allImages.filter((img) => img.category === filterCategory);
  
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const images = filteredImages.slice(startIndex, startIndex + itemsPerPage);

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => 
      editingId 
        ? apiRequest("PATCH", `/api/gallery/${editingId}`, data)
        : apiRequest("POST", "/api/gallery", data),
    onSuccess: () => {
      toast({ title: "Success", description: editingId ? "Image updated successfully" : "Image added to gallery" });
      setFormData({ category: "", imageUrl: "", caption: "" });
      setEditingId(null);
      setCurrentPage(1);
      queryClient.invalidateQueries({ queryKey: ["/api/gallery?limit=1000"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/gallery/${id}`, {}),
    onSuccess: () => {
      toast({ title: "Success", description: "Image removed from gallery" });
      setDeleteConfirm(null);
      queryClient.invalidateQueries({ queryKey: ["/api/gallery?limit=1000"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.imageUrl) {
      toast({ title: "Error", description: "Please fill required fields", variant: "destructive" });
      return;
    }
    createMutation.mutate(formData);
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingId(image.id);
    setFormData({
      category: image.category,
      imageUrl: image.imageUrl,
      caption: image.caption || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ category: "", imageUrl: "", caption: "" });
  };

  const handleCategoryChange = (category: string) => {
    setFilterCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {editingId ? (
              <>
                <Edit2 className="w-5 h-5" />
                Edit Gallery Image
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Add Image to Gallery
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gal-category">Category *</Label>
              <Input
                id="gal-category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Events, Sports, Academics"
                data-testid="input-gallery-category"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gal-url">Image URL *</Label>
              <Input
                id="gal-url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
                data-testid="input-gallery-url"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gal-caption">Caption (Optional)</Label>
              <Input
                id="gal-caption"
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                placeholder="Image description"
                data-testid="input-gallery-caption"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={createMutation.isPending} data-testid="button-create-gallery" className="flex-1">
                {createMutation.isPending ? (editingId ? "Updating..." : "Adding...") : (editingId ? "Update Image" : "Add to Gallery")}
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Gallery Images</CardTitle>
            <div className="w-full sm:w-auto">
              <Select value={filterCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full sm:w-[200px]" data-testid="select-gallery-filter">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} data-testid={`filter-option-${cat}`}>
                      {cat === "all" ? "All Categories" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredImages.length === 0 ? (
            <p className="text-muted-foreground text-center py-8" data-testid="text-no-gallery-images">
              {filterCategory === "all" ? "No images in gallery yet" : `No images in "${filterCategory}" category`}
            </p>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((image) => (
                  <Card key={image.id} className="overflow-hidden hover-elevate flex flex-col" data-testid={`gallery-image-${image.id}`}>
                    <div className="h-48 overflow-hidden bg-muted">
                      <img
                        src={image.imageUrl}
                        alt={image.caption || "Gallery image"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="text-xs font-medium text-primary mb-1">{image.category}</div>
                          {image.caption && (
                            <CardTitle className="text-sm line-clamp-2">{image.caption}</CardTitle>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <div className="flex gap-2 px-6 pb-4 border-t pt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(image)}
                        className="flex-1"
                        data-testid={`button-edit-gallery-${image.id}`}
                      >
                        <Edit2 className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteConfirm(image.id)}
                        className="flex-1"
                        data-testid={`button-delete-gallery-${image.id}`}
                      >
                        <Trash2 className="w-3 h-3 mr-1 text-destructive" />
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredImages.length > itemsPerPage && (
                <div className="flex items-center justify-between pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages} ({filteredImages.length} total)
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
            Are you sure you want to delete this image? This action cannot be undone.
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
