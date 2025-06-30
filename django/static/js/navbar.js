document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("navbar-side");
  sidebar.style.transition = "none";

  requestAnimationFrame(() => {
    sidebar.style.transition = "width 0.3s ease";
  });

  // activate sidebar
  sidebar.addEventListener("mouseover", () => {
    document.documentElement.classList.add("sidebar-open");
    document.cookie = "sidebarOpen=true; path=/";
  });

  // deavtivating sidebar
  sidebar.addEventListener("mouseout", () => {
    document.documentElement.classList.remove("sidebar-open");
    document.cookie = "sidebarOpen=false; path=/";
  });

});
