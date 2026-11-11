# EVIDENCIA Y FUENTES — cada afirmación del deck, con su archivo

> **Regla de esta carpeta:** si una cifra no tiene fuente aquí, no va en el deck.
> Este documento existe para que, si el jurado pregunta "¿de dónde sacó eso?", la respuesta
> sea un archivo y no una memoria.

Rutas relativas al repositorio `C:\PROYECTOS\Mis_Proyectos\proganado`.

---

## 1. Modelo de datos (slide 5)

| Afirmación | Valor exacto | Fuente | Estado |
|---|---|---|---|
| 12 tablas | 12 `CREATE TABLE` | `01_Base_de_Datos_SQL/schema_produccion_proganado_v3.sql` | Verificado por conteo |
| 5 índices | 5 `CREATE INDEX` | mismo archivo | Verificado por conteo |
| 1 vista | `v_bovinos_cinta_roja` | mismo archivo | Verificado |
| 3FN | Sin grupos repetidos, cada hecho una vez | mismo archivo + `npm run verify` 32/32 | Verificado |
| RESTRICT / CASCADE / SET NULL | 12 FKs declaradas | mismo archivo (`ON DELETE`) | Verificado |
| Migración a las 12 tablas = Fase 2.1 | — | `docs/sustentacion_2026/ROADMAP_VERIFICADO_2026-11-07.md` | Verificado |

**Las 12 tablas:** `usuarios`, `fincas`, `suscripciones_saas`, `entregas_acopio`, `potreros`,
`razas`, `bovinos`, `marcaciones`, `medicamentos`, `tratamientos_sanitarios`, `pesajes_leche`,
`eventos_reproductivos`.

**Los 5 índices:** `idx_bovinos_finca`, `idx_bovinos_estado`, `idx_pesajes_bovino_fecha`,
`idx_marcaciones_bovino`, `idx_tratamientos_fecha`.

---

## 2. Consultas T-SQL (slide 6)

| Afirmación | Detalle | Fuente | Estado |
|---|---|---|---|
| 10 consultas | 4 básicas (01–04) + 6 intermedias (05–10) | `C:\Users\dev\Desktop\ENTREGAS\03_MOMENTO_3_SQL_PROGANADO.pdf` | Verificado |
| Motor | Microsoft SQL Server · T-SQL | mismo PDF (usa `DATEADD`, `GETDATE`, `TOP`) | Verificado |
| Consulta 06 | Alerta Cinta Roja por retiro ICA | mismo PDF, página 5 | Verificado |
| Salida consulta 06 | `COL-1048-MARIPOSA` · Ceftiofur · aplicado 2026-11-05 · 4 días → fin 2026-11-09 · `BLOQUEADA PARA ORDEÑO` | mismo PDF | Verificado |
| Salida consulta 06 | `COL-1053-MORA` · Oxitetraciclina · aplicado 2026-11-04 · 7 días → fin 2026-11-11 · `BLOQUEADA PARA ORDEÑO` | mismo PDF | Verificado |
| Lógica | `DATEADD(day, med.dias_retiro_ica, t.fecha_tratamiento) >= CAST(GETDATE() AS DATE)` | mismo PDF | Verificado |

**Aclaración importante para el jurado:** el dataset del SQL Server académico (donde aparece
Ceftiofur) es **distinto** del dataset demo del MVP (donde el catálogo tiene Oxitetraciclina 6 días,
Ivermectina 8 días y Vacuna Aftosa 0). Son dos artefactos con propósitos distintos: el primero
prueba el modelo relacional; el segundo prueba la app. No se mezclan.

---

## 3. Producto MVP (slide 3 y 7)

| Afirmación | Valor exacto | Fuente | Estado |
|---|---|---|---|
| Stack real | HTML + CSS + JavaScript vanilla; Python 3 estándar; SQLite | `producto_mvp/index.html`, `proganado.css`, `reglas_retiro.js`, `proganado.js`, `servidor.py` | Verificado |
| 8 módulos | Inicio, Ganado, Salud, Reproducción, Producción, Potreros PRV, Contabilidad, Usuarios | `producto_mvp/index.html` (8 `nav-item`) | Verificado por conteo |
| Peso de la interfaz | **54.002 bytes gzip** = 54.0 kB (52.7 KiB) | Suma de `index.html` (9.360) + `proganado.css` (12.998) + `reglas_retiro.js` (1.895) + `proganado.js` (29.749), gzip nivel 9 | Verificado |
| Peticiones externas | 0 | `index.html` solo referencia archivos locales | Verificado |
| Servidor | `127.0.0.1:8899` | `producto_mvp/servidor.py` | Verificado |
| Persistencia | SQLite, tablas `kv` y `facturas` | `producto_mvp/servidor.py` (`CREATE TABLE ... kv`, `... facturas`) | Verificado |
| 2FA | Login local de prueba; el código se muestra en pantalla | `ROADMAP_VERIFICADO_2026-11-07.md` | Verificado (limitación declarada) |
| Auditoría de navegador | Login, alta, búsqueda, CSV, logout; 0 errores de consola; 0 overflow a 390/768/1440 px; 0 imágenes rotas | `ROADMAP_VERIFICADO_2026-11-07.md` | Verificado 07-nov-2026 |
| 116 animales | 116 aretes en `TODOS_ARETES` | `producto_mvp/proganado.js` | Verificado por conteo. **Son demo, no clientes.** |

