# ⚖️ GUÍA LEGAL, FINANCIERA Y FACTURACIÓN — CAMILA SALAS
> **Destinataria:** Camila Salas (Chief Legal & Financial Officer / CLO & CFO)  
> **Propósito:** Orientación estratégica, opciones de pasarelas de pago, facturación electrónica DIAN y marco societario para formalizar ProGanado S.A.S. con o sin IA.  
> **Filosofía Gentleman Programming / Clean Architecture:** Contratos claros, separación de responsabilidades financieras y cumplimiento normativo estricto.

---

## 💼 1. MODELO DE NEGOCIO Y ESTRUCTURA DE MONETIZACIÓN

ProGanado S.A.S. monetiza bajo el modelo **B2B SaaS por Predio (Código ICA Finca)**:

1. **Plan Campesino (Freemium):** $0 COP / mes para predios pequeños ($\le 15$ vacas).
2. **Plan Hacienda Pro:** **$119.000 COP / mes por Finca** (Acceso completo, multi-usuario, alertas WhatsApp y reportes Colanta).
3. **Plan Corporativo / Multi-Predio:** **$299.000 COP / mes** (Para redes de fincas y asociaciones).
4. **Política *Zero Data Loss*:** Si un cliente suspende el pago, su cuenta pasa a **`Solo_Lectura`**. Nunca se borra su historial de animales ni pesajes.

---

## 💳 2. OPCIONES DE PASARELAS DE PAGO Y FACTURACIÓN (TÚ ELIGES)

| Mecanismo | Opciones en Colombia | Recomendación / Caso de Uso |
|---|---|---|
| **Cobro Recurrente SaaS (Suscripción Mensual)** | **Wompi (Bancolombia) / Stripe / Bold** | **Wompi:** Débito automático mensual con tarjeta de crédito o botón PSE directo de Bancolombia (el banco preferido por el agro antioqueño). |
| **Facturación Electrónica DIAN** | **API de Siigo / Facturatech / Alegra API** | Facturación automatizada por API al momento de confirmar el pago de la suscripción. |
| **Puntos de Pago Físicos / POS Agropecuario** | **Corresponsales Bancolombia / Gana / Efecty** | Para ganaderos tradicionales que prefieren pagar la mensualidad en efectivo en el pueblo con código de convenio. |

---

## 🏛️ 3. BENEFICIOS LEGALES Y TRIBUTARIOS (COLOMBIA)

1. **Constitución S.A.S. bajo Ley 1780 de 2016 (Jóvenes Emprendedores):**
   * Exención del 100% en la matrícula mercantil ante la Cámara de Comercio de Medellín para fundadores menores de 35 años durante el primer año.
2. **Régimen Simple de Tributación (RST):**
   * Tarifa preferencial consolidada del **1.8% al 5.4%** sobre los ingresos brutos anuales, integrando Renta, ICA municipal y aportes parafiscales en un único formulario bimestral.
3. **Exención de IVA para Software Cloud (Estatuto Tributario Art. 476 Numeral 24):**
   * Los servicios de computación en la nube (SaaS) están **excluidos de IVA (19%)**, permitiendo cobrar el precio neto sin sobrecargar al productor.
4. **Habeas Data & Protección de Datos Zootécnicos (Ley 1581 de 2012):**
   * Cláusula estricta de confidencialidad: Los datos de producción de leche y genealogía pertenecen al ganadero titular y no pueden ser vendidos a terceros sin consentimiento.

---

## 🤖 4. PROMPT MAESTRO PARA TRABAJAR CON INTELIGENCIA ARTIFICIAL

Copia y pega este prompt en Claude, ChatGPT o DeepSeek para estructurar documentos legales o financieros:

```text
Actúa como Abogada Corporativa y Asesora Financiera especializada en Startups SaaS y Derecho Tributario en Colombia.
Estoy formalizando "ProGanado S.A.S.", una empresa de software ganadero en Medellín.
Datos de la empresa:
- Modelo: SaaS B2B con suscripciones mensuales ($119.000 COP/mes por finca).
- Beneficios legales: Ley 1780 de 2016 (emprendimiento joven), Régimen Simple de Tributación (RST) y Exención de IVA Software Cloud (Art. 476 Num 24 E.T.).
- Pasarelas: Integración con Wompi / PSE / Bancolombia.

Por favor redacta: [ESCRIBE AQUÍ LO QUE QUIERES: Ej. Los Términos y Condiciones de Uso del SaaS incluyendo la política de Solo_Lectura en caso de mora y protección de datos zootécnicos bajo Ley 1581].
```
