# DEFENSA 5 MIN — ProGanado (canónico 11-nov-2026)

> Texto y contrato viven aquí (GitHub). PDF, PNG, ZIP y guías imprimibles viven en Escritorio, hub y Drive (Regla 29).
> Defensa: **14-nov-2026, ~5 minutos** + preguntas.

## Qué hay en esta carpeta

| Archivo | Uso |
|---|---|
| `00_LEEME_PRIMERO.md` | Reglas de oro, frases prohibidas y plan del día 14-nov. |
| `GUION_5_MIN_4_VOCES.md` | Texto exacto por voz y por slide, con tiempos. |
| `EVIDENCIA_Y_FUENTES.md` | Cada cifra del deck con el archivo de origen que la respalda. |
| `CONTRATO_DECK.json` | Reglas verificables por máquina (9 páginas, frases prohibidas, pie). Usado por `deck:audit`. |

## Dónde están los binarios

- Deck: `C:\Users\dev\Desktop\ENTREGAS\DECK_PROGANADO_V3_9_SLIDES.pdf`
- Slides PNG 2×: `C:\Users\dev\Desktop\ENTREGAS\slides_png\`
- Guías por integrante (PDF): hub `04_EXPOSICION_7_PASOS/07_DEFENSA_5MIN_V3/guias/` y Drive
- Respaldo íntegro del Escritorio (10-nov): `BACKUP_ENTREGAS_DESKTOP_20261110.zip` en `docs/sustentacion_2026/` (gitignoreado)

## Auditoría del deck (reproducible)

```powershell
node scripts\dev\audit_deck.js "C:\Users\dev\Desktop\ENTREGAS\DECK_PROGANADO_V3_9_SLIDES.pdf" --contrato "docs\sustentacion_2026\DEFENSA_5MIN_V3\CONTRATO_DECK.json"
```

Esperado: `9 páginas · pie en 8 slides · 0 frases prohibidas · contrato cumplido`.

## Regla de cambio

Si se toca una slide, se regeneran el guion y las 4 guías; el deck manda. Si una cifra no está en `EVIDENCIA_Y_FUENTES.md`, no se dice.
