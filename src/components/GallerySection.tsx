import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, MessageCircle, X } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { buildWhatsAppUrl, GALLERY_PHOTOS } from '../data/catalog';
import { BotanicalImage } from './BotanicalImage';
import { ParallaxMedia } from './ParallaxMedia';

const GALLERY_PARALLAX_OFFSETS = [22, -14, 16, -15, 15] as const;

export function GallerySection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activePhoto = activeIndex !== null ? GALLERY_PHOTOS[activeIndex] : null;

  const showPrev = () => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
    );
  };

  const showNext = () => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev + 1) % GALLERY_PHOTOS.length
    );
  };

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowLeft') showPrev();
      if (event.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex]);

  return (
    <section id="galeria" className="py-20 sm:py-28 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-hairline"
        >
          <div className="space-y-3 max-w-xl">
            <p className="text-sm font-bold text-leaf-deep">03. Galeria de Fotos</p>
            <h2
              className="font-serif font-semibold text-ink leading-[1.1]"
              style={{ fontSize: 'clamp(1.95rem, 3.2vw, 2.85rem)' }}
            >
              Cores, texturas e composições reais
            </h2>
          </div>
          <p className="text-sm sm:text-base text-ink-secondary max-w-sm">
            Toque em qualquer fotografia para ampliar os detalhes ou pedir uma criação parecida.
          </p>
        </motion.div>

        {/* Mosaico assimétrico editorial */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
          {GALLERY_PHOTOS.map((photo, index) => (
            <motion.button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: 0.55,
                delay: prefersReducedMotion ? 0 : Math.min(index * 0.06, 0.24),
                ease: [0.16, 1, 0.3, 1],
              }}
              aria-label={`Ampliar foto: ${photo.title}`}
              className={`${photo.spanClass} w-full group relative overflow-hidden rounded-2xl border border-hairline bg-surface-muted text-left focus-visible:outline-none ${
                index === 0 ? 'aspect-[4/3] md:aspect-auto md:min-h-[420px]' : 'aspect-[4/3]'
              }`}
            >
              <ParallaxMedia
                offset={GALLERY_PARALLAX_OFFSETS[index % GALLERY_PARALLAX_OFFSETS.length]}
                className="absolute inset-0"
              >
                <BotanicalImage
                  src={photo.image}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </ParallaxMedia>

              {/* Scrim medido para legibilidade >= 4.5:1 */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-leaf-soft">
                    {photo.category}
                  </p>
                  <p className="font-serif text-xl sm:text-2xl font-medium text-white leading-snug mt-0.5">
                    {photo.title}
                  </p>
                </div>
                <span className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-xs text-white inline-flex items-center justify-center shrink-0 group-hover:bg-leaf transition-colors">
                  <Expand className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox acessível */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 bg-ink/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="w-full max-w-4xl bg-surface rounded-2xl overflow-hidden border border-hairline shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-surface-muted aspect-[4/3] sm:aspect-[16/10] max-h-[65vh] w-full">
              <BotanicalImage
                src={activePhoto.image}
                alt={activePhoto.alt}
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Fechar galeria"
                className="absolute top-4 right-4 w-11 h-11 rounded-full bg-surface/90 text-ink hover:bg-surface inline-flex items-center justify-center shadow-md"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={showPrev}
                aria-label="Foto anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-surface/90 text-ink hover:bg-surface inline-flex items-center justify-center shadow-md"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={showNext}
                aria-label="Próxima foto"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-surface/90 text-ink hover:bg-surface inline-flex items-center justify-center shadow-md"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-leaf-deep">
                  {activePhoto.category}
                </p>
                <h3
                  id="lightbox-title"
                  className="font-serif text-2xl font-semibold text-ink"
                >
                  {activePhoto.title}
                </h3>
                <p className="text-sm text-ink-secondary">{activePhoto.caption}</p>
              </div>

              <a
                href={buildWhatsAppUrl(
                  `Olá! Vi a foto "${activePhoto.title}" na galeria da Floricultura Mundo da Flores e gostaria de encomendar um arranjo nesse estilo.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-leaf-deep text-white text-sm font-bold whitespace-nowrap shrink-0 hover:bg-leaf transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Pedir estilo semelhante</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
