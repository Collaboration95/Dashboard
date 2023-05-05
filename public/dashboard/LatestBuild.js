function fetchLatestBuilds() {
    // Make a GET request to the server's /api/latest-builds endpoint
    fetch('/api/latest-builds')
      .then(response => response.json()) // Parse the response body as JSON
      .then(data => {
        console.log(data);
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