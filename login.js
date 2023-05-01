// const express = require('express');
// const mysql = require('mysql2');
// const app = express();
// const table_name = "login"
// // Set up a MySQL connection
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Mcqueen@$95',
//     database: 'test_db'
//   });

// // Define a route to handle the SQL query and return the results as JSON
// app.get('/api/login', (req, res) => {
//     const sqlData = 'SELECT * FROM '+table_name;
//       connection.query(sqlData, (error, dataResults, fields) => {
//         if (error) throw error;
//         const response = {data};
//         res.json(response);
//       });

//   });

// app.use(express.static('public'));

//   // Start the server on port 3001 (or another port of your choice)
//   app.listen(3001, () => {
//     console.log('Server listening on port 3001');
//   });
  
  
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const table_name = "login"

// Set up a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mcqueen@$95',
    database: 'test_db'
});

// Use middleware to parse HTTP POST request data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define a route to handle the SQL query and return the results as JSON
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const sqlData = `SELECT * FROM ${table_name} WHERE username='${username}' AND password='${password}'`;
    connection.query(sqlData, (error, dataResults, fields) => {
        if (error) throw error;
        res.json(dataResults);
    });
});

app.use(express.static('public'));

// Start the server on port 3001 (or another port of your choice)
app.listen(3001, () => {
    console.log('Server listening on port 3001');
});
