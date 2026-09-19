# AUDITORÍA DE PARIDAD SSOT — PROGANADO S.A.S. (15-SEP-2026)

> **Ejecutada por:** Freebuff (DeepSeek V4) sobre `main` @ `d4a0d86`, pedido del Tech Lead.
> **Alcance:** los 41 archivos versionados + el DDL real ejecutado en SQLite.
> **Regla 19 (estabilidad) respetada:** nada de lo corregido rompió el modelo entregado;
> el DDL cambió solo donde había un bug demostrable de zona horaria.

---

## 0. VEREDICTO EN UNA LÍNEA

El repositorio tenía **un SSOT declarado y seis copias hechas a mano**, y tres de esas copias
describían una base de datos que ya no existía. El daño no era cosmético: la capa de validación
(Zod) **aprobaba datos que la base rechaza** y **no validaba columnas obligatorias**, así que un
macho podía quedar registrado como hembra sin que nada se quejara. Corregido, con un **gate
automatizado** que ahora impide que vuelva a pasar.

---

## 1. EL DRIFT REAL (medido, no supuesto)

`AGENTS.md §1.4` declara como DDL oficial `01_Base_de_Datos_SQL/schema_produccion_proganado_v3.sql`.
Contra él comparé el resto. Esto es lo que estaba fuera de sincronía:

| Copia | Qué decía | Realidad v3 |
|---|---|---|
| `README.md` (bloque SQL embebido) | `bovinos` con `alerta_cinta_roja` + `estado_lactancia`; `entregas_acopio` **sin** las 5 columnas de conciliación; 5 índices | `bovinos` con `sexo`, `estado_fisiologico`, `estado_vital`; `entregas_acopio` con `numero_tiquete`, `litros_facturados`, `precio_litro_real`, `valor_pagado_real`, `diferencia_litros`; 7 índices + **vista** `v_bovinos_cinta_roja` |
| `README.md` (erDiagram Mermaid) | `boolean alerta_cinta_roja`, `string estado_lactancia` | otras 3 columnas |
| `src/schemas/validation.schemas.ts` | `estado_lactancia: z.enum(['En_Ordeño','Horra_Seca','Novilla','Crecimiento','Toro'])`, `alerta_cinta_roja: z.boolean()` | el enum no existe en la tabla y el flag **no es columna** |
| `src/types/domain.types.ts` | `EstadoLactancia` + `alerta_cinta_roja` | ídem |
| `docs/DICCIONARIO_VALIDACION_INPUTS_Y_CELDAS.md` | matriz de validación de las columnas viejas | ídem |
| `docs/contexto/ESTADO_VIVO_PROGANADO.md` | roles `(Administrador, Asistente, Veterinario)`; sitio web de otro repo | falta `Operario`; el remoto real es `jeiserlabs/proganado` |

### 1.1 El bug que sí rompía datos (Zod ↔ CHECK)

`eventos_reproductivos.tipo_evento` tiene `CHECK (tipo_evento IN ('Parto','Celo_Observable','Inseminacion','Palpacion','Aborto'))`.
Zod aceptaba **7** valores distintos: 4 de ellos (`Inseminacion_Artificial`, `Monta_Natural`,
`Diagnostico_Palpacion_Positivo`, `Diagnostico_Palpacion_Vacia`) **la base los rechaza**; y 2 que
la base sí acepta (`Inseminacion`, `Palpacion`) **Zod los rechazaba**. En cualquier dirección, el
formulario validaba "ok" y la inserción fallaba (o al revés). Igual en `bovinos`: Zod no declaraba
`sexo`, que tiene `DEFAULT 'Hembra'`, así que un toro registrado por el formulario quedaba como
hembra en silencio.

### 1.2 El bug de fondo: el gate de inocuidad medía el día en UTC

`v_bovinos_cinta_roja` usaba `CURRENT_DATE`, que en SQLite es **UTC**, no la hora de Colombia
(UTC-5). Entre las 19:00 y las 23:59 COT el UTC ya es el día siguiente, así que la vista dejaba
de marcar a la vaca **hasta 5 horas antes** de cumplir el retiro. Dirección del error: **hacia
liberar leche con antibiótico**, que es justo lo que el módulo existe para impedir. Lo mismo con
`usuarios.fecha_registro`: quedaba 5 horas adelante, y ese es el rastro de auditoría que se le
muestra al ICA. Corregido a `date('now','localtime')` / `datetime('now','localtime')` y anotado
en el CHANGELOG del DDL (v3 → v3.1).

Prueba reproducible: `npm test` (test *"el día se mide en hora LOCAL de Colombia, no en UTC"*).

---

## 2. LO QUE SE IMPLEMENTÓ

