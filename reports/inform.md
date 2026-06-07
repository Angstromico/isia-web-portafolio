# Informe de Cambios y Arquitectura: Landing Page - Isia Villarroel

Este documento detalla todas las modificaciones, optimizaciones y adiciones realizadas en el proyecto con el propósito de proporcionar contexto inmediato y completo a cualquier agente de inteligencia artificial o desarrollador que trabaje en esta base de código en el futuro.

---

## 1. Stack Tecnológico de la Base de Código
* **Framework:** Next.js (App Router v16)
* **Estilos:** Tailwind CSS v4 (usando directiva `@import "tailwindcss";` y `@theme inline`)
* **Animaciones:** GSAP v3 + `@gsap/react`
* **Desplazamiento:** Lenis (Smooth Momentum Scrolling)
* **Iconografía:** Lucide React

---

## 2. Resumen General de Cambios Implementados

Se rediseñó y enriqueció la experiencia UX/UI del sitio, haciéndolo totalmente responsive e interactivo con animaciones de nivel premium inspiradas en sitios modernos (Awwwards/MODUS Projects).

### Mapa de Archivos Creados y Modificados:
* **[SplitText.ts](file:///C:/Users/Negro/Desktop/Proyects/landing-page-isia/src/lib/SplitText.ts) (Creado):** Motor de segmentación de texto ligero para efectos de revelado con máscara.
* **[SmoothScroll.tsx](file:///C:/Users/Negro/Desktop/Proyects/landing-page-isia/src/components/SmoothScroll.tsx) (Creado):** Inicializador de Lenis para scroll fluido.
* **[layout.tsx](file:///C:/Users/Negro/Desktop/Proyects/landing-page-isia/src/app/layout.tsx) (Modificado):** Integración de desplazamiento global.
* **[page.tsx](file:///C:/Users/Negro/Desktop/Proyects/landing-page-isia/src/app/page.tsx) (Modificado):** Reemplazo de componente CTA por formulario de contacto.
* **[Navbar.tsx](file:///C:/Users/Negro/Desktop/Proyects/landing-page-isia/src/components/Navbar.tsx) (Modificado):** Menú móvil responsive con drawer lateral y stagger.
* **[Hero.tsx](file:///C:/Users/Negro/Desktop/Proyects/landing-page-isia/src/components/sections/Hero.tsx) (Modificado):** Mask reveals, parallax y rastro de imágenes (trail).
* **[About.tsx](file:///C:/Users/Negro/Desktop/Proyects/landing-page-isia/src/components/sections/About.tsx) (Modificado):** Paralaje y animación `SplitText` en títulos y párrafos.
* **[Projects.tsx](file:///C:/Users/Negro/Desktop/Proyects/landing-page-isia/src/components/sections/Projects.tsx) (Modificado):** Tarjetas premium elevadas con paralaje y hover dinámico.
* **[Services.tsx](file:///C:/Users/Negro/Desktop/Proyects/landing-page-isia/src/components/sections/Services.tsx) (Modificado):** Efecto 3D Tilt y paralaje en iconos.
* **[Contact.tsx](file:///C:/Users/Negro/Desktop/Proyects/landing-page-isia/src/components/sections/Contact.tsx) (Modificado/Creado):** Formulario de contacto, efecto ascensor y flujos de éxito.
* **`CTA.tsx` (Eliminado):** Sección obsoleta reemplazada por `Contact.tsx`.

---

## 3. Detalles de Implementación Técnica por Componente

### A. Utilidad de Enmascarado de Texto (`SplitText.ts`)
Debido a que el plugin original `SplitText` de GSAP es de suscripción cerrada, se desarrolló una utilidad nativa ligera compatible con TypeScript para segmentar texto en nodos de DOM.
* **API:** `SplitText.create(selector, { type: "words,lines", mask: "words" })`
* **Lógica:** Segmenta cadenas de texto por espacios en blanco y envuelve cada palabra en una estructura de máscara HTML:
  ```html
  <span class="inline-block overflow-hidden vertical-align-bottom">
    <span class="split-word inline-block">Palabra</span>
  </span>
  ```
  Esto permite que GSAP anime el nodo interno (`.split-word`) usando `yPercent: 110` a `yPercent: 0`, logrando un efecto de revelado vertical sin que el texto sea visible fuera de la caja contenedora.

### B. Desplazamiento Fluido Global
* Se instaló la dependencia `lenis`.
* El componente `SmoothScroll` inicializa el ciclo `requestAnimationFrame` del scroll e intercepta eventos de la rueda del mouse para atenuar la aceleración.
* Se incorporó en `layout.tsx` envolviendo los componentes del lado del cliente, mejorando la fluidez visual de las animaciones `ScrollTrigger` al sincronizar la interpolación de cuadros.

### C. Navegación Móvil y Drawer en `Navbar.tsx`
* **UX/UI:** Se integró soporte responsive en pantallas táctiles. Se agregó un botón de hamburguesa animado por CSS que rota y forma una "X" al abrirse.
* **GSAP:** Al hacer clic en el menú, se bloquea el scroll del body (`overflow = 'hidden'`) y se ejecuta una animación para deslizar el panel drawer desde `x: '100%'` a `x: 0`, seguido por un stagger de entrada con retraso de los enlaces de navegación (`.mobile-nav-link`).

### D. Efectos Parallax, Máscara e Imagen Trail en `Hero.tsx`
* **Mask Reveal:** El encabezado `h1` fue estructurado en líneas estáticas con spans desbordados, y las líneas de texto se deslizan hacia arriba al montar el componente.
* **Mouse Parallax:** Al mover el puntero dentro de la sección, se calcula la posición relativa del cursor respecto al centro de la pantalla. La imagen de fondo (`.hero-bg`) se desplaza ligeramente en dirección opuesta (`x` e `y` interpolados en `0.6s`), dando una ilusión de profundidad 3D.
* **Cursor Image Trail:** Para imitar la estética de MODUS Projects, al deslizar el ratón, se calcula la distancia euclidiana respecto al último punto de renderizado. Si se superan los **80px**, se clona un contenedor de imagen absoluto en las coordenadas `(x, y)` del cursor. Las imágenes ciclan entre `/isia1.jpg`, `/isia2.jpg` y `/isia3.jpg`. Utilizan una animación GSAP `fromTo` de escala y rotación aleatoria con facilidad `back.out(1.4)`, y se desvanecen deslizándose hacia abajo tras `0.5s`, eliminándose automáticamente del árbol del DOM (`onComplete: () => el.remove()`).

### E. Paralaje en Sección Sobre Mí (`About.tsx`)
* Las imágenes de fondo y cuadros geométricos decorativos se enlazaron a ScrollTriggers con propiedades `scrub: true`.
* La imagen principal `.about-img-parallax` se amplió un `15%` mediante CSS (`scale: 1.15`) y se desplaza de `yPercent: -10` a `yPercent: 10` durante el scroll de entrada y salida, creando un efecto de ventana flotante muy elegante.

### F. Tarjetas de Proyectos con Scroll Parallax e Hover (`Projects.tsx`)
* **Mejora UX/UI:** Se transformaron los bloques planos de proyectos en tarjetas de diseño editorial premium (`bg-background`, bordes discretos, sombreado suave, y un indicador lateral izquierdo de color rojo de Rentahouse).
* **Solución de Conflictos de Animación:** Se removieron las propiedades CSS `transition-all` y `hover:-translate-y-2` de las clases tradicionales de Tailwind, ya que interferían con la interpolación de matrices de transformación que realiza GSAP. En su lugar, el comportamiento de elevación y el escalado de sombras en hover se transfirió en su totalidad a controladores GSAP (`onMouseEnter` / `onMouseLeave`), asegurando consistencia matemática sin brincos.
* **Parallax de Imagen:** Las imágenes de proyectos realizan un scroll parallax suave dentro del aspecto de la tarjeta al desplazarse verticalmente.

### G. Efecto 3D Tilt en Servicios (`Services.tsx`)
* **Tilt 3D:** Implementa un renderizado 3D dinámico. En el movimiento del mouse, se calcula el desplazamiento `(x, y)` relativo al centro de la tarjeta y se aplican rotaciones tridimensionales proporcionales (`rotateX` y `rotateY`) con perspectiva en perspectiva (`transformPerspective: 1000`).
* **Micro-animaciones de Iconos:** El contenedor de icono central flota en sentido contrario al cursor dentro de la tarjeta para potenciar la tridimensionalidad (efecto parallax interno).

### H. Formulario de Contacto y Efecto Ascensor (`Contact.tsx`)
* **Efecto Ascensor:** La sección de información de contacto de Rentahouse (columna izquierda) y el contenedor del formulario (columna derecha) se animan de forma inversa en su eje X. La columna izquierda arranca en `xPercent: 35` (desplazada hacia el centro) y la derecha en `xPercent: -35` (desplazada hacia el centro). Al activarse el ScrollTrigger, ambas se separan horizontalmente a su posición base `0`, simulando la apertura de las puertas de un ascensor desde la línea de división del grid.
* **Validación e Interactividad:** Se implementó control de estados con validación de inputs (nombre, correo, teléfono y selectores de servicio personalizados). El botón cuenta con un spinner animado en carga y flujo exitoso.
* **Éxito con GSAP:** Al enviar el formulario, el DOM cambia la visualización. El formulario se desliza hacia arriba ocultándose, y la tarjeta de éxito (Checkmark animado con escala y rotación) aparece de abajo hacia arriba rebotando (`back.out(1.5)`).

---

## 4. Comportamiento Crítico de Repetición en Scroll (`toggleActions`)

Para cumplir con la directiva de que las animaciones ocurran de forma interactiva y repetitiva en lugar de ejecutarse una única vez (comportamiento unidireccional por defecto):
1. Se reemplazaron todas las llamadas `gsap.from` por `gsap.fromTo` con valor explícito de arranque y final.
2. Se configuró `immediateRender: false` para evitar colisiones de valores guardados en memoria durante los renders iniciales de Next.js.
3. Se añadió la propiedad `toggleActions: 'play reverse play reverse'` en todos los disparadores de ScrollTrigger.
   * **Play (onEnter):** Se activa al bajar el scroll y entrar al elemento.
   * **Reverse (onLeave):** Oculta suavemente el elemento en reversa al rebasarlo hacia arriba.
   * **Play (onEnterBack):** Vuelve a mostrar la animación si se regresa al elemento desde abajo.
   * **Reverse (onLeaveBack):** Oculta el elemento si se desplaza hacia arriba fuera del viewport.

Esto asegura que el sitio se mantenga vivo, interactivo y dinámico sin importar la dirección de navegación del usuario.
