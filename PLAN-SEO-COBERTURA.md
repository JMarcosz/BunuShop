# Plan SEO de cobertura total — Bunu Shop

**Fecha:** 5 de septiembre de 2026
**Objetivo:** que Google asocie el sitio `bunushop.store` con la marca, el nombre completo de la dueña y sus dos apellidos, la categoría de producto y la ubicación — y que muestre el logo (favicon) junto al resultado.

---

## 1. Las dos preguntas concretas

### 1.1 ¿Por qué mi página no sale con su imagen (logo) en Google?

Lo que aparece hoy en el resultado es un **globo genérico**, no tu logo. No es un error de configuración: el favicon está bien puesto (PNG cuadrados de 32, 48, 96 y 144 px, `.ico`, `apple-touch-icon`, todos referenciados en el `<head>` y permitidos por `robots.txt`).

La causa real es **el tiempo**: Google indexó la home por primera vez el 5 de septiembre de 2026 (Search Console no tiene ni un día de histórico). El rastreo del favicon corre en un proceso aparte y más lento que el del texto; suele tardar de **días a varias semanas** después de la primera indexación. No hay nada roto que esté impidiéndolo.

Mejoras que suben la probabilidad y aceleran:

| Acción | Detalle |
|---|---|
| Regenerar `favicon.ico` con marco de **48×48** | Hoy solo contiene 16×16 y 32×32. Google documenta 48×48 (o múltiplo) como tamaño preferente. |
| Referenciar `favicon.svg` en la home | El archivo existe en `public/` pero la home no lo enlaza. Añadir `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`. |
| Marca legible a 16 px | Si el logo lleva texto fino, a tamaño diminuto se vuelve una mancha. Usar un símbolo simple (una «B», la flor/gema) sobre fondo sólido. |
| Pedir reindexación | Search Console → Inspección de URLs → `https://bunushop.store/` → «Solicitar indexación». El refresco del favicon viaja con el nuevo rastreo. |

**Sobre la miniatura grande (foto) en el resultado:** una home casi nunca la obtiene, es normal. Las **fichas de producto** sí pueden mostrar foto + precio + (con reseñas reales) estrellas, pero eso exige schema `Product` + `Offer` con **precios cargados**, que hoy están vacíos. Ver §4.

**Aparte:** el `og:image` de la home es hoy el logo (`logo.jpg`). Para los enlaces que compartes por WhatsApp y redes conviene que sea una **foto de producto** — así el enlace se ve como una tienda y no como una tarjeta de logo. No afecta al resultado de Google, sí a las vistas previas de WhatsApp/Facebook/Instagram, que en este negocio pesan.

### 1.2 ¿Por qué solo aparezco si buscan «Bunu Shop» y no «Bunu Shop Mary Eljach» / «Mary Selly»?

Porque Google asocia un sitio con las palabras que **aparecen** en él: texto visible, datos estructurados (schema), texto de los enlaces que lo apuntan y fuentes externas sobre la entidad (redes, directorios, Google Business Profile).

Hoy en todo el sitio solo figura **«Mary Sorelly»** (primer apellido). **«Eljach» y «Selly» no aparecen en ninguna parte** — ni en el texto, ni en el schema, ni en los perfiles enlazados. Cuando alguien busca «Bunu Shop Mary Eljach», Google busca una página relevante para *ambas* cosas; este sitio encaja con «Bunu Shop» pero no con «Mary Eljach», así que queda por debajo de tu Instagram, tu Facebook o de un competidor.

A esto se suma que el dominio es **nuevo**, sin histórico, sin enlaces entrantes y sin Google Business Profile, así que incluso para su propio nombre la posición es frágil.

**La corrección es de cobertura de entidad**, y es lo que desarrolla el resto de este plan.

---

## 2. Cobertura del nombre de la persona

Nombre completo de referencia: **«Mary Sorelly Eljach»** (confirmar el orden de los apellidos). Se usa **idéntico**, carácter por carácter, en todos estos sitios:

### 2.1 En el código

