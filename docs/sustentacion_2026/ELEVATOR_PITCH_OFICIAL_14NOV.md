# ProGanado S.A.S. — Elevator Pitch Oficial (Sustentación 14-Nov-2026)

> **Destino:** Sustentación Proyecto Integrador · Escuela de Nuevas Tecnologías · CESDE Medellín  
> **Fecha:** Sábado 14 de Noviembre de 2026  
> **Equipo:** Jeiser Gutiérrez (Tech Lead / Datos) · Sebastián Correa (Frontend) · Emilio Villanueva (Lógica/Zootecnia) · Humberto Pinto (Sanidad/Problema)  
> **Stack Real:** HTML5 / CSS3 / JS Vanilla · Servidor Local Python 3 (127.0.0.1:8899) · SQLite local · DDL 12 tablas 3FN · MongoDB 5 colecciones (M3)

---

## 1. Versión Relámpago de 60 Segundos (Apertura / Concurso)
*Tiempo estimado: 55 a 65 segundos. 135 palabras a cadencia controlada (130 palabras/minuto).*

> "En Colombia, un descuido en una libreta de ordeño puede quebrar una finca en una mañana. Si una vaca tratada con antibiótico se ordeña por error, los residuos contaminan un carrotanque entero de acopio: hablamos de una pérdida estimada de entre **5 y 25 millones de pesos** por lote descartado. Además, cada día que una vaca pasa vacía después de los cien días cuesta alrededor de **20 mil pesos** en comida sin retorno.
>
> Para erradicar este problema creamos **ProGanado**: una plataforma de gestión ganadera local-first diseñada para el operario en el potrero.
>
> Su regla central es determinista: el algoritmo **Cinta Roja** bloquea la leche de cualquier animal en retiro sanitario hasta que se cumpla el plazo del ICA; el mayordomo no puede desactivar esa alerta.
>
> Hoy presentamos un **MVP completamente funcional**: corre sin internet, con autenticación, segundo factor de seis dígitos, ocho módulos de gestión y persistencia en SQLite. El modelo relacional tiene **doce tablas en tercera forma normal** y está validado en SQL Server y MongoDB.
>
> Cuesta **cero pesos en infraestructura** y tiene una ruta clara hacia la nube. Buscamos tres fincas piloto para validarlo en campo."

---

## 2. Versión de 90 Segundos (Pitch de Apertura Frente a Jurado de Software)
*Tiempo estimado: 85 a 90 segundos. 195 palabras. Ideal si el jurado pide: "Expliquen el proyecto antes de mostrar las diapositivas".*

> "Buenos días. Somos el equipo de **ProGanado**: Humberto Pinto, Emilio Villanueva, Sebastián Correa y Jeiser Gutiérrez.
>
> El negocio lechero en Antioquia tiene un cuello de botella crítico: la pérdida de información en el establo. Los aretes se caen, las fechas de retiro sanitario se anotan en papel húmedo y los días abiertos se descubren meses tarde. Un solo litro con antibiótico en el tanque comunal arruina hasta cinco mil litros de leche, generando sanciones de **5M a 25M COP** por evento.
>
> **ProGanado** resuelve esto mediante ingeniería determinista:
>
> 1. **Inocuidad garantizada:** La regla de **Cinta Roja** calcula fecha de tratamiento más días de retiro y bloquea la venta de forma estricta. El último día sigue bloqueado; solo se libera al día siguiente.
> 2. **Arquitectura local-first:** Cero dependencias externas. Funciona en el navegador con HTML5, CSS y JavaScript nativo, conectado a un servidor local en Python 3 y base de datos SQLite. Si no hay red, opera con almacenamiento local y sincroniza al reconectar.
> 3. **Rigor de datos:** Diseñamos un modelo relacional de **doce tablas en 3FN** con integridad referencial estricta, y lo migramos a **cinco colecciones documentales en MongoDB** para lectura rápida del animal.
>
> El sistema cuenta con login, 2FA, ocho módulos operativos y datos de prueba con ciento dieciséis bovinos. ProGanado demuestra que una pequeña finca puede tener la trazabilidad de una multinacional, con cero costo de servidores."

---

## 3. Matriz de los 7 Pasos (Para la Exposición con el Deck)

Si la presentación se realiza alternando oradores según el Deck oficial de 7 diapositivas (`Desktop/ENTREGAS/04_EXPOSICION_7_PASOS/DECK_7_PASOS_PROGANADO.pdf`), este es el guion exacto de enlace:

