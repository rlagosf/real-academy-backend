require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const contactRoutes = require('./routes/contact'); // Importa las rutas de contacto

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear JSON

// Conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Usar la ruta de contacto
app.use('/api/contact', contactRoutes); // Usa la ruta importada para manejar el formulario

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