| Lugar | Cambio |
|---|---|
| `src/pages/index.astro` — `schemaPerson.name` | `"Mary Sorelly Eljach"` |
| `src/pages/index.astro` — `schemaPerson.alternateName` | Lista ampliada (ver abajo) |
| `src/pages/index.astro` — `schemaJewelryStore.alternateName` | Añadir variantes con «Eljach» y «Selly» |
| `src/components/BaseHead.astro` — `<meta name="author">` | `"Mary Sorelly Eljach"` |
| `src/pages/blog/[slug].astro` — `author.name` y firma visible | `"Mary Sorelly Eljach"` |
| `src/pages/producto/[slug].astro` — `brand` / autor | `"Mary Sorelly Eljach"` |
| `src/data/portafolio.json` — `siteInfo.owner` | `"Mary Sorelly Eljach"` |
| Pies de página «por Mary Sorelly» en blog y producto | Nombre completo |

`alternateName` del `Person` sugerido:

```
"Mary Sorelly",
"Mary Eljach",
"Mary Selly",
"Mary Sorely",
"Mary Sorelly Eljach",
"Mary Eljach Sorelly",
"Mary de Bunu Shop",
"Bunu Shop Mary Sorelly",
"Bunu Shop Mary Eljach",
"Bunu Shop by Mary Eljach",
"Bunu Shop Mary Selly"
```

### 2.2 En texto visible

El schema ayuda, pero Google pondera más el **texto visible**. La sección «Sobre Nosotras» debe nombrarla completa al menos una vez:

> «Bunu Shop nació de las manos de **Mary Sorelly Eljach**, en Gamarra, Cesar…»

Y crear una **página propia** `/sobre-mary-sorelly-eljach` (o `/sobre-nosotras`) con su URL, biografía, foto y schema `Person`. Esa página puede posicionar por sí sola para «Mary Eljach Bunu Shop», algo que un fragmento dentro de la home no puede hacer.

### 2.3 Fuera del sitio (lo hace Mary)

- **Instagram y Facebook:** el nombre visible del perfil y la bio deben incluir «Bunu Shop · Mary Sorelly Eljach». Si la gente la encuentra como «Mary Eljach» es porque esos perfiles o el boca a boca usan ese apellido — hay que alinearlos.
- **`sameAs` del schema:** enlazar *todos* los perfiles — Instagram, Facebook, TikTok, Pinterest, catálogo de WhatsApp Business, Linktree, y cualquier marketplace (Mercado Libre, etc.).
- **Google Business Profile** a nombre de «Accesorios Bunu Shop», propietaria Mary Sorelly Eljach.

---

## 3. Cobertura de marca y competidores parecidos

«Bunu Shop» es un nombre corto y colisiona con otras cuentas. Estrategia para que Google entienda que *este* dominio es *el* Bunu Shop:

### 3.1 Emparejar siempre la marca con un calificador único

En títulos, encabezados, schema y en cómo pides que te nombren:

- **«Accesorios Bunu Shop»** — más único que «Bunu Shop» a secas
- **«Bunu Shop · Gamarra, Cesar»**
- **«Bunu Shop by Mary Sorelly Eljach»**

La consistencia es lo que entrena a Google.

### 3.2 Google Business Profile — la palanca más grande

Es lo que da el **panel de conocimiento** con logo y fotos, y lo que hace que tu logo salga en búsquedas de marca y en Maps.

- Nombre: «Accesorios Bunu Shop»
- Tipo: negocio con **área de servicio** (envías, no tienes local a la calle) — Gamarra + Colombia
- Categoría: «Tienda de bisutería» / «Joyería»
- Sitio web oficial: `bunushop.store`
- Fotos: piezas, proceso, empaque, retrato de Mary

### 3.3 Hogar de entidad / panel de conocimiento

- El schema `JewelryStore`/`Organization` ya lleva `logo` — asegurar que apunta a un PNG de **512×512** nítido. Es el que Google usa para el logo del panel.
- `sameAs` a Instagram, Facebook y, cuando haya notoriedad, un ítem en **Wikidata**.

### 3.4 Dominios defensivos

Registrar las variantes obvias y **redirigirlas 301** todas a `bunushop.store` (redirección, **nunca** un segundo sitio vivo — ese fue el error de `bunu-shop.vercel.app`):

- `bunushop.com`, `bunushop.co`, `bunushop.com.co`, `accesoriosbunushop.com`, `bunu.shop`
- Si son baratos, los errores de tecleo: `bunnushop`, `bunushopp`

### 3.5 Diagnóstico del competidor concreto

Para saber por qué un competidor te tapa en «bunu shop» hace falta su URL: ¿es más antiguo?, ¿tiene más enlaces?, ¿dominio de coincidencia exacta (`bunushop.com`)? **Pásame los nombres o enlaces de los competidores que te aparecen** y lo analizo.

