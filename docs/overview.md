# Documentación detallada del proyecto

Este documento explica los archivos clave y su propósito, además de notas para mejorar y desplegar el proyecto.

**Backend**

- `backend/index.js`:
  - Arranca un servidor Express.
  - Conecta con MongoDB usando `mongoose.connect(process.env.MONGO_URI)`.
  - Define un esquema simple `libroSchema` con campos: `titulo`, `autor`, `anio`, `categoria`.
  - Rutas expuestas:
    - `GET /libros` — devuelve todos los libros.
    - `POST /libros` — crea un libro nuevo usando `req.body`.
    - `PUT /libros/:id` — actualiza un libro por id con `findByIdAndUpdate` y `{ new: true }`.
    - `DELETE /libros/:id` — elimina un libro por id.
  - Middlewares usados: `cors()` y `express.json()`.
  - Puerto controlado con `process.env.PORT || 3000`.

  Notas y recomendaciones:
  - Validar y sanitizar `req.body` antes de guardar (ej. usar `express-validator` o esquemas más estrictos en Mongoose).
  - Manejo de errores más detallado (devolver códigos y mensajes según tipo de error).
  - No incluir credenciales en el repo. Extraer `MONGO_URI` a variables seguras y añadir `.env` a `.gitignore`.
  - Añadir un script `start` en `backend/package.json`:
    ```json
    "scripts": { "start": "node index.js", "dev": "nodemon index.js" }
    ```

**Backend/.env**

- Contiene `MONGO_URI` y `PORT`. Observación: `PORT` está repetido varias veces — dejar solo una entrada.
- Ejemplo seguro para compartir (poner en `backend/.env.example`):
  ```env
  MONGO_URI=your_mongo_connection_string_here
  PORT=3000
  ```

**Frontend**

- `frontend/index.html`:
  - Contiene el formulario para crear/editar libros y la tabla donde se muestran.
  - Importa `src/main.js` como módulo.

- `frontend/src/main.js`:
  - Importa CSS de Bootstrap.
  - Define `API_URL = 'http://localhost:3000/libros'` (cambiar al desplegar).
  - Tiene `obtenerLibros()` que hace `fetch(API_URL)` para obtener libros y `renderizarTabla(libros)` para mostrarlos.
  - El `submit` del formulario actualmente solo recolecta datos y muestra un `alert()`; falta implementar el `fetch` POST/PUT.

  Recomendaciones:
  - Implementar `fetch` POST en el `submit` para enviar `datos` a `API_URL`.
  - Implementar `cargarEdicion(id)` que obtenga el libro y rellene el formulario para editar.
  - Implementar `eliminarLibro(id)` que haga `fetch` con método `DELETE`.
  - Manejar respuestas y errores del servidor con mensajes UI (alerts o toasts).

- `frontend/src/counter.js` y `frontend/src/style.css`:
  - `counter.js` es un helper de ejemplo (no ligado al flujo de libros).
  - `style.css` contiene estilos globales; Bootstrap ya está siendo usado para layout y componentes.

**Scripts y ejecución**

- `start.sh` está pensado para sistemas Unix y ejecuta `npm install` y `node index.js` en `backend`.
- En Windows usar los comandos PowerShell del `README.md`.

**Seguridad y despliegue**

- Nunca subir `backend/.env` con credenciales.
- Para producción, usar servicios como Render, Heroku, Railway, o variables de entorno en el proveedor.
- Reemplazar `API_URL` en `frontend/src/main.js` por la URL real del backend en producción.

Acciones sugeridas que puedo realizar ahora:
- Crear `backend/.env.example` y actualizar `.gitignore`.
- Añadir `start` y `dev` scripts en `backend/package.json`.
- Implementar las llamadas `fetch` (POST, PUT, DELETE) en `frontend/src/main.js`.
- Preparar instrucciones de despliegue para Render o Railway.

Fin de la documentación.
