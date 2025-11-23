"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
  >
    {children}
  </a>
);

const BrandNavbar = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="/" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-primary/10 ring-1 ring-primary/20" />
          <span className="text-lg font-semibold tracking-tight">Haus Export</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="#vehicles">Vehicles</NavLink>
          <NavLink href="#services">Services</NavLink>
          <NavLink href="#process">Process</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" asChild>
            <a href="#vehicles">Explore Vehicles</a>
          </Button>
          <Button asChild>
            <a href="#contact">Get a Quote</a>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="mt-6 flex flex-col gap-4">
                <a onClick={() => setOpen(false)} href="#vehicles" className="text-base font-medium">
                  Vehicles
                </a>
                <a onClick={() => setOpen(false)} href="#services" className="text-base font-medium">
                  Services
                </a>
                <a onClick={() => setOpen(false)} href="#process" className="text-base font-medium">
                  Process
                </a>
                <a onClick={() => setOpen(false)} href="#about" className="text-base font-medium">
                  About
                </a>
                <a onClick={() => setOpen(false)} href="#contact" className="text-base font-medium">
                  Contact
                </a>
                <div className="pt-2">
                  <Button className="w-full" asChild>
                    <a href="#contact">Get a Quote</a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default BrandNavbar;