Algoritmo ProGanado_Asistente_Logica_Maestro
    // =========================================================================
    // PROYECTO INTEGRADOR CESDE - NIVEL 1: PROGANADO
    // Algoritmos de Logica de Negocio en Pseudocodigo PSeInt
    // Autor: Emilio Villanueva / Jeiser Gutierrez (Tech Lead)
    // =========================================================================

    Definir opcion Como Entero
    opcion <- 0

    Mientras opcion <> 4 Hacer
        Limpiar Pantalla
        Escribir "================================================================"
        Escribir "           PROGANADO - LOGICA DE NEGOCIO Y CONTROL V3           "
        Escribir "================================================================"
        Escribir "1. Control de Inocuidad y Cinta Roja (Tiempo de Retiro ICA)"
        Escribir "2. Calculo de Dias Abiertos y Alerta de Reproduccion"
        Escribir "3. Liquidacion Estimada de Acopio Lechero y Bonificacion UFC"
        Escribir "4. Salir"
        Escribir "----------------------------------------------------------------"
        Escribir "Seleccione una opcion (1-4): "
        Leer opcion

        Segun opcion Hacer
            1:
                // -------------------------------------------------------------
                // MODULO 1: CONTROL DE INOCUIDAD Y CINTA ROJA (FAIL-CLOSED)
                // -------------------------------------------------------------
                Definir codigo_arete, nombre_farmaco Como Cadena
                Definir dias_retiro, dias_transcurridos Como Entero
                Definir dias_restantes Como Entero

                Escribir "--- 1. MODULO DE INOCUIDAD Y CINTA ROJA ---"
                Escribir "Ingrese el arete de la vaca: "
                Leer codigo_arete
                Escribir "Ingrese el nombre del medicamento administrado: "
                Leer nombre_farmaco
                Escribir "Ingrese los dias de retiro obligatorios segun rotulo ICA: "
                Leer dias_retiro
                Escribir "Ingrese los dias transcurridos desde la aplicacion: "
                Leer dias_transcurridos

                Si dias_transcurridos < dias_retiro Entonces
                    dias_restantes <- dias_retiro - dias_transcurridos
                    Escribir "----------------------------------------------------------------"
                    Escribir " [!] ALERTA CRITICA - CINTA ROJA ACTIVA PARA BOVINO: ", codigo_arete
                    Escribir " Medicamento: ", nombre_farmaco
                    Escribir " DICTAMEN: LECHE CONTAMINADA CON RESIDUOS DE ANTIBIOTICO."
                    Escribir " Dias restantes de cuarentena: ", dias_restantes, " dias."
                    Escribir " ACCION FAIL-CLOSED: BLOQUEAR INGRESO AL TANQUE DE ENFRIAMIENTO."
                    Escribir " Desviar produccion a descarte obligatorio para evitar sancion."
                    Escribir "----------------------------------------------------------------"
                SiNo
                    Escribir "----------------------------------------------------------------"
                    Escribir " [OK] BOVINO ", codigo_arete, " CON TIEMPO DE RETIRO CUMPLIDO."
                    Escribir " DICTAMEN: Leche 100% inocua y apta para entrega a planta acopiadora."
                    Escribir "----------------------------------------------------------------"
                FinSi
                Escribir "Presione enter para continuar..."
                Esperar Tecla

            2:
                // -------------------------------------------------------------
                // MODULO 2: CONTROL REPRODUCTIVO Y DIAS ABIERTOS (META <= 100)
                // -------------------------------------------------------------
                Definir dias_postparto Como Entero
                Definir estado_servicio Como Cadena

                Escribir "--- 2. MODULO DE EFICIENCIA REPRODUCTIVA ---"
                Escribir "Ingrese el codigo de arete del bovino hembra: "
                Leer codigo_arete
                Escribir "Ingrese los dias transcurridos desde el ultimo parto: "
                Leer dias_postparto
                Escribir "Esta la vaca ya servida/inseminada? (SI / NO): "
                Leer estado_servicio

                Escribir "----------------------------------------------------------------"
                Si Mayusculas(estado_servicio) = "SI" Entonces
                    Escribir "-> Bovino ", codigo_arete, " en seguimiento de gestacion. Programar palpacion ecografica a los 45 dias post-servicio."
                SiNo
                    Si dias_postparto <= 60 Entonces
                        Escribir "-> Bovino ", codigo_arete, " en Periodo de Espera Voluntario (PEV) (", dias_postparto, " dias). Recuperacion uterina normal."
                    SiNo
                        Si dias_postparto <= 100 Entonces
                            Escribir "-> VENTANA OPTIMA DE MONTA / I.A.: Vaca con ", dias_postparto, " dias abiertos. Monitorear celos AM-PM."
                        SiNo
                            Escribir " [!] ALERTA ECONOMICA: Bovino ", codigo_arete, " con ", dias_postparto, " dias abiertos."
                            Escribir " DICTAMEN: Anestro prolongado o falla reproductiva (>100 dias)."
                            Escribir " IMPACTO: Perdida de 1 ternero por ano e incremento de costo de sostenimiento."
                            Escribir " ACCION: Protocolo de sincronizacion hormonal veterinario IATF."
                        FinSi
                    FinSi
                FinSi
                Escribir "----------------------------------------------------------------"
                Escribir "Presione enter para continuar..."
                Esperar Tecla

            3:
                // -------------------------------------------------------------
                // MODULO 3: LIQUIDACION ESTIMADA DE ACOPIO LECHERO (COLANTA / UFC)
                // -------------------------------------------------------------
                Definir litros_quincena Como Real
                Definir precio_base_litro, recuento_ufc Como Real
                Definir bonificacion, precio_final_litro, total_pago Como Real

                Escribir "--- 3. LIQUIDACION ESTIMADA DE ENTREGA A PLANTA ACOPIADORA ---"
                Escribir "Ingrese el volumen total de litros entregados en la quincena: "
                Leer litros_quincena
                Escribir "Ingrese el precio base por litro pactado (COP): "
                Leer precio_base_litro
                Escribir "Ingrese el recuento de Unidades Formadoras de Colonia (UFC/ml): "
                Leer recuento_ufc

                // Tabla de calidad higienica segun estandar Colanta / Resolucion 017
                Si recuento_ufc < 50000 Entonces
                    bonificacion <- 120.0 // Bonificacion Clase A
                    Escribir "Calidad Higienica: EXCELENTE (UFC < 50.000). Bonificacion +120 COP/L."
                SiNo
                    Si recuento_ufc <= 175000 Entonces
                        bonificacion <- 50.0 // Bonificacion Clase B
                        Escribir "Calidad Higienica: BUENA (UFC 50.000 - 175.000). Bonificacion +50 COP/L."
                    SiNo
                        Si recuento_ufc <= 300000 Entonces
                            bonificacion <- 0.0 // Estandar sin bonificacion
                            Escribir "Calidad Higienica: ACEPTABLE (UFC 175.000 - 300.000). Sin bonificacion."
                        SiNo
                            bonificacion <- -150.0 // Penalizacion por alta carga bacteriana
                            Escribir " [!] ALERTA HIGIENICA: Deficiente (UFC > 300.000). Penalizacion -150 COP/L."
                        FinSi
                    FinSi
                FinSi

                precio_final_litro <- precio_base_litro + bonificacion
                total_pago <- litros_quincena * precio_final_litro

                Escribir "----------------------------------------------------------------"
                Escribir " RESUMEN DE LIQUIDACION PROGANADO:"
                Escribir " - Litros facturados: ", litros_quincena, " L"
                Escribir " - Precio base: ", precio_base_litro, " COP/L"
                Escribir " - Ajuste por calidad bacteriana: ", bonificacion, " COP/L"
                Escribir " - Precio neto por litro: ", precio_final_litro, " COP/L"
                Escribir " - TOTAL ESTIMADO A RECIBIR: ", total_pago, " COP"
                Escribir "----------------------------------------------------------------"
                Escribir "Presione enter para continuar..."
                Esperar Tecla

            4:
                Escribir "Cerrando modulo de logica ProGanado. Exitos en la operacion!"
            De Otro Modo:
                Escribir "Opcion no valida. Seleccione un numero entre 1 y 4."
                Esperar Tecla
        FinSegun
    FinMientras

FinAlgoritmo
