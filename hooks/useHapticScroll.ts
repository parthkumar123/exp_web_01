"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HapticScrollConfig {
  smoothness?: number; // 0-2, higher = more inertia
  effects?: boolean; // Enable parallax effects
  snapToSections?: boolean; // Snap to key data points
}

export const useHapticScroll = (config: HapticScrollConfig = {}) => {
  const { snapToSections = true } = config;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !mounted) return;

    // Snap to key data points if enabled
    if (snapToSections) {
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        snap: {
          snapTo: 1 / 4, // Snap to quarters (4 frames)
          duration: { min: 0.3, max: 0.8 }, // Variable snap duration
          delay: 0.1,
          ease: "power1.inOut",
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [snapToSections, mounted]);
};
