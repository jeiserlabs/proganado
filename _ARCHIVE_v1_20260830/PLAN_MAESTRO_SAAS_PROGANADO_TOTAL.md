# PLAN MAESTRO SAAS PROGANADO: ARQUITECTURA, PRODUCTO, ESTRATEGIA COMERCIAL & ESCALADO

[DOCUMENTO MAESTRO SSOT] Especificacion integral de ProGanado como producto SaaS agropecuario de alto impacto comercial, desde el modelo de datos relacional hasta la estrategia de captacion B2B en las cuencas lecheras de Colombia.

---

# CAPITULO 1: ARQUITECTURA TECNICA & MODELO DE DATOS

## 1.1. Modelo Entidad-Relacion (MER Chen) & Modelo Relacional (MR 3FN)
* **Artefacto Visual:** `docs/diagramas/ProGanado_Modelo_Entidad_Relacion_Chen.drawio` (12 entidades rectangulares, rombos con verbos semanticos, atributos en ovalos con PKs subrayadas y FKs punteadas).
* **Script SQL DDL:** `01_Base_de_Datos_SQL/schema_produccion_proganado_v3.sql` (12 tablas, 100% normalizado en 3FN).

```text
[ HACIENDA ] (1:N) ──> [ POTRERO ] (1:N) ──> [ BOVINO ] (1:N) ──> [ MARCACION (Historial Aretes) ]
                                                │
                 ┌──────────────────────────────┼──────────────────────────────┐
                 ▼                              ▼                              ▼
        [ CONTROL_ORDENO ]             [ CONTROL_PESAJE ]           [ EVENTO_REPRODUCTIVO ]
    (Litros x Jornada M/T/N)           (Pesajes y GDP kg)             (Celo 21d / Secado 223d)
                 │                                                             │
                 ▼                                                             ▼
     [ TRATAMIENTO_SANITARIO ] <── (1:N) ── [ FARMACO_INSUMO ]      [ MOVIMIENTO_POTRERO ]
    (Bloqueo Leche Retiro)                (Dias Carencia ICA)        (Rotacion Pasturas)
```

## 1.2. Modulos de Funciones del Backend (Express.js / Clean Architecture)
1. **Modulo Identificacion & Inventario (`/api/v1/bovinos`):**
   * Hoja de vida digital unica (ID interno permanente).
   * Trazabilidad de aretes 1:N (reasignacion historica de aretes sin duplicar animales).
   * Arbol genealogico (Padre/Madre) con validacion anti-consanguinidad en 1er y 2do grado.
2. **Modulo Lacteo & Calidad (`/api/v1/ordeno`):**
   * Registro agil por jornadas (`Mañana` 4:00 AM, `Tarde` 2:00 PM, `Noche` 6:00 PM).
   * Regla Fail-Closed Sanitaria: Si la vaca tiene un tratamiento activo, la leche queda marcada `apta_para_venta = FALSE` y se emite alerta visual roja.
3. **Modulo Reproductivo & Fertilidad (`/api/v1/reproduccion`):**
   * Motor de calculo estral de 21 dias: Dispara alertas predictivas de celo para inseminacion o monta.
   * Calculo automatico de fecha estimada de parto (283 dias) y fecha obligatoria de secado (dia 223 / 60 dias pre-parto).
4. **Modulo Sanitario & Farmacologico (`/api/v1/sanidad`):**
   * Catalogo de farmacos con dias de retiro para leche y carne segun resoluciones BPG del ICA.
   * Calculadora automatica de `fecha_fin_retiro = fecha_aplicacion + dias_carencia`.
5. **Modulo Pastoreo & Potreros (`/api/v1/potreros`):**
   * Trazabilidad de rotacion Voisin (dias de ocupacion vs dias de descanso).
   * Semáforo de potreros: Verde (Descanso), Azul (Ocupado), Amarillo (Mantenimiento).
6. **Modulo Seguridad & Autenticacion (`/api/v1/auth`):**
   * Tokens JWT stateless con expiracion y refresh tokens.
   * Control de acceso basado en roles (RBAC): `Administrador`, `Asistente_Administrativo`, `Veterinario`, `Capataz`.

---

# CAPITULO 2: PROPUESTAS DE VALOR & PRICING TIERS

| Plan SaaS | Perfil de Cliente | Tamano de Hato | Precio Mensual (COP) | Funcionalidades Incluidas |
|---|---|:---:|:---:|---|
| **Finca Tradicional (Starter)** | Pequenos productores en transicion de papel a digital. | < 50 reses | **$50.000 COP / mes** ($500k COP/año pago anticipado) | Hoja de vida digital, historial de aretes, registro basico de ordeño y alertas de celo por WhatsApp. |
| **Hato Lechero (Profesional)** | Fincas medianas lecheras con doble ordeño diario. | 50 a 200 reses | **$120.000 COP / mes** ($1.2M COP/año) | Todo lo anterior + Modulo sanitario con bloqueo automatico por retiro, rotacion de potreros, reportes de produccion por vaca y 3 usuarios. |
| **Hacienda Agroempresarial (Enterprise)** | Grandes haciendas ganaderas, criaderos puros y cebaderos. | > 200 reses | **$250.000 COP / mes** ($2.5M COP/año) | Todo lo anterior + Multi-predio, arbol genealogico avanzado, calculo de GDP de carne, auditoria ICA/BPG lista para exportar en PDF/Excel y soporte prioritario. |

---

# CAPITULO 3: ZONAS GEOGRAFICAS MAPEADAS EN COLOMBIA (FOCO DE ENTRADA)

