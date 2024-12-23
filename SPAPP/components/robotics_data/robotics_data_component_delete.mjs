import create_element from "../../utilities/methods/create_element.mjs";

export default class Robotics_data_component_delete {
  constructor({ parent, spapp, data_point_index }) {
    this.parent = parent;
    this.spapp = spapp;
    this.data_point_index = data_point_index;
    this.button = create_element({
      type: "button",
      classes: ["robotics_data_component_delete"],
      parent: this.parent,
    });
    this.button.innerHTML = "X";
    this.button.addEventListener("click", (e) => {
      spapp.controller.handle_data_component_delete(
        this.data_point_index
      );
    });
  }
}
