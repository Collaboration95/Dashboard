let sqlData;
const tableBodyEl = document.querySelector('#record-table tbody');
const classNameSelect = document.getElementById('class-name');
const searchBtn = document.getElementById('search-btn');



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

  const passtablecontainer = document.querySelector(".passed");
  const failedtablecontainer = document.querySelector(".failed")
  const passTableHeader = document.querySelector('#pass-table thead tr');
  const passTableBody = document.querySelector('#pass-table tbody');
  const failTableHeader = document.querySelector('#fail-table thead tr');
  const failTableBody = document.querySelector('#fail-table tbody');
  const buttonEvent = () => {
    const selectedClassName = classNameSelect.value;
    passtablecontainer.style.display = "";
    failedtablecontainer.style.display = "";
    var failed = 0;
    var passed = 0;

    // Fetch records for selected class name from the server
    fetch(`/api/class-names/${selectedClassName}`)
      .then(response => response.json())
      .then(data => {
        sqlData = data;
        console.log(data);
        // Render the table headers if they don't exist and the table is not empty
        if (data.data.length > 0) {
          if (!passTableHeader.querySelector('th')) {
            data.header.forEach(headerText => {
              const th = document.createElement('th');
              th.textContent = headerText;
              passTableHeader.appendChild(th);
            });
          }
  
          if (!failTableHeader.querySelector('th')) {
            data.header.forEach(headerText => {
              const th = document.createElement('th');
              th.textContent = headerText;
              failTableHeader.appendChild(th);
            });
          }
        } else {
          // If the table is empty, hide the headers
          passTableHeader.style.display = 'none';
          failTableHeader.style.display = 'none';
        }
  
        // Render the table bodies
        passTableBody.innerHTML = '';
        failTableBody.innerHTML = '';
        data.data.forEach(row => {
          if (row.outcome === 'Passed') {
            passed=1;
            const tr = document.createElement('tr');
            data.header.forEach(header => {
              const td = document.createElement('td');
              td.textContent = row[header];
              tr.appendChild(td);
            });
            passTableBody.appendChild(tr);
          } else if (row.outcome === 'Failed') {
            failed=1;
            const tr = document.createElement('tr');
            data.header.forEach(header => {
              const td = document.createElement('td');
              td.textContent = row[header];
              tr.appendChild(td);
            });
            failTableBody.appendChild(tr);
          }
          if (passed==0){
            passtablecontainer.style.display="none";
          }
          else{
            passtablecontainer.style.display="";
          }

          if (failed==0){
            failedtablecontainer.style.display="none";
          }
          else{
         failedtablecontainer.style.display="";
          }
        });
      })
      .catch(error => console.error(error));
  }
    
  // const buttonEvent = () => {
  //   const selectedClassName = classNameSelect.value;
  //   // Fetch records for selected class name from the server
  //   fetch(`/api/class-names/${selectedClassName}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       sqlData = data;
  //       console.log(data);
  //       // Render the table headers if they don't exist
  //       if (!passTableHeader.querySelector('th')) {
  //         data.header.forEach(headerText => {
  //           const th = document.createElement('th');
  //           th.textContent = headerText;
  //           passTableHeader.appendChild(th);
  //         });
  //       }
  
  //       if (!failTableHeader.querySelector('th')) {
  //         data.header.forEach(headerText => {
  //           const th = document.createElement('th');
  //           th.textContent = headerText;
  //           failTableHeader.appendChild(th);
  //         });
  //       }
  
  //       // Render the table bodies
  //       passTableBody.innerHTML = '';
  //       failTableBody.innerHTML = '';
  //       data.data.forEach(row => {
  //         if (row.outcome === 'Passed') {
  //           const tr = document.createElement('tr');
  //           data.header.forEach(header => {
  //             const td = document.createElement('td');
  //             td.textContent = row[header];
  //             tr.appendChild(td);
  //           });
  //           passTableBody.appendChild(tr);
  //         } else if (row.outcome === 'Failed') {
  //           const tr = document.createElement('tr');
  //           data.header.forEach(header => {
  //             const td = document.createElement('td');
  //             td.textContent = row[header];
  //             tr.appendChild(td);
  //           });
  //           failTableBody.appendChild(tr);
  //         }
  //       });
  //     })
  //     .catch(error => console.error(error));
  // }
  
  // const buttonEvent = () => {
  //   const selectedClassName = classNameSelect.value;
  //   const passTableContainer = document.querySelector('#pass-table-container');
  //   const failTableContainer = document.querySelector('#fail-table-container');
  
  //   // Fetch records for selected class name from the server for outcome = passed
  //   fetch(`/api/class-names/${selectedClassName}?outcome=passed`)
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.data.length > 0) {
  //         // Render the passed table header if it doesn't exist
  //         const passTableHeader = passTableContainer.querySelector('thead');
  //         if (!passTableHeader.querySelector('tr')) {
  //           const headerRow = document.createElement('tr');
  //           data.header.forEach(headerText => {
  //             const th = document.createElement('th');
  //             th.textContent = headerText;
  //             headerRow.appendChild(th);
  //           });
  //           passTableHeader.appendChild(headerRow);
  //         }
  
  //         // Render the passed table body
  //         const passTableBody = passTableContainer.querySelector('tbody');
  //         passTableBody.innerHTML = '';
  //         data.data.forEach(row => {
  //           const tr = document.createElement('tr');
  //           data.header.forEach(header => {
  //             const td = document.createElement('td');
  //             td.textContent = row[header];
  //             tr.appendChild(td);
  //           });
  //           passTableBody.appendChild(tr);
  //         });
  
  //         passTableContainer.style.display = 'block';
  //       } else {
  //         passTableContainer.style.display = 'none';
  //       }
  //     })
  //     .catch(error => console.error(error));
  
  //   // Fetch records for selected class name from the server for outcome = failed
  //   fetch(`/api/class-names/${selectedClassName}?outcome=failed`)
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.data.length > 0) {
  //         // Render the failed table header if it doesn't exist
  //         const failTableHeader = failTableContainer.querySelector('thead');
  //         if (!failTableHeader.querySelector('tr')) {
  //           const headerRow = document.createElement('tr');
  //           data.header.forEach(headerText => {
  //             const th = document.createElement('th');
  //             th.textContent = headerText;
  //             headerRow.appendChild(th);
  //           });
  //           failTableHeader.appendChild(headerRow);
  //         }
  
  //         // Render the failed table body
  //         const failTableBody = failTableContainer.querySelector('tbody');
  //         failTableBody.innerHTML = '';
  //         data.data.forEach(row => {
  //           const tr = document.createElement('tr');
  //           data.header.forEach(header => {
  //             const td = document.createElement('td');
  //             td.textContent = row[header];
  //             tr.appendChild(td);
  //           });
  //           failTableBody.appendChild(tr);
  //         });
  
  //         failTableContainer.style.display = 'block';
  //       } else {
  //         failTableContainer.style.display = 'none';
  //       }
  //     })
  //     .catch(error => console.error(error));
  // }
  
  
// const buttonEvent = () => {
//   const selectedClassName = classNameSelect.value;
//   // Fetch records for selected class name from the server
//   fetch(`/api/class-names/${selectedClassName}`)
//     .then(response => response.json())
//     .then(data => {
//       sqlData = data;

//       // Render the table header if it doesn't exist
//       const tableHeader = document.querySelector('#record-table thead');
//       if (!tableHeader.querySelector('tr')) {
        
//         const headerRow = document.createElement('tr');
//         data.header.forEach(headerText => {
//           const th = document.createElement('th');
//           th.textContent = headerText;
//           headerRow.appendChild(th);
//         });
//         tableHeader.appendChild(headerRow);
//       }

//       // Render the table body
//       tableBodyEl.innerHTML = '';
//       data.data.forEach(row => {
//         const tr = document.createElement('tr');
//         data.header.forEach(header => {

//           const td = document.createElement('td');
//           td.textContent = row[header];
//           tr.appendChild(td);
//         });
//         tableBodyEl.appendChild(tr);
//       });
//     })
//     .catch(error => console.error(error));
// }
searchBtn.addEventListener('click',buttonEvent);


if (sessionStorage.getItem("loggedIn")) {
  searchBtn.addEventListener('click',buttonEvent);
}
else{
  window.location.href='http://localhost:3000/';
}


