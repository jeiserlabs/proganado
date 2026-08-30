# 🔄 Módulo de Migración & Compatibilidad: Mi Ganadero (Software Ganadero SG) ➔ ProGanado S.A.S.

> **Objetivo Técnico:** Proporcionar un motor de importación *"Zero-Friction"* para que cualquier hacienda ganadera que use *Software Ganadero SG / Mi Ganadero* pueda migrar todo su historial zootécnico a ProGanado en menos de 60 segundos sin pérdida de datos.

---

## 🏛️ 1. Arquitectura Interna de "Mi Ganadero" (Legacy vs ProGanado)

| Aspecto | Legacy: Software Ganadero SG / Mi Ganadero | Moderno: ProGanado S.A.S. |
| :--- | :--- | :--- |
| **Motor de Base de Datos** | Archivos planos `.DBF` (FoxPro) o `.MDB` (MS Access) / Firebird `.GDB` | SQLite WAL local (Offline-First) + PostgreSQL Cloud en AWS |
| **Integridad de Datos** | Sin llaves foráneas estrictas; alta tasa de registros huérfanos | 3FN con Foreign Keys (`ON DELETE RESTRICT`) y validación Zod |
| **Acceso & Conectividad** | Monousuario local en Windows escritorio (requiere dongle USB o licencia de máquina) | Multiplataforma PWA (Móvil, Tablet, Web) con sincronización bidireccional |
| **Seguridad Sanitaria** | Registro pasivo en libreta; no bloquea ordeño automáticamente | **Fail-Closed:** Alerta Cinta Roja y bloqueo automático de leche con antibiótico |

---

## 🗺️ 2. Matriz de Mapeo de Tablas (Legacy ➔ 12 Tablas 3FN)

```
[ ARCHIVOS LEGACY DBF / ACCESS ]              [ TABLAS PROGANADO 3FN ]
┌──────────────────────────────┐              ┌───────────────────────────┐
│ HOJAVIDA.DBF                 │ ───────────► │ bovinos, razas, potreros  │
│ NUMERO, NOMBRE, RAZA, POTRERO│              │ (id_bovino, id_raza, ...) │
├──────────────────────────────┤              ├───────────────────────────┤
│ CONTROL_LECHE.DBF            │ ───────────► │ pesajes_leche             │
│ NUMERO, FECHA, AM_LT, PM_LT  │              │ (id_pesaje, hora, litros) │
├──────────────────────────────┤              ├───────────────────────────┤
│ SERVICIOS_MONTA.DBF          │ ───────────► │ eventos_reproductivos     │
│ NUMERO, FECHA_IA, TIPO, TORO │              │ (id_evento, tipo_evento)  │
├──────────────────────────────┤              ├───────────────────────────┤
│ TRATAMIENTOS_SANIDAD.DBF     │ ───────────► │ tratamientos_sanitarios   │
│ NUMERO, DROGA, DOSIS, RETIRO │              │ medicamentos (dias_retiro)│
├──────────────────────────────┤              ├───────────────────────────┤
│ PALPACIONES_TACTO.DBF        │ ───────────► │ eventos_reproductivos     │
│ NUMERO, ESTADO_PRENEZ, DIAS  │              │ (dias_abiertos_calc)      │
└──────────────────────────────┘              └───────────────────────────┘
```

---

## 🛡️ 3. Pipeline de Migración Automatizado

1. **Extracción:** El usuario exporta su copia de seguridad de Mi Ganadero (`.DBF`, `.MDB` o Excel consolidado `.XLSX`/`.CSV`).
2. **Validación con Esquemas Zod:**
   * Detección de duplicidad de aretes (`codigo_valor`).
   * Normalización de fechas (conversión de formatos `DD/MM/YYYY` a `YYYY-MM-DD` ISO-8601).
   * Normalización de pesos y litros (limpieza de comas, puntos y strings).
3. **Carga Atómica Transaccional (`BEGIN TRANSACTION`):**
   * Se insertan primero los catálogos (`razas`, `potreros`, `medicamentos`).
   * Se inserta el hato maestro (`bovinos` y `marcaciones`).
   * Se insertan las series de tiempo (`pesajes_leche`, `eventos_reproductivos`, `tratamientos_sanitarios`).
4. **Verificación de Consistencia Post-Migración:**
   * Cálculo automático de días abiertos de todas las vacas activas.
   * Identificación de vacas con alerta de secado pendiente (gestación $\ge 210$ días).
   * Generación de reporte de inconsistencias (vacas sin fecha de nacimiento, servicios sin diagnóstico).

---

## 💡 4. Ventajas Competitivas para Venta y Sustentación

* **Migración a 1 Clic:** El ganadero no tiene que volver a digitar sus 160+ vacas ni perder 10 años de registros.
* **Cero Costo de Licencia:** Sustituye licencias de \$1.5M a \$3M COP por suscripción SaaS ligera de $119k/mes o plan gratuito local.
* **Móvil en Potrero:** Frente a Software Ganadero que solo funciona sentado en la oficina, ProGanado opera directamente en la sala de ordeño y en el potrero sin internet.
