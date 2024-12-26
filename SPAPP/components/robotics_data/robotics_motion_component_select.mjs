import create_element from "../../utilities/methods/create_element.mjs";

export default class Robotics_motion_component_select {
  constructor({ parent, spapp, motion_index }) {
    this.parent = parent;
    this.spapp = spapp;
    this.motion_index = motion_index;
    this.button = create_element({
      type: "button",
      classes: ["robotics_motion_component_select"],
      parent: this.parent,
    });
    this.button.innerHTML = "Select";
    // this.button.addEventListener("click", (e) => {
    //   spapp.controller.handle_motion_component_delete(
    //     this.motion_index,
    //   );
    // });
    this.button.addEventListener("click", (e) => {
        spapp.controller.handle_set_motion_focus(this.motion_index);
    });
  }
}
