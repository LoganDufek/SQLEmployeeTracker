SELECT 
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
    ON  employee.id = employee.manager_id;
