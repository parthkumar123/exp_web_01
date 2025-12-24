"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Hide default cursor
    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.innerHTML = "* { cursor: none !important; }";
    style.setAttribute("data-custom-cursor", "true");
    document.head.appendChild(style);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add hover listeners to interactive elements
    const addListeners = () => {
      const interactiveElements = document.querySelectorAll("button, a");
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
      return interactiveElements;
    };

    const interactiveElements = addListeners();
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.body.style.cursor = "";
      // Safely remove style element if it exists
      const existingStyle = document.querySelector('[data-custom-cursor="true"]');
      if (existingStyle && existingStyle.parentNode) {
        existingStyle.parentNode.removeChild(existingStyle);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Custom cursor */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Outer ring */}
        <div
          className={`absolute inset-0 rounded-full border-2 border-white transition-all duration-300 ${
            isHovering ? "w-16 h-16 -m-8" : "w-10 h-10 -m-5"
          }`}
          style={{
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
          }}
        />

        {/* Inner dot */}
        <div className="w-1 h-1 bg-white rounded-full" />

        {/* Glow effect */}
        <div
          className="absolute inset-0 w-20 h-20 -m-10 rounded-full bg-white/10 blur-xl"
          style={{
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        />
      </div>
    </>
  );
}
