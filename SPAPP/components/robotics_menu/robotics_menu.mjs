import create_element from "../../utilities/methods/create_element.mjs";
import link_styles from "../../utilities/methods/link_styles.mjs";
import Logo from "../logo/logo.mjs";

const LOGO = "assets/icon_r2d2_32.png";
const STYLES = "components/robotics_menu/robotics_menu.css";

export default class Robotics_menu {
  constructor({ parent }) {
    this.parent = parent;
    this.styles = link_styles({ css_href: STYLES });
    this.container = create_element({
      type: "div",
      classes: ["robotics_menu"],
    });
    this.logo = new Logo({
      parent: this.container,
      path_to_image: LOGO,
      styles: { order: 1, "padding-right": "0.5em" },
    });
    // TODO: make buttons
    this.parent.appendChild(this.container);
  }
}
