# 🎨 GUÍA DE IMPLEMENTACIÓN FRONTEND & UI/UX — SEBASTIÁN GÓMEZ
> **Destinatario:** Sebastián Correa (Chief Design Officer & Frontend Lead)  
> **Propósito:** Orientación técnica, contexto del negocio ganadero y opciones de diseño para implementar la interfaz web (Móvil, Tablet y Escritorio) con o sin IA.  
> **Filosofía Gentleman Programming:** Código limpio, componentes desacoplados, nombres semánticos, cero estilos mágicos y responsabilidad única por componente.

---

## 🐄 1. CONTEXTO DEL NEGOCIO (QUIÉN USA LA APP Y DÓNDE)

La interfaz de ProGanado no es una app de oficina tradicional. Tiene **dos usuarios con contextos radicalmente opuestos**:

1. **El Operario / Vaquero en Sala de Ordeño (Móvil / Tablet a las 04:30 AM):**
   * **Entorno:** Poca luz, barro, humedad, dedos mojados o con guantes.
   * **Necesidad:** Botones táctiles grandes (mínimo 48px), contraste visual alto, fuentes legibles sin zoom y feedback visual inmediato (rojo para vacas en tratamiento, amarillo para alta producción).
2. **La Asistente Administrativa en Oficina (Escritorio / Laptop):**
   * **Entorno:** Computador de escritorio con teclado numérico.
   * **Necesidad:** Digitación ultrarrápida tipo Excel (tecla `Tab` y `Enter` para pasar de celda en celda) para ingresar pesajes de 60 vacas en menos de 3 minutos.

---

## 📱 2. ENFOQUE RESPONSIVE & BREAKPOINTS RECOMENDADOS

* **Móvil (< 640px):** Modo "Ordeño Rápido" y "Alerta Cinta Roja". Tarjetas verticales (`Cards`), formularios de 1 sola columna.
* **Tablet (640px - 1024px):** Modo "Recorrido de Potreros" y "Palpación en Lote". Tablas resumidas con scroll horizontal suave y botones de acción rápida.
* **Escritorio (> 1024px):** Dashboard completo con planilla de doble ordeño (AM/PM), conciliación con tiquete Colanta y gráficos de curva de lactancia.

---

## 🛠️ 3. OPCIONES DE STACK TECNOLÓGICO (TÚ DECIDES EL CAMINO)

| Opción | Ventajas | Cuándo elegirla |
|---|---|---|
| **A. HTML5 Semántico + Tailwind CSS + Vanilla JS** *(Recomendada para empezar)* | Cero configuración pesada, carga instantánea, respeta el ritmo del CESDE y fácil de compilar en cualquier servidor. | Fase actual (Momento 1 y 2). |
| **B. React + Vite + Tailwind CSS / Shadcn UI** | Componentes reutilizables, excelente manejo de estado para formularios complejos de pesaje. | Fase intermedia (Validación Pro). |
| **C. Next.js / Astro** | Renderizado del lado del servidor (SSR), optimización SEO para la landing comercial de la S.A.S. | Fase de lanzamiento comercial. |

---

## 🎨 4. CÓDIGO DE COLORES & SEMIÓTICA ZOOTÉCNICA

* 🔴 **Rojo Peligro (`#DC2626`):** **Alerta Cinta Roja** (Vaca tratada con antibiótico, ordeño en balde, cuarentena ICA).
* 🟡 **Amarillo Dorado (`#EAB308`):** **Alta Producción** ($\ge 16$ Litros/día, merece ración extra de concentrado).
* 🔵 **Azul Estándar (`#2563EB`):** **Producción Promedio** (< 16 Litros/día, ración básica).
* 🟢 **Verde Éxito (`#16A34A`):** **Vaca Preñada / Confirmada por Palpación**.
* 🟣 **Morado Alerta (`#9333EA`):** **Celo Detectado** (Parche Estrotect raspado, programar inseminación).

---

## 🤖 5. PROMPT MAESTRO PARA TRABAJAR CON INTELIGENCIA ARTIFICIAL

Copia y pega este prompt en Claude, ChatGPT o DeepSeek para generar componentes con todo el contexto inyectado:

```text
Actúa como Diseñador UI/UX Senior y Desarrollador Frontend experto en Tailwind CSS y accesibilidad WCAG 2.1.
Estoy diseñando la interfaz de "ProGanado", un SaaS lechero en Colombia.
Contexto: La app la usan vaqueros en sala de ordeño (móvil/madrugada) y asistentes en oficina (escritorio).
Entidades clave: Bovinos, Pesajes AM/PM, Alerta Cinta Roja (bloqueo antibiótico), Potreros Voisin y Conciliación Colanta.
Reglas de diseño:
1. Responsive Mobile-First (breakpoints sm, md, lg).
2. Botones táctiles grandes (mínimo h-12 en móvil).
3. Semáforo zootécnico: Rojo (#DC2626) para Cinta Roja, Amarillo (#EAB308) para vacas >=16 L/día, Azul (#2563EB) para estándar.
4. Código limpio, semántico, accesible y sin frameworks innecesarios.

Por favor genera el componente para: [ESCRIBE AQUÍ LO QUE QUIERES: Ej. Tabla de digitación rápida de ordeño AM/PM con cálculo de totales].
```
