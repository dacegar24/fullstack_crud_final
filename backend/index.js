const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
             
// 1. MIDDLEWARES (Configuraciones previas)
app.use(cors()); // Permite que el Frontend (Vite) nos hable
app.use(express.json()); // Permite recibir datos en formato JSON

// 2. CONEXIÓN A MONGO DB
// La conexión la tomaremos del archivo .env
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Conectado exitosamente a Mongo Atlas"))
    .catch((error) => console.error("❌ Error de conexión:", error));

// 3. MODELO DE DATOS (Esquema del Libro)
// Esto debe coincidir con los campos de tu formulario HTML
const libroSchema = new mongoose.Schema({
    titulo: String,
    autor: String,
    anio: Number,
    categoria: String
});

const Libro = mongoose.model('Libro', libroSchema);

// --- 4. RUTAS (Endpoints) ---

// A. Obtener todos los libros (GET)
app.get('/libros', async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener libros" });
    }
});

// B. Guardar un nuevo libro (POST)
app.post('/libros', async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    } catch (error) {
        res.status(500).json({ error: "Error al guardar el libro" });
    }
});

// C. Actualizar un libro (PUT)
app.put('/libros/:id', async (req, res) => {
    try {
        const libroEditado = await Libro.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // Esto devuelve el dato ya actualizado
        );
        res.json(libroEditado);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar" });
    }
});

// D. Eliminar un libro (DELETE)
app.delete('/libros/:id', async (req, res) => {
    try {
        await Libro.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Libro eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar" });
    }
});

// 5. ENCENDER SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
