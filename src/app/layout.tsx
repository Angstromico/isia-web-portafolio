import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import './globals.css';

export const metadata: Metadata = {
  title: 'Isia Villarroel | Rentahouse Venezuela - Real Estate Partner',
  description: 'Tu Aliada Estratégica en Inversiones Inmobiliarias de Élite en Venezuela. Transparencia, profesionalismo y resultados de alto impacto.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth h-full antialiased">
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
