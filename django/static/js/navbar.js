document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("navbar-side");
  sidebar.style.transition = "none";
  document.documentElement.classList.remove("sidebar-open");

  // Restore sidebar state
  if (localStorage.getItem("sidebarOpen") === "true") {
    document.documentElement.classList.add("sidebar-open");
  }

  requestAnimationFrame(() => {
    sidebar.style.transition = "width 0.3s ease";
  });

  // activate sidebar
  sidebar.addEventListener("mouseover", () => {
    document.documentElement.classList.add("sidebar-open");
    localStorage.setItem("sidebarOpen", "true");
  });

  // deavtivating sidebar
  sidebar.addEventListener("mouseout", () => {
    document.documentElement.classList.remove("sidebar-open");
    localStorage.setItem("sidebarOpen", "false");
  });

});
