# 🎤 ProGanado SaaS — Guion Oficial y Notas de Orador (12 Diapositivas)
**Sustentación Proyecto Integrador · Escuela de Nuevas Tecnologías · CESDE Medellín**
**Tiempo Total Estimado:** 10 a 12 minutos de exposición + 5 minutos de preguntas.

---

## ⏱️ Distribución de Tiempos y Roles por Integrante

| Integrante | Rol en la Empresa | Diapositivas | Tiempo Asignado |
| :--- | :--- | :---: | :---: |
| **Dr. Héctor Pinto** | Asesor Clínico Veterinario & Sanidad ICA | **1, 2** | 2:30 min |
| **Emilio Villanueva** | Algoritmia, Lógica Zootécnica & PSeInt | **3, 4, 5** | 3:00 min |
| **Jeiser Gutiérrez** | Tech Lead, Arquitecto de Datos & QA Lead | **6, 8, 9, 10, 11, 12** | 4:30 min |
| **Sebastián Correa** | Frontend Lead & Maquetación Web | **7 (Live Demo)** | 2:00 min |

---

## 📌 Diapositiva por Diapositiva: Qué Decir y Qué Mostrar

### SLIDE 1 — Portada: ProGanado SaaS
* **Orador:** Dr. Héctor Pinto (30 segundos)
* **Texto en Pantalla:** *Inocuidad Lechera y Gestión de Hato Inteligente · Plataforma Integral Cloud & Offline-First*
* **Guion Oral:**
  > "Buenos días, apreciado jurado y profesor Jonathan. Somos el equipo fundador de **ProGanado SaaS**: Jeiser Gutiérrez, Sebastián Correa, Emilio Villanueva y mi persona, el doctor Héctor Pinto.
  > Hoy les presentamos una solución tecnológica de ingeniería de software diseñada para erradicar los dos dolores más costosos de la cuenca lechera colombiana: la contaminación de leche por antibióticos en acopio y las pérdidas millonarias por descontrol reproductivo en potrero."

---

### SLIDE 2 — El Dolor de Colanta: Pérdidas Críticas en Campo
* **Orador:** Dr. Héctor Pinto (120 segundos)
* **Texto en Pantalla:** *La Pesadilla del Carrotanque (5M a 25M COP) · Días Abiertos (>100 días / ~20k COP/día) · Amnesia de Aretes*
* **Guion Oral:**
  > "En el campo lechero de Antioquia, un descuido de libreta quiebra una finca. La pesadilla de todo ganadero es el carrotanque de Colanta: si una vaca en tratamiento de mastitis se ordeña por error, los residuos de antibiótico contaminan una cisterna comunal de 1.000 a 5.000 litros. La cooperativa veta la finca, suspende el acopio y pasa una cuenta de cobro de **5M a 25M COP** por lote arruinado.
  > Además, cada día abierto por encima de los 100 días post-parto le cuesta al productor **~20k COP diarios** en comida estéril sin retorno. En un hato de 25 reses, 50 días extra × 20k COP/día suman **25M COP al año** (escenario). ProGanado nació en el establo para erradicar estos dolores con software determinista."

---

### SLIDE 3 — La Solución Tecnológica: ProGanado SaaS
* **Orador:** Emilio Villanueva (60 segundos)
* **Texto en Pantalla:** *Offline-First en Potrero · Semáforo Cinta Roja · Control Tanque Frío 4.0 °C · Pastoreo PRV*
* **Guion Oral:**
  > "Para resolver esta realidad diseñamos ProGanado SaaS. La visión es una plataforma offline-first para el campo colombiano: el operario registra pesajes AM/PM y tratamientos en la sala de ordeño sin señal, y los datos se sincronizan al recuperar la red. En esta fase académica, el prototipo experimental guarda en localStorage; la entrega oficial Bootstrap es una maqueta visual que no persiste, y la sincronización PWA es la siguiente fase.
  > Centralizamos en un dashboard operativo el control del tanque frío de Colanta a 4.0 °C, la rotación agroecológica de potreros Voisin y nuestro algoritmo estrella: el semáforo Cinta Roja."

