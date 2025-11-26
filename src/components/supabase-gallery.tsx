"use client";

import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { toast } from "@/hooks/use-toast";
import { createClient } from "@supabase/supabase-js";

type SupabaseGalleryProps = {
  title?: string;
  description?: string;
  bucket: string;
  path?: string;
  onlyNames: string[];
};

const supabase = createClient(
  "https://nqygotcdtvfokmgukpnz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xeWdvdGNkdHZmb2ttZ3VrcG56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzQxMzEsImV4cCI6MjA3OTE1MDEzMX0.48PzA7eLoRz3JXvywAKWx87ubHKEHLFLhQDYfWSYMls"
);

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

const SupabaseGallery: React.FC<SupabaseGalleryProps> = ({ title = "Vehicles", description, bucket, path = "", onlyNames }) => {
  const [images, setImages] = React.useState<{ name: string; url: string; brand: string; tagline: string }[]>([]);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const prefix = path ? `${path.replace(/^\/|\/$/g, "")}/` : "";
    const urls = onlyNames.map((name) => {
      const { data } = supabase.storage.from(bucket).getPublicUrl(`${prefix}${name}`);
      const brand = getBrandFromName(name);
      const tagline = brandTaglines[brand] ?? defaultTagline;
      return { name, url: data.publicUrl, brand, tagline };
    });

    setImages(urls);
    setLoaded(true);
    toast({
      title: "Gallery updated",
      description: `Loaded ${urls.length} image${urls.length === 1 ? "" : "s"} from ${bucket}.`,
    });
  }, [bucket, path, onlyNames]);

  return (
    <section id="vehicles" className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        {description ? <p className="mt-3 text-muted-foreground">{description}</p> : null}
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
                      className="h-[360px] w-full object-cover md:h-[420px]"
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