```text
                                  COLOMBIA
                      ┌───────────────────────────────┐
                      │ 1. CUENCA NORTE DE ANTIOQUIA  │ (Foco Primario P0)
                      │    Santa Rosa, San Pedro,     │ 70%+ de la leche de Antioquia
                      │    Entrerríos, Donmatías      │ Alta densidad, cooperativas
                      └───────────────┬───────────────┘
                                      ▼
                      ┌───────────────────────────────┐
                      │ 2. VALLE DE UBATÉ & CHIQUINQUIRÁ (Foco Expansión P1)
                      │    Cundinamarca / Boyacá      │ Capital lechera de Colombia
                      │    Ubaté, Simijaca, Chiquinquirá Alta necesidad de trazabilidad
                      └───────────────┬───────────────┘
                                      ▼
                      ┌───────────────────────────────┐
                      │ 3. TRÓPICO BAJO / DOBLE PROPÓSITO (Foco P2)
                      │    Magdalena Medio / Córdoba  │ Carne + Leche (GDP + Ordeño)
                      │    Montería, Puerto Berrío    │ Grandes extensiones y aretes
                      └───────────────────────────────┘
```

### Justificación Estratégica del Norte de Antioquia (P0):
* Ubicación a menos de 1 hora de Medellín (fácil desplazamiento para demostraciones en campo).
* Productores afiliados a Colanta, Alquería y Parmalat que sufren penalizaciones económicas severas si entregan leche con antibióticos.

---

# CAPITULO 4: ESTRATEGIAS DE VENTA B2B & CAPTACION ($0 CAC)

1. **Alianza con Médicos Veterinarios y Zootecnistas (Canal de Afiliados 20%):**
   * El veterinario atiende entre 10 y 25 fincas. Se le ofrece acceso gratuito para gestionar todas sus fincas desde una sola pantalla + **20% de comisión recurrente mensual** por cada finca que active una suscripción paga.
2. **Puerta a Puerta en Almacenes Agropecuarios y Cooperativas:**
   * Charlas técnicas gratuitas de 15 minutos en comités locales sobre: *"Cómo evitar el decomiso de tanques de leche por periodos de retiro"*. Al final se entrega una prueba gratis de 30 días de ProGanado.
3. **Estrategia "Caballo de Troya" (Digitalización Inicial Gratuita):**
   * El equipo visita la finca y le digitaliza el cuaderno de papel actual en 30 minutos. El ganadero ve la hoja de vida de sus vacas en su celular de inmediato. La fricción de adopción baja a cero.

---

# CAPITULO 5: ELEVATOR PITCHS ADAPTADOS POR ACTOR CLAVE

### 5.1. Pitch para el Dueño de Finca / Ganadero Tradicional
> *"Don Fernando, cada vez que una vaca entra en celo y nadie la ve en el potrero, usted pierde 350 mil pesos en comida y leche que no va a producir ese mes. Y peor aún: con una sola vaca que ordeñen con antibiótico por error, le botan el tanque entero en la cooperativa. ProGanado le avisa en su celular qué vacas están en celo hoy y le bloquea en rojo las vacas en tratamiento para que no pierda un solo peso. Cuesta menos de lo que vale un bulto de concentrado al mes."*

### 5.2. Pitch para la Asistente Administrativa
> *"¿Cansada de descifrar las planillas arrugadas y manchadas que trae el capataz a las 6 de la tarde para pasarlas a Excel? Con ProGanado registras el ordeño por jornadas en 2 minutos, el sistema te calcula los totales automáticamente y te genera el reporte de la semana con un solo clic. Cero horas extras pasando datos a mano."*

### 5.3. Pitch para el Médico Veterinario / Asesor Técnico
> *"Doctor, usted atiende 15 fincas y cuando llega a revisar una vaca, nadie sabe cuándo fue el último parto ni qué antibiótico le pusieron la semana pasada. Con ProGanado usted abre la app en su teléfono, busca el arete y ve la hoja de vida médica completa al instante. Además, por cada finca que use el sistema con usted, recibe una comisión mensual recurrente."*

---

# CAPITULO 6: PROYECCION FINANCIERA & METAS ESCALONADAS

```text
METAS TEMPORALES PROGANADO:
┌─────────────────────────────────────────────────────────────────────────────┐
│ CORTO PLAZO (Mes 1 a 6) — Fase Validación & Piloto                          │
│ • Meta Clientes: 15 fincas en Norte de Antioquia.                           │
│ • Ingresos Recurrentes (MRR): $1.8M - $2.5M COP/mes.                        │
│ • Infraestructura: $0 USD (PostgreSQL / Supabase Free + GitHub Pages).      │
│ • Meta de Producto: Sustentación con honores CESDE + 100% de apego en campo.│
├─────────────────────────────────────────────────────────────────────────────┤
│ MEDIANO PLAZO (Mes 6 a 18) — Fase Expansión Regional                        │
│ • Meta Clientes: 80 fincas (Antioquia + Cundinamarca).                      │
│ • Ingresos Recurrentes (MRR): $9.6M - $12M COP/mes (~$3.000 USD/mes).       │
│ • Infraestructura: Migración a AWS (Fase 1: ~$35 USD/mes).                  │
│ • Equipo: 1 Vendedor en campo + Soporte técnico dedicado.                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ LARGO PLAZO (Año 2 a 4) — Consolidación Nacional & SaaS Escala              │
│ • Meta Clientes: 500+ haciendas en Colombia y Centroamérica.                │
│ • Ingresos Recurrentes (MRR): $60M - $80M COP/mes (~$18k - $22k USD/mes).   │
│ • Infraestructura: AWS Nube Total (Fase 2: Multi-AZ, SQS, App Runner, WAF). │
│ • Valoración de Empresa: $1.5M - $2.5M USD.                                 │
└─────────────────────────────────────────────────────────────────────────────┘
```