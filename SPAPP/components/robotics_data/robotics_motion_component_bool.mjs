import create_element from "../../utilities/methods/create_element.mjs";

export default class Robotics_motion_component_bool {
  constructor({ parent, spapp, id, motion_index, checked }) {
    this.parent = parent;
    this.spapp = spapp;
    this.id = id;
    this.motion_index = motion_index;
    this.input = create_element({
      type: "input",
      classes: ["robotics_motion_component_bool"],
      parent: this.parent,
      attributes: { type: "checkbox" },
    });
    this.input.checked = checked;
    this.input.addEventListener("change", (e) => {
      // TODO
      spapp.controller.handle_motion_component_change(
        this.motion_index,
        this.id,
        this.input.checked
      );
    });
  }
}
