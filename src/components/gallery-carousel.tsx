"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    title: "Mercedes-Benz",
    caption: "S‑Class, G‑Class, AMG — exported with white‑glove handling.",
    image: "https://source.unsplash.com/1200x800/?mercedes,luxury-car"
  },
  {
    title: "BMW",
    caption: "M‑Series and premium models — precision logistics worldwide.",
    image: "https://source.unsplash.com/1200x800/?bmw,luxury-car"
  },
  {
    title: "Range Rover",
    caption: "SUV excellence — bespoke transport for premium fleets.",
    image: "https://source.unsplash.com/1200x800/?range-rover,luxury-suv"
  },
  {
    title: "Toyota",
    caption: "Reliable and versatile — from Land Cruisers to hybrids.",
    image: "https://source.unsplash.com/1200x800/?toyota,vehicle"
  },
];

const GalleryCarousel = () => {
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