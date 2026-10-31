# ProGanado — Repositorios, Drive y regla de trabajo

> Única fuente de verdad de rutas. Si un documento dice otra cosa, manda este archivo.
> Actualizado: 31-oct-2026.

## Enlaces oficiales

| Qué | Dónde | Para qué |
|---|---|---|
| Carpeta de estudio (Drive) | https://drive.google.com/drive/folders/1_Ozo8XA7UjZPFWDf9WtDfhg5XgCmmKns | PDFs, PPTX, assets, ZIP y evidencias. |
| Repositorio de código | https://github.com/jeiserlabs/proganado | DDL, TypeScript, Zod, PSeInt, HTML5, tests y docs. |
| Repositorio de la página | https://github.com/jeiserlabs/proganado-producto-momento-2 | Maqueta Bootstrap y GitHub Pages. |
| Página en vivo | https://jeiserlabs.github.io/proganado-producto-momento-2/ | Demo visual para el jurado. |
| Repo de la página IA de Emilio | https://github.com/eavillas1991-ctrl/proyecto-progadado | Referencia externa, no es la entrega oficial. |

## Rutas locales canónicas

| Proyecto | Ruta local | Repo |
|---|---|---|
| ProGanado (código y docs) | `C:\PROYECTOS\Mis_Proyectos\ProGanado` | `jeiserlabs/proganado` |
| Página web | `C:\PROYECTOS\Mis_Proyectos\ProGanado_Web` | `jeiserlabs/proganado-producto-momento-2` |

No existe otra copia de trabajo válida. Las carpetas `Proganado`, `Proganado_Material_Estudio`, `MOMENTO2_PROGANADO` y `_BACKUP_PROGANADO_GEMINI_*` del Escritorio quedaron retiradas el 31-oct-2026.

## Qué vive en cada lugar

| Tipo de archivo | Lugar | Motivo |
|---|---|---|
| Código, SQL, TS, Zod, PSeInt, HTML, tests | GitHub `proganado` | Versionado y revisable. |
| Documentos fuente `.md` y `.html` | GitHub `proganado` (`docs/sustentacion_2026/`) | Se editan y se versionan. |
| PDFs, PPTX, imágenes, videos, ZIP | Drive | Binarios fuera de Git (Regla 29). |
| Página publicada | GitHub Pages | URL estable para el jurado. |

## Flujo obligatorio al terminar un cambio

1. **Local:** editar en `C:\PROYECTOS\Mis_Proyectos\ProGanado` (código/docs) o en la copia de trabajo de la página.
2. **Verificar:** `npm run verify` en el repo de código; abrir la página en el navegador si se tocó HTML.
3. **GitHub:** commit + push al repo que corresponda.
4. **Drive:** subir el PDF/PPTX/ZIP actualizado a esta carpeta y verificar tamaño/md5.
5. **Timeline:** anotar el hito en `docs/sustentacion_2026/SSOT_Y_TIMELINE.md` del repo.

## Reglas

- Un cambio de contenido va a GitHub y a Drive en la misma sesión; no se deja “para luego”.
- No se crean carpetas nuevas de estudio en el Escritorio.
- No se suben binarios a GitHub ni secretos a ningún lado.
- Si un PDF se genera desde HTML, se re-renderiza; no se parchea a mano.
