
const selectEl = document.querySelector('#installer-version');
const tableBodyEl = document.querySelector('#records-table tbody');
const searchBtn = document.querySelector('#search-btn');

fetch('/api/unique-installer-versions')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            const optionEl = document.createElement('option');
            optionEl.textContent = data[i].installer_version;
            optionEl.value = data[i].installer_version;
            selectEl.appendChild(optionEl);
        }
    })
    .catch(error => console.error(error));

searchBtn.addEventListener('click', () => {
    const selectedInstallerVersion = selectEl.value;
    if (!selectedInstallerVersion) {
        alert('Please select an Installer Version.');
        return;
    }

    fetch(`/api/installer-version-records/${selectedInstallerVersion}`)
        .then(response => response.json())
        .then(data => {
            tableBodyEl.innerHTML = '';
            for (let i = 0; i < data.length; i++) {
                const rowEl = document.createElement('tr');
                const record = data[i];

                for (const property in record) {
                    const cellEl = document.createElement('td');
                    cellEl.textContent = record[property];
                    rowEl.appendChild(cellEl);
                }

                tableBodyEl.appendChild(rowEl);
            }
        })
        .catch(error => console.error(error));
});
