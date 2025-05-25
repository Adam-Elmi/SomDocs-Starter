import { sections } from "../../somdocs.config.json";
(() => {
  const { contents } = sections;
  const all_sections = document.querySelectorAll("#section");
  if (all_sections) {
    all_sections.forEach((section, index) => {
      section.addEventListener("click", () => {
        all_sections.forEach((sec) => sec.classList.remove("active-section"));
        sessionStorage.setItem("active-section", JSON.stringify(index));
        update_active_section();
        get_pathname_of_active_section();
      });
    });
  }
  function update_active_section() {
    get_pathname_of_active_section();
    const get_active_section_index =
      sessionStorage.getItem("active-section") || 0;
    if (
      get_active_section_index !== null ||
      get_active_section_index !== "undefined"
    ) {
      const parsedIndex =
        typeof get_active_section_index !== "number"
          ? parseInt(get_active_section_index)
          : get_active_section_index;
      all_sections.forEach((section) =>
        section.classList.remove("active-section")
      );
      if(parsedIndex !== undefined) {
        if(all_sections && all_sections[parsedIndex]) {
        all_sections[parsedIndex].classList.add("active-section");
        }
      }
    }
  }
  function get_pathname_of_active_section() {
    const pathname = window.location.pathname;
    const findIndex = contents.findIndex((section) => section.url === pathname);
    sessionStorage.setItem("active-section", JSON.stringify(findIndex));
    console.log(findIndex);
  }
  document.addEventListener("DOMContentLoaded", update_active_section);
})();
