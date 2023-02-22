const inquirer = require('inquirer');
const db = require('./db/index');
require('console.table');
start();

const connection = require('./db/connection')


function start() {
  inquirer.prompt({
    type: 'list',
    name: "toDo",
    message: 'What would you like to do?',
    choices: [
      'View all employees',
      'View all departments',
      'View all employees by Department',
      'View all roles',
      'Add employee',
      'Add department',
      'Add role',
      'Update employee role',
      'EXIT'
    ],
  })
    .then(answer => {
      switch (answer.toDo) {
        case 'View all employees':
          viewAllEmp();
          break;
        case 'View all departments':
          viewAllDepart();
          break;
        case 'View all employees by Department':
          viewEmpByDepart();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'Add employee':
          addEmployee();
          break;
        case 'Add department':
          addDepartment();
          break;
        case 'Add role':
          addRole();
          break;
        case 'Update employee role':
          updateEmpRole();
          break;
        case 'EXIT':
          exitApp();
          break;
      }
    });
};

const viewAllEmp = () => {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows
      console.table(employees)
    })
    .then(() => start())
}

const viewEmpByDepart = () => {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows
      console.table(departments)
    })
    .then(() => start())
}

const viewAllRoles = () => {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows
      console.table(roles)
    })
    .then(() => start())
}

const viewAllDepart = () => {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows
      console.table(departments)
    })
    .then(() => start())
}

const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "what is the employee's first name?"
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?"
    }
  ])
    .then(answer => {
      let firstName = answer.firstName
      let lastName = answer.lastName
      db.findAllRoles()
        .then(([rows]) => {
          let roles = rows
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
          }))
          inquirer.prompt({
            type: 'list',
            name: 'roleId',
            message: "What is the employee's role?",
            choices: roleChoices
          })
            .then(answer => {
              let roleId = answer.roleId
              db.findAllEmployees()
                .then(([rows]) => {
                  let employees = rows
                  const managerChoices = roles.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                  }))
                  managerChoices.unshift({ name: 'None', value: NULL })
                  inquirer.prompt({
                    type: 'list',
                    name: 'managerId',
                    message: "Who is the employee's manager?",
                    choices: managerChoices
                  })
                    .then(answer => {
                      let employee = {
                        manager_id: answer.managerId,
                        role_id: roleId,
                        first_name: firstName,
                        last_name: lastName
                      }
                      db.createEmployee(employee)
                    })
                    .then(() => start())
                })
            })
        });
    });
};

const addDepartment = () => {
  connection.query("SELECT * FROM department", (err, departments) => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'newDepartment',
        message: "What is the name of the department you would like to add?"
      }
    ]).then((answer) => {
      connection.query(`INSERT INTO department (name) VLAUES (?)`,
        {
          name: answer.newDepartment
        },
        (err) => {
          if (err) throw err
          console.table("A new department has been added!");
          start();
        })
    });
  })
}

const addRole = () => {
  connection.query("SELECT * FROM department", (err, departments) => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: "Please enter the new role:"
      },
      {
        type: 'input',
        name: 'salary',
        messag: "Please enter the salary for this role:"
      },
      {
        type: 'list',
        name: 'department',
        message: "Please select the department for this role:",
        choices: departments.map(department => {
          return { name: department.name, value: department.id }
        })
      },
    ]).then((answer) => {
      connection.query(`INSERT INTO role SET ?`,
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department
        },
        (err) => {
          if (err) throw err
          console.table("Your new role has been added.");
          start();
        })
    })
  })
}

const updateEmpRole = () => {
  const query = `SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id`;

  connection.query(query, (err, res) => {
    if (err) throw err
    console.log(res);
    const updateRoleQuery = `UPDATE employee SET role_id = ? WHERE last_name = ?`;

    inquirer.prompt([
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?"
      },
      {
        type: 'input',
        name: 'roleId',
        message: "What is the employee's new role ID?"
      }
    ]).then(answers => {
      const { lastName, roleId } = answers;
      connection.query(updateRoleQuery, [roleId, lastName], (err, res) => {
        if (err) throw err;
        console.log(`Successfully updated ${res.affectedRows} employee's role`);
      });
    });
  });
};



const exitApp = () => {
  Connection.end();
}
