import create_element from "../../utilities/methods/create_element.mjs";

export default class Robotics_footer {
  constructor({ parent }) {
    this.parent = parent;
    this.container = create_element({ type: "div", parent: this.parent });
    this.container.innerHTML += "Hover over the field to get coordinates here";
  }
  update({x, y}) {
    let text = "(" + Math.round(x * 100) / 100 + ", " + Math.round(y * 100) / 100 + ")";
    this.container.innerHTML = text;
  }
}
