# 🧠 GUÍA DE LÓGICA Y ALGORITMIA EN PSEINT — EMILIO VILLANUEVA
> **Destinatario:** Emilio Villanueva (Head of Operations & PSeInt Lead)  
> **Propósito:** Orientación técnica, pipeline del negocio y opciones de diseño algorítmico para construir el simulador de lógica en PSeInt con o sin IA.  
> **Filosofía Gentleman Programming:** Subprocesos con responsabilidad única (<50 líneas por función), variables con nombres descriptivos y separación clara de flujos.

---

## 🐄 1. EL PIPELINE DE NEGOCIO QUE DEBE MODELAR EL ALGORITMO

El algoritmo en PSeInt debe reflejar la vida real de la finca lechera en **5 módulos clave**:

```
[ INICIO ] 
   │
   ├── 1. Módulo Nacimiento: 
   │      - Si es Macho Lechero (Holstein/Jersey) ──> Salida inmediata por venta neonatal.
   │      - Si es Macho Carne / F1 ──> Lote de levante.
   │      - Si es Hembra ──> Areteo al Día 7 y entra a reemplazo del hato.
   │
   ├── 2. Módulo Ordeño & Cinta Roja (Inocuidad):
   │      - Ingreso de Litros Mañana (AM) y Tarde (PM).
   │      - Si `alerta_cinta_roja == Verdadero` ──> Bloquear entrega y desviar litros a balde de descarte.
   │      - Si `Total_Litros >= 16` ──> Asignar ración extra de concentrado (Alta Producción).
   │
   ├── 3. Módulo Reproductivo & Control de 100 Días Abiertos:
   │      - Vacas Regulares ──> Monta directa con Toro Repasador.
   │      - Vacas Buenas/Élite ──> Hasta 2 o 3 Inseminaciones Artificiales (IA).
   │      - Si `Dias_Post_Parto > 90` y sigue vacía ──> Disparar Alerta Roja de Días Abiertos.
   │
   ├── 4. Módulo Secado:
   │      - Al llegar al Día 210 de gestación (7 meses) ──> Cambiar estado a 'Horra_Seca'.
   │
   └── 5. Módulo Conciliación Colanta:
          - Sumar litros semanales de la finca vs Tiquete de Colanta.
```

---

## 🛠️ 2. OPCIONES DE ESTRUCTURACIÓN EN PSEINT (TÚ ELIGES EL ESTILO)

| Estilo Algorítmico | Ventajas | Estructura en PSeInt |
|---|---|---|
| **A. Menú Modular por Subprocesos** *(Recomendado)* | Código muy fácil de leer, modular y defendible ante el profesor del CESDE. | Menú principal `Segun opcion Hacer` que llama a `SubProceso RegistrarOrdeno()`, `SubProceso EvaluarCintaRoja()`, etc. |
| **B. Simulador de Ciclo de Vida (State Machine)** | Simula el paso de los días de una vaca desde el parto hasta el secado. | Bucle `Mientras` que avanza días (Día 30 vitamina, Día 50 celo, Día 210 secado). |

---

## 📐 3. EJEMPLO DE SUBPROCESO LIMPIO (GENTLEMAN PROGRAMMING)

```pseint
SubProceso EvaluarInocuidadLeche(litrosAM, litrosPM, tieneCintaRoja)
    Definir totalLitros Como Real
    totalLitros <- litrosAM + litrosPM
    
    Escribir "--- EVALUACIÓN DE ORDEÑO ---"
    Escribir "Producción Total del Día: ", totalLitros, " Litros"
    
    Si tieneCintaRoja = Verdadero Entonces
        Escribir "⚠️ ALERTA CINTA ROJA ACTIVA: Vaca bajo antibiótico."
        Escribir "🚫 ACCIÓN: Ordeño en balde. Leche NO APTA para carrotanque Colanta."
    SiNo
        Escribir "✅ LECHE APTA: Enviada al tanque de refrigeración."
        Si totalLitros >= 16 Entonces
            Escribir "🟡 ALTA PRODUCCIÓN: Asignar 4 Kg de concentrado extra."
        SiNo
            Escribir "🔵 PRODUCCIÓN ESTÁNDAR: Asignar ración básica de mantenimiento."
        FinSi
    FinSi
FinSubProceso
```

---

## 🤖 4. PROMPT MAESTRO PARA TRABAJAR CON INTELIGENCIA ARTIFICIAL

Copia y pega este prompt en Claude, ChatGPT o DeepSeek para generar módulos en PSeInt:

```text
Actúa como Profesor de Algoritmia y Lógica de Programación experto en PSeInt (sintaxis estricta en español).
Estoy construyendo la lógica del negocio de "ProGanado", un sistema de gestión para fincas lecheras en Colombia.
Reglas del negocio zootécnico:
1. Cinta Roja: Si la vaca recibió antibiótico, su leche no entra al tanque y va a descarte (cuarentena ICA).
2. Ordeño: Doble jornada (Mañana y Tarde). Si suma >= 16 L/día es alta producción (ración extra).
3. Días Abiertos: Máximo 100 días post-parto para quedar preñada. Alarma al día 90 si está vacía.
4. Servicios: Vacas regulares van al toro repasador; vacas buenas tienen hasta 2 IA antes de ir al toro.

Por favor genera un algoritmo en PSeInt estructurado con Subprocesos limpios y menú interactivo para: [ESCRIBE AQUÍ LO QUE QUIERES: Ej. El módulo de control reproductivo y asignación de toro repasador].
```
