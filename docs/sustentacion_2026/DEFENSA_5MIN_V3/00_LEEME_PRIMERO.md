# 00 · LEE ME PRIMERO — Defensa ProGanado 5:00

> **Qué es esta carpeta:** el material definitivo para la sustentación del 14-nov-2026.
> Reemplaza a `06_DEFENSA_5MIN_GLM` (10 slides, con afirmaciones que no se podían defender).
> Aquí **nada está inventado**: cada cifra tiene fuente en `EVIDENCIA_Y_FUENTES.md`.

---

## 1. Qué hay aquí

| Archivo | Para qué sirve | Quién lo usa |
|---|---|---|
| `DECK_PROGANADO_V3_9_SLIDES.pdf` | La presentación que se proyecta. 9 slides, 16:9 (1280×720). | Todos |
| `GUION_5_MIN_4_VOCES.md` | El texto exacto que dice cada uno, con tiempos. | Todos |
| `guias/01_GUIA_EMILIO_VILLANUEVA.pdf` | Guion + datos + preguntas del jurado. | Emilio |
| `guias/02_GUIA_HUMBERTO_PINTO.pdf` | Guion + datos + preguntas del jurado. | Humberto |
| `guias/03_GUIA_SEBASTIAN_CORREA.pdf` | Guion + datos + preguntas del jurado. | Sebastián |
| `guias/04_GUIA_JEISER_GUTIERREZ.pdf` | Guion + datos + preguntas del jurado. | Jeiser |
| `EVIDENCIA_Y_FUENTES.md` | Cada afirmación con su archivo de origen. | Jeiser / jurado |
| `CONTRATO_DECK.json` | Reglas que el deck cumple por máquina (páginas, frases prohibidas). | Control de calidad |
| `previews/slide_01.png` … `slide_09.png` | Las 9 slides en PNG a 2×, para revisar sin abrir el PDF. | Todos |

**Cada guía tiene 2 páginas:** página 1 = tu bloque exacto, los datos que debes defender y cómo conectas con el compañero anterior y el siguiente. Página 2 = preguntas del jurado con respuesta, lo que NO puedes decir y un checklist antes de salir.

---

## 2. Estructura de los 5 minutos

| Tiempo | Voz | Slides | Qué tiene que quedar |
|---|---|---|---|
| 0:00–0:40 | Emilio | 1–2 | El dato vive en una libreta que se moja |
| 0:40–1:15 | Sebastián | 3 | Esto ya corre, no es un mockup |
| 1:15–2:05 | Humberto | 4 | La cinta roja bloquea el ordeño, no avisa |
| 2:05–3:20 | Jeiser | 5–6 | 12 tablas 3FN y 10 consultas T-SQL con salida real |
| 3:20–4:00 | Jeiser | 7 | Local-first: el potrero no espera a la nube |
| 4:00–4:40 | Emilio | 8 | 0 clientes pagos; 3–5 fincas para equilibrio |
| 4:40–5:00 | Todos | 9 | Tres pilotos y un año para demostrarlo |

**Si el jurado aprieta el tiempo:** recortar la slide 5 a una frase ("doce tablas en 3FN, cinco índices, una vista"). **Nunca** recortar la cinta roja (slide 4) ni el cierre (slide 9).

---

## 3. Las cinco reglas de oro

1. **No leer la pantalla.** El deck apoya; la boca explica. Si lees, el jurado desconecta.
2. **Pausa después de cada cifra dura:** 5M–25M COP · ~20k COP/día · 12 tablas · 54 KB · 0 clientes.
3. **La honestidad es el argumento, no una debilidad.** Decir "cero clientes pagos" y "el MVP guarda en SQLite, no en las 12 tablas todavía" te blinda. Inventar te hunde.
4. **Si no sabes una respuesta:** "No lo tengo medido; lo verifico y se lo envío". Eso vale más que una cifra inventada.
5. **El cierre no pide plata.** Pide tres fincas piloto y un año para medir.

---

## 4. Las frases prohibidas (si las dices, pierdes credibilidad)

| ❌ Prohibido | ✅ Se dice en su lugar |
|---|---|
| "React y Astro están en el MVP" | "El MVP es HTML, CSS y JavaScript vanilla; React es Fase 2.2" |
| "MongoDB / Compass" | "SQL Server para el modelo académico; SQLite en el MVP" |
| "La app corre sobre las 12 tablas" | "El modelo académico son 12 tablas; el MVP persiste en SQLite y migra en Fase 2.1" |
| "Estamos en la nube" | "Hoy es local-first; la nube es Fase 3" |
| "5.000 fincas" / "116 clientes" | "Cero clientes pagos; 3 fincas piloto para empezar" |
| "Zero Data Loss" / "100% robustez" | "El respaldo automático es Fase 2.1; hoy es manual y está declarado" |
| "Medimos en campo" | "Es un escenario conservador, no una medición de campo" |
| "Soy veterinario" (Humberto) | "Soy médico y asesor clínico del proyecto" |

Estas frases están vetadas por máquina en `CONTRATO_DECK.json`: si alguien las mete al PDF, el gate `deck:audit` falla.

---

## 5. Cómo se verificó (no es fe)

```powershell
node scripts\dev\audit_deck.js scripts\scratch\deck_v3\out\DECK_PROGANADO_V3_9_SLIDES.pdf --contrato scripts\scratch\deck_v3\CONTRATO_DECK.json
```

Resultado actual: **9 páginas · pie en 8 slides · 0 frases prohibidas · contrato cumplido.**

El deck además se auditó a ojo, slide por slide, en PNG a 2× de resolución; el generador detecta desbordes de contenido y avisa antes de exportar.

---

## 6. Plan del día 14-nov

| Hora | Acción |
|---|---|
| 7:00 | Llegar. Probar el PDF en el equipo del aula. |
| 7:10 | Ensayo completo cronometrado, una sola vez. |
| 7:20 | Ajustar solo lo que se pase de tiempo: adjetivos, nunca cifras. |
| 7:30 | Silenciar celulares. Guías impresas en la mano. |
| Durante | Hablar despacio. La pausa después de la cifra es la que convence. |

**Respaldos:** llevar el PDF en USB **y** en el correo. Nunca depender de una sola copia.

---

## 7. Lo que este material NO es

- No es una promesa de tracción: hay **0 clientes pagos**.
- No es una app en la nube: es local-first, y la nube es Fase 3.
- No es un producto terminado: es un MVP funcional más un modelo de datos académico verificado.

Decirlo así no resta: es exactamente lo que un jurado técnico quiere oír de un proyecto de primer nivel.
