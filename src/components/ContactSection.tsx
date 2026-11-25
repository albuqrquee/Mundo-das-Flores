import { FormEvent, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Instagram,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { buildWhatsAppUrl, BUSINESS, DEFAULT_WHATSAPP_URL } from '../data/catalog';

const OCCASIONS = [
  'Buquê de Rosas',
  'Buquê de Flores do Campo',
  'Arranjo em Vaso',
  'Orquídea ou Planta',
  'Cesta de Presente',
  'Encomenda Personalizada',
] as const;

export function ContactSection() {
  const prefersReducedMotion = useReducedMotion();
  const [name, setName] = useState('');
  const [occasion, setOccasion] = useState<string>(OCCASIONS[0]);
  const [neighborhood, setNeighborhood] = useState('');
  const [cardMessage, setCardMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string }>({});
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmedName = name.trim();

    if (trimmedName.length < 2) {
      setErrors({ name: 'Por favor, informe seu nome para prepararmos o atendimento.' });
      setSubmittedUrl(null);
      return;
    }

    setErrors({});

    const lines = [
      `Olá! Me chamo ${trimmedName} e gostaria de conversar sobre: ${occasion}.`,
      neighborhood.trim() ? `Bairro / Entrega: ${neighborhood.trim()}` : null,
      cardMessage.trim() ? `Mensagem do cartão: "${cardMessage.trim()}"` : null,
    ].filter(Boolean);

    const url = buildWhatsAppUrl(lines.join('\n'));
    setSubmittedUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="contato"
      className="py-20 sm:py-28 lg:py-32 bg-surface-muted border-t border-hairline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Coluna de Endereço e Contato Direto */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-3">
              <p className="text-sm font-bold text-leaf-deep">04. Contato & Loja Física</p>
              <h2
                className="font-serif font-semibold text-ink leading-[1.1]"
                style={{ fontSize: 'clamp(1.95rem, 3.2vw, 2.85rem)' }}
              >
                Visite ou peça direto pelo WhatsApp
              </h2>
              <p className="text-base text-ink-secondary leading-relaxed">
                Atendimento amigável e direto para escolher suas flores, combinar cores e agilizar sua entrega em Juiz de Fora.
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-hairline">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-lg bg-surface border border-hairline text-leaf-deep inline-flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Endereço
                  </p>
                  <p className="text-base text-ink font-normal mt-1 leading-relaxed">
                    {BUSINESS.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-lg bg-surface border border-hairline text-leaf-deep inline-flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                    WhatsApp & Telefone
                  </p>
                  <a
                    href={DEFAULT_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-ink hover:text-leaf-deep transition-colors tabular-nums inline-block mt-1"
                  >
                    {BUSINESS.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Floricultura Mundo da Flores"
                title="Instagram"
                className="w-12 h-12 min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded-lg bg-surface border border-hairline-leaf text-leaf-deep hover:bg-leaf-tint hover:border-leaf transition-colors shrink-0"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>

              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-surface border border-hairline text-ink text-sm font-bold whitespace-nowrap hover:border-leaf-deep hover:text-leaf-deep transition-colors"
              >
                <Navigation className="w-4 h-4" aria-hidden="true" />
                <span>Abrir no mapa</span>
              </a>
            </div>
          </motion.div>

          {/* Formulário de Encomenda Direto para WhatsApp */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.55,
              delay: prefersReducedMotion ? 0 : 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-6 sm:p-10 rounded-2xl bg-surface border border-hairline space-y-6"
            >
              <div className="space-y-1.5 pb-4 border-b border-hairline">
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">
                  Monte sua mensagem rápida
                </h3>
                <p className="text-sm text-ink-secondary">
                  Preencha os campos abaixo e envie o pedido pronto diretamente para o nosso WhatsApp.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="block text-sm font-bold text-ink">
                    Seu nome <span className="text-danger">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({});
                    }}
                    placeholder="Ex.: Mariana Souza"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={`w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-ice border text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-leaf-deep ${
                      errors.name ? 'border-danger bg-danger-bg' : 'border-hairline'
                    }`}
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className="flex items-center gap-1.5 text-xs font-bold text-danger"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-occasion" className="block text-sm font-bold text-ink">
                    O que você procura?
                  </label>
                  <select
                    id="contact-occasion"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-ice border border-hairline text-sm text-ink focus:outline-none focus:border-leaf-deep"
                  >
                    {OCCASIONS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-neighborhood"
                  className="block text-sm font-bold text-ink"
                >
                  Bairro em Juiz de Fora ou retirada na loja (opcional)
                </label>
                <input
                  id="contact-neighborhood"
                  type="text"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="Ex.: São Mateus, Bom Pastor ou retirar no Centro"
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-ice border border-hairline text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-leaf-deep"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-message" className="block text-sm font-bold text-ink">
                  Mensagem do cartão ou preferência de flores (opcional)
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  value={cardMessage}
                  onChange={(e) => setCardMessage(e.target.value)}
                  placeholder="Escreva a dedicatória ou as cores desejadas..."
                  className="w-full px-4 py-3 rounded-lg bg-ice border border-hairline text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-leaf-deep resize-y"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-leaf-deep text-white text-sm font-bold whitespace-nowrap hover:bg-leaf transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Conversar no WhatsApp</span>
                </button>
                <span className="text-xs text-ink-muted">
                  Você revisa a mensagem antes de enviar.
                </span>
              </div>

              {submittedUrl && (
                <div
                  role="status"
                  className="p-4 rounded-xl bg-leaf-tint border border-hairline-leaf flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 text-sm font-bold text-leaf-deep">
                    <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Mensagem pronta! Caso o WhatsApp não tenha aberto, toque ao lado.</span>
                  </div>
                  <a
                    href={submittedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold underline text-leaf-deep whitespace-nowrap shrink-0"
                  >
                    Abrir WhatsApp
                  </a>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
