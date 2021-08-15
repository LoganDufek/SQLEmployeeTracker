SELECT 
    employee.first_name,  
    employee.last_name,
    roles.title,
    roles.salary,
    department.department_name AS department,
    CONCAT (manager.first_name, manager.last_name) AS manager 
FROM employee
    JOIN roles ON employee.role_id = roles.id
    JOIN department ON roles.department_id = department.id
    LEFT JOIN employee manager
    ON  manager.id = employee.manager_id;
