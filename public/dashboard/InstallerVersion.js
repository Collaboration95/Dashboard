const versionSelect = document.querySelector('#installer-name');
const classNameSelect = document.getElementById('installer-name');
const searchBtn = document.getElementById('search-btn');
const tableBodyEl = document.querySelector('#record-table').getElementsByTagName('tbody')[0];
let sqlData;

// Fetch unique class names from the server
fetch('/api/installer-name')
  .then(response => response.json())
  .then(data => {
    // Populate class name dropdown with unique class names
    data.forEach(installerName => {
      const option = document.createElement('option');
      option.text = installerName;
      classNameSelect.add(option);
    });
  })
  .catch(error => console.error(error));

const buttonEvent = () => {
  const selectedInstallerVersion = versionSelect.value;
  // Fetch records for selected installer version from the server
  fetch(`/api/installer-versions/${selectedInstallerVersion}`)
    .then(response => response.json())
    .then(data => {
      // Render the table header if it doesn't exist
      const tableHeader = document.querySelector('#record-table thead');
      if (!tableHeader.querySelector('tr')) {
        const headerRow = document.createElement('tr');
        data.header.forEach(headerText => {
          const th = document.createElement('th');
          th.textContent = headerText;
          headerRow.appendChild(th);
        });
        tableHeader.appendChild(headerRow);
      }

      // Render the table body
      tableBodyEl.innerHTML = '';
      data.data.forEach(row => {
        const tr = document.createElement('tr');
        data.header.forEach(header => {
          const td = document.createElement('td');
          td.textContent = row[header];
          tr.appendChild(td);
        });
        tableBodyEl.appendChild(tr);
      });
    })
    .catch(error => console.error(error));
}


if (sessionStorage.getItem("loggedIn")) {
  searchBtn.addEventListener('click',buttonEvent );
}
else{
  window.location.href='http://localhost:3000/';
}