document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("navbar-side");
  sidebar.style.transition = "none";

  // Restore sidebar state
  if (localStorage.getItem("sidebarOpen") === "true") {
    sidebar.classList.add("open");
  }

  requestAnimationFrame(() => {
    sidebar.style.transition = "width 0.3s ease";
  });

  // activate sidebar
  sidebar.addEventListener("mouseover", () => {
    sidebar.classList.add("open");
    localStorage.setItem("sidebarOpen", "true");
  });

  // deavtivating sidebar
  sidebar.addEventListener("mouseout", (e) => {
    if (!sidebar.contains(e.relatedTarget)) {
      sidebar.classList.remove("open");
      localStorage.setItem("sidebarOpen", "false");
    }
  });

});
