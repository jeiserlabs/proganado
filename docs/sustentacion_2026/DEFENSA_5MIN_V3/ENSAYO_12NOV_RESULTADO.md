# Ensayo general 12-nov-2026 — medición real del reloj

> **Fuente:** `C:\Users\dev\Desktop\ENSAYO_SUSTENTACION_PROGANADO_5MIN.mp4` (grabado hoy 12:30).
> **Medido con:** `ffprobe` (duración) + `ffmpeg silencedetect` (pausas) + conteo silábico del guion.
> **Nada aquí es estimación de oído:** cada cifra sale de un comando reproducible.

---

## 1. Veredicto

| Métrica | Medido | Objetivo | Delta |
|---|---|---|---|
| Duración total | **5:20** (320.2 s) | 5:00 (300 s) | **+20 s** |
| Habla efectiva | 313.1 s | — | — |
| Silencio total | **6.9 s** (2.2 %) | ~15-20 s | **−10 s de pausas** |
| Ritmo | 3.39 sílabas/s (~110 ppm) | 3.4-3.8 | correcto, calmado |

**Lectura:** el ritmo está bien; el problema no es la velocidad, es el **volumen de texto**. Y no hay pausas: 6.9 s de silencio en 5:20 significa que se habla de corrido, sin la pausa después de cada cifra dura que exige la regla 2 del guion.

**Acelerar no es la salida.** Para recuperar 20 s hablando más rápido habría que subir a 3.62 sílabas/s y sonaría atropellado, justo en la parte que más credibilidad da. La salida es **cortar texto**: ~95 sílabas (≈ 28 s).

---

## 2. Dónde se va el tiempo (por bloque, al ritmo medido)

| Bloque | Voz | Sílabas | Real | Slot | Delta |
|---|---|---|---|---|---|
| 0:00–0:40 | Emilio (1-2) | 166 | 49 s | 40 s | **+9 s** |
| 0:40–1:15 | Sebastián (3) | 123 | 36 s | 35 s | +1 s |
| 1:15–2:05 | Humberto (4) | 174 | 51 s | 50 s | +1 s |
| 2:05–3:20 | Jeiser (5-6) | 247 | **73 s** | 75 s | −2 s |
| 3:20–4:00 | Jeiser (7) | 150 | 44 s | 40 s | **+4 s** |
| 4:00–4:40 | Emilio (8) | 128 | 38 s | 40 s | −2 s |
| 4:40–5:00 | Todos (9) | 73 | 22 s | 20 s | +2 s |

Solo dos bloques se pasan de su slot: **la apertura de Emilio (+9 s)** y **la slide 7 de Jeiser (+4 s)**. El resto cabe. El excedente de 20 s se reparte ahí y en la ausencia de pausas.

---

## 3. Hoja de corte — 5 frases, 34 s recuperados

Cada corte está medido en sílabas. Aplicados todos: habla baja de 313 s a 279 s y quedan **7.5 s para las 5 pausas** de las cifras duras.

| # | Quién | Frase a cortar o recortar | Síl. | Ahorro |
|---|---|---|---|---|
| C1 | Emilio | Recortar "El mayordomo anota el ordeño, el tratamiento y la fecha de parto; si se equivoca, la vaca se ordeña antes de tiempo y el tanque se contamina" → **"El mayordomo anota ordeño, tratamiento y parto; si se equivoca, el tanque se contamina."** | 51→28 | **−7 s** |
| C2 | Sebastián | Eliminar "A la izquierda ven el panel real; a la derecha, el login en el teléfono." (la slide ya lo muestra) | 24 | **−7 s** |
| C3 | Jeiser | Eliminar "Eso no es una diapositiva bonita: es una consulta que se ejecutó y devolvió eso." (la frase anterior ya lo prueba con las dos filas reales) | 32 | **−9 s** |
| C4 | Jeiser | Recortar "La nube es Fase 3; primero están la API con autenticación de servidor y el respaldo diario verificado" → **"La nube es Fase 3; primero, la API con autenticación y el respaldo automático."** | 37→21 | **−5 s** |
| C5 | Emilio | Eliminar "En negocio, preferimos un número pequeño y verdadero." (arrancar directo en "Hoy tenemos cero clientes pagos") | 20 | **−6 s** |

**Total: −34 s.** Resultado proyectado: 4:53 con las pausas incluidas. Margen real: 7 s.

### Lo que NO se corta
Cinta roja (slide 4) completa · la línea de alcance "el MVP guarda en SQLite; migrar es la Fase 2" · las dos filas reales de la consulta 6 · "cero clientes pagos" · los 3 pilotos · el cierre completo.

---

## 4. Pausas obligatorias (hoy no existen)

Insertar **1.5 s de silencio** después de cada cifra. Son 7.5 s en total y los paga el corte de la sección 3.

| Momento | Cifra |
|---|---|
| Humberto | 5–25 millones por lote |
| Humberto | 20k COP por día abierto |
| Jeiser | doce tablas |
| Jeiser | 54 KB |
| Emilio | cero clientes pagos |

---

## 5. Checkpoints para el ensayo del sábado

Un cronómetro, cuatro marcas. Si al llegar a una marca vas **más de 5 s arriba**, se aplica el corte de esa fila en el momento.

| Marca | Debe marcar | Si vas largo, aplica |
|---|---|---|
| Termina Emilio (slide 2) | 0:46 | C1, C5 |
| Termina Sebastián (slide 3) | 1:22 | C2 |
| Termina Humberto (slide 4) | 2:13 | — (no se toca) |
| Termina Jeiser (slide 6) | 3:26 | C3 |
| Termina Jeiser (slide 7) | 4:10 | C4 |
| Cierre (slide 9) | **≤ 5:00** | — |

---

## 6. Pendiente antes de tocar el guion

Los 4 PDFs de guía (`Desktop\ENTREGAS\GUIAS\`) contienen el texto **largo**. Si se aplican los cortes C1-C5, las guías impresas quedan desalineadas con lo que se dice en tarima.

**Decisión requerida:** aplicar los cortes al `.md` y regenerar las 4 guías, o dejar el guion como está y aceptar 5:20 (dentro del "~5 min" confirmado). No hacer las dos cosas a medias.
