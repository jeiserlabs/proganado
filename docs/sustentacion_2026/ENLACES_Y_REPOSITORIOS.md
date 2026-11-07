# ProGanado — Repositorios, hub y regla de trabajo

> Única fuente de verdad de rutas. Si un documento dice otra cosa, manda `SSOT_Y_TIMELINE.md`.
> Actualizado: 07-nov-2026.

## Enlaces oficiales

| Qué | Dónde | Para qué |
|---|---|---|
| Hub local | `C:\Users\dev\Documents\Proyectos_Y_Estudio\Entregables_CESDE_Y_Segaso\ProGanado` | Entregas, guías, deck, evidencias y archivo. |
| Carpeta de estudio (Drive) | https://drive.google.com/drive/folders/1_Ozo8XA7UjZPFWDf9WtDfhg5XgCmmKns | PDFs, PPTX, assets, ZIP y evidencias. |
| Repositorio del modelo y docs | https://github.com/jeiserlabs/proganado | DDL, TypeScript, Zod, PSeInt, tests y documentación. |
| Repositorio de la app de Emilio | https://github.com/eavillas1991-ctrl/proyecto-progadado | Origen del producto principal (MVP). El commit de auditoría 07-nov es local. |
| Referencia React 19 + Tailwind | https://github.com/jeiserlabs/proganado-producto-momento-2 | Referencia para la Fase 2.2; no es el producto actual. |
| Página React histórica | https://jeiserlabs.github.io/proganado-producto-momento-2/ | Escaparate; no es el MVP. |

## Rutas locales canónicas

| Proyecto | Ruta local | Repo |
|---|---|---|
| Modelo, DDL, TypeScript, Zod, tests, docs | `C:\PROYECTOS\Mis_Proyectos\ProGanado` | `jeiserlabs/proganado` |
| **Producto principal (MVP)** | `C:\PROYECTOS\Mis_Proyectos\ProGanado_M2` | `eavillas1991-ctrl/proyecto-progadado` (remoto original) |
| Copia canónica del MVP | Hub `03_PAGINAS_WEB_Y_DEMO_EN_VIVO/ProGanado_MVP/` | No es repo Git |
| Referencia React | `C:\PROYECTOS\Mis_Proyectos\ProGanado_Web` | `jeiserlabs/proganado-producto-momento-2` |

No existe otra copia de trabajo válida. La maqueta Bootstrap y la demo SQLite anterior están en el hub `_ARCHIVO_2026-11-07/web_variantes/`; no se usan como producto.

## Qué vive en cada lugar

| Tipo de archivo | Lugar | Motivo |
|---|---|---|
| Código, SQL, TS, Zod, PSeInt, HTML, tests | GitHub `proganado` | Versionado y revisable. |
| App principal (HTML/CSS/JS + Python + SQLite) | `ProGanado_M2` + copia en el hub | Producto que se ejecuta en la finca. |
| Documentos fuente `.md` y `.html` | GitHub `proganado` (`docs/sustentacion_2026/`) | Se editan y se versionan. |
| PDFs, PPTX, imágenes, videos, ZIP | Hub/Drive | Binarios fuera de Git (Regla 29). |
| Datos de la app (`proganado.sqlite3`, fotos) | `ProGanado_M2/datos/` (gitignoreado) | Dato operativo, no código. |

## Flujo obligatorio al terminar un cambio

1. **Local:** editar en la ruta canónica que corresponda.
2. **Verificar:** `npm run verify` en el repo del modelo; abrir la app si se tocó HTML/CSS/JS.
3. **GitHub:** commit + push al repo correcto (texto/código).
4. **Hub/Drive:** PDFs, PPTX, ZIP, capturas y evidencias.
5. **Timeline:** anotar el hito en `docs/sustentacion_2026/SSOT_Y_TIMELINE.md`.

## Reglas

- Un cambio de contenido va a GitHub y al hub/Drive en la misma sesión; no se deja “para luego”.
- No se crean carpetas nuevas de estudio en el Escritorio.
- No se suben binarios a GitHub ni secretos a ningún lado.
- Si un PDF se genera desde HTML, se re-renderiza; no se parchea a mano.
- La app principal es `ProGanado_M2`; React es referencia, no producto.
