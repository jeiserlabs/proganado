# 🛡️ DICCIONARIO DE VALIDACIÓN DE INPUTS Y CELDAS — PROGANADO SAAS
## Especificación de Tipado Fuerte, Restricciones y Prevención de Malas Prácticas
**Tech Lead & QA Lead:** Jeiser Abraham Gutiérrez  
**Repositorio:** [ProGanado](https://github.com/jeiser270997-source/ProGanado.git)

---

### 📌 Filosofía de QA First & Fail-Closed en ProGanado
Al tratarse de una **S.A.S. Ganadera y de Inocuidad Alimentaria**, los errores de captura del usuario (operarios de campo, mayordomos o asistentes) pueden ocasionar la contaminación de tanques comunales de leche ($25M COP en pérdidas) o desastres reproductivos. Por ello, se aplica el principio de **Defensa en Profundidad (Defense in Depth)**:
1. **Frontend:** Restricciones semánticas nativas HTML5 (`type`, `required`, `pattern`, `min`, `max`).
2. **Capa de Tipado Estático:** Interfaces TypeScript estrictas sin uso de `any` (`src/types/domain.types.ts`).
3. **Capa de Validación en Runtime:** Esquemas Zod que interceptan y sanitizan antes de tocar la base de datos (`src/schemas/validation.schemas.ts`).
4. **Base de Datos:** Restricciones `NOT NULL`, `UNIQUE`, `CHECK` y llaves foráneas con `ON DELETE RESTRICT/CASCADE`.

---

## 📋 MATRIZ EXHAUSTIVA DE INPUTS Y CELDAS (12 ENTIDADES)

### 1. Entidad: `usuarios` (Autenticación y Roles)
| Campo / Celda | Elemento UI / Input HTML5 | Tipo TypeScript | Restricción / Regex / Rango | Mensaje de Error Amigable | Justificación de QA / Seguridad |
|---|---|---|---|---|---|
| `nombre` | `<input type="text">` | `string` | `minlength="3" maxlength="100"` | "El nombre completo debe tener entre 3 y 100 caracteres." | Evita nombres vacíos o abreviaciones ambiguas. |
| `email` | `<input type="email">` | `string` | Formato RFC 5322 (`email()`) | "Ingrese un correo electrónico válido (ej: usuario@finca.com)." | Clave única de acceso y notificaciones. |
| `contrasena` | `<input type="password">` | `string` | `minlength="8"` (1 Mayús, 1 Núm, 1 Simb) | "La contraseña debe tener mínimo 8 caracteres con números y símbolos." | Protección contra ataques de fuerza bruta. |
| `rol` | `<select>` | `RolUsuario` | `['Administrador', 'Asistente', 'Veterinario', 'Operario']` | "Seleccione un rol autorizado." | Control de acceso basado en roles (RBAC). |

---

### 2. Entidad: `fincas` (Propiedades Ganaderas Multi-Inquilino)
| Campo / Celda | Elemento UI / Input HTML5 | Tipo TypeScript | Restricción / Regex / Rango | Mensaje de Error Amigable | Justificación de QA / Seguridad |
|---|---|---|---|---|---|
| `nombre_finca` | `<input type="text">` | `string` | `minlength="2" maxlength="100"` | "El nombre de la finca debe tener entre 2 y 100 caracteres." | Identificación clara del predio. |
| `documento_titular` | `<input type="text">` | `string` | `pattern="^[0-9]{6,12}$"` | "El documento debe contener entre 6 y 12 dígitos numéricos." | Cédula o NIT del propietario legal. |
| `codigo_ica_predio` | `<input type="text">` | `string` | `pattern="^[0-9]{2}-[0-9]{3,5}-[0-9]{3,6}$"` | "Formato ICA inválido. Debe ser ej: 05-647-00129." | Registro único sanitario oficial ante el ICA. |
| `municipio` | `<input type="text">` | `string` | `minlength="2" maxlength="80"` | "Ingrese un municipio válido." | Localización zootécnica y cuenca lechera. |

---

### 3. Entidad: `bovinos` (Ficha Central del Animal)
| Campo / Celda | Elemento UI / Input HTML5 | Tipo TypeScript | Restricción / Regex / Rango | Mensaje de Error Amigable | Justificación de QA / Seguridad |
|---|---|---|---|---|---|
| `fecha_nacimiento` | `<input type="date">` | `string` (ISO) | `max="today" min="2005-01-01"` | "La fecha de nacimiento no puede ser futura ni anterior a 2005." | Integridad temporal biológica de la vaca. |
| `id_raza` | `<select>` | `string` | `required` (FK válida) | "Seleccione la raza zootécnica del bovino." | Clasificación de potencial genético. |
| `id_potrero` | `<select>` | `string \| null` | Opcional | "Potrero no asignado o inválido." | Permite animales en establo o en pastoreo. |
| `estado_lactancia` | `<select>` | `EstadoLactancia` | `['En_Ordeño', 'Horra_Seca', 'Novilla', 'Crecimiento', 'Toro']` | "Seleccione un estado productivo válido." | Determina si el animal ingresa a sala de ordeño. |
| `alerta_cinta_roja` | `<input type="checkbox">` | `boolean` | Solo lectura (calculado por trigger) | "Modificado automáticamente por tratamientos médicos." | **Fail-Closed:** Protege contra bypass manual. |

---

### 4. Entidad: `marcaciones` (Aretes e Identificaciones 1:N)
| Campo / Celda | Elemento UI / Input HTML5 | Tipo TypeScript | Restricción / Regex / Rango | Mensaje de Error Amigable | Justificación de QA / Seguridad |
|---|---|---|---|---|---|
| `tipo_marca` | `<select>` | `TipoMarca` | `['Arete_ICA', 'Arete_SINIGAN', 'Chapeta_Manejo', 'Hierro_Caliente', 'Tatuaje', 'Chip_RFID']` | "Seleccione el tipo de marcación." | Soporte multimarca legal y de manejo. |
| `codigo_valor` | `<input type="text">` | `string` | `pattern="^[A-Z0-9\-_]{2,20}$"` | "El código del arete solo permite letras, números y guiones (sin espacios)." | Previene espacios accidentales o caracteres raros. |
| `estado_activo` | `<input type="radio">` | `boolean` | `true / false` | "Defina si es el arete actual o un arete histórico caído." | Preserva la trazabilidad histórica exigida por ICA. |

---

### 5. Entidad: `pesajes_leche` (Telemetría de Curva de Lactancia)
| Campo / Celda | Elemento UI / Input HTML5 | Tipo TypeScript | Restricción / Regex / Rango | Mensaje de Error Amigable | Justificación de QA / Seguridad |
|---|---|---|---|---|---|
| `fecha_pesaje` | `<input type="date">` | `string` (ISO) | `max="today"` | "La fecha de pesaje no puede ser futura." | Registro de producción real. |
| `hora_pesaje` | `<input type="time">` | `string` (TIME) | `pattern="^([01]\d\|2[0-3]):([0-5]\d):([0-5]\d)$"` | "Hora inválida. Debe ser HH:MM:SS (ej: 04:30:00)." | Discriminación exacta del turno matutino / vespertino. |
| `litros_obtenidos` | `<input type="number">` | `number` | `min="0.10" max="60.00" step="0.05"` | "Los litros deben ser mayores a 0 y menores a 60 L por ordeño." | Detecta ceros erróneos o valores imposibles por vaca. |

---

### 6. Entidad: `tratamientos_sanitarios` (Ficha Clínica EHR y Cinta Roja)
| Campo / Celda | Elemento UI / Input HTML5 | Tipo TypeScript | Restricción / Regex / Rango | Mensaje de Error Amigable | Justificación de QA / Seguridad |
|---|---|---|---|---|---|
| `tipo_procedimiento` | `<select>` | `TipoProcedimiento` | 10 opciones zootécnicas | "Seleccione el tipo de procedimiento realizado." | Clasifica si requiere fármaco o es podología. |
| `id_medicamento` | `<select>` | `string \| null` | Obligatorio si es antibiótico/vacuna | "Debe seleccionar el medicamento administrado para calcular el tiempo de retiro." | **Cálculo de Inocuidad:** Activa la Cinta Roja. |
| `fecha_tratamiento` | `<input type="date">` | `string` (ISO) | `max="today"` | "Fecha de aplicación inválida." | Punto de partida del cálculo de cuarentena. |
| `dosis_ml` | `<input type="number">` | `number \| null` | `min="0.50" max="250.00" step="0.10"` | "La dosis debe estar entre 0.5 ml y 250 ml." | Evita sobredosis o valores cero. |

---

### 7. Entidad: `entregas_acopio` (Liquidación Quincenal Carrotanque Colanta)
| Campo / Celda | Elemento UI / Input HTML5 | Tipo TypeScript | Restricción / Regex / Rango | Mensaje de Error Amigable | Justificación de QA / Seguridad |
|---|---|---|---|---|---|
| `fecha_entrega` | `<input type="date">` | `string` (ISO) | `max="today"` | "Fecha de entrega inválida." | Control de facturación por quincena. |
| `litros_totales` | `<input type="number">` | `number` | `min="1.00" max="50000.00" step="0.50"` | "Volumen de litros debe ser positivo y acorde a la capacidad del predio." | Control volumétrico de tanques de enfriamiento. |
| `recuento_ufc` | `<input type="number">` | `number \| null` | `min="0" max="2000000"` | "El recuento de UFC debe ser un valor entero positivo." | Determina la bonificación higiénica (+120 COP/L o penalización). |
| `valor_bruto_est` | `<input type="number">` | `number` | `min="0.00" step="100"` | "El valor estimado no puede ser negativo." | Cuadre financiero preliminar. |

---

### 8. Entidad: `potreros` (Pastoreo Racional Voisin - PRV)
| Campo / Celda | Elemento UI / Input HTML5 | Tipo TypeScript | Restricción / Regex / Rango | Mensaje de Error Amigable | Justificación de QA / Seguridad |
|---|---|---|---|---|---|
| `nombre_potrero` | `<input type="text">` | `string` | `minlength="1" maxlength="50"` | "Nombre de potrero obligatorio (ej: Potrero El Reposo 1)." | Mapeo físico de praderas. |
| `dias_ocupacion` | `<input type="number">` | `number` | `min="1" max="5" step="1"` | "Días de ocupación recomendados entre 1 y 3 (máximo 5)." | Ley de Voisin: Evita el pastoreo del rebrote. |
| `dias_descanso_prv` | `<input type="number">` | `number` | `min="15" max="90" step="1"` | "Días de descanso deben estar entre 15 y 90 días." | Tiempo de recuperación biológica de la pastura. |

---

### 9. Entidad: `eventos_reproductivos` (Control 100 Días Abiertos)
| Campo / Celda | Elemento UI / Input HTML5 | Tipo TypeScript | Restricción / Regex / Rango | Mensaje de Error Amigable | Justificación de QA / Seguridad |
|---|---|---|---|---|---|
| `tipo_evento` | `<select>` | `TipoEventoReproductivo` | Parto, Celo, Inseminación, Palpación, Aborto | "Seleccione un evento reproductivo válido." | Alimenta la curva de fertilidad del hato. |
| `fecha_evento` | `<input type="date">` | `string` (ISO) | `max="today"` | "Fecha del evento no puede ser futura." | Registro cronológico del ciclo estral. |
| `dias_abiertos_calc` | Celda de Tabla | `number \| null` | Calculado (`fecha_evento - fecha_ultimo_parto`) | "Calculado automáticamente: Meta <= 100 días." | Alerta roja económica si supera los 100 días. |
