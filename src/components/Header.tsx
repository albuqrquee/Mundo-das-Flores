import { useState } from 'react';
import { Instagram, Menu, X } from 'lucide-react';
import { BUSINESS, DEFAULT_WHATSAPP_URL } from '../data/catalog';

const NAV_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#produtos', label: 'Produtos' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#contato', label: 'Contato' },
] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-ice/95 backdrop-blur-sm border-b border-hairline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zona 1: Marca em linha única */}
        <a
          href="#inicio"
          className="flex items-center gap-2.5 min-w-0 shrink-0 whitespace-nowrap group"
        >
          <span className="w-9 h-9 rounded-full overflow-hidden border border-hairline-leaf bg-forest shrink-0 block">
            <img
              src={BUSINESS.logo}
              alt="Logo Floricultura Mundo da Flores"
              className="w-full h-full object-cover scale-[1.08]"
            />
          </span>
          <span className="font-serif text-[1rem] sm:text-[1.35rem] font-semibold tracking-normal text-ink whitespace-nowrap">
            {BUSINESS.name}
          </span>
        </a>

        {/* Zona 2: Links de navegação limpos */}
        <nav
          aria-label="Navegação principal"
          className="hidden lg:flex items-center gap-7 text-[0.9375rem] text-ink-secondary"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:text-leaf-deep hover:border-leaf transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zona 3: Ação principal + ícone Instagram */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={DEFAULT_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center min-h-[40px] px-5 py-2 rounded-lg bg-leaf-deep text-white text-sm font-bold whitespace-nowrap shrink-0 hover:bg-leaf transition-colors duration-150"
          >
            Conversar no WhatsApp
          </a>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da Floricultura Mundo da Flores"
            title="Instagram"
            className="hidden sm:inline-flex w-10 h-10 min-h-[40px] min-w-[40px] items-center justify-center rounded-lg bg-surface border border-hairline-leaf text-leaf-deep hover:bg-leaf-tint hover:border-leaf transition-colors shrink-0"
          >
            <Instagram className="w-[18px] h-[18px]" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            className="lg:hidden print:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-ink hover:bg-surface-muted transition-colors"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden border-t border-hairline bg-surface px-4 py-5 space-y-4"
        >
          <nav aria-label="Navegação móvel" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="min-h-[44px] flex items-center px-3 rounded-lg text-base text-ink hover:bg-leaf-tint hover:text-leaf-deep transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-hairline flex items-center gap-2.5">
            <a
              href={DEFAULT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex-1 min-h-[44px] inline-flex items-center justify-center px-5 py-3 rounded-lg bg-leaf-deep text-white text-sm font-bold hover:bg-leaf transition-colors"
            >
              Conversar no WhatsApp
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Floricultura Mundo da Flores"
              title="Instagram"
              onClick={() => setMobileOpen(false)}
              className="w-11 h-11 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg bg-surface border border-hairline-leaf text-leaf-deep hover:bg-leaf-tint hover:border-leaf transition-colors shrink-0"
            >
              <Instagram className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
