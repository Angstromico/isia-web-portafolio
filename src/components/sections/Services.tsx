'use client';

import React, { useRef } from 'react';
import { Compass, BarChart3, Wallet } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SplitText } from '@/lib/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    title: 'Consultoría Estratégica',
    description: 'Planificación personalizada para la adquisición y venta de activos inmobiliarios con visión de futuro.',
    icon: Compass,
  },
  {
    title: 'Análisis de Mercadeo',
    description: 'Aplicando fundamentos avanzados de Publicidad y Mercadeo para posicionar y evaluar propiedades en el mercado actual.',
    icon: BarChart3,
  },
  {
    title: 'Gestión de Inversiones',
    description: 'Administración y optimización de carteras inmobiliarias para perfiles de alto nivel y rentabilidad garantizada.',
    icon: Wallet,
  },
];

export const Services = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Split text title animation
      const split = SplitText.create('.services-title-split', {
        type: 'words,lines',
        mask: 'words',
      });

      if (split.words.length > 0) {
        gsap.fromTo(
          split.words,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.85,
            stagger: 0.04,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.services-title-split',
              start: 'top 90%',
              end: 'bottom 10%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // Section tag/intro elements entrance
      gsap.fromTo(
        '.services-tag-animate',
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.section-header-animate',
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Split text on descriptions inside service cards
      const serviceParagraphs = Array.from(container.current?.querySelectorAll('.service-card p') || []);
      serviceParagraphs.forEach((p) => {
        const splitP = SplitText.create(p as HTMLElement, {
          type: 'words',
          mask: 'words',
        });

        if (splitP.words.length > 0) {
          gsap.fromTo(
            splitP.words,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 0.8,
              stagger: 0.01,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: p,
                start: 'top 92%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        }
      });

      // Animate entry of cards from 0 opacity and scale 0.9 to 1 (repeats on scroll)
      gsap.fromTo(
        '.service-card',
        {
          scale: 0.9,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.5)',
          immediateRender: false,
          scrollTrigger: {
            trigger: container.current,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    },
    { scope: container }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Tilt the card towards the mouse and lift it slightly
    gsap.to(card, {
      rotateY: x * 0.08,
      rotateX: -y * 0.08,
      transformPerspective: 1000,
      y: -10,
      scale: 1.03,
      borderColor: 'rgba(185, 0, 19, 0.15)', // subtly highlight border
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 20px -8px rgba(185, 0, 19, 0.05)',
      duration: 0.3,
      ease: 'power2.out',
    });

    // Subtly shift the icon in the opposite direction for a 3D parallax effect
    const iconContainer = card.querySelector('.service-icon-container');
    if (iconContainer) {
      gsap.to(iconContainer, {
        x: -x * 0.12,
        y: -y * 0.12,
        scale: 1.08,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    
    // Return the card to its original position
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      y: 0,
      scale: 1,
      borderColor: 'rgba(26, 28, 28, 0.05)', // original border-on-surface/5
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)', // original shadow-sm
      duration: 0.5,
      ease: 'power2.out',
    });

    const iconContainer = card.querySelector('.service-icon-container');
    if (iconContainer) {
      gsap.to(iconContainer, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section id="servicios" ref={container} className="py-section-gap bg-surface-container-low overflow-hidden">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="text-center mb-16 section-header-animate">
          <span className="services-tag-animate text-primary font-display font-bold tracking-widest uppercase mb-4 block">
            Propuesta de Valor
          </span>
          <h2 className="services-title-split font-display text-4xl md:text-5xl font-bold text-on-surface">
            Servicios de Consultoría Élite
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service, i) => (
            <div
              key={i}
              className="service-card text-center bg-white p-10 rounded-xl shadow-sm border border-on-surface/5 cursor-default select-none"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="service-icon-container w-20 h-20 bg-primary/10 flex items-center justify-center rounded-full mx-auto mb-6 text-primary transition-all duration-300">
                <service.icon size={40} />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 text-on-surface">
                {service.title}
              </h3>
              <p className="text-on-surface-variant font-sans leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
