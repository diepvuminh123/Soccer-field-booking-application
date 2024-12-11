fetch("Navbar.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById('navbar').innerHTML = data;
      })
      .catch(error => console.error('Không thể tải Navbar:', error));