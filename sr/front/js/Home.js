document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".stat-number");

    // Function to animate the number counting
    const animateCounter = (counter) => {
        const target = +counter.getAttribute("data-target");
        const increment = Math.ceil(target / 100); // Adjust increment speed
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = current > target ? target : current; // Stop at target
                setTimeout(updateCounter, 20); // Adjust animation speed
            } else {
                counter.textContent = target; // Ensure it ends at target
            }
        };

        updateCounter();
    };

    // Use IntersectionObserver to detect when the counter is in the viewport
    const observerOptions = {
        threshold: 0.5, // Trigger when 50% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter); // Stop observing after animation
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    counters.forEach((counter) => observer.observe(counter));
});
document.addEventListener("DOMContentLoaded", () => {
    const toastTrigger = document.getElementById('liveToastBtn');
    const toastLiveExample = document.getElementById('liveToast');
  
    if (toastTrigger && toastLiveExample) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
      toastTrigger.addEventListener('click', () => {
        toastBootstrap.show();
      });
    }
  });
  

