document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded and script is running!");

//cho card nhảy nhảy
  const paginationLinks = document.querySelectorAll(".pagination a");

  paginationLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

    
      paginationLinks.forEach((link) => link.classList.remove("active"));

  
      link.classList.add("active");

      alert(`Navigating to page: ${link.textContent}`);
    });
  });
});