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
  



if (sessionStorage.getItem("loggedIn")) {
  fetchLatestBuilds();
}
else{
  window.location.href='http://localhost:3000/';
}