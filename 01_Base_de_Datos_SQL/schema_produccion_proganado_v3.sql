-- ==============================================================================
-- PROGANADO SaaS - SISTEMA INTEGRAL DE GESTIÓN GANADERA Y TRAZABILIDAD LECHERA
-- Esquema de Base de Datos Relacional Normalizado (3FN) - Versión Definitiva
-- Validado con Operativa Real de Finca Lechera (Colanta / Inocuidad Cinta Roja)
-- Tech Lead: Jeiser Abraham Gutiérrez | CESDE Nivel 1
-- ==============================================================================

PRAGMA foreign_keys = ON;

-- 1. USUARIOS (Autenticación y Seguridad) — roles alineados README (Admin/Asistente/Veterinario/Operario)
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    contrasena_hash TEXT NOT NULL,
    rol TEXT CHECK(rol IN ('Administrador', 'Asistente', 'Veterinario', 'Operario')) NOT NULL DEFAULT 'Administrador',
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. FINCAS (El Predio Ganadero / Unidad Productiva)
CREATE TABLE IF NOT EXISTS fincas (
    id_finca TEXT PRIMARY KEY,
    id_usuario TEXT NOT NULL,
    nombre_finca TEXT NOT NULL,
    documento_titular TEXT NOT NULL,
    codigo_ica_predio TEXT NOT NULL UNIQUE,
    municipio TEXT NOT NULL DEFAULT 'Santa Rosa de Osos',
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE RESTRICT
);

-- 3. SUSCRIPCIONES SAAS (Modelo Freemium DataCrédito por Finca)
-- DEUDA FIX 2026-08-30: unificado a 15 vacas Free + 3 planes (Free/Pro_119k/Multi) + Suspendido para paridad README/schema
CREATE TABLE IF NOT EXISTS suscripciones_saas (
    id_suscripcion TEXT PRIMARY KEY,
    id_finca TEXT NOT NULL,
    plan_tipo TEXT CHECK(plan_tipo IN ('Free', 'Pro_119k', 'Multi_Predio_299k')) NOT NULL DEFAULT 'Free',
    estado_acceso TEXT CHECK(estado_acceso IN ('Activo', 'Solo_Lectura', 'Suspendido')) NOT NULL DEFAULT 'Activo',
    limite_vacas INTEGER NOT NULL DEFAULT 15,
    fecha_inicio DATE NOT NULL,
    fecha_vencimiento DATE,
    FOREIGN KEY (id_finca) REFERENCES fincas(id_finca) ON DELETE CASCADE
);

-- 4. ENTREGAS ACOPIO (Despacho Diario Carrotanque Colanta)
CREATE TABLE IF NOT EXISTS entregas_acopio (
    id_entrega TEXT PRIMARY KEY,
    id_finca TEXT NOT NULL,
    fecha_entrega DATE NOT NULL,
    litros_totales DECIMAL(7,2) NOT NULL,
    valor_bruto_est DECIMAL(10,2) NOT NULL,
    recuento_ufc INTEGER,
    FOREIGN KEY (id_finca) REFERENCES fincas(id_finca) ON DELETE CASCADE
);

-- 5. POTREROS (Pastoreo Racional Voisin - PRV)
CREATE TABLE IF NOT EXISTS potreros (
    id_potrero TEXT PRIMARY KEY,
    id_finca TEXT NOT NULL,
    nombre_potrero TEXT NOT NULL,
    dias_ocupacion INTEGER NOT NULL DEFAULT 1,
    dias_descanso_prv INTEGER NOT NULL DEFAULT 35,
    FOREIGN KEY (id_finca) REFERENCES fincas(id_finca) ON DELETE CASCADE
);

-- 6. RAZAS (Catálogo Dinámico de Genética)
CREATE TABLE IF NOT EXISTS razas (
    id_raza TEXT PRIMARY KEY,
    nombre_raza TEXT NOT NULL UNIQUE,
    descripcion_proposito TEXT NOT NULL
);

-- 7. BOVINOS (Ficha Central Inmutable del Animal) — estados alineados README (Novilla/Crecimiento/Toro/Horra/En_Ordeño)
CREATE TABLE IF NOT EXISTS bovinos (
    id_bovino TEXT PRIMARY KEY,
    id_finca TEXT NOT NULL,
    id_potrero TEXT,
    id_raza TEXT NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    alerta_cinta_roja BOOLEAN NOT NULL DEFAULT 0,
    estado_lactancia TEXT CHECK(estado_lactancia IN ('En_Ordeño', 'Horra_Seca', 'Novilla', 'Crecimiento', 'Toro')) NOT NULL DEFAULT 'Novilla',
    FOREIGN KEY (id_finca) REFERENCES fincas(id_finca) ON DELETE CASCADE,
    FOREIGN KEY (id_potrero) REFERENCES potreros(id_potrero) ON DELETE SET NULL,
    FOREIGN KEY (id_raza) REFERENCES razas(id_raza) ON DELETE RESTRICT
);

