import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import type { GalleryImage } from "@shared/schema";

export function AdminGallery() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    category: "",
    imageUrl: "",
    caption: "",
  });

  const { data: images } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => apiRequest("POST", "/api/gallery", data),
    onSuccess: () => {
      toast({ title: "Success", description: "Image added to gallery" });
      setFormData({ category: "", imageUrl: "", caption: "" });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/gallery/${id}`, {}),
    onSuccess: () => {
      toast({ title: "Success", description: "Image removed from gallery" });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Image to Gallery
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

            <Button type="submit" disabled={createMutation.isPending} data-testid="button-create-gallery">
              {createMutation.isPending ? "Adding..." : "Add to Gallery"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gallery Images</CardTitle>
        </CardHeader>
        <CardContent>
          {!images || images.length === 0 ? (
            <p className="text-muted-foreground text-center py-8" data-testid="text-no-gallery-images">
              No images in gallery yet
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {images.map((image) => (
                <div key={image.id} className="relative group" data-testid={`gallery-image-${image.id}`}>
                  <div className="aspect-square rounded-md overflow-hidden bg-muted">
                    <img
                      src={image.imageUrl}
                      alt={image.caption || "Gallery image"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => deleteMutation.mutate(image.id)}
                    data-testid={`button-delete-gallery-${image.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  {image.caption && (
                    <p className="text-xs text-muted-foreground mt-1 truncate">{image.caption}</p>
                  )}
                  <p className="text-xs text-primary mt-1">{image.category}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
