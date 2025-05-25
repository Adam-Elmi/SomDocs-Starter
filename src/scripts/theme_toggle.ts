import apply_icon from "./apply_icon";

(() => {
  const theme_toggle_btns: NodeListOf<HTMLButtonElement> = document.querySelectorAll("#theme-toggle-btn");
  const html = document.documentElement as HTMLHtmlElement;

  const saved_theme: string | null = localStorage.getItem("theme-value");
  if (saved_theme) {
    html.dataset.theme = saved_theme;
  }

  function theme_value(): string {
    return html.dataset.theme ?? "light";
  }

  document.addEventListener("DOMContentLoaded", (): void => {
    apply_icon(theme_toggle_btns, html);
    if (!saved_theme) {
      localStorage.setItem("theme-value", theme_value());
    }
  });

  theme_toggle_btns.forEach((toggle_btn: HTMLButtonElement): void => {
    toggle_btn.addEventListener("click", (): void => {
      html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme-value", theme_value());
      apply_icon(theme_toggle_btns, html);
    });
  });
})();
