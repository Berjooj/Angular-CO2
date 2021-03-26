const mysql = require('mysql');

let pool = mysql.createPool({
    "user": "root",
    "password": "",
    "database": "user_sample",
    "host": "localhost",
    "port": 3306
})

exports.pool = pool;