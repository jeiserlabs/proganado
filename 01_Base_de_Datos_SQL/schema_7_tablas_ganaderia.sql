-- ============================================================================
-- PROYECTO INTEGRADOR CESDE - NIVEL 1
-- SISTEMA: ASISTENTE GANADERO MICRO (GANADOCONTROL)
-- ARCHIVO: schema_7_tablas_ganaderia.sql
-- DESCRIPCION: 7 Tablas en 3FN con Gestion de 20 Potreros (Lotes separados)
-- ============================================================================

-- 1. TABLA: POTRERO (1:N con BOVINO — Catalogo de 20 Potreros)
CREATE TABLE potrero (
    id_potrero INTEGER PRIMARY KEY AUTOINCREMENT,
    numero_potrero INTEGER NOT NULL UNIQUE CHECK(numero_potrero >= 1 AND numero_potrero <= 50),
    nombre_potrero VARCHAR(60) NOT NULL,
    tipo_lote VARCHAR(40) NOT NULL CHECK(tipo_lote IN (
        'Produccion Leche', 
        'Novillas / Cria', 
        'Toros / Ceba', 
        'Vacas Secas / Horras', 
        'Descanso / Rotacion'
    )),
    capacidad_maxima INTEGER NOT NULL CHECK(capacidad_maxima >= 0 AND capacidad_maxima <= 100),
    area_hectareas DECIMAL(4,2) NOT NULL CHECK(area_hectareas > 0.0),
    tipo_pasto VARCHAR(40) DEFAULT 'Kikuyo'
);

-- 2. TABLA: RAZA (1:N con BOVINO)
CREATE TABLE raza (
    id_raza INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_raza VARCHAR(50) NOT NULL UNIQUE CHECK(length(trim(nombre_raza)) >= 2),
    proposito VARCHAR(30) NOT NULL CHECK(proposito IN ('Leche', 'Carne', 'Doble Proposito'))
);

-- 3. TABLA: BOVINO (Entidad Central con blindaje anti-duplicados y rango fisiologico)
CREATE TABLE bovino (
    id_bovino INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo_arete VARCHAR(20) UNIQUE NOT NULL CHECK(length(trim(codigo_arete)) >= 3),
    nombre VARCHAR(50) DEFAULT 'Sin Nombre',
    sexo CHAR(1) NOT NULL CHECK(sexo IN ('H', 'M')),
    fecha_nacimiento DATE NOT NULL,
    peso_kg DECIMAL(6,2) NOT NULL CHECK(peso_kg >= 25.0 AND peso_kg <= 1500.0),
    estado VARCHAR(20) NOT NULL DEFAULT 'Viva' CHECK(estado IN ('Viva', 'Muerta', 'Vendida')),
    id_raza INTEGER NOT NULL,
    id_potrero INTEGER NOT NULL,
    FOREIGN KEY (id_raza) REFERENCES raza(id_raza),
    FOREIGN KEY (id_potrero) REFERENCES potrero(id_potrero)
);

-- 4. TABLA: FICHA_MEDICA_PERFIL (Relacion 1:1 estricta con BOVINO)
CREATE TABLE ficha_medica_perfil (
    id_ficha INTEGER PRIMARY KEY AUTOINCREMENT,
    id_bovino INTEGER UNIQUE NOT NULL,
    estado_reproductivo VARCHAR(30) DEFAULT 'Vacia' CHECK(estado_reproductivo IN ('Vacia', 'Gestante', 'Lactancia', 'Seca', 'Toro', 'Novilla')),
    en_tiempo_retiro BOOLEAN NOT NULL DEFAULT 0,
    fecha_proximo_secado DATE,
    alergias_observaciones TEXT,
    FOREIGN KEY (id_bovino) REFERENCES bovino(id_bovino) ON DELETE CASCADE
);

-- 5. TABLA: TIPO_VACUNA (Catalogo de Biologicos)
CREATE TABLE tipo_vacuna (
    id_vacuna INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_vacuna VARCHAR(80) NOT NULL UNIQUE,
    enfermedad VARCHAR(100) NOT NULL,
    dosis_ml DECIMAL(4,1) NOT NULL CHECK(dosis_ml > 0.0 AND dosis_ml <= 50.0),
    frecuencia_meses INTEGER NOT NULL CHECK(frecuencia_meses >= 1 AND frecuencia_meses <= 36)
);

