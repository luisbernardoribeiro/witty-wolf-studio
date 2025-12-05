"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroBackgroundWithVideo() {
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    // After 10 seconds, switch from video to static image
    const timer = setTimeout(() => {
      setShowVideo(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Video Background (0-10 seconds) */}
      {showVideo && (
        <video
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
          onEnded={() => setShowVideo(false)}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          {/* Fallback to image if video doesn't play */}
          Your browser does not support the video tag.
        </video>
      )}

      {/* Static Image Background (after 10 seconds or if video fails) */}
      {!showVideo && (
        <Image
          src="/wittywolf-bg.jpg"
          alt="Witty Wolf Background"
          fill
          className="object-cover z-0 opacity-80"
          priority
        />
      )}
    </>
  );
}
