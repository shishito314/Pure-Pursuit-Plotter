import create_element from "../../utilities/methods/create_element.mjs";

export default class Robotics_data_component {
  constructor({ parent, spapp, id, data_point_index, value, step }) {
    this.parent = parent;
    this.spapp = spapp;
    this.id = id;
    this.data_point_index = data_point_index;
    this.input = create_element({
      type: "input",
      classes: ["robotics_data_component"],
      parent: this.parent,
      attributes: { type: "number", step: step ? step : 0.01, value },
    });
    this.input.addEventListener("change", (e) => {
      spapp.controller.handle_data_component_change(
        this.data_point_index,
        this.id,
        this.input.valueAsNumber
      );
    });
  }
}
