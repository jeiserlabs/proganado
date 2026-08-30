# REQUERIMIENTOS DE SOFTWARE GANADERO (DOCUMENTO EMILIO) | CAVEMAN ULTRA

=== PAGINA 1 ===
Especificación de Requerimientos:
Software de Gestión Ganadera
Documento técnico basado en las directrices de manejo zootécnico y control del hato.
1. Funciones y Beneficios del Programa Ganadero
El software tiene como objetivo automatizar el control zootécnico y veterinario del ganado bovino, optimizando
la productividad y garantizando la trazabilidad de los procesos del hato. Las funciones principales identificadas
incluyen:
 Registro del Peso al Nacer: Monitoreo inicial para evaluar el desarrollo del ternero y la aptitud materna.
 Control de Tratamientos Veterinarios: Historial detallado de medicamentos, dosis y alertas de salud.
 Análisis de Edad y Ganancia de Peso: Cálculo automatizado de la edad de la vaca y el peso ganado
para determinar el momento óptimo del primer servicio técnico o monta.
 Registro del Primer Servicio y Confirmación de Preñez: Gestión del primer evento reproductivo y
seguimiento del estado gestacional.
2. Módulo de Gestión Reproductiva y Palpación
La reproducción es un pilar crítico. El sistema debe permitir el registro de datos obtenidos mediante exámenes
de palpación rectal o ecografías:
 Identificación de Estado: Confirmación visual y digital de si la vaca quedó preñada o si presenta un
diagnóstico negativo.
 Cálculo de Días de Preñez y Alertas de Aborto: Monitoreo del tiempo de gestación en días y registro
de incidencias de pérdida gestacional.
 Detección de Problemas Reproductivos: Diagnóstico de patologías uterinas u ováricas. Al detectar un
problema, el software activará una alerta de tratamiento protocolar por 5 días.
 Derivación a Monta Natural: Si tras el tratamiento persiste la dificultad, el sistema programará la
transferencia del animal a un lote de monta natural con el toro.
 Trazabilidad Reproductiva: Al confirmar una preñez, el sistema detallará los días exactos de gestación
y asociará el toro (padre) correspondiente a dicha preñez.
3. Módulo de Producción de Leche y Periodo de Secado
Para optimizar la curva de lactancia y cuidar la salud de la estructura mamaria, se estructuran las siguientes
reglas de negocio:
Página 1 de 2
Documento de Requerimientos - Software de Gestión Ganadera


=== PAGINA 2 ===
3.1 Protocolo de Secado de la Vaca
Al alcanzar los 210 días de preñez (aproximadamente 2 meses y medio antes del parto), la vaca debe entrar
obligatoriamente en periodo de secado. Este proceso garantiza:
 Descanso glandular y recuperación del tejido mamario.
 Recuperación física óptima para el siguiente parto.
 Suministro programado de concentrado alimenticio para alcanzar una excelente condición corporal al
momento del parto, permitiendo que tanto la vaca como el feto ganen peso de forma adecuada.
3.2 Cuidado del Ternero y Periodo de Calostro
 Nacimiento: Al nacer el ternero, se debe registrar el tratamiento inmediato del ombligo
(curación/desinfección).
 Suministro de Calostro: El sistema bloqueará el ingreso de la vaca al ordeño general durante los
primeros 4 días post-parto. Este periodo se reserva exclusivamente para que el ternero consuma el
calostro, asegurando la transferencia de anticuerpos y vitaminas indispensables.
 Ingreso a Ordeño: Cumplidos los 4 días de calostro, el software habilitará de forma automática a la
vaca para ingresar a la línea de ordeño comercial.
4. Alertas Sanitarias: Control de Antibióticos y Mastitis
El software debe priorizar la inocuidad alimentaria y la sanidad del hato mediante alertas estrictas:
 Identificación de Vacas con Antibióticos: El sistema bloqueará el registro de leche comercial de
cualquier vaca bajo tratamiento antibiótico. Su ordeño debe ser segregado (no se puede ordeñar junto a
las vacas sanas) y la leche obtenida debe marcarse como descarte (voto/eliminación).
 Prevención y Control de Mastitis: El software emitirá una alerta si se detecta un mal ordeño o un
sellado deficiente de los pezones (teta) post-ordeño, factores directos que desencadenan la mastitis.
 Reportes e Información del Programa: El sistema consolidará reportes ejecutivos que identifiquen:
    - Listado de vacas con diagnóstico activo de mastitis.
    - Listado de vacas en tratamientos veterinarios vigentes.
    - Listado de vacas con baja producción láctea para evaluación de descarte.
Página 2 de 2
Documento de Requerimientos - Software de Gestión Ganadera
