import create_element from "../../utilities/methods/create_element.mjs";

export default class Robotics_footer {
  constructor({ parent }) {
    this.parent = parent;
    this.container = create_element({ type: "div", parent: this.parent });
    this.container.innerHTML += "robotics footer";
  }
}
