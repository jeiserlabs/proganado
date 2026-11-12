# 🏛️ ProGanado — Arquitectura de Endpoints, Conexiones y Despliegue Cloud

> **Documento Canónico de Integración y Conectividad**  
> **Proyecto:** ProGanado S.A.S. — Proyecto Integrador CESDE Nivel 1 (2026-2)  
> **Alineación Oficial:** Corresponde punto a punto con las Diapositivas 04 (Frontend UX), 05 (Modelo 3FN), 06 (Consultas Relacionales) y 07 (Arquitectura Cloud) del Pitch Deck de sustentación.  
> **Tech Lead / Arquitecto de Software:** Jeiser Gutiérrez  

---

## 1. Topología de Conexión del Sistema

La arquitectura de ProGanado está diseñada bajo el principio de **Defensa en Profundidad** y desacoplamiento estricto entre la interfaz de usuario, la capa de reglas de negocio y el motor relacional de base de datos.

```text
[ Cliente Web / Móvil en Campo ]
  (Astro + React / HTML5 Semántico)
         │
         │  1. Petición HTTPS con Token JWT
         ▼
[ API Gateway / Backend ]
  (Fastify + Zod 4 / Supabase PostgREST)
         │  2. Validación de Contrato (Esquemas Zod)
         │  3. Verificación de Inocuidad (Cinta Roja Fail-Closed)
         │  4. Control de Acceso por Finca (Row Level Security - RLS)
         ▼
[ Base de Datos Relacional ]
  (PostgreSQL 16+ en Supabase / SQLite WAL Local)
  - 12 Tablas Normalizadas en 3FN
  - Integridad Referencial: ON DELETE RESTRICT
  - Consultas Relacionales: INNER JOIN
```

---

## 2. Matriz Oficial de Endpoints REST

La API REST expone contratos tipados con validación bidireccional mediante Zod, códigos de estado HTTP estándar (`200 OK`, `201 Created`, `400 Bad Request`, `403 Forbidden`, `409 Conflict`) y respuestas JSON estructuradas.

### 2.1. Módulo de Autenticación y Acceso
| Método | Endpoint | Descripción | Body / Parámetros | Respuesta Éxito |
|:---:|---|---|---|:---:|
| `POST` | `/api/v1/auth/login` | Iniciar sesión y generar token JWT | `{ email, contrasena }` | `200` + `{ token, usuario }` |
| `POST` | `/api/v1/auth/2fa/verify` | Validar segundo factor de seguridad | `{ id_usuario, codigo_otp }` | `200` + `{ sesion_autorizada: true }` |
| `GET` | `/api/v1/auth/me` | Obtener perfil y fincas asignadas | Header: `Authorization: Bearer <token>` | `200` + `{ id_usuario, rol, fincas }` |

### 2.2. Módulo de Hato y Censo de Bovinos
| Método | Endpoint | Descripción | Body / Parámetros | Códigos de Error Clave |
|:---:|---|---|---|:---:|
| `GET` | `/api/v1/fincas/:id_finca/bovinos` | Censo activo de animales (INNER JOIN) | Query: `?estado_vital=Vivo` | `200` Lista de bovinos |
| `POST` | `/api/v1/fincas/:id_finca/bovinos` | Alta de nuevo animal en el hato | `{ numero_arete, nombre, sexo, fecha_nacimiento, id_raza }` | `409` Arete duplicado |
| `GET` | `/api/v1/bovinos/:id_bovino` | Ficha técnica y hoja de vida digital | Params: `id_bovino` | `404` Animal no existe |
| `DELETE` | `/api/v1/bovinos/:id_bovino` | Borrado lógico (bloqueo FK RESTRICT) | Params: `id_bovino`, `{ motivo }` | `400` Si tiene pesajes históricos |

