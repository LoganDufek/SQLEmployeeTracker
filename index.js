const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'KaguyaBestGirl1!',
    database: 'employeeTracker'
}, console.log('Connected to the election database.'));

class SQLStart {

    constructor() {

        this.answers = [];

    }


    promptUser() {
        inquirer.prompt([{
                type: "list",
                name: 'userChoice',
                message: "What Would you Like to Do?",
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add a Department',
                    'Add a Role',
                    'Add an Employee',
                    'Update an Employee Role'
                ]
            },]).then(({userChoice}) => {
            if (userChoice === 'View All Departments') {

                db.query(`SELECT * FROM department;`, (err, results) => {
                    if (err) {
                        res.statusMessage(400).json({error: res.message});
                    } else {
                        console.table(results);

                        this.promptUser();
                    }
                })
            }
            if (userChoice === 'View All Roles') {

                    db.query(`SELECT roles.id, roles.title, roles.salary, department.department_name AS department
                          FROM roles
                          JOIN department ON department.id = roles.department_id;`, (err, results) => {
                    if (err) {
                        res.statusMessage(400).json({error: res.message});
                    } else {
                        console.table(results);

                        this.promptUser();
                    }
                })
            }
            if (userChoice === 'View All Employees') {

                    db.query(`SELECT 
                              employee.first_name,  
                              employee.last_name,
                              roles.title,
                              roles.salary,
                              department.department_name AS department,
                              employee.manager_id AS manager
                          FROM employee
                              JOIN roles ON employee.role_id = roles.id
                              JOIN department ON roles.department_id = department.id
                              LEFT JOIN employee first_name
                              ON  employee.id = employee.manager_id;`, (err, results) => {
                    if (err) {
                        res.statusMessage(400).json({error: res.message});
                    } else {
                        console.table(results);

                        this.promptUser();
                    }
                })
            }

            if (userChoice === 'Add a Department') {

                    inquirer.prompt([{
                type: "text",
                name: 'departmentName',
                message: "What Would You Like to name this Department?"
                    }]).then(({departmentName}) => {
                
                    db.query(`INSERT INTO department (department_name)
                              VALUES (?);`, departmentName, (err, results) => {
                    {
                        console.table(results);

                        this.promptUser();
                    }
                })
            }
                    )}
        })


    }
};

new SQLStart().promptUser();
