
//Necessary require methods for both inquirer and SQL queries
const db = require('./connection')
const inquirer = require('inquirer');

//Class constructor that will be exported, contains all the necessary functions

class Options {

    //Constructor function containing the existing seed data 
    constructor (db) {
        this.db = db

        this.employeeNames = [
            'None',
            'Logan Dufek', 
            'Matt Smith', 
            'Vanessa Callaway', 
            'Cory Wilson ']

        this.departmentName = [
            'Sales', 
            'Legal', 
            'Engineering', 
            'Finance']

        this.roleName = [
            'Sales Lead',
            'Salesperson',
            'Lead Enginner',
            'Software Engineer',
            'Accountant',
            'Legal Team Lead',
            'Lawyer'
        ]


    }

//Function that returns all the department names from SQL
   
departmentQuery = () => {

        //Returns the console table of the SQL query

       return db.promise().query(`SELECT * FROM department;`)
            .then( ([rows,fields]) => {
             console.table(rows);
                })
                .catch(console.log)
                .then( () => {

                });       
    
}


//Function that returns all the roles, salary and department names from SQL

rolesQuery = () => {

    //Returns the console table of the SQL query

    return db.promise().query(`SELECT roles.id, roles.title, roles.salary, department_name AS department
        FROM roles
        JOIN department ON department.id = roles.department_id;`)
            .then( ([rows,fields]) => {
             console.table(rows);
                })
                .catch(console.log)
                .then( () => {

                });       

}

//Function that returns all the employees, their roles, salaries, departmentd, and managers (if any) from SQL

employeesQuery = () => {

         //Returns the console table of the SQL query

        return db.promise().query(`SELECT 
                            employee.first_name,  
                            employee.last_name,
                            roles.title,
                            roles.salary,
                            department.department_name AS department,
                            CONCAT (manager.first_name, ' ', manager.last_name) AS manager 
                        FROM employee
                            JOIN roles ON employee.role_id = roles.id
                            JOIN department ON roles.department_id = department.id
                            LEFT JOIN employee manager
                            ON  manager.id = employee.manager_id;`)
            .then( ([rows,fields]) => {
             console.table(rows);
                })
                .catch(console.log)
                .then( () => {

                });       

}

//Function that adds a department name to the SQL database based on user input

addDepartmentQuery = () => {

    //Required inquirer prompt

 return  inquirer.prompt([{
                        type: "text",
                        name: 'departmentName',
                        message: "What Would You Like to name this Department?"
            //destructure the name/answer to be used in the SQL Query
                    }]).then(({departmentName}) => {
                    this.departmentName.push(departmentName)

     db.promise().query(`INSERT INTO department (department_name)
                              VALUES (?);`, departmentName,)
            .then( ([rows,fields]) => {
             console.log(`${departmentName} 'Added Sucessfully!'`);
                })
                .catch(console.log)
                .then( () => {

                });    
            })
}


//Function that adds a role name/salary/department to the SQL database based on user input

addRoleQuery = () => {
            //    let i = 0;

            //         db.promise().query({sql: `SELECT * FROM department;`, rowsAsArray: true}).then(([rows]) => {
            //             let department = rows;
            //         let departmentRow = department.map(({id, name}) => {
            //             ({name: name,
            //                 value: id});
            //             })
                  
            //             console.log(departmentRow.name)
                    
            //     })
return  inquirer.prompt([
                    {
                        type: "text",
                        name: 'roleName',
                        message: "What Would You Like to name this Role?"
                    }, {
                        type: "number",
                        name: 'roleSalary',
                        message: "What is the Salary for this Role?"

                    }, {
                        type: "list",
                        name: 'roleDepartment',
                        message: "What Department does this Role belong to?",
                        choices: this.departmentName

                    }

                //destructure the answers to be used in the SQL Query
                ]).then(({roleName, roleSalary, roleDepartment}) => {

                    this.roleName.push(roleName)

            db.promise().query(`INSERT INTO roles (title, salary, department_id) 
                              VALUES (?, ?, ?);`, [
                        roleName,
                        roleSalary,
                        this.departmentName.indexOf(roleDepartment) + 1
                    ])
            .then( ([rows,fields]) => {
             console.log(`${roleName} 'Added Sucessfully!'`);
                })
                .catch(console.log)
                .then( () => {

                });    
            })
}

//Function that adds an employee name/role/manager to the SQL database based on user input

addEmployeeQuery = () => {

    return  inquirer.prompt([
                   {
                        type: "text",
                        name: 'employeeFirstName',
                        message: "What's the new employee's First Name?"
                    }, {
                        type: "text",
                        name: 'employeeLastName',
                        message: "What's the new employee's Last Name?"

                    }, {
                        type: "list",
                        name: 'employeeRole',
                        message: "What's this employee's role?",
                        choices: this.roleName

                    }, {
                        type: "list",
                        name: 'employeeManager',
                        message: "Who's this employee's Manager?",
                        choices: this.employeeNames

                    }

            //destructure the answers to be used in the SQL Query
                ]).then(({employeeFirstName, employeeLastName, employeeRole, employeeManager}) => {

                    //Set a special case in case no manager is selected for the employee
                    if (employeeManager === 'None') {

                       let employeeFullName = `${employeeFirstName + ' ' + employeeLastName}`

                        this.employeeNames.push(employeeFullName)

                        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)  
                              VALUES (?, ?, ?, ?);`, [
                            employeeFirstName,
                            employeeLastName,
                            this.roleName.indexOf(employeeRole) + 1,
                            null
                        ], (err) => {
                            {
                                if (err) {
                                    console.log(err)
                                } 
                            }
                        })

                    } else {

                       let employeeFullName = `${employeeFirstName + ' ' + employeeLastName}`

                        this.employeeNames.push(employeeFullName)

                        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                              VALUES (?, ?, ?, ?);`, [
                            employeeFirstName,
                            employeeLastName,
                            this.roleName.indexOf(employeeRole) + 1,
                            this.employeeNames.indexOf(employeeManager)
                        ], (err) => {
                            {
                                if (err) {
                                    console.log(err)
                                } 
                            }
                        })
                    }
                })

}

