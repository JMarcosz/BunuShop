# Auditoría SEO / GEO / AEO — bunushop.store

**Auditoría completa** · 5 de septiembre de 2026
Tienda: Accesorios Bunu Shop · CEO: Mary Sorelly · Objetivo: Colombia, Latinoamérica y República Dominicana

| Dimensión | Antes | Después de implementar | Estado |
|---|---|---|---|
| **SEO** | 5/10 | **8/10** | De una sola URL a 18, con enlazado interno real |
| **GEO** | 5/10 | **7/10** | Datos coherentes y artículos con autoría; faltan testimonios |
| **AEO** | 3/10 | **8/10** | FAQPage con 8 preguntas y respuestas en formato de fragmento |
| **Total** | 13/30 | **23/30** | |

> **Nota de lectura.** La primera parte de este documento es la auditoría
> original. La sección [«Estado tras la implementación»](#estado-tras-la-implementación),
> al final, registra qué se corrigió, cómo se validó y qué queda pendiente.

---

## Resumen ejecutivo

Bunu Shop llega a esta auditoría con un trabajo técnico de cabecera muy por encima de lo habitual en una tienda de este tamaño: meta tags completas, canonical, Open Graph con dimensiones, etiquetas geográficas y cuatro bloques JSON-LD enlazados entre sí por `@id`, incluido un `Person` para Mary Sorelly cuyo `alternateName` cubre incluso las variantes mal escritas del nombre. El `robots.txt` habilita de forma explícita a GPTBot, PerplexityBot y ClaudeBot. Ese trabajo está hecho, y está bien hecho.

El problema es otro, y es estructural: **el sitio entero es una única URL**. Los 14 productos y los 3 artículos viven dentro de la home, ya traen un campo `slug` que nadie usa, y el sitemap declara seis entradas de las cuales cinco son fragmentos (`/#galeria`, `/#faq`…) que Google consolida en la misma página.

Por encima de eso hay un fallo que está sangrando ahora mismo: **las secciones de Preguntas Frecuentes y de Testimonios se renderizan vacías en producción**, y el schema `FAQPage` se emite literalmente con `mainEntity: []`. La página anuncia respuestas y prueba social que no entrega, ni al visitante ni al buscador. Es la causa directa del 3/10 en AEO.

La oportunidad más grande, y es grande, es convertir esas 17 piezas de contenido en 17 URLs propias con schema `Product`: se pasa de competir por todo desde una sola página a tener una página por cada intención de búsqueda de cola larga.

---

## 1. Datos reales de Google Search Console

Consultados vía MCP el 5 de septiembre de 2026 sobre la propiedad `https://bunushop.store/` (permiso: siteOwner).

| Métrica | Valor |
|---|---|
| Clics, impresiones, CTR y posición (últimos 12 meses) | **Sin datos** — cero filas devueltas |
| Estado de la home | **Indexada** — «Submitted and indexed» |
| Último rastreo | 2026-09-05 05:17 UTC (hoy) |
| Rastreada como | MOBILE |
| robots.txt | ALLOWED · Indexación permitida |
| Sitemaps enviados | 1 · `sitemap.xml` · enviado 2026-09-05 · 0 errores, 0 avisos |
| `/portafolio` | FETCH_ERROR |

### Cómo hay que leer el cero

Doce meses sin una sola fila de rendimiento, con la home indexada y rastreada hoy mismo, y el sitemap enviado hoy. La lectura honesta es que **la propiedad es nueva**: Search Console solo acumula datos desde la verificación, así que esto es una línea base de partida, no un diagnóstico de invisibilidad. No se puede concluir que el sitio esté penalizado ni que Google lo esté ignorando; lo que se puede afirmar es que **hoy no hay histórico contra el que medir**, y que por eso mismo es el momento ideal para instrumentar antes de tocar nada.

### Conflicto de canonical con el dominio de Vercel

La inspección de URL devuelve algo que merece atención:

```
googleCanonical : https://bunushop.store/
userCanonical   : https://bunu-shop.vercel.app/
```

Verificado en vivo: **`bunu-shop.vercel.app` responde HTTP 200**, sirve una copia completa de la tienda, su `robots.txt` permite el rastreo y no envía ninguna cabecera `X-Robots-Tag: noindex`. Es decir, existe un segundo sitio rastreable idéntico al real.

El daño está contenido, y conviene decirlo con precisión: ambos dominios sirven hoy `<link rel="canonical" href="https://bunushop.store/">`, y Google resolvió bien al elegir `bunushop.store` como canónica. Pero el canonical que Google registró de tu lado apunta al dominio de Vercel, que es exactamente el síntoma de este problema. Además el deployment de Vercel emite `og:url` apuntándose a sí mismo, porque ese valor se deriva de `Astro.url.origin` en vez de estar fijado.

**Qué hacer:** o bien redirigir 308 el dominio `.vercel.app` al dominio real desde la configuración del proyecto en Vercel, o bien servir `X-Robots-Tag: noindex` cuando el host no sea `bunushop.store`. Y fijar `og:url` al dominio canónico en vez de derivarlo del origen de la petición.

---

## 2. Páginas auditadas

| URL | Tipo | Observaciones |
|---|---|---|
| `https://bunushop.store/` | Home (sitio completo) | 200 OK · 1.601 palabras visibles · 2 H1 · 8 H2 · 21 H3 · 4 bloques JSON-LD |
| `https://bunushop.store/robots.txt` | Rastreo | 200 OK · permite GPTBot, PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended |
| `https://bunushop.store/sitemap.xml` | Sitemap | 200 OK · 6 URLs declaradas, 5 son fragmentos → 1 URL real |
| `https://bunushop.store/portafolio` | Redirección | Redirige a `/#galeria` · FETCH_ERROR en GSC · no aporta URL indexable |
| `https://bunu-shop.vercel.app/` | Duplicado | 200 OK · rastreable · copia íntegra del sitio |
| `/admin`, `/api/*` | Privadas | Correctamente bloqueadas en robots.txt y por middleware de sesión |

---

## 3. Análisis SEO — 5/10

### Técnico on-page

| Señal | Hallazgo | Estado |
|---|---|---|
| Title | «Bunu Shop (BunuShop) \| Joyería Hecha a Mano por Mary Sorelly en Colombia» — 71 caracteres. Contiene marca, CEO, categoría y país, pero Google trunca en torno a los 60 y se pierde «en Colombia». | Atención |
| Meta description | 155 caracteres, dentro del óptimo. Menciona mostacilla checa calibrada, macramé y baño de oro. Le falta una llamada a la acción explícita. | Bien |
| Encabezados | **Dos H1** en el DOM (variantes móvil y escritorio) con textos distintos: «Piezas Únicas con Identidad» y «Piezas Únicas con Identidad Propia». Ninguno nombra la marca ni a la CEO. La línea con las palabras clave de marca está degradada a H2. | Falta |
| Estructura de URLs | Una sola URL indexable. Los 14 productos y 3 artículos no tienen dirección propia pese a que los datos ya incluyen `slug` y `categorySlug` sin usar. | Falta |
| Canonical | Autorreferencial y correcto en el HTML servido. Ver §1 sobre el conflicto registrado en GSC. | Atención |
| Meta robots | `index, follow` con `max-image-preview:large`, `max-snippet:-1`, `max-video-preview:-1`. Configuración óptima. | Bien |
| Viewport móvil | Presente con `initial-scale=1.0`. | Bien |
| Texto alternativo | Las 10 imágenes llevan `alt` descriptivo con palabras clave reales, no relleno. Única excepción: la imagen del visor ampliado tiene `alt` vacío. | Bien |
| Enlaces internos | De 102 enlaces, 13 apuntan a rutas internas y **todos son recursos estáticos** (favicons, CSS, imágenes). Cero enlaces de navegación a páginas reales. 30 son anclas y 42 van a WhatsApp. | Falta |
| Open Graph / Twitter | Open Graph completo con `og:image` 1080×1080 y dimensiones declaradas. `twitter:card` está en `summary`, que muestra miniatura pequeña; `summary_large_image` aprovecha mucho mejor la foto de producto. | Atención |
| Sitemap | Estático y mantenido a mano. Cinco de las seis URLs son fragmentos que Google consolida en la home. El sitemap efectivo tiene una URL. | Falta |
| HTTPS y entrega | HTTPS correcto. TTFB de 230–450 ms, HTML de 208 KB que viaja en 25,9 KB con Brotli. Sin caché de CDN: `Cache-Control: max-age=0` y `x-vercel-cache: MISS` en todas las peticiones, servido desde `iad1` (Virginia). | Atención |

### Calidad de contenido

| Señal | Hallazgo | Estado |
|---|---|---|
| Volumen | 1.601 palabras visibles para todo el sitio. Suficiente para una landing, escaso para competir por decenas de términos de producto desde una única página. | Atención |
| Señales de palabra clave | Tema principal claro de inmediato. Vocabulario semántico rico y específico del oficio: mostacilla checa calibrada, Miyuki, délicas, macramé, telar. | Bien |
| Frescura | No se muestran fechas de publicación ni de actualización en los artículos. | Atención |
| Legibilidad | Contenido escaneable, secciones cortas, jerarquía visual clara. | Bien |

### Datos estructurados

| Señal | Hallazgo | Estado |
|---|---|---|
| `Person` (Mary Sorelly) | Completo: `jobTitle`, nacionalidad, dirección, `knowsAbout`, `sameAs` a Instagram, Facebook y WhatsApp, y `alternateName` que cubre «Mary Sorely» y «Mary Soreli». **Es el mejor activo SEO del sitio.** | Bien |
| `JewelryStore` | Nombre, logo, teléfono, email, `priceRange`, moneda, métodos de pago, dirección postal, coordenadas y `founder` enlazado por `@id` al `Person`. Muy completo. | Bien |
| `FAQPage` | Se sirve en producción como `{"@type":"FAQPage","mainEntity":[]}`. **67 bytes: un FAQPage sin ninguna pregunta.** Google lo marca como datos estructurados no válidos. | Falta |
| `HowTo` | Cuatro pasos correctamente marcados (Diseño y Elección, Elaboración Artesanal, Empaque con Amor, Envío a tu Puerta) con `totalTime: P3D`. | Bien |
| `Product` / `Offer` | **Ausente.** Los 14 productos tienen el campo `price` vacío, así que no hay precio que declarar. Sin `Product` ni `offers` no hay resultados enriquecidos ni presencia en superficies de compra asistidas por IA. | Falta |
| `BreadcrumbList` | Ausente. Sin jerarquía de URLs no tiene función todavía; será necesario en cuanto existan páginas de producto. | Atención |
| `areaServed` | Declara solo Colombia y cinco ciudades, pero el copy visible ya anuncia «ENVÍOS SEGUROS COLOMBIA E INTERNACIONAL». **El schema contradice a la página.** | Falta |

---

## 4. Análisis GEO — 5/10

> GEO es la optimización para buscadores con IA (Perplexity, ChatGPT Search, AI Overviews, Gemini), que no devuelven una lista de enlaces sino una respuesta redactada que cita fuentes. Premian la claridad de la entidad, la autoría verificable y los datos concretos y coherentes.

### E-E-A-T

| Señal | Hallazgo | Estado |
|---|---|---|
| Autoría | Excelente a nivel de marca: Mary Sorelly aparece como fundadora y artesana, con foto, biografía y schema `Person`. En cambio los 3 artículos del blog **no tienen firma ni schema `Article`**. | Atención |
| Sección «Sobre» | Existe con retrato, biografía en dos párrafos y micro-título con el nombre de la CEO. Cumple, aunque sin URL propia no puede posicionar por sí misma. | Atención |
| Contacto | Teléfono +57 316 077 1180, email accesoriosbunushop@gmail.com y localidad Gamarra, Cesar. NAP consistente entre copy y schema. | Bien |
| Señales de confianza | La sección «Lo que Dicen Quienes Ya Recibieron sus Piezas» **se renderiza vacía**: solo encabezado y subtítulo, cero testimonios, 222 caracteres en total. Un titular que promete experiencias reales sin ninguna debajo resta credibilidad en vez de sumarla. | Falta |
| Coherencia de datos | La misma página afirma «100+ Pedidos Entregados» y «60+ Clientas Satisfechas» en el bloque de métricas, y **«Más de 500 pedidos entregados en toda Colombia»** en la sección de testimonios. Cifras que se contradicen a pocos scrolls de distancia. Un motor generativo que extraiga ese dato encuentra dos verdades incompatibles y opta por no citar. | Falta |
| Schema de organización | `JewelryStore` y `Person` enlazados por `@id`, con `sameAs` a tres perfiles. Grafo de entidad bien construido. | Bien |

### Contenido para síntesis por IA

| Señal | Hallazgo | Estado |
|---|---|---|
| Densidad factual | Alta en materiales y proceso, con técnicas concretas y verificables. Baja en datos citables: sin precios, sin plazos en días, sin cobertura de envío por país. | Atención |
| Claridad de propuesta | El subtítulo del héroe lo dice sin rodeos: «Diseñamos y tejemos piezas únicas a tu medida en mostacilla checa calibrada y baño de oro». | Bien |
| Claridad de entidad | La marca se nombra de forma consistente como «Bunu Shop (BunuShop)» junto a «Mary Sorelly» en title, H2, schema y alt de imágenes. Es justo lo que necesita un motor generativo para reconocer la entidad. | Bien |
| Exhaustividad | Quedan sin responder preguntas que un comprador se hace siempre: cuánto cuesta, cuánto tarda, qué pasa si la talla no queda, si hay garantía, si se envía a su país. | Falta |
| Originalidad | El oficio artesanal y las piezas devocionales (San Benito, Virgen del Carmen, Sagrado Corazón) son un ángulo genuinamente diferenciado y difícil de replicar. | Bien |

### GEO técnico

| Señal | Hallazgo | Estado |
|---|---|---|
| Acceso de crawlers de IA | `robots.txt` permite explícitamente GPTBot, PerplexityBot, ClaudeBot, Google-Extended y Applebot-Extended. Muy por delante de la media del sector. | Bien |
| Renderizado sin JavaScript | El catálogo se genera en servidor: las 14 fichas están en el HTML inicial y la paginación JS solo oculta y muestra. Totalmente accesible sin ejecutar scripts. | Bien |
| Profundidad del schema | Buena en `Person` y `JewelryStore`. Faltan `Product`, `Article`, `Review` y `Speakable`. | Atención |
| `sameAs` de marca | Instagram, Facebook y WhatsApp enlazados. Convendría añadir Google Business Profile cuando exista. | Atención |

---

## 5. Análisis AEO — 3/10

> AEO es la optimización para fragmentos destacados, cajas de «Otras preguntas» y búsqueda por voz: formatear el contenido para que un buscador pueda extraer una respuesta directa.

Es la dimensión más débil, y por una razón concreta: **toda la maquinaria AEO del sitio está construida pero vacía.**

### Elegibilidad para fragmentos destacados

| Señal | Hallazgo | Estado |
|---|---|---|
| Párrafos de respuesta directa | No hay ningún bloque de 40–60 palabras que responda una pregunta justo debajo de un encabezado interrogativo. Es el formato que Google extrae. | Falta |
| Patrón de definición | Falta una frase del tipo «La mostacilla checa calibrada es…». Definir los materiales del oficio es la vía más directa a posicionar por términos que casi nadie explica. | Falta |
| Contenido en listas | Los cuatro pasos del proceso están en lista y marcados con `HowTo`. **Es el activo AEO que sí funciona.** | Bien |
| Tablas comparativas | Ninguna. Una tabla de materiales o de tiempos de envío por destino sería candidata a fragmento de tabla. | Atención |

### Formatos de respuesta estructurada

| Señal | Hallazgo | Estado |
|---|---|---|
| Schema `FAQPage` | Presente pero vacío: `mainEntity` es un array sin elementos. **Es el hallazgo más grave de la auditoría.** No solo se pierde la elegibilidad para resultados enriquecidos de FAQ: se está sirviendo markup no válido. | Falta |
| Sección FAQ visible | La sección `id="faq"` renderiza el titular «Preguntas Frecuentes & Garantías», el subtítulo y un botón de WhatsApp. **Ninguna pregunta.** 323 caracteres en toda la sección. | Falta |
| Schema `HowTo` | Correctamente implementado con cuatro pasos posicionados. Elegible para resultados enriquecidos de proceso. | Bien |
| Encabezados en forma de pregunta | Solo dos en todo el sitio: «¿Cómo Creamos y Enviamos tu Accesorio?» y «¿Tienes una idea en mente para un accesorio especial?». El segundo es un reclamo comercial, no una pregunta de búsqueda. | Atención |
| Schema `Speakable` | Ausente. | Atención |

### Búsqueda por voz

| Señal | Hallazgo | Estado |
|---|---|---|
| Lenguaje conversacional | El copy es cálido y natural, buena base para consultas habladas. | Bien |
| Cobertura de cola larga | Prácticamente nula al no existir contenido que responda quién, qué, cuándo, dónde, por qué y cómo sobre cada tipo de pieza. | Falta |
| Señales locales | NAP completo y coherente, `geo.region` CO-CES, coordenadas en el schema, localidad Gamarra, Cesar. Falta Google Business Profile. | Atención |

### Por qué el FAQ está vacío

No es un fallo de datos de producción aislado. En [src/pages/index.astro](src/pages/index.astro):

- Línea 170: el schema se construye con `faqs.map(...)`
- Línea 1212: la sección visible se construye con `{faqs && faqs.map(...)}`
- Línea 1158: los testimonios, igual, con `{testimonials && testimonials.map(...)}`

Ambos leen de `data.faqs` y `data.testimonials`. En [src/data/portafolio.json](src/data/portafolio.json) esas dos claves **no existen** (y `services` está a 0), y el Blob de producción tampoco las tiene. Resultado: encabezados que se pintan siempre, contenido que nunca llega, y un `FAQPage` con `mainEntity: []` servido a Google en cada petición.

Como efecto secundario, el fallback está roto: si el Blob de Vercel fallara, la web caería a un JSON local que ya viene sin FAQs, sin testimonios y sin servicios.

---

## 6. Matriz de recomendaciones priorizadas

| Prioridad | Acción | Dimensión | Esfuerzo | Impacto |
|---|---|---|---|---|
| 🔴 Crítica | Cargar las preguntas frecuentes: arregla a la vez el `FAQPage` vacío y la sección sin contenido | AEO · SEO | Bajo | Muy alto |
| 🔴 Crítica | Cargar testimonios reales con nombre bajo el titular que ya los promete | GEO | Bajo | Alto |
| 🔴 Crítica | Unificar las cifras: 100+ pedidos frente a «más de 500» en la misma página | GEO | Muy bajo | Alto |
| 🟠 Alta | Crear `/producto/[slug]` y `/blog/[slug]`: de 1 URL indexable a 18 | SEO · GEO · AEO | Alto | Muy alto |
| 🟠 Alta | Cargar los precios de los 14 productos y emitir schema `Product` con `offers` | SEO | Medio | Muy alto |
| 🟠 Alta | Instalar GA4 y marcar los clics a WhatsApp como conversión — hoy no hay ninguna medición | Medición | Bajo | Muy alto |
| 🟠 Alta | Sustituir el sitemap manual por `@astrojs/sitemap` y eliminar las 5 entradas con fragmento | SEO | Bajo | Alto |
| 🟠 Alta | Bloquear o redirigir `bunu-shop.vercel.app` y fijar `og:url` al dominio canónico | SEO | Bajo | Alto |
| 🟡 Media | Unificar los dos H1 en uno que incluya «Bunu Shop» y «Mary Sorelly», hoy degradados a H2 | SEO | Bajo | Alto |
| 🟡 Media | Ampliar `areaServed` a Latinoamérica y República Dominicana, que el copy ya anuncia | SEO · GEO | Bajo | Medio |
| 🟡 Media | Añadir párrafos de respuesta directa de 40–60 palabras bajo encabezados interrogativos | AEO | Medio | Alto |
| 🟡 Media | Sincronizar `src/data/portafolio.json` con el Blob para que el respaldo no degrade el sitio | SEO | Bajo | Medio |
| 🟡 Media | Firmar los artículos con Mary Sorelly y añadir schema `Article` con fecha | GEO | Bajo | Medio |
| 🟢 Rápida | Cambiar `twitter:card` de `summary` a `summary_large_image` | SEO | Muy bajo | Medio |
| 🟢 Rápida | Acortar el title a 60 caracteres para que no se trunque «en Colombia» | SEO | Muy bajo | Medio |
| ~~🟢 Rápida~~ | ~~Poner `alt` dinámico a la imagen del visor ampliado~~ — **falso positivo, retirado.** El `alt=""` del HTML estático es correcto: el JavaScript del visor ya asigna `lightboxImg.alt = altText` desde el `data-alt` de cada tarjeta al abrirlo. No había nada que arreglar. | — | — | — |
| 🟢 Rápida | Borrar `src/layouts/Layout.astro`, código huérfano con `lang="en"` | SEO | Muy bajo | Bajo |
| 🟢 Rápida | Activar caché de CDN y evaluar región de despliegue: hoy todo es MISS desde Virginia | SEO | Bajo | Medio |

### Advertencia importante sobre valoraciones

Las fichas de producto pintan `{project.rating || '5.0'}`: **un 5.0 por defecto sin ninguna reseña detrás**. No conviertas ese dato en schema `AggregateRating`. Emitir valoraciones agregadas sin reseñas verificables es motivo de acción manual por parte de Google. Si quieres estrellas en los resultados, el camino es recoger reseñas reales primero. Mientras tanto, valora incluso retirar ese «5.0» de la interfaz.

---

## 7. Estrategia de palabras clave

| Capa | Términos | Situación y acción | Destino |
|---|---|---|---|
| **Marca** | Bunu Shop · BunuShop · Accesorios Bunu Shop · bunushop.store | Ya cubierto en title, H2, schema y `alternateName`. El trabajo pendiente es medir en GSC si el sitio gana su propio nombre. Si no lo gana, el problema es de autoridad de dominio, no de on-page. | Home |
| **CEO** | Mary Sorelly · Mary Sorely · Mary Soreli · Mary Sorelly Bunu Shop | Las variantes mal escritas ya están en `alternateName` del `Person`, que es exactamente la técnica correcta. Refuerzo pendiente: firmar los artículos con su nombre. | Home + `/blog/*` |
| **Producto (cola larga)** | pulsera San Benito · pulsera Virgen del Carmen · mostacilla checa calibrada · tejido Miyuki · pulseras de pareja · camándula en délicas · pulseras de protección hilo rojo | **Mayor retorno disponible y hoy desaprovechado.** Los 14 productos compiten desde la misma URL. Cada término necesita su propia página para dejar de canibalizarse. | `/producto/[slug]` |
| **Informacional** | cómo limpiar accesorios en mostacilla · para qué sirve el hilo rojo · qué es la mostacilla checa · diferencia entre Miyuki y délica | Los 3 artículos ya atacan este ángulo, pero sin URL propia no pueden posicionar. Es la vía natural de entrada de tráfico desde Latinoamérica y República Dominicana. | `/blog/[slug]` |
| **Geográfica Colombia** | joyería artesanal Colombia · accesorios hechos a mano Bogotá · pulseras personalizadas Medellín · accesorios Gamarra Cesar | Cubierto en meta keywords, geo tags y `areaServed`. Falta Google Business Profile, que es la palanca principal del SEO local. | Home |
| **Geográfica internacional** | accesorios artesanales colombianos República Dominicana · envío internacional joyería artesanal · pulseras hechas a mano Latinoamérica | El copy ya anuncia envíos internacionales pero el schema solo declara Colombia. Ampliar `areaServed` y crear una FAQ de envío internacional con países, plazos y costes reales. | Home + FAQ |

Los términos salen del contenido real del sitio y del objetivo declarado, no de datos de volumen de búsqueda. Conviene validarlos en Google Keyword Planner antes de invertir en contenido.

---

## 8. Diseño de las URLs nuevas

| Ruta | Alcance | Especificación |
|---|---|---|
| `/producto/[slug]` | 14 páginas | El `slug` ya existe en cada producto de `portafolio.json`. Cada página: title «[Producto] \| Bunu Shop», description desde el campo `description`, schema `Product` con `name`, `image`, `description`, `brand`, `offers` (precio, `priceCurrency: COP`, `availability`) y `BreadcrumbList`. Enlazada desde su tarjeta en la home. |
| `/blog/[slug]` | 3 páginas | `slug` ya presente en `blogPosts`. Schema `Article` con `author` apuntando por `@id` al `Person` de Mary Sorelly, `datePublished` y `dateModified`. Es lo que convierte los artículos en activos de autoridad para GEO. |
| `/categoria/[categorySlug]` | Opcional | El campo `categorySlug` ya existe. Páginas de categoría con `ItemList`; útiles solo cuando haya suficientes productos por categoría para que no queden thin. |
| `sitemap.xml` | Automático | Instalar `@astrojs/sitemap` para que las 18 URLs se generen solas en cada build y desaparezcan las entradas con fragmento. |

El enlazado interno es parte del entregable, no un extra: hoy hay **cero enlaces internos a páginas reales**, y sin ellos las páginas nuevas nacen huérfanas.

---

## 9. Plan de Google Analytics 4

Hoy no hay ninguna analítica instalada: ni GA4, ni GTM, ni Vercel Analytics. Verificado en el código y en el HTML de producción.

| Paso | Acción |
|---|---|
| 1 | Crear la propiedad GA4 para bunushop.store en analytics.google.com, con zona horaria América/Bogotá y moneda COP. |
| 2 | Añadir un flujo de datos web apuntando a `https://bunushop.store`. Devuelve el ID con formato `G-XXXXXXXXXX`. |
| 3 | Guardar el ID como `PUBLIC_GA_MEASUREMENT_ID` en Vercel y en `.env`, en lugar de escribirlo en el código. Encaja con cómo el proyecto ya gestiona sus secretos. |
| 4 | Cargar `gtag.js` con `async` en el head de `index.astro`, condicionado a que la variable exista para no romper el desarrollo local. |
| 5 | **Medir lo que de verdad importa.** En esta tienda la conversión no es una compra en el sitio: es un clic a WhatsApp. Hay 42 enlaces `wa.me` en la página. Marcar como evento los botones «Pedir» y «Consultar», enviando el nombre del producto como parámetro. Sin esto GA4 solo cuenta visitas. |
| 6 | Marcar el evento de clic a WhatsApp como conversión, distinguiendo «Pedir» de «Consultar» por intención. |
| 7 | Vincular GA4 con Search Console (Administrar → Vinculaciones). Es lo que permite ver en una misma pantalla qué palabra clave trajo a la persona que acabó escribiendo por WhatsApp. |

---

## 10. Plan de Google Search Console

| Paso | Acción |
|---|---|
| 1 | **Consolidar las propiedades.** Hay dos archivos de verificación en `public/` (`google18679b394007301e.html` y `google1fe9fa1767642d7d.html`). Conviene trabajar sobre una propiedad de dominio, que agrupa subdominios y protocolos, y dejar la otra como histórico. |
| 2 | **Reenviar el sitemap solo después de corregirlo.** El actual ya está enviado con 0 errores, pero declara 1 URL real. Reenviarlo tal cual solo confirma el diagnóstico. |
| 3 | **Auditar Resultados enriquecidos.** El informe de datos estructurados debería estar señalando el `FAQPage` vacío. Es la confirmación externa del hallazgo crítico. |
| 4 | **Resolver el `FETCH_ERROR` de `/portafolio`.** Google no consigue rastrear esa ruta de redirección. |
| 5 | **Fijar la línea base por país ahora**, aprovechando que no hay histórico. Sin esa foto inicial no habrá forma de demostrar el efecto de los cambios en Colombia frente a RD y el resto de Latinoamérica. |
| 6 | **Trabajar las posiciones 8–30** en cuanto haya datos: son las consultas de retorno más rápido, porque ya hay relevancia reconocida. |
| 7 | **Solicitar indexación** de las páginas de producto más importantes en cuanto existan, vía Inspección de URLs. |

---

## 11. Lo que está funcionando bien

| Fortaleza | Evidencia |
|---|---|
| Grafo de entidad | `Person` y `JewelryStore` enlazados por `@id`, con `founder` y `worksFor` cruzados. Es la estructura que permite entender que Mary Sorelly y Bunu Shop son la misma historia. |
| Cobertura de variantes del nombre | `alternateName` incluye «Mary Sorely» y «Mary Soreli». Anticipar las faltas de ortografía del nombre propio es una técnica que rara vez se ve aplicada. |
| Permisos para crawlers de IA | `robots.txt` habilita explícitamente GPTBot, PerplexityBot, ClaudeBot, Google-Extended y Applebot-Extended, con el sitemap declarado al final. |
| Catálogo en servidor | Las 14 fichas están en el HTML inicial; la paginación JS solo oculta y muestra. Accesible sin ejecutar scripts, que es justo lo que necesitan los crawlers de IA. |
| Texto alternativo con intención | Los `alt` no son relleno: «[Producto] - Accesorio artesanal hecho a mano en Colombia por Bunu Shop». Bien planteado para Google Imágenes. |
| Configuración de miniaturas | `max-image-preview:large` permite mostrar la foto de producto a tamaño grande, decisivo en un sector visual. |
| Entrega técnica | HTTPS, Brotli reduciendo 208 KB a 25,9 KB, imágenes en WebP, precarga del héroe con `fetchpriority="high"` y fuentes sin bloquear el render. |
| Vocabulario de oficio | Mostacilla checa calibrada, Miyuki, délicas, telar, macramé. Términos específicos, poco competidos y con intención de compra real. |
| Indexación limpia | La home está indexada, se rastreó hoy, robots permite y el fetch es correcto. No hay ningún problema técnico bloqueando a Google. |

---

## 12. Capa de conversión

Una salvedad de método: la skill `portafolio-conversion` que también se aplicó aquí está pensada para portafolios de desarrollador que venden sistemas, no para tiendas de producto. Solo traslado lo que aplica de verdad, y dejo fuera todo lo relativo a casos de estudio, stack técnico y jerarquía de portafolio.

- **Regla de los 5 segundos.** El bloque sin scroll cumple: titular, subtítulo que explica el producto en lenguaje del cliente y CTA visible. Bien resuelto.
- **FAQ como anticipación de objeciones.** Es donde más se pierde hoy. Las preguntas que hay que responder son las que frenan la compra: cuánto tarda, qué pasa si la talla no queda, si hay garantía, si llega a mi país, cómo se paga. Cada una es a la vez una objeción resuelta y una oportunidad AEO.
- **Testimonios verificables.** Con nombre y, si es posible, ciudad. Un testimonio anónimo vale poco; ninguno vale menos todavía.
- **Coherencia de las cifras.** 100 o 500, pero no ambas. La contradicción cuesta más que el número, sea cual sea.
- **CTA único.** WhatsApp está bien elegido como canal, y la separación «Pedir» / «Consultar» distingue correctamente dos intenciones distintas.

---

## 13. Limitaciones de esta auditoría

| Área | Situación |
|---|---|
| Rendimiento en GSC | Consultado vía MCP: cero filas en 12 meses. No es una limitación de la auditoría sino un dato — la propiedad es nueva y no hay histórico. |
| Core Web Vitals | No medibles por inspección del HTML. Se midió lo observable: TTFB 230–450 ms y 25,9 KB transferidos. Para LCP, INP y CLS reales hay que ejecutar [pagespeed.web.dev](https://pagespeed.web.dev) sobre la URL. |
| Perfil de enlaces entrantes | Fuera del alcance de una auditoría técnica. Requiere Ahrefs, Semrush o histórico en GSC. |
| Volumen de búsqueda | Las palabras clave propuestas salen del contenido real y del objetivo declarado, no de datos de volumen. Validar en Keyword Planner. |
| Renderizado móvil real | No verificado en dispositivo. El HTML muestra variantes móvil y escritorio, y precisamente de ahí viene el problema de los dos H1. |

---

## Glosario

**SEO** — *Search Engine Optimization.* Optimización para buscadores tradicionales como Google y Bing: qué se indexa, por qué términos y en qué posición.

**GEO** — *Generative Engine Optimization.* Optimización para buscadores con IA (Perplexity, ChatGPT Search, AI Overviews, Gemini), que devuelven una respuesta redactada que cita fuentes en vez de una lista de enlaces. Premian la claridad de la entidad, la autoría verificable y los datos concretos y coherentes.

**AEO** — *Answer Engine Optimization.* Optimización para fragmentos destacados, cajas de «Otras preguntas» y búsqueda por voz. Depende sobre todo del schema `FAQPage` y `HowTo` y de encabezados en forma de pregunta.

**Schema / JSON-LD** — Vocabulario estandarizado que se incrusta en la página para explicarle al buscador qué es cada cosa: esto es un producto, esto un precio, esta persona es la fundadora. Es lo que habilita los resultados enriquecidos.

**E-E-A-T** — *Experiencia, Pericia, Autoridad y Confianza.* El marco con el que Google evalúa la credibilidad de una fuente. En una tienda artesanal se demuestra con autoría real, testimonios verificables y datos coherentes.

**Canonical** — Etiqueta que le dice al buscador cuál es la versión oficial de una página cuando existen varias URLs con el mismo contenido.

---

*Auditoría realizada el 5 de septiembre de 2026 sobre el repositorio BunuShop y el sitio en producción, con datos de Google Search Console obtenidos vía MCP.*

---

# Estado tras la implementación

*Segunda pasada · 5 de septiembre de 2026 · commits `233f3e1`, `0dc8f9e`*

## Qué se corrigió

| # | Recomendación | Estado | Cómo se resolvió |
|---|---|---|---|
| 1 | `FAQPage` vacío | ✅ Hecho | La causa no era falta de contenido: `getPortfolioData()` devolvía el Blob tal cual y ese documento se creó antes de que existieran las claves `faqs` y `testimonials`. Se añadió `withDefaults()` en `storage.ts`. Cargadas 8 preguntas de 41–51 palabras. |
| 2 | Testimonios fantasma | ⚠️ Parcial | La sección deja de renderizarse mientras no haya testimonios reales. **No se inventaron**: un testimonio fabricado es una reseña falsa. Pendiente de que Mary aporte los reales. |
| 3 | Cifras contradictorias | ✅ Hecho | El «más de 500» se deriva ahora de `metrics.projectsCompleted`. Una sola fuente de verdad. |
| 4 | Páginas de producto y blog | ✅ Hecho | `/producto/[slug]` (14) y `/blog/[slug]` (3). De 1 a 18 URLs indexables. |
| 5 | Schema `Product` con `offers` | ⚠️ Parcial | `Product` y `BreadcrumbList` se emiten en las 14 fichas. **`offers` queda fuera hasta que existan precios reales.** |
| 6 | Sitemap | ✅ Hecho | Endpoint `sitemap.xml.ts` generado desde los datos. 18 URLs, cero fragmentos. |
| 7 | Google Analytics 4 | ⚠️ Código listo | `Analytics.astro` inyecta gtag.js y registra el clic a WhatsApp separando intención. **Inactivo hasta definir `PUBLIC_GA_MEASUREMENT_ID` en Vercel.** |
| 8 | Duplicado en `vercel.app` | ✅ Hecho | El middleware marca `X-Robots-Tag: noindex, nofollow` en todo host `*.vercel.app`. Verificado en vivo. |
| 9 | Dos H1 | ✅ Hecho | La variante de escritorio pasa a `<p>`. Un único H1 en el DOM. |
| 10 | `areaServed` internacional | ✅ Hecho | Añadidos República Dominicana y América Latina. |
| 11 | Respuestas directas (AEO) | ✅ Hecho | Las 8 FAQ y los 15 bloques de los artículos usan encabezado interrogativo + respuesta directa. Encabezados en forma de pregunta: **de 2 a 9** en la home. |
| 12 | Datos locales desincronizados | ✅ Hecho | Resuelto por `withDefaults()`. |
| 13 | Autoría en el blog | ✅ Hecho | Schema `Article` con `author` enlazado por `@id` al `Person`, y firma visible. |
| 14 | `twitter:card` | ✅ Hecho | `summary_large_image`. |
| 15 | Title largo | ✅ Hecho | De 71 a 55 caracteres. |
| 16 | `alt` del visor | ❌ Retirado | **Falso positivo.** El JS ya asigna el `alt` al abrir el visor. |
| 17 | `Layout.astro` huérfano | ✅ Hecho | Eliminado. |
| 18 | Caché de CDN | ⏳ Pendiente | Sigue `max-age=0` y `x-vercel-cache: MISS`. Requiere decidir política de revalidación. |

## Bugs detectados por la propia validación

La primera pasada de comprobaciones dio 30/30, pero dos resultados no cuadraban al mirarlos de cerca:

1. **`datePublished: "MARZO 2024"`.** El campo `date` de los artículos es texto de visualización, no una fecha. Se estaba emitiendo tal cual en `datePublished`, en `<time datetime>` y en el `<lastmod>` del sitemap: los tres exigen ISO 8601, así que los tres eran inválidos. Corregido con `src/lib/fechas.ts`, que traduce a ISO y **omite el dato antes que publicar una fecha inválida**.
2. **«8.322 palabras» en un artículo.** Era un error de la comprobación, que contaba CSS y JavaScript. El cuerpo real son 379 palabras.

Ambas comprobaciones se reforzaron. Sin ese segundo vistazo, tres campos de fecha inválidos habrían llegado a producción.

## Validación

**32/32 comprobaciones automáticas** superadas en local y barrido completo de las 18 URLs. Verificado después en producción:

| Comprobación | Resultado |
|---|---|
| URLs del sitemap que responden 200 | 18/18 |
| Fragmentos (`#`) en el sitemap | 0 |
| `lastmod` en ISO 8601 | 18/18 |
| `<h1>` en la home | 1 |
| Longitud del title | 55 caracteres |
| `X-Robots-Tag` en `bunu-shop.vercel.app` | `noindex, nofollow` |
| `FAQPage` en producción | 8 preguntas |
| GA4 activo | No — falta la variable de entorno |

## Qué falta, y de quién depende

**Requiere a Mary o al dueño de las cuentas:**

1. **Crear la propiedad GA4** en analytics.google.com y añadir `PUBLIC_GA_MEASUREMENT_ID` en Vercel. El código ya está desplegado y se activa solo. Después, marcar `whatsapp_click` como evento clave y vincular GA4 con Search Console.
2. **Cargar los precios** de los 14 productos desde `/admin`. En cuanto exista un precio, la ficha emite `offers` automáticamente.
3. **Aportar testimonios reales** con nombre y ciudad. La sección reaparece sola al cargarlos.
4. **Revisar las 8 respuestas del FAQ y los 3 artículos.** Se redactaron solo con datos que el sitio ya afirmaba, y los costes y plazos de envío internacional se dejaron deliberadamente en general porque no había información verificable. Los artículos van firmados por Mary Sorelly y merecen su visto bueno.
5. **Solicitar indexación** de las URLs nuevas en Search Console → Inspección de URLs. Google las descubrirá solo al releer el sitemap, pero la solicitud manual acelera las más importantes.

**Pendiente técnico:**

6. **Caché de CDN.** Hoy cada visita ejecuta SSR con lectura al Blob desde Virginia.
7. **Google Business Profile.** Es la principal palanca de SEO local que sigue sin explotar.

## Nota sobre indexación

Al cerrar esta segunda pasada, Search Console todavía no conocía las 17 URLs nuevas: se publicaron minutos antes y la inspección devuelve un estado sin datos de rastreo, que es lo normal para una URL recién creada, no un error del sitio. Las 18 responden 200 y están declaradas en el sitemap ya registrado.

El sitemap sigue en la misma dirección, así que **no hace falta volver a enviarlo**: Google lo relee por su cuenta y descubrirá las URLs nuevas. La solicitud manual de indexación solo acelera el proceso, y no existe API pública para automatizarla (la Indexing API de Google está limitada a ofertas de empleo y retransmisiones).
