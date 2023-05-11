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
        // Object.values(rowData).forEach(value => {
        //   const cell = document.createElement('td');
        //   cell.textContent = value;
        //   row.appendChild(cell);
        // });
        Object.keys(rowData).forEach(key=>{
          const cell= document.createElement('td');
          if (key=='output'){
            const link = document.createElement('a');
            link.textContent = 'View';
            link.href = `/api/longblob-data-main?id=${rowData['id']}`;
            link.target = '_blank';
            cell.appendChild(link);
            row.appendChild(cell);
          }
          else if(key=='id'){
            // Do nothing
          }
          else{
            cell.textContent = rowData[key];
            row.appendChild(cell);
          }
          
        })
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error(error));
}

if (sessionStorage.getItem("loggedIn")) {
  fetchLatestBuilds();
}
else{
  window.location.href='http://localhost:3000/';
}