const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const table_name ={ login:"login" ,main:"regressionresult"};

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

// Define a route to handle tzhe SQL query and return the results as JSON
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const sqlData = `SELECT * FROM ${table_name.login} WHERE username='${username}' AND password='${password}'`;
    connection.query(sqlData, (error, dataResults, fields) => {
        if (error) throw error;
        res.json(dataResults);
    });
});

// Define a route to handle the SQL query and return the results as JSON
app.get('/api/sql-chart', (req, res) => {
    const sqlQuery = `SELECT outcome, COUNT(*) as frequency FROM ${table_name.main} GROUP BY outcome;`;
    
    connection.query(sqlQuery, (error, results, fields) => {
        if (error) throw error;
        const data = results;
        console.log(data);
        res.json(data);
    });
});

app.get('/api/sql-data', (req, res) => {
    const sqlHeader = 'SHOW COLUMNS FROM '+table_name.main;
    const sqlData = 'SELECT * FROM '+table_name.main;
    
    connection.query(sqlHeader, (error, headerResults, fields) => {
      if (error) throw error;
  
      connection.query(sqlData, (error, dataResults, fields) => {
        if (error) throw error;
  
        const header = headerResults.map(result => result.Field);
        const data = dataResults;
  
        const response = {
          header,
          data
        };
  
        res.json(response);
      });
    });
  });

  app.get('/api/class-names', (req, res) => {
  const sqlQuery = `
    SELECT DISTINCT className
    FROM ${table_name.main}
  `;
  
  connection.query(sqlQuery, (error, results, fields) => {
    if (error) throw error;
    const data = results.map(result => result.className);
    res.json(data);
  });
});

app.get('/api/class-names/:className', (req, res) => {
  const selectedClassName = req.params.className;
  const sqlQuery = `
    SELECT * ${table_name.main}
    WHERE className = '${selectedClassName}'
  `;
  
  connection.query(sqlQuery, (error, results, fields) => {
    if (error) throw error;
    const data = results;
    res.json(data);
  });
});

// Route to get all unique installer versions
app.get('/api/unique-installer-versions', (req, res) => {
    const sqlQuery = `SELECT DISTINCT installer_version FROM ${table_name.main} ORDER BY installer_version`;
  
    connection.query(sqlQuery, (error, results, fields) => {
      if (error) throw error;
      const data = results.map((result) => result.installer_version);
      console.log(data);
      res.json(data);
    });
  });
  
  // Route to get records of a particular installer version
  app.get('api/installer-version-records/:installer_version', (req, res) => {
    const installerVersion = req.query.installer_version;
    const sqlQuery = `SELECT * FROM ${table_name.main} WHERE installer_version = '${installerVersion}'`;
  
    connection.query(sqlQuery, (error, results, fields) => {
      if (error) throw error;
      const data = results;
      console.log(data);
      res.json(data);
    });
  });
  

app.get('/api/latest-builds', (req, res) => {
    const sqlQuery = `
        SELECT *
        FROM ${table_name.main} t1
        JOIN (
            SELECT installer_branch, MAX(job_buildnumber) AS max_buildnumber
            FROM ${table_name.main}
            GROUP BY installer_branch
        ) t2
        ON t1.installer_branch = t2.installer_branch
        AND t1.job_buildnumber = t2.max_buildnumber
    `;
    
    connection.query(sqlQuery, (error, results, fields) => {
        if (error) throw error;
        const data = results;
        res.json(data);
    });
});


app.use(express.static('public'));

// Start the server on port 3001 (or another port of your choice)
app.listen(3000, () => {
    console.log('Server listening on port 3001');
});