| # | Cambio | Archivo |
|---|---|---|
| 1 | Gate de paridad que **ejecuta el DDL real en SQLite** y diffa las 6 copias (tablas, columnas, índices, vistas, enums, columnas generadas) | `tools/paridad_ssot.mjs` (nuevo) |
| 2 | Generador del diagrama Mermaid del README **desde la estructura real** | `tools/gen_readme_diagrama.mjs` (nuevo) |
| 3 | Deuda declarada con motivo + fecha de revisión; el gate falla si una excepción **vence** o si ya **no tapa nada** (anti-pudrición) | `tools/paridad_excepciones.json` (nuevo) |
| 4 | Pruebas: 12 tablas, fail-closed del último día de retiro, hora local vs UTC, marca de auditoría, la base rechaza el enum inválido, gate de paridad | `tests/paridad_ssot.test.mjs` (nuevo) |
| 5 | `npm run paridad` / `npm test` / `npm run verify` (cero dependencias: `node:sqlite` + `node:test`) | `package.json` (nuevo) |
| 6 | `BovinoSchema` con `sexo`, `estado_fisiologico`, `estado_vital`; `CintaRojaBovinoSchema` para leer la vista; enum de eventos igual al CHECK; hora `HH:MM[:SS]`; `fecha_registro` acepta el formato de SQLite | `src/schemas/validation.schemas.ts` |
| 7 | `EstadoFisiologico`, `SexoBovino`, `EstadoVital`, `CintaRojaBovino`, `CrearBovinoInput`; cinta roja marcada como derivada (solo lectura) | `src/types/domain.types.ts` |
| 8 | Bloque SQL del README = copia exacta del DDL + erDiagram regenerado | `README.md` |
| 9 | Notas de enum completas (dejaron de decir "Admin" y "…") | `proganado_mr.dbml`, `proganado_mer.mmd` |
| 10 | Matriz de validación alineada + URL del repo correcta | `docs/DICCIONARIO_VALIDACION_INPUTS_Y_CELDAS.md` |
| 11 | URL del repo + procedimiento de verificación obligatorio antes de tocar el modelo | `AGENTS.md` |
| 12 | URL, roles y definición de `bovinos` alineados | `docs/contexto/ESTADO_VIVO_PROGANADO.md` |

**Estado verificado hoy:**

```
$ npm run paridad      → ✅ Paridad total (12 tablas, 7 índices, 1 vista)
$ npm test             → 8/8 PASS
```

---

## 3. DEUDA DECLARADA (visible, con fecha, no escondida)

Los dos `.psc` **no cumplen la regla técnica 8 del propio `AGENTS.md`** (usan `Definir ... Como` y
`<-`, y no tienen los bloques `// DATOS DE ENTRADA / PROCESO / DATOS DE SALIDA`).

Sinceridad sobre por qué **no se reescribieron**:
1. Los archivos se commitearon el **30-ago 13:44** y la regla 8 se escribió ese mismo día a las
   **14:33** — la regla llegó 49 minutos después que el algoritmo.
2. El artefacto ya está **radicado** en el PDF del Momento 1: reescribirlo separa el PDF del repo.
3. **No hay validador headless de PSeInt en esta máquina.** Lo probé: `psexport.exe` no abre el
   archivo (`psterm`/`pseval` son GUI y cuelgan). Reescribir 241 líneas de sintaxis de un
   entregable calificado sin poder compilarlas sería exactamente el "editar a la loca" que
   prohíbe la Regla 26.

Quedan en `tools/paridad_excepciones.json` con **vencimiento al 15-oct-2026**: si no se corrigen,
el gate se pone rojo solo. La reescritura es mecánica (`Definir x Como Entero` → `x = 0`,
`<-` → `=`, añadir los 3 bloques de comentarios) y debe hacerla quien tenga PSeInt abierto, que
avisa del error de sintaxis al instante.

---

## 4. INCOHERENCIAS DETECTADAS QUE **NO** SE TOCARON (decisión del Tech Lead)

1. **Los PDFs del Momento 1** describen el `bovinos` viejo. No son texto versionado: se regeneran.
2. **`entregas_acopio` no tiene índice `(id_finca, fecha_entrega)`** y `eventos_reproductivos`
   tampoco en `(id_bovino, fecha_evento)`: las consultas de conciliación y de curva reproductiva
   escanean la tabla completa. Con 15 vacas no se nota; con 500 sí.
3. **`tratamientos_sanitarios.tipo_procedimiento` no tiene `CHECK`**: Zod restringe 10 valores y la
   base acepta cualquier texto. La validación no es la última línea de defensa (el resto sí lo es).
4. **`potreros.dias_ocupacion`**: Zod permite máximo 5; el comentario del tipo decía "máximo 3".
   Corregido el comentario, no la regla.
5. **PSeInt vs SQL en el día límite**: el módulo 1 del `.psc` compara `dias_transcurridos < dias_retiro`
   y da el retiro por cumplido el día en que se cumple; la vista SQL mantiene el bloqueo ese día
   (fail-closed). Son dos definiciones distintas del mismo límite sanitario: hay que unificarlas
   (la correcta es la de la base, la conservadora).
6. **`04_Documentos_Sustentacion/` tiene dos PDFs numerados `01_` y dos `02_`** (versiones sucesivas
   del mismo ER) y un archivo con espacio en el nombre (`ER PROGANADO.drawio`), que complica
   cualquier comando desde terminal.
