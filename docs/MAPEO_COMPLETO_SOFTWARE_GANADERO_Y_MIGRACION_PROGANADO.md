# MAPEO INTEGRAL DE "SOFTWARE GANADERO SG" Y ESTRATEGIA DE MIGRACION A PROGANADO

[DOCUMENTO MAESTRO DE INGENIERIA Y PRODUCTO] Desglose exhaustivo de las funciones, modulos, estructuras de datos y reportes del software tradicional "El Ganadero SG", junto con el diseno del Hub Central de la Asistente Administrativa y el motor de importacion para migracion en 1 clic.

---

## 1. EL PATRON ARQUITECTONICO: "ESPIRAL EN TORNO AL ASISTENTE" (RURAL FIRST)

### La Realidad de la Conectividad en el Campo Colombiano:
En las veredas del Norte de Antioquia y la sabana lechera, la senal celular en los potreros es inestable o nula. Pretender que 3 ordeñadores a las 4:00 AM usen una app web compleja en la sala de ordeño es inviable.

### El Diseno en Espiral (Asistente como Hub Central):
```text
                          ┌──────────────────────────┐
                          │   CAMPO (Sin Red / Off)  │
                          │ • Planilla fisica leche  │
                          │ • Cinta Roja fisica ubre │
                          │ • Parche Estrotect cola  │
                          └─────────────┬────────────┘
                                        │ (Mensajes WhatsApp + Planilla Papel)
                                        ▼
                   ╔═════════════════════════════════════════╗
                   ║      ASISTENTE ADMINISTRATIVA           ║
                   ║           (EL HUB CENTRAL)              ║
                   ║                                         ║
                   ║   [ PROGANADO — SISTEMA DE INGESTA ]   ║
                   ║   • Digitación rápida 163 vacas (2 min) ║
                   ║   • Importador CSV/Excel "El Ganadero"  ║
                   ║   • Conciliación Tiquete Colanta        ║
                   ╚═════════════════════════════════════════╝
                                        │
                 ┌──────────────────────┴──────────────────────┐
                 ▼                                             ▼
┌─────────────────────────────────┐           ┌─────────────────────────────────┐
│     HACIA LA DUEÑA / JEFA       │           │       DE VUELTA AL CAMPO        │
│ • Reporte Ejecutivo Semanal/Mes │           │ • "Hoja de Tareas del Mayordomo"│
│ • Liquidacion Leche Colanta COP │           │   (PDF / WhatsApp en 1 Clic):   │
│ • Días Abiertos & Vacas a Secar │           │   - Vacas a Secar (Día 210)     │
│ • Balance Sanitario e Insumos   │           │   - Vacas con Cinta Roja        │
│                                 │           │   - Vacas con Parche a Servir   │
└─────────────────────────────────┘           └─────────────────────────────────┘
```

---

## 2. MAPEO FUNCIONAL EXHAUSTIVO DE "SOFTWARE GANADERO SG"

| Modulo Legado | Funciones en "El Ganadero SG" | Como lo Moderniza ProGanado |
|---|---|---|
| **1. Hoja de Vida & Inventario** | Ficha con Numero, Nombre, Raza, Color, Hierro, Fecha Nacimiento, Padre, Madre, Procedencia, Ubicacion/Hato. | Ficha reactiva web con **Historial 1:N de Aretes**, control de consanguinidad automatico y clasificacion zootecnica (Excelente / Buena / Regular). |
| **2. Control Lechero** | Registro de Pesaje (Kilos/Litros), Calculo de Lactancia a 305 dias, Curva de Produccion, Promedio Hato, Persistencia. | **Planilla Semanal AM/PM** con auto-suma, **resaltado dorado de >=16L** (porcion extra de concentrado), deteccion de caidas/subidas de leche (>15%) y conciliacion con tiquete Colanta. |
| **3. Reproduccion & Fertilidad** | Registro de Servicios (IA / Monta), Palpaciones (Preñada / Vacia), Partos, Abortos, Días Abiertos, Intervalo Entre Partos (IEP). | **Cronograma Biologico Automatizado:**<br>• Día 30: Alerta Vitamina ADE.<br>• Día 50: Alerta Parche Estrotect.<br>• Día 90: **Alerta Roja P0 antes del límite de 100 Días Abiertos**.<br>• Derivación automatica a Toro Repasador si falla 3 IA. |
| **4. Periodo Seco & Partos** | Fecha de Secado, Fecha Probable de Parto (FPP). | **Alerta automatica de Secado al Día 210** con exclusion automatica de la lista de ordeño + Bloqueo de 4 días de Calostro al parir. |
| **5. Sanidad & Tratamientos** | Registro de enfermedades, drogas aplicadas, costos, calendario de vacunacion oficial (Fiebre Aftosa / Brucelosis). | **Protocolo Cinta Roja & Retiro:** Calculadora automatica de dias de carencia ICA con bloqueo estricto de venta y aviso de "Ordeño en Balde". |
| **6. Potreros & Pastoreo** | Inventario de potreros, aforos de pasto, rotaciones y dias de descanso. | **Semaforo Visual de Potreros (Voisin):** Verde (Descanso), Azul (Ocupado con carga 163/210), Amarillo (Mantenimiento/Abono). |
| **7. Reportes & Informes** | Listados impresos en matriz de punto/PDF, libros oficiales para comites ganaderos. | **Reportes Ejecutivos a 1 Clic:** Dashboard interactivo, exportacion a Excel/PDF y generador de "Hoja de Tareas para el Mayordomo". |

---

## 3. ESTRATEGIA DE MIGRACION EN 1 CLIC (IMPORTADOR UNIVERSAL)

Para que una finca que lleva 5 o 10 anos usando "El Ganadero SG" se pase a ProGanado sin perder su historia:

### Formatos de Exportacion Estandar de "El Ganadero SG":
* `ANIMALES.XLS` / `ANIMALES.CSV`: Maestro de cabezas (Arete, Nombre, Sexo, Raza, FechaNac, Padre, Madre, Estado).
* `SERVICIOS.XLS`: Historial de inseminaciones y montas.
* `PARTOS.XLS`: Historial de partos, abortos y crias.
* `LECHE.XLS`: Historico de pesajes lecheros.

### Pipeline de Ingesta en ProGanado (`/api/v1/migracion/importar-ganadero`):
1. **Paso 1 (Subida):** La asistente arrastra el archivo de Excel exportado de El Ganadero.
2. **Paso 2 (Mapeo Inteligente):** El sistema detecta automaticamente las columnas y valida duplicados.
3. **Paso 3 (Normalizacion 3FN):**
   * Convierte los aretes al historial `marcacion`.
   * Vincula `fk_padre` y `fk_madre` existentes.
   * Calcula los estados reproductivos actuales (días de preñez, vacas abiertas, días de lactancia).
4. **Paso 4 (Listo para Usar):** En **menos de 30 segundos**, la finca queda 100% activa en ProGanado con todo su historial intacto.