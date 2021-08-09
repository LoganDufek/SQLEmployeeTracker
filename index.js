const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'KaguyaBestGirl1!',
    database: 'employeeTracker'
  },
  console.log('Connected to the election database.')
);
