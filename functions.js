const db = require('./connection')
const inquirer = require('inquirer');

let departmentName = [];

class Options {
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
   
departmentQuery = () => {


       return db.promise().query(`SELECT * FROM department;`)
            .then( ([rows,fields]) => {
             console.table(rows);
                })
                .catch(console.log)
                .then( () => {

                });       
    
}

rolesQuery = () => {

    return db.promise().query(`SELECT roles.id, roles.title, roles.salary, department.  department_name AS department
        FROM roles
        JOIN department ON department.id = roles.department_id;`)
            .then( ([rows,fields]) => {
             console.table(rows);
                })
                .catch(console.log)
                .then( () => {

                });       

}

employeesQuery = () => {

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


addDepartmentQuery = () => {

 return  inquirer.prompt([{
                        type: "text",
                        name: 'departmentName',
                        message: "What Would You Like to name this Department?"
                    }]).then(({departmentName}) => {


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


                ]).then(({roleName, roleSalary, roleDepartment}) => {

                    this.roleName.push(roleName)

            db.promise().query(`INSERT INTO roles (title, salary, department_id) 
                              VALUES (?, ?, ?);`, [
                        roleName,
                        roleSalary,
                        this.departmentName.indexOf(roleDepartment) + 1
                    ])
            .then( ([rows,fields]) => {
             console.log(`${departmentName} 'Added Sucessfully!'`);
                })
                .catch(console.log)
                .then( () => {

                });    
            })
}



addEmployeeQuery = () => {

    return  inquirer.prompt([
                   {
                        type: "text",
                        name: 'employeeFirstName',
                        message: "What's the new employee's First Name?"
                    }, {
                        type: "text",
                        name: 'employeeLastName',
                        message: "What's the new employee's First Name?"

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


                ]).then(({employeeFirstName, employeeLastName, employeeRole, employeeManager}) => {

                    if (employeeManager = 'None') {

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

                        let employeeFullName = `${employeeFirstName}  ${employeeLastName} `

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
                ]).then(({updatedRole, updateEmployee }) => {

                    

                        db.query(`UPDATE employee 
                            SET role_id = (?)
                            WHERE (?) ;  
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
}



module.exports = new Options(db);