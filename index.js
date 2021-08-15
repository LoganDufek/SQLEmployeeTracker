
//Necessary requirement method imports
const inquirer = require('inquirer');
const cTable = require('console.table');
const Options = require('./functions');

//The Main function containing the lead inquirer prompt 

const Main = () => {
        inquirer.prompt([{
                type: "list",
                name: 'userChoice',
                message: "What Would you Like to Do?",
                //Choices set up as an array of objects, to be used later in a switch statment
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
                         name: "Update an Employee's Role",
                         value: 6
                    },
                    {
                         name: "Update an Employee's Manager",
                         value: 7
                    },
                    
                ]
            }
            ]).then(response => {
                
                //pass the response into the switch statment and depending on the answer, running the appropriate function
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
                    case 7 :
                        updateManager()
                        break;
                }
            })

};

//Calls the function from functions.js and then runs Main again to present the menu to the user

 const viewDepartment = () => {

            Options.departmentQuery().then(() => {
                Main();
            });
                

}

//Calls the function from functions.js and then runs Main again to present the menu to the user

const viewRoles = () => {

            Options.rolesQuery().then(() => {
                Main();
            });
                

}

//Calls the function from functions.js and then runs Main again to present the menu to the user

const viewEmployees = () => {

            Options.employeesQuery().then(() => {
                Main();
            });
}

//Calls the function from functions.js and then runs Main again to present the menu to the user

const addDepartment = () => {

            Options.addDepartmentQuery().then(() => {
                Main();
            });

}

//Calls the function from functions.js and then runs Main again to present the menu to the user

const addRole = () => {

            Options.addRoleQuery().then(() => {
                Main();
            });

}

//Calls the function from functions.js and then runs Main again to present the menu to the user

const addEmployee = () => {

            Options.addEmployeeQuery().then(() => {
                Main();
            });
}

//Calls the function from functions.js and then runs Main again to present the menu to the user

const updateEmployee = () => {

            Options.updateEmployeeQuery().then(() => {
                Main();
            });

}

//Calls the function from functions.js and then runs Main again to present the menu to the user

const updateManager = () => {

            Options.updateManagerQuery().then(() => {
                Main();
            });
}


//Cal the main function to start when node index is run
Main();


