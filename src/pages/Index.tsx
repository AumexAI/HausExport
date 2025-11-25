"use client";

import BrandNavbar from "@/components/brand-navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import GalleryCarousel from "@/components/gallery-carousel";
import Process from "@/components/process";
import ContactForm from "@/components/contact-form";
import SiteFooter from "@/components/site-footer";
import SupabaseGallery from "../components/supabase-gallery";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <BrandNavbar />
      <main className="pt-16">
        <Hero />
        <GalleryCarousel />
        <Services />
        <Process />
        <section id="about" className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">About Haus Export</h2>
            <p className="mt-3 text-muted-foreground">
              We specialize in the export of vehicles and high-value goods, combining discreet
              service, meticulous documentation, and trusted global partnerships.
            </p>
          </div>
        </section>
        <SupabaseGallery title="Vehicles" description="Pulled from Supabase Storage (PNG files)." />
        <ContactForm />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;