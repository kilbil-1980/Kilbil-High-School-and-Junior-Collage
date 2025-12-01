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

interface ImageDimensions {
  [key: string]: { width: number; height: number };
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
  const [currentPage, setCurrentPage] = useState(1);
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions>({});
  const ITEMS_PER_PAGE = 30;

  const { data: galleryData, isLoading } = useQuery<GalleryResponse>({
    queryKey: ["/api/gallery", currentPage, selectedCategory],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(currentPage),
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
  const pagination = galleryData?.pagination;

  // Load image dimensions
  useEffect(() => {
    const loadImageDimensions = async () => {
      const dims: ImageDimensions = {};
      for (const image of images) {
        if (!imageDimensions[image.id]) {
          const img = new Image();
          img.onload = () => {
            setImageDimensions(prev => ({
              ...prev,
              [image.id]: { width: img.width, height: img.height }
            }));
          };
          img.src = image.imageUrl;
        }
      }
    };
    loadImageDimensions();
  }, [images, imageDimensions]);

  // Determine grid size based on aspect ratio
  const getGridSize = (imageId: string): { cols: number; rows: number } => {
    const dims = imageDimensions[imageId];
    if (!dims) {
      // Default while loading
      return { cols: 1, rows: 1 };
    }

    const aspectRatio = dims.width / dims.height;

    // Wide landscape (>1.5)
    if (aspectRatio > 1.5) {
      return { cols: 2, rows: 1 };
    }
    // Landscape (1.2 - 1.5)
    if (aspectRatio > 1.2) {
      return { cols: 2, rows: 1 };
    }
    // Square-ish (0.85 - 1.2)
    if (aspectRatio >= 0.85) {
      return { cols: 1, rows: 1 };
    }
    // Tall portrait
    return { cols: 1, rows: 2 };
  };

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
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-3">Gallery</h1>
            <p className="text-lg text-muted-foreground">Loading wonderful moments...</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <Skeleton key={i} className="break-inside-avoid w-full h-64 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3" data-testid="text-page-title">School Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Capturing precious moments and celebrating our vibrant school community
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
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
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px] mb-8">
              {images.map((image) => {
                const size = getGridSize(image.id);
                return (
                  <div
                    key={image.id}
                    className={`group cursor-pointer col-span-${size.cols} row-span-${size.rows} sm:col-span-${size.cols}`}
                    onClick={() => handleImageClick(image)}
                    data-testid={`card-image-${image.id}`}
                    style={{
                      gridColumn: `span ${Math.min(size.cols, 2)}`,
                      gridRow: `span ${Math.min(size.rows, 2)}`,
                    }}
                  >
                    <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                      <div className="bg-gradient-to-br from-primary/10 to-accent/10 absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <img
                        src={image.imageUrl}
                        alt={image.caption || "Gallery image"}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      {image.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-sm font-medium line-clamp-2">{image.caption}</p>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-primary/80 backdrop-blur-sm px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-xs font-semibold">{image.category}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-12">
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
                  {Array.from({ length: Math.min(5, pagination.totalPages) }).map((_, i) => {
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
                  {pagination.totalPages > 5 && (
                    <span className="text-muted-foreground">...</span>
                  )}
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
    </div>
  );
}
