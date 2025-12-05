"use client";

import LiquidEtherSimple from "./LiquidEtherSimple";
import GooeyNav from "./GooeyNav";
import MagicBento from "./MagicBento";
import Masonry from "./Masonry";
import LaserFlow from "./LaserFlow";
import ShinyText from "./ShinyText";
import Dock from "./Dock";
import HeroBackgroundWithVideo from "./HeroBackgroundWithVideo";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiChevronDown, FiInstagram, FiLinkedin, FiMail, FiPhoneCall, FiFacebook } from "react-icons/fi";
import { useRef, useState } from "react";

const navItems = [
  { label: "Home", href: "#" },
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Como Trabalhamos", href: "#como-trabalhamos" },
  { label: "Contacto", href: "#contacto" },
];

const dockItems = [
  {
    icon: <FiFacebook size={18} />,
    label: "Facebook",
    onClick: () => window.open("https://www.facebook.com/profile.php?id=61575340932805", "_blank", "noreferrer"),
  },
  {
    icon: <FiInstagram size={18} />,
    label: "Instagram",
    onClick: () => window.open("https://www.instagram.com/witty_wolf_studio/", "_blank", "noreferrer"),
  },
  {
    icon: <FiLinkedin size={18} />,
    label: "LinkedIn",
    onClick: () => window.open("https://www.linkedin.com/company/107023260/", "_blank", "noreferrer"),
  },
  {
    icon: <FiMail size={18} />,
    label: "E-mail",
    onClick: () => (window.location.href = "mailto:info@wittywolf.pt"),
  },
  {
    icon: <FiPhoneCall size={18} />,
    label: "+351 962 930 194",
    onClick: () => (window.location.href = "tel:+351962930194"),
  },
];

// Portfolio items - can be images OR videos
// For videos, add: type: "video", poster: "/portfolio/thumbnail.jpg"
// Place all portfolio files in /public/portfolio/
const portfolioItems = [
  // Example with real video
  {
    id: "video1",
    img: "/portfolio/video_trovao_team.mov",
    url: "#",
    height: 400,
    type: "video" as const,
    poster: "/portfolio/cartaovisita_logo_alternativa.png"
  },
  // Using existing image as placeholders - replace with your real portfolio
  {
    id: "2",
    img: "/portfolio/cartaovisita_logo_alternativa.png",
    url: "#",
    height: 300,
  },
  {
    id: "3",
    img: "/wittywolf-bg.jpg",
    url: "#",
    height: 450,
  },
  {
    id: "4",
    img: "/home_Witty_wolf.png",
    url: "#",
    height: 350,
  },
  {
    id: "5",
    img: "/G_Witty_wolf.jpg",
    url: "#",
    height: 400,
  },
];

