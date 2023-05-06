sessionStorage.removeItem("loggedIn");
function login() {
    const username = document.getElementById("Username").value;
    const password = document.getElementById("Password").value;
  
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
      const login_verified = Object.keys(data).length;
      if (login_verified === 1) {
        //window.location.href = 'dashboard/mainpage';
        window.location.href = 'dashboard/mainpage.html';
        sessionStorage.setItem("loggedIn", true);
      } else {
        alert('Invalid username or password');
      }
    })
    .catch(error => console.error(error));
  }
  
const loginButton = document.querySelector('#loginbuttondiv');
const loginInput = document.querySelector("#Password");

loginButton.addEventListener('click',function(){
  login();
});

loginInput.addEventListener("keydown",function(event){
  if(event.key==="Enter")
  {
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("login-button").click();
   
  }
});


 
