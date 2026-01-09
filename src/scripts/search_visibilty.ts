(() => {
  const search_btns = document.querySelectorAll("#search-btn");

  if (search_btns) {
    search_btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        window.dispatchEvent(new CustomEvent("open-search"));
      });
    });
  }

  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("open-search"));
    }
  });
})();

