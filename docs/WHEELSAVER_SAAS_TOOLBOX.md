# CAJA DE HERRAMIENTAS SAAS PROGANADO (AUDITORIA WHEELSAVER)

[OBJETIVO] Catalogo de patrones, librerias y componentes de codigo abierto (de la base de datos de 25k+ repos) para construir ProGanado a velocidad 10x sin reinventar la rueda.

---

## 1. BACKEND & ARQUITECTURA MODULAR (API REST)

| Patron / Herramienta | Repo Referencia (WheelSaver) | Estrellas | Aplicacion en ProGanado |
|---|---|:---:|---|
| **Clean Architecture Express** | `santiq/bulletproof-nodejs` & `hagopj13/node-express-boilerplate` | 13.4k ⭐ | Separacion estricta en 3 capas: `routes/` -> `services/` (Casos de uso) -> `repositories/` (SQL). Cero acoplamiento. |
| **Validacion de Esquemas** | `colinhacks/zod` | 35.2k ⭐ | DTOs de entrada validados antes de tocar la BD (aretes, jornadas, fechas, dosis de farmacos). |
| **Autenticacion Stateless** | `auth0/node-jsonwebtoken` + `bcryptjs` | 18.0k ⭐ | Tokens JWT seguros para Asistente, Veterinario y Administrador. |
| **Manejo Centralizado de Errores** | Patron `ApiError` + `catchAsync` | Estandar | Respuestas JSON estructuradas con codigos HTTP exactos (400, 401, 404, 409, 500). |

---

## 2. FRONTEND & VISUALIZACION (HTML5 RESPONSIVE PARA SEBASTIAN)

| Componente UI | Repo Referencia (WheelSaver) | Estrellas | Aplicacion en ProGanado |
|---|---|:---:|---|
| **Estructura Dashboard Vanilla** | `themesberg/volt-bootstrap-5-dashboard` | 2.6k ⭐ | Layout responsive sin React/Tailwind (Sidebar + Navbar + Grid de tarjetas KPI y tablas dinamicas). |
| **Graficos Lacteos & Peso** | `chartjs/Chart.js` | 67.6k ⭐ | Renderizado nativo en `<canvas>` de la curva de lactancia (litros/vaca/jornada) y ganancia diaria de peso (GDP). |
| **Modales & Notificaciones** | `<dialog>` HTML5 nativo + Toast CSS | Estandar | Alertas emergentes en rojo cuando una vaca en retiro intenta ser marcada para venta. |

---

## 3. MOTOR DE REGLAS ZOOTECNICAS DETERMINISTAS (CORE DE NEGOCIO)

1. `ReproduccionService`:
   * Funcion pura `calcularVentanaCelo(fechaUltimoParto, fechaUltimoCelo)` -> Retorna si hoy esta en estro (21 dias +- 1 dia).
   * Funcion pura `calcularFechaSecado(fechaPrenez)` -> Retorna dia 223 de gestacion (alerta de secado a los 7.5 meses).
2. `SanidadService`:
   * Funcion pura `validarAptitudLeche(idBovino, fechaOrdeño)` -> Consulta si tiene tratamientos activos donde `fecha_fin_retiro_leche >= fechaOrdeño`. Bloquea `apta_para_venta = FALSE`.
3. `GenealogiaService`:
   * Funcion pura `validarConsanguinidad(idVaca, idToro)` -> Verifica que no compartan `fk_padre` o `fk_madre` en primer y segundo grado.

---

## 4. QA AUTOMATION FIRST (GARANTIA ANTI-DEUDA)

* **Tests Unitarios (Vitest):** Cobertura del 100% en las funciones de calculo biologico (celo, secado, retiro, consanguinidad).
* **Tests E2E (Playwright):** 3 flujos automatizados de punta a punta:
  1. *Flujo 1:* Login Asistente -> Registro de nuevo bovino con arete inicial -> Verificacion en listado.
  2. *Flujo 2:* Aplicacion de antibiotico a vaca -> Intento de registro de ordeño -> Verificacion de bloqueo automatico.
  3. *Flujo 3:* Alerta de celo en Dashboard tras 21 dias.