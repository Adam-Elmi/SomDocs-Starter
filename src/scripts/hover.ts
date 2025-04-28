import { sections } from "../../somdocs.config.json";
const { styles } = sections;
const { bg_color, text_color } = styles.hover;
const all_sections = document.querySelectorAll("#section");

if (all_sections) {
  all_sections.forEach((section: any) => {
    section.addEventListener("mouseover", () => {
        section.style.backgroundColor = bg_color;
        section.style.color = text_color;
      });
      section.addEventListener("mouseout", () => {
        section.style.backgroundColor = styles.bg;
        section.style.color = styles.text_color;
      });
    });
  }
  
  console.log("Hello")