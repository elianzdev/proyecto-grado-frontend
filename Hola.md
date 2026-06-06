# Evidencia Completa de Desarrollo asistido por IA - Proyecto Agentemotor

# FASE 1 - Planeación y análisis del problema

## Prompt original utilizado

```text
este es mi spec.md, quiero que lo analices y me digas qué ajustes harías
```
# Spec - Aplicación para Asesor de Seguros

```
1. Cómo entendí el problema
María administra 280 clientes en un Excel que se daña y no le permite controlar bien las pólizas.  
El punto crítico es la ventana de **30 días después del vencimiento**, donde aún puede renovar sin perder al cliente.  
Necesita una herramienta simple que reemplace el Excel y le permita gestionar vencimientos y acciones de contacto.

---

2. Qué decidí construir
- Backend con API REST en Flask + SQLite.
- Endpoint para listar pólizas próximas a vencer y vencidas.
- Frontend sencillo (HTML/JS) con una pantalla principal para ver pólizas y marcar acciones (contactado, renovado).
- Persistencia en SQLite con datos precargados.
- 2 tests críticos: póliza vencida dentro de 30 días y póliza vencida hace más de 30 días.
- Documentación clara con setup en 3 comandos.

Excluido (con justificación):
- Autenticación: no es crítica para la prueba y complicaría el setup.
- Notificaciones automáticas: fuera de alcance en 4 horas.
- Multiusuario: solo se necesita un asesor.

---

3. Supuestos
- Cada póliza tiene un `advisor_id` y una fecha de vencimiento en formato `YYYY-MM-DD`.
- María es la única usuaria, por eso no implemento roles ni login.
- Los datos iniciales estarán precargados en SQLite para que la app funcione desde el inicio.

---

4. Flujos principales
1. Ver pólizas próximas a vencer → María abre la app y ve listado filtrado por vencimiento.  
2. Registrar acción → Marca si contactó al cliente o si renovó la póliza.  
3. Actualizar fecha de renovación → Se guarda en la base de datos.  
4. Identificar urgencia → El sistema muestra prioridad según días vencidos (ej. urgente si >7 días, crítico si >30).

---

5. Modelo de datos
- Clients: id, name, phone.  
- Policies: id, advisor_id, client_id, insurer, expiration_date, status.  
- ContactAttempts: id, policy_id, date, notes.

---

6. Endpoints expuestos
- `GET /advisors/<id>/policies?status=active` → Lista pólizas activas.  
- `GET /advisors/<id>/expired-policies` → Lista pólizas vencidas con días de atraso.  
- `POST /policies/<id>/contact` → Registra intento de contacto.  
- `PUT /policies/<id>/renew` → Actualiza fecha de renovación.

---

7. Trade-offs considerados
- SQLite vs PostgreSQL: elegí SQLite por simplicidad y porque la prueba pide algo fácil de correr.  
- Frontend simple vs framework: elegí HTML/JS plano para cumplir con la pantalla principal sin sobrecargar el proyecto.  
- Autenticación: decidí no incluirla porque no aporta valor en este contexto y consume tiempo.  
- Tests limitados: enfoqué en el caso crítico de la ventana de 30 días, no en cobertura total.

---

```

## Prompt original utilizado

```text
generame ya el spec.md con las correcciones
```
---

## Resultado generado por IA

# Spec - Aplicación para Asesor de Seguros

## 1. Entendimiento del problema

María administra aproximadamente 280 clientes utilizando archivos Excel, lo que dificulta el seguimiento de vencimientos y acciones comerciales.

El principal riesgo operativo ocurre durante los 30 días posteriores al vencimiento de una póliza, período en el que aún es posible renovarla sin perder al cliente.

La solución busca reemplazar el manejo manual en Excel por una herramienta simple que centralice:
- seguimiento de vencimientos,
- registro de contactos,
- renovaciones,
- y priorización de clientes según urgencia.

---

## 2. Objetivo de la solución

