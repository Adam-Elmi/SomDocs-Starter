import apply_icon from "./apply_icon";
(() => {
  const theme_toggle_btns = document.querySelectorAll("#theme-toggle-btn");
  const html = document.querySelector("html");
  const get_theme_value = localStorage.getItem("theme-value");

  function theme_value() {
    return String((html as HTMLHtmlElement).dataset.theme);
  }

  if (theme_toggle_btns) {
    theme_toggle_btns.forEach((toggle_btn) => {
      toggle_btn.addEventListener("click", () => {
        if ((html as HTMLHtmlElement).dataset.theme === "dark") {
          (html as HTMLHtmlElement).dataset.theme = "light";
        } else {
          (html as HTMLHtmlElement).dataset.theme = "dark";
        }
        localStorage.setItem("theme-value", theme_value());
        // @ts-ignore
        apply_icon(theme_toggle_btns, html);
      });
    });
    document.addEventListener("DOMContentLoaded", () => {
      if (get_theme_value) {
        (html as HTMLHtmlElement).dataset.theme = get_theme_value;
      } else {
        localStorage.setItem("theme-value", theme_value());
      }
      // @ts-ignore
      apply_icon(theme_toggle_btns, html);
    });
  }
})();
