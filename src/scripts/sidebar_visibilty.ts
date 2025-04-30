(() => {
  const sidebar = document.getElementById("sidebar");
  const close_btn = document.getElementById("close-btn");
  const open_btn = document.getElementById("open-btn");
  
  if (close_btn) {
    close_btn.addEventListener("click", () => {
      (sidebar as HTMLElement).style.display = "none";
      document.body.style.overflow = "auto";
    });
  }
  if (open_btn) {
    open_btn.addEventListener("click", () => {
      (sidebar as HTMLElement).style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  }
  window.addEventListener("resize", () => {
    update_visiblity();
  });
  function update_visiblity() {
    if (window.innerWidth >= 900) {
      (sidebar as HTMLElement).style.display = "flex";
    } else {
      (sidebar as HTMLElement).style.display = "none";
    }
  }
  update_visiblity();
})();
