'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { SplitText } from '@/components/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: 'Centro Corporativo "El Rosal"',
    location: 'Caracas, Venezuela',
    impact: 'Comercialización exclusiva de 15,000m² de oficinas AAA. 100% de ocupación en 12 meses.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5WUBdqpkXsVu4klnSVUPMvZdSkKQB_rppG2HehGnuyPdDzKr59YXg1RRS2VzX3BWT2tCINovhtjLFq0JQK33sLqyEODCm18otBCwkd0j8YfYXVcCIl9y0Srt5dKLdQvLhcIuOTvnyrFlYAtavbBZvpmDBF9FwjlfHR71QPj4QDDpg1lGT3fhYQraKhe2h1dFOTDLucv5vVPafH_7RVAPa783NSj8CXQ8RELZci6M-3k9iAegQCuS_aHZuen_HX_JbF7VMb3xMoaQv',
  },
  {
    title: 'Desarrollo "Marina del Sol"',
    location: 'Lechería, Anzoátegui',
    impact: 'Estructuración de portafolio para inversionistas extranjeros. Rendimiento del 18% anual proyectado.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBn8Anm-8whrMVLw3U25XIKl4bE8oOXvdCXL_TmffhWLbZ1UFY3XqlPMlsqgtDnsl9MrVZeX2lCx4J5r_gVkGBuVBrLf77cPZgukArC2F5ALGMkcOQZIJll-G294xJyUqiVngOWI7x8-4M1a7nALw4fCQsgbNX2zQn1ODhe-dSKcae3vLIoYEUI07VC1Oc-yKlB6L-i4Y4qZgQ3CQOpZHqxmLx_8YiZx5H7bEfYlzNINM1uhrmcrwa5aP5tblgzsrFtuIvc9ZyzkLH5',
  },
  {
    title: 'Hub Logístico Industrial',
    location: 'Valencia, Carabobo',
    impact: 'Consultoría estratégica para relocalización de multinacional. Optimización de costos operativos en un 25%.',
    image: '/isia3.jpg',
  },
];

export const Projects = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Split text title animation
      gsap.fromTo(
        '.projects-title-split-word',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.85,
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-title-split-word',
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Section tag/intro elements entrance
      gsap.fromTo(
        '.projects-tag-animate',
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

      // Split header description text
      gsap.fromTo(
        '.projects-desc-split-word',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.85,
          stagger: 0.012,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-desc-split-word',
            start: 'top 92%',
            end: 'bottom 10%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Cards staggered entry (repeats on scroll)
      gsap.fromTo(
        '.project-card',
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.18,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: container.current,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Smooth parallax on images inside the cards
      gsap.utils.toArray('.project-img-parallax').forEach((img: any) => {
        gsap.fromTo(
          img,
          { yPercent: -10, scale: 1.15 },
          {
            yPercent: 10,
            scale: 1.15,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.project-card'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });

      // Split text on paragraphs inside project cards
      gsap.fromTo(
        '.project-card-p-word',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.8,
          stagger: 0.01,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.project-card',
            start: 'top 92%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    },
    { scope: container }
  );

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: -10,
      scale: 1.02,
      borderColor: 'rgba(185, 0, 19, 0.15)', // subtly highlight border
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 20px -8px rgba(185, 0, 19, 0.04)',
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      borderColor: 'rgba(26, 28, 28, 0.05)', // original border-on-surface/5
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)', // original shadow-sm
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  return (
    <section id="proyectos" ref={container} className="py-section-gap bg-white overflow-hidden">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 section-header-animate">
          <div>
            <span className="projects-tag-animate text-primary font-display font-bold tracking-widest uppercase mb-4 block">
              Track Record
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-on-surface">
              <SplitText text="Proyectos Destacados" spanClassName="projects-title-split-word" />
            </h2>
          </div>
          <p className="text-on-surface-variant max-w-md font-sans text-right hidden md:block">
            <SplitText
              text="Una selección de consultorías estratégicas y desarrollos inmobiliarios gestionados con éxito rotundo."
              spanClassName="projects-desc-split-word"
            />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div
              key={i}
              className="project-card group bg-background border border-on-surface/5 rounded-2xl p-4 shadow-sm cursor-pointer flex flex-col justify-between"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div>
                <div className="relative overflow-hidden aspect-video mb-6 rounded-xl">
                  <img
                    className="project-img-parallax w-full h-full object-cover transform origin-center"
                    src={project.image}
                    alt={project.title}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white border border-white px-5 py-2 font-display font-bold text-xs uppercase tracking-widest">
                      DETALLES
                    </span>
                  </div>
                </div>
                <h3 className="font-display text-xl font-bold mb-1 text-on-surface group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-primary font-display font-bold text-xs mb-4 uppercase tracking-wider">
                  <SplitText text={project.location} spanClassName="project-card-p-word" />
                </p>
              </div>
              
              <div className="bg-surface border-l-4 border-primary p-4 rounded-r-lg mt-4">
                <p className="text-on-surface-variant font-sans text-sm leading-relaxed">
                  <strong className="text-on-surface">Impacto:</strong>{' '}
                  <SplitText text={project.impact} spanClassName="project-card-p-word" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
