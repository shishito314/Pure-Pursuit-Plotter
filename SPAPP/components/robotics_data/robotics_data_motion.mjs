import create_element from "../../utilities/methods/create_element.mjs";
import Robotics_motion_component_bool from "./robotics_motion_component_bool.mjs";
import Robotics_motion_component_delete from "./robotics_motion_component_delete.mjs";
import Robotics_motion_component_select from "./robotics_motion_component_select.mjs";

export default class Robotics_data_motion {
  constructor({ parent, spapp, motion_index, is_fwd, is_stop }) {// is_fwd, is_stop }) {
    this.parent = parent;
    this.spapp = spapp;
    this.motion_index = motion_index;
    this.container = create_element({
      type: "div",
      classes: ["robotics_data_motion"],
      parent: this.parent,
    });
    this.motion_controls_container = create_element({
        type: "div",
        classes: ["motion_controls_container"],
        parent: this.container,
    });
    this.is_fwd_button = new Robotics_motion_component_bool({
        parent: this.motion_controls_container,
        spapp: this.spapp,
        id: "is_fwd",
        motion_index,
        checked: is_fwd
    });
    this.is_stop_button = new Robotics_motion_component_bool({
        parent: this.motion_controls_container,
        spapp: this.spapp,
        id: "is_stop",
        motion_index,
        checked: is_stop
    });
    this.select_button = new Robotics_motion_component_select({
        parent: this.motion_controls_container,
        spapp: this.spapp,
        motion_index,
    });
    this.delete_component = new Robotics_motion_component_delete({
        parent: this.motion_controls_container,
        spapp: this.spapp,
        motion_index,
    });
    this.data_points = [];
  }
}
