"use client"

import Image from "next/image"
import GooeyNav from "./GooeyNav"

const navItems = [
  { label: "Serviços", href: "#servicos" },
  { label: "Projetos", href: "#portfolio" },
  { label: "Como trabalhamos", href: "#processo" },
  { label: "Entre em contato", href: "#contacto" },
]

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#05050d]/80 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <Image
            src="/G_Witty_wolf.jpg"
            alt="Witty Wolf | Design & Marketing Studio"
            width={180}
            height={40}
            className="h-auto w-[180px]"
            priority
          />
        </div>

        {/* NAV GOOEY */}
        <GooeyNav items={navItems} />
      </div>
    </header>
  )
}

