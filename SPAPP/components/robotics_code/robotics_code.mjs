import create_element from "../../utilities/methods/create_element.mjs";

export default class Robotics_code {
  constructor({ parent, spapp }) {
    this.parent = parent;
    this.spapp = spapp;
    this.container = create_element({ type: "div", parent: this.parent });
    // for (let i = 0; i < 15; ++i) {
    //   this.container.innerHTML += "<p>robotics code</p>";
    // }
  }
  update() {
    // Generate Code
    let codeStr = "const PathPoint path[] = {<br>"
    // console.log(this.pathPoints);
    for (const point of this.spapp.model.path.path_points) {
      // console.log(p);
      codeStr += "&emsp;PathPoint("
      codeStr += point.x + ", ";
      codeStr += point.y + ", ";
      codeStr += point.is_fwd + ", ";
      codeStr += point.is_stop + "),<br>";
    }
    codeStr += "};<br><br>";
    codeStr += "constexpr size_t numPathPoints{" + this.spapp.model.path.path_points.length + "};"
    this.container.innerHTML = codeStr;
  }
}
