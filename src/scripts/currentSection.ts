// import { active_section } from "../../somdocs.config.json";
(() => {
  // const { bg_color, text_color, border, bold, italic, border_radius } =
  //   active_section;
  const all_sections = document.querySelectorAll("#section");
  if (all_sections) {
    all_sections.forEach((section) => {
      section.addEventListener("click", () => {
        section.classList.add("active");
      })
    })
  }
})();
