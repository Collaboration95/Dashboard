const classNameSelect = document.getElementById('class-name');
const searchBtn = document.getElementById('search-btn');
const recordTable = document.getElementById('record-table').getElementsByTagName('tbody')[0];

// Fetch unique class names from the server
fetch('/api/class-names')
  .then(response => response.json())
  .then(data => {
    // Populate class name dropdown with unique class names
    data.forEach(className => {
      const option = document.createElement('option');
      // option.text = className;
      // classNameSelect.add(option);
      const regexMatch = className.match(/(?<=\.)([^\.]+)$/);
      option.text = regexMatch ? regexMatch[0] : className;
      option.value = className; // Use the original className as the option value
      classNameSelect.add(option);
    });
  })
  .catch(error => console.error(error));

  
const tableBodyEl = document.querySelector('#record-table tbody');
let sqlData;
const buttonEvent = () => {
  const selectedClassName = classNameSelect.value;
  
  // Fetch records for selected class name from the server
  fetch(`/api/class-names/${selectedClassName}`)
    .then(response => response.json())
    .then(data => {
      sqlData = data;

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
searchBtn.addEventListener('click',buttonEvent);


if (sessionStorage.getItem("loggedIn")) {
  searchBtn.addEventListener('click',buttonEvent);
}
else{
  window.location.href='http://localhost:3000/';
}