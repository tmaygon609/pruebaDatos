const express = require('express');
const db = require("../conexion");

const app = express.Router();

// Ruta para obtener todos los alumnos
app.get('/notasAlumnos', (req, res) => {
    const sql = 'SELECT * FROM alumnos';

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error en la consulta SQL: ' + err.message);
            res.status(500).send('Error en el servidor');
        } else {
            console.log('Datos consultados de la base de datos:', result);
            res.json(result);
        }
    });
});

// Ruta para insertar una nueva nota
app.post('/notas', (req, res) => {
    const formData = req.body; // Datos enviados desde el cliente

    const sql = 'INSERT INTO notas (idAlumno, descripcion, idTrimestre, idTarea, nota) VALUES (?, ?, ?, ?, ?)';
    const values = [formData.alumno, formData.descripcion, formData.trimestre, formData.tarea, formData.nota];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error en la consulta SQL: ' + err.message);
            res.status(500).send('Error en el servidor');
        } else {
            console.log('Datos insertados en la base de datos:', result);
            res.status(200).send('Datos insertados en la base de datos');
        }
    });
});

// Ruta para obtener todas las notas de un alumno en un determinado trimestre

app.get('/notas/:idAlumno/:idTrimestre', (req, res) => {
    const idAlumno = req.params.idAlumno;
    const idTrimestre = req.params.idTrimestre;
    const sql = `SELECT nota FROM notas WHERE idAlumno = ${idAlumno} AND idTrimestre = ${idTrimestre}`;

    console.log('Consulta SQL:', sql);

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error en la consulta SQL: ' + err.message);
            res.status(500).send('Error en el servidor');
        } else {
            console.log('Datos consultados de la base de datos:', result);
            res.json(result);
        }
    });
});




module.exports = app;