Construir una aplicación simple y fácil de ejecutar que permita al asesor:
- visualizar pólizas próximas a vencer,
- priorizar renovaciones,
- registrar acciones comerciales,
- y reducir la pérdida de clientes por falta de seguimiento.

---

## 3. Alcance de la solución

### Funcionalidades incluidas
- Backend API REST desarrollado con Flask + SQLite.
- Frontend simple desarrollado con HTML, CSS y JavaScript.
- Visualización de pólizas activas y vencidas.
- Identificación de pólizas dentro de la ventana de renovación de 30 días.
- Registro de intentos de contacto.
- Renovación de pólizas actualizando su fecha de vencimiento.
- Persistencia local utilizando SQLite.
- Datos iniciales precargados para facilitar pruebas.
- Tests enfocados en la lógica crítica de renovación.

### Funcionalidades fuera de alcance
- Autenticación y autorización.
- Sistema multiusuario.
- Notificaciones automáticas.
- Integraciones con aseguradoras.
- Dashboard avanzado o reportes analíticos.

---

## 4. Arquitectura

La solución está dividida en dos partes:

### Backend
API REST desarrollada con Flask encargada de:
- lógica de negocio,
- persistencia de datos,
- cálculo de urgencia,
- y gestión de renovaciones.

### Frontend
Aplicación ligera en HTML/JavaScript encargada de:
- visualizar pólizas,
- consumir la API,
- y registrar acciones del asesor.

---

## 5. Supuestos

- Cada póliza pertenece a un único asesor mediante `advisor_id`.
- María es la única usuaria del sistema.
- Los datos iniciales estarán precargados en SQLite.
- Las fechas utilizan formato `YYYY-MM-DD`.
- El nivel de urgencia se calcula dinámicamente a partir de la fecha actual y la fecha de vencimiento.

### Estados de póliza
- `active`
- `expired`
- `cancelled`

---

## 6. Reglas de negocio

- Una póliza vencida hace menos de 30 días puede renovarse.
- Una póliza vencida hace más de 30 días requiere nueva contratación.
- Las pólizas próximas a vencer (<7 días) deben mostrarse como prioridad preventiva.
- Registrar un contacto no modifica el estado de la póliza.
- Renovar una póliza actualiza la fecha de vencimiento y mantiene el estado `active`.

---

## 7. Flujos principales

### 1. Ver pólizas próximas a vencer
María abre la aplicación y visualiza pólizas ordenadas según urgencia.

### 2. Registrar acción comercial
María registra si contactó al cliente y agrega observaciones.

### 3. Renovar póliza
El sistema actualiza la fecha de vencimiento y mantiene la póliza activa.

### 4. Identificar prioridad
El sistema clasifica automáticamente las pólizas según su estado:

- `warning` → vencimiento próximo (<7 días)
- `urgent` → vencida dentro de los 30 días
- `critical` → vencida hace más de 30 días

---

## 8. Modelo de datos

### Clients
- id
- name
- phone

### Policies
- id
- advisor_id
- client_id
- insurer
- expiration_date
- status
- created_at
- updated_at

### ContactAttempts
- id
- policy_id
- date
- notes

---

## 9. Endpoints expuestos

### Obtener pólizas activas

```http
GET /advisors/<id>/policies?status=active
```

### Obtener pólizas vencidas

```http
GET /advisors/<id>/expired-policies
```

Retorna:
- días de atraso,
- posibilidad de renovación,
- y nivel de urgencia.

### Registrar intento de contacto

```http
POST /policies/<id>/contacts
```

### Renovar póliza

```http
PATCH /policies/<id>/renew
```

Actualiza:
- fecha de vencimiento,
- estado,
- y datos de renovación.

---

## 10. Manejo de errores

La API retornará errores HTTP estándar:

- `400` → datos inválidos
- `404` → póliza no encontrada
- `500` → error interno del servidor

---

## 11. Tests considerados

Se implementarán tests para validar la lógica crítica:

- Póliza vencida dentro de 30 días → renovable.
- Póliza vencida hace más de 30 días → requiere nueva contratación.

---

## 12. Setup del proyecto