-- 6. TABLA: REGISTRO_VACUNACION (Tabla Intermedia que resuelve la relacion N:M)
CREATE TABLE registro_vacunacion (
    id_registro INTEGER PRIMARY KEY AUTOINCREMENT,
    id_bovino INTEGER NOT NULL,
    id_vacuna INTEGER NOT NULL,
    fecha_aplicacion DATE NOT NULL,
    proxima_dosis DATE NOT NULL CHECK(proxima_dosis >= fecha_aplicacion),
    veterinario VARCHAR(100),
    observaciones TEXT,
    FOREIGN KEY (id_bovino) REFERENCES bovino(id_bovino) ON DELETE CASCADE,
    FOREIGN KEY (id_vacuna) REFERENCES tipo_vacuna(id_vacuna)
);

-- 7. TABLA: CONTROL_ORDENO_LECHE (Relacion 1:N con BOVINO)
CREATE TABLE control_ordeno_leche (
    id_ordeno INTEGER PRIMARY KEY AUTOINCREMENT,
    id_bovino INTEGER NOT NULL,
    fecha_ordeno DATE NOT NULL,
    jornada VARCHAR(10) NOT NULL CHECK(jornada IN ('Manana', 'Tarde')),
    litros_producidos DECIMAL(5,2) NOT NULL CHECK(litros_producidos >= 0.0 AND litros_producidos <= 80.0),
    apta_para_venta BOOLEAN NOT NULL DEFAULT 1,
    ordenador_responsable VARCHAR(80),
    FOREIGN KEY (id_bovino) REFERENCES bovino(id_bovino) ON DELETE CASCADE
);

-- INDICES DE RENDIMIENTO
CREATE INDEX idx_bovino_arete ON bovino(codigo_arete);
CREATE INDEX idx_bovino_potrero ON bovino(id_potrero);
CREATE INDEX idx_bovino_estado ON bovino(estado);
CREATE INDEX idx_vacunacion_bovino ON registro_vacunacion(id_bovino);
CREATE INDEX idx_vacunacion_proxima ON registro_vacunacion(proxima_dosis);
CREATE INDEX idx_ordeno_bovino_fecha ON control_ordeno_leche(id_bovino, fecha_ordeno);

-- DATOS SEMILLA (20 POTREROS)
INSERT INTO potrero (numero_potrero, nombre_potrero, tipo_lote, capacidad_maxima, area_hectareas, tipo_pasto) VALUES
(1, 'Potrero 1 - Ordeño Principal', 'Produccion Leche', 25, 2.80, 'Kikuyo'),
(2, 'Potrero 2 - Ordeño Bajo', 'Produccion Leche', 25, 2.50, 'Kikuyo'),
(3, 'Potrero 3 - Ordeño La Represa', 'Produccion Leche', 20, 2.20, 'Brachiaria'),
(4, 'Potrero 4 - Ordeño El Plan', 'Produccion Leche', 25, 2.90, 'Kikuyo'),
(5, 'Potrero 5 - Ordeño La Ceiba', 'Produccion Leche', 20, 2.10, 'Kikuyo'),
(6, 'Potrero 6 - Ordeño Alto', 'Produccion Leche', 20, 2.00, 'Brachiaria'),
(7, 'Potrero 7 - Novillas de Levante', 'Novillas / Cria', 18, 1.80, 'Estrella'),
(8, 'Potrero 8 - Cachorras Destetas', 'Novillas / Cria', 15, 1.50, 'Kikuyo'),
(9, 'Potrero 9 - Novillas Proximas', 'Novillas / Cria', 18, 1.90, 'Estrella'),
(10, 'Potrero 10 - Terneros Cunas', 'Novillas / Cria', 12, 1.20, 'Kikuyo'),
(11, 'Potrero 11 - Terneras Cria', 'Novillas / Cria', 15, 1.40, 'Kikuyo'),
(12, 'Potrero 12 - Toros Reproductores', 'Toros / Ceba', 6, 2.50, 'Brachiaria Brizantha'),
(13, 'Potrero 13 - Novillos Ceba 1', 'Toros / Ceba', 15, 3.00, 'Brachiaria Decumbens'),
(14, 'Potrero 14 - Novillos Ceba 2', 'Toros / Ceba', 15, 2.80, 'Brachiaria Decumbens'),
(15, 'Potrero 15 - Vacas Horras', 'Vacas Secas / Horras', 16, 2.00, 'Kikuyo'),
(16, 'Potrero 16 - Maternidad / Preparto', 'Vacas Secas / Horras', 10, 1.20, 'Kikuyo'),
(17, 'Potrero 17 - Vacas en Secado', 'Vacas Secas / Horras', 14, 1.80, 'Estrella'),
(18, 'Potrero 18 - Descanso y Abono', 'Descanso / Rotacion', 0, 2.60, 'Kikuyo'),
(19, 'Potrero 19 - Recuperacion Pastura', 'Descanso / Rotacion', 0, 2.40, 'Brachiaria'),
(20, 'Potrero 20 - Banco Forrajero', 'Descanso / Rotacion', 0, 1.50, 'Corte Cuba 22');