---

### SLIDE 4 — Algoritmo Preventivo: Cinta Roja Fail-Closed
* **Orador:** Emilio Villanueva (60 segundos)
* **Texto en Pantalla:** *Cinta Roja · Regla fail-closed en SQL/TS · PSeInt académico pendiente de corregir*
* **Guion Oral:**
  > "El corazón preventivo de ProGanado es el algoritmo de **Cinta Roja**. En la materia de Lógica lo modelamos en PSeInt y lo llevamos a la base de datos. La regla canónica es **fail-closed** en SQL y TypeScript; el PSeInt académico actual todavía libera el último día y debe corregirse antes de presentarlo como equivalente.
  > Cuando se aplica un fármaco, el sistema calcula: `Fecha_Tratamiento + Dias_Retiro_ICA`. Mientras la fecha actual sea menor o igual al fin del retiro, la vaca queda bloqueada automáticamente para ordeño.
  > Muy importante: la Cinta Roja **NO es una casilla booleana** que el mayordomo pueda apagar a mano. Se materializa en la vista `v_bovinos_cinta_roja`. Ningún operario puede saltarse la norma sanitaria."

---

### SLIDE 5 — Telemetría de Ordeño AM/PM y Pastoreo PRV
* **Orador:** Emilio Villanueva (60 segundos)
* **Texto en Pantalla:** *Turno Doble 04:30 / 14:30 · 480 L (demo) · Tanque 4.0 °C (ejemplo) · Pastoreo Voisin (1-2 días ocupación, 35-42 descanso)*
* **Guion Oral:**
  > "En la maqueta mostramos la telemetría de doble turno como datos de ejemplo: ordeño de la madrugada a las 4:30 AM y de la tarde a las 2:30 PM, 480 L y tanque a 4.0 °C. No es telemetría real ni una medición de campo; la integración con sensores es una fase posterior. El tiquete de Colanta y las UFC también son datos de ejemplo para explicar la conciliación.
  > El módulo de potreros muestra la rotación **Pastoreo Racional Voisin (PRV)** como recomendación de manejo: descansos de 35 a 42 días y ocupaciones máximas de 1 a 2 días. Es un panel visual con datos de ejemplo, no una automatización de campo."

---

### SLIDE 6 — Arquitectura de Persistencia: 12 Tablas en 3FN Estricta
* **Orador:** Jeiser Gutiérrez (75 segundos)
* **Texto en Pantalla:** *Modelo Relacional 3FN · SQLite (dev) / PostgreSQL (prod) · RESTRICT/CASCADE según tabla · 12 Entidades*
* **Guion Oral:**
  > "En la asignatura de Bases de Datos diseñamos un modelo relacional de nivel corporativo compuesto por **12 tablas normalizadas rigurosamente en Tercera Forma Normal (3FN)**.
  > Diseñamos entidades especializadas como `marcaciones` con cardinalidad 1 a N para resolver la pérdida física de aretes en los alambres sin romper el linaje del animal; `medicamentos` y `tratamientos_sanitarios` para la trazabilidad farmacológica inmutable tipo historia clínica (EHR); y `entregas_acopio` para la conciliación con Colanta.
  > Las relaciones del historial clínico usan **RESTRICT**; las tablas dependientes usan CASCADE y el potrero asignado usa SET NULL. Así se protege la historia clínica sin bloquear el borrado de datos dependientes."

---

