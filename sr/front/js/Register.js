document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".step");
    const contents = document.querySelectorAll(".content");
    const nextButton = document.getElementById("next-btn");
    let currentStep = 0;

   
    function updateStep(stepIndex) {
        
        contents[currentStep].classList.remove("content-active");
        steps[currentStep].classList.remove("step-active");

        
        currentStep = stepIndex;
        contents[currentStep].classList.add("content-active");
        steps[currentStep].classList.add("step-active");

        
        nextButton.innerText = currentStep === steps.length - 1 ? "Submit" : "Next";
    }

    
    nextButton.addEventListener("click", () => {
        if (currentStep < steps.length - 1) {
            updateStep(currentStep + 1);
            steps[currentStep].classList.add("step-completed");
        } else {
            alert("Account creation process completed!");
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