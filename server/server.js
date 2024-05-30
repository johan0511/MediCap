const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Darwin0568c',
  database: 'medicap'
});

// Ruta para obtener todos los tipos de citas
app.get('/api/tipos-citas', (req, res) => {
  const query = 'SELECT * FROM tipos_citas';
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Ruta para crear una nueva cita
app.post('/api/citas', (req, res) => {
  const { id_paciente, id_tipo_cita, fecha, hora, sintomas } = req.body;
  const query = 'INSERT INTO citas (id_paciente, id_tipo_cita, fecha, hora, sintomas) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [id_paciente, id_tipo_cita, fecha, hora, sintomas], (err, result) => {
    if (err) throw err;
    res.json({ id_cita: result.insertId });
  });
});

// Iniciar el servidor
app.listen(3001, () => {
  console.log('Servidor iniciado en http://localhost:3001');
});