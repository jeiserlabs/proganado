# ProGanado — Proyección de escalabilidad, clientes y rentabilidad (1/5/10 años)

> **Advertencia:** esto es un modelo de planificación, no una promesa. Los supuestos están declarados y se recalibran con los datos de los pilotos. Los costos son órdenes de magnitud a validar con cotizaciones. No se promete un TAM.
>
> **Fecha:** 08-nov-2026 · **Base:** MVP local auditado (116 animales de prueba, 8 módulos, modelo de 12 tablas en 3FN) · **Estado:** pre-piloto.

---

## 0. Resumen ejecutivo

| Indicador | Año 1 | Año 5 | Año 10 |
|---|---:|---:|---:|
| Fincas activas (escenario base) | 50 | 500 | 5,000 |
| Fincas pagas (20%) | 10 | 100 | 1,000 |
| MRR | 1.37M COP | 13.7M COP | 137M COP |
| ARR | 16.4M COP | 164.4M COP | 1.644B COP |
| Costos cash/año | 3.6M COP | 33.6M COP | 210M COP |
| Margen operativo sin sueldos | 78% | 80% | 87% |
| Margen operativo con equipo | 78% | 43% | 65% |
| Punto de equilibrio cash | 3-5 fincas pagas | — | — |
| Punto de equilibrio con sueldo de fundador | ~27 fincas pagas (~135 activas) | — | — |
| Punto de equilibrio con equipo de 3 | — | ~87 fincas pagas (~435 activas) | — |

**Lectura:** con 50 fincas activas el proyecto cubre sus costos cash; con ~135 fincas activas puede pagar un sueldo modesto de fundador; con ~435 fincas activas puede sostener un equipo de 3 con margen ajustado; con 500 fincas activas el equipo cómodo es fundador + soporte part-time; con 1,000 activas se puede pensar en 3-4 personas. El escenario conservador (30/250/2,500) es el de presupuesto; el base (50/500/5,000) es el objetivo; el optimista (100/1,000/10,000) es el techo.

---

## 1. Punto de partida real

- **MVP local:** HTML/CSS/JS + servidor Python + SQLite; login/2FA; 8 módulos; 116 animales de prueba.
- **Modelo formal:** 12 tablas en 3FN, 7 índices, 1 vista; reglas de dominio en TypeScript; 37/37 tests.
- **Lo que NO está:** conexión a PostgreSQL en producción, autenticación multi-finca, backups en la nube, facturación, SLA.
- **Fase 1 del roadmap:** convierte el MVP local en producto conectado (API, auth, respaldos). Este documento proyecta la escala **después** de esa fase.

---

## 2. Supuestos del modelo

| Variable | Valor base | Cómo se obtuvo / estado |
|---|---:|---|
| Tamaño de finca | 30 vacas | Escenario de finca pequeña/mediana; validar con pilotos |
| Eventos por finca/día | 80 | 2 ordeños × 30 vacas + 20 eventos sanitarios/reproductivos |
| Peso por evento en DB | 1 KB | Conservador, incluye fila e índices |
| Crecimiento DB | 30 MB/finca/año | 80 eventos × 365 × 1 KB |
| Fotos/documentos | 100 MB/finca/año | Object storage, no DB |
| Retención online | 3 años | Archivo frío después |
| Conversión a pago | 20% (18% Pro + 2% Multi) | A validar con pilotos |
| ARPU | 137k COP/mes | 90% Pro 119k + 10% Multi 299k |
| Churn | 2%/mes | Supuesto SMB; a validar |
| Precios | Free 0 / Pro 119k / Multi 299k COP/mes | Documento de negocio |
| Usuarios por finca | 2 | Dueño + mayordomo |
| Peticiones por usuario en pico | 10/min | Estimación de uso en ordeño |
| Salario de referencia | 3M COP/mes por persona | Base; con prestaciones sumar ~30% |

---

## 3. Escenarios de clientes (fincas activas, netas de churn)

| Año | Conservador | Base | Optimista |
|---|---:|---:|---:|
| 1 | 30 | 50 | 100 |
| 2 | 80 | 150 | 300 |
| 3 | 150 | 300 | 600 |
| 5 | 250 | 500 | 1,000 |
| 10 | 2,500 | 5,000 | 10,000 |

**Uso:** presupuestar con el conservador, planear con el base y usar el optimista solo como techo de inversión. No presentar el optimista como promesa.

---

## 4. Carga técnica y base de datos (escenario base)

