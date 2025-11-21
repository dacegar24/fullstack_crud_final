// Importamos Bootstrap para que funcionen los estilos
import 'bootstrap/dist/css/bootstrap.min.css'

// --- REFERENCIAS AL HTML ---
const bookForm = document.getElementById('bookForm');
const tablaLibros = document.getElementById('tablaLibros');
const bookIdInput = document.getElementById('bookId'); // Oculto

// URL DEL BACKEND (Esto lo cambiaremos cuando subas a Render)
// Por ahora usaremos una url falsa para que no truene
const API_URL = 'http://localhost:3000/libros'; 

// --- 1. FUNCIÓN PARA OBTENER DATOS (GET) ---
const obtenerLibros = async () => {
    try {
        // AQUI ESTA EL "PROMISE/FETCH" QUE PIDE EL PROFE
        const respuesta = await fetch(API_URL);
        const libros = await respuesta.json();
        renderizarTabla(libros);
    } catch (error) {
        console.log("Error cargando libros (Normal si no hay backend aun):", error);
        // Datos falsos de prueba mientras hacemos el backend
        renderizarTabla([
            {_id: '1', titulo: 'El Principito', autor: 'Exupery', anio: 1943, categoria: 'Ficción'},
            {_id: '2', titulo: 'Cien Años de Soledad', autor: 'Gabo', anio: 1967, categoria: 'Novela'}
        ]);
    }
};

// --- 2. FUNCIÓN PARA DIBUJAR LA TABLA ---
const renderizarTabla = (libros) => {
    tablaLibros.innerHTML = '';
    libros.forEach(libro => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="fw-bold">${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.anio}</td>
            <td><span class="badge bg-primary">${libro.categoria}</span></td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="cargarEdicion('${libro._id}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarLibro('${libro._id}')">Eliminar</button>
            </td>
        `;
        tablaLibros.appendChild(row);
    });
};

// --- 3. MANEJAR EL ENVÍO DEL FORMULARIO (POST / PUT) ---
bookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Recolectar datos
    const datos = {
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        anio: document.getElementById('anio').value,
        categoria: document.getElementById('categoria').value
    };

    alert("Aquí se enviaría a Mongo: " + JSON.stringify(datos));
    // Aquí pondremos el fetch POST más adelante
});

// Cargar al inicio
obtenerLibros();