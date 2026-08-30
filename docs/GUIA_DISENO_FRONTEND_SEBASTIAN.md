# GUIA DE DISENO FRONTEND & MAQUETACION WEB: PROGANADO (PARA SEBASTIAN)

[DOCUMENTO MAESTRO DE DISENO] Especificacion visual, jerarquia, enlaces de inspiracion, assets y estructura HTML5/CSS3 para la maquetacion de ProGanado.

---

## 1. VISION GENERAL & LIBERTAD CREATIVA
Sebastian, tienes total libertad creativa para disenar y estilizar la aplicacion. La regla clave es **evitar el aspecto generico de IA**: queremos una interfaz limpia, profesional, moderna (estilo SaaS internacional AgroTech), con modo claro ordenado, paleta contrastada y excelente jerarquia visual.

---

## 2. IDENTIDAD VISUAL & PALETA DE COLORES (AGRO-TECH PREMIUM)

* **Color Primario (Forest Deep):** `#1b4332` (Verde bosque oscuro para Header/Sidebar).
* **Color Secundario (Emerald):** `#2d6a4f` y `#40916c` (Botones de accion principal y acentos).
* **Acentos de Estado & Alertas:**
  * 🟡 **Alta Produccion (>=16L):** `#ffb703` / `#f39c12` (Dorado calido).
  * 🎀 **Cinta Roja (Antibiotico / Retiro):** `#e63946` / `#d90429` (Rojo alerta fuerte).
  * 🟠 **Celo Probable (21 Dias):** `#f77f00` (Naranja fertilidad).
  * 🟢 **Apta para Venta / Salud:** `#2a9d8f` (Verde esmeralda suave).
* **Fondos y Paneles:**
  * Fondo Principal: `#f8f9fa` (Gris ultraclaro relajante).
  * Tarjetas / Cards: `#ffffff` con sombra suave `box-shadow: 0 4px 12px rgba(0,0,0,0.06)`.
* **Tipografia Recomendada:** `Inter`, `Poppins` o `system-ui, -apple-system, sans-serif`.

---

## 3. BANCO DE RECURSOS & ENLACES DE INSPIRACION (MODELOS REALES)

### Modelos de Dashboard e Interfaces SaaS:
1. **Dribbble AgroTech & Farm Management:**
   * https://dribbble.com/tags/farm-management
   * https://dribbble.com/tags/cattle-dashboard
   * https://dribbble.com/tags/agriculture-dashboard
2. **Themesberg Volt Dashboard (HTML5/Vanilla JS Open Source):**
   * Demo: https://themesberg.com/preview/volt/
3. **Flowbite Tailwind / HTML5 Components:**
   * https://flowbite.com/blocks/application/dashboard/

### Iconografia y Graficos Livianos ($0 Dependencias):
* **Iconos SVG Gratuitos (Lucide Icons):** https://lucide.dev/icons (Recomendados: `milk`, `calendar`, `activity`, `alert-triangle`, `shield-alert`, `user`, `droplets`).
* **Libreria de Graficos en `<canvas>`:** Chart.js (https://www.chartjs.org/) -> CDN rapido: `<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>`.

### Fotografias de Alta Calidad para Adornar (Unsplash / Pexels - Gratis):
* Vacas lecheras Holstein en pastura: `https://unsplash.com/s/photos/dairy-cow`
* Sala de ordeño moderna: `https://unsplash.com/s/photos/milking-farm`
* Paisaje ganadero montanoso (Norte de Antioquia): `https://unsplash.com/s/photos/pasture-farm`

---

## 4. TAMANOS SUGERIDOS DE ASSETS & ETIQUETAS HTML5

| Elemento UI | Tamano / Aspect Ratio Sugerido | Ubicacion en la Interfaz |
|---|:---:|---|
| **Logo ProGanado** | `200x50 px` (Horizontal) o `48x48 px` (Icono) | Navbar superior / Sidebar |
| **Banner Hero (Landing)** | `1920x600 px` (16:9 panoramico) | `index.html` (Cabecera) |
| **Foto de Perfil Bovino** | `400x400 px` (1:1 cuadrado con bordes redondeados) | Ficha de la vaca (`registro_bovino.html`) |
| **Tarjetas KPI** | Min-height `120px` | `dashboard.html` (Cuadricula 4 columnas) |
| **Grafico de Curva Lactea** | `<canvas>` responsive (Height `300px`) | `dashboard.html` y `control_ordeno.html` |

---

## 5. MAPA DE VISTAS A MAQUETAR (6 PANTALLAS CLAVE)

1. `index.html`: Landing institucional, presentacion del equipo y pitch de ProGanado.
2. `login.html`: Pantalla de acceso con selector de roles (`Asistente`, `Veterinario`, `Administrador`).
3. `dashboard.html`: Panel principal con KPIs (Total cabezas, vacas en ordeño, litros hoy), alertas criticas (celo, secado, cinta roja) y grafico de produccion.
4. `control_ordeno.html`: **La pantalla reina.** Tabla semanal con columnas `Vaca`, `AM`, `PM`, `Total (auto-calculado)`, alerta de `Cinta Roja (Ordeño en Balde)` y boton de `Imprimir Planilla PDF`.
5. `registro_bovino.html`: Ficha rapida del animal (arete, raza, tipo de ingreso, genealogia padre/madre) y opcion de "Venta Inmediata de Ternero".
6. `sanidad_reproduccion.html`: Registro rapido de tratamientos de urgencia por WhatsApp y tabla de Jornada de Palpacion.
