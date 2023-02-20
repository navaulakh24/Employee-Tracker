const inquirer = require('inquirer');
const db = require('./db/index');
require('console.table');
start();

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

  const addRole = () => {

  }


  const updateEmpRole = () => {

  }


  const exitApp = () => {
    Connection.end();
  }





