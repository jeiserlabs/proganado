Algoritmo Reparticion_Herencia_Roca_Piedra
	nombre_hijo1 = ""
	nombre_hijo2 = ""
	nombre_hijo3 = ""
	nombre_hijo4 = ""
	nombre_hijo5 = ""
	valor_herencia = 0
	monto_hijo1 = 0
	monto_hijo2 = 0
	monto_hijo3 = 0
	monto_hijo4 = 0
	monto_hijo5 = 0

	Escribir "Ingrese el valor de la herencia"
	Leer valor_herencia
	Escribir "Ingrese el nombre del hijo 1"
	Leer nombre_hijo1
	Escribir "Ingrese el nombre del hijo 2"
	Leer nombre_hijo2
	Escribir "Ingrese el nombre del hijo 3"
	Leer nombre_hijo3
	Escribir "Ingrese el nombre del hijo 4"
	Leer nombre_hijo4
	Escribir "Ingrese el nombre del hijo 5"
	Leer nombre_hijo5

	monto_hijo1 = valor_herencia * 0.30
	monto_hijo2 = valor_herencia * 0.20
	monto_hijo3 = valor_herencia * 0.25
	monto_hijo4 = valor_herencia * 0.15
	monto_hijo5 = valor_herencia * 0.10
	
	Escribir "Valor total de la herencia: ", valor_herencia
	Escribir "El Primer hijo cuyo nombre es: ", nombre_hijo1, " recibira la cantidad de ", monto_hijo1, " equivalente al 30%"
	Escribir "El Segundo hijo cuyo nombre es: ", nombre_hijo2, " recibira la cantidad de ", monto_hijo2, " equivalente al 20%"
	Escribir "El Tercer hijo cuyo nombre es: ", nombre_hijo3, " recibira la cantidad de ", monto_hijo3, " equivalente al 25%"
	Escribir "El Cuarto hijo cuyo nombre es: ", nombre_hijo4, " recibira la cantidad de ", monto_hijo4, " equivalente al 15%"
	Escribir "El Quinto hijo cuyo nombre es: ", nombre_hijo5, " recibira la cantidad de ", monto_hijo5, " equivalente al 10%"
FinAlgoritmo