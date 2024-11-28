import create_element from "../../utilities/methods/create_element.mjs";
import link_styles from "../../utilities/methods/link_styles.mjs";
import Logo from "../logo/logo.mjs";
import Menu_button from "../menu_button/menu_button.mjs";

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
    this.create_buttons();
    this.parent.appendChild(this.container);
  }
  create_buttons() {
    this.buttom_home_icon = new Menu_button({
      parent: this.container,
      icon_classes: ["fa", "fa-home"],
      styles: { order: 2 },
    });
    this.buttom_home_text = new Menu_button({
      parent: this.container,
      text: "home",
      styles: { order: 3 },
    });
    this.buttom_home_mixed = new Menu_button({
      parent: this.container,
      icon_classes: ["fa", "fa-home"],
      text: " home",
      styles: { order: 4 },
    });
    this.buttom_play_mixed = new Menu_button({
      parent: this.container,
      icon_classes: ["fa", "fa-play-circle"],
      text: " play",
      styles: { order: 5 },
    });
    this.buttom_pause_mixed = new Menu_button({
      parent: this.container,
      icon_classes: ["fa", "fa-pause-circle"],
      text: " pause",
      styles: { order: 6 },
    });
    this.buttom_stop_mixed = new Menu_button({
      parent: this.container,
      icon_classes: ["fa", "fa-stop-circle"],
      text: " stop",
      styles: { order: 7 },
    });
    this.button_random_mixed = new Menu_button({
      parent: this.container,
      // icon_classes: ["fa", "fa-stop-circle"],
      text: " Add random data",
      styles: { order: 8 },
    });
  }
}
