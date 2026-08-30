-- ==============================================================================
-- PROGANADO - SISTEMA INTEGRAL DE GESTION GANADERA Y TRAZABILIDAD LECHERA
-- Esquema de Base de Datos Relacional Normalizado (3FN) - Version Definitiva
-- Validado con Operativa Real de Finca Lechera (Colanta / 163 Cabezas / Cinta Roja)
-- ==============================================================================

-- 1. ESTRUCTURA PREDIAL Y POTREROS (VOISIN)
CREATE TABLE IF NOT EXISTS hacienda_predio (
    id_hacienda INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_hacienda VARCHAR(100) NOT NULL,
    codigo_predio_ica VARCHAR(30) UNIQUE,
    departamento VARCHAR(50) NOT NULL DEFAULT 'Antioquia',
    municipio VARCHAR(50) NOT NULL DEFAULT 'Santa Rosa de Osos',
    vereda VARCHAR(80),
    area_total_hectareas DECIMAL(10,2) CHECK (area_total_hectareas > 0),
    capacidad_maxima_animales INTEGER NOT NULL DEFAULT 210,
    propietario_nombre VARCHAR(100) NOT NULL,
    telefono_contacto VARCHAR(20),
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS potrero (
    id_potrero INTEGER PRIMARY KEY AUTOINCREMENT,
    fk_hacienda INTEGER NOT NULL,
    numero_potrero INTEGER NOT NULL,
    nombre_potrero VARCHAR(60) NOT NULL,
    area_hectareas DECIMAL(8,2) NOT NULL CHECK (area_hectareas > 0),
    tipo_pasto VARCHAR(50) DEFAULT 'Kikuyo / Ryegrass',
    capacidad_maxima_cabezas INTEGER NOT NULL DEFAULT 40,
    dias_ocupacion_optimos INTEGER DEFAULT 2,
    dias_descanso_optimos INTEGER DEFAULT 30,
    estado_potrero VARCHAR(20) DEFAULT 'En_Descanso' CHECK (estado_potrero IN ('Ocupado', 'En_Descanso', 'En_Mantenimiento_Abono', 'Clausurado')),
    FOREIGN KEY (fk_hacienda) REFERENCES hacienda_predio(id_hacienda) ON DELETE CASCADE,
    UNIQUE(fk_hacienda, numero_potrero)
);

-- 2. CATALOGO ZOOTECNICO
CREATE TABLE IF NOT EXISTS raza (
    id_raza INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_raza VARCHAR(50) UNIQUE NOT NULL,
    codigo_fedegan VARCHAR(20),
    proposito VARCHAR(30) NOT NULL CHECK (proposito IN ('Leche', 'Carne', 'Doble_Proposito')),
    porcentaje_grasa_promedio DECIMAL(4,2) DEFAULT 3.80
);

-- 3. NUCLEO DE HOJA DE VIDA DEL BOVINO
CREATE TABLE IF NOT EXISTS bovino (
    id_bovino INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(60),
    sexo CHAR(1) NOT NULL CHECK (sexo IN ('H', 'M')),
    fecha_nacimiento DATE NOT NULL,
    peso_nacimiento_kg DECIMAL(6,2),
    estado_vital VARCHAR(20) NOT NULL DEFAULT 'Vivo' CHECK (estado_vital IN ('Vivo', 'Muerto', 'Vendido', 'Descartado')),
    estado_productivo VARCHAR(30) NOT NULL DEFAULT 'En_Lactancia' CHECK (estado_productivo IN ('En_Lactancia', 'Vaca_Seca', 'Novilla_Levante', 'Cria_Ternera', 'Toro_Repasador')),
    categoria_reproductiva VARCHAR(20) NOT NULL DEFAULT 'Buena' CHECK (categoria_reproductiva IN ('Excelente', 'Buena', 'Regular')),
    tipo_ingreso VARCHAR(30) NOT NULL DEFAULT 'Nacimiento' CHECK (tipo_ingreso IN ('Nacimiento', 'Compra', 'Arrendamiento', 'Donacion')),
    fecha_ingreso DATE NOT NULL,
    fk_raza INTEGER NOT NULL,
    fk_potrero_actual INTEGER,
    fk_padre INTEGER,
    fk_madre INTEGER,
    observaciones TEXT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_raza) REFERENCES raza(id_raza) ON DELETE RESTRICT,
    FOREIGN KEY (fk_potrero_actual) REFERENCES potrero(id_potrero) ON DELETE SET NULL,
    FOREIGN KEY (fk_padre) REFERENCES bovino(id_bovino) ON DELETE SET NULL,
    FOREIGN KEY (fk_madre) REFERENCES bovino(id_bovino) ON DELETE SET NULL
);

