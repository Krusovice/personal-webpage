document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("navbar-side");
  sidebar.style.transition = "none";

  const navbarLinks = document.querySelectorAll(".navbar-link");

  navbarLinks.forEach(link => {
    link.style.transition = "none";
  });

  requestAnimationFrame(() => {
    sidebar.style.transition = "width 0.3s ease";
    
    navbarLinks.forEach(link => {
      link.style.transition = "opacity 0.2s ease";
    });
  });



  // activate sidebar
  sidebar.addEventListener("mouseover", () => {
    document.documentElement.classList.add("sidebar-open");
    document.cookie = "sidebarOpen=true; path=/; Secure";
  });

  // deavtivating sidebar
  sidebar.addEventListener("mouseout", () => {
    document.documentElement.classList.remove("sidebar-open");
    document.cookie = "sidebarOpen=false; path=/; Secure";
  });

});
