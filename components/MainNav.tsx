"use client";

import Image from "next/image";
import Link from "next/link";

export default function MainNav() {
  return (
    <header className="flex items-center justify-between py-6">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <div className="relative w-[220px] h-[50px]">
          <Image
            src="/portfolio/home_Witty_wolf.png"
            alt="Witty Wolf | Design & Marketing Studio"
            fill
            className="object-contain"
            priority
          />
        </div>
      </Link>

      {/* Links */}
      <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-neutral-300">
        <Link href="#servicos" className="hover:text-white transition">
          Serviços
        </Link>
        <Link href="#portfolio" className="hover:text-white transition">
          Projetos
        </Link>
        <Link href="#como-trabalhamos" className="hover:text-white transition">
          Como trabalhamos
        </Link>
        <Link
          href="#contacto"
          className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 transition font-semibold"
        >
          Entre em contacto
        </Link>
      </nav>
    </header>
  );
}
