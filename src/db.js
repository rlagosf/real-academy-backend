const mysql = require('mysql2');

// Conexión a la base de datos
const connection = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'real_academy_fc'
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error de conexión: ' + err.stack);
        return;
    }
    console.log('Conectado como id ' + connection.threadId);
});

module.exports = connection;
