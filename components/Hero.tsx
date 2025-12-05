"use client";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-black uppercase text-white mb-6 leading-tight">
          Witty Wolf Studio
        </h1>
        <p className="text-2xl md:text-3xl text-zinc-300 font-semibold mb-8">
          Design & Marketing Studio
        </p>
        <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12">
          Projetamos de forma inesquecível identidades e marketing nítido. <br />
          Então tu não só competes, <span className="text-white font-bold">TU DOMINAS</span>.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href="#portfolio"
            className="px-8 py-4 bg-white text-[#050712] font-bold text-lg rounded-full hover:bg-zinc-200 transition-all duration-300 hover:scale-105"
          >
            Ver projetos
          </a>
          <a
            href="#contacto"
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-[#050712] transition-all duration-300 hover:scale-105"
          >
            Pedir proposta
          </a>
        </div>
      </div>
    </section>
  );
}
