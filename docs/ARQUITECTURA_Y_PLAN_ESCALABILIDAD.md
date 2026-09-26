# ProGanado SaaS — Protocolo de Arquitectura y Plan de Escalabilidad Orgánica

> **Documento Rector de Ingeniería y Evolución de Software**  
> **Sistema:** ProGanado (Software Integral de Gestión Ganadera e Inocuidad Lechera)  
> **Tech Lead & Arquitectura:** Jeiser Gutiérrez  
> **Equipo de Proyecto (Oficial 4 Integrantes):** Sebastián Correa (Frontend), Emilio Villanueva (Lógica/Prototipo/Diagramas), Héctor Pinto (Asesor Clínico/Operaciones), Jeiser Gutiérrez (Tech Lead/BD). *(Camila Salas retirada 26-Sep-2026).*  
> **Fecha de emisión:** Septiembre 2026 — Versión 1.0.0

---

## 1. Misión y Filosofía de Diseño

ProGanado nace con un propósito doble:
1. **Ámbito Académico Inmediato:** Constituir el Proyecto Integrador de excelencia para el Nivel 1 del Técnico Laboral en Desarrollo de Software de CESDE.
2. **Ámbito Agropecuario Real:** Convertirse en una plataforma de gestión integral de hatos y aseguramiento de la inocuidad lechera (Cinta Roja ICA) capaz de operar tanto en fincas remotas sin internet como en la nube para múltiples haciendas.

### Principios Fundamentales:
* **Separación Estricta de Capas (Clean Architecture):** Los componentes visuales (HTML/CSS) jamás contienen reglas de negocio ni consultas directas; se comunican con una capa de aplicación/API que interactúa con la base de datos.
* **Fuente Única de Verdad (SSOT):** El esquema relacional de 12 tablas en 3FN (`01_Base_de_Datos_SQL/schema_produccion_proganado_v3.sql`) es el único modelo de datos autorizado.
* **Inocuidad Fail-Closed (Regla de Oro):** Toda vaca en tratamiento médico con antibióticos o antiparasitarios queda automáticamente bloqueada para despacho de leche a plantas de acopio durante el tiempo de retiro fijado por el ICA.
* **Local-First para el Campo Colombiano:** La conectividad a internet en zonas rurales es intermitente o inexistente. El sistema debe poder registrar datos desconectado y sincronizarse posteriormente.

---

## 2. Hoja de Ruta de Escalabilidad Orgánica (4 Fases)

Para evitar la sobre-ingeniería y el agotamiento del equipo, el desarrollo se estructura en cuatro fases secuenciales:

```
[ Fase 1: Académica CESDE ]
  • DDL 12 tablas en 3FN
  • HTML5 semántico puro (WCAG)
  • Algoritmos PSeInt / Java
  • Prototipo UI Emilio en repo
           │
           ▼
[ Fase 2: Monolito Local-First (Finca LAN) ]
  • Operación 100% offline en finca
  • Backend ligero (Python FastAPI / Java)
  • SQLite WAL / MariaDB en PC local
  • Conexión UI Emilio ➔ API REST local
           │
           ▼
[ Fase 3: SaaS Cloud MVP ($0 COP) ]
  • Supabase PostgreSQL (Cloud)
  • API Serverless en Render / Vercel
  • Autenticación JWT con roles (Admin/Mayordomo)
  • Regla Cinta Roja ICA automatizada
           │
           ▼
[ Fase 4: Cloud Enterprise AWS ]
  • AWS ECS Fargate + RDS Multi-AZ
  • Multi-Hacienda y Facturación Electrónica (RST)
  • Integración IoT (Básculas digitales + Aretes RFID)
```

---

