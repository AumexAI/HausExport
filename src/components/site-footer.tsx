"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";

const SiteFooter = () => {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">Exportieren Haus</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Premium exports executed with precision and discretion.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> +1 (555) 012-3456
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> ExportierenHaus@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Global Operations
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#vehicles" className="hover:text-foreground">Vehicles</a></li>
              <li><a href="#services" className="hover:text-foreground">Services</a></li>
              <li><a href="#process" className="hover:text-foreground">Process</a></li>
              <li><a href="#contact" className="hover:text-foreground">Get a Quote</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Exportieren Haus. All rights reserved.
        </div>
        <MadeWithDyad />
      </div>
    </footer>
  );
};

export default SiteFooter;