### 2.3. Módulo Sanitario y Regla de Cinta Roja (Inocuidad ICA)
| Método | Endpoint | Descripción | Body / Parámetros | Regla de Negocio |
|:---:|---|---|---|:---:|
| `POST` | `/api/v1/tratamientos` | Registrar tratamiento veterinario | `{ id_bovino, id_medicamento, fecha_aplicacion, dosis_ml }` | Activa automáticamente la Cinta Roja |
| `GET` | `/api/v1/fincas/:id_finca/cinta-roja` | Lista de animales en cuarentena sanitaria | Params: `id_finca` | Retorna vacas con `fecha_fin_retiro >= HOY` |
| `GET` | `/api/v1/bovinos/:id_bovino/estado-sanitario` | Consulta si el animal es apto para ordeño | Params: `id_bovino` | `{ apto_ordeno: boolean, dias_restantes: number }` |

### 2.4. Módulo de Producción y Pesajes de Leche
| Método | Endpoint | Descripción | Body / Parámetros | Comportamiento Fail-Closed |
|:---:|---|---|---|:---:|
| `POST` | `/api/v1/pesajes` | Registrar pesaje diario de leche (AM/PM) | `{ id_bovino, fecha_pesaje, turno, litros_leche }` | **403 Forbidden** si el animal tiene Cinta Roja activa |
| `GET` | `/api/v1/fincas/:id_finca/produccion/diaria` | Resumen total de litros producidos | Query: `?fecha=YYYY-MM-DD` | `200` + `{ total_litros_am, total_litros_pm }` |

### 2.5. Módulo de Acopio y Liquidación (Colanta)
| Método | Endpoint | Descripción | Body / Parámetros | Regla de Liquidación |
|:---:|---|---|---|:---:|
| `POST` | `/api/v1/acopio/entregas` | Registrar tiquete de entrega a carrotanque | `{ id_finca, fecha_entrega, litros_tiquete, ufc, prueba_antibiotico }` | Rechazo automático de lote si `prueba_antibiotico = Positiva` |
| `GET` | `/api/v1/acopio/conciliacion` | Cruce entre litros ordeñados y tiquete | Query: `?fecha=YYYY-MM-DD` | Calcula merma de transporte y liquidación final COP |

---

## 3. Plan de Despliegue Cloud: Firebase vs Supabase

Uno de los puntos clave evaluados por el jurado es la selección justificada de proveedores cloud. A continuación se desglosa la estrategia técnica:

```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             ESTRATEGIA CLOUD PROGANADO                           │
├──────────────────────────────────────┬───────────────────────────────────────────┤
│ CAPA DE APLICACIÓN                   │ PROVEEDOR RECOMENDADO Y JUSTIFICACIÓN     │
├──────────────────────────────────────┼───────────────────────────────────────────┤
│ Frontend (Astro + React / PWA)       │ Vercel o Firebase Hosting (0 COP)         │
│                                      │ - CDN global ultra-rápida.               │
│                                      │ - Despliegues automáticos desde GitHub.  │
│                                      │ - SSL automático incluido.               │
├──────────────────────────────────────┼───────────────────────────────────────────┤
│ Base de Datos Relacional y Backend   │ Supabase PostgreSQL (0 COP)               │
│                                      │ - PostgreSQL 16 nativo (100% relacional).│
│                                      │ - Aloja las 12 tablas en 3FN y vistas.    │
│                                      │ - Respaldos automáticos programados.      │
│                                      │ - API REST instantánea con RLS por finca. │
└──────────────────────────────────────┴───────────────────────────────────────────┘
```

### 🛑 ¿Por qué NO usar Firebase Firestore para la Base de Datos?
* **Peligro NoSQL en Ganadería:** Firebase Firestore y Realtime Database son motores **NoSQL orientados a documentos JSON**.
* **Pérdida de Integridad:** En NoSQL no existen llaves foráneas con `ON DELETE RESTRICT`, ni verificaciones de unicidad compuesta entre tablas, ni transacciones ACID estrictas entre pesajes y medicamentos.
* **Incongruencia Académica:** En el CESDE se evalúa el dominio de **Bases de Datos Relacionales (3FN, DDL, SQL y joins)**. Utilizar Firestore destruiría el modelo entidad-relación y contradiría directamente la sustentación técnica de la materia.
* **Veredicto:** **Firebase solo se contempla para Hosting del frontend.** La base de datos es, y seguirá siendo, **PostgreSQL en Supabase**.

