const db = require("../conexion");
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/insert', (req, res) => {
  try {
    const { nombre, apellidos, email } = req.body;

    // Verificar si ya existe un alumno con el mismo correo electrónico
    const checkEmailSql = 'SELECT COUNT(*) AS count FROM alumnos WHERE email = ?';
    const checkEmailValues = [email];

    db.query(checkEmailSql, checkEmailValues, (checkEmailErr, checkEmailResult) => {
      if (checkEmailErr) {
        console.error('Error al verificar el correo electrónico:', checkEmailErr);
        res.status(500).send('Error interno del servidor');
        return;
      }

      const existingAlumnoCount = checkEmailResult[0].count;

      if (existingAlumnoCount > 0) {
        // Ya existe un alumno con el mismo correo electrónico
        res.status(400).send('Ya existe un alumno con el mismo correo electrónico');
      } else {
        // No existe un alumno con el mismo correo electrónico, proceder con la inserción
        const insertSql = 'INSERT INTO alumnos (nombre, apellidos, email) VALUES (?, ?, ?)';
        const insertValues = [nombre, apellidos, email];

        db.query(insertSql, insertValues, (insertErr, insertResult) => {
          if (insertErr) {
            console.error('Error al insertar en la base de datos:', insertErr);
            res.status(500).send('Error interno del servidor');
            return;
          }

          console.log('Registro insertado correctamente');
          res.status(200).send('Registro insertado correctamente');
        });
      }
    });
  } catch (error) {
    console.error('Error general en la ruta /api/insert:', error);
    res.status(500).send('Error interno del servidor');
  }
});

module.exports = app;
