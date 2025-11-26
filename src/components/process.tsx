"use client";

import { Separator } from "@/components/ui/separator";
import { CheckCircle2, FileCheck, Plane, Ship, PackageCheck } from "lucide-react";
import React from "react";

const steps = [
  {
    icon: FileCheck,
    title: "Consult & Documentation",
    desc: "We assess requirements and prepare compliant export paperwork.",
  },
  {
    icon: PackageCheck,
    title: "Secure Handling",
    desc: "White-glove packaging, inspection, and insured preparation.",
  },
  {
    icon: Ship,
    title: "Freight Coordination",
    desc: "Sea and air freight tailored to timeline and budget.",
  },
  {
    icon: Plane,
    title: "Delivery & Clearance",
    desc: "Destination customs, clearance, and final handover.",
  },
];

const Process = () => {
  return (
    <section id="process" className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight">Our Process</h2>
        <p className="mt-3 text-muted-foreground">
          Precision at every step to ensure a seamless export experience.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-6xl space-y-8 md:flex md:items-start md:justify-between md:gap-6 md:space-y-0">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <React.Fragment key={s.title}>
              <div className="flex flex-col items-center text-center md:flex-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="mt-3">
                  <h3 className="text-base md:text-lg font-semibold whitespace-nowrap leading-none">
                    {s.title}
                  </h3>
                  {i === steps.length - 1 && (
                    <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-600 ring-1 ring-emerald-500/20">
                      <CheckCircle2 className="h-3 w-3" />
                      Seamless
                    </span>
                  )}
                </div>
                <p className="mt-1 max-w-[48ch] text-sm text-muted-foreground">
                  {s.desc}
                </p>
                {/* Mobile horizontal separator between stacked items */}
                {i < steps.length - 1 && <Separator className="mx-auto my-6 w-16 md:hidden" />}
              </div>
              {/* Desktop vertical separator between inline items */}
              {i < steps.length - 1 && (
                <Separator orientation="vertical" className="hidden md:block mx-4 h-16" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default Process;