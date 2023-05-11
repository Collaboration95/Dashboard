const pieChartData = () => {
    fetch('/api/sql-chart')
      .then(response => response.json())
      .then(data => {
        const outcome = {};
        console.log(data);
        data.forEach((row) => {
            outcome[row.outcome] = row.frequency;
          });        
          console.log(outcome);
          drawChart(outcome);
      })
      .catch(error => console.error(error));
};
function drawChart(data) {
    // Create pie chart
    const chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        text: "Outcome "
      }, 
      data: [{
        type: "doughnut",
        innerRadius: "70%", // set inner radius as 40% of chart radius
        startAngle: 240,
        showInLegend: true,
        legendText: "{label}",
        indexLabelPlacement: "outside", // Display index labels outside
        indexLabelOrientation: "horizontal", // Set orientation to horizontal
        indexLabel: "{label}",
        dataPoints: Object.keys(data).map(key => ({ label: key, y: data[key] }))
      }]
    });
    // Render chart
    chart.render();
}

const loadData = () => {
    fetch('/api/sql-data1')
      .then(response => response.json())
      .then(data => {
        sqlData = data;
        // Render the table header if it doesn't exist
        const tableBody = document.querySelector('#sql-table tbody');
        tableBody.innerHTML = '';
        data.data.forEach(rowData => {
          // create a new table row element
          const row = document.createElement('tr');

          // create a table cell element for each data value
          Object.keys(rowData).forEach(key=>{
            const cell= document.createElement('td');
            if (key=='output'){
              const link = document.createElement('a');
              link.textContent = 'View';
              link.href = `/api/longblob-data-main?id=${rowData['id']}`;
              link.target = '_blank';
              console.log(rowData);
              cell.appendChild(link);
              row.appendChild(cell);
            }
            else if(key=='id'){
              
            }
            else{
              cell.textContent = rowData[key];
              row.appendChild(cell);
            }
            
          })

          // add the new row to the table body
          tableBody.appendChild(row);
        });

      })
      .catch(error => console.error(error));
};
  
const loadLongblobData = () => {
  const id = new URLSearchParams(window.location.search).get('id');
  fetch(`/api/longblob-data?id=${id}`)
    .then(response => response.json())
    .then(data => {
      const longblobData = data.data;
      // Display the longblob data
    })
    .catch(error => console.error(error));
};

if (sessionStorage.getItem("loggedIn")) {
  pieChartData();
  loadData();
}
else{
  window.location.href='http://localhost:3000/';
}
