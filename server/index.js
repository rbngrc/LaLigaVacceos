const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

use.app(cors());
app.use(express.json());

// Datos de conexión a la base de datos (Se puede parametrizar)
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'laligavacceos'
});

// POST insertar datos en tabla
app.post('/create', (req, res) => {
    const name = req.body.name;

    db.query(
        "INSERT INTO tabla (name) VALUES (?)",
        [name],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

// GET obtener datos de la tabla
app.get('/tabla', (req, res) => {
    db.query("SELECT * FROM tabla", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
});

// UPDATE actualizar los datos de la tabla
app.put('/update', (req, res) => {
    const id = req.params.id;
    const dato = req.params.dato;
    db.query("UPDATE tabla SET dato = ? WHERE id = ?", 
    [dato],
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// DELETE borrar datos de la tabla
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM tabla WHERE id = ?", id, 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("Server up & running")
});