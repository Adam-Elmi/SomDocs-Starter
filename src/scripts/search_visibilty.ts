(() => {
  const search_btns = document.querySelectorAll("#search-btn");
  const search_main_container = document.getElementById(
    "search-main-container"
  );
  const search_container = document.getElementById("search-container");
  const search_input = document.getElementById("search-input");
  if (search_btns) {
    search_btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        (search_main_container as HTMLElement).style.display = "flex";
        search_input?.focus();
      });
    });
  }
  if (search_main_container) {
    search_main_container.addEventListener("click", () => {
      (search_main_container as HTMLElement).style.display = "none";
    });

    if (search_container) {
      search_container.addEventListener("click", (e) => e.stopPropagation());
    }
  }

  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "k") {
      (search_main_container as HTMLElement).style.display = "flex";
      e.preventDefault();
      search_input?.focus();
    }
    if (e.key === "Escape") {
      (search_main_container as HTMLElement).style.display = "none";  
      e.preventDefault();
    }
  });
})();
