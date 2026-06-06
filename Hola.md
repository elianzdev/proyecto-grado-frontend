# Agentemotor - Gestión de Renovación de Pólizas

Aplicación web desarrollada para ayudar a asesores de seguros a gestionar pólizas activas, vencimientos y renovaciones, reemplazando procesos manuales basados en Excel.

El proyecto fue diseñado específicamente para resolver el problema operativo de María, una asesora que administra aproximadamente 280 clientes y necesita priorizar la ventana crítica de renovación de 30 días después del vencimiento de una póliza.

---

# 1. Cómo correrlo

## Backend

### 1. Entrar al backend

```bash
cd backend
```

### 2. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 3. Inicializar base de datos y ejecutar backend

```bash
python init_db.py && python app.py
```

Servidor disponible en:

```text
http://127.0.0.1:5000
```

---

## Frontend

### 1. Entrar al frontend

```bash
cd frontend
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Ejecutar servidor de desarrollo

```bash
pnpm run dev
```

Servidor disponible en una URL similar a:

```text
http://localhost:5173
```

---

# 2. Decisiones de diseño y por qué

## Uso de Flask + SQLite3 nativo
Decidí utilizar Flask con el módulo nativo `sqlite3` para mantener el proyecto ligero, simple de ejecutar y alineado con el alcance reducido de la prueba técnica.

SQLite fue suficiente considerando el volumen aproximado de 280 clientes y permitió evitar configuraciones más complejas como PostgreSQL o Docker.

---

## Sin ORM
No utilicé SQLAlchemy porque preferí mantener control explícito sobre las consultas SQL y reducir complejidad innecesaria para una prueba técnica de tiempo limitado.

---

## Frontend SPA simple
Decidí construir una SPA sencilla usando:
- HTML
- JavaScript moderno
- Fetch API
- Tailwind CSS

en lugar de frameworks como React o Vue para priorizar velocidad de desarrollo y simplicidad de mantenimiento.

---

## Priorización de la lógica de negocio
El foco principal del desarrollo fue implementar correctamente la ventana crítica de renovación de 30 días, ya que es el problema central descrito en el caso de negocio.

---

# 3. Qué dejé fuera y por qué

## Autenticación
No implementé login ni manejo de usuarios porque el caso planteaba un único asesor (María) y preferí priorizar la lógica de negocio principal dentro del tiempo disponible.

---

## Notificaciones automáticas
No se implementaron recordatorios automáticos por correo o WhatsApp debido al tiempo de desarrollo y porque requerían servicios externos adicionales.

---

## Arquitectura modular avanzada
Mantuve una arquitectura simple centralizada en `app.py` para evitar sobreingeniería y mantener el proyecto fácil de ejecutar y evaluar.

---

## Dashboard analítico
No se incluyeron métricas o gráficas avanzadas ya que no eran críticas para resolver el problema operativo principal.

---

# 4. Si esto fuera a producción mañana, qué le falta

- Autenticación y autorización
- Base de datos PostgreSQL
- Validaciones más robustas
- Manejo de errores más completo
- Logging estructurado
- Tests de integración y cobertura más amplia
- Deploy automatizado
- Dockerización
- HTTPS
- Variables de entorno
- Notificaciones automáticas
- Historial avanzado de interacciones con clientes

---

# 5. Tiempo aproximado que me tomó

Aproximadamente entre 5 a 7 horas para el desarrollo de la aplicación, distribuidas entre :
- análisis del problema,
- diseño de la solución,
- desarrollo backend,
- frontend,
- pruebas,
- y documentación donde me tome un poco mas de tiempo fuera de las horas de desarrollo para organizar el historial de conversación con la IA usada que en este caso fue ChatGPT.

---

# 6. Qué mejoraría de esta prueba técnica

Me hubiera gustado implementar un sistema de notificaciones automáticas para alertar a María sobre pólizas próximas a salir de la ventana de renovación de 30 días.

Considero que eso habría aportado aún más valor al problema real de negocio, aunque decidí priorizar primero la funcionalidad principal y mantener el proyecto dentro del tiempo estimado de la prueba.