-- 4. TRAZABILIDAD HISTORICA DE IDENTIFICACION (ARETE A LOS 7 DIAS)
CREATE TABLE IF NOT EXISTS marcacion (
    id_marcacion INTEGER PRIMARY KEY AUTOINCREMENT,
    fk_bovino INTEGER NOT NULL,
    codigo_arete VARCHAR(30) NOT NULL,
    tipo_marca VARCHAR(30) NOT NULL DEFAULT 'Arete_Visual' CHECK (tipo_marca IN ('Arete_Visual', 'Caravana_RFID', 'Tatuaje_Oreja', 'Hierro')),
    fecha_colocacion DATE NOT NULL,
    fecha_retiro DATE,
    estado_marca VARCHAR(20) NOT NULL DEFAULT 'Activa' CHECK (estado_marca IN ('Activa', 'Inactiva_Reemplazada', 'Extraviada')),
    FOREIGN KEY (fk_bovino) REFERENCES bovino(id_bovino) ON DELETE CASCADE
);

-- 5. CONTROL LECHERO SEMANAL (PLANILLA AM / PM / 16L DORADO)
CREATE TABLE IF NOT EXISTS control_ordeno (
    id_ordeno INTEGER PRIMARY KEY AUTOINCREMENT,
    fk_bovino INTEGER NOT NULL,
    fecha_ordeno DATE NOT NULL,
    litros_am DECIMAL(5,2) NOT NULL DEFAULT 0 CHECK (litros_am >= 0),
    litros_pm DECIMAL(5,2) NOT NULL DEFAULT 0 CHECK (litros_pm >= 0),
    litros_total DECIMAL(5,2) GENERATED ALWAYS AS (litros_am + litros_pm) STORED,
    es_alta_produccion_16l BOOLEAN GENERATED ALWAYS AS (CASE WHEN (litros_am + litros_pm) >= 16.0 THEN 1 ELSE 0 END) STORED,
    apta_para_venta BOOLEAN NOT NULL DEFAULT 1,
    motivo_no_apta VARCHAR(100),
    ordenador_responsable VARCHAR(60),
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_bovino) REFERENCES bovino(id_bovino) ON DELETE CASCADE,
    UNIQUE(fk_bovino, fecha_ordeno)
);

-- 6. ACOPIO Y CONCILIACION SEMANAL CON COLANTA
CREATE TABLE IF NOT EXISTS acopio_colanta (
    id_acopio INTEGER PRIMARY KEY AUTOINCREMENT,
    fk_hacienda INTEGER NOT NULL,
    fecha_recogida DATE NOT NULL,
    numero_tiquete_colanta VARCHAR(40) UNIQUE NOT NULL,
    litros_reportados_tiquete DECIMAL(8,2) NOT NULL CHECK (litros_reportados_tiquete > 0),
    litros_calculados_sistema DECIMAL(8,2) NOT NULL,
    diferencia_merma_litros DECIMAL(8,2) GENERATED ALWAYS AS (litros_calculados_sistema - litros_reportados_tiquete) STORED,
    precio_litro_cop DECIMAL(8,2) DEFAULT 2100.00,
    total_liquidacion_cop DECIMAL(12,2) GENERATED ALWAYS AS (litros_reportados_tiquete * precio_litro_cop) STORED,
    conductor_carrotanque VARCHAR(80),
    FOREIGN KEY (fk_hacienda) REFERENCES hacienda_predio(id_hacienda) ON DELETE CASCADE
);

-- 7. EVENTOS REPRODUCTIVOS & CRONOGRAMA BIOLOGICO (PARCHES, CELOS, PALPACION)
CREATE TABLE IF NOT EXISTS evento_reproductivo (
    id_evento INTEGER PRIMARY KEY AUTOINCREMENT,
    fk_vaca INTEGER NOT NULL,
    fk_toro_pajilla INTEGER,
    codigo_pajilla_catalogo VARCHAR(50),
    tipo_evento VARCHAR(35) NOT NULL CHECK (tipo_evento IN (
        'Vitamina_ADE_Dia30', 
        'Parche_Estrotect_Dia50', 
        'Celo_Parche_Raspado', 
        'Inseminacion_Artificial', 
        'Monta_Toro_Repasador', 
        'Palpacion_Prenez_Positiva', 
        'Palpacion_Vacia', 
        'Secado_Obligatorio_Dia210', 
        'Parto', 
        'Aborto'
    )),
    fecha_evento DATE NOT NULL,
    numero_servicio_en_lactancia INTEGER DEFAULT 1,
    fecha_estimada_parto DATE,
    fecha_estimada_secado DATE,
    dias_abiertos_al_evento INTEGER,
    veterinario_tecnico VARCHAR(80),
    observaciones TEXT,
    FOREIGN KEY (fk_vaca) REFERENCES bovino(id_bovino) ON DELETE CASCADE,
    FOREIGN KEY (fk_toro_pajilla) REFERENCES bovino(id_bovino) ON DELETE SET NULL
);

