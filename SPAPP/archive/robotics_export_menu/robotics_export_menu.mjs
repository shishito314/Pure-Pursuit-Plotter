import create_element from "../../utilities/methods/create_element.mjs";
import link_styles from "../../utilities/methods/link_styles.mjs";

const STYLES = "components/robotics_menu/robotics_menu.css";

export default class Robotics_export_menu {
  constructor({ parent }) {
    this.parent = parent;
    this.styles = link_styles({ css_href: STYLES });
    this.container = create_element({
      type: "div",
      classes: [""], // TODO
    });
    this.text_block = create_element({ type: "div", parent: this.container });
    this.copy_button = 
    this.parent.appendChild(this.container);
  }
}
