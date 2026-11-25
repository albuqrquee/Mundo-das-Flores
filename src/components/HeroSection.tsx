import { ArrowDownRight, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { BUSINESS, DEFAULT_WHATSAPP_URL } from '../data/catalog';
import { BotanicalImage } from './BotanicalImage';

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="inicio"
      className="relative pt-7 pb-12 sm:pt-10 sm:pb-14 lg:pt-12 lg:pb-16 border-b border-hairline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch">
          {/* Coluna tipográfica editorial */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between py-1 lg:py-4"
          >
            <div className="space-y-5">
              <p className="text-sm text-leaf-deep font-bold tracking-wide">
                {BUSINESS.addressShort}
              </p>

              <h1
                className="font-serif font-semibold text-ink tracking-normal leading-[1.05]"
                style={{ fontSize: 'clamp(2.45rem, 4.2vw, 4.1rem)' }}
              >
                Flores frescas que eternizam afetos
              </h1>

              <p className="text-base sm:text-[1.0625rem] text-ink-secondary max-w-md leading-relaxed">
                Buquês autorais, arranjos em cerâmica, orquídeas e cestas preparadas com cuidado no coração de Juiz de Fora.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={DEFAULT_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-leaf-deep text-white text-sm sm:text-base font-bold whitespace-nowrap hover:bg-leaf transition-colors duration-150"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Conversar no WhatsApp</span>
                </a>

                <a
                  href="#produtos"
                  className="min-h-[48px] inline-flex items-center gap-1.5 px-3 py-2 text-sm sm:text-base font-bold text-ink hover:text-leaf-deep transition-colors whitespace-nowrap"
                >
                  <span>Explorar catálogo</span>
                  <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Pista discreta do selo da marca + convite ao próximo bloco */}
            <div className="hidden lg:flex items-center justify-between pt-8 mt-8 border-t border-hairline text-sm text-ink-muted">
              <span>Buquês · Arranjos · Plantas · Cestas</span>
              <span className="text-leaf-deep font-bold tabular-nums">{BUSINESS.phoneDisplay}</span>
            </div>
          </motion.div>

          {/* Fotografia principal em arco botânico */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex"
          >
            <div className="w-full relative overflow-hidden rounded-t-[6rem] sm:rounded-t-[9.5rem] rounded-b-2xl border border-hairline bg-surface-muted aspect-[4/3] lg:aspect-auto lg:min-h-[440px] lg:max-h-[520px]">
              <BotanicalImage
                src="/src/assets/images/hero_bouquet_atelier_1795614649518.jpg"
                alt="Buquê artesanal de rosas de jardim, lisiantos brancos e eucalipto com laço verde folha"
                priority
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