INSERT INTO raza (nombre_raza, proposito) VALUES
('Brahman', 'Carne'),
('Gyr', 'Leche'),
('Holstein', 'Leche'),
('Normando', 'Doble Proposito'),
('Jersey', 'Leche');

INSERT INTO bovino (codigo_arete, nombre, sexo, fecha_nacimiento, peso_kg, estado, id_raza, id_potrero) VALUES
('ARETE-001', 'Mariposa', 'H', '2023-04-15', 420.50, 'Viva', 3, 1),
('ARETE-002', 'Toro Campeon', 'M', '2022-11-10', 780.00, 'Viva', 1, 12),
('ARETE-003', 'Lucero (Cachorra)', 'H', '2025-06-20', 140.00, 'Viva', 2, 8),
('ARETE-004', 'Campanita (Novilla)', 'H', '2024-08-05', 290.00, 'Viva', 5, 7),
('ARETE-005', 'Paloma', 'H', '2023-09-12', 390.00, 'Viva', 4, 1);

INSERT INTO ficha_medica_perfil (id_bovino, estado_reproductivo, en_tiempo_retiro, fecha_proximo_secado, alergias_observaciones) VALUES
(1, 'Lactancia', 0, '2026-12-15', 'En lote de ordeno principal'),
(2, 'Toro', 0, NULL, 'Toro reproductor activo'),
(3, 'Novilla', 0, NULL, 'Cachorra desteta en crecimiento'),
(4, 'Novilla', 0, NULL, 'Novilla proxima a primer servicio'),
(5, 'Lactancia', 1, '2026-11-20', 'En tratamiento antibiotico (Leche no apta para venta)');

INSERT INTO tipo_vacuna (nombre_vacuna, enfermedad, dosis_ml, frecuencia_meses) VALUES
('Aftosa Bivalente', 'Fiebre Aftosa', 2.0, 6),
('Cepa 19 / RB51', 'Brucelosis Bovina', 2.0, 12),
('Triple Bovina', 'Carbon / Septicemia', 5.0, 6);

INSERT INTO registro_vacunacion (id_bovino, id_vacuna, fecha_aplicacion, proxima_dosis, veterinario, observaciones) VALUES
(1, 1, '2026-05-10', '2026-11-10', 'Dr. Andres Villa', 'Ciclo ICA oficial'),
(2, 1, '2026-05-10', '2026-11-10', 'Dr. Andres Villa', 'Dosis reproductor'),
(3, 2, '2026-06-01', '2027-06-01', 'Dr. Andres Villa', 'Vacuna ternera');

INSERT INTO control_ordeno_leche (id_bovino, fecha_ordeno, jornada, litros_producidos, apta_para_venta, ordenador_responsable) VALUES
(1, '2026-08-22', 'Manana', 14.80, 1, 'Carlos Perez'),
(1, '2026-08-22', 'Tarde', 10.50, 1, 'Carlos Perez'),
(5, '2026-08-22', 'Manana', 9.00, 0, 'Carlos Perez');
