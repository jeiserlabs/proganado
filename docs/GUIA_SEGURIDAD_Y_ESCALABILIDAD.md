# 🛡️ GUÍA DE SEGURIDAD, ESTABILIDAD Y ESCALABILIDAD — PROGANADO S.A.S.
> **Propósito:** Especificación de arquitectura y buenas prácticas para cuando se implemente la capa de backend, base de datos y despliegue en la nube. Cero código muerto, solo directrices de ejecución ("La Flecha Cargada").

---

## 1. SEGURIDAD Y ESTABILIDAD EN BASE DE DATOS

1. **Prevención de SQL Injection:**
   * **Cero Concatenación:** Prohibido armar queries con strings interpolados.
   * **Prepared Statements Obligatorios:** Uso de parámetros vinculados (`$1, $2` en PostgreSQL / `?` en SQLite).
   * **Validación Zod Previa:** Todo payload HTTP se valida antes de tocar la base de datos.
2. **Prevención de Race Conditions (Concurrencia en Ordeño):**
   * **Transacciones ACID:** Operaciones multidominio (ej: aplicar antibiótico + activar Cinta Roja) se ejecutan en un solo bloque transaccional (`BEGIN ... COMMIT`).
   * **Bloqueo Pesimista (`SELECT ... FOR UPDATE`):** Para verificar límites de cupo de animales por suscripción.
   * **Bloqueo Optimista:** Columna `version INTEGER DEFAULT 1` en tablas maestras.
3. **Integridad Referencial y Datos Huérfanos:**
   * **`ON DELETE RESTRICT`:** En catálogos (`usuarios`, `razas`, `medicamentos`) para impedir borrados de datos en uso.
   * **`ON DELETE CASCADE`:** En tablas puramente dependientes (`marcaciones`, `pesajes_leche`, `eventos_reproductivos`).
   * **Soft-Delete:** Manejo de columna `deleted_at DATETIME NULL` en producción para preservar auditoría ICA.
4. **Almacenamiento Eficiente en AWS S3:**
   * **Deduplicación SHA-256:** Se calcula el hash del archivo antes de subirlo; si ya existe, se reutiliza la URL.
   * **Compresión WebP:** Fotografías de aretes y facturas comprimidas a `.webp` (ahorro del 85% de espacio).

---

## 2. ROADMAP DE ESCALABILIDAD (DE 1 FINCA A 10M BOVINOS)

| Nivel | Escala | Infraestructura & Persistencia | Costo Servidor |
|---|---|---|---|
| **Nivel 1 (Presente - CESDE)** | 1 a 10 Fincas | SQLite 3 Local / Supabase Free + HTML5 Semántico | $0 COP |
| **Nivel 2 (Validación Comercial)** | 50 a 1.000 Fincas | Node.js Express TS + PostgreSQL + Redis Cache | ~$120k COP / mes |
| **Nivel 3 (Nacional Colombia)** | 1.000 a 20.000 Fincas | AWS ECS Fargate (Auto-scaling 4am/2pm) + RDS Multi-AZ + S3 | Autofinanciado |
| **Nivel 4 (Hyper-Scale LatAm)** | 10M+ Bovinos | Sharding por Finca (`id_finca`), Particionamiento mensual en `pesajes_leche`, streaming Kafka para collares IoT | Autofinanciado |

---

## 3. MARCO SOCIETARIO Y BENEFICIOS TRIBUTARIOS
* **Constitución S.A.S. (Ley 1780):** $0 costo de matrícula mercantil para fundadores < 35 años.
* **Régimen Simple de Tributación (RST):** Tarifa unificada del **1.8% al 5.4%** sobre ingresos brutos.
* **Exención de IVA Software Cloud (E.T. Art. 476 Numeral 24):** 0% IVA en servicios SaaS en Colombia.
