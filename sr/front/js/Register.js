document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  const contents = document.querySelectorAll(".content");
  const nextButton = document.getElementById("next-btn");
  const registerForm = document.getElementById("RegisterForm");
  let currentStep = 0;

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("RegEmail").value;
    const fullname = document.getElementById("RegFullname").value;
    const phone = document.getElementById("RegPhone").value;
    const address = document.getElementById("RegAddress").value;
    const password = document.getElementById("RegPassword").value;

    if ((email, fullname, phone, address, password != "")) {
        const regInfo = {
            email: email, 
            name: fullname,
            phone: phone,
            address: address,
            password: password };
        fetch("http://localhost:8081/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(regInfo),
        })
          .then((response) => response.json())
          .then((data) => {
            alert(data.message);
            window.location.href = "../html/Home.html";
          })
          .catch((error) => console.error("Error registering account:", error));;
    }
  });

  function updateStep(stepIndex) {
    contents[currentStep].classList.remove("content-active");
    steps[currentStep].classList.remove("step-active");

    currentStep = stepIndex;
    contents[currentStep].classList.add("content-active");
    steps[currentStep].classList.add("step-active");

    if (currentStep === steps.length - 1) {
      nextButton.innerText = "Finish";
      nextButton.type = "submit";
    } else {
      nextButton.innerText = "Next";
      nextButton.type = "button";
    }
  }

  nextButton.addEventListener("click", () => {
    if (currentStep < steps.length - 1) {
      updateStep(currentStep + 1);
      steps[currentStep].classList.add("step-completed");
    } else {
    //   alert("Account creation process completed!");
    }
  });

  steps.forEach((step, index) => {
    step.addEventListener("click", () => {
      if (index <= currentStep) {
        updateStep(index);
      }
    });
  });
});
