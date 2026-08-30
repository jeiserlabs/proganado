# PLAN DE ARQUITECTURA TECNICA, STACK Y MIGRACION A AWS: PROGANADO

[OBJETIVO] Especificacion formal del Stack Tecnologico ($0 costo actual) y la hoja de ruta de infraestructura en la nube (AWS) con desglose de costos para cuando el SaaS escale a clientes de pago.

---

## 1. ACLARACION DE CONCEPTOS Y DECISION DE STACK

| Componente | Tecnologia Elegida | Justificacion Arquitectonica |
|---|---|---|
| **Frontend** | **HTML5 Semantico + CSS3 Moderno + Vanilla JS** | Cero dependencias pesadas (cero React/Tailwind por ahora). Ejecutable en cualquier sala CESDE sin instalaciones. 100% responsive. |
| **Backend** | **Express.js (Node.js)** *(o FastAPI Python)* | **Express.js es 100% Backend**. Provee una API REST ultrarrapida, ligera y modular (`/api/v1/bovinos`, `/api/v1/ordeno`, `/api/v1/alertas`). |
| **Base de Datos ($0 Hoy)** | **PostgreSQL (Local / Supabase Free Tier)** | Base de datos relacional robusta, soporte ACID estricto, indices avanzados y 100% compatible con AWS RDS sin reescribir SQL. |

---

## 2. ETAPAS DE ESCALABILIDAD & PROYECCION DE COSTOS DE INFRAESTRUCTURA

### FASE 0: DESARROLLO, SUSTENTACION CESDE Y PILOTO ($0 USD / MES)
* **Hosting Frontend:** GitHub Pages / Vercel ($0).
* **Backend API:** Localhost / Render Free Tier ($0).
* **Base de Datos:** PostgreSQL Local (Docker) / Supabase Free Tier (500 MB, suficiente para 10.000 bovinos y 50.000 registros de ordeño) ($0).
* **Costo Total:** **$0 COP / $0 USD mes**.

---

### FASE 1: PRIMEROS 10 A 30 CLIENTES DE PAGO (INGRESOS: $1.2M - $3.5M COP/MES)
* **Estrategia:** Hosting gestionado de bajo costo para reinvertir el capital de las suscripciones.
* **Frontend:** Cloudflare Pages / AWS S3 + CloudFront (~$0.50 USD/mes).
* **Backend:** Render Starter / Railway / Hetzner VPS (~$5 - $10 USD/mes).
* **Base de Datos:** Supabase Pro / Managed PostgreSQL (~$15 - $25 USD/mes).
* **Costo Total Infraestructura:** **~$20 - $35 USD/mes (~$80k - $140k COP/mes)** $\rightarrow$ Margen de ganancia >92%.

---

### FASE 2: MIGRACION AWS GRADO EMPRESA (50 A 500+ HACIENDAS / ALTA DISPONIBILIDAD)

```text
[ Cliente Movil / Web ] ──HTTPS──> [ AWS CloudFront (CDN) + AWS S3 (Frontend Estatico) ]
                                          │
                                       API REST
                                          │
                                          ▼
                         [ AWS App Runner / ECS Fargate (Docker Backend Express) ]
                                          │
                       ┌──────────────────┴──────────────────┐
                       ▼                                     ▼
      [ AWS RDS PostgreSQL (Multi-AZ) ]             [ AWS SQS / EventBridge ]
       (T4g.micro / T4g.small con cifrado)        (Disparador de Alertas Celo/WhatsApp)
```

#### Desglose de Costos Mensuales en AWS (Fase 2):
1. **AWS S3 + CloudFront (Frontend & Storage Fotos Bovinos):** ~$2.00 USD/mes (Almacenamiento y CDN global con certificado SSL gratis).
2. **AWS App Runner / ECS Fargate (Backend Container Auto-escalable):** ~$15.00 - $25.00 USD/mes (Se apaga en horas muertas de madrugada y escala en horas pico de ordeño 4am/2pm).
3. **AWS RDS PostgreSQL (db.t4g.micro / db.t4g.small con Backup Automatico diario):** ~$20.00 - $35.00 USD/mes (Base de datos administrada con failover).
4. **AWS Route 53 (Dominio & DNS proganado.co):** ~$0.50 USD/mes.
5. **AWS SNS / Twilio WhatsApp API (Mensajeria push a ganaderos):** ~$5.00 - $15.00 USD/mes (Segun volumen de alertas).

* **Costo Total AWS Estimado:** **~$45 - $75 USD/mes (~$180k - $300k COP/mes)**.
* **Sustento de Negocio:** Con solo 3 haciendas lecheras pagando el plan mediano ($120k COP/mes = $360k COP), la infraestructura completa de AWS se paga sola y sobran utilidades.