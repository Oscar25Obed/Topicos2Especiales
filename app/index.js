const express = require('express');
const mysql = require('mysql2');

const app = express();

// Configurar conexión a la BD
const db = mysql.createConnection({
  host: 'topicosespeciales.mysql.database.azure.com',
  user: 'joselcp',
  password: 'topicos2!',
  database: 'carsdb',
  port: '3306',
  ssl: false
});

// Conectar a la BD
db.connect(err => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL!');
});

// Endpoint para obtener datos
app.get('/data', (req, res) => {
  console.log('Recibida solicitud en /data');
  db.query('SELECT * FROM cars', (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).send(`Error en la consulta: ${err.message}`);
    } else {
      res.json(results);
    }
  });
});

// Endpoint para obtener todos los usuarios
app.get('/users', (req, res) => {
  console.log('Recibida solicitud en /users');
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).send(`Error en la consulta: ${err.message}`);
    } else {
      res.json(results);
    }
  });
});

var listener = app.listen(process.env.PORT || 80, function() {
 console.log('listening on port ' + listener.address().port);
});
