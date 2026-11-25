import { useEffect, useState } from 'react';
import { Check, MessageCircle, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  buildWhatsAppUrl,
  CATEGORIES,
  FloralProduct,
  ProductCategory,
  PRODUCTS,
} from '../data/catalog';
import { BotanicalImage } from './BotanicalImage';
import { ParallaxMedia } from './ParallaxMedia';

const PRODUCT_PARALLAX_OFFSETS = [18, -14, 16, -15, 16, -14] as const;

interface CartItem {
  product: FloralProduct;
  quantity: number;
}

export function CatalogSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<'Todos' | ProductCategory>('Todos');
  const [selectedProduct, setSelectedProduct] = useState<FloralProduct | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredProducts =
    activeCategory === 'Todos'
      ? PRODUCTS
      : PRODUCTS.filter((item) => item.category === activeCategory);

  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const formatBrl = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const addToCart = (product: FloralProduct) => {
    setCart((prev) => {
      const existing = prev.find((entry) => entry.product.id === product.id);
      if (existing) {
        return prev.map((entry) =>
          entry.product.id === product.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((entry) =>
          entry.product.id === productId
            ? { ...entry, quantity: entry.quantity + delta }
            : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  };

  const isInCart = (productId: string) =>
    cart.some((entry) => entry.product.id === productId);

  const buildCartWhatsAppUrl = () => {
    const lines = cart.map(
      (item) =>
        `• ${item.quantity}x ${item.product.name} (${formatBrl(
          item.product.price * item.quantity
        )})`
    );
    const message = [
      'Olá! Gostaria de encomendar os seguintes itens da Floricultura Mundo da Flores:',
      '',
      ...lines,
      '',
      `Total estimado: ${formatBrl(totalPrice)}`,
      'Pode me informar a disponibilidade para entrega em Juiz de Fora?',
    ].join('\n');
    return buildWhatsAppUrl(message);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProduct(null);
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <section id="produtos" className="py-20 sm:py-28 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Cabeçalho da seção + filtros funcionais */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-hairline"
        >
          <div className="space-y-3 max-w-xl">
            <p className="text-sm font-bold text-leaf-deep">01. Catálogo Floral</p>
            <h2
              className="font-serif font-semibold text-ink leading-[1.1]"
              style={{ fontSize: 'clamp(1.95rem, 3.2vw, 2.85rem)' }}
            >
              Escolhas frescas para cada gesto
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div
              role="group"
              aria-label="Filtrar produtos por categoria"
              className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-surface-muted border border-hairline"
            >
              {CATEGORIES.map((category) => {
                const active = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={active}
                    className={`min-h-[40px] px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap shrink-0 transition-colors duration-150 ${
                      active
                        ? 'bg-leaf-deep text-white'
                        : 'text-ink-secondary hover:text-ink hover:bg-surface/80'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {totalCount > 0 && (
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-hairline-leaf bg-leaf-tint text-leaf-deep text-sm font-bold whitespace-nowrap shrink-0 hover:bg-leaf-soft transition-colors"
              >
                <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                <span className="tabular-nums">Meu pedido ({totalCount})</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Grade de produtos */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredProducts.map((product, index) => {
            const added = isInCart(product.id);
            const singleWhatsAppUrl = buildWhatsAppUrl(
              `Olá! Tenho interesse no item "${product.name}" (${product.priceFormatted}). Gostaria de confirmar a entrega.`
            );

            return (
              <motion.article
                key={product.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{
                  duration: 0.5,
                  delay: prefersReducedMotion ? 0 : Math.min((index % 3) * 0.07, 0.18),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col justify-between group"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                    className="w-full block relative text-left overflow-hidden rounded-2xl bg-surface-muted border border-hairline aspect-[4/3] focus-visible:outline-none"
                    aria-label={`Ver detalhes de ${product.name}`}
                  >
                    <ParallaxMedia
                      offset={PRODUCT_PARALLAX_OFFSETS[index % PRODUCT_PARALLAX_OFFSETS.length]}
                      className="absolute inset-0"
                    >
                      <BotanicalImage
                        src={product.image}
                        alt={product.alt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </ParallaxMedia>
                  </button>

                  <div className="mt-5 space-y-2">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-xs font-bold tracking-wider uppercase text-leaf-deep">
                        {product.category}
                      </span>
                      <span className="text-base font-bold text-ink tabular-nums">
                        {product.priceFormatted}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-semibold text-ink leading-snug">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        className="text-left hover:text-leaf-deep transition-colors"
                      >
                        {product.name}
                      </button>
                    </h3>

                    <p className="text-sm text-ink-secondary leading-relaxed">
                      {product.summary}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-hairline flex items-center gap-3">
                  <a
                    href={singleWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-leaf-deep text-white text-sm font-bold whitespace-nowrap hover:bg-leaf transition-colors duration-150"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Pedir no WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      addToCart(product);
                      setDrawerOpen(true);
                    }}
                    aria-label={`Adicionar ${product.name} à lista de pedido`}
                    className={`min-h-[44px] px-4 py-2.5 rounded-lg border text-sm font-bold whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 transition-colors duration-150 ${
                      added
                        ? 'border-leaf bg-leaf-tint text-leaf-deep'
                        : 'border-hairline bg-surface text-ink hover:border-leaf-deep hover:text-leaf-deep'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" aria-hidden="true" />
                        <span>Na lista</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" aria-hidden="true" />
                        <span>Somar</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Modal de Detalhes do Produto */}
      {selectedProduct && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/55 backdrop-blur-xs"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-surface border border-hairline overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-[4/3] md:aspect-auto bg-surface-muted">
                <BotanicalImage
                  src={selectedProduct.image}
                  alt={selectedProduct.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-leaf-deep">
                        {selectedProduct.category}
                      </p>
                      <h3
                        id="product-modal-title"
                        className="font-serif text-3xl font-semibold text-ink mt-1 leading-tight"
                      >
                        {selectedProduct.name}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedProduct(null)}
                      aria-label="Fechar detalhes"
                      className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-ink-secondary hover:bg-surface-muted hover:text-ink transition-colors shrink-0"
                    >
                      <X className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>

                  <p className="text-xl font-bold text-ink tabular-nums">
                    {selectedProduct.priceFormatted}
                  </p>

                  <p className="text-sm text-ink-secondary leading-relaxed">
                    {selectedProduct.details}
                  </p>

                  <div className="pt-3 border-t border-hairline">
                    <p className="text-xs font-bold text-ink uppercase tracking-wide mb-1">
                      Cuidado com as flores
                    </p>
                    <p className="text-sm text-ink-secondary leading-relaxed">
                      {selectedProduct.careTip}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={buildWhatsAppUrl(
                      `Olá! Quero encomendar "${selectedProduct.name}" (${selectedProduct.priceFormatted}).`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-leaf-deep text-white text-sm font-bold whitespace-nowrap hover:bg-leaf transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Pedir no WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                      setDrawerOpen(true);
                    }}
                    className="min-h-[44px] px-4 py-3 rounded-lg border border-hairline text-sm font-bold text-ink hover:border-leaf-deep hover:text-leaf-deep transition-colors whitespace-nowrap"
                  >
                    Adicionar à lista
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Drawer de Lista de Pedido */}
      {drawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-drawer-title"
          className="fixed inset-0 z-50 flex justify-end bg-ink/50 backdrop-blur-xs"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="w-full max-w-md bg-surface h-full flex flex-col justify-between border-l border-hairline shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-hairline flex items-center justify-between gap-4">
              <div>
                <h3
                  id="order-drawer-title"
                  className="font-serif text-2xl font-semibold text-ink"
                >
                  Seu pedido selecionado
                </h3>
                <p className="text-xs text-ink-muted mt-0.5">
                  Envie tudo de uma vez pelo WhatsApp
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Fechar lista de pedido"
                className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-ink-secondary hover:bg-surface-muted hover:text-ink"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {cart.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <p className="text-base text-ink-secondary">
                    Sua lista está vazia no momento.
                  </p>
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    className="min-h-[44px] px-5 py-2.5 rounded-lg border border-hairline text-sm font-bold text-leaf-deep hover:bg-leaf-tint transition-colors"
                  >
                    Voltar ao catálogo
                  </button>
                </div>
              ) : (
                cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 pb-5 border-b border-hairline last:border-b-0"
                  >
                    <div className="w-20 h-16 rounded-lg overflow-hidden bg-surface-muted border border-hairline shrink-0">
                      <BotanicalImage
                        src={product.image}
                        alt={product.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-lg font-semibold text-ink truncate">
                        {product.name}
                      </p>
                      <p className="text-sm text-ink-secondary tabular-nums">
                        {formatBrl(product.price * quantity)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, -1)}
                        aria-label={`Diminuir quantidade de ${product.name}`}
                        className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-hairline text-ink hover:bg-surface-muted"
                      >
                        <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                      <span className="w-7 text-center text-sm font-bold tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, 1)}
                        aria-label={`Aumentar quantidade de ${product.name}`}
                        className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-hairline text-ink hover:bg-surface-muted"
                      >
                        <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-hairline bg-ice space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold text-ink-secondary">
                    Subtotal estimado
                  </span>
                  <span className="font-serif text-2xl font-semibold text-ink tabular-nums">
                    {formatBrl(totalPrice)}
                  </span>
                </div>
                <a
                  href={buildCartWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-leaf-deep text-white text-sm font-bold hover:bg-leaf transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Enviar pedido no WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
