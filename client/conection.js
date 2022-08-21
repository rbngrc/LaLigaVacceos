const mysql = require('mysql2');

const db = mysql.createPool({
    user: 'vNoSui2oOC',
    host: 'remotemysql.com',
    password: 'RLKb8X8pYt',
    database: 'vNoSui2oOC'
});

//     const db = mysql.createPool({
//     user: 'root',
//     host: 'localhost',
//     password: '',
//     database: 'vacceos_championships'
// });

module.exports = db;