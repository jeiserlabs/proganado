# GUIA Y ESPECIFICACION TECNICA FRONTEND PROGANADO (PARA SEBASTIAN Y EQUIPO)

[PROPOSITO] Especificacion visual y de arquitectura web HTML5 Responsive para el equipo de desarrollo (Sebastian, Jeiser, Camila, Emilio, Hernan).

---

## 1. DECISION DE ARQUITECTURA: WEB HTML5 RESPONSIVE ($0 SAAS / CERO INSTALACION)

### ¿Por que HTML5 Responsive en lugar de un ejecutable (.exe / instalador)?
1. **Cero Friccion de Instalacion:** Se abre directamente en cualquier navegador (Chrome, Edge, Safari) en PC, tablet o celular del asistente/capataz.
2. **Compatibilidad Total CESDE:** En las salas de computo de CESDE (que tienen *Deep Freeze* y bloquean instalaciones de software), la pagina web funciona al 100% desde una memoria USB o GitHub Pages sin requerir permisos de Administrador.
3. **Escalabilidad Real:** Funciona offline con *LocalStorage / SQLite Web* o conectada a una API backend futura (FastAPI / Node.js).

---

## 2. ESTRUCTURA DE ARCHIVOS Y MODULOS FRONTEND

```text
E:\PROYECTOS\Mis_Proyectos\ProGanado\02_Vistas_HTML5\
├── index.html                  # Landing page institucional & Pitch (para sustentar)
├── login.html                  # Pantalla de acceso y seleccion de rol
├── dashboard.html              # Panel principal de control operativo y KPIs
├── registro_bovino.html        # Formulario maestro de ingreso y marcacion de aretes
├── control_ordeno.html         # Registro agil de produccion lechera por jornada
├── sanidad_reproduccion.html   # Gestion de celos (21 dias), tratamientos y retiro
├── mapa_potreros.html          # Visor visual de rotacion de pastos y aforos
├── css/
│   ├── styles.css              # Variables de diseno, tipografia y layout responsive
│   └── dashboard.css           # Componentes UI (KPI cards, tablas, badges)
└── js/
    ├── app.js                  # Logica de navegacion y almacenamiento local (Mock/API)
    └── alerts_engine.js        # Motor de alertas automaticas (celo, secado, retiro)
```

---

## 3. ESPECIFICACION DE VISTAS (PANTALLA POR PANTALLA)

### 3.1. `login.html` (Autenticacion & Roles)
* **Campos:** Correo electronico, contrasena, selector de rol (`Asistente Administrativo`, `Veterinario`, `Administrador Finca`).
* **Micro-interaccion:** Boton de ingreso con feedback visual instantaneo y modo "Demo Rapida" para la presentacion en clase.

### 3.2. `dashboard.html` (Centro de Comando)
* **Tarjetas KPI Superiores (Cards con iconos y contraste):**
  1. `Total Bovinos Activos:` [ 142 cabezas ] (78 Hembras, 64 Machos).
  2. `Vacas en Lactancia / Ordeño:` [ 45 vacas ] (Produccion estimada: 680 L/dia).
  3. `Promedio Litros / Vaca / Dia:` [ 15.1 L/vaca ].
  4. `Alertas Criticas Sanitarias:` [ 2 vacas en Retiro ] ⚠️ (Leche bloqueada para venta).
* **Seccion de Notificaciones Inteligentes (Trigger 21 dias):**
  * 🔴 *Alerta Celo:* Vaca Arete #50 (Lulita) entro en ventana fertil hoy (Ciclo 21 dias cumplido).
  * 🟡 *Alerta Secado:* Vaca Arete #28 entra en periodo seco (Dia 223 de gestacion).
  * ⛔ *Bloqueo Retiro:* Vaca Arete #14 tratada con Penicilina intramamaria -> Retiro hasta 02-Sep.

### 3.3. `registro_bovino.html` (Formulario Unificado)
* **Seccion 1: Identificacion:**
  * Codigo de Arete Inicial (Ej: "Arete 50").
  * Tipo de Marca (`Arete Visual`, `Caravana RFID`, `Tatuaje`, `Hierro`).
* **Seccion 2: Datos Zootecnicos:**
  * Nombre, Sexo (`Hembra` / `Macho`), Fecha de Nacimiento, Peso Inicial (kg), Raza (Dropdown: Holstein, Jersey, Gyr, etc.).
* **Seccion 3: Tipo de Ingreso (Segun especificacion de reunion):**
  * Dropdown: `Nacimiento en Finca`, `Compra Comercial`, `Arrendamiento / Engorde`, `Donacion`.
* **Seccion 4: Genealogia:**
  * Seleccion de Padre (Toro reproductor / Pajilla) y Madre (Vaca madre) para trazabilidad.

### 3.4. `control_ordeno.html` (Produccion Lechera por Jornadas)
* Selector de Fecha y Jornada (`Mañana` 4:00 AM / `Tarde` 2:00 PM / `Noche` 6:00 PM).
* Tabla interactiva editable en linea con autocompletado por arete.
* **Comportamiento Sanitario Automático:** Si el operador escribe un arete que esta en tiempo de retiro, la fila se pinta en rojo y el checkbox `Apta para Venta` se deshabilita automaticamente con un tooltip: *"Fármaco activo: Fin de retiro 02-Sep"*.

### 3.5. `mapa_potreros.html` (Rotacion de Pasturas Voisin)
* Grilla interactiva de potreros (Potrero 1 al 12).
* Codigo de colores por estado:
  * 🟢 **Verde:** En descanso (pasto recuperado, listo para pastoreo).
  * 🔵 **Azul:** Ocupado actualmente (muestra numero de animales y dias de ocupacion).
  * 🟡 **Amarillo:** En mantenimiento / abono.

---

## 4. GUIA DE ESTILO VISUAL & UI/UX (ANTI-GENERICA)

* **Paleta Agro Premium:**
  * Primario Profundo: `#1b4332` (Verde bosque oscuro).
  * Secundario Esmeralda: `#2d6a4f` y `#40916c`.
  * Acento Vibrante: `#52b788` y `#74c69d`.
  * Fondos Claros: `#f8f9fa` / Paneles `#ffffff`.
  * Alertas / Danger: `#e63946` (Rojo alerta retiro) / `#f77f00` (Naranja celo).
* **Tipografia:** `Inter` o `Poppins` (fuentes limpias del sistema, legibles y modernas).
* **Bordes y Sombras:** `border-radius: 12px`, sombras suaves `box-shadow: 0 4px 12px rgba(0,0,0,0.05)`.