# ProGanado — Prototipo Interactivo de Interfaz (v1.0)

> **Módulo:** Frontend de Exploración & Panel de Control Ganadero  
> **Autor Base:** Emilio Villanueva  
> **Integración & Arquitectura:** Jeiser Gutiérrez (Tech Lead)  
> **Propósito:** Base interactiva para visualización del hato, trazabilidad y pruebas de experiencia de usuario (UX).

---

## 📋 Descripción General

Este módulo contiene el primer prototipo visual e interactivo de **ProGanado**. Permite explorar la experiencia de usuario que tendrá el sistema en producción para la gestión de hatos bovinos, registro de animales, visualización de fichas zootécnicas por arete y control de roles.

Actualmente funciona como una **maqueta desacoplada**:
* **Almacenamiento actual:** `localStorage` y `sessionStorage` del navegador para simulación rápida.
* **Autenticación:** Flujo en dos pasos con simulación local de códigos de seguridad.
* **Fase futura (Fase 2):** Conexión vía API REST hacia la base de datos oficial de 12 tablas en 3FN (`01_Base_de_Datos_SQL/schema_produccion_proganado_v3.sql`).

---

## 🚀 Cómo Ejecutarlo Localmente

### Opción 1: Con un solo clic (Recomendada)
Haz doble clic sobre el archivo:
```text
Iniciar ProGanado.bat
```
Esto abrirá la consola de Python, iniciará el servidor local en el puerto `8899` y desplegará la interfaz automáticamente en tu navegador por defecto.

### Opción 2: Desde la Terminal
```powershell
cd prototipo_interfaz
python servidor.py
```
Luego abre en el navegador:
```text
http://127.0.0.1:8899/index.html
```

---

## 🔑 Credenciales del Modo Demo

El prototipo viene con un usuario demo local; no usa correos ni contraseñas reales:

* **Usuario / Correo:** `demo@proganado.local`
* **Contraseña:** `demo`
* **Segundo Factor (2FA):** al ingresar las credenciales, el aviso amarillo muestra el código de 6 dígitos del modo demo. Ingrésalo para acceder al panel principal.

> El navegador ya no carga `auth_config.js` (el servidor lo bloquea). Las cuentas reales y los secretos van al backend en la Fase 2; aquí solo existe el usuario demo. Las credenciales locales que existían en el equipo se retiraron: si se usaron, deben rotarse.

---

## 📁 Estructura del Prototipo

* `index.html`: Estructura principal de vistas (Panel inicio, Hato ganadero, Salud, Reproducción, Ordeño, Usuarios).
* `app.js`: Lógica de renderizado dinámico de tarjetas, filtros por potrero y modales de registro.
* `auth.js`: Lógica de autenticación, roles (Admin / Usuario), hashing SHA-256 y control de intentos fallidos.
* `servidor.py`: Servidor HTTP ligero en Python para despacho de estáticos y endpoints de código 2FA.
* `styles.css`, `auth.css`, `enhancements.css`, `funciones.css`: Capa de estilos visuales responsive.
* `assets/`: Logotipo, recursos gráficos de UI y galería de miniaturas de aretes de ganado (`assets/ganado/`).
