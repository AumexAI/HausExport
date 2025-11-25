"use client";

import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

type Photo = {
  url: string;
  name: string;
};

type Props = {
  bucketName?: string;
  path?: string;
  title?: string;
  description?: string;
};

const SupabaseGallery: React.FC<Props> = ({
  bucketName = "gallery",
  path = "",
  title = "Photos",
  description = "Loaded directly from Supabase Storage.",
}) => {
  const { toast } = useToast();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const loadPhotos = async () => {
      setLoading(true);

      const { data, error } = await supabase.storage
        .from(bucketName)
        .list(path, {
          limit: 100,
          sortBy: { column: "name", order: "asc" },
        });

      if (error) {
        toast({
          title: "Failed to load photos",
          description: error.message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const files = (data || []).filter((f) =>
        f.name.toLowerCase().match(/\.(jpg|jpeg)$/)
      );

      const items: Photo[] = files.map((f) => {
        const { data: pub } = supabase.storage
          .from(bucketName)
          .getPublicUrl(path ? `${path}/${f.name}` : f.name);
        return { url: pub.publicUrl, name: f.name };
      });

      if (!isMounted) return;

      setPhotos(items);
      setLoading(false);

      toast({
        title: "Gallery loaded",
        description: `Loaded ${items.length} ${items.length === 1 ? "photo" : "photos"}.`,
      });
    };

    loadPhotos();

    return () => {
      isMounted = false;
    };
  }, [bucketName, path, toast]);

  return (
    <section id="gallery" className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-3 text-muted-foreground">{description}</p>
      </div>

      {loading ? (
        <div className="mx-auto mt-10 max-w-4xl">
          <div className="h-[360px] w-full animate-pulse rounded-lg border bg-muted md:h-[420px]" />
        </div>
      ) : photos.length === 0 ? (
        <div className="mx-auto mt-10 max-w-4xl text-center text-muted-foreground">
          No JPG files found in bucket “{bucketName}”.
        </div>
      ) : (
        <div className="relative mx-auto mt-10 max-w-4xl">
          <Carousel className="w-full">
            <CarouselContent>
              {photos.map((p, idx) => (
                <CarouselItem key={`${p.name}-${idx}`}>
                  <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
                    <div className="relative">
                      <img
                        src={p.url}
                        alt={p.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="h-[360px] w-full object-cover md:h-[420px]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-semibold">
                          {p.name.replace(/\.(jpg|jpeg)$/i, "")}
                        </h3>
                        <p className="text-sm opacity-80">Supabase Storage</p>
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
      )}

      <Toaster />
    </section>
  );
};

export default SupabaseGallery;