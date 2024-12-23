import create_element from "../../utilities/methods/create_element.mjs";
import link_styles from "../../utilities/methods/link_styles.mjs";
import Maximal_square_canvas from "../maximal_square_canvas/maximal_square_canvas.mjs";
import Resizable_background_canvas from "../maximal_square_canvas/resizable_background_canvas.mjs";

const STYLES = "components/robotics_graphics/robotics_graphics.css";
const BACKGROUND_IMAGE = "assets/field2.png";

export default class Robotics_graphics {
  constructor({ parent, spapp }) {
    this.parent = parent;
    this.spapp = spapp;
    this.styles = link_styles({ css_href: STYLES });
    this.container = create_element({
      type: "div",
      classes: ["robotics_graphics"],
    });
    this.bottom_canvas = new Resizable_background_canvas({
      parent: this.container,
      spapp: this.spapp,
      path_to_background_image: BACKGROUND_IMAGE,
    });
    this.middle_canvas = new Maximal_square_canvas({ parent: this.container });
    this.top_canvas = new Maximal_square_canvas({ parent: this.container });
    this.parent.appendChild(this.container);
  }
  update() {
    // Clear canvases
    this.bottom_canvas.context.clearRect(
      0,
      0,
      this.bottom_canvas.canvas.width,
      this.bottom_canvas.canvas.height
    );
    this.bottom_canvas.draw_background();
    this.middle_canvas.context.clearRect(
      0,
      0,
      this.middle_canvas.canvas.width,
      this.middle_canvas.canvas.height
    );
    this.top_canvas.context.clearRect(
      0,
      0,
      this.top_canvas.canvas.width,
      this.top_canvas.canvas.height
    );
    // Draw path
    this.spapp.model.path.draw(
      this.spapp.view.components.graphics.middle_canvas.context
    );
    // Draw robot
    this.spapp.model.robot.draw(
      this.spapp.view.components.graphics.top_canvas.context
    );
  }
  animate() {
    this.top_canvas.context.clearRect(0, 0, this.top_canvas.canvas.width, this.top_canvas.canvas.height);
    // this.spapp.model.path.draw();
    this.spapp.model.robot_controller.draw(this.top_canvas.context);
    this.spapp.model.robot.draw(this.top_canvas.context);
  }
}
