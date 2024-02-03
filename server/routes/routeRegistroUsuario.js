const db = require("../conexion");
const express = require('express');

const app = express.Router();

// Ejemplo de ruta con consulta a la base de datos
app.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuarios';

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error en la consulta SQL: ' + err.message);
            res.status(500).send('Error en el servidor');
        } else {
            res.json(result);
        }
    });
});

app.post('/usuario', (req, res) => {
    const { nombre, apellidos, departamento, usuario, password } = req.body;

    // Comprobar si el usuario ya existe
    const checkUsuarioSql = 'SELECT * FROM usuarios WHERE usuario = ?';

    db.query(checkUsuarioSql, usuario, (checkErr, checkResult) => {

        if (checkErr) {
            console.log('Error en la consulta SQL: ' + checkErr.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {

            if (checkResult.lenght > 0) {
                // El usuario ya existe
                res.status(409).json({ error: 'El usuario ya existe' });
            } else {
                // El usuario no existe.
                const insertarUsuarioSql = 'INSERT INTO usuarios (nombre, apellidos, departamento, usuario, password) VALUES (?, ?, ?, ?, ?)'
                const values = [nombre, apellidos, departamento, usuario, password];

                db.query(insertarUsuarioSql, values, (insertErr) => {
                    if (err) {
                        console.log('Error al insertar datos: ' + insertErr.message);
                        res.status(500).json({ error: 'Error interno del servidor' });
                    } else {
                        console.log('Datos insertados');
                        res.json({ mensaje: 'Usuario registrado correctamente' });
                    }
                });
            }
        }
    });

});

module.exports = app;