import create_element from "../../utilities/methods/create_element.mjs";

export default class Robotics_data_component_bool {
  constructor({ parent, checked }) {
    this.parent = parent;
    this.input = create_element({
      type: "input",
      classes: ["robotics_data_component_bool"],
      parent: this.parent,
      attributes: { type: "checkbox", checked },
    });
  }
}
