# RESPUESTAS DE CAMPO OFICIALES: ASISTENTE ADMINISTRATIVA (FINCA LECHERA - COLANTA)
[FECHA: 30-Agosto-2026] [FUENTE: Esposa de Emilio / WhatsApp +57 320 6079518]

---

## 1. HECHOS Y RUTINAS CONFIRMADAS 100%

1. **Canal de Reporte Diario (Tratamientos y Servicios):**
   * El capataz y el veterinario **reportan todo en tiempo real por un GRUPO DE WHATSAPP de la finca**.
   * Cada vez que se hace un servicio (inseminacion) o un tratamiento con antibiotico/medicamento, mandan mensaje al grupo de WhatsApp.
   * La asistente administrativa lee ese grupo y alimenta el sistema.

2. **Control de Ordeño Diario (Planilla Fisica Mañana / Tarde):**
   * Se anota la produccion individual de **CADA VACA** tanto en la **MAÑANA** como en la **TARDE** en una planilla fisica que luego se entrega a la asistente.
   * *Validacion:* Nuestra tabla `control_ordeno` con `fk_bovino`, `fecha_ordeno`, `jornada` (Mañana/Tarde) y `litros_leche` es **100% exacta con la realidad de la finca**.

3. **Acopio y Entrega a Colanta:**
   * La cooperativa compradora es **COLANTA**.
   * El carro cisterna de Colanta recoge la leche y deja un **tiquete/reporte fisico de cuantos litros se llevo** (recogida programada semanal del tanque de enfriamiento).

---

## 2. IMPACTO EN EL DISENO DE PROGANADO (OPORTUNIDADES DE ORO)

* **Pantalla de Digitación Rápida de Ordeño:** Una tabla tipo Excel web donde la asistente solo escribe el arete y los litros de la Mañana y de la Tarde en 2 minutos.
* **Módulo de Conciliación Colanta:**
  * La asistente registra el tiquete de Colanta (ej: *"Colanta recogio 4.200 Litros"*).
  * El sistema compara: `Total Ordeñado en la Semana` vs `Total Recogido por Colanta` para mostrar si hubo merma, leche descartada por retiro o perdidas en tanque.
4. **Protocolo Sanitario de Antibióticos (Cinta Roja y Ordeño en Balde):**
   * Hay medicamentos con 0 días de retiro y otros con tiempo de retiro (por lo general **3 días / 72 horas**).
   * **Protocolo Físico en Sala:** A la vaca bajo antibiótico se le coloca una **CINTA ROJA** visible.
   * **Procedimiento de Ordeño:** Al entrar a la sala, el ordeñador ve la cinta roja y **la ordeña en un balde separado** (prohibido conectarla a la tubería del tanque de Colanta).
   * **Reporte:** Se envía al grupo de WhatsApp para que la asistente registre la fecha y los días de retiro en el sistema.

