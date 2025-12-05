"use client";

import { useEffect, useRef } from "react";

export default function LiquidEtherSimple() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, vx: 0, vy: 0 });
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 20; i++) {
        particlesRef.current.push({
          x: Math.random(),
          y: Math.random(),
          vx: (Math.random() - 0.5) * 0.002,
          vy: (Math.random() - 0.5) * 0.002,
          radius: Math.random() * 0.12 + 0.04,
          color: i % 3 === 0 ? "rgba(82, 39, 255, 0.035)" : i % 3 === 1 ? "rgba(255, 159, 252, 0.035)" : "rgba(177, 158, 239, 0.035)"
        });
      }
    };
    initParticles();

    // Animated gradient with particles
    let frame = 0;
    const animate = () => {
      frame += 0.005;
      
      const mouse = mouseRef.current;
      
      // Clear with slight fade for trail effect (mais visível)
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach((p, i) => {
        // Mouse influence
        // Gentle drift only (mouse influence desativado)
        
        // Auto movement
        p.vx += Math.cos(frame + i) * 0.000015;
        p.vy += Math.sin(frame + i) * 0.000015;
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Wrap around
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;
        
        // Friction
        p.vx *= 0.98;
        p.vy *= 0.98;
        
        // Draw particle with gradient
        const gradient = ctx.createRadialGradient(
          p.x * canvas.width,
          p.y * canvas.height,
          0,
          p.x * canvas.width,
          p.y * canvas.height,
          p.radius * canvas.width
        );
        
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      
      // Mouse glow removido para reduzir interação/ruído visual
      
      requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        filter: "blur(30px)",
      }}
    />
  );
}
