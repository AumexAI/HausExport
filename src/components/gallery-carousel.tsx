"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { supabase } from "../integrations/supabase/client";

type Slide = {
  title: string;
  caption: string;
  image: string;
};

const fallbackSlides: Slide[] = [
  {
    title: "Mercedes-Benz",
    caption: "S‑Class, G‑Class, AMG — exported with white‑glove handling.",
    image: "https://source.unsplash.com/1200x800/?mercedes,luxury-car",
  },
  {
    title: "BMW",
    caption: "M‑Series and premium models — precision logistics worldwide.",
    image: "https://source.unsplash.com/1200x800/?bmw,luxury-car",
  },
  {
    title: "Range Rover",
    caption: "SUV excellence — bespoke transport for premium fleets.",
    image: "https://source.unsplash.com/1200x800/?range-rover,luxury-suv",
  },
  {
    title: "Toyota",
    caption: "Land Cruiser & 4Runner — rugged capability, trusted worldwide.",
    image: "/2025-toyota-4runner-vs-toyota-land-cruiser.jpg",
  },
];

function formatTitle(filename: string) {
  const base = filename
    .replace(/\.(jpg|jpeg|png|webp)$/i, "")
    .replace(/[-_]/g, " ");
  return base
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const GalleryCarousel = () => {
  const [slides, setSlides] = useState<Slide[]>(fallbackSlides);

  useEffect(() => {
    const bucket = "gallery"; // Change this if your bucket is named differently
    supabase.storage
      .from(bucket)
      .list("", { limit: 100, sortBy: { column: "name", order: "asc" } })
      .then(({ data, error }) => {
        if (error || !data) {
          console.warn("Supabase storage error:", error?.message ?? "No data");
          return;
        }

        const jpgs = data.filter((item) => /\.(jpg|jpeg)$/i.test(item.name));
        const fetchedSlides: Slide[] = jpgs.map((item) => {
          const { data: pub } = supabase.storage
            .from(bucket)
            .getPublicUrl(item.name);
          return {
            title: formatTitle(item.name),
            caption: "Premium export — curated logistics worldwide.",
            image: pub.publicUrl,
          };
        });

        if (fetchedSlides.length > 0) {
          setSlides(fetchedSlides);
        }
      });
  }, []);

  return (
    <section id="vehicles" className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight">Vehicles</h2>
        <p className="mt-3 text-muted-foreground">
          A curated selection — from luxury SUVs to vintage roadsters.
        </p>
      </div>

      <div className="relative mx-auto mt-10 max-w-4xl">
        <Carousel className="w-full">
          <CarouselContent>
            {slides.map((s, idx) => (
              <CarouselItem key={idx}>
                <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
                  <div className="relative">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-[360px] w-full object-cover md:h-[420px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-semibold">{s.title}</h3>
                      <p className="text-sm opacity-80">{s.caption}</p>
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

export default GalleryCarousel;