### Prompt
"Este es mi spec.md, quiero que lo analices y me digas qué ajustes harías"

### Primer borrador para ajustar spec.md

# Spec - Aplicación para Asesor de Seguros

## 1. Cómo entendí el problema
María administra 280 clientes en un Excel que se daña y no le permite controlar bien las pólizas.  
El punto crítico es la ventana de **30 días después del vencimiento**, donde aún puede renovar sin perder al cliente.  
Necesita una herramienta simple que reemplace el Excel y le permita gestionar vencimientos y acciones de contacto.

---

## 2. Qué decidí construir
- **Incluido:**
  - Backend con API REST en Flask + SQLite.
  - Endpoint para listar pólizas próximas a vencer y vencidas.
  - Frontend sencillo (HTML/JS) con una pantalla principal para ver pólizas y marcar acciones (contactado, renovado).
  - Persistencia en SQLite con datos precargados.
  - 2 tests críticos: póliza vencida dentro de 30 días y póliza vencida hace más de 30 días.
  - Documentación clara con setup en 3 comandos.

- **Excluido (con justificación):**
  - Autenticación: no es crítica para la prueba y complicaría el setup.
  - Notificaciones automáticas: fuera de alcance en 4 horas.
  - Multiusuario: solo se necesita un asesor.

---

## 3. Supuestos
- Cada póliza tiene un `advisor_id` y una fecha de vencimiento en formato `YYYY-MM-DD`.
- María es la única usuaria, por eso no implemento roles ni login.
- Los datos iniciales estarán precargados en SQLite para que la app funcione desde el inicio.

---

## 4. Flujos principales
1. **Ver pólizas próximas a vencer** → María abre la app y ve listado filtrado por vencimiento.  
2. **Registrar acción** → Marca si contactó al cliente o si renovó la póliza.  
3. **Actualizar fecha de renovación** → Se guarda en la base de datos.  
4. **Identificar urgencia** → El sistema muestra prioridad según días vencidos (ej. urgente si >7 días, crítico si >30).

---

## 5. Modelo de datos
- **Clients**: id, name, phone.  
- **Policies**: id, advisor_id, client_id, insurer, expiration_date, status.  
- **ContactAttempts**: id, policy_id, date, notes.

---

## 6. Endpoints expuestos
- `GET /advisors/<id>/policies?status=active` → Lista pólizas activas.  
- `GET /advisors/<id>/expired-policies` → Lista pólizas vencidas con días de atraso.  
- `POST /policies/<id>/contact` → Registra intento de contacto.  
- `PUT /policies/<id>/renew` → Actualiza fecha de renovación.

---

## 7. Trade-offs considerados
- **SQLite vs PostgreSQL**: elegí SQLite por simplicidad y porque la prueba pide algo fácil de correr.  
- **Frontend simple vs framework**: elegí HTML/JS plano para cumplir con la pantalla principal sin sobrecargar el proyecto.  
- **Autenticación**: decidí no incluirla porque no aporta valor en este contexto y consume tiempo.  
- **Tests limitados**: enfoqué en el caso crítico de la ventana de 30 días, no en cobertura total.

---

---

### Respuesta IA
# Evidencia - Ajustes realizados al archivo spec.md

## Objetivo

Mejorar el archivo `spec.md` de la prueba técnica para lograr:
- mayor claridad técnica,
- mejor entendimiento del problema de negocio,
- coherencia arquitectónica,
- y una presentación más profesional de la solución.

---

# Prompt inicial utilizado

```text
Este es mi spec.md, quiero que lo analices y me digas qué ajustes harías
```

---

# Contexto detectado

El spec inicial tenía:
- buena identificación del problema,
- endpoints definidos,
- trade-offs razonables,
- y un alcance controlado.

Sin embargo, se identificaron oportunidades de mejora en:
- narrativa de negocio,
- estructura del documento,
- arquitectura,
- reglas de negocio,
- coherencia técnica,
- y claridad del setup.

---

# Ajustes realizados

---

# 1. Mejora del entendimiento del problema

## Antes

```md
María administra 280 clientes en un Excel que se daña y no le permite controlar bien las pólizas.
```

## Después

```md
María administra aproximadamente 280 clientes utilizando archivos Excel, lo que dificulta el seguimiento de vencimientos y acciones comerciales.

El principal riesgo operativo ocurre durante los 30 días posteriores al vencimiento de una póliza, período en el que aún es posible renovarla sin perder al cliente.
```

## Mejora obtenida
- Mayor enfoque en el problema de negocio.
- Mejor narrativa profesional.
- Más claridad sobre el riesgo operativo.

---

# 2. Cambio del título "Qué decidí construir"

## Antes

```md
## 2. Qué decidí construir
```

## Después

```md
## 3. Alcance de la solución
```

## Mejora obtenida
- Lenguaje más profesional.
- Mejor organización del documento.

---

# 3. Creación de la sección "Objetivo de la solución"

## Se agregó

```md
## Objetivo de la solución

Construir una aplicación simple y fácil de ejecutar que permita al asesor:
- visualizar pólizas próximas a vencer,
- priorizar renovaciones,
- registrar acciones comerciales,
- y reducir la pérdida de clientes por falta de seguimiento.
```

## Mejora obtenida
- Claridad sobre el propósito del sistema.
- Mejor enfoque orientado a producto.

---

# 4. Reestructuración del alcance

## Se dividió en:
- Funcionalidades incluidas.
- Funcionalidades fuera de alcance.

## Mejora obtenida
- Mejor definición del MVP.
- Mayor claridad para el evaluador.
- Demuestra priorización técnica.