export default function LiquidBackgroundWithImage() {
  const magnetRef = useRef<HTMLAnchorElement>(null);
  const [magnetPosition, setMagnetPosition] = useState({ x: 0, y: 0 });
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);
  
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name")?.toString() || "").trim();
    const email = (data.get("email")?.toString() || "").trim();
    const message = (data.get("message")?.toString() || "").trim();

    const subject = encodeURIComponent(`Pedido de contacto - ${name || "Witty Wolf"}`);
    const bodyLines = [
      name ? `Nome: ${name}` : null,
      email ? `Email: ${email}` : null,
      message ? "Mensagem:" : null,
      message || null,
    ].filter(Boolean);

    const body = encodeURIComponent(bodyLines.join("\n"));
    window.location.href = `mailto:info@wittywolf.pt?subject=${subject}&body=${body}`;
  };

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
    <>
      <div className="relative w-full h-[100vh] overflow-hidden bg-black">

      {/* 🔥 BACKGROUND VIDEO/IMAGE (Witty Wolf Marca) */}
      <HeroBackgroundWithVideo />

      {/* 🔥 LIQUID ETHER OVERLAY */}
      <div className="absolute inset-0 z-10 mix-blend-screen opacity-70">
        <LiquidEtherSimple />
      </div>

      {/* 🔥 LOGO (fixo no topo) */}
      <div className="fixed top-6 left-6 z-50">
        <Image
          src="/home_Witty_wolf.png"
          alt="Witty Wolf Logo"
          width={360}
          height={360}
          className="drop-shadow-2xl"
        />
      </div>

      {/* 🔥 GOOEY NAV (fixo no topo) */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <GooeyNav
          items={navItems}
          particleCount={15}
          particleDistances={[90, 10]}
          animationTime={600}
        />
      </div>

      {/* 🔥 HERO CONTENT */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-20 px-6 text-white">
        <div
          className="max-w-4xl flex flex-col gap-4 text-center"
          style={{ textShadow: "0 10px 30px rgba(0,0,0,0.55)" }}
        >
          <p className="text-lg md:text-xl font-semibold leading-7">
            Projetamos de forma inesquecível identidades e marketing nítido
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Então tu não só competes,
            <br />
            <ShinyText text="TU DOMINAS!" speed={3} />
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Criando identidades visuais ousadas e soluções personalizadas de design e marketing
            para as tuas necessidades diárias, para que possas destacar e possuir o teu espaço no mercado.
          </p>
          <div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#portfolio"
              className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#ff7b69] via-[#f2709c] to-[#5b5bf7] px-[2px] py-[2px] shadow-[0_12px_35px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-[1.03]"
            >
              <span className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#2a2438] via-[#1a1828] to-[#0c0b16] px-6 py-3 text-base md:text-lg font-semibold">
                Projetos
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#ff8f70] via-[#f2709c] to-[#5b5bf7] text-white shadow-lg">
                  <FiArrowUpRight />
                </span>
              </span>
            </Link>
            <Link
              href="#contacto"
              ref={magnetRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="group inline-flex items-center gap-3 rounded-full border border-white/70 bg-black/40 px-6 py-3 text-base md:text-lg font-semibold text-white shadow-[0_12px_35px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-[1.03]"
              style={{
                transform: `translate(${magnetPosition.x}px, ${magnetPosition.y}px)`,
                transition: magnetPosition.x === 0 && magnetPosition.y === 0 ? "transform 0.25s ease-out" : "none",
              }}
            >
              <span>Obter uma cotação</span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#ff8f70] via-[#f2709c] to-[#5b5bf7] text-white shadow-lg">
                <FiArrowUpRight />
              </span>
            </Link>
          </div>
        </div>
      </div>
      </div>

      {/* 🔥 SERVIÇOS SECTION */}
      <section
        id="servicos"
        className="bg-black py-20 scroll-mt-32 flex items-center justify-center"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-white text-center mb-16">
            Nossos Serviços
          </h2>
          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
          />
        </div>
      </section>

      {/* 🔥 PORTFÓLIO SECTION */}
      <section
        id="portfolio"
        className="bg-black py-24 px-6 scroll-mt-32"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Portfólio em Destaque
            </h2>
            <p className="text-zinc-300 text-lg md:text-xl">
              Seleção rápida do que temos criado. Clica para abrir cada projeto.
            </p>
          </div>
          <div className="mt-12">
            <Masonry
              items={portfolioItems}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover
              hoverScale={0.95}
              blurToFocus
              colorShiftOnHover={false}
            />
          </div>
        </div>
      </section>

      {/* 🔥 COMO TRABALHAMOS SECTION */}
      <section
        id="como-trabalhamos"
        className="bg-black py-24 px-6 scroll-mt-32"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-left max-w-2xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-tight">
              Como Trabalhamos
            </h2>
            <p className="text-2xl md:text-3xl text-white leading-relaxed mb-4">
              As primeiras impressões são importantes, por isso o teu projeto deve ter uma ótima aparência e um desempenho perfeito
            </p>
            <p className="text-lg text-zinc-400">
              Juntos, construímos o Design e Marketing Visual perfeito
            </p>
          </div>

          <div className="space-y-8">
            {/* Fase 1 */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors">
              <button
                onClick={() => setExpandedPhase(expandedPhase === 1 ? null : 1)}
                className="w-full text-left p-8 flex items-center justify-between group"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-white">
                  1. Fase da descoberta
                </h3>
                <FiChevronDown
                  className={`text-white text-2xl transition-transform duration-300 ${
                    expandedPhase === 1 ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedPhase === 1 && (
                <div className="px-8 pb-8 space-y-3">
                  <p className="text-zinc-400 italic">
                    "Como você define a estratégia inicial de um projeto?"
                  </p>
                  <p className="text-zinc-300 leading-relaxed">
                    Começamos ouvindo. Por meio de briefings detalhados e pesquisas de mercado, analisamos seu negócio, seus objetivos e seu público-alvo. Isso garante que cada solução, seja uma identidade visual, um site ou uma campanha, seja personalizada e eficaz.
                  </p>
                </div>
              )}
            </div>

            {/* Fase 2 */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors">
              <button
                onClick={() => setExpandedPhase(expandedPhase === 2 ? null : 2)}
                className="w-full text-left p-8 flex items-center justify-between group"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-white">
                  2. Wireframe & design
                </h3>
                <FiChevronDown
                  className={`text-white text-2xl transition-transform duration-300 ${
                    expandedPhase === 2 ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedPhase === 2 && (
                <div className="px-8 pb-8 space-y-3">
                  <p className="text-zinc-400 italic">
                    "Como é o seu processo criativo?"
                  </p>
                  <p className="text-zinc-300 leading-relaxed">
                    Começamos com esboços estruturais (wireframes) e moodboards para alinhar a direção visual. Só então partimos para designs de alta fidelidade, garantindo que a estética reflita a personalidade da sua marca, priorizando a usabilidade intuitiva.
                  </p>
                </div>
              )}
            </div>

            {/* Fase 3 */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors">
              <button
                onClick={() => setExpandedPhase(expandedPhase === 3 ? null : 3)}
                className="w-full text-left p-8 flex items-center justify-between group"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-white">
                  3. Desenvolvimento
                </h3>
                <FiChevronDown
                  className={`text-white text-2xl transition-transform duration-300 ${
                    expandedPhase === 3 ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedPhase === 3 && (
                <div className="px-8 pb-8 space-y-3">
                  <p className="text-zinc-400 italic">
                    "Quais ferramentas você usa?"
                  </p>
                  <p className="text-zinc-300 leading-relaxed">
                    Trabalhamos com Webflow, Shopify e WordPress para desenvolver sites rápidos e responsivos, complementando tudo com a Adobe Creative Suite; Photoshop, Illustrator, InDesign, Premiere e After Effects para garantir design, conteúdo e vídeo de alto impacto. Para projetos 3D, utilizo SketchUp e outras ferramentas de visualização, criando renders realistas e experiências imersivas. Todo o processo é otimizado para desempenho, criatividade e resultados profissionais.
                  </p>
                </div>
              )}
            </div>

            {/* Fase 4 */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors">
              <button
                onClick={() => setExpandedPhase(expandedPhase === 4 ? null : 4)}
                className="w-full text-left p-8 flex items-center justify-between group"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-white">
                  4. Entrega e cuidados posteriores
                </h3>
                <FiChevronDown
                  className={`text-white text-2xl transition-transform duration-300 ${
                    expandedPhase === 4 ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedPhase === 4 && (
                <div className="px-8 pb-8 space-y-3">
                  <p className="text-zinc-400 italic">
                    "O que está incluído na fase final?"
                  </p>
                  <p className="text-zinc-300 leading-relaxed">
                    Você receberá todos os arquivos, guias de estilo e suporte pós-lançamento (pequenos ajustes ou treinamento da equipa). Meu objetivo? Garantir que você se sinta 100% confiante ao usar os resultados.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 CONTACTO + LASERFLOW */}
      <section
        id="contacto"
        className="relative bg-black py-16 px-6 scroll-mt-32 overflow-visible min-h-[640px]"
      >
        {/* LaserFlow starts above the section so the beam emerges from the 4º botão and runs past the form */}
        <div className="pointer-events-none absolute inset-x-0 top-[-260px] h-[1200px] opacity-80 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.9)20%,rgba(0,0,0,0.9)80%,rgba(0,0,0,0))]">
          <LaserFlow
            color="#f2709c"
            flowSpeed={0.28}
            wispDensity={0.7}
            horizontalBeamOffset={0.0}
            verticalBeamOffset={0.0}
            fogIntensity={0.3}
            fogScale={0.2}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="relative container mx-auto max-w-5xl grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-pink-300/70">Contacto</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Vamos criar algo extraordinário
            </h2>
            <p className="text-lg text-zinc-300">
              Envia-nos uma mensagem com o que precisas. Respondemos rápido com ideias, orçamento e próximos passos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:info@wittywolf.pt"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff7b69] via-[#f2709c] to-[#5b5bf7] px-6 py-3 font-semibold text-white shadow-lg shadow-fuchsia-500/30 hover:scale-[1.02] transition-transform"
              >
                Enviar e-mail
              </a>
              <a
                href="#servicos"
                className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 font-semibold text-white/90 hover:bg-white/10 transition"
              >
                Ver serviços
              </a>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg shadow-xl space-y-4">
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Nome</label>
              <input
                type="text"
                name="name"
                className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-pink-400"
                placeholder="O teu nome"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-pink-400"
                placeholder="email@exemplo.com"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Mensagem</label>
              <textarea
                name="message"
                className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-pink-400"
                rows={4}
                placeholder="Conta-nos sobre o teu projeto"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-[#ff7b69] via-[#f2709c] to-[#5b5bf7] px-4 py-3 font-semibold text-white shadow-lg shadow-fuchsia-500/30 hover:scale-[1.01] transition-transform"
            >
              Enviar mensagem
            </button>
          </form>
        </div>
      </section>

        {/* 🔥 DOCK RODAPÉ */}
        <section id="rodape" className="relative bg-black pt-4 pb-10 px-6 overflow-visible">
          <div className="container mx-auto max-w-5xl flex flex-col items-center gap-2">
            <div className="text-center space-y-1">
              <p className="text-sm uppercase tracking-[0.2em] text-pink-300/70">Redes e contacto</p>
              <p className="text-lg text-zinc-200">Segue e fala connosco rapidamente</p>
            </div>
            <Dock
              items={dockItems}
              panelHeight={52}
              baseItemSize={48}
              magnification={62}
              distance={95}
              dockHeight={100}
            />
            <p className="text-sm text-zinc-500">info@wittywolf.pt</p>
            <div className="flex gap-6 text-xs text-zinc-500 mt-4 flex-wrap justify-center">
              <Link href="/politica-privacidade" className="hover:text-white transition">Privacidade</Link>
              <Link href="/politica-cookies" className="hover:text-white transition">Cookies</Link>
              <Link href="/termos-servico" className="hover:text-white transition">Termos</Link>
            </div>
          </div>
        </section>
    </>
  );
}
