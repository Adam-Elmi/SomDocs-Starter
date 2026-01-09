(() => {
  const theme_toggle_btns = document.querySelectorAll(".theme-toggle-btn") as NodeListOf<HTMLButtonElement>;
  const html = document.documentElement as HTMLHtmlElement;

  function theme_value(): string {
    return html.dataset.theme ?? "light";
  }

  function update_buttons() {
    const currentTheme = theme_value();
    theme_toggle_btns.forEach((btn) => {
      btn.setAttribute("aria-label", `Switch to ${currentTheme === "dark" ? "light" : "dark"} theme`);
    });
  }

  function set_theme(theme: string) {
    html.dataset.theme = theme;
    localStorage.setItem("theme-value", theme);
    update_buttons();
  }

  document.addEventListener("DOMContentLoaded", (): void => {
    if (!localStorage.getItem("theme-value")) {
      localStorage.setItem("theme-value", theme_value());
    }
    update_buttons();
  });

  window.addEventListener('storage', (event) => {
    if (event.key === 'theme-value' && event.newValue) {
      html.dataset.theme = event.newValue;
      update_buttons();
    }
  });

  theme_toggle_btns.forEach((toggle_btn: HTMLButtonElement): void => {
    toggle_btn.addEventListener("click", (): void => {
      const newTheme = theme_value() === "dark" ? "light" : "dark";
      set_theme(newTheme);
    });
  });
})();