---

## 4. Estrategia de Contenedores (Docker)

### ¿Es necesario Dockerizar ProGanado?

| Entorno | ¿Requiere Docker? | Análisis Técnico / Criterio de Ingeniería |
|---|:---:|---|
| **Producción en la Nube (SaaS)** | ❌ **NO (YAGNI)** | Desplegar contenedores Docker en AWS EC2 o DigitalOcean cuesta entre 7 USD y 20 USD mensuales. La arquitectura serverless (Astro en Vercel/Firebase + PostgreSQL en Supabase) opera a **0 COP de costo inicial**, con alta disponibilidad y escalabilidad automática sin gestionar servidores Linux ni parches de seguridad. |
| **Desarrollo y Evaluación Local** | ✅ **SÍ (`docker-compose.yml`)** | Proporciona un entorno reproducible en 1 solo comando. Si el profesor o jurado evaluador clona el repositorio en una máquina limpia, no necesita instalar ni configurar PostgreSQL manualmente. |

### docker-compose.yml oficial (Listo en la raíz del repo)
```yaml
services:
  db:
    image: postgres:16-alpine
    container_name: proganado-postgres-db
    restart: unless-stopped
    environment:
      POSTGRES_DB: proganado
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      TZ: America/Bogota
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./01_Base_de_Datos_SQL/schema_produccion_proganado_v3.sql:/docker-entrypoint-initdb.d/01_schema.sql:ro
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d proganado"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  pgdata:
    driver: local
```

Para encender la base de datos localmente:
```bash
docker compose up -d
```
Esto levanta PostgreSQL 16, crea la base de datos `proganado` y carga de forma automática las 12 tablas en 3FN del archivo `schema_produccion_proganado_v3.sql`.

---

## 5. Medidas de Seguridad y Blindaje OWASP

1. **Prevención de Inyección SQL (OWASP A03:2021):**
   - Todas las consultas se ejecutan con **Prepared Statements** (consultas parametrizadas con variables `$1, $2, $3` en PostgreSQL). Jamás se concatenan cadenas de texto recibidas del cliente en el comando SQL.
2. **Seguridad a Nivel de Fila (Row Level Security - RLS):**
   - En Supabase se habilitan políticas RLS para garantizar que un usuario con `id_finca = 'F001'` no pueda leer ni alterar registros de otra finca (`id_finca = 'F002'`), mitigando fallos de autorización IDOR (OWASP A01:2021).
3. **Manejo Estricto de Secretos (Zero Secrets in Git):**
   - Todas las credenciales, llaves de API y tokens de conexión se leen desde variables de entorno (`.env`), respaldadas por la plantilla pública `.env.example`.
4. **Validación con Esquemas Zod en el Borde:**
   - Todo dato entrante pasa por los contratos tipados de `src/schemas/validation.schemas.ts` antes de tocar la base de datos, rechazando de inmediato valores numéricos negativos, fechas futuras o identificadores mal formateados.

---

## 6. Instrucciones de Arranque Rápido para Evaluadores

El repositorio soporta 3 modos de ejecución según el perfil del evaluador:

* **Opción A — MVP Local Inmediato (Recomendado para evaluación funcional sin Node):**  
  Doble clic en `producto_mvp/Iniciar ProGanado.bat` (o ejecutar `python producto_mvp/servidor.py`) y abrir `http://127.0.0.1:8899/index.html`.
* **Opción B — Pruebas Automatizadas y Paridad DDL:**  
  Ejecutar `npm run verify` en la terminal (ejecuta typecheck, gate de paridad SSOT y 37 pruebas unitarias deterministas).
* **Opción C — Base de Datos PostgreSQL en Contenedor:**  
  Ejecutar `docker compose up -d` para disponer del motor relacional PostgreSQL 16 con las 12 tablas cargadas en el puerto `5432`.
