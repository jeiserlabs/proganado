# Stack SaaS $0 COP / mes — The Free Tier Economy
*Blueprint de infraestructura gratuita para MVPs, ProGanado (CESDE) y Proyectos Satélite.*

Este estándar consolida los servicios cloud que ofrecen capas gratuitas permanentes y generosas ("Free Tier Economy"), permitiendo desplegar y operar aplicaciones web completas a **0 COP al mes** sin sorpresas de facturación.

---

## 1. Matriz de Servicios y Capacidad Gratuita

| Servicio | Propósito en el Stack | Capacidad Gratuita ($0/mes) | Límite / Alerta | Uso en ProGanado |
| :--- | :--- | :--- | :--- | :--- |
| **Supabase** | Base de datos PostgreSQL + Auth + Storage | 500 MB DB, 1 GB Storage, 50.000 usuarios activos mensuales. | Pausa a los 7 días de inactividad (evitable con un ping mensual). | Gestión de ganado, potreros, pesajes y autenticación. |
| **Resend** | Emails transaccionales | 3.000 correos al mes (máximo 100 correos al día). | Bloqueo al superar los 100 diarios. | Confirmación de registro, alertas de celo o vacunación. |
| **Vercel** | Hosting frontend (Next.js / React) + Previews | Despliegues automáticos ilimitados, 100 GB ancho de banda. | Exclusivo para proyectos no comerciales o académicos. | Portal web de gestión ganadera responsive. |
| **GitHub Actions** | CI/CD y automatización (cron jobs) | 2.000 minutos de ejecución mensual en runners Linux. | Suspende jobs al agotar cupo mensual. | Tests automatizados (Playwright/Vitest) y backups programados. |
| **Cloudflare** | DNS, proxy, SSL y mitigación DDoS | Tráfico DNS y proxy CDN ilimitado a costo cero. | Ninguno para uso estándar. | Dominio personalizado y aceleración de carga. |
| **PostHog** | Product Analytics y Session Replay | 1.000.000 de eventos al mes + 5.000 grabaciones de sesión. | Se detiene la ingesta sin cobrar si no hay tarjeta vinculada. | Telemetría de uso para sustentar la entrega en CESDE. |
| **Sentry** | Monitoreo de errores y crash reporting | 5.000 eventos de error al mes. | Descarta eventos sobrantes sin costo. | Detección de excepciones en tiempo de ejecución. |
| **Remotion** | Renderizado de video programático en React | Open source (licencia gratuita para proyectos < 3 personas). | Depende del hardware local. | Generación de infografías y reportes visuales en video. |

---

## 2. Reglas de Blindaje Anti-Cobro (Zero Billing Surprises)

1. **Nunca vincular tarjeta de crédito principal:** Utilizar cuentas sin método de pago automático o con tarjetas virtuales prepago sin saldo disponible.
2. **Fail-Closed:** Configurar las cuentas con la opción "Hard Cap" (pausar servicio al llegar al 100% de la cuota gratis, nunca pasar a cobro por uso).
3. **Persistencia y Backups:** Aunque Supabase aloje la base de datos principal, ejecutar un cron semanal en GitHub Actions para exportar un `dump.sql` a Google Drive o almacenamiento local.

---

## 3. Arquitectura de Despliegue para ProGanado (CESDE)

```text
[ Cliente Web / Móvil ]
        │
        ▼ (HTTPS / Cloudflare DNS)
[ Frontend en Vercel (Next.js 14) ]
   ├── Auth & DB Queries ──➔ [ Supabase PostgreSQL ]
   ├── Notificaciones ─────➔ [ Resend API (Emails) ]
   ├── Monitoreo Errores ──➔ [ Sentry SDK ]
   └── Métricas de Uso ────➔ [ PostHog Analytics ]
```

*Costo total mensual estimado:* **0 COP**.
