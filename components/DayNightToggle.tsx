"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import gsap from "gsap";

// Lighting presets
const LIGHTING_MODES = {
  sunrise: {
    ambient: { color: "#fef3c7", intensity: 0.6 },
    directional: { color: "#fbbf24", intensity: 1.4 },
    fill: { color: "#f59e0b", intensity: 1.0 },
    particles: { color: "#10b981", emissive: "#fbbf24" },
    background: "from-amber-950/30 via-emerald-950/20 to-zinc-950",
  },
  emerald: {
    ambient: { color: "#f8fffe", intensity: 0.4 },
    directional: { color: "#ffffff", intensity: 1.2 },
    fill: { color: "#0a4d3c", intensity: 0.8 },
    particles: { color: "#10b981", emissive: "#059669" },
    background: "from-zinc-950 via-emerald-950/20 to-zinc-950",
  },
};

type Mode = "sunrise" | "emerald";

interface DayNightContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  currentLighting: typeof LIGHTING_MODES.emerald;
}

const DayNightContext = createContext<DayNightContextType | undefined>(
  undefined
);

export function DayNightProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("emerald");

  const value = {
    mode,
    setMode,
    currentLighting: LIGHTING_MODES[mode],
  };

  return (
    <DayNightContext.Provider value={value}>
      {children}
    </DayNightContext.Provider>
  );
}

export function useDayNightMode() {
  const context = useContext(DayNightContext);
  if (!context) {
    throw new Error("useDayNightMode must be used within DayNightProvider");
  }
  return context;
}

interface DayNightToggleProps {
  onModeChange?: (mode: Mode) => void;
}

export function DayNightToggle({ onModeChange }: DayNightToggleProps = {}) {
  const [mode, setMode] = useState<"sunrise" | "emerald">("emerald");

  const toggleMode = () => {
    const newMode = mode === "emerald" ? "sunrise" : "emerald";
    setMode(newMode);
    if (onModeChange) onModeChange(newMode);
  };

  useEffect(() => {
    // Animate background transition
    const root = document.documentElement;
    gsap.to(root, {
      duration: 1.5,
      ease: "power2.inOut",
    });
  }, [mode]);

  return (
    <button
      onClick={toggleMode}
      className="group"
      aria-label="Toggle lighting mode"
    >
      <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-full p-4 hover:bg-white/10 transition-all duration-300">
        {/* Icon */}
        <div className="relative w-6 h-6">
          {mode === "emerald" ? (
            // Moon/Night icon
            <svg
              className="w-6 h-6 text-emerald-300 transition-transform group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          ) : (
            // Sun/Day icon
            <svg
              className="w-6 h-6 text-amber-400 transition-transform group-hover:scale-110 group-hover:rotate-90"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12,17.5A5.5,5.5,0,1,1,17.5,12,5.51,5.51,0,0,1,12,17.5ZM12,8.5A3.5,3.5,0,1,0,15.5,12,3.5,3.5,0,0,0,12,8.5Z" />
              <path d="M12,6a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V5A1,1,0,0,0,12,6Z" />
              <path d="M12,24a1,1,0,0,0,1-1V21a1,1,0,0,0-2,0v2A1,1,0,0,0,12,24Z" />
              <path d="M6,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H5A1,1,0,0,0,6,12Z" />
              <path d="M24,11H22a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z" />
              <path d="M7.34,6.05,5.93,4.64A1,1,0,0,0,4.51,6.05L5.93,7.46A1,1,0,0,0,7.34,6.05Z" />
              <path d="M18.07,17.95l1.41,1.41a1,1,0,0,0,1.42-1.41l-1.41-1.41A1,1,0,0,0,18.07,17.95Z" />
              <path d="M18.07,6.05a1,1,0,0,0,1.42,0l1.41-1.41a1,1,0,1,0-1.42-1.41l-1.41,1.41A1,1,0,0,0,18.07,6.05Z" />
              <path d="M5.93,17.95,4.51,19.36a1,1,0,0,0,1.42,1.41l1.41-1.41A1,1,0,0,0,5.93,17.95Z" />
            </svg>
          )}
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 whitespace-nowrap">
            <span className="text-xs text-white/80">
              {mode === "emerald" ? "Sunrise Green" : "Tech Emerald"}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