### SLIDE 7 — Gobernanza de Datos, Dualidad Web & Live Demo
* **Orador:** Sebastián Correa (120 segundos)
* **Acción en Vivo:** Sebastián presenta ambas vertientes y abre el navegador para navegar la página oficial.
* **Texto en Pantalla:** *Página 1 (Bootstrap 5.3 Oficial GitHub Pages) vs Página 2 (Prototipo IA Glassmorphism) · 4 Capas de Blindaje*
* **Guion Oral:**
  > "En el proyecto aplicamos una estrategia de **defensa en profundidad en 4 capas**: HTML nativo en la maqueta; Zod y TypeScript estricto en la capa de datos; y restricciones referenciales en el motor SQL. La maqueta Bootstrap en sí es HTML/CSS + Bootstrap y no ejecuta Zod ni TypeScript.
  > *(Sebastián señala la izquierda de la diapositiva)*:
  > Primero, nuestra **Entrega Oficial Académica en Bootstrap 5.3**, publicada en GitHub Pages: cubre el temario del profesor Jonathan Piedrahita, con maquetación semántica limpia, rejilla de 12 columnas, modales nativos de Bootstrap, sin archivos JavaScript propios (solo dos atributos inline mínimos) y alto contraste WCAG 2.1 para uso bajo el sol.
  > *(Sebastián señala la derecha de la diapositiva)*:
  > Segundo, un **Prototipo Experimental asistido por IA** desarrollado por Emilio: exploramos diseño de vanguardia con efecto de cristal Glassmorphism (`backdrop-filter: blur(22px)`), backend local en Python (demo) y simulación en localStorage de las entidades principales; el modelo completo de 12 tablas vive en el DDL y en los contratos Zod/TS.
  > Procedo a mostrar en vivo el funcionamiento de la plataforma oficial..."
  > *(Sebastián abre el navegador y muestra en 30 segundos: la tabla de bovinos con 8 registros de ejemplo, la ficha de Mariposa y el modal de registro visual. Aclara que la maqueta no guarda datos; la persistencia real está en la demo SQLite.)*

---

### SLIDE 8 — Modelo de Negocio B2B SaaS y Monetización
* **Orador:** Jeiser Gutiérrez (60 segundos)
* **Texto en Pantalla:** *Plan Campesino (0 COP) · Plan Hacienda Pro Core (119k COP/mes) · Plan Empresa (299k COP/mes) · Zero Data Loss*
* **Guion Oral:**
  > "En Emprendimiento estructuramos ProGanado bajo un modelo B2B SaaS con 3 niveles:
  > 1. **Plan Freemium Campesino (0 COP/mes):** hasta 15 vacas en 1 predio para generar adopción masiva y confianza en las veredas.
  > 2. **Plan Hacienda Pro Core (119k COP/mes):** bovinos ilimitados, historial clínico EHR completo, control de días abiertos y liquidación UFC Colanta.
  > 3. **Plan Empresa Ganadera (299k COP/mes):** multi-predio, roles concurrentes y exportación contable.
  > Bajo nuestra política **Zero Data Loss**, si un productor entra en mora, su cuenta pasa a Solo Lectura: sus datos históricos jamás se borran y puede descargar reportes para el ICA."

---

### SLIDE 9 — Mercado Potencial, Datos del Prototipo y ROI
* **Orador:** Jeiser Gutiérrez (60 segundos)
* **Texto en Pantalla:** *116 Aretes de Ejemplo · ROI del Escenario (8.7 Años) · 25M COP Ahorro Días Abiertos · Mercado por Validar*
* **Guion Oral:**
  > "El prototipo incluye **116 aretes de ejemplo** cargados en la demo. No es tracción comercial ni una base real: los pesajes y tratamientos son simulados.
  > En el escenario de 12.5M COP evitados y un plan de 119k COP/mes (1.428M COP/año), el ahorro cubre **8.7 años de suscripción**. En días abiertos, 25 vacas × 50 días extra × 20k COP/día = **25M COP/año**. Son escenarios, no una promesa comercial."

---

### SLIDE 10 — Equipo Fundador Multidisciplinario
* **Orador:** Jeiser Gutiérrez (45 segundos)
* **Texto en Pantalla:** *Los 4 Titanes: Jeiser Gutiérrez · Sebastián Correa · Emilio Villanueva · Dr. Héctor Pinto*
* **Guion Oral:**
  > "La solidez de ProGanado radica en la complementariedad técnica de nuestro equipo:
  > Sebastián lidera el diseño frontend accesible y el maquetado web; Emilio comanda la algoritmia y la lógica zootécnica de producción; el doctor Héctor aporta el rigor veterinario y la farmacopea sanitaria del ICA; y mi persona lidera la arquitectura de datos relacional 3FN, la gobernanza de tipado y el aseguramiento de calidad QA."