---

# 5. Incorporación de arquitectura

## Se agregó

```md
## Arquitectura
```

### Dividiendo:
- Backend
- Frontend

## Mejora obtenida
- Mayor claridad estructural.
- Mejor percepción de diseño técnico.

---

# 6. Clarificación tecnológica sobre pnpm

## Problema detectado

El spec mezclaba:
- Flask + SQLite
- y comandos `pnpm`

sin aclarar que `pnpm` era únicamente para frontend.

## Solución aplicada

Se separó:

```md
### Backend
```

y

```md
### Frontend
```

## Mejora obtenida
- Coherencia tecnológica.
- Menos confusión para el evaluador.

---

# 7. Mejora de estados de póliza

## Antes

```md
active
expired
renewed
```

## Después

```md
active
expired
cancelled
```

## Razón
Una póliza renovada normalmente continúa activa.

## Mejora obtenida
- Modelo más coherente.
- Mejor representación del dominio.

---

# 8. Incorporación de reglas de negocio

## Se agregaron reglas explícitas

```md
- Una póliza vencida hace menos de 30 días puede renovarse.
- Una póliza vencida hace más de 30 días requiere nueva contratación.
- Registrar un contacto no modifica el estado de la póliza.
```

## Mejora obtenida
- El sistema dejó de verse como un CRUD simple.
- Mayor modelado de negocio.

---

# 9. Cálculo dinámico de urgencia

## Se aclaró

```md
El nivel de urgencia se calcula dinámicamente a partir de la fecha actual y la fecha de vencimiento.
```

## Mejora obtenida
- Mejor diseño.
- Evita persistir lógica derivada innecesariamente.

---

# 10. Mejora de flujos principales

## Se reorganizaron los flujos:
1. Ver pólizas.
2. Registrar contacto.
3. Renovar póliza.
4. Identificar prioridad.

## Mejora obtenida
- Mayor claridad funcional.
- Mejor lectura del comportamiento esperado.

---

# 11. Mejora del modelo de datos

## Antes

```md
Policies: id, advisor_id, client_id, insurer, expiration_date, status
```

## Después

```md
Policies:
- id
- advisor_id
- client_id
- insurer
- expiration_date
- status
- created_at
- updated_at
```

## Mejora obtenida
- Modelo más profesional.
- Preparado para trazabilidad.

---

# 12. Mejora de endpoints REST

## Antes

```http
PUT /policies/<id>/renew
```

## Después

```http
PATCH /policies/<id>/renew
```

## Razón
Se modifica parcialmente el recurso.

## Mejora obtenida
- Mejor alineación RESTful.

---

# 13. Cambio de endpoint de contacto

## Antes

```http
POST /policies/<id>/contact
```

## Después

```http
POST /policies/<id>/contacts
```

## Mejora obtenida
- Endpoint más consistente con recursos REST.

---

# 14. Incorporación de manejo de errores

## Se agregó

```md
## Manejo de errores
```

### Incluyendo:
- 400
- 404
- 500

## Mejora obtenida
- Mayor madurez técnica.
- Mejor documentación API.

---

# 15. Incorporación de tests críticos

## Se aclaró que se validarán:

- renovación dentro de 30 días,
- y expiración fuera de ventana.

## Mejora obtenida
- Mayor claridad sobre calidad y validación.

---

# 16. Separación del setup Backend / Frontend

## Antes

```bash
pnpm install
pnpm run dev
```

## Después

### Backend

```bash
pip install -r requirements.txt
python seed.py
flask run
```

### Frontend

```bash
pnpm install
pnpm run dev
```

## Mejora obtenida
- Setup mucho más claro.
- Coherencia tecnológica completa.

---

# 17. Mejora de trade-offs

## Se reforzó la justificación de:
- SQLite
- Frontend simple
- Sin autenticación
- Cobertura limitada de tests

## Mejora obtenida
- Demuestra criterio de ingeniería.
- Explica decisiones técnicas.

---

# 18. Inclusión de criterios mínimos de éxito

## Se agregó

```md
## Criterios mínimos de éxito
```

## Incluyendo:
- visualizar pólizas,
- identificar ventana de renovación,
- registrar contactos,
- renovar pólizas.

## Mejora obtenida
- Claridad sobre expectativas del proyecto.
- Mejor definición de entrega funcional.

---

# 19. Recomendaciones adicionales sugeridas

Aunque no obligatorias, también se recomendaron:

## Estructura de carpetas

```text
project/
├── backend/
├── frontend/
├── test/
└── README.md
```

## Ejemplo JSON de respuesta API

```json
{
  "id": 1,
  "client_name": "Carlos Pérez",
  "expiration_date": "2026-06-10",
  "days_expired": 12,
  "urgency": "urgent",
  "renewable": true
}
```

## Beneficio
- Mayor profesionalismo.
- Mejor comprensión de la API.

---

# Resultado final

El spec evolucionó de:
- una descripción funcional básica,

a:
- un documento técnico más sólido,
- orientado al negocio,
- con arquitectura clara,
- reglas de negocio explícitas,
- y decisiones técnicas justificadas.

---

# Conclusión

La mejora del `spec.md` permitió:
- aumentar la claridad técnica,
- mejorar la percepción profesional del proyecto,
- demostrar capacidad de análisis,
- y presentar una solución más madura y coherente para la prueba técnica.

### Comentario mío
"Decidí ajustar y dejar mas claro toda la planeacion de como se iria a desarrollar la aplicación para el asesor de seguros."
