// function fetchLatestBuilds() {
//     // Make a GET request to the server's /api/latest-builds endpoint
//     fetch('/api/latest-builds')
//       .then(response => response.json()) // Parse the response body as JSON
//       .then(data => {
//         console.log(data);
//       })
//       .catch(error => {
//         console.error(error); 
//       });
//   }
function fetchLatestBuilds() {
  // Make a GET request to the server's /api/latest-builds endpoint
  fetch('/api/latest-builds')
    .then(response => response.json()) // Parse the response body as JSON
    .then(data => {
      console.log(data);
      const tableBody = document.querySelector('#record-table tbody');
      // Clear the table body
      tableBody.innerHTML = '';

      // Create table rows
      data.forEach(rowData => {
         // create a new table row element
        const row = document.createElement('tr');
        // create a table cell element for each data value
        Object.values(rowData).forEach(value => {
          const cell = document.createElement('td');
          cell.textContent = value;
          row.appendChild(cell);
        });
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error(error));
}
  
/*
function fetchLatestBuilds() {
  // Make a GET request to the server's /api/latest-builds endpoint
  fetch('/api/latest-builds')
    .then(response => response.json()) // Parse the response body as JSON
    .then(data => {
      console.log(data);
      const tableHead = document.querySelector('#record-table thead');
      const tableBody = document.querySelector('#record-table tbody');

      // Clear the table
      tableHead.innerHTML = '';
      tableBody.innerHTML = '';

      // Create table header row
      const headerRow = document.createElement('tr');
      const headers = Object.keys(data[0]);
      headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
      });
      tableHead.appendChild(headerRow);

      // Create table rows
      data.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
          const td = document.createElement('td');
          td.textContent = row[header];
          tr.appendChild(td);
        });
        tableBody.appendChild(tr);
      });
    })
    .catch(error => {
      console.error(error); 
    });
}
  */



if (sessionStorage.getItem("loggedIn")) {
  fetchLatestBuilds();
}
else{
  window.location.href='http://localhost:3000/';
}