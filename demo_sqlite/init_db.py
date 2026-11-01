import sqlite3
from pathlib import Path

DB = Path(__file__).with_name("proganado.db")


def main():
    with sqlite3.connect(DB) as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS bovinos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                arete TEXT NOT NULL UNIQUE,
                nombre TEXT NOT NULL,
                raza TEXT NOT NULL,
                fecha_nacimiento TEXT,
                peso_kg REAL NOT NULL CHECK (peso_kg > 0),
                estado TEXT NOT NULL DEFAULT 'Activo'
                    CHECK (estado IN ('Activo', 'En tratamiento', 'Vendido')),
                creado_en TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
            )
        """)
        conn.executemany(
            """
            INSERT OR IGNORE INTO bovinos
                (arete, nombre, raza, fecha_nacimiento, peso_kg, estado)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            [
                ("COL-1601", "Estrella", "Holstein", "2022-03-14", 520.5, "Activo"),
                ("COL-1599", "Mora", "Normando", "2021-11-02", 480.0, "En tratamiento"),
                ("COL-1603", "Gitana", "Jersey", "2023-01-20", 410.3, "Activo"),
            ],
        )
    print(f"Base lista en: {DB}")


if __name__ == "__main__":
    main()