5. **Destino y Manejo de los Terneros Machos:**
   * **Venta Rápida (Mayoría):** La gran mayoría de los terneros machos se venden de pocos días (terneros de leche) para no consumir recursos del hato lechero.
   * **Levante para Carne (Minoría seleccionada):** Se dejan unos pocos machos en la finca para levantarlos, cebarlos y venderlos como ganado de carne.
   * *Impacto en ProGanado:* Al registrar el nacimiento de un macho, el sistema ofrece dos rutas: Venta Rápida Comercial o Lote de Levante para Carne (Control de Peso GDP).
   * **Criterio de Selección por Raza:** La decisión de dejar el macho para carne depende estrictamente de la **RAZA / CRUCE**:
     - *Razas Lecheras Especializadas (Holstein / Jersey):* Se venden casi en su totalidad como terneros de leche.
     - *Razas Doble Propósito / Cruces de Carne (Normando, Simmental, BON, Cruces F1):* Se seleccionan para el lote de levante y ceba por su alta ganancia diaria de peso (GDP).
   * **Venta Inmediata Neonatal:** Los terneros machos se venden **al momento exacto del nacimiento** (dentro de los primeros días).
   * *Optimizacion UX en ProGanado:* Al registrar el parto de la vaca, si es macho, la asistente marca el checkbox [✓] Venta Inmediata de Ternero. El sistema registra el parto de la madre y la salida comercial del macho en un solo paso, sin pedirle llenar fichas largas de un animal que no se queda en la finca.
   * **Momento de Areteo / Marcación (7 Días Post-Nacimiento):** A los animales que se quedan en la finca (hembras de reemplazo y machos de ceba), **se les coloca el arete definitivo 1 semana (7 días) después del nacimiento** (para permitir que el cartílago auricular endurezca y evitar desgarros).
   * *Alerta Automática en ProGanado:* El sistema programa una alerta a los 7 días: [🔔 ARETEAR CRÍA DE VACA #50]. La asistente entra y digita el código del arete colocado.

6. **Población de la Planilla (Exclusiva del Lote en Ordeño):**
   * En la planilla de pesaje de leche **SOLO aparecen las vacas que están activas en ordeño (en lactancia)**.
   * No se mezclan vacas secas, terneras, novillas ni toros.
   * *Automatización en ProGanado:* La pantalla y el PDF de impresión filtran automáticamente el Lote de Lactancia Activa (WHERE estado_productivo = 'En_Ordeño').
     - Al secar una vaca (día 210), sale sola de la lista de ordeño.
     - Al parir y superar los 4 días de calostro, entra sola a la lista de ordeño.

7. **Rol Oficial del Toro en la Finca (Toro Repasador / Rescate):**
   * El toro NO es el método principal; es un **Toro Repasador** para:
     1. **Vacas Repetidoras / Problema:** Vacas que "dan mucha lidia" para quedar preñadas tras varias inseminaciones artificiales fallidas.
     2. **Vacas Regulares:** Vacas de baja producción o genética promedio donde no se justifica gastar una pajilla cara de catálogo.
   * *Regla Inteligente en ProGanado:* Si una vaca suma **3 inseminaciones fallidas**, el sistema genera la alerta: [🔔 RECOMENDACIÓN: DERIVAR A MONTA CON TORO REPASADOR].

8. **Estratificación por Colores (Umbral de 16 Litros/Día):**
   * Los colores en la planilla clasifican el nivel de producción para el **manejo nutricional (ración de concentrado)**:
     - 🟡 **Resaltador Amarillo ($\ge 16$ Litros/día):** Lote de **Alta Producción** (reciben ración extra de concentrado/suplemento en el comedero).
     - 🔵 **Punto Azul / Sin resaltar (< 16 Litros/día):** Lote de **Producción Estándar** (ración básica de mantenimiento).
   * *Automatización en ProGanado:* El software calcula el total diario (AM + PM) y pinta automáticamente en **Amarillo dorado** las filas que sumen $\ge 16$ Litros, calculando la sugerencia de kilos de concentrado.

9. **Detección de Tendencias y Variación Semanal (Subidas y Bajadas):**
   * El pesaje semanal compara la producción de cada vaca contra su semana previa:
     - 🟢 **Vacas que Subieron ($\uparrow$):** Respuesta positiva a pasturas, pico de lactancia.
     - 🔴 **Vacas que Bajaron ($\downarrow$):** Alerta temprana de salud (mastitis subclínica, inicio de celo, cojeras, problemas metabólicos).
   * *Automatización en ProGanado:* El sistema compara automáticamente Litros Semana Actual - Litros Semana Anterior y coloca flechas de tendencia ($\uparrow$ / $\downarrow$) con alertas clínicas si la caída supera el 15%.

================================================================================
✅ VALIDACIÓN OFICIAL DE CAMPO (30-AGO-2026 08:25 AM)
VEREDICTO DE LA ASISTENTE ADMINISTRATIVA: "Perfecto, así se maneja la finca"
ESTADO: MODELO DE DOMINIO 100% CONGELADO Y VALIDADO EN LA VIDA REAL.
================================================================================

10. **El Reporte Ejecutivo de Retroalimentación y Mejora Continua:**
   * La asistente no solo digita datos; su función principal es **extraer el reporte consolidado para evaluar el rendimiento del hato y dar directrices de mejora al personal de campo (capataz/ordeñadores)**.
   * *Módulos Clave en ProGanado:*
     1. **Informe Ejecutivo Semanal/Mensual para el Dueño:** Producción total Colanta, promedio litros/vaca, balance de preñeces y costos de medicamentos.
     2. **Hoja de Tareas e Instrucciones para el Capataz (1 Clic):**
        - Lista de vacas a secar esta semana (Día 210).
        - Lista de vacas a revisar por caída de leche ($\downarrow$).
        - Lista de vacas en celo o repetidoras para toro repasador.

11. **Régimen de Visitas Veterinarias y Seguimiento de Tratamientos:**
   * El veterinario visita la finca para **Jornadas de Palpación Reproductiva** (lotes con 45-60 días post-servicio).
   * En esa visita se define:
     - Vacas Preñadas (Positivas).
     - Vacas Vacías (Negativas).
     - Vacas con Tratamientos Reproductivos / Sanitarios.
   * **Seguimiento por WhatsApp:** La asistente mantiene comunicación continua con el veterinario para reportar evolución y ajustar dosis o fármacos.
   * *Módulo en ProGanado:* **"Jornada de Palpación en Lote"** (lista las vacas con $\ge 45$ días post-inseminación y permite calificar Preñada / Vacía / Tratamiento en 1 solo clic).
   * **Tele-asesoría Veterinaria en Casos Agudos:** Cuando hay una vaca enferma de urgencia (mastitis aguda, fiebre, etc.), el capataz/asistente le envía fotos y síntomas al veterinario por WhatsApp, quien prescribe el fármaco y los días de retiro de inmediato por chat.
   * *Optimizacion en ProGanado:* Formulario de Ingreso Rápido de Tratamiento de Urgencia que activa la Cinta Roja y el bloqueo de leche con solo seleccionar el arete y el medicamento.


12. **Equipo de Campo y Estructura Operativa (4 Personas en Ordeño):**
   * **1 Mayordomo / Capataz:** Supervisa toda la finca, coordina labores y es el **ÚNICO interlocutor directo con la Asistente** vía WhatsApp.
   * **3 Ordeñadores / Vaqueros:** Arrean el ganado a potreros, operan la sala de ordeño, manipulan la leche y llenan la planilla física.

13. **Protocolo Reproductivo Post-Parto (Cronograma Zootécnico Exacto):**
   * **Día 30 Post-Parto:** Aplicación obligatoria de **Vitamina Reproductiva / Estimulante** (Complejo ADE + Fósforo) para reactivar la función ovárica.
   * **Día 50 Post-Parto:** Colocación del **Parche Detector de Celo ("Raspa y Gana" / Estrotect)** en la base de la cola.
     - Cuando la vaca entra en celo, otras vacas la montan y raspan la película plateada.
     - Los vaqueros ven el color fluorescente destapado y avisan de inmediato para inseminar.

14. **Estratificación Reproductiva (Regla de Servicios por Categoría):**
   * ⚪ **Vacas Regulares:** Directo a **Monta Natural con Toro Repasador** (0 pajillas).
   * 🟡 **Vacas Buenas:** Hasta **2 Servicios de Inseminación Artificial (IA)**. Si falla el 2do, van al toro.
   * 🌟 **Vacas Excelentes / Élite:** Hasta **3 Servicios de Inseminación Artificial (IA)** con pajillas de alto valor genético.

15. **Regla de Oro Económica: Límite de 100 Días Abiertos (Pérdida Financiera):**
   * **Umbral Crítico P0:** Una vaca **NO puede superar los 100 días post-parto sin haber sido servida (inseminada)**.
   * Cada día abierto después de los 100 días genera pérdida económica directa y alarga el intervalo entre partos (IEP).
   * *Alerta Automática en ProGanado:* Al llegar al **Día 90 post-parto sin servicio**, el sistema dispara la **Alerta Roja: "Vaca Próxima al Límite de Días Abiertos (Revisión Veterinaria de Anestro/Quistes)"**.

16. **Los 4 Reportes Core que la Asistente Extrae para el Balance de la Finca:**
   * **1. Lista de Palpación Mensual:** Lista de vacas con $\ge 45$ días post-inseminación para la visita programada del veterinario.
   * **2. Historial de Servicios y Tratamientos:** Registro detallado de inseminaciones, montas y fármacos activos.
   * **3. Inventario y Estado Individual (Pirámide del Hato):** Censo de las 163 cabezas desglosadas por estado (lactantes, secas, novillas, crías, toros).
   * **4. Balance General de la Finca (Informe para la Dueña):** Cuadro de mando consolidado con producción total, preñeces, días abiertos y estado financiero.

17. **El Binomio Operativo de Responsabilidad (Directo vs Indirecto):**
   * **Mayordomo (Responsable de Vía Directa):** Opera en el campo, supervisa ordeño y tratamientos, y reporta eventos en caliente por WhatsApp.
   * **Asistente Administrativa (Responsable de Vía Indirecta):** Centraliza, digita, consolida en el software, concilia con Colanta y emite el balance general para la dueña.
