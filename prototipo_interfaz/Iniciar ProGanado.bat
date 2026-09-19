@echo off
REM ============================================================
REM  ProGanado — Arranque con un solo clic
REM  Inicia el servidor local (página + códigos de seguridad)
REM  y abre la página en tu navegador.
REM ============================================================
title ProGanado — Servidor Local
cd /d "%~dp0"
echo.
echo   ====================================================
echo     Iniciando ProGanado (Prototipo Interfaz)
echo     Direccion local: http://127.0.0.1:8899/index.html
echo     Para detener el servidor: Cierra esta ventana
echo   ====================================================
echo.
start "" http://127.0.0.1:8899/index.html
python servidor.py
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] No se pudo iniciar servidor.py con Python.
    echo Verifica que Python este instalado y agregado al PATH.
    echo.
)
pause