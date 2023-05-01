const login = () => {
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
        window.location.href = 'success.html';
      } else {
        alert('Invalid username or password');
      }
    })
    .catch(error => console.error(error));
  };
  
const loginButton = document.querySelector('#loginbuttondiv');
loginButton.addEventListener('click',login);
