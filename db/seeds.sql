INSERT INTO department (department_name)
    VALUES  ('Sales'),
            ('Legal'),
            ('Engineering'),
            ('Finance');

INSERT INTO roles (title, salary, department_id)
    VALUES ('Sales Lead', 30000.00, 1),
           ('Salesperson', 25000.00, 1),
           ('Lead Enginner', 55000.00, 3),
           ('Software Engineer', 45000.00, 3 ),
           ('Accountant', 40000.00, 4),
           ('Legal Team Lead', 75000.00, 2),
           ('Lawyer', 70000.00, 2);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES  ('Logan', 'Dufek', 3, null),
            ('Matt', 'Smith', 4, 1),
            ('Vanessa', 'Callaway', 6, null),
            ('Cory', 'Wilson', 7, 3);


-- ALTER TABLE employee 
--     ADD  FOREIGN KEY (manager_id) REFERENCES employee(id);

-- INSERT INTO employee (manager_id) 
--     VALUES  (0),
--             (1),
--             (0),
--             (3)

-- INSERT INTO employee (manager_id)
--     VALUES  (0),
--             (1),
--             (0),
--             (3);