| Paso | Orador | Tiempo | Frase Clave de Entrada | Dato Duro Innegociable | Transición |
|---|---|---|---|---|---|
| **1. Problema** | Humberto Pinto | 1:30 min | *"En el campo el dato se pierde antes de llegar al tanque."* | 5M–25M COP por tanque contaminado; ~20k COP/día abierto. | *"Emilio les muestra la solución."* |
| **2. Solución** | Emilio Villanueva | 1:30 min | *"ProGanado es la hoja de vida digital del bovino."* | 8 módulos, 2FA, algoritmo Cinta Roja determinista. | *"Jeiser explica la arquitectura interna."* |
| **3. Arquitectura** | Jeiser Gutiérrez | 1:30 min | *"Cliente-servidor local: navegador + Python + SQLite."* | 127.0.0.1:8899, API JSON, PBKDF2 (150k iteraciones), sin frameworks. | *"Esa arquitectura soporta nuestro modelo de datos."* |
| **4. Modelo de Datos** | Jeiser Gutiérrez | 2:00 min | *"12 tablas normalizadas en 3FN y 5 colecciones NoSQL."* | RESTRICT en historia clínica, CASCADE en dependientes, embedding vs referencing. | *"Sebastián muestra el sistema en vivo."* |
| **5. Demo / Frontend** | Sebastián Correa | 3:00 min | *"Página principal con 116 animales y 7 módulos internos."* | Responsive 390/768/1440 px, CRUD, cinta roja visual, exportación CSV/PDF. | *"Jeiser cierra con la escalabilidad."* |
| **6. Escalabilidad** | Jeiser Gutiérrez | 1:00 min | *"De una finca a 500 predios: la ruta de crecimiento."* | Nivel 1 MVP local -> Nivel 2 API PostgreSQL -> Nivel 3 PWA -> Nivel 4 Nube SaaS. | *"Humberto cierra con las conclusiones."* |
| **7. Cierre** | Humberto Pinto + Equipo | 1:00 min | *"Inocuidad, eficiencia y rigor de ingeniería."* | Regla determinista, app local funcional, cero costo de nube hoy. | *"Quedamos atentos a sus preguntas."* |

---

## 4. Respuestas Rápidas para Ronda de Preguntas Técnicas (Q&A)

### Jurado de Software / Arquitectura:
- **¿Por qué Python estándar y no Node o Django?**  
  *Respuesta:* "Para el MVP local en finca buscamos cero dependencias de instalación y portabilidad total en Windows sin node_modules pesados. La fase 2 contempla Node/Express o FastAPI con PostgreSQL para concurrencia."
- **¿El MVP usa las 12 tablas físicas en SQLite?**  
  *Respuesta:* "El MVP operativo guarda las entidades como estructuras JSON en una tabla clave-valor de SQLite para máxima agilidad local. El DDL de 12 tablas en 3FN es el modelo formal de la asignatura y la base de la migración a PostgreSQL."
- **¿Por qué no usaron React en el frontend?**  
  *Respuesta:* "La rúbrica del Momento 2 evaluaba dominio profundo de HTML5 semántico, CSS3 nativo, Grid, Flexbox y responsive design. React está proyectado en la Fase 2 como PWA para trabajo sin conexión en potrero."

### Jurado de Bases de Datos:
- **¿Cómo evitan la pérdida del historial si el arete se cae?**  
  *Respuesta:* "La tabla `bovinos` tiene un identificador primario inmutable independiente del plástico. Los aretes viven en la tabla `marcaciones` con relación uno a muchos; si el arete se pierde, se registra el nuevo sin alterar el historial médico."
- **¿Cuál es la diferencia entre el modelo relacional y el de MongoDB?**  
  *Respuesta:* "En relacional normalizamos a 12 tablas para garantizar integridad referencial estricta. En MongoDB agrupamos en 5 colecciones aplicando embedding en aretes, tratamientos y pesajes para leer la ficha completa del animal en una sola consulta."

---

## 5. Reglas de Blindaje Verbal (Cosas Prohibidas en el Escenario)
1. ❌ **NO decir "Dr. Héctor":** El compañero de equipo es **Humberto Pinto**.
2. ❌ **NO decir "React" o "Bootstrap" como tecnología del producto final:** La aplicación entregada es **HTML/CSS/JS nativo**.
3. ❌ **NO decir "los 116 aretes son reales":** Son **datos de prueba / simulación** para demostrar el funcionamiento del sistema.
4. ❌ **NO decir "está en la nube / AWS":** Es un **MVP local-first**; la nube es hoja de ruta.
5. ❌ **NO decir "medición de campo verificada":** Las cifras de 5M–25M COP y 20k COP/día son **estimaciones de modelado económico**.
