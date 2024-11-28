import create_element from "../../utilities/methods/create_element.mjs";
import link_styles from "../../utilities/methods/link_styles.mjs";

const STYLES = [
  "components/menu_button/menu_button.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
];

export default class Menu_button {
  constructor({ parent, text, icon_classes, styles }) {
    this.parent = parent;
    this.styles = link_styles({ css_href: STYLES });
    this.button = create_element({
      type: "button",
      classes: ["menu_button"],
      parent: this.parent,
      styles,
    });
    if (icon_classes) {
      this.icon = create_element({
        type: "i",
        classes: icon_classes,
        parent: this.button,
      });
    }
    if (text) this.button.innerHTML += text;
  }
}
