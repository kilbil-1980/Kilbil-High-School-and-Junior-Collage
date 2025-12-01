import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@shared/schema";
import { setSEOMetaTags, pageMetadata } from "@/lib/seo";

interface GalleryResponse {
  images: GalleryImage[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export default function Gallery() {
  useEffect(() => {
    setSEOMetaTags({
      title: pageMetadata.gallery.title,
      description: pageMetadata.gallery.description,
      url: window.location.href
    });
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const ITEMS_PER_PAGE = 30;

  const { data: galleryData, isLoading } = useQuery<GalleryResponse>({
    queryKey: ["/api/gallery", selectedCategory],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: "1",
        limit: String(ITEMS_PER_PAGE),
        ...(selectedCategory !== "all" && { category: selectedCategory }),
      });
      const res = await fetch(`/api/gallery?${params}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch gallery");
      return res.json();
    },
  });

  const { data: allImages } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery/categories"],
    queryFn: async () => {
      const res = await fetch("/api/gallery?limit=1000", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      return data.images || [];
    },
  });

  const categories = ["all"];
  if (allImages && allImages.length > 0) {
    const categorySet = new Set(allImages.map(img => img.category));
    categories.push(...Array.from(categorySet));
  }

  const images = galleryData?.images || [];

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    const index = images.findIndex(img => img.id === image.id);
    setCurrentImageIndex(index);
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setSelectedImage(images[currentImageIndex - 1]);
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setSelectedImage(images[currentImageIndex + 1]);
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-3">Gallery</h1>
            <p className="text-lg text-muted-foreground">Loading wonderful moments...</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-full" />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <Skeleton key={i} className="h-72 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3" data-testid="text-page-title">Gallery</h1>
          <p className="text-lg text-muted-foreground">
            Capturing precious moments and celebrating our vibrant school community
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="rounded-full capitalize"
            >
              {category === "all" ? "All Moments" : category}
            </Button>
          ))}
        </div>

        {!images || images.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground" data-testid="text-no-images">
              No images to display yet. Check back soon for updates!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => handleImageClick(image)}
                data-testid={`card-image-${image.id}`}
              >
                <div className="overflow-hidden h-72">
                  <img
                    src={image.imageUrl}
                    alt={image.caption || "Gallery image"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white w-full">
                    {image.caption && (
                      <h3 className="text-lg font-bold mb-1">{image.caption}</h3>
                    )}
                    <p className="text-sm text-gray-200 capitalize">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black/95 border-0">
          {selectedImage && (
            <div className="relative flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white/30 rounded-full"
                onClick={() => setSelectedImage(null)}
                data-testid="button-close-lightbox"
              >
                <X className="w-5 h-5 text-white" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-white/20 hover:bg-white/30 rounded-full disabled:opacity-50"
                onClick={handlePrevImage}
                disabled={currentImageIndex === 0}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </Button>

              <div className="flex flex-col items-center">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.caption || "Gallery image"}
                  className="max-w-3xl max-h-[75vh] object-contain rounded-lg"
                />
                {selectedImage.caption && (
                  <p className="text-white text-center mt-4 text-sm max-w-2xl">{selectedImage.caption}</p>
                )}
                <p className="text-white/60 text-xs mt-2">
                  {currentImageIndex + 1} of {images.length}
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-white/20 hover:bg-white/30 rounded-full disabled:opacity-50"
                onClick={handleNextImage}
                disabled={currentImageIndex === images.length - 1}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
