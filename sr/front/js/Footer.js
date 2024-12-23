fetch("Footer.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById('Footer').innerHTML = data;
      })
      .catch(error => console.error('Không thể tải Footer:', error));

      