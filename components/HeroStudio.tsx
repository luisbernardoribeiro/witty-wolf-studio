"use client";

import { useRef, useState } from "react";
import Link from "next/link";

export default function HeroStudio() {
  const magnetRef = useRef<HTMLAnchorElement>(null);
  const [magnetPosition, setMagnetPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!magnetRef.current) return;

    const rect = magnetRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.3;
    const deltaY = (e.clientY - centerY) * 0.3;

    setMagnetPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setMagnetPosition({ x: 0, y: 0 });
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-24 pb-16">
      <div className="text-center space-y-8">
        {/* Título Principal */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            WITTY WOLF
          </span>
          <br />
          <span className="text-white">STUDIO</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto">
          Design & Marketing Studio
        </p>

        {/* Texto Principal */}
        <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
          Projetamos de forma inesquecível identidades e marketing nítido.
          <br />
          Então tu não só competes,{" "}
          <span className="font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
            TU DOMINAS
          </span>
          .
        </p>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          {/* Botão Principal com Magnet Effect */}
          <Link
            ref={magnetRef}
            href="#contacto"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            style={{
              transform: `translate(${magnetPosition.x}px, ${magnetPosition.y}px)`,
              transition: magnetPosition.x === 0 ? "transform 0.3s ease-out" : "none",
            }}
          >
            Pedir proposta
          </Link>

          {/* Botão Secundário */}
          <Link
            href="#portfolio"
            className="px-8 py-4 border-2 border-white/20 rounded-full text-white font-semibold text-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            Ver projetos
          </Link>
        </div>
      </div>
    </section>
  );
}
