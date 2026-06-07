'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Button } from '../Button';
import { SplitText } from '@/lib/SplitText';

export const Hero = () => {
  const container = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const imageIndex = useRef(0);
  const images = ['/isia1.jpg', '/isia2.jpg', '/isia3.jpg'];

  useGSAP(
    () => {
      const tl = gsap.timeline();
      
      // Initial background scale animation
      tl.from('.hero-bg', {
        scale: 1.25,
        duration: 2.2,
        ease: 'power2.out',
      });

      // Word/line mask reveal animation
      tl.fromTo(
        '.hero-title-line',
        { y: '115%' },
        {
          y: '0%',
          duration: 1.2,
          stagger: 0.18,
          ease: 'power4.out',
        },
        '-=1.8'
      );

      // Split paragraph animation
      const splitP = SplitText.create('.hero-p-split', {
        type: 'words',
        mask: 'words',
      });

      if (splitP.words.length > 0) {
        tl.fromTo(
          splitP.words,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.85,
            stagger: 0.015,
            ease: 'power3.out',
          },
          '-=1.2'
        );
      }

      // Fade-in other elements (tags, buttons)
      tl.from(
        '.hero-content > *:not(h1):not(p)',
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        },
        '-=0.6'
      );
    },
    { scope: container }
  );

  const spawnImageTrail = (x: number, y: number) => {
    if (!container.current) return;

    // Create image container div
    const imgEl = document.createElement('div');
    imgEl.className =
      'absolute pointer-events-none select-none z-10 w-44 h-28 rounded-lg overflow-hidden border border-white/20 shadow-2xl opacity-0';
    imgEl.style.left = `${x}px`;
    imgEl.style.top = `${y}px`;
    imgEl.style.transform = 'translate(-50%, -50%) scale(0) rotate(-15deg)';

    // Create image element
    const imgTag = document.createElement('img');
    imgTag.src = images[imageIndex.current];
    imgTag.className = 'w-full h-full object-cover filter contrast-110';
    
    imgEl.appendChild(imgTag);
    container.current.appendChild(imgEl);

    // Cycle images
    imageIndex.current = (imageIndex.current + 1) % images.length;

    // Animate item in
    gsap.fromTo(
      imgEl,
      {
        opacity: 0,
        scale: 0.3,
        rotation: gsap.utils.random(-15, 0),
      },
      {
        opacity: 0.85,
        scale: 1,
        rotation: gsap.utils.random(-8, 12),
        duration: 0.45,
        ease: 'back.out(1.4)',
      }
    );

    // Animate item out and cleanup
    gsap.to(imgEl, {
      opacity: 0,
      scale: 0.4,
      rotation: gsap.utils.random(-25, 25),
      y: '+=30',
      duration: 0.7,
      delay: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        imgEl.remove();
      },
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!container.current) return;

    // 1. Mouse Parallax for Background Image
    const bg = container.current.querySelector('.hero-bg');
    if (bg) {
      const rect = container.current.getBoundingClientRect();
      const xVal = (e.clientX - rect.left - rect.width / 2) * -0.015;
      const yVal = (e.clientY - rect.top - rect.height / 2) * -0.015;
      gsap.to(bg, {
        x: xVal,
        y: yVal,
        duration: 0.6,
        ease: 'power2.out',
      });
    }

    // 2. Cursor Image Trail (spawns when distance exceeds threshold)
    const rect = container.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const threshold = 80;
    const lastX = lastPos.current.x;
    const lastY = lastPos.current.y;
    const distance = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));

    if (distance > threshold) {
      spawnImageTrail(x, y);
      lastPos.current = { x, y };
    }
  };

  return (
    <section
      ref={container}
      onMouseMove={handleMouseMove}
      className="relative h-screen flex items-center overflow-hidden cursor-default select-none"
    >
      <div className="absolute inset-0 z-0">
        <img
          className="hero-bg w-full h-full object-cover scale-[1.05]"
          src="/isia1.jpg"
          alt="Isia Villarroel Professional Real Estate"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent"></div>
      </div>
      
      <div className="relative z-20 max-w-container-max mx-auto px-gutter w-full">
        <div className="hero-content max-w-2xl text-white">
          <span className="text-primary font-display font-bold tracking-widest uppercase mb-4 block">
            Strategic Real Estate Partner
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl mb-6 leading-[1.1] font-extrabold flex flex-col gap-1">
            <span className="inline-block overflow-hidden h-auto py-1">
              <span className="hero-title-line inline-block transform">Tu Aliada Estratégica</span>
            </span>
            <span className="inline-block overflow-hidden h-auto py-1">
              <span className="hero-title-line inline-block transform">en Inversiones</span>
            </span>
            <span className="inline-block overflow-hidden h-auto py-1 text-primary">
              <span className="hero-title-line inline-block transform">Inmobiliarias de Élite</span>
            </span>
          </h1>
          <p className="hero-p-split font-sans text-lg md:text-xl mb-10 opacity-90 max-w-lg">
            Transformando el sector inmobiliario en Venezuela con visión vanguardista, transparencia and resultados de alto impacto para inversores exigentes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg">VER PORTAFOLIO</Button>
            <Button variant="outline" size="lg">CONTÁCTAME</Button>
          </div>
        </div>
      </div>
    </section>
  );
};
