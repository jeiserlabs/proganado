# 🚀 MASTER BACKLOG Y PRE-MORTEM (GanadoControl V2 a V3)

> [!IMPORTANT]
> **Contexto del Proyecto:** El proyecto "GanadoControl" ha superado el MVP académico y ha escalado a un modelo de 12 tablas (V2). Este documento audita el estado actual y define el backlog hacia la V3 (Producción SaaS Comercial), alineado con las realidades del agro colombiano (Fedegán / ICA).

---

## 1. 🔍 AUDITORÍA TÉCNICA (Puntos Ciegos y Mejoras)

### ❌ Puntos Ciegos Detectados en la V2
1. **Historial de Pesajes (Falta Tabla Intermedia):**
   - *Problema:* El peso está estático en la tabla `BOVINO`. En la vida real, el ganado se pesa mensual. Al sobreescribir el peso, perdemos el cálculo de la **Ganancia Diaria de Peso (GDP)** (KPI #1 en carne).
   - *Solución:* Crear tabla `REGISTRO_PESAJE (id_pesaje, id_bovino, fecha, peso_registrado)`.
2. **Historial de Movimientos de Potrero:**
   - *Problema:* `id_potrero` estático en `BOVINO`. No sabemos cuánto tiempo pastoreó un lote en el Potrero 1 antes de pasar al 2 (clave para PRV).
   - *Solución:* Crear tabla `ROTACION_LOTE (id_rotacion, id_bovino, origen, destino, fecha)`.

---

## 2. ☠️ PRE-MORTEM (Riesgos de Fracaso Comercial y Mitigación)

| Riesgo Fatal | Causa Raíz (Realidad Agrícola) | Mitigación Arquitectónica |
| :--- | :--- | :--- |
| **1. Deserción por falta de conectividad** | No hay señal 4G en el lote. La app se cae y el operario vuelve a la libreta. | **Offline-First (PWA):** Construir el frontend con Next.js PWA + IndexedDB. Guarda offline y hace "Sync" al detectar Wi-Fi. |
| **2. Fricción Tecnológica (Mayordomos analfabetas digitales)** | Administrador (50+ años) odia los botones pequeños en el sol. | **Bot WhatsApp Híbrido:** Interfaz Twilio/Baileys. El mayordomo manda audio: *"El arete 001 dio 12 litros"*. LLM hace el INSERT. |
| **3. Pérdida de Conocimiento por Rotación** | Operario renuncia y se lleva la libreta. | **Dashboards Gerenciales:** El dueño ve métricas en tiempo real en la nube, independientemente de quién opere. |

---

## 3. 🎯 CASOS DE USO PRIORITARIOS (Backlog V3)

### Epic 1: Trazabilidad y Rentabilidad
*   **[HU-01] Curva GDP:** Como ganadero, quiero registrar el peso mensual para ver la curva de crecimiento y detectar baja nutrición.
*   **[HU-02] Control Secado Automático:** Notificación push 60 días antes del parto para aislar la vaca y dejar de ordeñarla.

### Epic 2: Módulo Sanitario y Cumplimiento ICA
*   **[HU-03] Bloqueo de Tanque por Antibiótico:** Al registrar leche de vaca en tratamiento, el sistema bloquea el registro (alerta roja) indicando días de retiro restantes.
*   **[HU-04] Alertas Fedegán:** Lista automática de animales pendientes de Aftosa/Brucelosis.

---

## 4. 🛠️ ARQUITECTURA TECNOLÓGICA (Stack Comercial)
Pasaremos del stack académico al stack "Gentleman / Ponytail":
1.  **Frontend:** Next.js (App Router) + Tailwind + Shadcn/UI (UI/UX Pro Max).
2.  **Estado Global / Offline:** TanStack Query + RxDB.
3.  **Backend / API:** NestJS (Inyección de Dependencias) + Zod (Zero-Leak).
4.  **Base de Datos:** Supabase (PostgreSQL con Row Level Security).
5.  **Testing CI/CD:** Playwright corriendo en GitHub Actions.
