import create_element from "../../utilities/methods/create_element.mjs";
import link_styles from "../../utilities/methods/link_styles.mjs";
import Maximal_square_canvas from "../maximal_square_canvas/maximal_square_canvas.mjs";

const STYLES = "components/robotics_graphics/robotics_graphics.css";
const BACKGROUND_IMAGE = "assets/field.png";

export default class Robotics_graphics {
  constructor({ parent }) {
    this.parent = parent;
    this.styles = link_styles({ css_href: STYLES });
    this.container = create_element({
      type: "div",
      classes: ["robotics_graphics"],
    });
    this.bottom_canvas = new Maximal_square_canvas({
      parent: this.container,
      path_to_background_image: BACKGROUND_IMAGE,
    });
    this.middle_canvas = new Maximal_square_canvas({ parent: this.container });
    this.top_canvas = new Maximal_square_canvas({ parent: this.container });
    this.parent.appendChild(this.container);
  }
}