-- 8. FARMACOS Y SANIDAD (PROTOCOLO CINTA ROJA & ORDEÑO EN BALDE)
CREATE TABLE IF NOT EXISTS farmaco_insumo (
    id_farmaco INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_comercial VARCHAR(80) NOT NULL,
    principio_activo VARCHAR(100) NOT NULL,
    registro_ica VARCHAR(40),
    tipo_farmaco VARCHAR(30) NOT NULL CHECK (tipo_farmaco IN ('Antibiotico', 'Antiinflamatorio', 'Vitamina_Mineral', 'Hormona_IATF', 'Vacuna', 'Desparasitante')),
    dias_retiro_leche INTEGER NOT NULL DEFAULT 0 CHECK (dias_retiro_leche >= 0),
    dias_retiro_carne INTEGER NOT NULL DEFAULT 0 CHECK (dias_retiro_carne >= 0)
);

CREATE TABLE IF NOT EXISTS tratamiento_sanitario (
    id_tratamiento INTEGER PRIMARY KEY AUTOINCREMENT,
    fk_bovino INTEGER NOT NULL,
    fk_farmaco INTEGER NOT NULL,
    fecha_aplicacion DATE NOT NULL,
    dosis_ml DECIMAL(6,2) NOT NULL CHECK (dosis_ml > 0),
    via_administracion VARCHAR(30) NOT NULL CHECK (via_administracion IN ('Intramamaria', 'Intramuscular', 'Subcutanea', 'Topica', 'Oral', 'Intravenosa')),
    diagnostico VARCHAR(100) NOT NULL,
    fecha_fin_retiro_leche DATE,
    tiene_cinta_roja_activa BOOLEAN DEFAULT 1,
    ordeno_en_balde_descarte BOOLEAN DEFAULT 1,
    veterinario_asesor VARCHAR(80),
    FOREIGN KEY (fk_bovino) REFERENCES bovino(id_bovino) ON DELETE CASCADE,
    FOREIGN KEY (fk_farmaco) REFERENCES farmaco_insumo(id_farmaco) ON DELETE RESTRICT
);

-- 9. TRAZABILIDAD DE ROTACION DE POTREROS (VOISIN)
CREATE TABLE IF NOT EXISTS movimiento_potrero (
    id_movimiento INTEGER PRIMARY KEY AUTOINCREMENT,
    fk_bovino INTEGER NOT NULL,
    fk_potrero_origen INTEGER,
    fk_potrero_destino INTEGER NOT NULL,
    fecha_traslado DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    motivo VARCHAR(40) NOT NULL DEFAULT 'Rotacion_Pastura',
    FOREIGN KEY (fk_bovino) REFERENCES bovino(id_bovino) ON DELETE CASCADE,
    FOREIGN KEY (fk_potrero_origen) REFERENCES potrero(id_potrero) ON DELETE SET NULL,
    FOREIGN KEY (fk_potrero_destino) REFERENCES potrero(id_potrero) ON DELETE RESTRICT
);

-- 10. SEGURIDAD & USUARIOS (ROLES: ASISTENTE HUB, VET, MAYORDOMO, DUEÑA)
CREATE TABLE IF NOT EXISTS usuario_sistema (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_completo VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(30) NOT NULL CHECK (rol IN ('Administrador_Duena', 'Asistente_Administrativo_Hub', 'Veterinario', 'Mayordomo_Campo')),
    activo BOOLEAN DEFAULT 1,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- TRIGGERS DE INTEGRIDAD ZOOTECNICA
CREATE TRIGGER IF NOT EXISTS trg_anti_consanguinidad_reproductor
BEFORE INSERT ON evento_reproductivo
FOR EACH ROW
WHEN NEW.tipo_evento IN ('Inseminacion_Artificial', 'Monta_Toro_Repasador') AND NEW.fk_toro_pajilla IS NOT NULL
BEGIN
    SELECT CASE
        WHEN (SELECT fk_padre FROM bovino WHERE id_bovino = NEW.fk_vaca) = NEW.fk_toro_pajilla
        THEN RAISE(ABORT, 'ERROR ZOOTECNICO P0: El reproductor es el PADRE directo de la hembra. Cruce prohibido.')
        WHEN (SELECT fk_madre FROM bovino WHERE id_bovino = NEW.fk_toro_pajilla) = NEW.fk_vaca
        THEN RAISE(ABORT, 'ERROR ZOOTECNICO P0: La hembra es la MADRE biologica del reproductor. Cruce prohibido.')
    END;
END;
