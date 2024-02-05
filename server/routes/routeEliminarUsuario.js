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

app.delete('/eliminar/:id', (req, res) => {
    const alumnoId = req.params.id;

    console.log('ID del alumno a eliminar:', alumnoId);

    // Construye la consulta SQL para eliminar el alumno
    const sql = 'DELETE FROM alumnos WHERE id = ?';
    const values = [alumnoId];

    // Ejecuta la consulta SQL
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error en la consulta SQL: ' + err.message);
            res.status(500).send('Error en el servidor');
        } else {
            res.json({ message: 'Alumno eliminado correctamente' });
        }
    });
});

module.exports = app;