---

## 4. Cinta roja y sanidad (slide 4)

| Afirmación | Valor exacto | Fuente | Estado |
|---|---|---|---|
| Retiro Oxitetraciclina | 6 días | `producto_mvp/proganado.js` (`medOxi`) | Verificado |
| Retiro Ivermectina | 8 días | `producto_mvp/proganado.js` (`medDesp`) | Verificado |
| Retiro Vacuna Aftosa | 0 días | `producto_mvp/proganado.js` (`medAftosa`) | Verificado |
| Bloqueo fail-closed | No habilita pesaje si el retiro no terminó | `producto_mvp/reglas_retiro.js` | Verificado |
| Vista de cinta roja | `v_bovinos_cinta_roja` | `schema_produccion_proganado_v3.sql` | Verificado |
| Pérdida 5M–25M COP por tanque | Escenario conservador | `docs/PROYECCION_ESCALABILIDAD_Y_RENTABILIDAD.md` + modelo del equipo | **Estimación, no medición de campo** |
| ~20k COP/día por vaca abierta | Estimación de costo de alimentación | Modelo del equipo | **Estimación, no medición de campo** |

> **Cómo decirlo si preguntan:** "Es un escenario conservador para dimensionar el riesgo, no una
> medición de campo. Preferimos declararlo así antes que presentar una cifra que no podemos sustentar."

---

## 5. Negocio (slide 8)

| Afirmación | Valor exacto | Fuente | Estado |
|---|---|---|---|
| Clientes pagos hoy | **0** | Estado real del proyecto al 14-nov-2026 | Verificado |
| Equilibrio de caja | 3–5 fincas pagas | `docs/PROYECCION_ESCALABILIDAD_Y_RENTABILIDAD.md` | Escenario de modelo |
| Sueldo de fundador | ~135 fincas activas (~27 cuentas Pro) | mismo documento | Escenario de modelo |
| Costos cash año 1 | 3.6M COP | mismo documento | Escenario de modelo |
| Plan Free | 0 COP | mismo documento | Decisión de producto |
| Plan Pro | 119k COP/mes | mismo documento | Decisión de producto |
| Plan Multi | 299k COP/mes | mismo documento | Decisión de producto |
| 3 fincas piloto | Métrica: activación, retención semanal, disposición a pagar | Decisión del equipo | Compromiso, no resultado |

---

## 6. Lo que el deck NO afirma (y por qué)

| No aparece | Motivo |
|---|---|
| React / Astro / MongoDB / Compass | No hacen parte de lo entregado. El MVP es vanilla y SQLite. |
| "Estamos en la nube" | El MVP es local-first. La nube es Fase 3. |
| "5.000 fincas" | Es una proyección del modelo, no tracción. Presentarla como logro sería falso. |
| "116 clientes" | Son 116 animales de demostración. |
| "Zero Data Loss" / "100% robustez" | El respaldo automático no existe todavía; es Fase 2.1. |
| "Medimos en campo" | Las cifras de pérdida son estimaciones declaradas. |
| "Soy veterinario" | Humberto es médico y asesor clínico, no veterinario. |

Estas frases están vetadas por máquina en `CONTRATO_DECK.json` y el gate `deck:audit` falla si
alguien las reintroduce en el PDF.

---

## 7. Cómo se comprobó el deck

```powershell
# 1. Render (Playwright, 1280×720, scale 2)
node scripts\scratch\deck_v3\render_deck.js

# 2. Auditoría de contrato (páginas, frases requeridas, frases prohibidas, pie)
node scripts\dev\audit_deck.js scripts\scratch\deck_v3\out\DECK_PROGANADO_V3_9_SLIDES.pdf --contrato scripts\scratch\deck_v3\CONTRATO_DECK.json
```

Salida esperada:

```
📄 DECK_PROGANADO_V3_9_SLIDES.pdf
   Contrato: ProGanado · Sustentación 5 min · v3
   Páginas:  9
   Pie:      8 ocurrencia(s)
✅ Contrato de presentación cumplido.
```

**Límite declarado del gate:** verifica páginas, frases y pie. **No verifica** que un número sea
correcto ni que el diseño se vea bien. Eso lo cubre este documento (fuente por cifra) y la revisión
visual slide por slide.
