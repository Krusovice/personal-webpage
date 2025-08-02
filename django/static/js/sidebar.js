document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const sidebarIcon = document.querySelector(".sidebar__icon");
  const navbarLinks = document.querySelectorAll(".sidebar-link");

  const sidebarTransitioning = () => {
    sidebar.classList.add('transitioning')

    setTimeout(() => {
      sidebar.classList.remove('transitioning');
    }, 300)
  }

  const renderActivatedSidebar = () => {
    document.documentElement.classList.add("sidebar-open");

    sidebar.style.transition = "none";
    navbarLinks.forEach(link => {
      link.style.transition = "none";
    });

    requestAnimationFrame(() => {
      sidebar.style.transition = "width 0.3s ease";
      
      navbarLinks.forEach(link => {
        link.style.transition = "opacity 0.2s ease";
      });
    });
  };

  const setSidebarCookie = (bool) => {
    document.cookie = `sidebarClicked=${bool}; path=/;${location.protocol === "https:" ? " Secure;" : ""}`;
  }

  const addSidebarClick = () => {
    document.documentElement.classList.add("sidebar-open");
    setSidebarCookie(true)
    sidebarTransitioning()
  };

  const removeSidebarClick = () => {
    document.documentElement.classList.remove("sidebar-open");
    setSidebarCookie(false)
    sidebarTransitioning()
  };

  const addSidebarHover = () => {
    if (document.cookie.includes("sidebarClicked=false")) {
      document.documentElement.classList.add("sidebar-open");
    }
  };

  const removeSidebarHover = () => {
    if (document.cookie.includes("sidebarClicked=false")) {
      document.documentElement.classList.remove("sidebar-open");
    }
  };


  // Applying logic
  if (!document.cookie.includes("sidebarClicked")) {
    setSidebarCookie(true);
    renderActivatedSidebar();
  } else if (document.cookie.includes("sidebarClicked=true")) {
    renderActivatedSidebar()
  }
  
  sidebar.addEventListener("mouseover", addSidebarHover);
  sidebar.addEventListener("mouseout", removeSidebarHover);
  sidebarIcon.addEventListener("click", () => {
    if (document.cookie.includes("sidebarClicked=false")) {
      addSidebarClick();
    } else {
      removeSidebarClick();
    }
  });
});
