import create_element from "../../utilities/methods/create_element.mjs";
import link_styles from "../../utilities/methods/link_styles.mjs";
import Robotics_data_motion from "./robotics_data_motion.mjs";
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
      // styles: {width: "14em"}
    });
    this.data_motions = [];
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
    // TODO: Motion boxes on left
    this.data_motions = [];
    for (let i = 0; i < this.spapp.model.path.motions.length; ++i) {
      const motion = this.spapp.model.path.motions[i];
      this.data_motions.push(new Robotics_data_motion({
        parent: this.container,
        spapp: this.spapp,
        motion_index: i,
        is_fwd: motion.is_fwd,
        is_stop: motion.is_stop
      }));
      let points_for_data;
      switch(motion.motion_type) {
        case "standard":
          points_for_data = motion.path_points;
          break;
        case "bezier":
          points_for_data = motion.control_points;
          break;
      }
      for (const d of points_for_data) {
        const { x, y, /*is_fwd, is_stop*/ } = d;
        this.data_motions[this.data_motions.length - 1].data_points.push(
          new Robotics_data_point({
            parent: this.data_motions[this.data_motions.length - 1].container,
            spapp: this.spapp,
            motion_index: i,
            data_point_index: this.data_motions[this.data_motions.length - 1].data_points.length,
            x,
            y,
          })
        );
      }
    }
    this.set_motion_focus(this.spapp.controller.motion_focus_index);
  }
  set_motion_focus(index) {
    for (const data_motion of this.data_motions) data_motion.container.classList = ["robotics_data_motion"];
    this.data_motions[index].container.classList = ["robotics_data_motion_selected"];
  }
  show_overlay() {
    this.overlay_screen.classList.add("robotics_data_overlay_active");
  }
  unshow_overlay() {
    this.overlay_screen.classList.remove("robotics_data_overlay_active");
  }
}
