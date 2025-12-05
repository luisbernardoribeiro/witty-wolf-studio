"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
        transition: isHovering ? "transform 0.2s" : "none",
      }}
    >
      {/* Wolf Icon SVG - Creative Custom Cursor */}
      <svg
        width={isHovering ? 28 : 24}
        height={isHovering ? 28 : 24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all"
      >
        {/* Wolf Head */}
        <g className={isHovering ? "animate-pulse" : ""}>
          {/* Left Ear */}
          <path
            d="M6 4L4 2L5 8"
            stroke="url(#wolfGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Right Ear */}
          <path
            d="M18 4L20 2L19 8"
            stroke="url(#wolfGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Head Circle */}
          <circle
            cx="12"
            cy="12"
            r="8"
            stroke="url(#wolfGradient)"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Left Eye */}
          <circle
            cx="9"
            cy="11"
            r="1.5"
            fill="url(#wolfGradient)"
          />
          {/* Right Eye */}
          <circle
            cx="15"
            cy="11"
            r="1.5"
            fill="url(#wolfGradient)"
          />
          {/* Snout */}
          <path
            d="M12 14L10 16L14 16"
            stroke="url(#wolfGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Point/Arrow */}
          <path
            d="M12 18L11 22L12 20L13 22Z"
            fill="url(#wolfGradient)"
          />
        </g>

        <defs>
          <linearGradient id="wolfGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f2709c" />
            <stop offset="100%" stopColor="#4facfe" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
