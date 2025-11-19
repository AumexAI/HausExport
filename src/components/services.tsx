"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Truck, Package, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Vehicle Export",
    desc: "Sedans, SUVs, sports cars & classics — handled with utmost care.",
  },
  {
    icon: Truck,
    title: "Heavy Machinery",
    desc: "Construction, agricultural and industrial equipment shipped globally.",
  },
  {
    icon: Package,
    title: "Luxury Goods",
    desc: "Secure export for high-value items, art pieces and collectibles.",
  },
  {
    icon: ShieldCheck,
    title: "Customs & Insurance",
    desc: "Compliance, documentation, bonded logistics and full coverage.",
  },
];

const Services = () => {
  return (
    <section id="services" className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight">Our Services</h2>
        <p className="mt-3 text-muted-foreground">
          Comprehensive export solutions tailored to your cargo and destination.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.title} className="border-border/70 bg-card/70 backdrop-blur">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 ring-1 ring-primary/20">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{s.title}</CardTitle>
                  <CardDescription>{s.desc}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  White-glove handling, end-to-end tracking, and discreet delivery.
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default Services;