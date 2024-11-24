import Robotics_graphics from "../components/robotics_graphics/robotics_graphics.mjs";
import create_element from "../utilities/methods/create_element.mjs";
import link_favicon from "../utilities/methods/link_favicon.mjs";
import link_styles from "../utilities/methods/link_styles.mjs";

const FAVICON = "assets/icon_r2d2_16.png";
const STYLES = "spapp/spapp.css";

export default class Spapp_view {
  constructor({ parent }) {
    console.log("Spapp_view()");
    this.parent = parent;
    this.favicon = link_favicon({ icon_href: FAVICON });
    this.styles = link_styles({ css_href: STYLES });
    this.construct_grid();
    this.construct_components();
  }
  construct_components() {
    this.components = {
      graphics: new Robotics_graphics({ parent: this.center_panel }),
    };
  }
  construct_grid() {
    this.spapp = create_element({ type: "div", classes: ["spapp"] });
    this.top_menu = create_element({
      type: "div",
      classes: ["top_menu"],
      parent: this.spapp,
    });
    this.left_panel = create_element({
      type: "div",
      classes: ["left_panel"],
      parent: this.spapp,
    });
    this.center_panel = create_element({
      type: "div",
      classes: ["center_panel"],
      parent: this.spapp,
    });
    this.right_panel = create_element({
      type: "div",
      classes: ["right_panel"],
      parent: this.spapp,
    });
    this.footer = create_element({
      type: "div",
      classes: ["footer"],
      parent: this.spapp,
    });
    document.body.appendChild(this.spapp);
  }
}