-- 8. MARCACIONES (Aretes ICA, Hierros, Chapetas Normalizados 1:N) — tipos alineados README (SINIGAN/Chip_RFID)
CREATE TABLE IF NOT EXISTS marcaciones (
    id_marcacion TEXT PRIMARY KEY,
    id_bovino TEXT NOT NULL,
    tipo_marca TEXT CHECK(tipo_marca IN ('Arete_ICA', 'Arete_SINIGAN', 'Chapeta_Manejo', 'Hierro_Caliente', 'Tatuaje', 'Chip_RFID')) NOT NULL,
    codigo_valor TEXT NOT NULL,
    estado_activo BOOLEAN NOT NULL DEFAULT 1,
    FOREIGN KEY (id_bovino) REFERENCES bovinos(id_bovino) ON DELETE CASCADE
);

-- 9. MEDICAMENTOS (Farmacopea e Inocuidad ICA)
CREATE TABLE IF NOT EXISTS medicamentos (
    id_medicamento TEXT PRIMARY KEY,
    nombre_farmaco TEXT NOT NULL UNIQUE,
    dias_retiro_ica INTEGER NOT NULL
);

-- 10. TRATAMIENTOS SANITARIOS (Control de Inocuidad y Disparador Cinta Roja)
CREATE TABLE IF NOT EXISTS tratamientos_sanitarios (
    id_tratamiento TEXT PRIMARY KEY,
    id_bovino TEXT NOT NULL,
    tipo_procedimiento TEXT NOT NULL,
    id_medicamento TEXT,
    fecha_tratamiento DATE NOT NULL,
    dosis_ml DECIMAL(5,2),
    FOREIGN KEY (id_bovino) REFERENCES bovinos(id_bovino) ON DELETE CASCADE,
    FOREIGN KEY (id_medicamento) REFERENCES medicamentos(id_medicamento) ON DELETE RESTRICT
);

-- 11. PESAJES LECHE (Telemetría de Curva de Lactancia con Hora Exacta)
CREATE TABLE IF NOT EXISTS pesajes_leche (
    id_pesaje TEXT PRIMARY KEY,
    id_bovino TEXT NOT NULL,
    fecha_pesaje DATE NOT NULL,
    hora_pesaje TIME NOT NULL,
    litros_obtenidos DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (id_bovino) REFERENCES bovinos(id_bovino) ON DELETE CASCADE,
    CONSTRAINT uq_pesaje_bovino_momento UNIQUE (id_bovino, fecha_pesaje, hora_pesaje)
);

-- 12. EVENTOS REPRODUCTIVOS (Control de los 100 Días Abiertos) — tipos alineados README (+Aborto)
CREATE TABLE IF NOT EXISTS eventos_reproductivos (
    id_evento TEXT PRIMARY KEY,
    id_bovino TEXT NOT NULL,
    tipo_evento TEXT CHECK(tipo_evento IN ('Parto', 'Celo_Observable', 'Inseminacion', 'Palpacion', 'Aborto')) NOT NULL,
    fecha_evento DATE NOT NULL,
    dias_abiertos_calc INTEGER,
    FOREIGN KEY (id_bovino) REFERENCES bovinos(id_bovino) ON DELETE CASCADE
);

-- ÍNDICES DE ALTO DESEMPEÑO
CREATE INDEX IF NOT EXISTS idx_bovinos_finca ON bovinos(id_finca);
CREATE INDEX IF NOT EXISTS idx_bovinos_cinta_roja ON bovinos(alerta_cinta_roja) WHERE alerta_cinta_roja = 1;
CREATE INDEX IF NOT EXISTS idx_pesajes_bovino_fecha ON pesajes_leche(id_bovino, fecha_pesaje);
CREATE INDEX IF NOT EXISTS idx_marcaciones_codigo ON marcaciones(codigo_valor);
CREATE INDEX IF NOT EXISTS idx_tratamientos_fecha ON tratamientos_sanitarios(fecha_tratamiento);

-- ==============================================================================
-- 13. VISTA DINÁMICA DE INOCUIDAD LECHERA (Cálculo Automático Cinta Roja)
-- Resuelve inconsistencia biológica: calcula periodo de retiro en tiempo real
-- ==============================================================================
CREATE VIEW IF NOT EXISTS v_bovinos_cinta_roja AS
SELECT 
    b.id_bovino,
    b.id_finca,
    t.id_tratamiento,
    m.nombre_farmaco,
    t.fecha_tratamiento,
    m.dias_retiro_ica,
    DATE(t.fecha_tratamiento, '+' || m.dias_retiro_ica || ' days') AS fecha_fin_retiro,
    CASE 
        WHEN DATE(t.fecha_tratamiento, '+' || m.dias_retiro_ica || ' days') >= CURRENT_DATE THEN 1 
        ELSE 0 
    END AS en_periodo_retiro
FROM bovinos b
JOIN tratamientos_sanitarios t ON b.id_bovino = t.id_bovino
JOIN medicamentos m ON t.id_medicamento = m.id_medicamento
WHERE DATE(t.fecha_tratamiento, '+' || m.dias_retiro_ica || ' days') >= CURRENT_DATE;

-- TRIGGER DE PROTECCIÓN ACTIVA: Setea alerta_cinta_roja = 1 al insertar tratamiento con medicamento
CREATE TRIGGER IF NOT EXISTS trg_activar_cinta_roja_tratamiento
AFTER INSERT ON tratamientos_sanitarios
WHEN NEW.id_medicamento IS NOT NULL
BEGIN
    UPDATE bovinos 
    SET alerta_cinta_roja = 1 
    WHERE id_bovino = NEW.id_bovino;
END;
