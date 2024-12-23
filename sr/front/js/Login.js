document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("LoginForm");

    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if ((email, password != "")) {
        const logInfo = {
          email: email,
          password: password,
        };
        fetch("http://localhost:8081/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(logInfo),
        })
          .then((response) => response.json())
          .then((data) => {
            alert(data.message);
          })
          .catch((error) => console.error("Error logging in account:", error));
      }
    });
})