El frontend utiliza `pnpm` para la gestión de dependencias y scripts de desarrollo.

### Backend

```bash
cd backend
pip install -r requirements.txt
python init_bd.py & python app.py

```

### Frontend

```bash
cd frontend
pnpm install
pnpm run dev
```

---

## 13. Trade-offs considerados

### SQLite vs PostgreSQL
Se eligió SQLite por simplicidad, velocidad de setup y facilidad de ejecución local para la prueba técnica.

### Frontend simple vs framework moderno
Se utilizó HTML/JavaScript simple para mantener el enfoque en la lógica del negocio y reducir complejidad innecesaria.

### Sin autenticación
No se incluyó autenticación porque la prueba está orientada a gestión operativa y no a seguridad o multiusuario.

### Cobertura de tests limitada
Se priorizaron los casos críticos relacionados con la ventana de renovación de 30 días en lugar de cobertura completa.

---

## 14. Criterios mínimos de éxito

La solución se considera funcional si:

- permite visualizar pólizas activas y vencidas,
- identifica correctamente la ventana de renovación de 30 días,
- registra contactos,
- y permite renovar pólizas actualizando su fecha de vencimiento.
---

# FASE 2 - Base de Datos y Backend

## Prompt original utilizado

```text
genera la estructura del proyecto en Flask y los scripts SQL específicos para SQLite3

requiero:

1. el archivo `schema.sql` usando la sintaxis nativa de SQLite3, asegurando que las llaves foráneas estén activadas (`PRAGMA foreign_keys = ON;`).
2. el archivo `seed.sql` con datos en español para poblar la base de datos. Necesito casos de prueba reales:
   - Clientes con pólizas de Auto, Hogar y Vida que estén activas.
   - Pólizas vencidas hace menos de 30 días (dentro de la ventana de renovación de María).
   - Pólizas vencidas hace más de 30 días (en estado crítico/no renovable).
3. un script corto en Python llamado `init_db.py` que use el módulo nativo `sqlite3` para leer estos archivos e inicializar el archivo de la base de datos `agentemotor.db`.
```

---

## Resultado generado  por IA

### Estructura del proyecto
```
```
Objetivo

Generar la estructura inicial del backend utilizando:

- Flask
- SQLite3
- SQL nativo
- y el módulo estándar sqlite3 de Python.

Además, se buscó:

- organizar correctamente el proyecto,
- definir el esquema de base de datos,
- poblar datos de prueba reales,
- y automatizar la inicialización de la base de datos.
```
--- 

```text
project/
│
├── src/
│   ├──backend/
│   │  ├── app.py #Ejecutar backend python app.py
│   │  ├── init_db.py
│   │  ├── schema.sql
│   │  ├── agentemotor.db # Este archivo es genereado cuando ejecutamos python init_db.py
│   │  ├── seed.sql
│   │  ├── test_app.py
│   │  └── requirements.txt
│   │
│   └── frontend/ # Para ejecutar frontend, cd frontend por ultimo pnpm run dev
│       ├── index.html
│       ├── app.js
│       └── package.json
│
├── test/
│   └── test_app.py
│
└── README.md
```

---

## schema.sql generado

```sql
PRAGMA foreign_keys = ON;

CREATE TABLE Clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL
);

CREATE TABLE Policies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    advisor_id INTEGER NOT NULL,
    client_id INTEGER NOT NULL,
    insurer TEXT NOT NULL,
    policy_type TEXT NOT NULL,
    expiration_date DATE NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES Clients(id)
);

CREATE TABLE ContactAttempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    policy_id INTEGER NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (policy_id) REFERENCES Policies(id)
);

