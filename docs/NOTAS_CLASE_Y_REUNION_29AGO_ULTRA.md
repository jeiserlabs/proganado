# NOTAS Y BOCETOS PROGANADO | 29-AGO-2026 (CAVEMAN ULTRA)

[ORIGEN] 4 fotos de sesión presencial CESDE (Ficha 005263) + Bocetos de arquitectura ProGanado.
[OBJETIVO] Especificación técnica de datos, entidades, requerimientos de negocio y agenda de entregas.

---

## 1. TABLERO ACADÉMICO & SUSTENTACIÓN (Fotos 03 y 04)

### Metadatos de Ficha & Asignatura
- Ficha: `005263`
- Momento: Primer Momento Evaluativo (Bases de Datos & Lógica/Frontend).
- Evaluación: 1er Parcial presencial (9:45 AM - 10:30 AM / 40-60 min).

### Cronograma de Sustentación MER / MR (15 min por grupo)
- 08:00 - 08:15: Alejandra (PNG + Link)
- 08:15 - 08:30: Sebastián (PNG + Link)
- 08:30 - 08:45: **Abraham (Jeiser Gutiérrez)** -> Sustentación MER & MR ProGanado (PNG + Link).
- 08:45 - 09:00: Juan García
- 09:00 - 09:15: Juan José
- 09:15 - 09:30: Ana
- 09:30 - 09:45: Andrés
- 09:45 - 10:30: **PARCIAL ESCRITO / PRÁCTICO**.

### Requisitos de Entrega Momento 1
1. **MER (Modelo Entidad-Relación):** Formato visual claro (Mermaid / PNG).
2. **MR (Modelo Relacional):** Tablas normalizadas en 3FN con PKs, FKs, tipos y cardinalidad estricta.
3. **Elevator Pitch:** Presentación ejecutiva en 7 Slides (Problema, Solución, Arquitectura, Modelo de Datos, Demo/Frontend, Escalabilidad, Conclusiones).
4. **Semántica HTML5:** Estructura web estándar (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, servicios, productos, testimonios, formulario de contacto, mapa/ubicación).
5. **Tareas & Platzi:** Taller 1 (4 páginas radicadas), Taller 2 (PDF radicado 30-Ago), Avances Platzi IA (60% / 50% verificados).

---

## 2. BOCETOS DE MODELO DE DATOS & REGLAS DE NEGOCIO (Fotos 01 y 02)

### Entidad Principal: `BOVINO`
- **Atributos capturados:**
  - `id_bovino` (PK, Integer/BigInt autonumérico o UUID).
  - `nombre` (Varchar, ej: "Lulita").
  - `estado_bovino` (Enum: `Vivo`, `Muerto`, `Vendido`, `Descartado`).
  - `tipo_registro` (Enum: `Nacimiento` [Nace en finca], `Compra` [Comprado], `Recluta`, `Arriendo`).
  - `peso_inicial` (Decimal/Float kg).
  - `fecha_nacimiento` (Date, ej: `01-04-2020`).
  - `sexo` (Enum: `Macho`, `Hembra`).
  - `fk_padre` (FK self-referential a `bovino.id_bovino`, nullable).
  - `fk_madre` (FK self-referential a `bovino.id_bovino`, nullable).

### Entidad Histórica / Trazabilidad: `MARCACION` (Relación: "Se Marca")
- **Problema de negocio resuelto:** En ganadería real los aretes se caen, se reasignan o se marcan por etapas (hierro, arete visual, chip RFID). Un bovino puede tener múltiples marcaciones históricas, y una consulta crítica es: *"¿Quiénes tienen o tuvieron el Arete X en la fecha Y?"*.
- **Atributos capturados:**
  - `id_marcacion` (PK).
  - `fk_bovino` (FK hacia `BOVINO.id_bovino`).
  - `arete` / `codigo_marca` (Varchar, ej: "Arete 50", "Arete 52").
  - `tipo_marca` (Enum: `Arete Visual`, `Caravana RFID`, `Hierro Caliente`, `Tatuaje`).
  - `fecha_marcacion` (Date, ej: `29-08-2026`, `30-08-2026`).
  - `hora_marcacion` (Time).
  - `estado_marca` (Enum: `Activa`, `Extraviada`, `Reemplazada`, `Inactiva`).

### Entidad / Módulo Reproductivo & Detección de Celo (Foto 02)
- **Flujo UI / Negocio:**
  - `[ 50 ] [ Buscar ]` -> Operador ingresa número de arete en el sistema.
  - `estado_reproductivo (En celo)` -> **Cálculo Automático / Trigger**: El sistema detecta automáticamente si la hembra está en ventana fértil de celo según fecha del último parto, días de descanso y ciclo estral (21 días).
  - `52 ------ En celo` -> Alerta visual en dashboard para programar inseminación artificial o monta controlada con el reproductor.

---

## 3. IMPLICACIONES PARA LA ARQUITECTURA PROGANADO (GRADO PRODUCCIÓN)

1. **Cero limitación a 7 tablas:** El sistema real requiere soporte multi-hato, potreros con aforos, pesajes periódicos (cálculo de ganancia diaria de peso - GDP), control sanitario con periodos de carencia/retiro, producción lechera diaria (ordeño mañana/tarde) y trazabilidad reproductiva completa (palpaciones, inseminaciones, partos).
2. **Normalización 3FN:** Separar catálogos (razas, tipos de vacuna, lotes/potreros) de tablas transaccionales (pesajes, eventos médicos, producción, movimientos de potrero).
3. **Consistencia de datos:** Triggers y CHECK constraints para evitar machos lactando, vacas madre más jóvenes que sus crías y registros de ordeño en bovinos machos o estados inactivos.