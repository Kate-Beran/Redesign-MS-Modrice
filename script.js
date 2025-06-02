document.addEventListener("DOMContentLoaded", function () {
  const submenuParents = document.querySelectorAll("nav li.submenu > a");

  submenuParents.forEach((link) => {
    // Otevření submenu na hover rodiče
    link.parentElement.addEventListener("mouseenter", function () {
      const parentLi = this;
      const submenu = parentLi.querySelector("ul");
      if (!submenu) return;

      submenu.style.display = "flex";
      submenu.style.position = "absolute";
      submenu.style.top = "0";

      // Reset pozice submenu
      submenu.style.left = "100%";
      submenu.style.right = "auto";
      parentLi.classList.remove("left");

      const submenuRect = submenu.getBoundingClientRect();
      const parentRect = parentLi.getBoundingClientRect();
      const viewportWidth =
        window.innerWidth || document.documentElement.clientWidth;

      // Výpočet prostoru napravo od rodiče
      const spaceRight = viewportWidth - parentRect.right;

      if (spaceRight < submenuRect.width) {
        // Otevři vlevo, pokud vpravo není místo
        submenu.style.left = "auto";
        submenu.style.right = "100%";
        parentLi.classList.add("left");
      }
    });

    // Zavření submenu, když opustíš rodiče (li)
    link.parentElement.addEventListener("mouseleave", function () {
      const parentLi = this;
      const submenu = parentLi.querySelector("ul");
      if (!submenu) return;

      submenu.style.display = "none";
      parentLi.classList.remove("left");
    });

    // Zavření submenu, když opustíš i samotné submenu
    const submenu = link.parentElement.querySelector("ul");
    if (submenu) {
      submenu.addEventListener("mouseleave", function () {
        this.style.display = "none";
        this.parentElement.classList.remove("left");
      });
    }
  });
});
