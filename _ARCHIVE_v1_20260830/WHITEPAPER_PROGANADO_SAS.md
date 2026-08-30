# 📜 WHITEPAPER — PROGANADO S.A.S.
## Plataforma SaaS de Gestión Ganadera de Precisión, Trazabilidad e Inocuidad Biológica
**Documento de Formalización Empresarial y Tesis Tecnológica**  
**Autores & Junta Fundadora:**  
* **Jeiser Abraham Gutiérrez** — Chief Technology Officer (CTO) & Lead Architect  
* **Camila Salas** — Chief Legal & Financial Officer (CLO/CFO)  
* **Sebastián Gómez** — Chief Design Officer (CDO) & Frontend Lead  
* **Dr. Humberto Pinto** — Chief Medical & Scientific Officer (CSO)  
* **Emilio Villanueva** — Head of Operations & Field Logistics (COO)  

**Versión:** 1.0.0 — Medellín, Colombia (2026)  
**Repositorio Oficial:** [https://github.com/jeiser270997-source/ProGanado](https://github.com/jeiser270997-source/ProGanado)

---

## 1. RESUMEN EJECUTIVO (EXECUTIVE SUMMARY)

**ProGanado S.A.S.** es una empresa tecnológica colombiana de base agropecuaria (AgTech SaaS) creada para resolver las tres fallas críticas que desangran la rentabilidad del sector lechero y de doble propósito en Colombia y América Latina:
1. **La Contaminación de Leche por Residuos de Medicamentos (Inocuidad Biológica):** La mezcla accidental de leche de vacas bajo tratamiento antibiótico en el carrotanque acopiador genera penalizaciones económicas severas (> $25.000.000 COP) y suspensión de predios por parte de cooperativas lecheras (ej. Colanta) y el Instituto Colombiano Agropecuario (ICA).
2. **El Descontrol Reproductivo y la Pérdida por Días Abiertos (>100 Días):** Cada día que una vaca pasa sin preñez después del día 100 posparto le cuesta al ganadero más de $35.000 COP diarios en alimentación y mantenimiento sin retorno productivo.
3. **La Pérdida de Trazabilidad Sanitaria y Legal:** La pérdida física de aretes en los alambres de púas borra el historial clínico del animal en los registros de papel tradicionales, violando la trazabilidad exigida por el Sistema Nacional de Identificación e Información de Ganado Bovino (SINIGAN).

ProGanado transforma la gestión empírica en una **operación de alta precisión respaldada en la nube**, ofreciendo un modelo de suscripción Freemium / Pro a bajo costo ($119.000 COP/mes por predio) con política de **Cero Pérdida de Datos (Zero Data Loss)** y arquitectura escalable desde una finca familiar hasta 10 millones de cabezas de ganado.

---

## 2. EL MERCADO OBJETIVO Y OPORTUNIDAD DE NEGOCIO

### 2.1 El Ecosistema Lechero en Colombia
* **Inventario Bovino Nacional:** Más de 29 millones de cabezas de ganado (Fedegán / ICA).
* **Cuencas Lecheras de Alta Especialización:** Departamento de Antioquia (Norte: Santa Rosa de Osos, San Pedro de los Milagros, Entrerríos, Donmatías; Oriente: La Ceja, Rionegro) produce más de 4.5 millones de litros diarios.
* **Tasa de Digitalización Actual:** Menor al 12% en pequeños y medianos productores. Más del 85% de las fincas administran pesajes, preñeces y vacunas en cuadernos de papel o planillas de WhatsApp susceptibles a pérdida y error humano.

---

## 3. ARQUITECTURA TECNOLÓGICA Y PRINCIPIOS DE INGENIERÍA

ProGanado se fundamenta en cuatro pilares de ingeniería de software de clase mundial:

### 3.1 Modelo de Persistencia Relacional en 3FN (12 Tablas Extensibles)
Base de datos diseñada bajo Tercera Forma Normal (3FN), eliminando dependencias transitivas y redundancias:
* `usuarios`: Autenticación segura y control de acceso basado en roles (RBAC).
* `fincas`: Multi-tenancy real por predio y código sanitario ICA.
* `suscripciones_saas`: Facturación modular con estado `Solo_Lectura` en caso de mora.
* `entregas_acopio`: Despachos a plantas acopiadoras con telemetría de recuento bacteriano (UFC/ml).
* `potreros`: Manejo de praderas bajo Pastoreo Racional Voisin (PRV).
* `razas`: Genética y propósito zootécnico.
* `bovinos`: Ficha central inmutable del activo biológico.
* `marcaciones`: Trazabilidad histórica 1:N de aretes caídos y re-identificaciones SINIGAN.
* `medicamentos`: Farmacopea oficial con tiempos de retiro normativos.
* `tratamientos_sanitarios`: Registro clínico electrónico (EHR) flexible con o sin fármaco.
* `pesajes_leche`: Telemetría exacta con marca temporal `hora_pesaje: TIME` para curvas de lactancia.
* `eventos_reproductivos`: Ciclo biológico y cálculo automatizado de días abiertos.

### 3.2 Gobernanza de Datos y Tipado Estricto (TypeScript & Zod)
* Cero uso del tipo `any`.
* Validación bidireccional en frontend y backend: Los esquemas Zod interceptan cualquier entrada defectuosa (fechas futuras, litros negativos, fármacos sin tiempo de retiro) antes de interactuar con la capa de datos.

### 3.3 El Motor Fail-Closed de Inocuidad ("Cinta Roja")
Si un animal recibe un tratamiento farmacológico con `dias_retiro_ica > 0`, el sistema activa instantáneamente el flag `bovinos.alerta_cinta_roja = true`. El ordeño de este animal queda bloqueado en la aplicación, emitiendo alertas sonoras y visuales al operario para desviar la leche a descarte obligatorio hasta que expire la cuarentena biológica.

---

## 4. MODELO DE NEGOCIO, MONETIZACIÓN Y UNIT ECONOMICS

### 4.1 Estructura de Precios por Finca (Predio)
1. **Tier Campesino (Freemium / DataCrédito):**
   * Costo: **0 COP / mes**.
   * Capacidad: Hasta 15 bovinos.
   * Funcionalidades: Registro de nacimientos, pesaje básico, semáforo Cinta Roja, 1 usuario.
2. **Tier Hacienda Pro (Core SaaS):**
   * Costo: **$119.000 COP / mes por predio**.
   * Capacidad: Ilimitada.
   * Funcionalidades: Multi-potreros PRV, módulo EHR veterinario completo, liquidación automática de acopio con UFC, reportes ICA para movilización y auditorías en 1 clic.
3. **Tier Corporativo Multi-Predio:**
   * Costo: **$299.000 COP / mes**.
   * Capacidad: Redes de fincas, cooperativas y asociaciones lecheras con consolidación contable y API REST.

### 4.2 Unit Economics & Sostenibilidad
* **Costo de Infraestructura por Finca (Fase Cloud AWS):** ~$2.500 COP / mes.
* **Margen Bruto Operativo:** **> 95%**.
* **Punto de Equilibrio (Break-Even):** Con solo 3 haciendas en el Plan Pro ($357.000 COP/mes), se financia la infraestructura completa de servidores y base de datos en AWS.

---

## 5. MARCO LEGAL, SOCIETARIO Y TRIBUTARIO (COLOMBIA)

1. **Constitución S.A.S. (Ley 1780 de 2016):**
   * Exención total en el pago de matrícula mercantil ante la Cámara de Comercio de Medellín para el Valle de Aburrá como emprendimiento de jóvenes menores de 35 años.
2. **Régimen Simple de Tributación (RST):**
   * Tributación unificada sobre ingresos brutos con tarifa preferencial del **1.8% al 5.4%**, sustituyendo el impuesto de renta ordinario (35%) y simplificando el ICA municipal.
3. **Exención de IVA para Software Cloud (Estatuto Tributario Art. 476 Numeral 24):**
   * Los servicios de computación en la nube y software SaaS están **excluidos del IVA (19%)**, permitiendo transferir un precio neto y competitivo al ganadero.
4. **Habeas Data & Secreto Productivo (Ley 1581 de 2012):**
   * Los datos productivos y sanitarios son propiedad inalienable del ganadero titular. Protocolos de cifrado AES-256 en reposo y tránsito (SSL/TLS 1.3).

---
*ProGanado S.A.S. — Trazabilidad, Inocuidad y Rentabilidad para el Agro del Futuro.*
