# Frontend - Proyecto Grado

Frontend de la plataforma de cursos, construido con React y Vite. Este README contiene instrucciones de desarrollo, estructura del proyecto y las herramientas principales usadas.

## Tecnologías y herramientas

- React 19
- Vite
- React Router DOM
- Axios para llamadas HTTP
- Tailwind CSS
- ESLint
- Plugins: `@vitejs/plugin-react`, `@tailwindcss/vite`

## Scripts relevantes

```bash
# Iniciar en modo desarrollo (HMR)
pnpm dev
# Construir para producción
pnpm build
# Previsualizar build localmente
pnpm preview
# Linter
pnpm run lint
```

> Nota: usa `npm` si no usas `pnpm` (`npm run dev`, `npm run build`, ...).

## Dependencias principales

- `react`, `react-dom`
- `react-router-dom` (ruteo)
- `axios` (HTTP)
- `lucide-react` (iconos)

Dependencias de desarrollo destacadas:

- `vite`, `@vitejs/plugin-react`
- `tailwindcss`, `postcss`, `autoprefixer`, `@tailwindcss/vite`
- `eslint` y plugins asociados

## Estructura del proyecto

```text
frontend
├─ package.json
├─ pnpm-lock.yaml
├─ vite.config.js
├─ index.html
├─ public
│  └─ (archivos estáticos)
└─ src
	├─ main.jsx                # Punto de entrada
	├─ App.jsx                 # App root y rutas
	├─ index.css               # Estilos globales
	├─ assets                  # Imágenes y recursos
	├─ components
	│  ├─ cart
	│  │  └─ Cart.jsx
	│  └─ courses
	│     └─ CourseCard.jsx
	├─ layouts
	│  └─ Navbar.jsx
	├─ context
	│  └─ CartContext.jsx
	├─ pages
	│  ├─ Home.jsx
	│  ├─ Login.jsx
	│  ├─ Register.jsx
	│  ├─ CourseDetails.jsx
	│  ├─ CartPage.jsx
	│  └─ AdminDashboard.jsx
	├─ routes
	│  └─ AppRoutes.jsx
	└─ services
		└─ api.jsx              # Cliente axios configurado
```

## Flujo y consideraciones

- `src/main.jsx` monta la aplicación en el DOM y carga `App.jsx`.
- `App.jsx` registra las rutas (con `react-router-dom`) y los providers (ej. `CartContext`).
- `services/api.jsx` centraliza la configuración de `axios` (baseURL, interceptores, token).
- Usa `localStorage` en `CartContext` para persistir el carrito entre sesiones.

## Consejos de desarrollo

- Configura un archivo `.env` en `frontend/` si necesitas variables (ej. `VITE_API_URL`).
- Habilita la extensión React Developer Tools en tu navegador.
- Prueba rutas y endpoints con `POSTMAN` o `Insomnia`.
- Añade validaciones en formularios (p. ej. con `react-hook-form` o `yup`) para mejorar UX.

## Despliegue

- Para producción: `pnpm build` generará los archivos estáticos en `dist/`.
- Puedes servir `dist/` desde cualquier servicio estático (Netlify, Vercel, Surge) o integrarlo con el backend.

---

Si quieres, puedo:

- Generar o actualizar un `frontend/README.md` en español más detallado (con ejemplos de `.env`).
- Añadir ejemplos de `api.jsx` y `CartContext.jsx` si los necesitas.


