(() => {
  const search_btn = document.getElementById("search-btn");
  const search_main_container = document.getElementById("search-main-container");
  const search_container = document.getElementById("search-container");
  const search_input = document.getElementById("search-input");
  if (search_btn) {
    search_btn.addEventListener("click", () => {
        (search_main_container as HTMLElement).style.display = "flex";
        search_input?.focus();
    });
  }
  if(search_main_container) {
    search_main_container.addEventListener("click", () => {
        (search_main_container as HTMLElement).style.display = "none";
    })
    
      if(search_container) {
        search_container.addEventListener("click", (e) => e.stopPropagation());
      }
  }

  window.addEventListener("keydown", (e) => {
    if(e.ctrlKey && e.key === "k") {
        (search_main_container as HTMLElement).style.display = "flex";
        e.preventDefault();
        search_input?.focus();
    }
  })

})();
