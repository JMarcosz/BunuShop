---
name: Editorial Studio Admin
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#59413e'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#8d706d'
  outline-variant: '#e1bfba'
  surface-tint: '#af2e27'
  primary: '#ac2b25'
  on-primary: '#ffffff'
  primary-container: '#ce443a'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb4ab'
  secondary: '#555f6c'
  on-secondary: '#ffffff'
  secondary-container: '#d9e3f3'
  on-secondary-container: '#5b6572'
  tertiary: '#00628d'
  on-tertiary: '#ffffff'
  tertiary-container: '#007cb1'
  on-tertiary-container: '#fcfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4ab'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#8e1312'
  secondary-fixed: '#d9e3f3'
  secondary-fixed-dim: '#bdc7d6'
  on-secondary-fixed: '#121c27'
  on-secondary-fixed-variant: '#3e4854'
  tertiary-fixed: '#c9e6ff'
  tertiary-fixed-dim: '#89ceff'
  on-tertiary-fixed: '#001e2f'
  on-tertiary-fixed-variant: '#004c6e'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 2.5rem
  space-3xl: 3rem
  sidebar-width: 260px
  sidebar-collapsed: 64px
  header-height: 64px
  modal-max-width: 680px
  canvas-max-width: 1280px
---

## Brand & Style

This design system establishes a high-clarity, editorial-grade administration environment engineered for creators, editors, and portfolio curators. Drawing inspiration from modern publishing platforms like Ghost and Webflow while aligning with sleek portfolio aesthetics, it balances dense operational capability with visual restraint.

### Aesthetic Style
- **Modern Minimal Corporate Editorial**: High clarity, structured content planes, generous whitespace within work surfaces, and strong architectural contrast.
- The interface bifurcates visually into two primary zones: an immersive dark slate navigation spine (`#0f172a` to `#18222d`) signaling system-level architecture, and a crisp, high-key workspace (`#ffffff` and `#f8fafc`) optimizing typography legibility, media proofing, and data manipulation.
- Accents deploy strategically via a vibrant warm coral red (`#ea584c`), reserving saturated color strictly for high-intent actions (publish, commit, save), selection highlights, and active context switches.

### Emotional Signature
- **Controlled & Direct**: Clutter-free interfaces instill confidence during mission-critical tasks such as publishing or deleting content.
- **Approachable Craftsmanship**: Tactile inputs, gentle micro-borders, and clear status indicators translate complex content schemas into intuitive interfaces suitable for non-technical curators.

## Colors

The color architecture relies on a crisp high-key functional plane framed by a slate-black shell, accented by focused coral-red primaries.

### Core Palette
- **Primary (`#ea584c`)**: Active states, primary action triggers ("Publicar", "Guardar Cambios"), progress metrics, and selected focus rings.
- **Secondary (`#18222d`)**: Core structural canvas for the sidebar navigation, primary text headers, and authoritative surface accents. Complemented by `#0f172a` for active sidebar states and deep dropdown menus.
- **Tertiary (`#0ea5e9`)**: Auxiliary info tokens, inline external link cues, and media preview indicators.
- **Neutral (`#64748b`)**: Subtle slate base for secondary labels, metadata, iconography, and subtle layout divisions.

### Surface Tiers & Boundaries
- **Workspace Canvas**: `#ffffff` (Pure white) for post editing cards, content lists, and canvas editors.
- **Background Base**: `#f8fafc` (Slate 50) for outer canvas framing, table headers, and passive toolbars.
- **Borders & Dividers**: `#e2e8f0` (Slate 200) for structural lines; `#cbd5e1` (Slate 300) for input field resting states.
- **Sidebar Surface**: `#18222d` base, `#0f172a` for elevated sidebar flyouts or secondary drawer panels.

### Semantic Status Colors
- **Publicado (Published)**: Soft emerald background (`#ecfdf5`), border (`#a7f3d0`), foreground text (`#047857`).
- **Borrador (Draft)**: Subtle slate-amber wash background (`#f8fafc`), border (`#e2e8f0`), foreground text (`#475569`).
- **Programado (Scheduled)**: Sky tint background (`#f0f9ff`), border (`#bae6fd`), foreground text (`#0369a1`).
- **Peligro / Error (Destructive)**: Crimson wash background (`#fef2f2`), border (`#fecaca`), foreground text (`#b91c1c`).

