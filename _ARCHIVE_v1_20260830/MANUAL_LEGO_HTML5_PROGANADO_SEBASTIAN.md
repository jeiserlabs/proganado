# MANUAL DE CONSTRUCCION LEGO EN HTML5: PROGANADO (PARA SEBASTIAN)

[OBJETIVO] Guia paso a paso tipo 'bloques de LEGO' para maquetar la web de ProGanado usando HTML5 semantico puro (Nivel 1 CESDE: tablas, listas, formularios, secciones y multimedia) con total libertad creativa para tu talento de disenador.

---

## 1. LA FILOSOFIA LEGO: COMO SE ARMA UNA PAGINA WEB
Una pagina web no es un revoltijo de etiquetas; es una casa armada con bloques de LEGO bien organizados:

```text
┌────────────────────────────────────────────────────────────────────────┐
│ 1. <header> (El Techo): Logo de ProGanado + Titulo del Sistema        │
├────────────────────────────────────────────────────────────────────────┤
│ 2. <nav> (Los Pasillos): Menu de navegacion (Inicio, Ordeño, Bovinos) │
├──────────────────────────┬─────────────────────────────────────────────┤
│ 3. <aside> (El Casillero):│ 4. <main> (La Sala Principal):              │
│    • Resumen del Hato    │    • <section id="kpis"> (Tarjetas)         │
│      (163 / 210 Animales)│    • <section id="ordeno"> (Tabla Semanal)  │
│    • Alertas de Cinta    │    • <section id="registro"> (Formulario)   │
│      Roja y Celos        │                                             │
├──────────────────────────┴─────────────────────────────────────────────┤
│ 5. <footer> (Los Cimientos): Equipo CESDE + Fecha + Derechos           │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. PIEZA POR PIEZA: LAS 7 PIEZAS DE LEGO EN HTML5

### PIEZA 1: El Chasis (`<!DOCTYPE html>`, `<head>`, `<body>`)
El bloque base donde se coloca el titulo de la pestana y el idioma.

### PIEZA 2: El Techo (`<header>` y `<nav>`)
Aqui va el logo de ProGanado, el nombre del sistema y los enlaces de navegacion usando listas `<ul>` y `<li>`.
* *Ejemplo:*
  ```html
  <header>
      <img src="logo_proganado.png" alt="Logo ProGanado" width="60" height="60">
      <h1>ProGanado — Control Lechero y Gestion de Hato</h1>
      <nav>
          <ul>
              <li><a href="#kpis">Panel General</a></li>
              <li><a href="#ordeno">Pesaje de Leche</a></li>
              <li><a href="#registro">Registrar Bovino</a></li>
          </ul>
      </nav>
  </header>
  ```

### PIEZA 3: La Sala Principal (`<main>` y `<section>`)
Dentro de `<main>` separamos cada area funcional con `<section>`. Cada seccion lleva su propio `<h2>` explicativo.

### PIEZA 4: Las Tablas Maestras (`<table>`, `<caption>`, `<thead>`, `rowspan`, `colspan`)
Aqui aplicas exactamente el taller que ya dominas para armar la **Planilla de Pesaje Semanal**:
* `<caption>`: Titulo de la tabla (*PESAJE DE LECHE SEMANAL*).
* `<thead>`: Encabezados con `<th>` (`Arete Vaca`, `Ordeño AM`, `Ordeño PM`, `Total Día`, `Estado / Alerta`).
* `rowspan`: Para agrupar vacas por lote o por estado.
* `colspan`: Para subtotales o resumen del lote.

### PIEZA 5: La Barra Lateral de Resumen (`<aside>`)
Un bloque lateral para mostrar la capacidad de la finca:
* **Capacidad Maxima:** `210 Animales`
* **Inventario Actual:** `163 Animales` (Lote activo)
* **Alertas Rapidas:** `2 Vacas con Cinta Roja (Balde)`.

### PIEZA 6: Los Formularios de Entrada (`<form>`, `<input>`, `<select>`)
Para que la asistente digite nuevos partos, aretes o tratamientos de urgencia.
* Usa `<label>`, `<input type="text">`, `<input type="number">`, `<input type="date">`, `<select>` y `<button type="submit">`.

### PIEZA 7: Multimedia (`<img>`, `<audio>`, `<video>`)
Para enriquecer la interfaz con fotos de vacas, diagramas o notas de voz:
* `<img src="vaca_holstein.jpg" alt="Vaca 972" width="200">`
* `<audio controls src="nota_veterinario.mp3"></audio>` (Para audios de WhatsApp del veterinario).

---

## 3. EL RETO DE MAQUETACION: LA TABLA DE PESAJE REAL (163 ANIMALES)
Sebastian, toma los datos reales de la planilla de la finca y armala en una tabla HTML5 limpia:

| VACA / ARETE | ORDEÑO AM (L) | ORDEÑO PM (L) | TOTAL DÍA (L) | ESTADO / MANEJO |
|:---:|:---:|:---:|:---:|:---:|
| **972** | 12.9 | 9.0 | **21.9 L** | 🟡 Alta Produccion (Extra concentrado) |
| **884** | 13.0 | 6.0 | **19.0 L** | 🟡 Alta Produccion |
| **051** | 8.4 | 4.0 | **12.4 L** | ⚪ Produccion Estandar |
| **893** | 8.0 | 2.0 | **10.0 L** | 🎀 CINTA ROJA (Ordeño en Balde) |

¡Tienes total libertad para estructurar, organizar los bloques y demostrar tu talento de disenador!
