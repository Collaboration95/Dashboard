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
      option.text = className;
      classNameSelect.add(option);
    });
  })
  .catch(error => console.error(error));

// Event listener for search button
searchBtn.addEventListener('click', () => {
  const selectedClassName = classNameSelect.value;
  
  // Fetch records for selected class name from the server
  fetch(`/api/class-names/${selectedClassName}`)
    .then(response => response.json())
    .then(data => {
      // Clear previous table data
      recordTable.innerHTML = '';
      
      // Populate table with records for selected class name
      data.forEach(record => {
        const row = recordTable.insertRow();
        row.insertCell().innerText = record.id;
        row.insertCell().innerText = record.outcome;
        row.insertCell().innerText = record.installer_branch;
        row.insertCell().innerText = record.className;
      });
    })
    .catch(error => console.error(error));
});
