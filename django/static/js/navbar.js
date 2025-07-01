document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("navbar-side");
  const sidebarIcon = document.getElementById("navbar-side-icon");
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

  // activate sidebar by hover
  sidebar.addEventListener("mouseover", () => {
    document.documentElement.classList.add("sidebar-open");
    document.cookie = "sidebarOpen=true; path=/; Secure";
  });

  // deavtivating sidebar by hover
  sidebar.addEventListener("mouseout", () => {
    if (document.cookie.includes("sidebarOpenFixed=false")) {
      document.documentElement.classList.remove("sidebar-open");
      document.cookie = "sidebarOpen=false; path=/; Secure";
    }
  });

  // activate sideby by icon
  sidebarIcon.addEventListener("click", () => {
    if (document.documentElement.classList.contains("sidebar-open")) {
      document.documentElement.classList.remove("sidebar-open");
      document.cookie = "sidebarOpen=false; path=/; Secure";
      document.cookie = "sidebarOpenFixed=false; path=/; Secure";
    } else {
      document.documentElement.classList.add("sidebar-open");
      document.cookie = "sidebarOpen=true; path=/; Secure";
      document.cookie = "sidebarOpenFixed=true; path=/; Secure";
    }
  });


});
