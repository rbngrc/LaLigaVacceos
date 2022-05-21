const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Datos de conexión a la base de datos
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'vacceos_championships'
});

// POST insertar datos en tabla
app.post('/create', (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const nickname = req.body.nickname;
    const password = req.body.password;
    const sex = req.body.sex;
    const competition = req.body.competition;

    db.query(
        "INSERT INTO atletas (email, name, nickname, password, sex) VALUES (?, ?, ? ,? ,?)",
        [email, name, nickname, password, sex],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

// POST insertar datos en tabla
app.post('/createCompetition', (req, res) => {
    const name = req.body.name;
    const date = req.body.date;

    db.query(
        "INSERT INTO competiciones (name, date) VALUES (?, ?)",
        [name, date],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

// Obtener Atletas
app.get('/atletas', (req, res) => {
    db.query("SELECT * FROM atletas ORDER BY name", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
});

// Obtener Competiciones
app.get('/competiciones', (req, res) => {
    db.query("SELECT * FROM competiciones ORDER BY date", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
});

// // UPDATE actualizar los datos de la tabla
// app.put('/update', (req, res) => {
//     const id = req.params.id;
//     const dato = req.params.dato;
//     db.query("UPDATE tabla SET dato = ? WHERE id = ?", 
//     [dato],
//     (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     });
// });

// DELETE borrar datos de la tabla
app.delete('/delete/:email', (req, res) => {
    const email = req.params.email;
    db.query("DELETE FROM atletas WHERE email = ?", email, 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// DELETE borrar competiciones
app.delete('/deleteCompetition/:name', (req, res) => {
    const name = req.params.name;
    db.query("DELETE FROM competiciones WHERE name = ?", name, 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// // Llamada de comprobación de usuario
// app.get('/atletas', (req, res) => {
//     db.query("SELECT * FROM atletas", (err, result) => {
//         if (err) {
//             console.log(err)
//         } else {
//             res.send(result)
//         }
//     })
// });

app.listen(3001, () => {
    console.log("Server up & running")
});