"use client";

import { useEffect, useRef } from "react";

export default function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    let animationFrameId: number;
    let time = 0;

    const drawLiquid = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Clear with dark background
      ctx.fillStyle = "#050711";
      ctx.fillRect(0, 0, width, height);

      // Draw multiple liquid layers
      const layers = 4;
      for (let layer = 0; layer < layers; layer++) {
        ctx.beginPath();
        
        const amplitude = 60 + layer * 20;
        const frequency = 0.003 - layer * 0.0005;
        const speed = 0.3 + layer * 0.15;
        const yOffset = height / 2 + layer * 50;

        for (let x = 0; x < width; x += 2) {
          const y =
            yOffset +
            Math.sin(x * frequency + time * speed) * amplitude +
            Math.sin(x * frequency * 2 + time * speed * 0.7) * (amplitude / 3) +
            Math.cos(x * frequency * 0.5 + time * speed * 1.3) * (amplitude / 4);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        // Gradient for each layer
        const liquidGradient = ctx.createLinearGradient(0, yOffset - amplitude * 2, 0, height);
        const alpha = 0.02 + layer * 0.015;
        
        if (layer % 3 === 0) {
          liquidGradient.addColorStop(0, `rgba(99, 102, 241, ${alpha})`);
          liquidGradient.addColorStop(1, `rgba(139, 92, 246, ${alpha * 1.5})`);
        } else if (layer % 3 === 1) {
          liquidGradient.addColorStop(0, `rgba(139, 92, 246, ${alpha})`);
          liquidGradient.addColorStop(1, `rgba(59, 130, 246, ${alpha * 1.5})`);
        } else {
          liquidGradient.addColorStop(0, `rgba(59, 130, 246, ${alpha})`);
          liquidGradient.addColorStop(1, `rgba(99, 102, 241, ${alpha * 1.5})`);
        }

        ctx.fillStyle = liquidGradient;
        ctx.fill();
      }

      time += 0.008;
      animationFrameId = requestAnimationFrame(drawLiquid);
    };

    drawLiquid();

    // Handle resize
    window.addEventListener("resize", setCanvasSize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
}
