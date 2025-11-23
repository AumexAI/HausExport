import React from "react";
import SplashScreen from "./splash-screen";

type SplashGateProps = {
  children: React.ReactNode;
  durationMs?: number;
};

const SESSION_FLAG = "splash:shown";

const SplashGate: React.FC<SplashGateProps> = ({ children, durationMs = 2000 }) => {
  const [showSplash, setShowSplash] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return !sessionStorage.getItem(SESSION_FLAG);
    } catch {
      return true;
    }
  });

  const handleDone = React.useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_FLAG, "1");
    } catch {
      // ignore storage errors
    }
    setShowSplash(false);
  }, []);

  if (showSplash) {
    return <SplashScreen durationMs={durationMs} onDone={handleDone} />;
  }

  return <>{children}</>;
};

export default SplashGate;