---

## 4. Cobertura de producto y categoría (el volumen de tráfico)

Ya existen `/producto/[slug]` (14) y `/blog/[slug]` (3). Para exprimirlo:

1. **Cargar precios reales** desde `/admin` → emitir `Offer` (`price`, `priceCurrency: "COP"`, `availability`, `priceValidUntil`). Desbloquea resultados enriquecidos de producto: precio, disponibilidad y —con reseñas reales— estrellas y miniatura. Esto **es** «la imagen en Google» para productos.
2. **Páginas de categoría** `/categoria/[slug]` con `ItemList` y texto introductorio:
   - Pulseras de protección · Camándulas artesanales · Llaveros religiosos en miyuki · Pulseras personalizadas con nombre · Accesorios en mostacilla checa
3. **Profundizar cada ficha**: 150–250 palabras únicas (materiales, medidas, cuidado, personalización, tiempo de elaboración, envío) + `FAQPage` de 2–3 preguntas por producto + enlaces internos entre piezas relacionadas.

### Mapa de palabras clave (nombre × marca × categoría × ubicación × intención)

| Capa | Términos |
|---|---|
| Marca | bunu shop · accesorios bunu shop · bunu shop colombia · bunu shop gamarra |
| Marca + persona | bunu shop mary sorelly · bunu shop mary eljach · bunu shop mary selly · bunu shop mary sorelly eljach |
| Persona | mary sorelly eljach accesorios · mary eljach pulseras hechas a mano |
| Categoría | pulseras en mostacilla · pulsera hilo rojo protección · camándula artesanal · pulsera san benito tejida · pulsera virgen del carmen · llavero sagrado corazón miyuki · pulseras personalizadas con nombre · set colibrí collar y aretes mostacilla |
| Categoría + lugar | accesorios hechos a mano gamarra cesar · joyería artesanal colombia envío · pulseras personalizadas bucaramanga / valledupar / bogotá |
| Informacional (blog) | cómo limpiar pulseras de mostacilla · qué significa el hilo rojo · diferencia miyuki y délica · en qué muñeca se usa el hilo rojo · cuánto dura el baño de oro |
| Transaccional | comprar pulsera personalizada colombia · encargar accesorio hecho a mano · pulsera con iniciales a la medida |

---

## 5. Cobertura de ubicación

1. **Google Business Profile** (ver §3.2) — palanca local principal.
2. Sección **«Envíos» visible** con tabla destino → plazo → costo (aunque sean rangos) para ciudades de Colombia + República Dominicana + Latinoamérica. Sirve para AEO y para intención local.
3. Mencionar en texto visible «Gamarra, Cesar» + «envíos a Bogotá, Medellín, Bucaramanga, Santa Marta, Valledupar, Aguachica».
4. **Citas locales (NAP):** directorios colombianos (Páginas Amarillas CO, Cylex), marketplaces de hecho a mano, etiquetas de ubicación en Instagram. Teléfono y email **idénticos** en todas partes — hoy conviven `accesoriosbunushop@gmail.com` y otras variantes; unificar.
5. `areaServed` ya ampliado a RD y Latinoamérica; mantener coherencia con el copy.

---

## 6. Autoridad y confianza (para ganar incluso consultas disputadas)

1. **Testimonios reales** con nombre y ciudad → schema `Review` (solo reales, nunca inventados).
2. El sitio enlazado desde: bio de Instagram, campo «Sitio web» de Facebook, perfil de WhatsApp Business, Linktree.
3. Unos pocos **enlaces de calidad**: blogs de artesanía colombiana, features de negocio local, colectivos de artesanas, directorios «hecho en Colombia».
4. **Cadencia de blog** de 1–2 entradas al mes — frescura y más puertas de entrada de cola larga.
5. **GA4 activo** (el código está listo, falta `PUBLIC_GA_MEASUREMENT_ID` en Vercel) + vinculado a Search Console, para medir qué mueve la aguja.

---

## 7. Corrección técnica pendiente

**`siteUrl` se deriva del origen de la petición** en `src/pages/index.astro:70`:

```js
const siteUrl = Astro.url?.origin && !Astro.url.origin.includes('localhost') ? Astro.url.origin : "https://bunushop.store";
```

