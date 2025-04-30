export default function apply_icon(
  theme_toggle_btns: NodeList,
  html: HTMLHtmlElement
) {
  const theme_value = String((html as HTMLElement).dataset.theme);
  if (theme_value === "dark") {
    if (theme_toggle_btns) {
      // @ts-ignore
      theme_toggle_btns.forEach((toggle_btn: HTMLElement) => {
        toggle_btn.innerHTML = `
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        >
                        <path
                            fill="currentColor"
                            d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22C6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981"
                        ></path>
                        </svg>
    `;
      });
    }
  } else {
    if (theme_toggle_btns) {
      // @ts-ignore
      theme_toggle_btns.forEach((toggle_btn: HTMLElement) => {
        toggle_btn.innerHTML = `
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            >
                            <path fill="currentColor" d="M18 12a6 6 0 1 1-12 0a6 6 0 0 1 12 0"></path>
                            <path
                                fill="currentColor"
                                fill-rule="evenodd"
                                d="M12 1.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75M4.399 4.399a.75.75 0 0 1 1.06 0l.393.392a.75.75 0 0 1-1.06 1.061l-.393-.393a.75.75 0 0 1 0-1.06m15.202 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 0 1-1.06-1.06l.393-.393a.75.75 0 0 1 1.06 0M1.25 12a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75m19 0a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75m-2.102 6.148a.75.75 0 0 1 1.06 0l.393.393a.75.75 0 1 1-1.06 1.06l-.393-.393a.75.75 0 0 1 0-1.06m-12.296 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 1 1-1.06-1.06l.392-.393a.75.75 0 0 1 1.061 0M12 20.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75"
                                clip-rule="evenodd"></path>
                        </svg>
        `;
      });
    }
  }
}
