import create_element from "../../utilities/methods/create_element.mjs";

export default class Robotics_data_component_bool {
  constructor({ parent, spapp, id, data_point_index, checked }) {
    this.parent = parent;
    this.spapp = spapp;
    this.id = id;
    this.data_point_index = data_point_index;
    this.input = create_element({
      type: "input",
      classes: ["robotics_data_component_bool"],
      parent: this.parent,
      attributes: { type: "checkbox" },
    });
    this.input.checked = checked;
    this.input.addEventListener("change", (e) => {
      spapp.controller.handle_data_component_change(
        this.data_point_index,
        this.id,
        this.input.checked
      );
    });
  }
}
