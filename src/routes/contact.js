const express = require('express');
const router = express.Router();
const db = require('../db'); // Importa la conexión a la base de datos
const nodemailer = require('nodemailer');

// Configura el transporte de correo con nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // o el servicio de correo que utilices
    auth: {
        user: process.env.EMAIL_USER, // Tu correo electrónico
        pass: process.env.EMAIL_PASS  // Tu contraseña de aplicación
    }
});

// Ruta para manejar el formulario de contacto
router.post('/', (req, res) => {
    const { name, phone, address, email, source } = req.body;

    // Validaciones básicas
    if (!name || !phone || !address || !email || !source) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Inserción en la base de datos
    const query = 'INSERT INTO contact_forms (name, phone, address, email, source, created_at) VALUES (?, ?, ?, ?, ?, NOW())';
    
    db.query(query, [name, phone, address, email, source], (err, results) => {
        if (err) {
            console.error('Error al insertar en la base de datos: ', err);
            return res.status(500).json({ error: 'Error al enviar el formulario' });
        }

        // Configurar el correo a enviar
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'rodrigo.lagos.fernandez@gmail.com', // Cambia esto por el correo al que quieras enviar el mensaje
            subject: 'Nuevo formulario de contacto recibido',
            text: `Se ha recibido un nuevo formulario de contacto:
            Nombre: ${name}
            Teléfono: ${phone}
            Dirección: ${address}
            Email: ${email}
            Cómo nos conoció: ${source}`
        };

        // Enviar correo
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo:', error);
                return res.status(500).json({ error: 'Error al enviar el correo' });
            }
            console.log('Correo enviado: ' + info.response);

            // Responder al cliente con éxito
            res.status(201).json({ message: 'Formulario enviado correctamente y correo enviado', id: results.insertId });
        });
    });
});

module.exports = router;
