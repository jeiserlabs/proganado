# ESTUDIO DE DOMINIO GANADERO REAL: HACIENDAS LECHERAS EN COLOMBIA (BPG / FEDEGÁN / ICA)

[OBJETIVO] Documento técnico SSOT sobre la operación real de haciendas lecheras (pequeñas, medianas y grandes) para respaldar la arquitectura de software de ProGanado.

---

## 1. COMPARATIVA DE OPERACIÓN: PEQUEÑA FINCA VS HACIENDA TECNIFICADA

| Parámetro | Pequeña Finca / Tradicional (10 - 50 reses) | Hacienda Mediana / Tecnificada (50 - 300+ reses) | Cómo lo resuelve ProGanado ($0 SaaS) |
|---|---|---|---|
| **Registro de Información** | Cuadernos de papel, tablas manchadas, memoria del capataz. | Software propietario costoso (TaurusWebs, Ganadero TP, BovControl). | **App Web HTML5 Responsive:** Digitalización centralizada por asistente administrativo desde celular/PC. |
| **Identificación Animal** | Aretes plásticos que se caen o reutilizan al morir el animal; sin histórico. | Aretes oficiales SINIGAN / RUV + Chips RFID / Bolos ruminales. | **ID permanente (PK) + Tabla `MARCACION` 1:N:** Trazabilidad histórica completa de aretes/marcas. |
| **Detección de Celo** | Observación visual esporádica (se pierden 30-50% de celos -> $350k COP pérdida/ciclo). | Collares / Podómetros con acelerómetros IoT que miden actividad. | **Algoritmo Predictivo Ciclo Estral (21 días):** Alerta automática 48h antes de la ventana fértil. |
| **Control de Ordeño** | Baldes manuales, pesaje ocasional, anotación en pizarra. | Ordeño mecánico en espina de pescado/rotativo con lactómetros automáticos. | **Registro Ágil por Jornadas (Mañana/Tarde/Noche):** Carga rápida por lotes/aretes. |
| **Sanidad & Retiro** | Olvido de fechas de carencia -> Leche con antibiótico contamina tanque comunal. | Bloqueo computarizado de manguera de ordeño para vacas bajo tratamiento. | **Regla Fail-Closed Sanitaria:** Flag `apta_para_venta = FALSE` automático hasta fecha fin de retiro. |
| **Manejo de Potreros** | Pastoreo continuo o rotación intuitiva sin aforo -> sobrepastoreo. | Pastoreo Racional Voisin (PRV), aforos de biomasa y balanceo de carga. | **Módulo de Potreros con Aforo y Días de Descanso:** Control de capacidad máxima y rotación. |

---

## 2. REGLAS ZOOTÉCNICAS Y FISIOLÓGICAS SAGRADAS (COLOMBIA / BPG)

### 2.1. Ciclo Reproductivo Bovino
* **Ciclo Estral:** Promedio **21 días** (rango normal 18 a 24 días).
* **Fase de Estro (Celo visible):** Dura entre 8 y 24 horas (promedio 15h). Vaca se deja montar, muge, vulva inflamada.
* **Periodo de Espera Voluntario (PEV):** 45 a 60 días post-parto de descanso uterino antes de volver a inseminar/montar.
* **Gestación:** Promedio **283 días** (~9 meses y 10 días).
* **Fecha de Secado:** Obligatorio **60 días antes del parto** (Día 223 de gestación). Se suspende el ordeño para recuperación de la ubre y calostrogénesis.

### 2.2. Producción y Calidad de Leche (BPG ICA Res. 67449)
* **Jornadas típicas en Colombia:**
  * **Mañana:** 4:00 AM – 6:30 AM (mayor volumen: 55-60% del total diario).
  * **Tarde:** 2:00 PM – 4:00 PM (mayor grasa/sólidos: 40-45% del total diario).
* **Tiempo de Retiro (Carencia de Fármacos):**
  * Periodo obligatorio entre última dosis y consumo humano.
  * Antibióticos intramamarios / parenterales: 48h a 96h de retiro en leche.
  * Si entra 1 litro con antibiótico a un tanque de 1.000L, las empresas acopiadoras (Colanta, Alpina, Alquería) decomisan y penalizan el 100% del tanque.

### 2.3. Control Genealógico y Consanguinidad
* El cruce entre padre-hija, madre-hijo o hermanos reduce un 15-25% la producción láctea (depresión endogámica) y dispara malformaciones congénitas.
* El software debe verificar que `bovino.fk_padre` y `bovino.fk_madre` no coincidan con el reproductor seleccionado.