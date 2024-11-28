import create_element from "../../utilities/methods/create_element.mjs";

export default class Robotics_data_component {
  constructor({ parent, value, step }) {
    this.parent = parent;
    this.input = create_element({
      type: "input",
      classes: ["robotics_data_component"],
      parent: this.parent,
      attributes: { type: "number", step: step ? step : 0.01, value },
    });
  }
}
