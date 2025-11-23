"use client";

import { Button } from "@/components/ui/button";
import { Car, Ship, Globe } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-gradient-to-b from-black via-neutral-900 to-background"
      id="home"
    >
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_50%)]" />
      </div>

      <div className="container px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-4 py-2 text-xs text-foreground/80 backdrop-blur">
            <Globe className="h-3.5 w-3.5" />
            Global Vehicle & Goods Export Specialists
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Haus Export
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            We orchestrate the seamless export of premium vehicles and goods worldwide,
            combining precision logistics with white-glove service.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild>
              <a href="#vehicles">
                <Car className="mr-2 h-4 w-4" />
                Explore Vehicles
              </a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="#contact">
                <Ship className="mr-2 h-4 w-4" />
                Request a Quote
              </a>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs text-foreground/60">
            <div className="flex items-center gap-2">
              <Ship className="h-3.5 w-3.5" />
              Maritime & Air Freight
            </div>
            <div className="flex items-center gap-2">
              <Car className="h-3.5 w-3.5" />
              Luxury & Performance Vehicles
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-3.5 w-3.5" />
              50+ Destinations
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;