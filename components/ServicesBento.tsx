"use client"

import { MagicBento } from "reactbits"

export default function ServicesBento() {
  return (
    <section className="py-24 container mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">
        Serviços Witty Wolf Studio
      </h2>

      <MagicBento
        items={[
          {
            title: "Branding & Identidade",
            description:
              "Criação de identidades visuais impactantes, rebranding, guias de marca e aplicações digitais.",
            icon: "⭐",
          },
          {
            title: "Design & Conteúdo Criativo",
            description:
              "Design para redes sociais, apresentações, campanhas, 3D, mockups e direção de arte.",
            icon: "🎨",
          },
          {
            title: "Web & Marketing Digital",
            description:
              "Landing pages, webdesign, Google Ads, PPC, consultoria estratégica e automações.",
            icon: "⚡",
          },
        ]}
        columns={3}
      />
    </section>
  )
}
