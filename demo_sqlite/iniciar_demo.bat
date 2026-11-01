@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Iniciando ProGanado - Demo SQLite...
python init_db.py
start "" http://127.0.0.1:8000
python servidor.py
pause
