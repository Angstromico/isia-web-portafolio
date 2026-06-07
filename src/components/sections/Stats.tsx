'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SplitText } from '@/components/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { label: 'Proyectos Gestionados', value: 42, prefix: '', suffix: '' },
  { label: 'Inversión Movilizada', value: 15, prefix: '$', suffix: 'M+' },
  { label: 'Años en la Red', value: 8, prefix: '', suffix: '' },
];

export const Stats = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Numbers count up (repeating on scroll)
      stats.forEach((_, i) => {
        const counter = { val: 0 };
        const target = stats[i].value;
        const el = container.current?.querySelectorAll('.stat-value')[i] as HTMLElement;

        if (el) {
          gsap.fromTo(
            counter,
            { val: 0 },
            {
              val: target,
              duration: 2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 92%',
                toggleActions: 'play reverse play reverse',
              },
              onUpdate: () => {
                if (el) el.textContent = Math.floor(counter.val).toString();
              },
            }
          );
        }
      });

      // Animate split text on stats labels
      gsap.fromTo(
        '.stat-item-p-word',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.6,
          stagger: 0.02,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.stat-item',
            start: 'top 92%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Stagger items entry
      gsap.fromTo(
        '.stat-item',
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: container.current,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="bg-white py-16 border-b border-on-surface/5 overflow-hidden">
      <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {stats.map((stat, i) => (
          <div key={i} className="stat-item">
            <div className="flex justify-center items-baseline gap-1 text-primary font-display text-5xl font-extrabold mb-2">
              <span>{stat.prefix}</span>
              <span className="stat-value">0</span>
              <span>{stat.suffix}</span>
            </div>
            <p className="font-sans text-sm font-bold uppercase text-on-surface-variant tracking-wider">
              <SplitText text={stat.label} spanClassName="stat-item-p-word" />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
