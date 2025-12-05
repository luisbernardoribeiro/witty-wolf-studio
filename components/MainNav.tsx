"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

type NavItem = { label: string; href: string };

type MainNavProps = {
  items: NavItem[];
};

export default function MainNav({ items }: MainNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <header className="relative flex items-center justify-between w-full py-4">
      <Link href="/" className="flex items-center gap-3" onClick={handleClose}>
        <div className="relative w-[200px] h-[45px] md:w-[220px] md:h-[50px]">
          <Image
            src="/home_Witty_wolf.png"
            alt="Witty Wolf | Design & Marketing Studio"
            fill
            className="object-contain"
            priority
          />
        </div>
      </Link>

      {/* Desktop links - removidos pois agora usamos só hamburger até xl breakpoint */}

      {/* Hamburger button - visível até xl (1200px) */}
      <button
        type="button"
        className="xl:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-lg transition hover:border-white/40"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Abrir menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Dropdown menu */}
      <div
        className={`absolute right-0 top-full mt-2 w-48 rounded-2xl border border-white/10 bg-black/85 backdrop-blur-lg shadow-2xl xl:hidden transition-opacity duration-200 z-[70] ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex flex-col py-3 text-sm font-medium text-white/80">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-3 hover:text-white hover:bg-white/5 transition"
              onClick={handleClose}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
