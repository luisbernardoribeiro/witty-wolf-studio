export default function TermosServico() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-5xl font-bold mb-12">Termos de Serviço</h1>

        <div className="space-y-8 text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Aceitação dos Termos</h2>
            <p>
              Ao acederes e utilizares este site, aceitas estar vinculado por estes Termos de Serviço. Se não concordas com algum ponto,
              por favor, não utilizes o site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Licença de Uso</h2>
            <p>
              A Witty Wolf Studio concede-te uma licença limitada, não exclusiva e revogável para aceder e usar o site para fins pessoais
              e legítimos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Proibições</h2>
            <p>Não podes:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Reproduzir, modificar ou distribuir conteúdo sem autorização</li>
              <li>Usar o site para fins ilegais ou prejudiciais</li>
              <li>Tentar ganhar acesso não autorizado ao site</li>
              <li>Transmitir vírus ou malware</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo do site (textos, imagens, logos, design) é propriedade da Witty Wolf Studio ou de seus licenciadores
              e protegido por lei de copyright.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Limitação de Responsabilidade</h2>
            <p>
              O site é fornecido "como está". A Witty Wolf Studio não garante que o site estará sempre disponível ou isento de erros.
              Não nos responsabilizamos por danos indiretos ou consequentes resultantes do uso do site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Links Externos</h2>
            <p>
              O site pode conter links para sites terceiros. Não nos responsabilizamos pelo conteúdo ou políticas desses sites.
              O uso desses links é por conta do utilizador.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Modificações dos Termos</h2>
            <p>
              Reservamos o direito de modificar estes Termos a qualquer momento. Alterações importantes serão notificadas através do site.
              O uso contínuo do site constitui aceitação das modificações.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Rescisão</h2>
            <p>
              Podemos rescindir ou suspender o teu acesso ao site a qualquer momento, sem aviso prévio, se violarmos estes Termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Lei Aplicável</h2>
            <p>
              Estes Termos são regidos pela lei portuguesa. Qualquer disputa será resolvida nos tribunais competentes de Portugal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Contacto</h2>
            <p>
              Se tens dúvidas sobre estes Termos de Serviço, contacta-nos:
            </p>
            <p className="mt-3">
              <strong>Email:</strong> <a href="mailto:info@wittywolf.pt" className="text-pink-400">info@wittywolf.pt</a>
              <br />
              <strong>Telefone:</strong> <a href="tel:+351962930194" className="text-pink-400">+351 962 930 194</a>
            </p>
          </section>

          <section>
            <p className="text-zinc-500 text-sm mt-12">
              Última atualização: Dezembro 2024
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
