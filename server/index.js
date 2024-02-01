const db = require('./conexion.js');

const express = require('express');
const cors = require('cors');

import { routeRegistroUsuario } from './routes/routeRegistroUsuario.js';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use('/', routeRegistroUsuario);

// Otros endpoints y consultas pueden ser añadidos según tus necesidades

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});