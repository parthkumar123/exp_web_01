"use client";

import { useEffect, useState } from "react";

export const usePerformanceMonitor = () => {
  const [fps, setFps] = useState(60);
  const [performance, setPerformance] = useState<"high" | "medium" | "low">(
    "high"
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    let frameCount = 0;
    let lastTime = window.performance.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = window.performance.now();

      if (currentTime >= lastTime + 1000) {
        const currentFPS = Math.round(
          (frameCount * 1000) / (currentTime - lastTime)
        );
        setFps(currentFPS);

        // Adaptive performance classification
        if (currentFPS >= 55) {
          setPerformance("high");
        } else if (currentFPS >= 30) {
          setPerformance("medium");
        } else {
          setPerformance("low");
        }

        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFPS);
    };

    const animationId = requestAnimationFrame(measureFPS);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return { fps, performance };
};

export default function PerformanceMonitor() {
  const { fps, performance } = usePerformanceMonitor();

  return (
    <div className="fixed bottom-4 right-4 z-50 px-4 py-2 backdrop-blur-xl bg-black/30 border border-white/10 rounded-full text-xs font-mono pointer-events-none">
      <div className="flex items-center gap-3">
        <span className="text-white/50">FPS:</span>
        <span
          className={`font-semibold ${
            fps >= 55
              ? "text-emerald-400"
              : fps >= 30
              ? "text-yellow-400"
              : "text-red-400"
          }`}
        >
          {fps}
        </span>
        <div
          className={`w-2 h-2 rounded-full ${
            performance === "high"
              ? "bg-emerald-400"
              : performance === "medium"
              ? "bg-yellow-400"
              : "bg-red-400"
          }`}
        />
      </div>
    </div>
  );
}
