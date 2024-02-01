import { createConnection } from 'mysql';

var con = createConnection({
    host: "localhost",
    user: "user",
    password: "user",
    database: "almudeyne"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

export default con;