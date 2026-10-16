# ProGanado SaaS • Design System & Visual Identity Tokens
> Basado en las directrices globales de `ui_ux_pro_max` (106k ⭐) y `premium_ui`.

## 1. Identidad de Marca & Concepto Visual
- **Arquetipo:** AgTech de Precisión, Grado Veterinario & Bio-Seguridad Lechera.
- **Inspiración:** Linear, Supabase, Delaval Dairy Intelligence, CattleEye.
- **Objetivo Visual:** Transmitir alta tecnología, confiabilidad científica y rigor zootécnico (cero interfaces rurales anticuadas o clichés folclóricos).

---

## 2. Paleta Cromática Canónica (Tailored HSL & Hex)
- **Fondo Base (Dark Canvas):** `#09090b` (Zinc 950 ultra-profundo con textura de micro-rejilla).
- **Superficie de Tarjetas (Surface Card):** `rgba(18, 20, 24, 0.75)` con `backdrop-filter: blur(20px)`.
- **Bordes Semitransparentes:** `rgba(255, 255, 255, 0.08)` (estado normal) y `rgba(16, 185, 129, 0.4)` (hover activo).
- **Color Primario (Esmeralda Pecuario):** `#10b981` (Glow: `rgba(16, 185, 129, 0.25)`). Representa sanidad animal e inocuidad.
- **Color Secundario (Cyan Trazabilidad):** `#06b6d4`. Representa telemetría y sensores.
- **Color de Alerta Sanitaria (Cinta Roja Fail-Closed):** `#ef4444` / `#f87171`. Bloqueo absoluto por antibiótico ICA.
- **Color de Atención Reproductiva (Días Abiertos):** `#f59e0b`. Celo y fertilidad.

---

## 3. Tipografía & Jerarquía Visual
- **Fuente Primaria (Headings & UI):** `Plus Jakarta Sans` (Google Fonts, pesos 600, 700, 800, 900).
  * *Tracking:* `-0.03em` para títulos con pegada editorial moderna.
  * *Contraste:* Títulos en `#ffffff`, subtítulos en `#a1a1aa` (Zinc 400).
- **Fuente Técnica (Métricas, Aretes ICA & SQL):** `JetBrains Mono` (Google Fonts, pesos 500, 700).

---

## 4. Componentes Clave & Reglas de Composición
1. **Fotografía Real de Ganado:** Cada tarjeta de animal debe incluir su fotografía real en alta definición con proporción cuadrada y esquinas redondeadas (`border-radius: 12px`).
2. **Badges de Certificación Pecuaria:** Pastillas redondeadas con borde sutil translúcido (`rounded-full`, `bg-emerald-500/10`, `border-emerald-500/30`).
3. **Bento Grids Asimétricos:** Tarjeta principal de ancho 2x con simuladores de cálculo, acompañada de tarjetas satélite con métricas clave.
4. **Microinteracciones Obligatorias:** Elevación táctil sutil en hover (`hover:-translate-y-1 hover:shadow-2xl transition-all duration-200`).
