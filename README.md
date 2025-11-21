# Gestión de Biblioteca - Proyecto

Proyecto simple de ejemplo que implementa una API en Node/Express con MongoDB (Mongoose) y un frontend con Vite + Bootstrap.

**Resumen rápido**: El backend expone endpoints REST para gestionar libros (`/libros`) y el frontend consume esos endpoints para listar, crear, editar y eliminar libros.

**Estructura principal**
- `backend/`: servidor Express, modelo Mongoose y endpoints.
- `frontend/`: aplicación cliente (Vite) con `index.html` y `src/main.js`.
- `start.sh`: script simple para iniciar el backend en entornos tipo Unix.

**Archivos importantes**
- `backend/index.js`: punto de entrada del servidor; contiene conexión a MongoDB, esquema `Libro` y rutas CRUD.
- `backend/.env`: variables de entorno (contiene `MONGO_URI` y `PORT`). **No** subirla a repositorios públicos.
- `frontend/src/main.js`: lógica de la UI, fetch al backend y renderizado de la tabla.
- `frontend/index.html`: estructura del formulario y tabla.

Instrucciones rápidas (Windows - PowerShell)
``powershell
# Backend
cd backend
npm install
node index.js

# Frontend (desde la raíz del proyecto)
cd frontend
npm install
npm run dev
```

Recomendaciones rápidas
- Añadir un `.env.example` sin credenciales para mostrar las variables requeridas.
- Evitar dejar credenciales en `backend/.env`; usar variables de entorno en despliegue o servicios secretos.
- Añadir scripts útiles en `backend/package.json` como `start` o `dev` (con `nodemon`).
- Completar los `fetch` en `frontend/src/main.js` para POST/PUT/DELETE cuando el backend esté disponible.

Si quieres, puedo:
- Añadir un `.env.example` y actualizar `.gitignore`.
- Implementar las llamadas `fetch` faltantes en el frontend.
- Preparar scripts `npm` para iniciar todo con un comando.