En el despliegue `bunu-shop.vercel.app` esto mete el dominio de Vercel dentro de todos los `@id`, `url`, `logo`, `image` del JSON-LD y en `og:url`. El `<link rel="canonical">` ya está fijo, pero el schema no. **Fijar `siteUrl` a `"https://bunushop.store"` siempre.** (El `noindex` del middleware sobre `*.vercel.app` ya contiene el daño, pero esto lo cierra del todo.)

---

## 8. Secuencia y prioridades

### Inmediato — código

- [x] **Nombre completo «Mary Sorelly Eljach» + todas las variantes** en schema `Person`/`JewelryStore` (`alternateName` con «Mary Eljach», «Mary Selly», «Bunu Shop by Mary Eljach»…), `meta author`, `og:site_name`, `og:title`, `description`, texto visible de «Sobre», firmas y schema del blog, `manufacturer` de las fichas de producto, y `siteInfo.owner` del JSON semilla — *commit pendiente de subir*
- [x] **Página propia `/sobre-mary-sorelly-eljach`** con URL, bio, `Person` (mismo `@id` que la home), `ProfilePage`, `FAQPage` («¿Es lo mismo Mary Sorelly que Mary Eljach?») y enlaces internos a productos y blog. Añadida al `sitemap.xml` y al pie de la home.
- [x] **Referenciar `favicon.svg`** en la home y en `BaseHead`
- [x] **Fijar `siteUrl` a `https://bunushop.store`** en `index.astro` (que el dominio de Vercel no se filtre al grafo JSON-LD ni a `og:url`)
- [x] **Google Tag Manager (`GTM-NDFHFFTN`)** — componente `GoogleTagManager.astro` con el `<script>` en el `<head>` y el `<noscript>` tras `<body>` en las 4 páginas públicas (home, producto, blog, sobre). ID sobreescribible con `PUBLIC_GTM_ID`.
- [x] **GA4 directo con `gtag.js`** (`G-FTP0X5BGW4`) en `Analytics.astro`: `page_view` automático + evento `whatsapp_click` con `intencion`, `producto`, `seccion` y `pagina`. Solo se carga en producción (en `astro dev` no, salvo definir `PUBLIC_GA_MEASUREMENT_ID`). GTM (`GTM-NDFHFFTN`) queda instalado para etiquetas futuras — **no** añadir una config de GA4 dentro de GTM o se cuentan dobles los `page_view`. Falta: marcar `whatsapp_click` como evento clave en GA4 y vincular GA4 ↔ Search Console.
- [ ] Regenerar `favicon.ico` con marco 48×48 (hoy solo 16 y 32)
- [ ] Unificar email/NAP; crear una imagen `og:image` de 1200×630 con foto de producto y marca

> Los cambios de código están aplicados y el build pasa. Falta **hacer commit y desplegar** para que Google los vea.

### Inmediato — cuentas de Mary (esta semana)

- [ ] Crear y verificar **Google Business Profile** («Accesorios Bunu Shop», área de servicio, Gamarra + Colombia)
- [ ] Alinear nombre visible + bio + enlace de sitio en Instagram y Facebook para incluir «Mary Sorelly Eljach»
- [ ] Definir `PUBLIC_GA_MEASUREMENT_ID` en Vercel; marcar el clic a WhatsApp como conversión; vincular GA4 ↔ Search Console
- [ ] Cargar los precios reales de los 14 productos
- [ ] Registrar y redirigir 301 los dominios defensivos

### 2–4 semanas

- [ ] Páginas de categoría con `ItemList`
- [ ] Profundizar cada ficha de producto; `FAQPage` por producto
- [ ] Tabla de envíos (destino / plazo / costo)
- [ ] Recoger reseñas reales → schema `Review`
- [ ] Solicitar indexación de las URLs nuevas y prioritarias en Search Console
- [ ] Empezar contacto para enlaces y citas locales

### Continuo

- [ ] 1–2 entradas de blog al mes
- [ ] Revisar Search Console: marca vs no-marca, consultas con variantes del nombre, solape con competidores

---

## 9. Qué necesito de ti para afinar el plan

1. **Confirmar el orden**: ¿«Mary Sorelly Eljach» o «Mary Eljach Sorelly»? ¿Y «Selly» es un error de tecleo de «Sorelly» o un tercer apellido/variante?
2. **Los competidores concretos** que te aparecen cuando te buscan (nombres o enlaces), para diagnosticar por qué te tapan.
3. **Precios** de los productos (o luz verde para dejar `offers` fuera hasta que los cargues).
