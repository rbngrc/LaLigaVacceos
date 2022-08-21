const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// const PORT = process.env.PORT || 4000;
const PORT = 3001;

// datos de conexión a la base de datos
// const db = mysql.createPool({
//     user: 'vNoSui2oOC',
//     host: 'remotemysql.com',
//     password: 'RLKb8X8pYt',
//     database: 'vNoSui2oOC'
// });

const db = mysql.createPool({
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
        "INSERT INTO `atletas` (`email`, `name`, `nickname`, `password`, `sex`, `competition`) VALUES (?, ?, ?, ?, ?, ?)",
        [email, name, nickname, password, sex, competition],
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

app.post('/createCompetitionsWods/:name', (req, res) => {
    const table2 = req.body.name + "_prueba";
    db.query("CREATE TABLE ?? (name VARCHAR(66) PRIMARY KEY, wod VARCHAR(66))", [table2], (err, result) => {
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
    const wodDate = req.body.wodDate;
    const wodBody = req.body.wodBody;

    db.query("ALTER TABLE ?? ADD ?? VARCHAR(255)", [name, wodDate, wodBody], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
});

// añadir atleta a base de datos de competicion
// app.post('/createCompetition', (req, res) => {
// const name = req.body.name;
// const date = req.body.date;

// db.query("INSERT INTO competiciones (name, date) VALUES (?, ?)",
//     [name, date],
//     (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send("Values Inserted");
//         }
//     }
// );
// });

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

// obtener atletas tabla atletas femeninos
app.get('/atletasFemeninos/:competition', (req, res) => {
    const competition = req.params.competition;
    db.query("SELECT * FROM ? WHERE sex = 'Femenino'", 
    [competition],
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
});

// obtener atletas tabla atletas masculinos
app.get('/atletasMasculinos/:competition', (req, res) => {
    const competition = req.params.competition;
    db.query("SELECT * FROM ? WHERE sex = 'Masculino'", 
    [competition],
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
});

// obtener datos del atleta por nombre dado
app.get('/atletas/:name', (req, res) => {
    const name = req.params.name;
    db.query("SELECT * FROM atletas WHERE name = ?", 
    [name],
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
    const name = req.params.name + "_prueba";

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

app.delete('/dropTableWods/:name', (req, res) => {
    const name = req.params.name + "_prueba";

    db.query("DROP TABLE ?? ", name,
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(PORT, () => {
    console.log("Server up & running / Running on port: " + PORT)
});
