import { useState } from 'react';
import { Check, MapPin, MessageCircle, Share2 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { BUSINESS, DEFAULT_WHATSAPP_URL } from '../data/catalog';

export function Footer() {
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: BUSINESS.name,
          text: 'Confira os buquês e arranjos da Floricultura Mundo da Flores em Juiz de Fora.',
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback para copiar link
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <footer className="bg-forest text-ink-on-dark">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/15">
          {/* Identidade e logo */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <span className="w-12 h-12 rounded-full overflow-hidden border border-white/25 bg-forest shrink-0 block">
                <img
                  src={BUSINESS.logo}
                  alt="Logo Floricultura Mundo da Flores"
                  className="w-full h-full object-cover scale-[1.08]"
                />
              </span>
              <span className="font-serif text-2xl font-semibold tracking-normal">
                {BUSINESS.name}
              </span>
            </div>
            <p className="text-sm text-white/80 max-w-sm leading-relaxed">
              {BUSINESS.address}
            </p>
            <p className="text-sm font-bold text-white tabular-nums">
              {BUSINESS.phoneDisplay}
            </p>
          </div>

          {/* Navegação rápida */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white/70">
              Navegação
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#inicio" className="text-white/90 hover:text-white transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#produtos" className="text-white/90 hover:text-white transition-colors">
                  Produtos
                </a>
              </li>
              <li>
                <a href="#entregas" className="text-white/90 hover:text-white transition-colors">
                  Sobre & Entregas
                </a>
              </li>
              <li>
                <a href="#galeria" className="text-white/90 hover:text-white transition-colors">
                  Galeria de Fotos
                </a>
              </li>
              <li>
                <a href="#contato" className="text-white/90 hover:text-white transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Canais e Redes Sociais */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white/70">
              Atendimento & Canais
            </p>
            <div className="flex flex-col items-start gap-2.5 text-sm">
              <a
                href={DEFAULT_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[40px] inline-flex items-center gap-2 text-white hover:text-leaf-soft transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>WhatsApp · {BUSINESS.phoneDisplay}</span>
              </a>

              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[40px] inline-flex items-center gap-2 text-white hover:text-leaf-soft transition-colors"
              >
                <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Localização no Google Maps</span>
              </a>

              <button
                type="button"
                onClick={handleShare}
                className="min-h-[40px] inline-flex items-center gap-2 text-white hover:text-leaf-soft transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Link do catálogo copiado!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Compartilhar floricultura</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/75">
          <p>© {new Date().getFullYear()} {BUSINESS.name}. Juiz de Fora, MG.</p>
          <p>Flores frescas, buquês e arranjos sob encomenda.</p>
        </div>
      </motion.div>
    </footer>
  );
}