### Fase 1: Base Académica & Validación de Entregables (Cierre Semestre 2026)
* **Objetivo:** Cumplir al 100% la rúbrica del docente en CESDE Aula 406 y asegurar la nota máxima del equipo.
* **Alcance Técnico:**
  * **Base de Datos:** DDL oficial de 12 tablas normalizadas en 3FN con integridad referencial, llaves foráneas compuestas y restricciones `CHECK`.
  * **Frontend Académico:** Maquetación semántica pura (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<fieldset>`, `<table>`) con diseño accesible (WCAG 2.1).
  * **Lógica Algorítmica:** Estructuras de control y validaciones en PSeInt / Java inicial según directriz del docente.
  * **Prototipo Interactivo:** Integración de la maqueta de Emilio en `prototipo_interfaz/` como exploración de interfaz de usuario sin exigencia de backend productivo.
* **Persistencia:** Simulación en `localStorage` y SQLite de pruebas.
* **Regla de Oro de Gestión:** No alterar los entregables estáticos calificados por el docente para intentar conectar código en desarrollo antes de tiempo.

---

### Fase 2: Monolito Local-First para Operación en Finca (Q1 2027)
* **Objetivo:** Permitir que Emilio y el ganadero utilicen el sistema directamente en la finca real sin requerir acceso a internet ni pagar servidores en la nube.
* **Arquitectura de Red (LAN Rural):**
  * El computador de la casa de la finca actúa como servidor local.
  * Se levanta un punto de acceso Wi-Fi local (router doméstico sin necesidad de internet).
  * Los mayordomos y operarios acceden desde sus teléfonos ingresando a la IP local (ej. `http://192.168.1.50:8899`).
* **Pila Tecnológica:**
  * **Backend:** API REST compacta en Python (FastAPI) o Java (Spring Boot / Servlets) de <300 líneas por módulo.
  * **Base de Datos:** SQLite en modo WAL (`Write-Ahead Logging`) o MariaDB local embebida.
* **Tareas de Integración del Prototipo:**
  * Reemplazar las llamadas a `localStorage` en `app.js` por peticiones `fetch()` HTTP:
    * `GET /api/bovinos` ➔ Consulta el listado real de animales desde la base de datos.
    * `POST /api/bovinos` ➔ Inserta un nuevo animal en la tabla `bovinos`.
    * `POST /api/ordenio` ➔ Registra el pesaje diario de leche en `pesajes_leche`.
    * `POST /api/tratamientos` ➔ Aplica tratamiento veterinario y activa la alerta de retiro.
* **Seguridad y Respaldo:**
  * Script automatizado de volcado diario de base de datos a memoria USB (`backup_diario.sql`).

---

### Fase 3: SaaS Cloud MVP a $0 COP (Q2/Q3 2027)
* **Objetivo:** Desplegar el sistema en la nube para permitir que el propietario consulte los datos de su hato desde la ciudad mientras los mayordomos registran en campo.
* **Pila Tecnológica Cloud ($0 Costo):**
  * **Base de Datos Cloud:** PostgreSQL administrado en Supabase (Tier gratuito).
  * **Backend API:** Node.js (Express/Fastify) o Python (FastAPI) desplegado en Render / Railway / Vercel.
  * **Frontend Web:** Prototipo evolucionado a Progressive Web App (PWA) instalable en celulares Android/iOS con soporte de almacenamiento temporal offline (`IndexedDB`).
* **Seguridad & Autenticación:**
  * JSON Web Tokens (JWT) con expiración corta y refresh tokens seguros.
  * Control de acceso basado en roles (RBAC):
    * `SuperAdmin`: Soporte técnico y configuración de haciendas.
    * `Administrador / Dueño`: Reportes financieros, inventario total, transferencias.
    * `Veterinario`: Registro de diagnósticos, tratamientos farmacológicos y altas médicas.
    * `Mayordomo / Operario`: Registro de pesajes de leche, partos, celos y movimientos de potrero.
* **Motor de Inocuidad Automatizado:**
  * Vista materializada `v_bovinos_cinta_roja` que intercepta todo despacho de leche y alerta visualmente en color rojo si el animal está en periodo de retiro.

---

### Fase 4: Cloud Enterprise AWS & Escalabilidad Comercial (2028+)
* **Objetivo:** Comercialización de ProGanado como software multitenant para asociaciones ganaderas (Colanta, Fedegán) bajo la estructura empresarial de ProGanado S.A.S.
* **Pila de Infraestructura Empresarial (AWS):**
  * **Cómputo:** AWS ECS Fargate (contenedores Docker auto-escalables).
  * **Datos:** AWS RDS PostgreSQL Multi-AZ con réplicas de lectura.
  * **Archivos Multimedia:** AWS S3 + CloudFront (CDN global) para fotos de identificación de animales, registros de partos y certificados sanitarios.
  * **Eventos & Tareas:** AWS EventBridge + Lambda para notificaciones automáticas de vacunación (Fiebre Aftosa, Brucelosis) por WhatsApp/Email.
* **Integración de Hardware Agropecuario:**
  * Conexión con básculas ganaderas electrónicas (vía Web Bluetooth API o puertos seriales RS-232).
  * Lectura de aretes electrónicos RFID compatibles con el sistema oficial SINIGAN del ICA.

---

## 3. Matriz de Transición Tecnológica por Capas

| Capa | Fase 1 (CESDE Actual) | Fase 2 (Finca LAN) | Fase 3 (Cloud MVP $0) | Fase 4 (AWS Enterprise) |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend** | HTML5 Semántico + Mock UI Emilio | HTML/JS Modular optimizado | PWA (Vanilla/Vite) con IndexedDB | React / Next.js Enterprise |
| **Backend API** | N/A (Entregables estáticos) | Python FastAPI / Java Servlet | Node.js / FastAPI en Render | AWS ECS Fargate / Lambda |
| **Base de Datos** | Script SQL DDL 12 tablas | SQLite WAL / MariaDB Local | PostgreSQL Supabase Cloud | AWS RDS PostgreSQL Multi-AZ |
| **Red / Conexión** | Localhost (127.0.0.1) | Red Wi-Fi Local Finca (LAN) | Internet HTTPS | AWS CloudFront + VPC Privada |
| **Inocuidad ICA** | Declarada en DDL y CHECKs | Validación en Backend API | Vistas SQL + Alertas Push | Eventos automáticos en tiempo real |
| **Costo Mensual** | **$0 COP** | **$0 COP** | **$0 COP** | Pago por uso (Suscripción SaaS) |

---

## 4. Protocolo de Trabajo y Convivencia del Equipo

Para garantizar el éxito académico y la tranquilidad del grupo:

1. **Prioridad Absoluta a la Rúbrica Académica:** Todos los miembros del equipo deben enfocar sus esfuerzos inmediatos en los requisitos que califica el profesor (SQL normalizado, maquetación semántica y algoritmos).
2. **Respeto al Trabajo de Emilio:** La maqueta de Emilio no se descarta; se preserva en `prototipo_interfaz/` como el cimiento oficial del frontend para la Fase 2.
3. **Cero Presión Prematura:** No se le exigirá a Emilio ni a Sebastián tener la API conectada antes de finalizar el semestre. Las integraciones complejas se abordarán de manera estructurada en las vacaciones o en la siguiente etapa formativa.
