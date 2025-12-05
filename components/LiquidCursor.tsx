"use client";

import { useEffect, useRef } from "react";

export default function LiquidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const blobsRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    alpha: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Create new blob at mouse position
      if (Math.random() > 0.7) {
        blobsRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: Math.random() * 30 + 20,
          alpha: 0.6,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw blobs
      blobsRef.current = blobsRef.current.filter((blob) => {
        // Update position
        blob.x += blob.vx;
        blob.y += blob.vy;
        blob.vx *= 0.98;
        blob.vy *= 0.98;
        blob.alpha *= 0.96;
        blob.radius *= 0.99;

        // Draw blob with gradient
        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius
        );
        gradient.addColorStop(0, `rgba(242, 112, 156, ${blob.alpha})`);
        gradient.addColorStop(0.5, `rgba(79, 172, 254, ${blob.alpha * 0.6})`);
        gradient.addColorStop(1, `rgba(0, 242, 254, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();

        // Keep blob if still visible
        return blob.alpha > 0.01 && blob.radius > 5;
      });

      // Draw main cursor blob
      const mainGradient = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        50
      );
      mainGradient.addColorStop(0, "rgba(242, 112, 156, 0.4)");
      mainGradient.addColorStop(0.4, "rgba(79, 172, 254, 0.3)");
      mainGradient.addColorStop(1, "rgba(0, 242, 254, 0)");

      ctx.fillStyle = mainGradient;
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 50, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
