# 📄 GANADOCONTROL - DOCUMENTO TÉCNICO EJECUTIVO FINAL
**CESDE - Escuela de Nuevas Tecnologías | Semestre 2026-2**
**Momento 1: Integración de Capa de Datos, Lógica y Presentación Visual**

---

## 1. RESUMEN EJECUTIVO
GanadoControl es una solución tecnológica diseñada para micro y pequeñas fincas ganaderas dedicadas a la lechería y doble propósito. Permite registrar la trazabilidad de los bovinos, la rotación de potreros bajo el principio de Pastoreo Racional Voisin (PRV), el control diario de producción lechera y el monitoreo sanitario estricto (tiempos de retiro por antibióticos según normatividad ICA).

---

## 2. ARQUITECTURA DEL SISTEMA (3 CAPAS)
1. **Capa de Persistencia (Base de Datos):**
   - Motor SQLite 3 en Tercera Forma Normal (3FN).
   - 7 Tablas relacionales con llaves primarias, foráneas y restricciones CHECK.
   - Manejo de lotes por potreros, razas, fichas médicas (1:1), ordeños (1:N) y vacunación (N:M).
2. **Capa Lógica (Algoritmia PSeInt):**
   - Validación de estados reproductivos.
   - Cálculo automatizado de dosificación de purgantes/antiparasitarios según peso vivo.
   - Dictamen de inocuidad y retiro sanitario de leche.
3. **Capa Visual (HTML5):**
   - Dashboard administrativo semántico con tablas de ocupación de potreros y producción.
   - Formulario de registro de bovinos con validaciones nativas de entrada.

---

## 3. INTEGRANTES Y ROLES DEL EQUIPO
- **Jeiser Abraham Gutiérrez:** Tech Lead & Arquitecto de Base de Datos.
- **Camila Salas:** Product Owner & Requerimientos Zootécnicos.
- **Sebastián Gómez:** Diseñador Frontend & Estructura HTML5.
- **Emilio Villanueva:** Desarrollador de Lógica & Algoritmos PSeInt.
- **Humberto Pinto:** QA, Pruebas y Documentación Técnica.
