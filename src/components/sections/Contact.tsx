'use client';

import React, { useRef, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SplitText } from '@/lib/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const Contact = () => {
  const container = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    interes: 'Comprar Inmueble',
    mensaje: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // GSAP Animations
  useGSAP(
    () => {
      // Floating abstract background elements
      gsap.to('.bg-shape-1', {
        x: '+=30',
        y: '+=20',
        rotation: 360,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.bg-shape-2', {
        x: '-=40',
        y: '-=30',
        rotation: -360,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Split text title animation
      const split = SplitText.create('.contact-title-split', {
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
              trigger: '.contact-title-split',
              start: 'top 90%',
              end: 'bottom 10%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // Split header description text
      const splitDesc = SplitText.create('.contact-desc-split', {
        type: 'words',
        mask: 'words',
      });

      if (splitDesc.words.length > 0) {
        gsap.fromTo(
          splitDesc.words,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.85,
            stagger: 0.012,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.contact-desc-split',
              start: 'top 92%',
              end: 'bottom 10%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // Split info card description text
      const splitInfoDesc = SplitText.create('.contact-info-desc-split', {
        type: 'words',
        mask: 'words',
      });

      if (splitInfoDesc.words.length > 0) {
        gsap.fromTo(
          splitInfoDesc.words,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.01,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.contact-info-desc-split',
              start: 'top 90%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // Section tag/intro elements entrance
      gsap.fromTo(
        '.contact-tag-animate',
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

      // Left Column (Info Card) entrance - slides left from center (elevator effect, always repeats)
      gsap.fromTo(
        '.contact-info-card',
        {
          xPercent: 35,
          opacity: 0,
        },
        {
          xPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: '.contact-info-card',
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Right Column (Form Card) entrance - slides right from center (elevator effect, always repeats)
      gsap.fromTo(
        '.contact-form-card',
        {
          xPercent: -35,
          opacity: 0,
        },
        {
          xPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: '.contact-form-card',
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Staggered inputs reveal (always repeats)
      gsap.fromTo(
        '.form-field',
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: '.contact-form-card',
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Split text on paragraphs inside contact info card
      const contactInfoParagraphs = Array.from(container.current?.querySelectorAll('.contact-info-card p') || []);
      contactInfoParagraphs.forEach((p) => {
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
    },
    { scope: container }
  );

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) tempErrors.nombre = 'El nombre es requerido';
    if (!formData.email.trim()) {
      tempErrors.email = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'El correo no es válido';
    }
    if (!formData.telefono.trim()) {
      tempErrors.telefono = 'El teléfono es requerido';
    } else if (!/^\+?[0-9\s-]{7,15}$/.test(formData.telefono.trim())) {
      tempErrors.telefono = 'Número de teléfono no válido';
    }
    if (!formData.mensaje.trim()) tempErrors.mensaje = 'Por favor, escriba un mensaje';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const selectInteres = (interes: string) => {
    setFormData((prev) => ({ ...prev, interes }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API request (1.5 seconds)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Play success transition animation with GSAP
      const tl = gsap.timeline();
      
      tl.to(formRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          if (formRef.current) formRef.current.style.display = 'none';
        },
      });

      tl.fromTo(
        successRef.current,
        {
          display: 'none',
          opacity: 0,
          scale: 0.9,
          y: 30,
        },
        {
          display: 'flex',
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.5)',
        }
      );

      // Pop in the checkmark inside the success message
      tl.fromTo(
        '.success-icon',
        { scale: 0, rotation: -45 },
        { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.8)' },
        '-=0.2'
      );
      
      // Stagger elements in success message
      tl.fromTo(
        '.success-text',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 },
        '-=0.3'
      );
    }, 1500);
  };

  const handleReset = () => {
    // Reset state
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      interes: 'Comprar Inmueble',
      mensaje: '',
    });
    setErrors({});
    setIsSubmitted(false);

    // Reset view visibility using GSAP
    if (formRef.current && successRef.current) {
      successRef.current.style.display = 'none';
      formRef.current.style.display = 'block';
      gsap.to(formRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const handleHeaderMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const title = e.currentTarget.querySelector('h2');
    const tag = e.currentTarget.querySelector('span');
    if (title) {
      gsap.to(title, {
        color: '#b90013', // primary red
        scale: 1.01,
        duration: 0.3,
        ease: 'power1.out',
      });
    }
    if (tag) {
      gsap.to(tag, {
        letterSpacing: '0.25em',
        duration: 0.3,
        ease: 'power1.out',
      });
    }
  };

  const handleHeaderMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const title = e.currentTarget.querySelector('h2');
    const tag = e.currentTarget.querySelector('span');
    if (title) {
      gsap.to(title, {
        color: 'var(--color-on-surface)',
        scale: 1,
        duration: 0.4,
        ease: 'power1.out',
      });
    }
    if (tag) {
      gsap.to(tag, {
        letterSpacing: '0.15em', // standard tracking-widest
        duration: 0.4,
        ease: 'power1.out',
      });
    }
  };

  return (
    <section id="contacto" ref={container} className="py-24 relative overflow-hidden bg-background">
      {/* Background patterns */}
      <div className="bg-shape-1 absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl pointer-events-none -z-10"></div>
      <div className="bg-shape-2 absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-container-max mx-auto px-gutter relative z-10">
        <div
          className="contact-header text-center mb-16 max-w-2xl mx-auto section-header-animate cursor-default"
          onMouseEnter={handleHeaderMouseEnter}
          onMouseLeave={handleHeaderMouseLeave}
        >
          <span className="contact-tag-animate text-primary font-display font-bold tracking-widest uppercase mb-4 block">
            Contacto de Élite
          </span>
          <h2 className="contact-title-split font-display text-4xl md:text-5xl font-bold mb-6 text-on-surface">
            Hablemos de su próxima inversión
          </h2>
          <p className="contact-desc-split font-sans text-lg text-on-surface-variant">
            Permítame asesorarle con el enfoque estratégico y profesional que sus metas financieras exigen. Agende una consulta privada o envíe un mensaje.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Info Card */}
          <div className="contact-info-card lg:col-span-5 flex flex-col justify-between bg-white border border-on-surface/5 p-8 md:p-10 rounded-2xl shadow-xl transition-expo hover:shadow-2xl">
            <div>
              <h3 className="font-display text-2xl font-bold mb-6 text-on-surface">
                Información de Contacto
              </h3>
              <p className="contact-info-desc-split font-sans text-on-surface-variant mb-10 leading-relaxed">
                Cada transacción de lujo requiere absoluta discreción y análisis técnico. Contácteme directamente a través de los siguientes canales oficiales.
              </p>

              {/* Items */}
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0 transition-expo hover:bg-primary hover:text-white">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold uppercase text-on-surface-variant tracking-wider mb-1">
                      Teléfono / WhatsApp
                    </h4>
                    <a
                      href="https://wa.me/584120000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-base font-bold text-on-surface hover:text-primary transition-colors block"
                    >
                      +58 (412) 000-0000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0 transition-expo hover:bg-primary hover:text-white">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold uppercase text-on-surface-variant tracking-wider mb-1">
                      Correo Electrónico
                    </h4>
                    <a
                      href="mailto:isia.villarroel@rentahouse.com.ve"
                      className="font-sans text-base font-bold text-on-surface hover:text-primary transition-colors block"
                    >
                      isia.villarroel@rentahouse.com.ve
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0 transition-expo hover:bg-primary hover:text-white">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold uppercase text-on-surface-variant tracking-wider mb-1">
                      Oficina Principal
                    </h4>
                    <p className="font-sans text-base font-bold text-on-surface">
                      Chuao, Caracas, Venezuela
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0 transition-expo hover:bg-primary hover:text-white">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold uppercase text-on-surface-variant tracking-wider mb-1">
                      Horario de Atención
                    </h4>
                    <p className="font-sans text-base font-bold text-on-surface">
                      Lunes a Viernes: 8:00 AM – 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-on-surface/10">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-[#5d3f3c] opacity-60 block mb-3">
                Afiliada a Rentahouse Venezuela
              </span>
              <p className="font-sans text-xs text-[#5d3f3c] opacity-80 leading-relaxed">
                Garantizamos máxima seguridad jurídica en sus operaciones de compra, venta y alquiler de bienes raíces residenciales y comerciales.
              </p>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="contact-form-card lg:col-span-7 bg-white border border-on-surface/5 p-8 md:p-10 rounded-2xl shadow-xl transition-expo hover:shadow-2xl flex flex-col justify-center min-h-[500px]">
            
            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-field flex flex-col">
                  <label htmlFor="nombre" className="font-sans text-sm font-bold text-on-surface mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Ej. Carlos Mendoza"
                    className={`font-sans px-4 py-3 rounded-xl border bg-background text-on-surface placeholder:text-on-surface/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                      errors.nombre ? 'border-primary' : 'border-on-surface/10 focus:border-primary'
                    }`}
                  />
                  {errors.nombre && (
                    <span className="text-primary text-xs font-bold mt-1 font-sans">{errors.nombre}</span>
                  )}
                </div>

                <div className="form-field flex flex-col">
                  <label htmlFor="telefono" className="font-sans text-sm font-bold text-on-surface mb-2">
                    Teléfono de Contacto
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="Ej. +58 412 1234567"
                    className={`font-sans px-4 py-3 rounded-xl border bg-background text-on-surface placeholder:text-on-surface/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                      errors.telefono ? 'border-primary' : 'border-on-surface/10 focus:border-primary'
                    }`}
                  />
                  {errors.telefono && (
                    <span className="text-primary text-xs font-bold mt-1 font-sans">{errors.telefono}</span>
                  )}
                </div>
              </div>

              <div className="form-field flex flex-col">
                <label htmlFor="email" className="font-sans text-sm font-bold text-on-surface mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="carlos@inversiones.com"
                  className={`font-sans px-4 py-3 rounded-xl border bg-background text-on-surface placeholder:text-on-surface/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                    errors.email ? 'border-primary' : 'border-on-surface/10 focus:border-primary'
                  }`}
                />
                {errors.email && (
                  <span className="text-primary text-xs font-bold mt-1 font-sans">{errors.email}</span>
                )}
              </div>

              {/* Interest Selector */}
              <div className="form-field flex flex-col">
                <span className="font-sans text-sm font-bold text-on-surface mb-3">
                  ¿En qué tipo de servicio está interesado?
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Comprar Inmueble', 'Vender Propiedad', 'Alquiler Comercial', 'Asesoría General'].map(
                    (option) => (
                      <button
                        type="button"
                        key={option}
                        onClick={() => selectInteres(option)}
                        className={`font-sans py-2.5 px-3 rounded-xl border text-xs font-bold text-center transition-expo uppercase tracking-wider ${
                          formData.interes === option
                            ? 'bg-primary border-primary text-white scale-102 shadow-md'
                            : 'bg-background border-on-surface/10 text-on-surface-variant hover:border-primary/50 hover:text-on-surface'
                        }`}
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="form-field flex flex-col">
                <label htmlFor="mensaje" className="font-sans text-sm font-bold text-on-surface mb-2">
                  Mensaje / Detalles de la Inversión
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  placeholder="Describa brevemente qué tipo de propiedad busca o qué requerimientos específicos posee."
                  className={`font-sans px-4 py-3 rounded-xl border bg-background text-on-surface placeholder:text-on-surface/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none ${
                    errors.mensaje ? 'border-primary' : 'border-on-surface/10 focus:border-primary'
                  }`}
                />
                {errors.mensaje && (
                  <span className="text-primary text-xs font-bold mt-1 font-sans">{errors.mensaje}</span>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-field pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 bg-primary text-on-primary hover:bg-primary/95 font-display font-bold uppercase tracking-wider py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-75 duration-300 scale-100 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Procesando solicitud...</span>
                    </>
                  ) : (
                    <>
                      <span>Enviar Solicitud Privada</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Success State (Hidden by default, animated in via GSAP) */}
            <div
              ref={successRef}
              className="hidden flex-col items-center text-center p-6 md:p-10 space-y-6"
            >
              <div className="success-icon w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 size={48} className="stroke-[2.5]" />
              </div>
              <div className="space-y-3">
                <h3 className="success-text font-display text-3xl font-bold text-on-surface">
                  ¡Mensaje Enviado con Éxito!
                </h3>
                <p className="success-text font-sans text-on-surface-variant text-lg max-w-md mx-auto">
                  Gracias por ponerse en contacto, Sr(a). <span className="font-bold text-on-surface">{formData.nombre}</span>. 
                  He recibido su solicitud sobre <span className="font-bold text-primary">{formData.interes}</span> y le contactaré a la brevedad para agendar nuestra reunión.
                </p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="success-text inline-flex items-center gap-2 text-primary font-display font-bold uppercase tracking-wider text-sm border-b-2 border-primary pb-1 hover:text-primary/80 hover:border-primary/80 transition-colors"
              >
                <span>Enviar otro mensaje</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
