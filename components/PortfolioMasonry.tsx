"use client"

import React from "react"

const projects = [
  {
    id: 1,
    title: "FlexiEase – Embalagens veterinárias",
    image: "/portfolio/flexiease-01.jpg",
    tags: ["Branding", "Packaging Design"],
  },
  {
    id: 2,
    title: "Sanus – Linha de suplementos",
    image: "/portfolio/sanus-01.jpg",
    tags: ["Rótulos", "Embalagem"],
  },
  {
    id: 3,
    title: "Showroom / Merchandising visual",
    image: "/portfolio/showroom-01.jpg",
    tags: ["Merchandising", "Visual"],
  },
  // acrescenta aqui mais projetos...
]

export function PortfolioMasonry() {
  return (
    <section id="portfolio" className="px-6 lg:px-16 py-16">
      <div className="flex items-baseline justify-between mb-8 gap-4">
        <div>
          <h2 className="text-sm tracking-[0.35em] uppercase text-neutral-400 mb-3">
            Portfólio
          </h2>
          <h3 className="text-3xl md:text-4xl font-semibold">
            Projetos que falam por ti
          </h3>
        </div>
      </div>

      {/* 👉 AQUI entra o Masonry do reactbits */}
      {/* Por agora uso um masonry simples com CSS, 
          se quiseres podes substituir pelo código do reactbits */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {projects.map((project) => (
          <article
            key={project.id}
            className="break-inside-avoid rounded-2xl overflow-hidden bg-white/5 border border-white/10"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover"
            />
            <div className="p-4">
              <h4 className="text-sm font-semibold mb-1">{project.title}</h4>
              <p className="text-[11px] text-neutral-300">
                {project.tags.join(" • ")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
