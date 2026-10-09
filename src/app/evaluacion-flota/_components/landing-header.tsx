'use client';

import { BrandLogo } from '@/components/brand/BrandLogo';
import { HomeLink } from './home-link';
import { ScrollToFormButton } from './scroll-to-form-button';

export function LandingHeader() {
  return (
    <header className="ef-header">
      <div className="ef-wrap ef-header-inner">
        <HomeLink className="ef-brand">
          <BrandLogo className="ef-logo" priority />
          <span>WINFIN · Tecnología embarcada</span>
        </HomeLink>
        <nav aria-label="Navegación de evaluación de flota" className="ef-nav">
          <a href="#proceso">Cómo funciona</a>
          <a href="#winfin">Por qué WINFIN</a>
          <ScrollToFormButton variant="link" className="ef-header-cta">Evaluar mi flota ↗</ScrollToFormButton>
        </nav>
      </div>
    </header>
  );
}
