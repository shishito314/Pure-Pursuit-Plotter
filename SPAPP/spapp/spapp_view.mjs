import Robotics_code from "../components/robotics_code/robotics_code.mjs";
import Robotics_data from "../components/robotics_data/robotics_data.mjs";
import Robotics_footer from "../components/robotics_footer/robotics_footer.mjs";
import Robotics_graphics from "../components/robotics_graphics/robotics_graphics.mjs";
import Robotics_menu from "../components/robotics_menu/robotics_menu.mjs";
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
      menu: new Robotics_menu({ parent: this.top_menu }),
      data: new Robotics_data({ parent: this.left_panel, spapp: this.parent }),
      graphics: new Robotics_graphics({
        parent: this.center_panel,
        spapp: this.parent,
      }),
      code: new Robotics_code({ parent: this.right_panel }),
      footer: new Robotics_footer({ parent: this.footer }),
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