## Typography

Plus Jakarta Sans provides geometric modernity, legible numerals, and open counters that remain crisp across high-density tables and compact meta bars.

### Application Hierarchy
- **Display & Large Headlines**: Reserved for section headers, live content statistics, and main admin view titles ("Proyectos & Publicaciones").
- **Medium & Small Headlines**: Applied to modal titles, card headers, drawer labels, and dashboard widget modules.
- **Body Styles**: Tuned with generous line heights (`22px` on `14px` base) to allow scanning of post excerpts, SEO metadata, and system prompts.
- **Label Tokens**: Elevated weights (`500` through `600`) ensure clarity for button text, tabular column headers (uppercase tracking enabled via `label-sm`), and form field captions.
- **Monospace Accent**: JetBrains Mono is designated for slug previews (`/portfolio/slug-de-ejemplo`), revision hashes, and asset dimensions.

## Layout & Spacing

The layout model uses a responsive fixed-rail master layout with an adaptive content plane.

### Spatial Grid System
- **Base Grid**: Built on an incremental 4px/8px rhythm.
- **Desktop Anatomy (>= 1200px)**: 
  - Left navigation rail: Fixed `260px` in dark slate (`#18222d`).
  - Global administrative action bar: Sticky `64px` height with subtle bottom border (`#e2e8f0`).
  - Content Stage: Expands fluidly up to `1280px` max-width with `32px` (`space-xl`) outer margins to prevent edge-hugging.
- **Tablet Anatomy (768px - 1199px)**:
  - Navigation rail collapses to an icon-rail format (`64px`), or an overlay drawer.
  - Stage padding contracts to `24px` (`space-lg`).
- **Mobile Anatomy (< 768px)**:
  - Sidebar transitions to an off-canvas drawer triggered via header burger.
  - Action items collapse into unified sticky bottom toolbars for critical mobile editorial approval.
  - Content forms stack to a single 12-column span with `16px` (`space-md`) horizontal gutters.

## Elevation & Depth

This system avoids heavy, blurred drop shadows, utilizing low-contrast boundaries (`#e2e8f0`) and surgical, tinted micro-shadows that keep data tables and panels crisp.

### Elevation Levels
- **Level 0 (Flat Canvas)**: Default background for page containers (`#f8fafc`) and base table surfaces. Demarcated solely by 1px borders of `#e2e8f0`.
- **Level 1 (Cards & Modules)**: Background `#ffffff`, border 1px solid `#e2e8f0`, accompanied by a slight drop: `0px 1px 3px rgba(15, 23, 42, 0.04), 0px 1px 2px rgba(15, 23, 42, 0.02)`.
- **Level 2 (Dropdowns, Menus & Tooltips)**: Background `#ffffff`, border 1px solid `#cbd5e1`, shadow: `0px 4px 12px rgba(15, 23, 42, 0.08), 0px 2px 4px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Modals & Asset Previews)**: Floated centered sheets with shadow: `0px 20px 25px -5px rgba(15, 23, 42, 0.12), 0px 8px 10px -6px rgba(15, 23, 42, 0.06)`. Backdrops use `#0f172a` with an opacity of 60% and a subtle `blur(4px)`.
- **Level 4 (Sticky Topbars & Float Bars)**: Background `#ffffff` at 95% opacity with `backdrop-filter: blur(8px)` and a directional border bottom `1px solid #e2e8f0`.

## Shapes

The design uses a clean, disciplined soft corner architecture (`roundedness: 1` / 4px base). 

