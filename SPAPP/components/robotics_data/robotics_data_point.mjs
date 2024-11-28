import create_element from "../../utilities/methods/create_element.mjs";
import Robotics_data_component from "./robotics_data_component.mjs";

export default class Robotics_data_point {
  constructor({ parent, x, y }) {
    this.parent = parent;
    this.container = create_element({
      type: "div",
      classes: ["robotics_data_point"],
      parent: this.parent,
    });
    this.x_component = new Robotics_data_component({
      parent: this.container,
      value: x,
      step: 0.01,
    });
    this.y_component = new Robotics_data_component({
      parent: this.container,
      value: y,
      step: 0.01,
    });
  }
}