| Año | Fincas | Vacas | Eventos/día | DB/año | DB acumulada 3 años | Fotos/año | Pico req/s |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | 50 | 1,500 | 4,000 | 1.5 GB | 4.5 GB | 5 GB | 17 |
| 2 | 150 | 4,500 | 12,000 | 4.5 GB | 13.5 GB | 15 GB | 50 |
| 3 | 300 | 9,000 | 24,000 | 9 GB | 27 GB | 30 GB | 100 |
| 5 | 500 | 15,000 | 40,000 | 15 GB | 45 GB | 50 GB | 165 |
| 10 | 5,000 | 150,000 | 400,000 | 150 GB | 450 GB | 500 GB | 1,650 |

**Fórmulas:**
- Vacas = fincas × 30.
- Eventos/día = fincas × 80.
- DB/año = fincas × 30 MB.
- DB acumulada = DB/año × 3.
- Fotos/año = fincas × 100 MB.
- Pico req/s = fincas × 2 usuarios × 10 req/min ÷ 60.

> Estas cifras son órdenes de magnitud. El piloto debe medir eventos/día reales, peso por fila y crecimiento de DB. Si el peso real es 3×, la DB de 5,000 fincas sería ~1.35 TB y habría que particionar antes.

---

## 5. Infraestructura por etapa

| Etapa | Fincas | App | DB | Load balancer | Backups | Objetivo |
|---|---:|---|---|---|---|---|
| 0 | 0-50 | 1 instancia free | Supabase free / SQLite | No | Diario a object storage | Validar |
| 1 | 50-150 | 1-2 instancias | Postgres gestionado | Opcional | Diario + PITR | 99.5% |
| 2 | 150-500 | 2 instancias | Postgres + pooling | Sí | Diario + PITR | 99.9% |
| 3 | 500-5,000 | 3-5 autoscaling | Postgres Multi-AZ + réplica | Sí | PITR + restore drill | 99.9-99.95% |
| 4 | 5,000-10,000+ | Multi-región | Particiones/sharding | Global | Multi-región | 99.95%+ |

**Por qué el load balancer no se pone desde el día 1:** a 500 fincas el pico es ~165 req/s; una sola instancia puede atenderlo. El balancer entra por **disponibilidad y despliegues sin caída**, no por throughput: dos instancias detrás de un health check eliminan el punto único de falla. A 5,000 fincas (1,650 req/s) sí se necesita autoscaling, réplica de lectura y pooling.

---

## 6. Triggers de free a pago

| Señal | Umbral | Acción |
|---|---:|---|
| Primer cliente pago | 1 | Revisar términos comerciales de los free tiers; migrar a planes pagos |
| Fincas activas | 50 | Supabase Pro / hosting pago; backups diarios |
| DB | 1 GB | Plan pago; PITR |
| Eventos/día | 10,000 | Plan pago; monitoreo |
| Uptime requerido | 99.5% | Load balancer + 2 instancias |
| Soporte | >5 h/semana | Herramientas de soporte / part-time |
| Latencia p95 | >500 ms | Índices, réplica, optimización |

**Regla:** no migrar antes de que el costo de la caída o el límite del free tier sea mayor que el costo del plan pago. Los free tiers tienen condiciones de uso comercial que hay que verificar (Vercel Hobby, por ejemplo, no es para uso comercial).

---

## 7. Costos (COP, orden de magnitud)

| Año | COGS/mes | Soporte/mes | Marketing/mes | Legal/admin/mes | Total cash/mes | Total cash/año |
|---|---:|---:|---:|---:|---:|---:|
| 1 | 150k | 0 | 0 | 150k | 300k | 3.6M |
| 2 | 300k | 0 | 200k | 200k | 700k | 8.4M |
| 3 | 500k | 500k | 300k | 200k | 1.5M | 18M |
| 5 | 1.2M | 800k | 500k | 300k | 2.8M | 33.6M |
| 10 | 7.5M | 6M | 3M | 1M | 17.5M | 210M |

- **COGS:** hosting, DB, storage/CDN, email/WhatsApp, monitoreo.
- **No incluye sueldo del fundador en años 1-2.** Desde el año 3 se puede incluir un sueldo modesto (~3M COP/mes) si se cumple el punto de equilibrio.
- **Equipo:** fundador + soporte part-time en año 5; 6-8 personas en año 10.
- **A validar:** cotizaciones reales de Supabase/Render/Fly/Cloudflare/AWS; los precios cambian.

---

## 8. Ingresos y rentabilidad (escenario base)

### 8.1 Sin sueldos

| Año | Fincas | Pagas | MRR | ARR | COGS/año | OPEX/año | Margen bruto | Margen operativo |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 50 | 10 | 1.37M | 16.4M | 1.8M | 1.8M | 89% | 78% |
| 2 | 150 | 30 | 4.11M | 49.3M | 3.6M | 4.8M | 93% | 83% |
| 3 | 300 | 60 | 8.22M | 98.6M | 6M | 12M | 94% | 82% |
| 5 | 500 | 100 | 13.7M | 164.4M | 14.4M | 19.2M | 91% | 80% |
| 10 | 5,000 | 1,000 | 137M | 1.644B | 90M | 120M | 95% | 87% |

