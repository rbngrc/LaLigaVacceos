const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// datos de conexión a la base de datos
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'vacceos_championships'
});

/*************** POST ***************/ 
// insertar datos en tabla atleta
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

// insertar datos en tabla competiciones
app.post('/createCompetition', (req, res) => {
    const name = req.body.name;
    const date = req.body.date;

    db.query("INSERT INTO competiciones (name, date) VALUES (?, ?)",
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

// crea tabla de la liga con el nombre deseado
app.post('/createCompetition/:name', (req, res) => {
    const name = req.body.name;
    db.query("CREATE TABLE ?? (name VARCHAR(66) PRIMARY KEY, nickname VARCHAR(66), total VARCHAR(66))", [name], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
});

// crear columna en la tabla de la liga con el nombre deseado y columna con el nombre deseado
app.post('/createWod/:name', (req, res) => {
    const name = req.body.name;
    const wodName = req.body.wodName;

    db.query("ALTER TABLE ?? ADD prueba VARCHAR(255)", [name, wodName], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
});

/*************** GET ***************/ 
// obtener atletas tabla atletas
app.get('/atletas', (req, res) => {

    db.query("SELECT * FROM atletas ORDER BY name", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
});

app.get('/atletas/:name', (req, res) => {
    const name = req.params.name;

    db.query("SELECT * FROM atletas WHERE name = ?", name,
     (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
});

// obtener Competiciones tabla competiciones
app.get('/competiciones', (req, res) => {
    db.query("SELECT * FROM competiciones ORDER BY date", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
});

// obtener wods segun tabla solicitada $name
app.get('/wods/:name', (req, res) => {
    const name = req.params.name

    db.query("SELECT * FROM ??", 
    [name], 
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
});

/*************** UPDATE ***************/ 
// actualizar los datos de la tabla
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

/*************** DELETE ***************/ 
// borrar datos de atleta por email en tabla atletas
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

// borrar competicion segun nombre en tabla competiciones
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

app.delete('/dropTable/:name', (req, res) => {
    const name = req.params.name;

    db.query("DROP TABLE ?? ", name,
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