'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, FileText, Phone } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { BrandLogo } from '../brand/BrandLogo';
import { useContactSlideOver } from '@/context/contact-slideover-provider';

export function Footer() {
  const { translations } = useLanguage();
  const t = translations.footer;
  const navLinks = translations.navigationLinks;
  const { openContactSlideOver } = useContactSlideOver();
  const businessLinks = [
    { href: '/quienes-somos', label: 'Quiénes somos' },
    { href: '/#why-winfin', label: 'Capacidades' },
    { href: '/#faq', label: 'FAQs' },
  ];
  const solutionLinks = [
    { href: '/adas-autobuses', label: 'ADAS Autobuses' },
    { href: '/adas-camiones', label: 'ADAS Camiones' },
    { href: '/anti-atropellos-peatones-ciclistas', label: 'Anti-Atropellos' },
    { href: '/vision-360-vehiculos-industriales', label: 'Vehículos Industriales' },
    { href: '/camaras-vision-artificial-flotas', label: 'Visión Artificial' },
  ];
  const rinCertificateHref = '/Certificados%20Empresa/RIN%20Titulo.pdf';
  const ministryLogoHref = '/Certificados%20Empresa/ministerio-1.png';
  const crtmSupportHref = '/Certificados%20Empresa/manual_crtm_web.pdf';
  const crtmLogoHref = '/Certificados%20Empresa/logo-consorcio-rgb-positivo.png';

  return (
    <footer className="border-t border-slate-800 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_26%),linear-gradient(180deg,#0f172a,#020617)] text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_0.95fr_1.05fr] lg:gap-6">
          <div className="flex flex-col items-start gap-5 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm md:p-6">
            <Link href="/" className="flex items-center gap-2">
              <BrandLogo className="h-8 w-auto" />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-slate-300 md:text-base">
              Ingeniería e implantación de sistemas ADAS, visión 360° y detección inteligente para autobuses, camiones, vehículos municipales e industriales.
            </p>
            <a
              href="https://www.winfin.es"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              www.winfin.es
            </a>
            <div className="grid w-full gap-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Madrid · Oficina y taller</div>
                <div className="mt-2 text-sm font-medium text-slate-200">Moreras, 1, N 65 y 66 · 28350 Ciempozuelos, Madrid</div>
                <a href="tel:+34914520406" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-slate-200">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span>+34 914 520 406</span>
                </a>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Donostia / San Sebastián · Oficina y taller</div>
                <div className="mt-2 text-sm font-medium text-slate-200">P. Mikeletegui, 56, of 314 · 20009 Donostia / San Sebastián, Guipúzcoa</div>
                <div className="mt-2 text-xs font-medium text-slate-400">Campus de Donostia del Parke, Parque Tecnológico de Euskadi</div>
                <a
                  href="https://parke.eus/campus/donostia/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center rounded-xl border border-white/10 bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition-colors hover:bg-slate-50"
                  aria-label="Ver campus de Donostia del Parke"
                >
                  <div className="relative h-8 w-28">
                    <Image
                      src="/images/parke-B-eu.png"
                      alt="Logo del Parke, Parque Tecnológico de Euskadi"
                      fill
                      sizes="112px"
                      className="object-contain object-left"
                    />
                  </div>
                </a>
                <a href="tel:+34943284721" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-slate-200">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span>+34 943 284 721</span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm md:p-6">
            <h4 className="font-headline text-sm font-semibold uppercase tracking-[0.2em] text-white/70">Empresa</h4>
            {businessLinks.map((link) => (
              <Link key={link.href} href={link.href} className="min-h-[40px] text-slate-300 transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
            <button
              onClick={openContactSlideOver}
              className="min-h-[40px] text-left text-slate-300 transition-colors hover:text-white"
            >
              Contacto
            </button>
          </div>

          <div className="flex flex-col gap-3 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm md:p-6">
            <h4 className="font-headline text-sm font-semibold uppercase tracking-[0.2em] text-white/70">Soluciones</h4>
            {solutionLinks.map((link) => (
              <Link key={link.href} href={link.href} className="min-h-[40px] text-slate-300 transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm md:p-6">
            <h4 className="font-headline text-sm font-semibold uppercase tracking-[0.2em] text-white/70">Contacto técnico y comercial</h4>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Email</div>
              <a href="mailto:info@vision360ia.com" className="mt-2 block text-sm font-medium text-slate-200 transition-colors hover:text-white">
                info@vision360ia.com
              </a>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Ámbito</div>
              <div className="mt-2 text-sm font-medium text-slate-200">Autobuses, camiones, vehículos municipales e industriales con despliegue sobre flota profesional</div>
            </div>
            <button
              onClick={openContactSlideOver}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-[0_16px_36px_rgba(245,158,11,0.2)] transition-colors hover:bg-accent/90"
            >
              Solicitar revisión técnica <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-emerald-400/10 px-4 py-4 shadow-[0_18px_40px_rgba(2,6,23,0.18)] md:px-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="w-full max-w-[220px] shrink-0 rounded-xl bg-white px-3 py-3">
                <div className="relative h-10 w-full sm:h-12">
                  <Image
                    src={ministryLogoHref}
                    alt="Ministerio para la Transformación Digital y de la Función Pública"
                    fill
                    sizes="220px"
                    className="object-contain object-left"
                  />
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-100/75">Habilitación oficial</div>
                <p className="mt-2 text-sm leading-relaxed text-slate-100">
                  WINFIN Instalaciones S.L. está habilitada oficialmente para instalaciones de telecomunicación tipo E, según título RIN otorgado por el Ministerio.
                </p>
                <a
                  href={rinCertificateHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex min-h-[40px] items-center gap-2 text-sm font-semibold text-emerald-100 transition-colors hover:text-white"
                >
                  <FileText className="h-4 w-4" />
                  Consultar título RIN
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-red-500/15 px-4 py-4 shadow-[0_18px_40px_rgba(2,6,23,0.18)] md:px-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="w-full max-w-[220px] shrink-0 rounded-xl bg-white px-3 py-3">
                <div className="relative h-12 w-full sm:h-14">
                  <Image
                    src={crtmLogoHref}
                    alt="Consorcio Regional de Transportes de Madrid"
                    fill
                    sizes="220px"
                    className="object-contain object-left"
                  />
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-100/80">Experiencia en movilidad pública</div>
                <p className="mt-2 text-sm leading-relaxed text-slate-100">
                  WINFIN participa en proyectos de innovación y digitalización del transporte público en colaboración con el Consorcio Regional de Transportes de Madrid.
                </p>
                <a
                  href={crtmSupportHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex min-h-[40px] items-center gap-2 text-sm font-semibold text-red-100 transition-colors hover:text-white"
                >
                  <FileText className="h-4 w-4" />
                  Ver colaboración acreditada
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-slate-800/90 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Vision360IA. {t.copyright}</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/aviso-legal" className="transition-colors hover:text-white">{t.legal.legalNotice}</Link>
            <Link href="/privacidad" className="transition-colors hover:text-white">{t.legal.privacy}</Link>
            <Link href="/cookies" className="transition-colors hover:text-white">{t.legal.cookies}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
