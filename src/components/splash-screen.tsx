import React from "react";
import { Ship } from "lucide-react";
import { cn } from "@/lib/utils";

type SplashScreenProps = {
  onDone?: () => void;
  durationMs?: number;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onDone, durationMs = 2000 }) => {
  React.useEffect(() => {
    const t = setTimeout(() => onDone?.(), durationMs);
    return () => clearTimeout(t);
  }, [onDone, durationMs]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background text-foreground"
    >
      <div className="flex flex-col items-center gap-6 px-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-center">
          Exportieren Haus
        </h1>

        <div className="relative w-[80vw] max-w-3xl h-16 overflow-visible">
          <div className="absolute inset-x-0 bottom-2 h-[2px] bg-muted" />
          <Ship
            aria-hidden="true"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 h-10 w-10 text-primary animate-ship-sail"
            )}
            style={{ ["--sail-duration" as any]: `${durationMs}ms` }}
          />
        </div>

        <p className="text-sm text-muted-foreground">Lädt...</p>
      </div>
    </div>
  );
};

export default SplashScreen;