- **Margen bruto** = (ARR - COGS) / ARR.
- **Margen operativo** = (ARR - COGS - OPEX) / ARR.
- **Sin sueldos:** mide la capacidad del producto de pagar la operación antes de pagar al equipo.

### 8.2 Con equipo

| Año | Ingresos | Costos cash | Sueldos | Total | Margen operativo |
|---|---:|---:|---:|---:|---:|
| 1 | 16.4M | 3.6M | 0 | 3.6M | 78% |
| 3 | 98.6M | 18M | 36M (fundador) | 54M | 45% |
| 5 | 164.4M | 33.6M | 60M (fundador + soporte) | 93.6M | 43% |
| 10 | 1.644B | 210M | 360M (6-8 personas) | 570M | 65% |

- Salario de referencia: 3M COP/mes por persona, sin prestaciones. Con carga prestacional (~30%), ajustar.
- **Punto de equilibrio:** cash 3-5 fincas pagas; sueldo de fundador ~27 pagas (~135 activas); fundador + soporte ~42 pagas (~210 activas); equipo de 3 ~87 pagas (~435 activas).
- **Con 500 fincas activas (100 pagas)** el equipo cómodo es fundador + soporte part-time, con margen para reinvertir. Un equipo de 3 es posible pero con margen ajustado (~14% en el año 5).

---

## 9. Mantenibilidad

| Área | Práctica | Métrica |
|---|---|---|
| Código | TypeScript strict, Zod, Drizzle, SRP | 0 errores typecheck; <300 líneas por archivo nuevo |
| Tests | Vitest unitario/integración, Playwright E2E | 100% reglas de cinta roja; >80% dominio |
| CI/CD | GitHub Actions, migraciones, preview | Deploy <10 min; rollback <5 min |
| Observabilidad | pino, Sentry, PostHog, uptime | p95 <500 ms; error <1% |
| Backups | Diario + PITR; restore drill | RPO <24h; RTO <4h |
| Seguridad | RLS, secretos, dependencias, OWASP | 0 críticos; auditoría trimestral |
| Docs | ADRs, diccionario de datos, runbooks | Onboarding <1 día |
| Equipo | 1 fundador + soporte; on-call | Respuesta <1h en horario |

**Regla de mantenibilidad:** ningún módulo nuevo supera 300 líneas; las reglas de inocuidad tienen tests de frontera; toda migración de datos es idempotente y se prueba con un restore real antes de producción.

---

## 10. Riesgos y validación

| Riesgo | Impacto | Validación / mitigación |
|---|---|---|
| Adopción y precio | No se llega a 50 fincas | 3 pilotos; medir activación (10 animales + primer ordeño), retención (4 días/semana), disposición a pagar |
| Conectividad 3G | Pérdida de datos | Local-first, cola de sincronización, reintentos idempotentes |
| Calidad del dato | Reportes falsos | Validación en formularios, capacitación, auditoría |
| Competencia | Precio a la baja | Diferenciar con cinta roja, offline y trazabilidad |
| Regulatorio (ICA, habeas data) | Sanción | Revisión legal; no prometer integración con ICA/Colanta sin convenio |
| Migración técnica | Pérdida de datos | Importación idempotente, conteos, respaldo, rollback |
| Free tiers | Costo inesperado | Triggers de la §6; presupuesto y plan B |
| Bus factor 1 | Bloqueo | Tests, CI, documentación, ADRs |

---

## 11. Lo que NO se construye todavía

- Microservicios, Kubernetes, Kafka, colas complejas.
- Multi-región antes de 5,000 fincas.
- App nativa antes de validar la PWA.
- IA generativa en el flujo de ordeño.
- IoT antes de que el cliente pague por ello.
- Integración con Colanta/ICA sin convenio.

---

## 12. Cómo se actualiza este modelo

1. Al cerrar cada piloto, reemplazar supuestos por medición: eventos/día, peso por fila, crecimiento de DB, conversión, churn, horas de soporte, costo real de infraestructura.
2. Recalcular las tablas y registrar la versión en el changelog.
3. Si el peso por fila o los eventos/día son 3× el supuesto, adelantar la partición/índices y revisar el punto de equilibrio.
4. No cambiar precios sin medir la disposición a pagar de al menos 10 fincas.

---

## 13. Changelog

- **08-nov-2026:** modelo inicial (1/5/10 años), escenarios conservador/base/optimista, triggers de free a pago, load balancer, costos, margen y mantenibilidad. Supuestos declarados; pendiente validar con pilotos.