//Function that updates an employee's role and passes it to the SQL database based on user input
updateEmployeeQuery = () => {

        return  inquirer.prompt([
                    {
                        type: "list",
                        name: 'updateEmployee',
                        message: "Which Employee would you like to update?",
                        choices: this.employeeNames

                    },
                    {
                        type: "list",
                        name: 'updatedRole',
                        message: "What is their new Role in the Company?",
                        choices: this.roleName

                    }
                //destructure the answers to be used in the SQL Query
                ]).then(({updateEmployee, updatedRole }) => {    
                                      
                        db.query(`UPDATE employee 
                            SET role_id = ?
                            WHERE id = ? ;  
                              `, [
                            this.roleName.indexOf(updatedRole) + 1,
                            this.employeeNames.indexOf(updateEmployee)
                    
                        ], (err) => {
                            {
                                if (err) {
                                    console.log(err)
                                } 
                            }
                        })
                
            })

        
    }


//Function that updates an employee's manager and passes it to the SQL database based on user input

updateManagerQuery = () => {

        return  inquirer.prompt([
                    {
                        type: "list",
                        name: 'updateEmployee',
                        message: "Which Employee would you like to update?",
                        choices: this.employeeNames

                    },
                    {
                        type: "list",
                        name: 'updatedManager',
                        message: "Who is their new Manager?",
                        choices: this.employeeNames

                    }

                //destructure the answers to be used in the SQL Query
                ]).then(({ updateEmployee, updatedManager }) => { 

                         //Set a special case in case no manager is selected for the employee

                         if (updatedManager === 'None') {

                        db.query(`UPDATE employee 
                            SET manager_id = ?
                            WHERE id = ? ;  
                              `, [
                            null,
                            this.employeeNames.indexOf(updateEmployee)
                    
                        ], (err) => {
                            {
                                if (err) {
                                    console.log(err)
                                } 
                            }
                        })

                    } else {

                        db.query(`UPDATE employee 
                            SET manager_id = ?
                            WHERE id = ? ;  
                              `, [
                            this.employeeNames.indexOf(updatedManager),
                            this.employeeNames.indexOf(updateEmployee)
                    
                        ], (err) => {
                            {
                                if (err) {
                                    console.log(err)
                                } 
                            }
                        })
                }
            })
        
        }

    
    

}

//Export the Class to be used in index.js

module.exports = new Options(db);