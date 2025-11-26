"use client";

import { Phone, Mail, MapPin, Instagram, Ghost } from "lucide-react";

const SiteFooter = () => {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">Haus Export</h3>
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
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                <a
                  href="https://www.instagram.com/HausExport"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                  aria-label="Visit our Instagram"
                >
                  Instagram @HausExport
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Ghost className="h-4 w-4" />
                <a
                  href="https://www.snapchat.com/add/HausExport"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                  aria-label="Add us on Snapchat"
                >
                  Snapchat @HausExport
                </a>
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
          © {new Date().getFullYear()} Haus Export. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;