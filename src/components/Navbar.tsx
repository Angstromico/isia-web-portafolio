'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from './Button';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const Navbar = () => {
  const container = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(
    () => {
      if (isOpen) {
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';

        gsap.to(backdropRef.current, {
          opacity: 1,
          pointerEvents: 'auto',
          duration: 0.4,
          ease: 'power2.out',
        });

        gsap.to(menuRef.current, {
          x: 0,
          duration: 0.5,
          ease: 'power3.out',
        });

        gsap.fromTo(
          '.mobile-nav-link',
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.4,
            ease: 'power2.out',
            delay: 0.1,
          }
        );
      } else {
        // Re-enable body scroll
        document.body.style.overflow = '';

        gsap.to(backdropRef.current, {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.3,
          ease: 'power2.in',
        });

        gsap.to(menuRef.current, {
          x: '100%',
          duration: 0.4,
          ease: 'power3.in',
        });
      }
    },
    { dependencies: [isOpen], scope: container }
  );

  const navLinks = [
    { label: 'Sobre Mí', href: '#about' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav
      ref={container}
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out border-b',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md py-3 border-on-surface/10 shadow-sm'
          : 'bg-transparent py-5 border-transparent'
      )}
    >
      <div className="max-w-container-max mx-auto px-gutter flex justify-between items-center relative z-50">
        <Link href="/" className="font-display text-lg sm:text-xl lg:text-2xl font-bold flex items-center z-50 whitespace-nowrap">
          <span className={cn(
            'transition-colors duration-300',
            isOpen ? 'text-on-surface' : (isScrolled ? 'text-on-surface' : 'text-white')
          )}>
            Isia Villarroel
          </span>
          <span className="mx-1 sm:mx-2 text-primary">|</span>
          <span className="text-primary">Rentahouse</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-6 xl:gap-8 items-center">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'font-sans text-xs xl:text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors',
                isScrolled ? 'text-on-surface' : 'text-white'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <Button size="md">Agendar Cita</Button>
          </div>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-50 lg:hidden focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            <span
              className={cn(
                'w-6 h-0.5 transition-all duration-300 transform rounded-full',
                isOpen ? 'bg-on-surface rotate-45 translate-y-2' : (isScrolled ? 'bg-on-surface' : 'bg-white')
              )}
            />
            <span
              className={cn(
                'w-6 h-0.5 transition-all duration-300 rounded-full',
                isOpen ? 'opacity-0' : (isScrolled ? 'bg-on-surface' : 'bg-white')
              )}
            />
            <span
              className={cn(
                'w-6 h-0.5 transition-all duration-300 transform rounded-full',
                isOpen ? 'bg-on-surface -rotate-45 -translate-y-2' : (isScrolled ? 'bg-on-surface' : 'bg-white')
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleLinkClick}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[40] opacity-0 pointer-events-none transition-opacity duration-300"
      />

      {/* Mobile Menu Drawer */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-screen w-full sm:w-[380px] bg-white border-l border-on-surface/5 z-[45] translate-x-full shadow-2xl p-8 pt-28 flex flex-col justify-between"
      >
        <div className="flex flex-col gap-6">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-[#5d3f3c] opacity-60 border-b border-on-surface/10 pb-4">
            Navegación
          </span>
          <div className="flex flex-col gap-6">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={handleLinkClick}
                className="mobile-nav-link font-display text-2xl font-bold text-on-surface hover:text-primary transition-colors block py-2 uppercase tracking-wide"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Button size="lg" className="w-full" onClick={handleLinkClick}>
            Agendar Cita
          </Button>
          <div className="text-center font-sans text-xs text-on-surface-variant opacity-60" suppressHydrationWarning>
            © {new Date().getFullYear()} Isia Villarroel | Rentahouse.
          </div>
        </div>
      </div>
    </nav>
  );
};
