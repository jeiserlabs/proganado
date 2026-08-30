# 🌿 PROTOCOLO DE RAMAS GIT, PULL REQUESTS & GOBERNANZA TECH LEAD
> **Tech Lead & QA Lead:** Jeiser Abraham Gutiérrez  
> **Repositorio Oficial:** [https://github.com/jeiser270997-source/ProGanado](https://github.com/jeiser270997-source/ProGanado)  
> **Propósito:** Guía de colaboración en Git/GitHub para que el equipo trabaje en ramas independientes y Jeiser apruebe los avances mediante Pull Requests.

---

## 🌳 1. ESTRUCTURA DE RAMAS (BRANCHING STRATEGY)

```
[ main ]  (PRODUCCIÓN / PROTEGIDA: Solo Jeiser fusiona aquí tras aprobar el Pull Request)
   ▲
   │ (Pull Request aprobado y testeado)
   │
   ├── [ feature/frontend-sebastian ]   ──> Avances en HTML5, CSS, Tailwind, vistas y maquetación.
   ├── [ feature/logica-emilio ]        ──> Avances en PSeInt, algoritmos de ordeño y días abiertos.
   ├── [ feature/legal-camila ]         ──> Avances en términos, formalización S.A.S., facturación y POS.
   └── [ feature/veterinaria-humberto ] ──> Vademécum de medicamentos, tiempos de retiro y QA médico.
```

---

## 🚀 2. PASO A PASO PARA CADA INTEGRANTE DEL EQUIPO

Cuando en el CESDE aprendan a usar Git y GitHub, cada compañero seguirá este flujo de 4 pasos:

### Paso 1: Clonar y crear su propia rama
```bash
# 1. Clonar el repositorio público
git clone https://github.com/jeiser270997-source/ProGanado.git
cd ProGanado

# 2. Crear y cambiarse a su rama personal (Ejemplo para Sebastián)
git checkout -b feature/frontend-sebastian
```

### Paso 2: Trabajar en sus archivos asignados
* **Sebastián:** Trabaja en la carpeta `02_Vistas_HTML5/`.
* **Emilio:** Trabaja en la carpeta `03_Logica_PSeInt/`.
* **Camila / Humberto:** Trabajan en `docs/` o documentación asignada.

### Paso 3: Guardar y subir sus cambios a GitHub
```bash
git add .
git commit -m "feat(frontend): Agregar tabla semántica de pesaje de ordeño AM/PM"
git push origin feature/frontend-sebastian
```

### Paso 4: Abrir un Pull Request (PR) en GitHub
1. Ir a [https://github.com/jeiser270997-source/ProGanado](https://github.com/jeiser270997-source/ProGanado).
2. Hacer clic en el botón verde **"Compare & pull request"**.
3. Seleccionar: `base: main` $\leftarrow$ `compare: feature/tu-rama`.
4. Asignar como Revisor (**Reviewer**) a **Jeiser Gutiérrez** (`jeiser270997-source`).

---

## 🛡️ 3. ROL DE JEISER (TECH LEAD & QA LEAD) EN LA REVISIÓN

Como Tech Lead, Jeiser revisará cada Pull Request verificando:
1. **Calidad de Código:** ¿Respeta la filosofía *Gentleman Programming* (archivos modulares <300 líneas, funciones puras, nombres descriptivos)?
2. **Integridad del Modelo:** ¿No rompe el esquema relacional de 12 tablas en 3FN?
3. **Lógica Zootécnica:** ¿Cumple con la inocuidad Cinta Roja, el acopio Colanta o el límite de 100 días abiertos?
4. **Merge a Producción:** Una vez validado, Jeiser hace clic en **"Merge pull request"**, integrando el avance a la rama principal `main`.
