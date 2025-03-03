import create_element from "../../utilities/methods/create_element.mjs";

export default class Robotics_motion_component_delete {
  constructor({ parent, spapp, motion_index }) {
    this.parent = parent;
    this.spapp = spapp;
    this.motion_index = motion_index;
    this.button = create_element({
      type: "button",
      classes: ["robotics_motion_component_delete"],
      parent: this.parent,
    });
    this.button.innerHTML = "X";
    this.button.addEventListener("click", (e) => {
      spapp.controller.handle_motion_component_delete(
        this.motion_index,
      );
    });
  }
}
