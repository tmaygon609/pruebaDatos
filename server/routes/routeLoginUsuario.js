const db = require("../conexion");
const express = require('express');

const app = express.Router();


//Mostrar
app.post('/routeLoginUsuario', (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM usuarios WHERE usuario = ? AND password = ?";
    db.query(sql, [username, password], (err, result) => {
        if(err){
            console.log(err);
        }else{
            if(result.length > 0){
                //res.send(result);
                res.send("ok");
            }else{
                res.send("Datos incorrectos");
            }
        }
    });
});

module.exports = app;