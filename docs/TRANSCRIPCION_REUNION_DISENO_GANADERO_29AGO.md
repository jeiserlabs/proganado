Reunión de Diseño del Sistema de Control Ganadero

Fecha: 29 Agosto 2026

──────────────────────────────────────────────────────────────────────

Reunión de Diseño del Sistema de Control Ganadero

1. Propósito y Objetivos de la Reunión

La reunión tuvo como objetivo principal definir y revisar el diseño conceptual del sistema de control ganadero, específicamente el modelo entidad-relación para la gestión de bovinos. El proyecto busca crear una herramienta sencilla, sólida, estable y escalable que pueda ser utilizada por asistentes administrativos en empresas ganaderas.

1.1. Problema Central a Resolver

El sistema debe abordar la complejidad del control ganadero, donde cada bovino requiere trazabilidad completa, similar al registro de un ser humano. Se identificaron los siguientes problemas específicos que la asistente administrativa necesita resolver:

Discrepancia en el estado de los animales: Existen vacas que aparecen como vivas en los registros físicos pero que en realidad están muertas.

Gestión de marcación: Control sobre la asignación de aretes, considerando que estos pueden reutilizarse cuando un animal muere.

Consolidación de información: Digitalización de la hoja de vida de cada bovino, incluyendo registro médico, estado reproductivo y peso.

Acceso a información en tiempo real: Permitir que el administrador consulte el estado actual de cualquier bovino (ej. si está en celo, embarazada, etc.) sin depender del capataz.

1.2. Usuario Principal

El núcleo del sistema es el asistente administrativo, quien será el encargado de digitalizar toda la información que los veterinarios y capataces registran en físico. Los veterinarios no tendrán acceso directo al sistema, ya que atienden múltiples fincas.

2. Discusión Técnica y Decisiones de Diseño

2.1. Entidad Principal: Bovino

Se acordó que la entidad principal del sistema será Bovino, trabajando inicialmente solo con esta especie para mantener el proyecto sencillo y escalable. Las decisiones clave sobre esta entidad fueron:

Identificador único: Se definió un ID bovino autoincremental como clave primaria interna del sistema, diferente del código de arete.

Código de arete: No será clave única porque los aretes se reutilizan. Cuando una vaca muere, su arete puede asignarse a un nuevo animal.

Atributos del bovino:

ID bovino (clave primaria)

Nombre

Fecha de nacimiento

Peso inicial

Estado (vivo/muerto)

2.2. Gestión de Marcación (Aretes)

Se diseñó una entidad separada para la marcación, que registra el historial completo de asignación de aretes:

Atributos de marcación:

ID de marcación (clave primaria)

ID bovino (clave foránea)

Fecha de marcación

Hora de marcación

Código de arete asignado

Ejemplo de funcionamiento: Si un bovino se compra el 29 de agosto y se marca el 30 de agosto con el arete 50 (que antes pertenecía a un animal fallecido), el sistema conserva ambos registros. Al consultar "¿quién tiene el arete 50?", el sistema mostrará el historial completo, indicando cuál bovino lo posee actualmente (el que esté vivo).

2.3. Tipo de Registro o Incorporación

Se definió que el formulario de registro de bovino debe incluir un campo para especificar el tipo de ingreso del animal:

Compra

Nacimiento en la finca

Arrendamiento (servicio de engorde)

Donación

"El mismo formulario va a alimentar las dos tablas" — el formulario de registro bovino alimentará tanto la tabla de bovino como la de tipo de registro simultáneamente.

2.4. Control de Ordeño

Se identificó la necesidad de registrar múltiples ordeños por bovino, con la siguiente estructura:

Entidad: Control de ordeño

Atributos:

ID de ordeño

ID de bovino (clave foránea)

Fecha de ordeño

Jornada (mañana, tarde, noche)

Hora (opcional)

Decisión importante: Se acordó utilizar jornada en lugar de hora específica, ya que el capataz que ordeña 50-100 vacas no registrará la hora exacta de cada animal. Las jornadas típicas son:

Mañana (4:00-4:30 AM)

Tarde (2:00 PM)

Noche (6:00 PM)

2.5. Ficha Médica y Estado Reproductivo

Se discutió la necesidad de gestionar estados cambiantes en los bovinos, particularmente el estado reproductivo:

Estados posibles: En celo, embarazada, no apta para reproducción, etc.

Propuesta de automatización: El sistema podría calcular automáticamente los ciclos de celo (cada 20 días aproximadamente) basándose en la fecha del último celo registrado, evitando que el usuario tenga que actualizar manualmente el estado de 500 vacas.

"El mismo sistema en celo no es en celo, porque yo no voy a estar ahí cambiando el punto a cada rato, 500 vacas"

2.6. Correcciones al Modelo Entidad-Relación

El facilitador señaló las siguientes mejoras necesarias en el diagrama presentado:

Formato del diagrama: Los atributos deben ir en óvalos, las entidades en rectángulos.

Notación correcta: Las claves primarias deben estar subrayadas, las claves foráneas con línea punteada.

Relaciones semánticas: Las frases que describen las relaciones deben ser claras (ej. "bovino registra un control de ordeño" en lugar de "bovino registra ordeño, control ordeño").

Entidad faltante: Se debe agregar la entidad Marcación al diagrama.

3. Decisiones Finales

Aspecto

Decisión

Alcance inicial

Solo bovinos (escalable a futuro)

Identificación

ID bovino autoincremental (interno) vs. código de arete (reutilizable)

Tipo de ingreso

Compra, nacimiento, arrendamiento, donación

Registro de ordeño

Por jornada (mañana/tarde/noche) en lugar de hora exacta

Estado reproductivo

Automatizable según ciclo biológico (20 días)

Usuario principal

Asistente administrativo (digitalización de registros físicos)

4. Acciones Pendientes

[ ] Equipo de desarrollo: Rediseñar el modelo entidad-relación siguiendo la notación correcta (atributos en óvalos, entidades en rectángulos, claves primarias subrayadas, claves foráneas punteadas).

[ ] Equipo de desarrollo: Agregar la entidad Marcación al diagrama.

[ ] Equipo de desarrollo: Incluir el atributo jornada en la entidad de control de ordeño.

[ ] Equipo de desarrollo: Evaluar la viabilidad técnica de automatizar el cálculo del estado reproductivo basado en ciclos biológicos.

[ ] Equipo de desarrollo: Realizar una entrevista estructurada con la asistente administrativa para identificar todos los problemas que necesita resolver el sistema.

[ ] Equipo de desarrollo: Presentar el modelo corregido para revisión en la próxima reunión.

5. Observaciones del Facilitador

El facilitador destacó que el sistema tiene un alto potencial comercial: "Uy, eso genera billete". Sin embargo, enfatizó la importancia de:

Mantener el enfoque en resolver los problemas reales del usuario final.

No sobrecargar el sistema con funcionalidades innecesarias en esta etapa.

Asegurar que el modelo entidad-relación esté correctamente diagramado antes de avanzar al desarrollo.