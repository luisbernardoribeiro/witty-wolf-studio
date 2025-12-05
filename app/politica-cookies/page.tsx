export default function PoliticaCookies() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-5xl font-bold mb-12">Política de Cookies</h1>

        <div className="space-y-8 text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. O Que São Cookies?</h2>
            <p>
              Cookies são pequenos ficheiros de texto armazenados no teu dispositivo quando visitas um website. Permitem ao site reconhecer
              o teu dispositivo e melhorar a experiência de navegação.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Tipos de Cookies Usados</h2>
            <p><strong>Cookies Essenciais:</strong> Necessários para o funcionamento básico do site.</p>
            <p className="mt-2"><strong>Cookies de Análise:</strong> Utilizados para entender como os utilizadores interagem com o site.</p>
            <p className="mt-2"><strong>Cookies de Marketing:</strong> Usados para apresentar conteúdo relevante e publicidade.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Consentimento</h2>
            <p>
              Ao visitares o nosso site, ser-te-á apresentado um banner de cookies. Ao clicar em "Aceitar", consentes o uso de cookies
              conforme descrito nesta política. Podes alterar as tuas preferências em qualquer momento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Gerenciar Cookies</h2>
            <p>
              Podes controlar e/ou eliminar cookies através das definições do teu navegador. No entanto, desativar cookies pode afetar
              a funcionalidade do site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Cookies de Terceiros</h2>
            <p>
              O nosso site pode conter links para serviços terceiros (redes sociais, análise). Esses serviços têm as suas próprias políticas
              de cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Contacto</h2>
            <p>
              Se tens dúvidas sobre cookies, contacta-nos em:
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
