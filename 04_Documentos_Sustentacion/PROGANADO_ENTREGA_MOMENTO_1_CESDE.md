# 📄 PROGANADO — DOCUMENTO TÉCNICO DE ENTREGA OFICIAL
## PROYECTO INTEGRADOR NIVEL 1 | MOMENTO 1 (2026-2)
**Escuela de Nuevas Tecnologías — CESDE Institución de Educación Superior**

---

### DATOS INSTITUCIONALES DEL PROYECTO
* **Nombre del Software:** ProGanado (SaaS Integral de Gestión Ganadera, Trazabilidad e Inocuidad Lechera)
* **Línea de Formación:** Desarrollo de Software / Arquitectura de Datos, Algoritmia y Web Semántica
* **Repositorio Público de Verificación (GitHub):** [https://github.com/jeiser270997-source/ProGanado](https://github.com/jeiser270997-source/ProGanado)
* **Fecha de Entrega:** Domingo, 30 de Agosto de 2026

### EQUIPO DE DESARROLLO Y ASIGNACIÓN DE ROLES
1. **Jeiser Abraham Gutiérrez:** Tech Lead, Arquitecto de Base de Datos, QA Lead y Diseñador de Gobernanza Cloud.
2. **Sebastián Correa:** Frontend Lead & Desarrollador de Maquetación HTML5 Semántica y Accesibilidad.
3. **Emilio Villanueva:** Desarrollador de Lógica de Negocio, Algoritmia y Validación en Pseudocódigo PSeInt.
4. **Camila Salas:** Directora Legal, Administrativa y Financiera (Estructuración S.A.S., RST y Cumplimiento ICA/Habeas Data).
5. **Dr. Humberto Pinto:** Asesor Médico Veterinario, Protocolos de Inocuidad Lechera y Aseguramiento de Calidad (QA).

---

> ### ⚠️ SALVEDADES ACADÉMICAS Y DE INGENIERÍA (MOMENTO 1)
> 1. **Capa Visual y Maquetación HTML5 (En Construcción Activa):** La capa visual se presenta en esta entrega como una especificación semántica modular estricta (HTML5 puro sin frameworks pesados ni estilos CSS definitivos) asignada a Sebastián Correa. Las vistas y formularios se encuentran en fase de maquetación activa conforme a los blueprints de accesibilidad WCAG 2.1 y estructura LEGO.
> 2. **Modelo Entidad-Relación y Relacional (Sujetos a Iteración Continua):** El diseño de la base de datos (MER Chen y Modelo Relacional de 12 tablas en 3FN) corresponde a la arquitectura de lanzamiento inicial. Dicho modelo se encuentra sujeto a refinamientos, normalizaciones complementarias y optimizaciones de índices según las pruebas de carga y retroalimentación de campo en el Momento 2.

---

## 1. RESUMEN EJECUTIVO Y PROBLEMATICA DEL SECTOR GANADERO

### 1.1 Contexto y Diagnóstico en Colombia
La ganadería lechera y de doble propósito en Colombia (especialmente en cuencas lecheras de Antioquia como San Pedro de los Milagros, Santa Rosa de Osos y La Ceja) enfrenta tres graves problemas operativos que generan pérdidas millonarias a los pequeños y medianos productores:

1. **Pérdidas Catastróficas por Contaminación con Antibióticos (Inocuidad Lechera):**
   Cuando un bovino es tratado con medicamentos veterinarios (antibióticos o antiparasitarios), la normatividad sanitaria del ICA y las empresas acopiadoras (como Colanta) exigen un **Tiempo de Retiro** obligatorio. Si una vaca tratada es ordeñada por error y su leche entra al tanque comunal de 1.000 a 5.000 litros, todo el lote se contamina con residuos químicos. El acopiador rechaza la leche, penaliza al ganadero con el cobro total del lote (pérdidas de 5M a 25M COP) y suspende la recepción del producto.
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

## 2. GOBERNANZA DE DATOS & TIPADO FUERTE (TYPESCRIPT & ZOD)

Como **Tech Lead y QA Lead**, la arquitectura de ProGanado implementa el principio de **Defensa en Profundidad (Defense in Depth)** y **Tolerancia Cero a Datos Corruptos**. Al tratarse de una S.A.S. de inocuidad alimentaria, los datos ingresados por operarios en campo se validan de forma estricta:

```
[ Entrada Operario / HTML5 ] 
          │  (Validación nativa: required, pattern, min/max)
          ▼
[ Esquema Zod en Runtime ] ──> Rechaza si: Litros <= 0, Fecha futura o Fármaco sin tiempo de retiro
          │  (src/schemas/validation.schemas.ts)
          ▼
[ Contrato TypeScript ] ─────> Cero 'any'. Tipado estricto de 12 entidades
          │  (src/types/domain.types.ts)
          ▼
[ Base de Datos 3FN ] ───────> Restricciones CHECK, NOT NULL, FK ON DELETE RESTRICT
```

### 2.1 Diccionario de Validación por Celda / Input en Interfaz
* **Pesajes de Leche:** `litros_obtenidos` restringido estrictamente entre `0.10` y `60.00` L con paso decimal `step="0.05"`. `hora_pesaje` con patrón regex militar `^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$` para registrar con exactitud el ordeño matutino/vespertino.
* **Tratamientos Sanitarios:** Si el procedimiento es `Antibiótico` o `Vacunación`, el campo `id_medicamento` es de selección obligatoria para disparar el cálculo de días de retiro ICA y activar el semáforo Cinta Roja (*Fail-Closed*).
* **Marcaciones (Aretes):** Código alfanumérico validado con regex `^[A-Z0-9\-_]{2,20}$` para impedir espacios o símbolos inválidos en la base de datos.
* **Código Predio ICA:** Formato oficial obligatorio `^[0-9]{2}-[0-9]{3,5}-[0-9]{3,6}$`.

---

## 3. ESTRATEGIA PEDAGÓGICA BOTTOM-UP (DE FUNDAMENTOS A AWS CLOUD)

ProGanado adopta un modelo evolutivo que respeta y acompaña la formación académica en CESDE:

```
+-----------------------------------------------------------------------------------+
|               CURVA DE MADUREZ TECNOLÓGICA Y FORMATIVA EN PROGANADO               |
+-----------------------------------------------------------------------------------+
| [NIVEL 1: FUNDAMENTOS ROBUSTOS] (Semestre Actual - CESDE Nivel 1)                 |
| • Capa de Datos: 12 Tablas relacionales en 3FN (SQLite / Supabase Free $0)        |
| • Capa Lógica: Algoritmia pura en PSeInt (Inocuidad, Días Abiertos, UFC)          |
| • Capa Visual: HTML5 Semántico puro LEGO + Accesibilidad WCAG 2.1 (Sin CSS pesado) |
| • Gobernanza: Contratos fuertemente tipados en TypeScript & Zod Schema            |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼ (Semestre 2027-1 - CESDE Nivel 2)
+-----------------------------------------------------------------------------------+
| [NIVEL 2: INTEGRACIÓN FULL-STACK & TIPADO BIDIRECCIONAL]                          |
| • Backend: Node.js + Express.js modular con TypeScript estricto                   |
| • Validación: Middleware Zod interceptor en todas las rutas API REST              |
| • Frontend: CSS3 Moderno (Grid / Flexbox) y Vanilla JS interactivo                |
| • Base de Datos: PostgreSQL Gestionado (Supabase Pro / Neon / VPS Hetzner)       |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼ (Comercialización S.A.S. - 50 a 500+ Fincas)
+-----------------------------------------------------------------------------------+
| [NIVEL 3: S.A.S. ENTERPRISE EN AWS CLOUD]                                         |
| • Frontend: React / Next.js + Tailwind CSS + PWA Móvil para el campo              |
| • Almacenamiento Media: AWS S3 (Fotos de aretes, actas ICA, reportes PDF)         |
| • Distribución Global: AWS CloudFront CDN (Baja latencia 3G/4G rural)             |
| • Cómputo API: AWS App Runner / ECS Fargate (Docker serverless auto-escalable)    |
| • Base de Datos: AWS RDS PostgreSQL Multi-AZ (Failover automático y réplicas)    |
| • Eventos y Push: AWS EventBridge + SNS (Alertas WhatsApp/SMS a mayordomos)       |
+-----------------------------------------------------------------------------------+
```

---

## 4. MODELO DE NEGOCIO SAAS Y MONETIZACION

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

## 5. CAPA DE PERSISTENCIA: BASE DE DATOS RELACIONAL (3FN)

La arquitectura de datos de ProGanado fue diseñada bajo el estándar de **Tercera Forma Normal (3FN)**, garantizando integridad referencial estricta, eliminación de redundancias y soporte ACID.

### 5.1 Diccionario de las 12 Tablas del Sistema
1. **`usuarios`**: Administradores, veterinarios y mayordomos (`id_usuario`, `nombre`, `email` UK, `contrasena_hash`, `rol`, `fecha_registro`).
2. **`fincas`**: Entidad multi-inquilino (`id_finca`, `id_usuario` FK, `nombre_finca`, `documento_titular`, `codigo_ica_predio` UK, `municipio`).
3. **`suscripciones_saas`**: Facturación de la finca (`id_suscripcion`, `id_finca` FK, `plan_tipo`, `estado_acceso`, `limite_vacas`, `fecha_inicio`, `fecha_vencimiento`).
4. **`entregas_acopio`**: Despacho de leche a Colanta (`id_entrega`, `id_finca` FK, `fecha_entrega`, `litros_totales`, `valor_bruto_est`, `recuento_ufc`).
5. **`potreros`**: Rotación Voisin PRV (`id_potrero`, `id_finca` FK, `nombre_potrero`, `dias_ocupacion`, `dias_descanso_prv`).
6. **`razas`**: Genética zootécnica (`id_raza`, `nombre_raza` UK, `descripcion_proposito`).
7. **`bovinos`**: Ficha del ganado (`id_bovino`, `id_finca` FK, `id_potrero` FK NULL, `id_raza` FK, `fecha_nacimiento`, `alerta_cinta_roja`, `estado_lactancia`).
8. **`marcaciones`**: Historial 1:N de aretes (`id_marcacion`, `id_bovino` FK, `tipo_marca`, `codigo_valor`, `estado_activo`).
9. **`medicamentos`**: Vademécum e inocuidad ICA (`id_medicamento`, `nombre_farmaco` UK, `dias_retiro_ica`).
10. **`tratamientos_sanitarios`**: Historial clínico flexible EHR (`id_tratamiento`, `id_bovino` FK, `tipo_procedimiento`, `id_medicamento` FK NULL, `fecha_tratamiento`, `dosis_ml`).
11. **`pesajes_leche`**: Curva de producción con `hora_pesaje: TIME` (`id_pesaje`, `id_bovino` FK, `fecha_pesaje`, `hora_pesaje`, `litros_obtenidos`).
12. **`eventos_reproductivos`**: Control 100 días abiertos (`id_evento`, `id_bovino` FK, `tipo_evento`, `fecha_evento`, `dias_abiertos_calc`).

---

## 6. CAPA LOGICA Y ALGORITMIA (PSEINT) — ASIGNACIÓN: EMILIO VILLANUEVA

Se implementaron tres módulos lógicos en pseudocódigo PSeInt estructurado (`03_Logica_PSeInt/asistente_logica_proganado_completo.psc`), diseñados para ser portados directamente a funciones de backend en TypeScript/Node.js:

1. **Módulo de Inocuidad y Cinta Roja (Fail-Closed):**
   Evalúa la fecha de aplicación del tratamiento y los días de retiro del medicamento según la ficha del ICA. Si los días transcurridos son menores a los días de retiro exigidos, emite una alerta crítica de bloqueo inmediato de la vaca en la sala de ordeño para evitar la contaminación del tanque comunal.
2. **Módulo de Eficiencia Reproductiva y Días Abiertos:**
   Calcula la cantidad de días transcurridos desde el último parto. Si el animal supera los 100 días abiertos sin preñez confirmada, dispara una alarma zootécnica de anestro prolongado para intervención veterinaria con protocolo IATF.
3. **Módulo de Liquidación de Leche y Bonificación por Calidad Bacteriana (UFC):**
   Calcula el pago quincenal multiplicando los litros entregados por el precio base, ajustando bonificaciones (+120 COP/L para UFC < 50.000) o penalizaciones (-150 COP/L para UFC > 300.000) conforme a las tablas de acopio lechero en Colombia.

---

## 7. CAPA FRONTEND Y MAQUETACION SEMANTICA (HTML5) — ASIGNACIÓN: SEBASTIÁN GÓMEZ

### 7.1 Estándar Semántico y Accesibilidad
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

---

## 8. DIMENSION LEGAL, ADMINISTRATIVA Y TRIBUTARIA (S.A.S.) — ASIGNACIÓN: CAMILA SALAS

### 8.1 Formalización Empresarial bajo la Ley 1780 de 2016
* **Tipo Societario:** Sociedad por Acciones Simplificada (S.A.S.) denominada **ProGanado S.A.S.**.
* **Beneficio Emprendimiento Joven:** Exención del 100% en el pago de la matrícula mercantil y su primera renovación ante la Cámara de Comercio de Medellín para el Valle de Aburrá, al ser constituida por jóvenes menores de 35 años.

### 8.2 Régimen Tributario Preferencial (RST)
* **Régimen Simple de Tributación:** ProGanado se acogerá al RST, reduciendo la carga impositiva sobre ingresos brutos a tarifas progresivas del **1.8% al 5.4%**, sustituyendo el impuesto de renta tradicional (35%) y simplificando el pago de ICA municipal y aportes parafiscales.
* **Exención de IVA para Software SaaS en la Nube:** De conformidad con el **Artículo 476 Numeral 24 del Estatuto Tributario Colombiano**, los servicios de computación en la nube (Cloud Computing) y software como servicio (SaaS) se encuentran **excluidos del Impuesto sobre las Ventas (IVA 19%)**, permitiendo comercializar la suscripción de 119k COP/mes limpia al ganadero.

### 8.3 Cumplimiento de Habeas Data y Seguridad (Ley 1581 de 2012)
* Toda finca registrada autoriza expresamente el tratamiento de datos zootécnicos.
* Los registros sanitarios y productivos pertenecen exclusivamente al ganadero titular de la finca, garantizando el secreto comercial y la no divulgación a terceros sin orden judicial o regulatoria.

---

## 9. ARQUITECTURA TÉCNICA Y ESCALABILIDAD CLOUD EN AWS

ProGanado implementa una estrategia de infraestructura evolutiva **"Zero-Debt Architecture"**, iniciando con costos fijos de cero pesos y migrando a la nube de **Amazon Web Services (AWS)** a medida que la base de clientes de pago genere flujo de caja positivo:

1. **AWS S3 (Simple Storage Service):** Almacenamiento distribuido para activos estáticos web, imágenes de bovinos y aretes de alta resolución, y documentos oficiales PDF del ICA.
2. **AWS CloudFront:** Red de entrega de contenido (CDN) con puntos de presencia en Sudamérica para garantizar tiempos de carga inferiores a 200 ms en zonas rurales con conectividad 3G/4G.
3. **AWS App Runner / ECS Fargate:** Ejecución serverless de la API REST Express.js sin necesidad de administrar servidores Linux. Auto-escala automáticamente en las horas pico de ordeño (4:00 AM - 6:00 AM y 2:00 PM - 4:00 PM) y reduce su capacidad en horas muertas de la noche para ahorrar costos.
4. **AWS RDS PostgreSQL Multi-AZ:** Base de datos relacional administrada con replicación síncrona en múltiples zonas de disponibilidad, copias de seguridad automáticas punto en el tiempo (*Point-In-Time Restore*) y almacenamiento cifrado.
5. **AWS EventBridge + SNS:** Orquestador de eventos para disparar alertas automáticas de días abiertos y recordatorios de vacunas directamente a los teléfonos móviles de los mayordomos.

---
*ProGanado — Software de Gestión Ganadera e Inocuidad Lechera | CESDE 2026*
