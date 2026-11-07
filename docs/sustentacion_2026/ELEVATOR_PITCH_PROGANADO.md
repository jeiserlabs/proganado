# ProGanado — elevator pitch (borrador para ensayar)

> **Uso:** pitch de 60 segundos para abrir una conversación; la defensa completa usa los 7 pasos del hub (`04_EXPOSICION_7_PASOS/`).
> **Regla:** todo lo que se dice aquí está verificado en el MVP, el DDL o el roadmap. No se promete nube, JWT ni multiusuario.

## Versión de 60 segundos (≈130 palabras)

> En una finca lechera, una vaca tratada con antibiótico puede contaminar un carrotanque entero de Colanta: entre **5 y 25 millones de pesos** en un solo error. Y cada día que una vaca pasa abierta después del parto cuesta alrededor de **35 mil pesos**.
>
> **ProGanado** es un software de gestión ganadera que bloquea la leche de un animal en retiro ICA, controla días abiertos, potreros PRV, producción y contabilidad. Hoy es un **MVP local que corre sin internet** en el PC de la finca, con login y 2FA, **8 módulos** y más de **100 animales de ejemplo**. El modelo son **12 tablas en tercera forma normal**, y el mismo dominio está probado en SQL Server y MongoDB.
>
> Cuesta **cero pesos en infraestructura** y puede crecer a la nube sin reescribir las reglas. Buscamos validarlo con fincas reales y convertirlo en el estándar de inocuidad de la leche en Antioquia.

## Versión de 30 segundos

> ProGanado evita que una vaca en tratamiento con antibiótico contamine la leche de toda una finca. Es un MVP local, sin internet y sin costo de servidores, con login, 2FA y ocho módulos; el modelo son 12 tablas en 3FN y las reglas de inocuidad están probadas en SQL, TypeScript, PSeInt, SQL Server y MongoDB. Buscamos fincas para validarlo y escalarlo a la nube.

## Mapa con los 7 pasos de la defensa

| Paso | Idea que cubre el pitch | Evidencia |
|---|---|---|
| 1. Problema | Contaminación de leche y días abiertos | Pérdida estimada 5M–25M COP por evento; 35k COP/día abierto |
| 2. Solución | Bloqueo de leche en retiro + control integral | Regla fail-closed en SQL/TS/PSeInt |
| 3. Arquitectura | Local-first, sin internet, 0 costo | Python 3 + SQLite + HTML/CSS/JS |
| 4. Modelo de datos | 12 tablas 3FN + 5 colecciones NoSQL | DDL, 7 índices, 1 vista; 10 consultas T-SQL |
| 5. Demo | Login, 2FA y 8 módulos | 0 errores de consola; 0 overflow 390/768/1440 |
| 6. Escalabilidad | API de servidor → React/PWA → nube | Roadmap verificado 07-nov-2026 |
| 7. Cierre | Validar con fincas y estandarizar inocuidad | Plan Pro 119k COP/mes; Free 0 |

## Preguntas de un inversionista o jurado (respuestas cortas)

| Pregunta | Respuesta |
|---|---|
| ¿Es un SaaS en producción? | No. Es un MVP local con datos de ejemplo y un roadmap explícito; la nube es Fase 3. |
| ¿Dónde está la IA? | No hay IA en el núcleo. La regla de inocuidad es determinista: si el animal está en retiro, la leche se bloquea. La IA no debe decidir eso. |
| ¿Cómo evita la contaminación? | Con la regla fail-closed: el último día de retiro sigue bloqueado; se libera al siguiente. Está probada en SQL, TypeScript y PSeInt. |
| ¿Qué pasa si no hay internet? | El MVP funciona en el PC de la finca, sin internet. Es una decisión de diseño, no una limitación temporal. |
| ¿Cómo escala? | Fase 2.1: API de servidor y auth real; Fase 2.2: React + PWA; Fase 3: PostgreSQL en la nube. El dominio y el modelo no cambian. |
| ¿Quién paga? | Plan Free 0 y Pro 119k COP/mes por finca; Multi-Predio 299k COP/mes. El MVP actual no cobra: es validación. |
| ¿Qué falta? | Autenticación de servidor, RBAC, respaldo automático y refactor React. Está declarado en el roadmap. |
| ¿Por qué no React ahora? | La app vanilla es más simple de ejecutar en una finca y cumple la rúbrica; React es la Fase 2.2, no el producto actual. |
| ¿Cómo se que no es solo una maqueta? | El MVP tiene login/2FA, CRUD, persistencia SQLite, CSV, reporte PDF y ocho módulos; la auditoría del 07-nov está en el hub y en el README. |

## Cómo decirlo (entrega)

- **Primera frase:** el dolor concreto (contaminación de un carrotanque), no la historia de la empresa.
- **Segunda frase:** qué hace ProGanado y para quién.
- **Tercera frase:** la prueba (MVP local, 8 módulos, 12 tablas, 0 costo).
- **Cierre:** la pregunta o el siguiente paso (“buscamos 3 fincas piloto”), no un “gracias”.
- **Tono:** tranquilo, sin superlativos. Los números hacen el trabajo.
- **No decir:** “JWT”, “nube”, “multiusuario”, “IA” o “en producción” si no está en el roadmap como fase futura.

## Ensayo

1. Leer la versión de 60 s en voz alta y cronometrar.
2. Grabarse; si una frase no se entiende sin el código, reescribirla.
3. Ensayar la versión de 30 s para cuando el jurado diga “resúmelo”.
4. Practicar las tres preguntas más duras: ¿es un SaaS?, ¿dónde está la IA?, ¿qué falta?
