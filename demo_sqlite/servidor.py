import html
import sqlite3
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

BASE = Path(__file__).resolve().parent
DB = BASE / "proganado.db"
PLANTILLA = BASE / "plantilla.html"
ESTADOS = ("Activo", "En tratamiento", "Vendido")


def conectar():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    return conn


def listar(q="", estado=""):
    sql = "SELECT * FROM bovinos WHERE 1=1"
    params = []
    if q:
        sql += " AND (arete LIKE ? OR nombre LIKE ? OR raza LIKE ?)"
        like = f"%{q}%"
        params.extend([like, like, like])
    if estado in ESTADOS:
        sql += " AND estado = ?"
        params.append(estado)
    sql += " ORDER BY id DESC"
    with conectar() as conn:
        return conn.execute(sql, params).fetchall()


def insertar(datos):
    errores = []
    arete = datos.get("arete", "").strip()
    nombre = datos.get("nombre", "").strip()
    raza = datos.get("raza", "").strip()
    fecha = datos.get("fecha_nacimiento", "").strip()
    peso_txt = datos.get("peso_kg", "").strip()
    estado = datos.get("estado", "Activo").strip()

    if not arete:
        errores.append("El arete es obligatorio.")
    if not nombre:
        errores.append("El nombre es obligatorio.")
    if not raza:
        errores.append("La raza es obligatoria.")
    if estado not in ESTADOS:
        errores.append("El estado no es válido.")

    peso = 0.0
    try:
        peso = float(peso_txt)
        if peso <= 0:
            errores.append("El peso debe ser mayor que cero.")
    except ValueError:
        errores.append("El peso debe ser un número.")

    if fecha:
        try:
            datetime.strptime(fecha, "%Y-%m-%d")
        except ValueError:
            errores.append("La fecha debe tener el formato AAAA-MM-DD.")

    if errores:
        return errores

    try:
        with conectar() as conn:
            conn.execute(
                """
                INSERT INTO bovinos
                    (arete, nombre, raza, fecha_nacimiento, peso_kg, estado)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (arete, nombre, raza, fecha or None, peso, estado),
            )
        return []
    except sqlite3.IntegrityError:
        return [f"El arete {arete} ya existe. Usa uno diferente."]


def render(filas, q="", estado="", mensaje="", errores=None):
    cuerpo = []
    for f in filas:
        if f["estado"] == "Activo":
            badge = "bg-success"
        elif f["estado"] == "En tratamiento":
            badge = "bg-warning text-dark"
        else:
            badge = "bg-secondary"
        cuerpo.append(
            f"""
            <tr>
              <td>{f['id']}</td>
              <td><strong>{html.escape(f['arete'])}</strong></td>
              <td>{html.escape(f['nombre'])}</td>
              <td>{html.escape(f['raza'])}</td>
              <td>{html.escape(f['fecha_nacimiento'] or '—')}</td>
              <td>{f['peso_kg']:.1f} kg</td>
              <td><span class="badge {badge}">{html.escape(f['estado'])}</span></td>
            </tr>
            """
        )
    filas_html = "".join(cuerpo) or (
        '<tr><td colspan="7" class="text-center text-muted py-4">'
        "No hay bovinos con ese filtro.</td></tr>"
    )

    if errores:
        alerta = (
            '<div class="alert alert-danger"><ul class="mb-0">'
            + "".join(f"<li>{html.escape(e)}</li>" for e in errores)
            + "</ul></div>"
        )
    elif mensaje:
        alerta = f'<div class="alert alert-success">{html.escape(mensaje)}</div>'
    else:
        alerta = ""

    plantilla = PLANTILLA.read_text(encoding="utf-8")
    return (
        plantilla.replace("{{ALERTA}}", alerta)
        .replace("{{FILAS}}", filas_html)
        .replace("{{Q}}", html.escape(q))
        .replace("{{TOTAL}}", str(len(filas)))
        .replace("{{FILTRO_ACTIVO}}", "selected" if estado == "Activo" else "")
        .replace("{{FILTRO_TRATAMIENTO}}", "selected" if estado == "En tratamiento" else "")
        .replace("{{FILTRO_VENDIDO}}", "selected" if estado == "Vendido" else "")
    )


class Handler(BaseHTTPRequestHandler):
    def _enviar(self, codigo, contenido, tipo="text/html; charset=utf-8"):
        data = contenido.encode("utf-8")
        self.send_response(codigo)
        self.send_header("Content-Type", tipo)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        partes = urlparse(self.path)
        if partes.path == "/favicon.ico":
            self.send_response(204)
            self.end_headers()
            return
        if partes.path not in ("/", "/index.html"):
            self._enviar(404, "<h1>404 — Ruta no encontrada</h1>")
            return
        qs = parse_qs(partes.query)
        q = qs.get("q", [""])[0]
        estado = qs.get("estado", [""])[0]
        mensaje = "Bovino guardado correctamente." if qs.get("ok") else ""
        self._enviar(200, render(listar(q, estado), q=q, estado=estado, mensaje=mensaje))

    def do_POST(self):
        if urlparse(self.path).path != "/guardar":
            self._enviar(404, "<h1>404 — Ruta no encontrada</h1>")
            return
        largo = int(self.headers.get("Content-Length", 0))
        if largo <= 0:
            self._enviar(400, "<h1>400 — Formulario vacío</h1>")
            return
        datos = parse_qs(self.rfile.read(largo).decode("utf-8"))
        datos = {k: v[0] for k, v in datos.items()}
        errores = insertar(datos)
        if errores:
            self._enviar(200, render(listar(), errores=errores))
            return
        self.send_response(303)
        self.send_header("Location", "/?ok=1")
        self.end_headers()

    def log_message(self, fmt, *args):
        print(f"[{self.address_string()}] {fmt % args}")


if __name__ == "__main__":
    if not DB.exists():
        raise SystemExit("Falta proganado.db. Ejecuta primero: python init_db.py")
    print("ProGanado SQLite en http://127.0.0.1:8000")
    print("Detén el servidor con Ctrl+C")
    try:
        ThreadingHTTPServer(("127.0.0.1", 8000), Handler).serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
