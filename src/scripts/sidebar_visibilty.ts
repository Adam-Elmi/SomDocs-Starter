function initSidebar() {
  const sidebar = document.getElementById("sidebar");
  const close_btn = document.getElementById("close-btn");
  const open_btn = document.getElementById("open-btn");

  if (!sidebar) return;

  const close = () => {
    sidebar.style.display = "";
    document.body.style.overflow = "";
  };

  const open = () => {
    sidebar.style.display = "flex";
    document.body.style.overflow = "hidden";
  };

  close_btn?.replaceWith(close_btn.cloneNode(true));
  open_btn?.replaceWith(open_btn.cloneNode(true));

  const new_close_btn = document.getElementById("close-btn");
  const new_open_btn = document.getElementById("open-btn");

  new_close_btn?.addEventListener("click", close);
  new_open_btn?.addEventListener("click", open);

  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") close();
  };
  document.removeEventListener("keydown", handleEsc);
  document.addEventListener("keydown", handleEsc);

  let lastWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    const w = window.innerWidth;
    if (w !== lastWidth) {
      lastWidth = w;
      if (w >= 900) {
        close();
      }
    }
  });
}

initSidebar();
document.addEventListener("astro:page-load", initSidebar);
