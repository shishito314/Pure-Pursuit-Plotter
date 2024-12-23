import create_element from "../../utilities/methods/create_element.mjs";
import link_styles from "../../utilities/methods/link_styles.mjs";
import Robotics_data_point from "./robotics_data_point.mjs";

const STYLES = "components/robotics_data/robotics_data.css";

export default class Robotics_data {
  constructor({ parent, spapp }) {
    this.parent = parent;
    this.spapp = spapp;
    this.styles = link_styles({ css_href: STYLES });
    this.container = create_element({
      type: "div",
      classes: ["robotics_data"],
      parent: this.parent,
    });
    this.data_points = [];
    this.overlay_screen = create_element({
      type: "div",
      classes: ["robotics_data_overlay"],
      parent: this.parent,
    });
  }
  update() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
    this.data_points = [];
    for (const d of this.spapp.model.path.path_points) {
      const { x, y, is_fwd, is_stop } = d;
      this.data_points.push(
        new Robotics_data_point({
          parent: this.container,
          spapp: this.spapp,
          data_point_index: this.data_points.length,
          x,
          y,
          is_fwd,
          is_stop
        })
      );
    }
  }
  show_overlay() {
    this.overlay_screen.classList.add("robotics_data_overlay_active");
  }
  unshow_overlay() {
    this.overlay_screen.classList.remove("robotics_data_overlay_active");
  }
}
