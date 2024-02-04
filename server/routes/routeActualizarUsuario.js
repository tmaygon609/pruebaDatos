const db = require("../conexion");
const express = require('express');

const app = express.Router();

//Rutas

// Ejemplo de ruta con consulta a la base de datos
app.get('/alumnos', (req, res) => {

    const sql = 'SELECT * FROM alumnos';

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error en la consulta SQL: ' + err.message);
            res.status(500).send('Error en el servidor');
        } else {
            res.json(result);
        }
    });
});

app.put('/alumnos/:id', (req, res) => {
    const alumnoId = req.params.id;
    const { nombre, apellidos, email } = req.body;

    console.log('ID del alumno:', alumnoId);
    console.log('Nombre:', nombre);
    console.log('Apellidos:', apellidos);
    console.log('Email:', email);

    // Construye la consulta SQL para actualizar los campos del alumno
    const sql = 'UPDATE alumnos SET nombre = ?, apellidos = ?, email = ? WHERE id = ?';
    const values = [nombre, apellidos, email, alumnoId];

    // Ejecuta la consulta SQL
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error en la consulta SQL: ' + err.message);
            res.status(500).send('Error en el servidor');
        } else {
            res.json({ message: 'Alumno actualizado correctamente' });
        }
    });
});

module.exports = app;