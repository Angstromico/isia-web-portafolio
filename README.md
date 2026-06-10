# Isia Villarroel | Rentahouse Venezuela
### Tu Aliada Estratégica en Inversiones Inmobiliarias de Élite

Un sitio web de aterrizaje (landing page) de ultra-lujo y alto rendimiento diseñado para la consultoría inmobiliaria de alto nivel en Caracas y toda Venezuela. Inspirado en las interfaces web premium del sector de Awwwards (ej. MODUS Projects), este sitio destaca por su fluidez interactiva, animaciones tridimensionales complejas, rendimiento optimizado y diseño totalmente adaptativo (UX/UI responsive).

---

## ✨ Características y Efectos Interactivos

El sitio web está potenciado por **GSAP (GreenSock Animation Platform)** y **Lenis**, logrando una experiencia de usuario sumamente pulida:

* **🌀 Rastro de Imágenes Interactivo (Cursor Trail):** Al mover el puntero dentro de la sección Hero, se despliega una estela de fotografías inmobiliarias exclusivas de alta definición. Las imágenes rotan y se escalan de forma aleatoria antes de desvanecerse físicamente con gravedad simulada.
* **🚪 Entrada Estilo Ascensor (Symmetrical Horizontal Split):** La sección de contacto se abre como las puertas de un ascensor. El bloque de información (izquierda) y el bloque del formulario (derecha) se deslizan hacia los lados desde el eje central de división cuando entran al viewport.
* **🏷️ Enmascarado de Texto de Lujo (`SplitText`):** Los títulos y todos los párrafos (`<p>`) del sitio web revelan su contenido palabra por palabra emergiendo desde una máscara oculta (`overflow-hidden`), proporcionando una lectura fluida, sofisticada y con cero saltos de renderizado.
* **🔄 Animación de Scroll Bidireccional (`toggleActions`):** Los elementos del sitio web se animan tanto de bajada como de subida. Si el usuario vuelve a subir, los títulos, descripciones y componentes regresan a su estado oculto para volver a actuar en su próxima aparición.
* **🧊 Efecto 3D Tilt en Tarjetas:** Las tarjetas de servicios reaccionan a la posición exacta del mouse en el plano `(X, Y)`, inclinándose tridimensionalmente con perspectiva real (`rotateX`, `rotateY`). Los iconos internos se desplazan en dirección contraria al puntero para acentuar el efecto de profundidad (parallax interno).
* **🛤️ Paralaje en Imágenes de Fondo:** Las imágenes principales de la sección *Sobre Mí* y del portafolio se desplazan a una velocidad amortiguada diferente a la del scroll principal del usuario, emulando una lente flotante.
* **🛹 Desplazamiento Inercial Suave (Smooth Scroll):** Potenciado por **Lenis**, que sincroniza e iguala los tiempos de cuadros entre la rueda del ratón y las respuestas visuales de GSAP ScrollTrigger.

---

## 🛠️ Stack Tecnológico

* **Core:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)
* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
* **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) (Directiva nativa `@import` y definición de tema en CSS)
* **Animaciones:** [GSAP 3](https://greensock.com/) con el hook oficial `@gsap/react`
* **Smooth Scroll:** [Lenis](https://lenis.darkroom.engineering/)
* **Iconos:** [Lucide React](https://lucide.dev/)

---

## 📂 Estructura de Carpetas

```bash
├── public/                # Recursos estáticos (Imágenes y Logos)
├── reports/               # Informes técnicos del proyecto (inform.md)
└── src/
    ├── app/               # Enrutador de Next.js (layout, css global, páginas)
    ├── components/        # Componentes UI globales (Navbar, Button)
    │   └── sections/      # Secciones de la Landing (Hero, About, Projects, Services, Contact, Footer)
    ├── lib/
    │   ├── utils.ts       # Utilidades de Tailwind Merge
    │   └── SplitText.ts   # Segmentador de palabras y máscaras DOM nativo
```

---

## 🚀 Inicio Rápido (Desarrollo)

### Requisitos Previos
* Node.js v18 o superior o **Bun** instalado en el sistema.

### 1. Clonar e Instalar dependencias
```bash
npm install
# o
bun install
```

### 2. Ejecutar el servidor de desarrollo
```bash
npm run dev
# o
bun dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación ejecutándose en tiempo real con recarga en caliente (hot reload).

### 3. Compilar para Producción
Para validar la optimización y consistencia de tipos de TypeScript de Next.js:
```bash
npm run build
# o
bun run build
```
La compilación generará un bundle optimizado y estático dentro del directorio `.next`.

---

## 👨‍💻 Convenios de Desarrollo (Para IAs y Desarrolladores)
* **SSR Safety:** Al registrar complementos de GSAP como `ScrollTrigger`, siempre verificar el objeto global: `if (typeof window !== 'undefined') { gsap.registerPlugin(ScrollTrigger); }`.
* **GSAP en React:** Evitar el uso tradicional de `gsap.from` para prevenir estados bloqueados causados por la doble inicialización de React StrictMode. Usar siempre `gsap.fromTo` con la propiedad `immediateRender: false`.
* **Interactividad Limpia:** No mezclar clases CSS de transición (`transition-all`, `duration-500`) con propiedades transformadas por GSAP (`x`, `y`, `scale`, `rotate`), ya que los motores de renderizado colisionan. Toda la interactividad de hover en elementos animados debe gestionarse a través de eventos GSAP.
