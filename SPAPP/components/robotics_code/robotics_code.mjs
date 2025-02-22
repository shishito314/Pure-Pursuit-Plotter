import create_element from "../../utilities/methods/create_element.mjs";
import link_styles from "../../utilities/methods/link_styles.mjs";

const STYLES = "components/robotics_code/robotics_code.css";
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default class Robotics_code {
  constructor({ parent, spapp }) {
    this.parent = parent;
    this.spapp = spapp;
    this.styles = link_styles({ css_href: STYLES });
    this.container = create_element({ type: "div", parent: this.parent, classes: ["robotics_code"], });
    // for (let i = 0; i < 15; ++i) {
    //   this.container.innerHTML += "<p>robotics code</p>";
    // }
  }
  update() {
    // Generate Code
    let codeStr = "#pragma once<br>#include \"vector.h\"<br>#include \"path-motion.h\"<br>";
    for (const i in this.spapp.model.path.motions) {
      const motion = this.spapp.model.path.motions[i];
      codeStr += "<br>const PathMotion path" + ALPHABET[i] + "{" + motion.is_fwd + ", " + motion.is_stop + ", {<br>";
      for (const point of motion.path_points) {
        codeStr += "&emsp;Vector{"
        codeStr += point.x + ", ";
        codeStr += point.y + "},<br>";
      }
      codeStr += "}};<br><br>";
    }
    // codeStr += "constexpr size_t numPathPoints{" + this.spapp.model.path.path_points.length + "};"
    this.container.innerHTML = codeStr;
  }
  getCode() {
    let codeStr = "#pragma once\n#include \"vector.h\"\n#include \"path-motion.h\"\n";
    for (const i in this.spapp.model.path.motions) {
      const motion = this.spapp.model.path.motions[i];
      codeStr += "\nconst PathMotion path" + ALPHABET[i] + "{" + motion.is_fwd + ", " + motion.is_stop + ", {\n";
      for (const point of motion.path_points) {
        codeStr += "\tVector{"
        codeStr += point.x + ", ";
        codeStr += point.y + "},\n";
      }
      codeStr += "}};\n\n";
    }
    return codeStr;
  }
}