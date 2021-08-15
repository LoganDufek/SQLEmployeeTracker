const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const Options = require('./functions')

require('dotenv').config();

const Main = () => {
        inquirer.prompt([{
                type: "list",
                name: 'userChoice',
                message: "What Would you Like to Do?",
                choices: [
                    {
                        name: 'View All Departments',
                        value: 0,
                    },
                    {
                        name: 'View All Roles',
                        value: 1,
                    },
                    {
                        name: 'View All Employees',
                        value: 2,
                    },
                    {
                        name: 'Add a Department',
                        value: 3,
                    },
                    {
                        name: 'Add a Role',
                        value: 4,
                    },
                    {
                        name: 'Add an Employee',
                        value: 5,
                    },
                    {
                         name: 'Update an Employee Role',
                        value: 6
                    } 
                ]
            }
            ]).then(response => {
            
                let choice = response.userChoice 
                switch (choice) {
                    case 0 :
                        viewDepartment()
                        break;
                    case 1 :
                        viewRoles()
                        break;
                    case 2 : 
                        viewEmployees()
                        break;
                    case 3 : 
                        addDepartment()
                        break;
                    case 4 : 
                        addRole()
                        break;
                    case 5 :
                        addEmployee()
                        break;
                    case 6 : 
                        updateEmployee()
                        break;
                
                }
            })

};

 const viewDepartment = () => {

            Options.departmentQuery().then(() => {
                Main();
            });
                

}

const viewRoles = () => {

            Options.rolesQuery().then(() => {
                Main();
            });
                

}

const viewEmployees = () => {

            Options.employeesQuery().then(() => {
                Main();
            });
}

const addDepartment = () => {

            Options.addDepartmentQuery().then(() => {
                Main();
            });

}

const addRole = () => {

            Options.addRoleQuery().then(() => {
                Main();
            });

}

const addEmployee = () => {

     Options.addEmployeeQuery().then(() => {
                Main();
            });
}

const updateEmployee = () => {

    Options.updateEmployeeQuery().then(() => {
                Main();
            });

}


Main();


