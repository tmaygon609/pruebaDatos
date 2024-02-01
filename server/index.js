const db = require('./conexion.js');

const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());



// Otros endpoints y consultas pueden ser añadidos según tus necesidades

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});