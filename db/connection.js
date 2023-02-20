
const mysql = require('mysql2')

// Connect to database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'nav',
      database: 'emp_tracker_db'
    },
    console.log(`Connected to the emp_tracker_db database.`)
  );

  connection.connect (function (err) {
    if (err) throw err;
  })


  module.exports = connection
