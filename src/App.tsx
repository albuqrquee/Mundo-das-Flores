import { MotionConfig } from 'framer-motion';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CatalogSection } from './components/CatalogSection';
import { DeliveryAndAboutSection } from './components/DeliveryAndAboutSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-ice text-ink">
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-leaf-deep focus:text-white focus:font-bold"
        >
          Ir para o conteúdo principal
        </a>

        <Header />

        <main id="conteudo-principal" className="flex-1">
          <HeroSection />
          <CatalogSection />
          <DeliveryAndAboutSection />
          <GallerySection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
