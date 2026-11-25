import { MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { buildWhatsAppUrl, BUSINESS } from '../data/catalog';
import { BotanicalImage } from './BotanicalImage';

const ABOUT_PILLARS = [
  {
    number: '01.',
    title: 'Destaque local · Zine Cultural',
    detail:
      'Incluída no guia de floriculturas de Juiz de Fora, com portfólio variado de terrários, vasos, orquídeas, suculentas, arranjos e buquês.',
  },
  {
    number: '02.',
    title: 'Assinatura quinzenal para sua casa',
    detail:
      'Além das vendas avulsas, oferecemos planos recorrentes com dois buquês a cada 15 dias, com retirada no local ou entrega.',
  },
  {
    number: '03.',
    title: 'Presentes, eventos e datas comemorativas',
    detail:
      'Atendimento sob medida desde presentes rápidos e decoração residencial até arranjos elaborados, sempre com cartão de dedicatória.',
  },
] as const;

const EXPERIENCE_HIGHLIGHTS = [
  {
    label: 'Atendimento familiar · Wanderboat',
    title: 'Cuidado próximo e embalagem segura',
    detail:
      'Avaliações no Wanderboat elogiam o carinho das proprietárias e da equipe tanto na loja quanto no digital, com destaque para o capricho ao embalar plantas para transporte e para a qualidade das flores.',
  },
  {
    label: 'Agilidade na cidade',
    title: 'Delivery rápido pelo WhatsApp',
    detail:
      'Clientes ressaltam a rapidez do serviço de entrega em Juiz de Fora e a praticidade para escolher e encomendar flores à distância com atendimento direto.',
  },
  {
    label: 'Estrutura no Centro',
    title: 'Visita rápida e transparência',
    detail:
      'O espaço funciona em formato de visita rápida na Rua Batista de Oliveira, facilitando retiradas ágeis; o ponto não dispõe de estacionamento próprio acessível para cadeirantes.',
  },
] as const;

export function DeliveryAndAboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="sobre"
      className="relative py-20 sm:py-28 lg:py-32 bg-surface border-y border-hairline scroll-mt-16"
    >
      <span id="entregas" className="absolute -top-16 left-0" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Fotografia ampla da bancada do ateliê + propósito oficial */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="overflow-hidden rounded-2xl border border-hairline bg-surface-muted aspect-[16/10]">
              <BotanicalImage
                src="/src/assets/images/atelier_entregas_floricultura_1795614653130.jpg"
                alt="Florista preparando um buquê fresco na bancada iluminada da Floricultura Mundo da Flores"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-hairline">
              <p className="font-serif italic text-xl sm:text-2xl text-ink leading-snug max-w-md">
                “Satisfazer as necessidades e encantar todos os momentos.”
              </p>
              <span className="text-xs font-bold uppercase tracking-wider text-ink-muted whitespace-nowrap shrink-0">
                Propósito · Facebook Oficial
              </span>
            </div>
          </motion.div>

          {/* Sobre a floricultura + Proposta, Destaque Local e Assinatura */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.55,
              delay: prefersReducedMotion ? 0 : 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-6 space-y-7"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-hairline-leaf bg-forest shrink-0">
                <img
                  src={BUSINESS.logo}
                  alt="Selo oficial Floricultura Mundo da Flores"
                  className="w-full h-full object-cover scale-[1.08]"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-leaf-deep">02. Sobre & Entregas</p>
                <p className="font-serif text-xl font-semibold text-ink">
                  {BUSINESS.name}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h2
                className="font-serif font-semibold text-ink leading-[1.1]"
                style={{ fontSize: 'clamp(1.9rem, 3vw, 2.65rem)' }}
              >
                Tradição floral, assinatura e cuidado em Juiz de Fora
              </h2>
              <p className="text-base text-ink-secondary leading-relaxed">
                No Centro da cidade, unimos atendimento familiar próximo, seleção rigorosa de flores e entrega ágil para transformar gestos cotidianos e grandes celebrações.
              </p>
            </div>

            <div className="divide-y divide-hairline border-y border-hairline">
              {ABOUT_PILLARS.map((item) => (
                <div key={item.number} className="py-4 flex gap-4 items-baseline">
                  <span className="font-serif text-lg font-semibold text-leaf-deep tabular-nums shrink-0">
                    {item.number}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-sans text-sm font-bold text-ink">{item.title}</h3>
                    <p className="text-sm text-ink-secondary leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={buildWhatsAppUrl(
                  'Olá! Gostaria de saber mais sobre a assinatura quinzenal ou consultar a entrega em Juiz de Fora.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-leaf-deep text-white text-sm font-bold whitespace-nowrap hover:bg-leaf transition-colors duration-150"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Consultar entrega e assinatura</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Reputação e Experiência dos Clientes */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 pt-12 border-t border-hairline"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="space-y-1.5">
              <p className="text-sm font-bold text-leaf-deep">
                Reputação e Experiência dos Clientes
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">
                Como quem compra descreve a loja
              </h3>
            </div>
            <p className="text-sm text-ink-muted">
              Atendimento presencial, digital e delivery em Juiz de Fora
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {EXPERIENCE_HIGHLIGHTS.map((highlight) => (
              <div
                key={highlight.title}
                className="space-y-2.5 pt-5 border-t border-hairline"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-leaf-deep">
                  {highlight.label}
                </p>
                <h4 className="font-serif text-xl font-semibold text-ink">
                  {highlight.title}
                </h4>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  {highlight.detail}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
