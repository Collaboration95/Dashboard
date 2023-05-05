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
    SELECT *
    FROM ${table_name.main}
    WHERE className = '${selectedClassName}'
  `;

  const getColumnNamesQuery = `
    SELECT COLUMN_NAME
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = '${table_name.main}' AND TABLE_SCHEMA='test_db'
    ORDER BY ORDINAL_POSITION
  `;

  connection.query(getColumnNamesQuery, (error, result) => {
    if (error) throw error;
    const header = result.map(res => res.COLUMN_NAME);
    connection.query(sqlQuery, (error, results, fields) => {
      if (error) throw error;
      const data = { header, data: results };
      res.json(data);
    });
  });
});

app.get('/api/installer-name', (req, res) => {
  const sqlQuery = `
    SELECT DISTINCT installer_version
    FROM ${table_name.main}
  `;
  
  connection.query(sqlQuery, (error, results, fields) => {
    if (error) throw error;
    const data = results.map(result => result.installer_version);
    res.json(data);
  });
});

app.get('/api/installer-versions/:installerVersion', (req, res) => {
  const selectedInstallerVersion = req.params.installerVersion;
  const sqlQuery = `
    SELECT * FROM ${table_name.main}
    WHERE installer_version = '${selectedInstallerVersion}'
  `;
  
  connection.query(sqlQuery, (error, results, fields) => {
    if (error) throw error;
    const data = {
      header: Object.keys(results[0]),
      data: results
    };
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

app.get('/api/longblob-data', (req, res) => {
  const id = req.query.id;
  const sqlData = 'SELECT output FROM ' + table_name.main + ' WHERE id = ?';
  connection.query(sqlData, [id], (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    const longblobData = results[0].output; 
    const textData = longblobData.toString("utf-8");
    res.json({ data: textData });
  });
});

app.use(express.static('public'));

// Start the server on port 3001 (or another port of your choice)
app.listen(3000, () => {
    console.log('Server listening on port 3001');
});
