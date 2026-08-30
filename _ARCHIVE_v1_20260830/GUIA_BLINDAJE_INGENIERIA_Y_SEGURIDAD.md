# 🛡️ GUÍA MAESTRA DE BLINDAJE DE INGENIERÍA, SEGURIDAD Y ESTABILIDAD
## Estándares de Producción y Buenas Prácticas para ProGanado S.A.S.
**CTO & QA Lead:** Jeiser Abraham Gutiérrez  
**Repositorio Oficial:** [ProGanado](https://github.com/jeiser270997-source/ProGanado)

---

## 🔒 1. PREVENCIÓN DE SQL INJECTION (DEFENSA POR DISEÑO)

### Regla en Piedra:
> **PROHIBIDO TERMINANTEMENTE** concatenar o interpolar cadenas de texto (`template literals`, `"SELECT * FROM ... WHERE arete = '" + arete + "'"`) dentro de cualquier sentencia SQL.

### Protocolo de Implementación:
1. **Consultas Parametrizadas y Prepared Statements Obligatorios:**
   Todas las consultas a la base de datos deben utilizar placeholders de parámetros vinculados:
   ```typescript
   // ❌ MAL: Vulnerable a SQL Injection
   const query = `SELECT * FROM bovinos WHERE id_finca = '${fincaId}' AND alerta_cinta_roja = ${estado}`;
   
   // ✅ BIEN: Consulta Parametrizada Segura (Prepared Statement)
   const query = `SELECT * FROM bovinos WHERE id_finca = $1 AND alerta_cinta_roja = $2`;
   const result = await db.query(query, [fincaId, estado]);
   ```
2. **Validación Previa con Esquemas Zod:**
   Ningún parámetro entra a la capa de persistencia sin haber sido sanitizado y validado previamente por su esquema Zod correspondiente (`src/schemas/validation.schemas.ts`).

---

## ⚡ 2. PREVENCIÓN DE RACE CONDITIONS (CONDICIONES DE CARRERA)

En entornos de ordeño matutino donde múltiples operarios pueden sincronizar pesajes simultáneamente o registrar tratamientos clínicos:

### Protocolo de Transacciones y Bloqueo:
1. **Transacciones ACID con Aislamiento Estricto:**
   Toda operación que modifique más de una tabla (ej. Registrar un tratamiento antibiótico y activar el semáforo Cinta Roja en la vaca) debe ejecutarse dentro de un bloque transaccional atómico:
   ```sql
   BEGIN TRANSACTION;
   INSERT INTO tratamientos_sanitarios (id_tratamiento, id_bovino, tipo_procedimiento, id_medicamento, fecha_tratamiento)
   VALUES ($1, $2, 'Antibiotico', $3, $4);

   UPDATE bovinos SET alerta_cinta_roja = 1 WHERE id_bovino = $2;
   COMMIT;
   ```
2. **Bloqueo Pesimista para Recursos Críticos (`SELECT ... FOR UPDATE`):**
   Al verificar si una finca en plan Freemium ha alcanzado su límite de vacas (ej. máximo 15), se bloquea la fila de la suscripción durante la inserción para evitar que dos registros concurrentes superen la cuota:
   ```sql
   SELECT limite_vacas FROM suscripciones_saas WHERE id_finca = $1 FOR UPDATE;
   ```
3. **Bloqueo Optimista con Columna de Versión (`Optimistic Locking`):**
   Las entidades maestras manejan una columna `version INTEGER DEFAULT 1` para detectar colisiones de edición simultánea:
   ```sql
   UPDATE bovinos SET id_potrero = $1, version = version + 1 WHERE id_bovino = $2 AND version = $3;
   ```

---

## 🧬 3. PREVENCIÓN DE DATOS HUÉRFANOS E INTEGRIDAD REFERENCIAL

### Protocolo de Relaciones y Llaves Foráneas:
1. **Protección `ON DELETE RESTRICT` para Entidades Maestras:**
   Las tablas de catálogo y auditoría (`usuarios`, `razas`, `medicamentos`) tienen restricción estricta de borrado. Es imposible eliminar un medicamento de la base de datos si existe al menos un historial de tratamiento sanitario que lo referencie:
   ```sql
   FOREIGN KEY (id_medicamento) REFERENCES medicamentos(id_medicamento) ON DELETE RESTRICT
   ```
2. **Limpieza `ON DELETE CASCADE` para Hijos Transaccionales:**
   Si un bovino es retirado legalmente de la base de datos, sus registros dependientes de pesaje y marcaciones se eliminan en cascada sin dejar registros huérfanos.
3. **Patrón Soft-Delete (Borrado Lógico):**
   En producción, los registros nunca se borran físicamente (`DELETE`). Se maneja una columna `deleted_at DATETIME DEFAULT NULL` e índices parciales `WHERE deleted_at IS NULL` para preservar la trazabilidad histórica ante auditorías del ICA.

---

## 📦 4. PREVENCIÓN DE REDUNDANCIA DE ARCHIVOS EN LA NUBE (AWS S3)

Almacenar imágenes repetidas de aretes, actas de vacunación o reportes incrementa innecesariamente los costos de almacenamiento.

### Protocolo de Almacenamiento Cero-Redundancia:
1. **Deduplicación por Hash Criptográfico (SHA-256):**
   Antes de subir cualquier imagen al bucket de AWS S3, el backend calcula el hash SHA-256 del buffer del archivo. Si el hash ya existe en la base de datos, se asocia el registro a la URL existente sin duplicar el binario en S3.
2. **Conversión y Compresión a Formato WebP:**
   Todas las fotografías de campo tomadas por los mayordomos con smartphones se convierten en el servidor a formato `.webp` con compresión del 80%, reduciendo el peso de 5 MB a menos de 250 KB sin perder legibilidad del código de arete.

---

## 🗃️ 5. PREVENCIÓN DE REDUNDANCIA DE DATOS (3FN & EXTENSIBILIDAD)

1. **Normalización en 3FN:** Cada dato existe en un único lugar. Por ejemplo, el nombre y los días de retiro de un fármaco residen en `medicamentos`; `tratamientos_sanitarios` solo almacena la llave foránea `id_medicamento`.
2. **Extensibilidad sin Romper el Esquema:**
   El modelo de 12 tablas está diseñado para admitir nuevas entidades en fases futuras (ej: `lotes_alimentacion`, `costos_fijos`, `ventas_leche`) simplemente creando nuevas relaciones foráneas con `fincas` o `bovinos`, sin necesidad de alterar las 12 tablas fundacionales.