---

### SLIDE 11 — Hoja de Ruta Cloud & Escalabilidad
* **Orador:** Jeiser Gutiérrez (45 segundos)
* **Texto en Pantalla:** *Nivel 1 Actual (0 COP SQLite/Bootstrap) ➔ Nivel 2 (Node.js/Zod/PostgreSQL) ➔ Nivel 3 (PWA Offline) ➔ Nivel 4 (AWS Enterprise)*
* **Guion Oral:**
  > "Nuestra arquitectura está diseñada para evolucionar en 4 fases con deuda técnica declarada:
  > Hoy cerramos el **Nivel 1 de CESDE** con el modelo relacional 3FN documentado, una demo SQLite de una tabla y el frontend Bootstrap 5.3. La maqueta web no está conectada a la base; la persistencia se demuestra en la demo SQLite.
  > En el **Nivel 2** desacoplaremos el sistema en una API REST profesional en Node.js, Express, validación con esquemas Zod y base de datos PostgreSQL.
  > Para la etapa comercial desplegaremos la PWA móvil con IndexedDB para potrero y escalaremos a infraestructura empresarial en **AWS** con contenedores ECS Fargate y base de datos RDS Multi-AZ."

---

### SLIDE 12 — Conclusiones & Cierre
* **Orador:** Jeiser Gutiérrez (30 segundos)
* **Texto en Pantalla:** *Inocuidad Biológica · Eficiencia Reproductiva · Rigor de Ingeniería · Modelo B2B*
* **Guion Oral:**
  > "En conclusión, apreciados profesores y jurado: ProGanado demuestra que el software de alta ingeniería no es exclusivo de las multinacionales, sino una herramienta urgente para el ganadero colombiano. Con 12 tablas normalizadas, algoritmia preventiva, pruebas automatizadas y un prototipo funcional, protegemos la economía de la finca y la inocuidad alimentaria del país.
  > Abrimos el espacio para su sesión de preguntas. Muchas gracias."

---

## 🛡️ Matriz de Defensa Contra Preguntas Difíciles del Jurado

1. **"¿Por qué no usar simplemente un campo booleano 'enferma = true' en la tabla de vacas?"**
   * *Respuesta (Jeiser/Emilio):* "Porque violaría la Tercera Forma Normal (3FN) y crearía una vulnerabilidad de seguridad. Un booleano depende de que un operario recuerde desmarcarlo a tiempo o permite que lo apague para ordeñar a escondidas. La Cinta Roja es un **cálculo determinista** basado en la farmacopea del ICA que se materializa en una vista SQL. En SQL/TS es *fail-closed*: mientras la fecha no expire, el sistema prohíbe el ordeño por motor, no por voluntad humana. El PSeInt académico todavía libera el último día; hay que corregirlo antes de decir que es equivalente."

2. **"¿Por qué tienen una tabla 'marcaciones' separada de 'bovinos'?"**
   * *Respuesta (Jeiser):* "Por la realidad del campo colombiano. Los bovinos pierden los aretes plásticos con frecuencia en los alambres de púas. Si la llave primaria o única fuera el arete en la tabla bovino, al perderse el arete se perdería toda la trazabilidad histórica de pesajes y vacunas. En nuestro modelo, el bovino tiene un `id_bovino` inmutable y la tabla `marcaciones` guarda el historial de re-areteos con cardinalidad 1 a N y un flag de estado activo; la fecha de rearete se puede añadir en la siguiente versión."

3. **"¿Cómo garantizan que la página funcione si el mayordomo no tiene señal en el potrero?"**
   * *Respuesta (Sebastián/Emilio):* "La visión es offline-first. En esta fase, el prototipo experimental guarda datos en localStorage; la entrega oficial Bootstrap es una maqueta visual que no persiste. En la fase PWA usaremos IndexedDB y Service Workers: el operario hace el pesaje en el establo, los registros se encolan localmente y se sincronizan al recuperar la red. La resolución de conflictos 'Last-Write-Wins' validada por fecha es parte del diseño de esa fase, no de la maqueta actual."
