import create_element from "../../utilities/methods/create_element.mjs";

export default class Robotics_code {
  constructor({ parent }) {
    this.parent = parent;
    this.container = create_element({ type: "div", parent: this.parent });
    for (let i = 0; i < 15; ++i) {
      this.container.innerHTML += "<p>robotics code</p>";
    }
  }
}
