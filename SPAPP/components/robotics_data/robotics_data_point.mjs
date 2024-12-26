import create_element from "../../utilities/methods/create_element.mjs";
import Robotics_data_component from "./robotics_data_component.mjs";
import Robotics_data_component_bool from "./robotics_data_component_bool.mjs";
import Robotics_data_component_delete from "./robotics_data_component_delete.mjs";

export default class Robotics_data_point {
  constructor({ parent, spapp, motion_index, data_point_index, x, y,}) {// is_fwd, is_stop }) {
    this.parent = parent;
    this.spapp = spapp;
    this.motion_index = motion_index;
    this.data_point_index = data_point_index;
    this.container = create_element({
      type: "div",
      classes: ["robotics_data_point"],
      parent: this.parent,
    });
    this.x_component = new Robotics_data_component({
      parent: this.container,
      spapp: this.spapp,
      id: "x",
      motion_index,
      data_point_index,
      value: x,
      step: 0.1,
    });
    this.y_component = new Robotics_data_component({
      parent: this.container,
      spapp: this.spapp,
      id: "y",
      motion_index,
      data_point_index,
      value: y,
      step: 0.1,
    });
    // this.is_fwd_component = new Robotics_data_component_bool({
    //   parent: this.container,
    //   spapp: this.spapp,
    //   id: "is_fwd",
    //   motion_index,
    //   data_point_index,
    //   checked: is_fwd,
    // });
    // this.is_stop_component = new Robotics_data_component_bool({
    //   parent: this.container,
    //   spapp: this.spapp,
    //   id: "is_stop",
    //   motion_index,
    //   data_point_index,
    //   checked: is_stop,
    // });
    this.delete_component = new Robotics_data_component_delete({
      parent: this.container,
      spapp: this.spapp,
      motion_index,
      data_point_index,
    });
  }
}
