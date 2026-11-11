# ProGanado — Guion oficial 5:00 · 4 voces

> **Regla:** el deck muestra; este guion se dice. Cada bloque está pegado a una slide.
> Ensayar con cronómetro. Si el jurado aprieta, recortar la slide 5 (doce tablas) a una frase;
> **nunca** recortar la cinta roja (slide 4) ni el cierre.

| Tiempo | Voz | Slides | Idea que debe quedar |
|---|---|---|---|
| 0:00–0:40 | Emilio | 1–2 | El dato vive en una libreta; la app va al potrero |
| 0:40–1:15 | Sebastián | 3 | Esto ya corre; no es un mockup |
| 1:15–2:05 | Humberto | 4 | La cinta roja bloquea, no avisa |
| 2:05–3:20 | Jeiser | 5–6 | 12 tablas 3FN y 10 consultas T-SQL con salida real |
| 3:20–4:00 | Jeiser | 7 | Local-first: el potrero no espera a la nube |
| 4:00–4:40 | Emilio | 8 | Cero clientes pagos; 3–5 fincas para equilibrio |
| 4:40–5:00 | Todos | 9 | Tres pilotos y un año para demostrarlo |

---

## 0:00–0:40 · Emilio · Slides 1 y 2

> "Buenos días. Somos ProGanado: Emilio Villanueva, Humberto Pinto, Sebastián Correa y Jeiser Gutiérrez. En una finca lechera, el dato que decide si la leche se vende vive en una libreta que se moja. El mayordomo anota el ordeño, el tratamiento y la fecha de parto; si se equivoca, la vaca se ordeña antes de tiempo y el tanque se contamina. No es falta de información: es información que llega tarde. Por eso ProGanado es una app para el potrero: una mano, tres toques y cero internet."

## 0:40–1:15 · Sebastián · Slide 3

> "Y esto no es un mockup: ya corre. Son ocho módulos, login local y registro de campo, en HTML, CSS y JavaScript puro. Lo auditamos en navegador a 390, 768 y 1440 píxeles: cero errores de consola y cero desbordes. A la izquierda ven el panel real; a la derecha, el login en el teléfono. Los 116 animales son datos de demostración, no clientes: la app existe, la tracción todavía no."

## 1:15–2:05 · Humberto · Slide 4

> "Soy Humberto Pinto, asesor clínico. Cuando una vaca recibe un antibiótico, su leche tiene un período de retiro del ICA. Si se ordeña antes, contamina el tanque: estimamos entre 5 y 25 millones de pesos por lote, más la sanción de la cooperativa. Y cada día abierto de una vaca sin preñar cuesta unos 20 mil pesos en comida. Por eso la cinta roja no es un aviso que se pueda cerrar: el sistema calcula la fecha con el retiro del fármaco y bloquea el pesaje. La duda no se resuelve a favor del ordeño."

## 2:05–3:20 · Jeiser · Slides 5 y 6

> "Soy Jeiser, arquitectura y base de datos. El modelo académico son doce tablas en tercera forma normal: finca, hato, sanidad y operación, con cinco índices, una vista de cinta roja y llaves foráneas con RESTRICT, CASCADE y SET NULL. Aclaro el alcance: el MVP guarda su estado en SQLite; migrar la app a este modelo es la Fase 2, no una promesa de hoy. Sobre ese modelo escribimos diez consultas T-SQL. La seis es la que importa: con DATEADD y GETDATE calcula la fecha de fin de retiro y devuelve las vacas bloqueadas. La salida son dos filas reales: Mariposa con Ceftiofur hasta el nueve de noviembre, y Mora con Oxitetraciclina hasta el once. Eso no es una diapositiva bonita: es una consulta que se ejecutó y devolvió eso."

## 3:20–4:00 · Jeiser · Slide 7

> "Por dentro, ProGanado es local-first. El mayordomo usa el navegador; un servidor local en Python estándar escucha en 127.0.0.1, puerto 8899; y SQLite guarda con escritura atómica. La interfaz pesa 54 kilobytes comprimida y no hace peticiones externas. Una finca con internet intermitente no puede depender de la nube para registrar un ordeño. La nube es Fase 3; primero están la API con autenticación de servidor y el respaldo diario verificado."

## 4:00–4:40 · Emilio · Slide 8

> "En negocio, preferimos un número pequeño y verdadero. Hoy tenemos cero clientes pagos. El punto de equilibrio de caja llega con tres a cinco fincas pagas; un sueldo modesto de fundador, con unas 135 fincas activas. El plan es Free, Pro a 119k COP/mes y Multi a 299k COP/mes. No venimos a prometer cinco mil fincas: buscamos tres fincas piloto para medir activación, retención y disposición a pagar."

## 4:40–5:00 · Todos · Slide 9

> "ProGanado no pide que le crean: pide tres fincas reales, un tablero de métricas y un año para demostrarlo. El modelo, las diez consultas y la app están en github.com/jeiserlabs/proganado. Gracias; quedamos atentos a sus preguntas."

---

## Reglas de escena

1. **No leer la pantalla.** Cada uno memoriza su bloque; el deck es apoyo.
2. **Pausa después de los números duros:** 5M–25M COP · 20k COP/día · 12 tablas · 54 KB · 0 clientes.
3. **Nunca decir:** "React está en el MVP", "Astro", "MongoDB", "Compass", "estamos en la nube", "5.000 fincas", "Zero Data Loss", "medimos en campo", "soy veterinario".
4. **Si preguntan por la app y las 12 tablas:** la respuesta está en la guía de Jeiser, sección "La pregunta que puede hundirnos".
5. **Si se cae la demo:** el deck tiene las capturas reales. Continuar con la slide 3 y seguir.
6. **Cierre:** el enlace se dice una sola vez; no se pide plata, se piden tres pilotos.
