'use client';

import React from 'react';
import Link from 'next/link';
import { Share2, Phone, Mail, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-surface-container-highest border-t border-on-surface/10 py-16 bg-[#e2e2e2]">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="flex flex-col md:flex-row justify-between mb-12 gap-8">
          <div className="md:w-1/3">
            <h2 className="font-display text-2xl font-bold text-on-surface mb-6">
              Isia Villarroel <span className="text-primary">|</span> Rentahouse
            </h2>
            <p className="text-on-surface-variant mb-6 font-sans text-sm leading-relaxed text-[#5d3f3c]">
              Agente Asociado a la red líder en Venezuela. Compromiso, ética y visión estratégica en cada transacción.
            </p>
            <div className="flex gap-4">
              <a
                aria-label="Compartir"
                className="w-10 h-10 bg-on-surface/5 hover:bg-primary hover:text-white flex items-center justify-center rounded-full transition-all text-on-surface"
                href="#"
              >
                <Share2 size={18} />
              </a>
              <a
                aria-label="Llamar"
                className="w-10 h-10 bg-on-surface/5 hover:bg-primary hover:text-white flex items-center justify-center rounded-full transition-all text-on-surface"
                href="#"
              >
                <Phone size={18} />
              </a>
              <a
                aria-label="Correo"
                className="w-10 h-10 bg-on-surface/5 hover:bg-primary hover:text-white flex items-center justify-center rounded-full transition-all text-on-surface"
                href="#"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-display text-sm font-bold uppercase text-on-surface tracking-wider">
              Mi Perfil
            </p>
            <Link className="text-on-surface-variant hover:text-primary transition-all text-sm font-sans" href="#sobre-mí">
              Sobre Mí
            </Link>
            <Link className="text-on-surface-variant hover:text-primary transition-all text-sm font-sans" href="#proyectos">
              Portafolio
            </Link>
            <Link className="text-on-surface-variant hover:text-primary transition-all text-sm font-sans" href="#servicios">
              Servicios
            </Link>
            <Link className="text-on-surface-variant hover:text-primary transition-all text-sm font-sans" href="#contacto">
              Blog de Inversión
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-display text-sm font-bold uppercase text-on-surface tracking-wider">
              Contacto
            </p>
            <Link className="text-on-surface-variant hover:text-primary transition-all text-sm font-sans" href="#contacto">
              Agendar Cita
            </Link>
            <Link className="text-on-surface-variant hover:text-primary transition-all text-sm font-sans" href="#contacto">
              Oficina Caracas
            </Link>
            <Link className="text-on-surface-variant hover:text-primary transition-all text-sm font-sans" href="#contacto">
              Agent Portal (RH)
            </Link>
            <Link className="text-on-surface-variant hover:text-primary transition-all text-sm font-sans" href="#contacto">
              Soporte
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-on-surface/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-surface-variant text-sm font-sans" suppressHydrationWarning>
            © {new Date().getFullYear()} Isia Villarroel | Rentahouse Venezuela. Todos los derechos reservados.
          </p>
          <div className="flex gap-8">
            <span className="flex items-center gap-2 text-on-surface-variant text-sm font-sans">
              <Globe size={16} /> Basado en Caracas, Venezuela
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