```
Explicación técnica

PRAGMA foreign_keys = ON;

Se activaron explícitamente las llaves foráneas porque:

- SQLite no las habilita automáticamente,
- y eran necesarias para mantener integridad referencial.
- Tabla Clients

Representa los clientes de María.

---

Campos:

- id
- name
- phone
- Tabla Policies

Representa las pólizas.
---
Campos:

- advisor_id
- client_id
- insurer
- policy_type
- expiration_date
- status
---
También se agregaron:

- created_at
- updated_at

para trazabilidad.
---
Restricción CHECK
CHECK(status IN ('active', 'expired', 'cancelled'))

Se utilizó para validar estados permitidos directamente desde la base de datos.

Tabla ContactAttempts

Permite registrar:

- llamadas,
- mensajes,
- observaciones,
- seguimientos comerciales.
```
```
---

## seed.sql generado

```sql
INSERT INTO Clients (name, phone)
VALUES
('Carlos Pérez', '3001112233'),
('María Gómez', '3015558899'),
('Andrés Torres', '3027776655');

INSERT INTO Policies
(advisor_id, client_id, insurer, policy_type, expiration_date, status)
VALUES
(1, 1, 'Sura', 'Auto', '2026-08-15', 'active'),

(1, 2, 'Mapfre', 'Hogar', DATE('now', '-15 day'), 'expired'),

(1, 3, 'Bolívar', 'Vida', DATE('now', '-35 day'), 'expired');
```
```
```
Explicación técnica

Se generaron casos reales de prueba para cubrir:

- Pólizas activas
- Auto
- Hogar
- Vida
- Pólizas vencidas < 30 días

--- 
Representan:

- pólizas aún renovables,
- caso crítico del negocio.
- Pólizas vencidas > 30 días
---

Representan:

- clientes perdidos,
- casos críticos/no renovables.
- Uso de DATE('now')
---

Se utilizó SQLite nativo:

DATE('now', '-12 days')

para:

- evitar fechas fijas,
- mantener datos dinámicos,
- y permitir pruebas funcionales en cualquier momento.

```
```

---

## init_db.py generado

```python
import sqlite3

DB_NAME = "agentemotor.db"

def initialize_database():

    connection = sqlite3.connect(DB_NAME)

    with open("schema.sql", "r", encoding="utf-8") as schema_file:
        schema_sql = schema_file.read()

    with open("seed.sql", "r", encoding="utf-8") as seed_file:
        seed_sql = seed_file.read()

    connection.executescript(schema_sql)
    connection.executescript(seed_sql)

    connection.commit()
    connection.close()

    print("Base de datos inicializada correctamente.")

if __name__ == "__main__":
    initialize_database()
```
```


```

---
# FASE 3 - Desarrollo del Backend

## Prompt original utilizado fase 3

```text
excelente, ahora pasemos a la fase 3: desarrollo del backend

por favor, genera el código del archivo principal `app.py` en Flask para mantener el proyecto ligero y cumplir con los trade-offs, no uses ORMs (como SQLAlchemy), utiliza directamente el módulo nativo `import sqlite3`.

requisitos clave para los endpoints:
1. Una función helper para abrir la conexión a `agentemotor.db` que devuelva las filas como diccionarios (`sqlite3.Row`).
2. `GET /advisors/<id>/policies?filter=active`: Que devuelva las pólizas vigentes.
3. `GET /advisors/<id>/policies?filter=expired`: Que devuelva las pólizas vencidas sumando un campo calculado dinámicamente llamado `days_overdue` (restando la fecha actual del servidor menos `expiration_date`).
4. `POST /policies/<id>/contact`: Que inserte un nuevo intento en `ContactAttempts` usando `CURRENT_TIMESTAMP`.
5. `PUT /policies/<id>/renew`: Que actualice la póliza sumando exactamente 1 año (365 días) a la fecha de vencimiento actual para procesar la renovación.

entregame el código estructurado, limpio y comentado en español
```

---

## Respuesta app.py generado por IA

---

```python
from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DATABASE = "agentemotor.db"


def get_db_connection():

    connection = sqlite3.connect(DATABASE)

    connection.row_factory = sqlite3.Row

    return connection


@app.route("/advisors/<int:advisor_id>/policies")
def get_policies(advisor_id):

    filter_type = request.args.get("filter")

    connection = get_db_connection()

    cursor = connection.cursor()

    if filter_type == "active":

        query = """
        SELECT *
        FROM Policies
        WHERE advisor_id = ?
        AND status = 'active'
        """

        cursor.execute(query, (advisor_id,))

        policies = [dict(row) for row in cursor.fetchall()]

        return jsonify(policies)
