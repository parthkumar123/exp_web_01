"use client";

export default function VideoBackground() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Optional overlay to darken/tint the video */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
