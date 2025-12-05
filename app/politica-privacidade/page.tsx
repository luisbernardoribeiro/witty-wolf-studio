export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-5xl font-bold mb-12">Política de Privacidade</h1>

        <div className="space-y-8 text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introdução</h2>
            <p>
              A Witty Wolf Studio ("nós", "nosso" ou "empresa") respeita a privacidade dos visitantes do nosso site. Esta Política de Privacidade
              explica como recolhemos, usamos, divulgamos e salvaguardamos as tuas informações.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Informações que Recolhemos</h2>
            <p>Podemos recolher informações sobre ti de várias formas, incluindo:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Informações fornecidas voluntariamente através de formulários (nome, email, mensagem)</li>
              <li>Dados de navegação (IP, navegador, páginas visitadas)</li>
              <li>Cookies e tecnologias semelhantes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Como Usamos as Tuas Informações</h2>
            <p>Usamos as informações recolhidas para:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Responder a consultas e contactos</li>
              <li>Melhorar a experiência do site</li>
              <li>Análise e pesquisa</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Compartilhamento de Dados</h2>
            <p>
              Não compartilhamos dados pessoais com terceiros, exceto quando necessário para cumprir a lei ou fornecer serviços
              (e.g., fornecedores de email).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Segurança dos Dados</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais para proteger as tuas informações contra acesso não autorizado,
              alteração ou destruição.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Direitos do Utilizador</h2>
            <p>Sob o RGPD, tens direito a:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Aceder aos teus dados pessoais</li>
              <li>Corrigir dados inexatos</li>
              <li>Solicitar eliminação dos dados</li>
              <li>Restringir o processamento</li>
              <li>Portabilidade dos dados</li>
            </ul>
            <p className="mt-4">
              Para exercer estes direitos, contacta-nos em <a href="mailto:info@wittywolf.pt" className="text-pink-400">info@wittywolf.pt</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Retenção de Dados</h2>
            <p>
              Retemos dados pessoais apenas pelo tempo necessário para cumprir os fins para os quais foram recolhidos, geralmente até 2 anos,
              a menos que a lei exija uma retenção mais longa.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Contacto</h2>
            <p>
              Se tens questões sobre esta Política de Privacidade, contacta-nos:
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
