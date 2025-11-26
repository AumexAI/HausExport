"use client";

import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

type SupabaseGalleryProps = {
  title?: string;
  description?: string;
  bucket: string;
  path?: string;
  onlyNames?: string[];
};

// Insert helpers to derive brand and tagline from filename
const getBrandFromName = (name: string) => {
  // Remove anything after "LineUP" and file extension
  return name
    .replace(/\s*LineUP.*$/i, "")
    .replace(/\.(png|jpg|jpeg|webp|gif)$/i, "")
    .trim();
};

const brandTaglines: Record<string, string> = {
  BMW: "Precision engineering meets elite comfort.",
  "Mercedes-Benz": "Timeless elegance with cutting-edge innovation.",
  "Range Rover": "Refined capability for the most exclusive journeys.",
};

const defaultTagline = "Luxury redefined in every detail.";

// Insert helper to tweak object-position per brand
const getObjectPositionClass = (brand: string) =>
  brand === "Range Rover" ? "object-[center_75%]" : "object-center";

const SupabaseGallery: React.FC<SupabaseGalleryProps> = ({ title = "Vehicles", description, bucket, path = "", onlyNames = [] }) => {
  const [images, setImages] = React.useState<{ name: string; url: string; brand: string; tagline: string }[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  const fetchImages = React.useCallback(async () => {
    setLoaded(false);
    const prefix = path ? path.replace(/^\/|\/$/g, "") : "";

    // If a list of names is provided, fetch only those
    if (onlyNames && onlyNames.length > 0) {
      const urls = onlyNames.map((name) => {
        const objectPath = prefix ? `${prefix}/${name}` : name;
        const { data } = supabase.storage.from(bucket).getPublicUrl(objectPath);
        const brand = getBrandFromName(name);
        const tagline = brandTaglines[brand] ?? defaultTagline;
        return { name, url: data.publicUrl, brand, tagline };
      });
      setImages(urls);
      setLoaded(true);
      return;
    }

    // Otherwise, list all images in the bucket/path
    const { data, error } = await supabase.storage.from(bucket).list(prefix || "", { limit: 1000 });
    if (error) {
      toast({
        title: "Could not load photos",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    const files = (data ?? []).filter((file) => /\.(png|jpg|jpeg|webp|gif)$/i.test(file.name));
    const urls = files.map((file) => {
      const objectPath = prefix ? `${prefix}/${file.name}` : file.name;
      const { data } = supabase.storage.from(bucket).getPublicUrl(objectPath);
      const brand = getBrandFromName(file.name);
      const tagline = brandTaglines[brand] ?? defaultTagline;
      return { name: file.name, url: data.publicUrl, brand, tagline };
    });

    setImages(urls);
    setLoaded(true);
  }, [bucket, path, onlyNames]);

  React.useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <section id="vehicles" className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        {description ? <p className="mt-3 text-muted-foreground">{description}</p> : null}
        <div className="mt-4 flex justify-center">
          <Button variant="outline" size="sm" onClick={fetchImages}>
            Refresh photos
          </Button>
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-4xl">
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((img, idx) => (
              <CarouselItem key={`${img.name}-${idx}`}>
                <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
                  <div className="relative">
                    <img
                      src={img.url}
                      alt={`${img.brand} lineup`}
                      loading="lazy"
                      className={cn(
                        "h-[360px] w-full object-cover md:h-[420px]",
                        getObjectPositionClass(img.brand)
                      )}
                      onError={() =>
                        toast({
                          title: "Image failed to load",
                          description: img.name,
                        })
                      }
                      onLoad={() => {
                        if (idx === images.length - 1 && loaded) {
                          // last image loaded
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-semibold">{img.brand}</h3>
                      <p className="text-sm opacity-80">{img.tagline}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-6" />
          <CarouselNext className="-right-6" />
        </Carousel>
      </div>
    </section>
  );
};

export default SupabaseGallery;