- **Inputs, Buttons, Badges, Table Rows**: Rounded with `0.375rem` (6px) or `0.25rem` (4px). This preserves a precise, tool-like feel without looking sterile.
- **Cards, Modals & Floating Shelves**: Constructed with `0.5rem` (8px, `rounded-lg`).
- **Status Pills**: Fully rounded (`9999px`) to create distinction between actionable UI elements and passive indicators.
- **Media Previews & Featured Thumbnails**: `0.375rem` (6px) radius with an inset 1px hairline border (`rgba(0,0,0,0.06)`) to preserve boundaries against pure white cards.

## Components

### Buttons
- **Primary**: Background `#ea584c`, text `#ffffff`, font `label-lg`, height `40px`, padding `0 16px`. Hover: `#d8473b`. Active: `#c43c31`. Focus: `0 0 0 3px rgba(234, 88, 76, 0.25)`.
- **Secondary / Outline**: Background `#ffffff`, border `1px solid #e2e8f0`, text `#18222d`. Hover: background `#f8fafc`, border `#cbd5e1`.
- **Ghost / Tertiary**: Background transparent, text `#64748b`. Hover: background `#f1f5f9`, text `#18222d`.
- **Destructive**: Background `#fef2f2`, border `1px solid #fecaca`, text `#b91c1c`. Hover: background `#fee2e2`.

### Status Pills & Badges
- **Publicado (Published)**: Fully rounded pill, font `label-sm`, padding `2px 10px`. Background `#ecfdf5`, text `#047857`, border `1px solid #a7f3d0`. Preceded by a 6px circular green dot (`#10b981`).
- **Borrador (Draft)**: Fully rounded pill, font `label-sm`, padding `2px 10px`. Background `#f8fafc`, text `#475569`, border `1px solid #cbd5e1`. Preceded by a 6px circular slate dot (`#94a3b8`).
- **Category Chips**: Font `label-sm`, height `24px`, background `#f1f5f9`, text `#334155`, radius `4px`. Optional dismissible `×` icon for multi-select taxonomy fields.

### Form Inputs & Selects
- **Text Inputs**: Height `40px`, font `body-md`, background `#ffffff`, border `1px solid #cbd5e1`, radius `6px`, padding `0 12px`. Focus: border `#ea584c`, box-shadow `0 0 0 3px rgba(234, 88, 76, 0.15)`.
- **Input Labels**: Font `label-md`, text `#18222d`, margin-bottom `6px`.
- **Helper/Error Text**: Font `body-sm`. Helper text `#64748b`; error text `#dc2626`.
- **Slug Input Combo**: Unified input group with static prefix block (`portfolio.com/`) in `#f1f5f9` slate and editable text segment on `#ffffff`.

### Checkboxes & Switches
- **Checkboxes**: Dimensions `18px × 18px`, radius `4px`, border `1.5px solid #94a3b8`. Checked state: background `#ea584c`, border `#ea584c`, icon white checkmark.
- **Toggles / Switches**: Width `36px`, height `20px`, radius `9999px`. Inactive: background `#cbd5e1`. Active: background `#ea584c`. Thumb: `16px` white circle with `0 1px 2px rgba(0,0,0,0.15)`.

### Tables & Card Lists
- **Data Table**: Border-collapse structure. Row height `56px`. Alternating rows maintain white surfaces with subtle bottom divider `1px solid #e2e8f0`. Hover row state: `#f8fafc`. Header row: height `40px`, background `#f8fafc`, text `label-sm` uppercase `#64748b`.
- **Project/Article Management Card**: Surface `#ffffff`, border `1px solid #e2e8f0`, radius `8px`, inner padding `16px`. Left: `64px × 64px` image thumbnail. Center: Post title (`headline-sm`), slug preview (`code-sm`), status pill, and date. Right: Contextual three-dot action menu (`Editar`, `Duplicar`, `Vista Previa`, `Eliminar`).

### Modals & Previews
- **Modal Container**: Max-width `680px`, radius `8px`, background `#ffffff`, border `1px solid #e2e8f0`. Header separated with bottom divider and clear title + close action. Sticky footer toolbar containing primary commitment button aligned right.
- **Device Preview Switcher**: Segmented toggle component nested inside the top bar (Desktop, Tablet, Mobile icons) with active segment background `#ffffff`, text `#18222d`, and subtle drop shadow.