INSERT INTO department (name)
VALUES (1),
       (2),
       (5),
       (10),
       (15);

INSERT INTO role (title, salary, department_id)
VALUES ("The Great Gatsby", true, 1),
       ("Huckleberry Finn", true, 3),
       ("100 Years of Solitude", false, 5),
       ("Things Fall Apart", false, 1),
       ("Crime and Punishment", true, 2),
       ("Moby Dick", true, 4),
       ("Decameron", false, 1);


INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Nav", "Aulakh", 3),
       ("John", "Doe", 5);