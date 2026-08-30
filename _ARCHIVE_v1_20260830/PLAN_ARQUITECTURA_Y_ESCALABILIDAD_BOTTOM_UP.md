# 🚀 PLAN DE ARQUITECTURA Y ESCALABILIDAD BOTTOM-UP — PROGANADO SAAS
## De los Fundamentos Semánticos (CESDE Nivel 1) a la Nube Grado Empresa (AWS Enterprise)
**Tech Lead & QA Lead:** Jeiser Abraham Gutiérrez  
**Repositorio Oficial:** [ProGanado](https://github.com/jeiser270997-source/ProGanado)

---

## 🎯 1. Filosofía Pedagógica y de Ingeniería: "Bottom-Up Architecture"

En el desarrollo de software profesional, pretender saltar directamente a frameworks de moda (React, Next.js, Tailwind) sin dominar las bases de datos relacionales, la semántica web y el tipado estricto genera **deuda técnica, fragilidad y mala praxis**.

**ProGanado** adopta una estrategia **Bottom-Up (de abajo hacia arriba)** que acompaña el crecimiento curricular del programa técnico en CESDE, demostrando una progresión impecable en tres niveles de madurez tecnológica:

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

## 🛡️ 2. ¿Por qué Tipado Fuerte (TypeScript) desde el Día 1?

Aunque en Nivel 1 apenas se está estudiando HTML semántico y algoritmia básica:
1. **Prevención de Malas Prácticas del Usuario:**
   Un sistema ganadero no tolera que un operario digite letras en los litros de leche, fechas de nacimiento futuras o medicamentos sin tiempo de retiro.
2. **Defensa por Diseño (Fail-Closed):**
   Las interfaces TypeScript (`src/types/domain.types.ts`) y los esquemas Zod (`src/schemas/validation.schemas.ts`) definen el **contrato inmutable** de la S.A.S. Cualquier vista HTML5 o formulario que se desarrolle debe respetar obligatoriamente estos límites.
3. **Cero Reescritura de Código:**
   Al construir las 12 tablas SQL en 3FN y tiparlas en TypeScript hoy, cuando el equipo pase a React/Next.js en el Nivel 3, **el modelo de negocio no cambiará en un solo renglón**, garantizando un ahorro del 80% en tiempo de desarrollo.

---

## ☁️ 3. Transición de Base de Datos: De Supabase Free Tier a AWS RDS

### 3.1 Fase 0: Prototipo y Sustentación CESDE ($0 USD / mes)
* **Motor:** SQLite 3 local / Supabase PostgreSQL Free Tier.
* **Capacidad:** 500 MB (suficiente para 20.000 bovinos y 100.000 pesajes diarios).
* **Costo:** **$0 COP**.

### 3.2 Fase 1: Primeros 10 a 30 Clientes Regionales (~$30 USD / mes)
* **Ingresos Estimados:** $1.200.000 a $3.500.000 COP / mes.
* **Infraestructura:** Supabase Pro / Neon PostgreSQL con copias de seguridad automáticas diarias.
* **Margen Operativo:** >90%.

### 3.3 Fase 2: AWS Enterprise High-Availability (50 a 500+ Haciendas)
* **AWS RDS PostgreSQL Multi-AZ (db.t4g.small / db.t4g.medium):**
  * Replicación síncrona en dos zonas de disponibilidad físicas distintas.
  * Backups automáticos continuos punto en el tiempo (*Point-in-Time Recovery* hasta 35 días).
  * Cifrado en reposo y en tránsito con claves maestras AWS KMS (AES-256).
* **AWS S3 Bucket:**
  * Almacenamiento seguro de fotos de aretes, actas de vacunación ICA y reportes contables.
* **AWS App Runner / ECS Fargate:**
  * La API Express en contenedor Docker se escala automáticamente de 1 a 10 instancias durante los picos de ordeño (4:00 AM y 2:00 PM) y se apaga en la madrugada para optimizar costos.
* **Costo Mensual AWS:** ~$45 - $75 USD (~180k a 300k COP/mes), pagado íntegramente con solo 3 suscripciones del plan Hacienda Pro ($119k COP).

---

## 👥 4. Asignación del Equipo en el Ciclo Evolutivo

| Integrante | Rol | Aporte en Nivel 1 (Fundamentos) | Aporte en Nivel 2 (Backend/TS) | Aporte en Nivel 3 (AWS S.A.S.) |
|---|---|---|---|---|
| **Jeiser Gutiérrez** | Tech Lead & QA | Schema 3FN, DDL SQL, Tipos TS y Zod Schemas | API REST Express TS, CI/CD, Tests Playwright | Arquitectura Cloud AWS (RDS, S3, ECS, CloudFront) |
| **Sebastián Gómez** | Frontend Lead | Maquetación HTML5 semántica pura y accesibilidad | CSS3 Grid/Flexbox, UI Components, Vanilla JS | UI/UX Pro Max en React / Next.js / Tailwind |
| **Emilio Villanueva** | Lógica & Negocio | Algoritmos PSeInt (Inocuidad, Días Abiertos, UFC) | Portabilidad de funciones PSeInt a TypeScript | Control de telemetría y reglas zootécnicas |
| **Camila Salas** | Legal & Admin | Estructuración S.A.S., RST 1.8%-5.4%, 0% IVA Cloud | Facturación electrónica DIAN, contratos de adhesión | Expansión comercial y administración multi-predio |
| **Dr. Humberto Pinto** | Asesor Clínico & QA | Definición de tiempos de retiro ICA y telemetría | Validación de datos clínicos en base de datos | Dictámenes veterinarios y auditorías sanitarias |
