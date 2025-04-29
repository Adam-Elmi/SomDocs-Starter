// import { sections } from "../../somdocs.config.json";
// (() => {
//   const { styles } = sections;
//   const { hover } = styles;
//   const all_sections = document.querySelectorAll("#section");

//   if (all_sections) {
//     all_sections.forEach((section) => {
//       let element = section as HTMLElement;
//       element.addEventListener("mouseover", () => {
//         if (!element.classList.contains("active_section")) {
//           element.style.backgroundColor = hover.bg_color;
//           element.style.color = hover.text_color;
//           element.style.border = hover.border;
//         }
//       });
//       element.addEventListener("mouseout", () => {
//         if (!element.classList.contains("active_section")) {
//           element.style.backgroundColor = styles.bg;
//           element.style.color = styles.text_color;
//           element.style.border = styles.border;
//         }
//       });
//     });
//   }
// })();
