//mysql import to establish connection
const mysql = require('mysql2');

//dotenv to keep the password, username, and database secure
require('dotenv').config();

//assinging db to the mysql connection to then be exported
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: process.env.DB_USER,
    // Your MySQL password
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    rowsAsArray: false
}, console.log('Connected to the election database.'));

//exporting the connection to make SQL queries in functions.js
module.exports = db;