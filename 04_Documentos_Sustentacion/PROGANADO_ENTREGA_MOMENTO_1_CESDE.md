# 📄 PROGANADO — DOCUMENTO TÉCNICO DE ENTREGA OFICIAL
## PROYECTO INTEGRADOR NIVEL 1 | MOMENTO 1 (2026-2)
**Escuela de Nuevas Tecnologías — CESDE Institución de Educación Superior**

---

### DATOS INSTITUCIONALES DEL PROYECTO
* **Nombre del Software:** ProGanado (SaaS Integral de Gestión Ganadera, Trazabilidad e Inocuidad Lechera)
* **Línea de Formación:** Desarrollo de Software / Arquitectura de Datos y Web Semántica
* **Repositorio Público de Verificación (GitHub):** [https://github.com/jeiser270997-source/ProGanado](https://github.com/jeiser270997-source/ProGanado)
* **Fecha de Entrega:** Domingo, 30 de Agosto de 2026

### EQUIPO DE DESARROLLO Y ASIGNACIÓN DE ROLES
1. **Jeiser Abraham Gutiérrez:** Tech Lead, Arquitecto de Base de Datos y Diseñador de Infraestructura Cloud.
2. **Sebastián Gómez:** Frontend Lead & Desarrollador de Maquetación HTML5 Semántica y Accesibilidad.
3. **Emilio Villanueva:** Desarrollador de Lógica de Negocio, Algoritmia y Validación en Pseudocódigo PSeInt.
4. **Camila Salas:** Directora Legal, Administrativa y Financiera (Estructuración S.A.S., RST y Cumplimiento ICA/Habeas Data).
5. **Dr. Humberto Pinto:** Asesor Médico Veterinario, Protocolos de Inocuidad Lechera y Aseguramiento de Calidad (QA).

---

> ### ⚠️ SALVEDADES ACADÉMICAS Y DE INGENIERÍA (MOMENTO 1)
> 1. **Capa Visual y Maquetación HTML5 (En Construcción Activa):** La capa visual se presenta en esta entrega como una especificación semántica modular estricta (HTML5 puro sin frameworks pesados ni estilos CSS definitivos) asignada a Sebastián Gómez. Las vistas y formularios se encuentran en fase de maquetación activa conforme a los blueprints de accesibilidad y estructura LEGO.
> 2. **Modelo Entidad-Relación y Relacional (Sujetos a Iteración Continua):** El diseño de la base de datos (MER Chen y Modelo Relacional de 12 tablas en 3FN) corresponde a la arquitectura de lanzamiento inicial. Dicho modelo se encuentra sujeto a refinamientos, normalizaciones complementarias y optimizaciones de índices según las pruebas de carga y retroalimentación de campo en el Momento 2.

---

## 1. RESUMEN EJECUTIVO Y PROBLEMATICA DEL SECTOR GANADERO

### 1.1 Contexto y Diagnóstico en Colombia
La ganadería lechera y de doble propósito en Colombia (especialmente en cuencas lecheras de Antioquia como San Pedro de los Milagros, Santa Rosa de Osos y La Ceja) enfrenta tres graves problemas operativos que generan pérdidas millonarias a los pequeños y medianos productores:

1. **Pérdidas Catastróficas por Contaminación con Antibióticos (Inocuidad Lechera):**
   Cuando un bovino es tratado con medicamentos veterinarios (antibióticos o antiparasitarios), la normatividad sanitaria del ICA y las empresas acopiadoras (como Colanta) exigen un **Tiempo de Retiro** obligatorio. Si una vaca tratada es ordeñada por error y su leche entra al tanque comunal de 1.000 a 5.000 litros, todo el tanque se contamina con residuos químicos. El acopiador rechaza la leche, penaliza al ganadero con el cobro total del lote (pérdidas de 5M a 25M COP) y suspende la recepción del producto.
2. **Descontrol Reproductivo y Exceso de Días Abiertos (>150 Días):**
   Un día abierto adicional por encima de la meta zootécnica (100 días post-parto) representa un costo de sostenimiento sin producción lechera y la pérdida del intervalo ideal de 1 ternero por vaca/año. La falta de registros precisos de celos y servicios genera infertilidad no detectada.
3. **Falta de Trazabilidad e Historial de Aretes:**
   En el campo es común que un bovino pierda su arete físico o sea remarcado (CIN/SINIGAN vs arete de manejo de la finca), perdiendo su historial sanitario y productivo.

### 1.2 La Solución: ProGanado SaaS
ProGanado es una plataforma web y móvil ligera diseñada para digitalizar de punta a punta la operación de la finca ganadera:
* **Módulo Cinta Roja (Fail-Closed):** Bloqueo y semáforo visual que impide que vacas bajo tratamiento ingresen a la sala de ordeño o se mezcle su leche.
* **Control Reproductivo Automatizado:** Cálculo en tiempo real de días abiertos, fechas estimadas de parto y alertas de celo AM-PM.
* **Historial 1:N de Marcaciones:** Registro histórico de todos los aretes y marcas que ha tenido un animal a lo largo de su vida.
* **Rotación de Pasturas (Pastoreo Racional Voisin - PRV):** Monitoreo de días de ocupación y descanso de potreros para evitar la degradación del suelo.

---

## 2. MODELO DE NEGOCIO SAAS Y MONETIZACION

ProGanado opera bajo un modelo de suscripción **B2B SaaS (Software as a Service)** adaptado a la realidad socioeconómica del agro colombiano:

| Plan | Tarifa Mensual | Capacidad Bovinos | Características y Soporte |
|---|---|---|---|
| **Freemium Campesino** | 0 COP / mes | Hasta 15 vacas | 1 Finca, registro básico de ordeño, semáforo Cinta Roja básico, soporte comunitario. |
| **Hacienda Pro (Core)** | 119k COP / mes | Ilimitado | Múltiples potreros PRV, módulo sanitario EHR completo, liquidación con UFC Colanta, reportes ICA en 1 clic. |
| **Empresa Ganadera Multi-Predio** | 299k COP / mes | Ilimitado | Múltiples fincas, roles de mayordomo y veterinario, exportación contable y API REST para acopiadores. |

### Cláusula de Protección de Negocio: "Zero Data Loss"
Para garantizar la confianza del ganadero, si una finca entra en mora en su suscripción SaaS:
1. El acceso al sistema pasa automáticamente a modo **Solo Lectura**.
2. **Cero Pérdida de Datos:** Jamás se eliminan los registros históricos sanitarios ni de pesaje.
3. El ganadero puede consultar y descargar sus reportes históricos para auditorías del ICA en cualquier momento.

---

## 3. CAPA DE PERSISTENCIA: BASE DE DATOS RELACIONAL (3FN)

La arquitectura de datos de ProGanado fue diseñada bajo el estándar de **Tercera Forma Normal (3FN)**, garantizando integridad referencial estricta, eliminación de redundancias y soporte ACID.

### 3.1 Diccionario de las 12 Tablas del Sistema

1. **`usuarios`**: Administradores, veterinarios y mayordomos que acceden al sistema.
   * `id_usuario` (PK, INTEGER/SERIAL), `nombre` (VARCHAR 100), `email` (VARCHAR 120, UNIQUE), `contrasena_hash` (VARCHAR 255), `rol` (VARCHAR 20: 'administrador', 'veterinario', 'operario'), `fecha_registro` (TIMESTAMP).
2. **`fincas`**: Entidad multi-inquilino que agrupa la propiedad ganadera.
   * `id_finca` (PK), `id_usuario` (FK -> `usuarios`), `nombre_finca` (VARCHAR 100), `documento_titular` (VARCHAR 30), `codigo_ica_predio` (VARCHAR 50, UNIQUE), `municipio` (VARCHAR 80).
3. **`suscripciones_saas`**: Control de licencias y facturación mensual de la finca.
   * `id_suscripcion` (PK), `id_finca` (FK -> `fincas`), `plan_tipo` (VARCHAR 30), `estado_acceso` (VARCHAR 20: 'activo', 'mora_solo_lectura', 'cancelado'), `limite_vacas` (INTEGER), `fecha_inicio` (DATE), `fecha_vencimiento` (DATE).
4. **`entregas_acopio`**: Registro de entrega quincenal de leche a plantas industriales.
   * `id_entrega` (PK), `id_finca` (FK -> `fincas`), `fecha_entrega` (DATE), `litros_totales` (DECIMAL 10,2), `valor_bruto_est` (DECIMAL 12,2), `recuento_ufc` (INTEGER - Unidades Formadoras de Colonia).
5. **`potreros`**: Parcelas de pastoreo bajo pastoreo rotacional Voisin.
   * `id_potrero` (PK), `id_finca` (FK -> `fincas`), `nombre_potrero` (VARCHAR 50), `dias_ocupacion` (INTEGER, CHECK > 0), `dias_descanso_prv` (INTEGER, CHECK >= 0).
6. **`razas`**: Catálogo zootécnico de razas lecheras y cárnicas.
   * `id_raza` (PK), `nombre_raza` (VARCHAR 50, UNIQUE: 'Holstein', 'Jersey', 'Normando', 'Gyr', 'Girolando', 'Simmental'), `descripcion_proposito` (VARCHAR 150).
7. **`bovinos`**: Entidad principal del ganado.
   * `id_bovino` (PK), `id_finca` (FK -> `fincas`), `id_potrero` (FK -> `potreros`, NULL), `id_raza` (FK -> `razas`), `fecha_nacimiento` (DATE), `alerta_cinta_roja` (BOOLEAN DEFAULT FALSE), `estado_lactancia` (VARCHAR 25: 'produccion_activa', 'seca', 'gestante', 'crecimiento', 'toro').
8. **`marcaciones`**: Historial 1:N de aretes y marcas físicas del bovino.
   * `id_marcacion` (PK), `id_bovino` (FK -> `bovinos`), `tipo_marca` (VARCHAR 30: 'arete_sinigan', 'arete_manejo_interno', 'tatuaje', 'chip_rfid'), `codigo_valor` (VARCHAR 50), `estado_activo` (BOOLEAN DEFAULT TRUE).
9. **`medicamentos`**: Vademécum farmacológico con tiempos de retiro normativos ICA.
   * `id_medicamento` (PK), `nombre_farmaco` (VARCHAR 100, UNIQUE), `dias_retiro_ica` (INTEGER, CHECK >= 0).
10. **`tratamientos_sanitarios`**: Historial clínico veterinario flexible (EHR).
    * `id_tratamiento` (PK), `id_bovino` (FK -> `bovinos`), `tipo_procedimiento` (VARCHAR 50: 'antibiotico', 'vacunacion_aftosa', 'desparasitacion', 'curacion_podal', 'vitamina'), `id_medicamento` (FK -> `medicamentos`, NULL), `fecha_tratamiento` (DATE), `dosis_ml` (DECIMAL 6,2 NULL).
11. **`pesajes_leche`**: Control de producción diaria por jornada.
    * `id_pesaje` (PK), `id_bovino` (FK -> `bovinos`), `fecha_pesaje` (DATE), `hora_pesaje` (TIME - '04:30:00' AM o '14:30:00' PM), `litros_obtenidos` (DECIMAL 5,2, CHECK > 0).
12. **`eventos_reproductivos`**: Registro del ciclo biológico y reproductivo.
    * `id_evento` (PK), `id_bovino` (FK -> `bovinos`), `tipo_evento` (VARCHAR 40: 'celo_detectado', 'inseminacion_artificial', 'monta_natural', 'diagnostico_prenez_positivo', 'parto', 'aborto'), `fecha_evento` (DATE), `dias_abiertos_calc` (INTEGER NULL).

---

## 4. CAPA LOGICA Y ALGORITMIA (PSEINT) — ASIGNACIÓN: EMILIO VILLANUEVA

Se implementaron tres módulos lógicos en pseudocódigo PSeInt estructurado (`03_Logica_PSeInt/asistente_logica_proganado_completo.psc`), diseñados para ser portados directamente a funciones de backend en Node.js/Python:

1. **Módulo de Inocuidad y Cinta Roja (Fail-Closed):**
   Evalúa la fecha de aplicación del tratamiento y los días de retiro del medicamento según la ficha del ICA. Si los días transcurridos son menores a los días de retiro exigidos, emite una alerta crítica de bloqueo inmediato de la vaca en la sala de ordeño para evitar la contaminación del tanque comunal.
2. **Módulo de Eficiencia Reproductiva y Días Abiertos:**
   Calcula la cantidad de días transcurridos desde el último parto. Si el animal supera los 100 días abiertos sin preñez confirmada, dispara una alarma zootécnica de anestro prolongado para intervención veterinaria con protocolo IATF.
3. **Módulo de Liquidación de Leche y Bonificación por Calidad Bacteriana (UFC):**
   Calcula el pago quincenal multiplicando los litros entregados por el precio base, ajustando bonificaciones (+120 COP/L para UFC < 50.000) o penalizaciones (-150 COP/L para UFC > 300.000) conforme a las tablas de acopio lechero en Colombia.

---

## 5. CAPA FRONTEND Y MAQUETACION SEMANTICA (HTML5) — ASIGNACIÓN: SEBASTIÁN GÓMEZ

### 5.1 Estándar Semántico y Accesibilidad
La capa visual de ProGanado se construye bajo las directrices estrictas de la W3C y accesibilidad web (WCAG 2.1):
* **Cero Contenedores Genéricos Innecesarios:** Prohibido el anidamiento excesivo de etiquetas `<div>`. Uso obligatorio de `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` y `<footer>`.
* **Formularios Accesibles y Robustos:**
  * Asociación obligatoria `<label for="id_campo">` con inputs.
  * Agrupación lógica de campos mediante `<fieldset>` y `<legend>`.
  * Validación nativa del navegador mediante tipos específicos (`type="date"`, `type="time"`, `type="number"`, `type="tel"`, `type="email"`), atributos `required`, rangos `min`/`max` y expresiones regulares `pattern`.
* **Tablas de Datos Tabulares Complejas:**
  * Uso obligatorio de `<caption>`, `<thead>`, `<tbody>` y `<tfoot>`.
  * Cabeceras con atributos de alcance semántico `scope="col"` y `scope="row"`.
  * Consolidación de turnos y lotes mediante `rowspan` y `colspan`.

### 5.2 Roadmap de las 6 Vistas Core en Construcción
1. `dashboard.html`: Tablero principal con semáforo de vacas en Cinta Roja, ocupación de potreros y producción acumulada.
2. `registro_bovino.html`: Formulario completo de alta de animales con asignación de aretes, raza y potrero.
3. `pesaje_leche.html`: Registro de pesaje individual con discriminación por turno matutino y vespertino (`hora_pesaje`).
4. `tratamientos_sanitarios.html`: Ficha clínica electrónica (EHR) para antibióticos, vacunas y cálculo automático de días de retiro.
5. `entregas_acopio.html`: Módulo de facturación y entrega a planta procesadora con recuento de UFC.
6. `potreros_prv.html`: Control de pasturas y rotación de lotes.

---

## 6. DIMENSION LEGAL, ADMINISTRATIVA Y TRIBUTARIA (S.A.S.) — ASIGNACIÓN: CAMILA SALAS

### 6.1 Formalización Empresarial bajo la Ley 1780 de 2016
* **Tipo Societario:** Sociedad por Acciones Simplificada (S.A.S.) denominada **ProGanado S.A.S.**.
* **Beneficio Emprendimiento Joven:** Exención del 100% en el pago de la matrícula mercantil y su primera renovación ante la Cámara de Comercio de Medellín para el Valle de Aburrá, al ser constituida por jóvenes menores de 35 años.

### 6.2 Régimen Tributario Preferencial (RST)
* **Régimen Simple de Tributación:** ProGanado se acogerá al RST, reduciendo la carga impositiva sobre ingresos brutos a tarifas progresivas del **1.8% al 5.4%**, sustituyendo el impuesto de renta tradicional (35%) y simplificando el pago de ICA municipal y aportes parafiscales.
* **Exención de IVA para Software SaaS en la Nube:** De conformidad con el **Artículo 476 Numeral 24 del Estatuto Tributario Colombiano**, los servicios de computación en la nube (Cloud Computing) y software como servicio (SaaS) se encuentran **excluidos del Impuesto sobre las Ventas (IVA 19%)**, permitiendo comercializar la suscripción de 119k COP/mes limpia al ganadero.

### 6.3 Cumplimiento de Habeas Data y Seguridad (Ley 1581 de 2012)
* Toda finca registrada autoriza expresamente el tratamiento de datos zootécnicos.
* Los registros sanitarios y productivos pertenecen exclusivamente al ganadero titular de la finca, garantizando el secreto comercial y la no divulgación a terceros sin orden judicial o regulatoria.

---

## 7. ARQUITECTURA TECNICA Y PLAN DE ESCALABILIDAD CLOUD (DE 0 COP A AWS ENTERPRISE)

ProGanado implementa una estrategia de infraestructura evolutiva **"Zero-Debt Architecture"**, iniciando con costos fijos de cero pesos y migrando a la nube de **Amazon Web Services (AWS)** a medida que la base de clientes de pago genere flujo de caja positivo:

```
+-----------------------------------------------------------------------------------+
|                        HOJA DE RUTA DE INFRAESTRUCTURA CLOUD                      |
+-----------------------------------------------------------------------------------+
| FASE 0: Lanzamiento CESDE ($0 COP/mes)                                            |
| * Frontend: GitHub Pages / Vercel ($0)                                            |
| * Backend: Node.js Express API en Render Free Tier ($0)                           |
| * Base de Datos: PostgreSQL en Supabase Free Tier ($0 / 500 MB)                   |
+-----------------------------------------------------------------------------------+
                                         |
                                         v (10 a 30 Clientes / Ingresos 1.2M-3.5M COP)
+-----------------------------------------------------------------------------------+
| FASE 1: Crecimiento Regional (~120k COP/mes)                                      |
| * Frontend: Cloudflare Pages CDN ($0)                                             |
| * Backend: VPS Gestionado Hetzner / Railway (~40k COP/mes)                        |
| * Base de Datos: Managed PostgreSQL con backups diarios (~80k COP/mes)            |
+-----------------------------------------------------------------------------------+
                                         |
                                         v (50 a 500+ Haciendas / Escala Nacional)
+-----------------------------------------------------------------------------------+
| FASE 2: AWS Enterprise High-Availability (~220k - 300k COP/mes)                   |
| * Frontend & Media: AWS S3 + AWS CloudFront (CDN global SSL)                      |
| * Cómputo API: AWS App Runner / ECS Fargate (Contenedores Docker Auto-escalables) |
| * Base de Datos: AWS RDS PostgreSQL (Multi-AZ, Failover y Cifrado AES-256)        |
| * Mensajería y Triggers: AWS EventBridge / AWS SNS (Alertas Celo/Cinta Roja)      |
| * Almacenamiento S3: Fotos de aretes, actas de vacunación ICA y reportes PDF      |
+-----------------------------------------------------------------------------------+
```

### 7.1 Detalle de Servicios AWS en Fase 2
1. **AWS S3 (Simple Storage Service):** Almacenamiento distribuido para activos estáticos web, imágenes de bovinos y aretes de alta resolución, y documentos oficiales PDF del ICA.
2. **AWS CloudFront:** Red de entrega de contenido (CDN) con puntos de presencia en Sudamérica para garantizar tiempos de carga inferiores a 200 ms en zonas rurales con conectividad 3G/4G.
3. **AWS App Runner / ECS Fargate:** Ejecución serverless de la API REST Express.js sin necesidad de administrar servidores Linux. Auto-escala automáticamente en las horas pico de ordeño (4:00 AM - 6:00 AM y 2:00 PM - 4:00 PM) y reduce su capacidad en horas muertas de la noche para ahorrar costos.
4. **AWS RDS PostgreSQL Multi-AZ:** Base de datos relacional administrada con replicación síncrona en múltiples zonas de disponibilidad, copias de seguridad automáticas punto en el tiempo (*Point-In-Time Restore*) y almacenamiento cifrado.
5. **AWS EventBridge + SNS:** Orquestador de eventos para disparar alertas automáticas de días abiertos y recordatorios de vacunas directamente a los teléfonos móviles de los mayordomos.

### 7.2 Sostenibilidad Financiera de la Infraestructura
El costo total estimado de la infraestructura en AWS Enterprise oscila entre **45 USD y 75 USD mensuales (~180k a 300k COP/mes)**. Con tan solo **3 suscripciones activas del Plan Hacienda Pro (119k COP/mes = 357k COP/mes)**, la infraestructura completa de AWS se paga en su totalidad, dejando márgenes operativos superiores al **90%** sobre el resto de la cartera de clientes.

---

## 8. CONCLUSIONES Y TRABAJO FUTURO (MOMENTO 2)

1. **Integración Completa del Sistema:** ProGanado logra unificar la capa de persistencia relacional en 3FN, la lógica de negocio algorítmica para el campo y la especificación de maquetación web semántica accesible.
2. **Impacto Económico Real:** La solución ataca directamente la principal fuga de capital del ganadero lechero: la contaminación de leche con antibióticos y el exceso de días abiertos.
3. **Compromiso para el Momento 2:**
   * Despliegue completo de las 6 vistas HTML5 interactivas con maquetación CSS responsive (Grid y Flexbox).
   * Implementación de la API REST en Node.js / Express conectada a PostgreSQL.
   * Pruebas de integración E2E automatizadas con Playwright.

---
*ProGanado — Software de Gestión Ganadera e Inocuidad Lechera | CESDE 2026*
