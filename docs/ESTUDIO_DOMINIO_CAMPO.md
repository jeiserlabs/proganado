# 🐄 ESTUDIO DE DOMINIO Y RUTINAS DE CAMPO — PROGANADO S.A.S.
> **Fuente de Verdad Operativa (SSOT):** Validación con Asistente Administrativa de Finca Lechera (Esposa de Emilio / WhatsApp Oficial).  
> **Objetivo:** Definir la lógica real del negocio para alimentar la base de datos y la algoritmia.

---

## 1. EQUIPO OPERATIVO EN FINCA
* **1 Mayordomo / Capataz:** Supervisa la finca, coordina labores y es el único interlocutor que reporta novedades en tiempo real por el grupo de WhatsApp de la finca.
* **3 Ordeñadores / Vaqueros:** Arrean el ganado, realizan el ordeño y llenan la planilla física de pesaje.
* **1 Asistente Administrativa:** Lee el WhatsApp, digita los pesajes, concilia las entregas con Colanta y genera reportes para la dueña.
* **1 Médico Veterinario:** Realiza visitas periódicas para jornadas de palpación (vacas con $\ge 45$ días post-servicio) y atiende urgencias clínicas vía WhatsApp.

---

## 2. CICLO BIOLÓGICO Y MANEJO DE ANIMALES

### A. Nacimiento y Destino de Crías
1. **Hembras (Reemplazo):** Se quedan en la finca. Reciben calostro durante 4 días y se les coloca el arete definitivo al **Día 7** (cuando el cartílago auricular endurece).
2. **Machos:**
   * *Razas Lecheras (Holstein / Jersey):* Venta rápida inmediata en los primeros días de nacidos (terneros de leche) para no gastar recursos.
   * *Razas Doble Propósito / Cruces de Carne (Normando, Simmental, F1):* Se seleccionan pocos ejemplares para lote de levante y ceba comercial.

### B. Protocolo Reproductivo Post-Parto (Límite 100 Días Abiertos)
* **Día 30 Post-Parto:** Inyección obligatoria de vitamina reproductiva (Complejo ADE + Fósforo) para reactivación ovárica.
* **Día 50 Post-Parto:** Colocación del parche detector de celo ("Raspa y Gana" / Estrotect).
* **Estratificación del Servicio:**
  * ⚪ *Vacas Regulares:* Monta natural directa con **Toro Repasador** (0 pajillas).
  * 🟡 *Vacas Buenas:* Hasta **2 Inseminaciones Artificiales (IA)**. Si falla la 2da $\rightarrow$ van al toro repasador.
  * 🌟 *Vacas Élite:* Hasta **3 Inseminaciones Artificiales (IA)** con semen de catálogo.
* **Día 90 Post-Parto:** Si sigue vacía, se dispara **Alerta Roja** de días abiertos para evaluación veterinaria.

### C. Rutina de Ordeño y Acopio Colanta
* **Horarios:** Dos turnos diarios — **Mañana (04:30 AM)** y **Tarde (02:30 PM)**.
* **Población de Planilla:** Únicamente vacas activas en lactancia (`estado_lactancia = 'En_Ordeño'`).
* **Estratificación Nutricional en Planilla:**
  * 🟡 *Resaltador Amarillo ($\ge 16$ L/día):* Alta producción (reciben ración extra de concentrado).
  * 🔵 *Punto Azul (< 16 L/día):* Producción estándar (ración básica).
* **Detección Clínica Semanal:** Una caída $\ge 15\%$ en la producción semanal activa alerta preventiva por mastitis subclínica o celo.
* **Acopio Colanta:** El carro cisterna recoge la leche y entrega tiquete físico de litros para conciliar contra los pesajes registrados en la finca.

### D. Inocuidad Biológica y Protocolo Cinta Roja
* Tratamiento antibiótico $\rightarrow$ Reporte por WhatsApp $\rightarrow$ Se ata una **Cinta Roja visible** al animal.
* **Ordeño en Balde:** Prohibido conectar la vaca al tanque comunal. Se ordeña en balde y la leche se descarta durante el tiempo de retiro del fármaco (generalmente 72 horas / 3 días).

### E. Secado de la Vaca
* **Día 210 de Gestación (7 meses de preñez):** Secado obligatorio. La vaca sale del lote de ordeño hacia el potrero de maternidad para descansar antes del siguiente parto.
