# Demo SQLite — ProGanado M2

> **Alcance:** esta demo usa una tabla simplificada (`bovinos`) para enseñar el flujo formulario → POST → Python → SQLite → SELECT. **No es el DDL oficial de 12 tablas.** El modelo completo vive en `01_Base_de_Datos_SQL/schema_produccion_proganado_v3.sql` del repositorio `jeiserlabs/proganado`.

Módulo mínimo para demostrar el ciclo **formulario → POST → Python → SQLite → SELECT → tabla**.

## Requisitos

- Python 3.8 o superior (Windows: `python` o `py`).
- No requiere instalar Flask, Django ni ningún servidor de base de datos.

## Ejecutar

```bash
cd demo_sqlite
python init_db.py
python servidor.py
```

Abre en el navegador:

```
http://127.0.0.1:8000
```

Detén el servidor con `Ctrl + C`.

## Probar

1. Registra un bovino con arete `COL-1605`, nombre `Luna`, raza `Holstein`, peso `495.5`, estado `Activo`.
2. Verifica el mensaje verde y la fila en la tabla.
3. Busca `Luna` y filtra por estado.
4. Intenta registrar el mismo arete: debe rechazarlo por `UNIQUE`.
5. Detén el servidor, vuelve a iniciarlo y recarga: el dato sigue en `proganado.db`.

## Reiniciar la base

Con el servidor detenido:

```bash
rm proganado.db     # Git Bash
# o en PowerShell: Remove-Item proganado.db
python init_db.py
```

## Ver la base sin la página

```bash
python -c "import sqlite3; c=sqlite3.connect('proganado.db'); print(c.execute('SELECT * FROM bovinos').fetchall())"
```

## Seguridad de la demo

- Consultas parametrizadas con `?` (sin concatenar SQL).
- Escape de HTML con `html.escape` al mostrar datos.
- Validación en el navegador y en el servidor.
- El servidor escucha solo en `127.0.0.1`.
- No guarda contraseñas, cédulas, teléfonos ni correos.
- No es un sistema de producción: no tiene autenticación real.

## Archivos

| Archivo | Función |
|---|---|
| `init_db.py` | Crea `proganado.db`, la tabla `bovinos` y tres registros de ejemplo. |
| `servidor.py` | Servidor local, validación, INSERT, SELECT y render de la plantilla. |
| `plantilla.html` | Formulario Bootstrap y tabla de resultados. |
| `proganado.db` | Base generada (no se versiona). |
