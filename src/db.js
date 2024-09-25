const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root', // usuario por defecto en XAMPP
    password: '', // contraseña, en tu caso está vacía
    database: 'real_academy_fc' // nombre de tu base de datos
});

connection.connect((err) => {
    if (err) {
        console.error('Error de conexión: ' + err.stack);
        return;
    }
    console.log('Conectado como id ' + connection.threadId);
});

module.exports = connection;
