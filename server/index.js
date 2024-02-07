
const express = require('express');
const cors = require('cors');
//Nuestras rutas
//Ya implementado
const routeActualizarUsuario = require('./routes/routeActualizarUsuario.js');
 const routeAñadirUsuario = require('./routes/routeAñadirUsuario.js');
const routeEliminarUsuario = require('./routes/routeEliminarUsuario.js');
const routeLoginUsuario = require('./routes/routeLoginUsuario.js');
const routeRegistroNotas = require('./routes/routeRegistroNotas.js');
//Ya implementado
const routeRegistroUsuario = require('./routes/routeRegistroUsuario.js');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
//Llamada a nuestras rutas
//Ya implementado
app.use('/', routeActualizarUsuario);
app.use('/', routeAñadirUsuario);
app.use('/', routeEliminarUsuario);
app.use('/', routeLoginUsuario);
app.use('/', routeRegistroNotas);
//Ya implementado
app.use('/', routeRegistroUsuario);

// Otros endpoints y consultas pueden ser añadidos según tus necesidades

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});