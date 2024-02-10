const db = require("../conexion");
const express = require('express');

const app = express.Router();

//ruta con consulta a la base de datos
app.get('/alumnos', (req, res) => {

    //consulta SQL para obtener todos los alumnos
    const sql = 'SELECT * FROM alumnos';

    //ejecución de la consulta SQL
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error en la consulta SQL: ' + err.message); //muestra un mensaje de error en la consola
            res.status(500).send('Error en el servidor'); //envía un mensaje de error al cliente
        } else {
            res.json(result); //envía el resultado de la consulta al cliente
        }
    });
});

//ruta para eliminar un alumno
app.delete('/eliminar/:id', (req, res) => {
    const alumnoId = req.params.id; //obtiene el id del alumno a eliminar

    console.log('ID del alumno a eliminar:', alumnoId); //muestra el id del alumno a eliminar en la consola

    //consulta SQL para eliminar el alumno
    const sql = 'DELETE FROM alumnos WHERE id = ?'; 
    const values = [alumnoId]; //valores a insertar en la consulta SQL

    //ejecuta la consulta SQL
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error en la consulta SQL: ' + err.message);
            res.status(500).send('Error en el servidor');
        } else {
            res.json({ message: 'Alumno eliminado correctamente' }); //envía un mensaje de éxito al cliente
        }
    });
});

module.exports = app;