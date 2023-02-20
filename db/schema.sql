DROP DATABASE IF EXISTS emp_trackerdb;
CREATE DATABASE emp_tracker_db;

USE emp_tracker_db;

CREATE TABLE department (
  id: INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name: VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id: INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title: VARCHAR(30) NOT NULL,
  salary: DECIMAL NULL,
  department_id: INT NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
    id: INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name: VARCHAR(30) NULL,
    last_name: VARCHAR(30) NULL,
    role_id: INT NOT NULL,
    manager_id: INT NULL,
    FOREIGN KEY (role_id),
    REFERENCES role(id),
    FOREIGN KEY (manager_id),
    REFERENCES employee(id)
);