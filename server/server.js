const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

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
  user: "root",
  host: "localhost",
  password: "",
  database: "vacceos_championships",
});

/*************** athlete ***************/
// obtener todos los atletas ordenados por nombre
app.get("/atheletes", (req, res) => {
  db.query("SELECT * FROM atletas ORDER BY nombre", async (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// obtener datos del atleta por nombre
app.get("/atheletes/:name", async (req, res) => {
  const name = req.params.name;

  db.query("SELECT * FROM atletas WHERE nombre = ?", name, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// obtener atletas femeninos de cualquier competicion
app.get("/atheletes/female/:competition", async (req, res) => {
  const competition = req.params.competition;
  const date = req.body.date;

  db.query(
    "SELECT * FROM puntuacion WHERE sex = 'Femenino' AND nombreComp = ? AND fecha = ?",
    [competition, date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// obtener atletas masculinos de cualquier competicion
app.get("/atheletes/male/:competition", async (req, res) => {
  const competition = req.params.competition;
  const date = req.body.date;

  db.query(
    "SELECT * FROM puntuacion WHERE sex = 'Masculino' AND nombreComp = ? AND fecha = ?",
    [competition, date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// insertar datos en tabla atletas
app.post("/atheletes", async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const nickname = req.body.nickname;
  const password = req.body.password;
  const sex = req.body.sex;

  db.query(
    "INSERT INTO `atletas` (`email`, `nombre`, `nick`, `pass`, `sex`) VALUES (?, ?, ?, ?, ?)",
    [email, name, nickname, password, sex],
    async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

// añadir atleta a base de datos de competicion
app.post("/atheletes/competition", async (req, res) => {
  const nombreComp = req.body.nombreComp;
  const name = req.body.name;
  const nick = req.body.nickname;
  const sex = req.body.sex;
  const email = req.body.email;
  const fecha = "";

  db.query(
    "INSERT INTO puntuacion (`nameAtl`, `sex`, `emailAtl`, `nickAtl`, `nombreComp`, `fecha`) VALUES (?, ?, ?, ?, ?, ?)",
    [name, sex, email, nick, nombreComp, fecha],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

// borrar datos de atleta por email en tabla atletas
app.delete("/atheletes/:email", async (req, res) => {
  const email = req.params.email;

  db.query("DELETE FROM atletas WHERE email = ?", email, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/*************** competitions ***************/
// obtener Competiciones tabla competiciones
app.get("/competitions", async (req, res) => {
  db.query("SELECT * FROM competiciones ORDER BY fecha", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// obtener Competiciones tabla competiciones por nombre de competición
app.get("/competitions/wods/:nombreComp", async (req, res) => {
  const name = req.params.nombreComp;

  db.query(
    "SELECT * FROM wods WHERE nombreComp = ? ORDER BY fecha",
    name,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/competitions/wods/:nombreComp/:fecha", async (req, res) => {
  const name = req.params.nombreComp;
  const date = req.params.fecha;

  db.query(
    "SELECT * FROM wods WHERE nombreComp = ? AND fecha = ?",
    [name, date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// insertar datos en tabla competiciones
app.post("/competitions", async (req, res) => {
  const nombreComp = req.body.name;
  const date = req.body.date;

  db.query(
    "INSERT INTO `competiciones` (`nombreComp`, `fecha`) VALUES (?, ?)",
    [nombreComp, date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

// añadir columna en la tabla de la competicion con la fecha del ejercicio
app.post("/competitions/wods", async (req, res) => {
  const nombreComp = req.body.name;
  const date = req.body.wodDate;
  const wod = req.body.wodBody;

  db.query(
    "INSERT INTO `wods` (`nombreComp`, `fecha`, wod) VALUES (?, ?, ?)",
    [nombreComp, date, wod],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

// borrar competicion segun nombre en tabla competiciones
app.delete("/competitions/:nombreComp", async (req, res) => {
  const nombreComp = req.params.nombreComp;

  db.query(
    "DELETE FROM competiciones WHERE nombreComp = ?",
    nombreComp,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// borrar wod seleccionado
app.delete("/competitions/wods/:date", async (req, res) => {
  const date = req.params.date;

  db.query("DELETE FROM wods WHERE fecha = ?", date, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/*************** wods ***************/
// obtener wods segun tabla solicitada
app.get("/wods", async (req, res) => {
  const name = req.params.name + "_wods";
  const date = req.params.date;

  db.query("SELECT * FROM ?? WHERE date = ?", [name, date], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// crea tabla de competicion con el nombre deseado + _wods, para insertar los ejercicios
app.post("/wods/table", async (req, res) => {
  const table2 = req.body.name + "_wods";

  db.query(
    "CREATE TABLE ?? (name VARCHAR(66), date VARCHAR(66) PRIMARY KEY, wod VARCHAR(66))",
    [table2],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// añadir wods en la tabla de la competicion con el nombre deseado
app.post("/wods/table/wods", async (req, res) => {
  const tableName = req.body.tableName + "_wods";
  const wodName = req.body.wodName;
  const wodDate = req.body.wodDate;
  const wodBody = req.body.wodBody;

  db.query(
    "INSERT INTO ?? (name, date, wod) VALUES (?, ?, ?)",
    [tableName, wodName, wodDate, wodBody],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// borrar columna en la tabla de la liga con la fecha del wod
app.post("/wods", async (req, res) => {
  const tableName = req.body.tableName;
  const wodDate = req.body.wodDate;

  db.query(
    "ALTER TABLE ?? DROP COLUMN ??",
    [tableName, wodDate],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// borrar competicion segun nombre en tabla competiciones
app.delete("/wods/table", async (req, res) => {
  const name = req.params.name + "_wods";

  db.query("DROP TABLE ?? ", name, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// borrar competicion segun nombre en tabla competiciones
app.delete("/wods/:tableName/:wodDate", async (req, res) => {
  const tableName = req.params.tableName + "_wods";
  const wodDate = req.params.wodDate;

  db.query(
    "DELETE FROM ?? WHERE date = ?",
    [tableName, wodDate],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log("Server up & running / Running on port: " + PORT);
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