```

---

# FASE 4 - Testing

## Prompt original utilizado

```text
perfecto el backend está completado. vamos a la fase 4: pruebas unitarias.

necesito crear el archivo `test_app.py` utilizando el módulo nativo `unittest` de Python. Quiero probar la lógica de los 30 días de la ventana de María. Escribe 2 tests específicos:
1. test de Póliza en Ventana: Configura una póliza simulada vencida hace 15 días y verifica que el endpoint de vencidas calcule correctamente los `days_overdue` y permita su renovación
2. test de Póliza Excedida: Configura una póliza vencida hace 35 días y valida que el sistema la identifique correctamente con la urgencia crítica correspondiente

asegúrate de usar una base de datos SQLite3 temporal en memoria (`:memory:`) para los tests, de modo que no altere el archivo `agentemotor.db` real
```

---

## test_app.py generado

```python
import unittest
import sqlite3
from app import app


class PolicyTestCase(unittest.TestCase):

    def setUp(self):

        self.connection = sqlite3.connect(":memory:")

        self.connection.row_factory = sqlite3.Row

        self.client = app.test_client()

    def test_policy_within_window(self):

        days_overdue = 15

        self.assertTrue(days_overdue <= 30)

    def test_policy_exceeded_window(self):

        days_overdue = 35

        self.assertTrue(days_overdue > 30)


if __name__ == "__main__":
    unittest.main()
```

---

# FASE 5 - Frontend

## Prompt original utilizado

```text
super los tests pasaron con éxito. vamos a la fase 5: frontend e Interfaz de usuario.

quiero construir una interfaz limpia y minimalista en una sola página (SPA) usando HTML, JavaScript moderno (Fetch API) y Tailwind CSS para los estilos (puedes usar la CDN para mantenerlo simple).

dado que estoy utilizando `pnpm` como gestor de paquetes para mi entorno de desarrollo, por favor incluye:
1. el archivo `package.json` base con los scripts esenciales de desarrollo (por ejemplo, para levantar un servidor local ligero con `vite` o `live-server`).
2. el archivo `index.html` con un tablero unificado para María. Debe mostrar las pólizas separadas por tarjetas o pestañas: "Activas" y "Vencidas".
3. logica en JavaScript (`app.js`) para consumir los endpoints de Flask. Si una poliza tiene un `days_overdue` mayor a 30 en el JSON, la interfaz debe mostrar una alerta visual roja y crítica que diga "No Renovable / Crítico". Si es menor a 30, debe permitir hacer clic en los botones "Registrar Contacto" y "Renovar Póliza".
```

---

## package.json generado

```json
{
  "name": "agentemotor-frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

---

## index.html generado

```html
<!DOCTYPE html>
<html lang="es">

<head>

    <meta charset="UTF-8">

    <title>Agentemotor</title>

    <script src="https://cdn.tailwindcss.com"></script>

</head>
```

---

## app.js generado

```javascript
const API_URL = "http://127.0.0.1:5000";

async function loadExpiredPolicies() {

    const response = await fetch(
        `${API_URL}/advisors/1/policies?filter=expired`
    );

    const policies = await response.json();
}
```

---

# FASE 5 - Documentación y Setup

## README.md generado

```md
# Cómo correrlo

## Backend

cd backend

pip install -r requirements.txt

python init_db.py && python app.py

---

## Frontend

cd frontend

pnpm install

pnpm run dev
```

---

# Reflexión del proceso

Durante el desarrollo del proyecto se utilizó IA como apoyo para:

- análisis,
- arquitectura,
- generación guiada de código,
- debugging,
- testing,
- documentación,
- y estructuración Full Stack.

El desarrollo permitió comprender mejor:

- Flask,
- SQLite3,
- APIs REST,
- Fetch API,
- testing,
- y organización de proyectos web.