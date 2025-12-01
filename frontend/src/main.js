// Importamos Bootstrap para que funcionen los estilos
import 'bootstrap/dist/css/bootstrap.min.css'

// --- REFERENCIAS AL HTML ---
const bookForm = document.getElementById('bookForm');
const tablaLibros = document.getElementById('tablaLibros');
const bookIdInput = document.getElementById('bookId'); // Oculto (asumo que tienes un input hidden con id="bookId")

// URL DEL BACKEND (Tu URL de Render, que ya está Live)
const API_URL = 'https://biblioteca-crud-api.onrender.com/api/libros';

// --- 1. FUNCIÓN PARA OBTENER DATOS (GET) ---
const obtenerLibros = async () => {
    try {
        // Petición GET con Promise/Fetch
        const respuesta = await fetch(API_URL);
        
        // Verifica si la respuesta fue exitosa (código 200)
        if (!respuesta.ok) {
             throw new Error(`HTTP error! status: ${respuesta.status}`);
        }
        
        const libros = await respuesta.json();
        renderizarTabla(libros);
    } catch (error) {
        console.error("Error cargando libros:", error);
        // Dejamos los datos falsos por si la API falla, aunque ya no deberían ser necesarios.
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

    const bookId = bookIdInput.value; // Obtiene el valor del campo oculto
    const method = bookId ? 'PUT' : 'POST';
    const url = bookId ? `${API_URL}/${bookId}` : API_URL;

    // Recolectar datos
    const datos = {
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        anio: document.getElementById('anio').value,
        categoria: document.getElementById('categoria').value
    };

    try {
        // AQUI ESTA EL FETCH POST/PUT (El Promise/Fetch para guardar/actualizar)
        const respuesta = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (respuesta.ok || respuesta.status === 201) {
            alert(`Libro ${bookId ? 'actualizado' : 'guardado'} con éxito.`);
            
            // 🚨 ¡LA CLAVE! Recarga la tabla para que aparezca el nuevo libro.
            await obtenerLibros(); 
            
            // Limpiar el formulario
            bookForm.reset();
            bookIdInput.value = ''; // Limpia el ID para futuras creaciones
        } else {
            console.error("Error al guardar/actualizar:", await respuesta.text());
            alert("Hubo un error en el servidor al procesar la solicitud.");
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        alert("No se pudo conectar al Backend de Render. Revise el log.");
    }
});


// 🚨 Nota: Necesitas implementar las funciones "cargarEdicion" y "eliminarLibro"
// si quieres que los botones de la tabla funcionen.
// Aquí solo te incluyo la de eliminar, que es la que usa el fetch DELETE:

// --- 4. FUNCIÓN PARA ELIMINAR LIBRO (DELETE) ---
window.eliminarLibro = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este libro?')) {
        return;
    }
    
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE' // Petición DELETE
        });

        if (respuesta.ok) {
            alert("Libro eliminado con éxito.");
            // Recarga la tabla para que desaparezca el libro eliminado.
            await obtenerLibros(); 
        } else {
            alert("Error al eliminar el libro.");
        }
    } catch (error) {
        console.error("Error de conexión:", error);
    }
};


// --- Cargar al inicio ---
document.addEventListener('DOMContentLoaded', obtenerLibros);