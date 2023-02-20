const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const Connection = require('mysql2/typings/mysql/lib/Connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'nav',
    database: 'emp_tracker_db'
  },
  console.log(`Connected to the emp_tracker_db database.`)
);

const start = () => {
  inquirer.createPromptModule({
    type:'list',
    name: "toDo",
    message: 'What would you like to do?',
    choices: [
      'View all employees',
      'View all departments',
      'View all employees by Department',
      'View all roles',
      'Add eomplyee',
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

}

const viewEmpByDepart = () => {

}

const viewAllRoles = () => {
Connection.query("SELECT * FROM department", (err, res) => {
  if (err) throw err
  console.table(res)
  start()
});
}

const viewAllDepart = () => {
  Connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err
    console.table(res)
    start()
  });
}

const addEmployee = () => {
Connection.query("SELECT * FROM role", (err, roles) => {
  Connection.query("SELECT * FROM eployee", (err, managers) => {
    inquirer.prompt ([
      {
        type:'input',
        name: 'firstName',
        message: "what is the employee's first name?"
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?"
      },
      {
        type: 'list',
        name: 'roleId',
        message: "What is the employee's role?",
        choices: roles.map(role => {
          return { name: role.title, value: role.id }
        })
      },
      {
        type: 'list',
        name: 'managerId',
        message: "Who is the employee's manager?",
        choices: managers.map(manager => {
          return { name: `${manager.first_name} ${manager.last_name}`, value: manager.id}
        })
      },
    ])
    .then (answer => {
      Connection.query ('INSERT INTO employee SET ?',
      {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: answer.roleId || 0,
        manager_id: answer.managerId || 0,
      },
      (err) => {
        if (err) throw err
        console.table('Your employee has been added.');
        start();
      }
      )
    });
  });
});
}

const addRole = () => {

}


const updateEmpRole = () => {

}


Connection.connect((err) => {
  if (err) throw err;
  start();
});

const exitApp = () => {
  Connection.end();
}



























// Query database
let deletedRow = 2;

db.query(`DELETE FROM favorite_books WHERE id = ?`, deletedRow, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Query database
db.query('SELECT * FROM favorite_books', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
