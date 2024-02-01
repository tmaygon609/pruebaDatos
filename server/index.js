const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// Rutas
app.get('/', (req, res) => {
    res.send('¡Hola desde el servidor!');
});

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

    const sql = 'INSERT INTO usuarios (nombre, apellidos, departamento, usuario, password) VALUES (?, ?, ?, ?, ?)'
    const values = [nombre, apellidos, departamento, usuario, password];

    db.query(sql, values, (err) => {
        if (err) {
            console.log('Error al insertar datos: ' + err.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            console.log('Datos insertados');
            res.json({ mensaje: 'Usuario registrado correctamente' });
        }
    });

    res.json({ mensaje: 'Usuario registrado correctamente.' })
});

// Otros endpoints y consultas pueden ser añadidos según tus necesidades

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
