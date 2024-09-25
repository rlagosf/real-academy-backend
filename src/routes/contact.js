const express = require('express');
const router = express.Router();
const db = require('../db'); // Asegúrate de que este archivo db.js existe y tiene la conexión a la base de datos

// Ruta para manejar el formulario de contacto
router.post('/', (req, res) => {
    const { name, phone, address, email, source } = req.body;

    // Inserción en la base de datos
    const query = 'INSERT INTO contact_forms (name, phone, address, email, source, created_at) VALUES (?, ?, ?, ?, ?, NOW())';
    
    db.query(query, [name, phone, address, email, source], (err, results) => {
        if (err) {
            console.error('Error al insertar en la base de datos: ', err);
            return res.status(500).json({ error: 'Error al enviar el formulario' });
        }
        res.status(201).json({ message: 'Formulario enviado correctamente', id: results.insertId });
    });
});

module.exports = router;
