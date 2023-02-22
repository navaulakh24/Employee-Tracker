const connection = require('./connection')

class DB {
    constructor(connection) {
        this.connection = connection
    }
    findAllEmployees(){
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;"
        )
    }
    findAllDepartments() {
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        )
    }
    findAllRoles() {
        return this.connection.promise().query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;"
        )
    }
    createEmployee (employee) {
        return this.connection.promise().query(
            "INSERT INTO employee SET ?", employee
        )
    }
    // // create new role
    // createNewRole(role) {
    //     return this.connection.promise().query(
    //         `INSERT INTO role SET ? `, role
    //     )
    // }

    
    // create new department
    // update an employee
}

module.exports = new DB(connection)