-- ==============================================================================
-- PROGANADO SaaS - ESQUEMA BASE PARA CLASE CESDE (SÓLO TABLAS Y LLAVES PRIMARIAS)
-- Fecha: 26-Sep-2026 | Asignatura: Gestión de Bases de Datos (Prof. Felipe Piedrahita)
-- Objetivo: Esquema limpio sin restricciones (sin Foreign Keys, sin Checks, sin Uniques)
--           listo para implementar las reglas de negocio y restricciones durante la clase.
-- Compatible con: SQL Server (T-SQL) y SQLite / PostgreSQL.
-- ==============================================================================

-- 1. USUARIOS
CREATE TABLE usuarios (
    id_usuario VARCHAR(50) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    contrasena_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    fecha_registro DATETIME,
    CONSTRAINT pk_usuarios PRIMARY KEY (id_usuario)
);

-- 2. FINCAS
CREATE TABLE fincas (
    id_finca VARCHAR(50) NOT NULL,
    id_usuario VARCHAR(50) NOT NULL,
    nombre_finca VARCHAR(100) NOT NULL,
    documento_titular VARCHAR(50) NOT NULL,
    codigo_ica_predio VARCHAR(50) NOT NULL,
    municipio VARCHAR(100) NOT NULL,
    CONSTRAINT pk_fincas PRIMARY KEY (id_finca)
);

-- 3. SUSCRIPCIONES SAAS
CREATE TABLE suscripciones_saas (
    id_suscripcion VARCHAR(50) NOT NULL,
    id_finca VARCHAR(50) NOT NULL,
    plan_tipo VARCHAR(50) NOT NULL,
    estado_acceso VARCHAR(50) NOT NULL,
    limite_vacas INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_vencimiento DATE,
    CONSTRAINT pk_suscripciones PRIMARY KEY (id_suscripcion)
);

-- 4. ENTREGAS ACOPIO
CREATE TABLE entregas_acopio (
    id_entrega VARCHAR(50) NOT NULL,
    id_finca VARCHAR(50) NOT NULL,
    fecha_entrega DATE NOT NULL,
    litros_totales DECIMAL(10,2) NOT NULL,
    valor_bruto_est DECIMAL(12,2) NOT NULL,
    recuento_ufc INT,
    numero_tiquete VARCHAR(50),
    litros_facturados DECIMAL(10,2),
    precio_litro_real DECIMAL(10,2),
    valor_pagado_real DECIMAL(12,2),
    diferencia_litros DECIMAL(10,2),
    CONSTRAINT pk_entregas_acopio PRIMARY KEY (id_entrega)
);

-- 5. POTREROS
CREATE TABLE potreros (
    id_potrero VARCHAR(50) NOT NULL,
    id_finca VARCHAR(50) NOT NULL,
    nombre_potrero VARCHAR(100) NOT NULL,
    dias_ocupacion INT NOT NULL,
    dias_descanso_prv INT NOT NULL,
    CONSTRAINT pk_potreros PRIMARY KEY (id_potrero)
);

-- 6. RAZAS
CREATE TABLE razas (
    id_raza VARCHAR(50) NOT NULL,
    nombre_raza VARCHAR(100) NOT NULL,
    descripcion_proposito VARCHAR(255) NOT NULL,
    CONSTRAINT pk_razas PRIMARY KEY (id_raza)
);

-- 7. BOVINOS
CREATE TABLE bovinos (
    id_bovino VARCHAR(50) NOT NULL,
    id_finca VARCHAR(50) NOT NULL,
    id_potrero VARCHAR(50),
    id_raza VARCHAR(50) NOT NULL,
    sexo VARCHAR(20) NOT NULL,
    estado_fisiologico VARCHAR(50) NOT NULL,
    estado_vital VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    CONSTRAINT pk_bovinos PRIMARY KEY (id_bovino)
);

-- 8. MARCACIONES
CREATE TABLE marcaciones (
    id_marcacion VARCHAR(50) NOT NULL,
    id_bovino VARCHAR(50) NOT NULL,
    tipo_marca VARCHAR(50) NOT NULL,
    codigo_valor VARCHAR(50) NOT NULL,
    estado_activo INT NOT NULL,
    CONSTRAINT pk_marcaciones PRIMARY KEY (id_marcacion)
);

-- 9. MEDICAMENTOS
CREATE TABLE medicamentos (
    id_medicamento VARCHAR(50) NOT NULL,
    nombre_farmaco VARCHAR(100) NOT NULL,
    dias_retiro_ica INT NOT NULL,
    CONSTRAINT pk_medicamentos PRIMARY KEY (id_medicamento)
);

-- 10. TRATAMIENTOS SANITARIOS
CREATE TABLE tratamientos_sanitarios (
    id_tratamiento VARCHAR(50) NOT NULL,
    id_bovino VARCHAR(50) NOT NULL,
    tipo_procedimiento VARCHAR(100) NOT NULL,
    id_medicamento VARCHAR(50),
    fecha_tratamiento DATE NOT NULL,
    dosis_ml DECIMAL(8,2),
    CONSTRAINT pk_tratamientos PRIMARY KEY (id_tratamiento)
);

-- 11. PESAJES LECHE
CREATE TABLE pesajes_leche (
    id_pesaje VARCHAR(50) NOT NULL,
    id_bovino VARCHAR(50) NOT NULL,
    fecha_pesaje DATE NOT NULL,
    hora_pesaje TIME NOT NULL,
    litros_obtenidos DECIMAL(8,2) NOT NULL,
    CONSTRAINT pk_pesajes_leche PRIMARY KEY (id_pesaje)
);

-- 12. EVENTOS REPRODUCTIVOS
CREATE TABLE eventos_reproductivos (
    id_evento VARCHAR(50) NOT NULL,
    id_bovino VARCHAR(50) NOT NULL,
    tipo_evento VARCHAR(50) NOT NULL,
    fecha_evento DATE NOT NULL,
    dias_abiertos_calc INT,
    diagnostico_palpacion VARCHAR(100),
    costo_procedimiento DECIMAL(10,2),
    CONSTRAINT pk_eventos_reproductivos PRIMARY KEY (id_evento)
);
