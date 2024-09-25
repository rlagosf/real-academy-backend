require('dotenv').config();
const express = require('express');
const cors = require('cors');
const contactRoutes = require('./routes/contact'); // Importa las rutas de contacto
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear JSON

// Usar la ruta de contacto
app.use('/api/contact', contactRoutes); // Usa la ruta importada para manejar el formulario

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
