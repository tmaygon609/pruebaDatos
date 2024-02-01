import { createConnection } from 'mysql';

var con = createConnection({
    host: "localhost",
    user: "user",
    password: "user",
    database: "almudeyne"
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ' + err.message);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

export default con;