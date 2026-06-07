'use client';

import React, { useRef } from 'react';
import { Button } from '../Button';
import { CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SplitText } from '@/lib/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const About = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Image entrance animation - always repeats
      gsap.fromTo(
        '.about-image',
        {
          x: -50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: '.about-image',
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Image scroll parallax
      gsap.fromTo(
        '.about-img-parallax',
        { yPercent: -10, scale: 1.15 },
        {
          yPercent: 10,
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-image',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Decorative items parallax
      gsap.to('.about-decor-1', {
        y: -50,
        rotation: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-image',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('.about-decor-2', {
        y: 40,
        rotation: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-image',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Split text title animation
      const split = SplitText.create('.about-title-split', {
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
              trigger: '.about-title-split',
              start: 'top 90%',
              end: 'bottom 10%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // Section tag/intro elements entrance
      gsap.fromTo(
        '.about-tag-animate',
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

      // Split text on paragraphs inside about-body
      const bodyParagraphs = Array.from(container.current?.querySelectorAll('.about-body p') || []);
      bodyParagraphs.forEach((p) => {
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
              stagger: 0.012,
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

      // Animate check circles list and button (non-p elements inside about-body)
      gsap.fromTo(
        '.about-body > *:not(p)',
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: '.about-body',
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <section id="about" ref={container} className="py-section-gap bg-surface overflow-hidden">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="about-image relative">
            <div className="aspect-[4/5] bg-surface-container-high rounded-lg overflow-hidden shadow-2xl relative z-10">
              <img
                className="about-img-parallax w-full h-full object-cover transform origin-center"
                src="/isia2.jpg"
                alt="Isia Villarroel"
              />
            </div>
            <div className="about-decor-1 absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 -z-0 rounded-lg"></div>
            <div className="about-decor-2 absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-primary/30 -z-0"></div>
          </div>

          <div className="about-content">
            <div className="section-header-animate mb-8">
              <span className="about-tag-animate text-primary font-display font-bold tracking-widest uppercase mb-4 block">
                Sobre Mí
              </span>
              <h2 className="about-title-split font-display text-4xl md:text-5xl font-bold text-on-surface leading-tight">
                Profesionalismo, Juventud y Resultados Tangibles.
              </h2>
            </div>
            
            <div className="about-body">
              <p className="font-sans text-lg text-on-surface-variant mb-6">
                Soy Isia Villarroel, Asesora Inmobiliaria y Estratega en Ventas con formación en Publicidad y Mercadeo. Mi enfoque combina la frescura de una visión joven con la rigurosidad de una estratega, asegurando que cada inversión sea sólida y rentable para perfiles de alto nivel.
              </p>
              <p className="font-sans text-lg text-on-surface-variant mb-10">
                A mis 23 años aporto una perspectiva innovadora al mercado de Rentahouse. Mi compromiso es ayudar a cada cliente a encontrar la inversión precisa, respaldada por un análisis exhaustivo y una ética profesional inquebrantable.
              </p>
              
              <div className="flex flex-col gap-4 mb-10">
                {[
                  'Especialista en Inversiones de Alto Nivel',
                  'Asesoría Legal y Tributaria Integral',
                  'Red de Contactos Global',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary w-6 h-6" />
                    <span className="font-sans font-bold text-on-surface">{item}</span>
                  </div>
                ))}
              </div>
              
              <Button size="lg">DESCARGAR CV / PORTAFOLIO</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
