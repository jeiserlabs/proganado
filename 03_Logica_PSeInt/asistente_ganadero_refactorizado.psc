Algoritmo Asistente_Ganadero_GanadoControl
    // =========================================================================
    // PROYECTO INTEGRADOR CESDE - NIVEL 1: GANADOCONTROL
    // Lógica en Pseudocódigo PSeInt: Validaciones, Sanidad y Cálculo de Dosis
    // =========================================================================
    
    Definir opcion Como Entero
    Definir peso, dosis Como Real
    Definir dias_retiro Como Entero
    Definir en_tratamiento Como Logico
    Definir arete, nombre, estado_reprod Como Cadena
    
    opcion <- 0
    
    Mientras opcion <> 4 Hacer
        Limpiar Pantalla
        Escribir "======================================================"
        Escribir "       🐄 GANADOCONTROL - ASISTENTE GANADERO MICRO    "
        Escribir "======================================================"
        Escribir "1. Validar Estado Reproductivo y Aptitud de Ordeño"
        Escribir "2. Calcular Dosis de Purgante / Desparasitante"
        Escribir "3. Dictamen Sanitario de Retiro de Leche"
        Escribir "4. Salir"
        Escribir "Seleccione una opción (1-4): "
        Leer opcion
        
        Segun opcion Hacer
            1:
                Escribir "--- 1. Validación de Estado Reproductivo ---"
                Escribir "Ingrese el código de arete: "
                Leer arete
                Escribir "Ingrese el estado (Vacia / Inseminada / Gestante / Lactancia / Seca / Toro): "
                Leer estado_reprod
                
                Si estado_reprod = "Lactancia" Entonces
                    Escribir "-> DICTAMEN: Bovino ", arete, " está en producción activa. Apta para ordeño matutino/vespertino."
                SiNo
                    Si estado_reprod = "Seca" O estado_reprod = "Gestante" Entonces
                        Escribir "-> DICTAMEN: Bovino ", arete, " está en periodo de descanso/gestación. NO debe ingresar a sala de ordeño."
                    SiNo
                        Escribir "-> DICTAMEN: Bovino ", arete, " registrado en estado: ", estado_reprod, "."
                    FinSi
                FinSi
                Escribir "Presione enter para continuar..."
                Esperar Tecla
                
            2:
                Escribir "--- 2. Cálculo de Dosis de Antiparasitario ---"
                Escribir "Ingrese el peso del animal en Kg: "
                Leer peso
                
                Si peso <= 0 Entonces
                    Escribir "ERROR: El peso debe ser mayor a 0 kg."
                SiNo
                    // Regla zootécnica: 1 ml por cada 50 kg de peso vivo
                    dosis <- peso / 50.0
                    Escribir "-> DOSIS RECOMENDADA: Aplicar ", dosis, " ml de antiparasitario por vía subcutánea/oral."
                FinSi
                Escribir "Presione enter para continuar..."
                Esperar Tecla
                
            3:
                Escribir "--- 3. Control de Retiro Sanitario de Leche ---"
                Escribir "¿La vaca recibió antibiótico recientemente? (1: Si, 2: No): "
                Leer opcion
                
                Si opcion = 1 Entonces
                    Escribir "Ingrese los días de tiempo de retiro del medicamento: "
                    Leer dias_retiro
                    Escribir "-> ALERTA CRÍTICA: Leche NO APTA para consumo humano ni venta durante ", dias_retiro, " días."
                    Escribir "-> ACCIÓN: Desviar leche a descarte o alimentación restringida."
                SiNo
                    Escribir "-> ESTADO SANITARIO: Leche 100% APTA para venta e industrialización."
                FinSi
                Escribir "Presione enter para continuar..."
                Esperar Tecla
                
            4:
                Escribir "Saliendo del Asistente Ganadero. ¡Buen día!"
            De Otro Modo:
                Escribir "Opción inválida. Intente de nuevo."
                Esperar Tecla
        FinSegun
    FinMientras

FinAlgoritmo
