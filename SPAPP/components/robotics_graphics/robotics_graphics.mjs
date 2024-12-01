import create_element from "../../utilities/methods/create_element.mjs";
import link_styles from "../../utilities/methods/link_styles.mjs";
import Maximal_square_canvas from "../maximal_square_canvas/maximal_square_canvas.mjs";

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
    this.bottom_canvas = new Maximal_square_canvas({
      parent: this.container,
      path_to_background_image: BACKGROUND_IMAGE,
    });
    this.middle_canvas = new Maximal_square_canvas({ parent: this.container });
    this.top_canvas = new Maximal_square_canvas({ parent: this.container });
    this.parent.appendChild(this.container);
  }
  update() {
    // setTimeout(() => this.update(), 100); // WHY?
    // Clear canvases
    // this.bottom_canvas.context.clearRect(
    //   0,
    //   0,
    //   this.bottom_canvas.canvas.width,
    //   this.bottom_canvas.canvas.height
    // );
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
    if (this.spapp.model.path.length) {
      this.middle_canvas.context.beginPath();
      let start = this.spapp.model.convert_point_to_canvas_coords(
        this.spapp.model.path[0]
      );
      this.middle_canvas.context.moveTo(start.x, start.y);
      for (let point of this.spapp.model.path) {
        let p = this.spapp.model.convert_point_to_canvas_coords(point);
        this.middle_canvas.context.lineTo(p.x, p.y);
      }
      this.middle_canvas.context.strokeStyle = "darkGreen";
      this.middle_canvas.context.lineWidth = 3;
      this.middle_canvas.context.stroke();
      this.middle_canvas.context.strokeStyle = "black";
      this.middle_canvas.context.lineWidth = 1;
      for (let point of this.spapp.model.path) {
        let p = this.spapp.model.convert_point_to_canvas_coords(point);
        this.middle_canvas.context.beginPath();
        this.middle_canvas.context.arc(p.x, p.y, 5, 0, 2 * Math.PI);
        this.middle_canvas.context.fillStyle = "white";
        this.middle_canvas.context.fill();
        this.middle_canvas.context.fillStyle = "black";
      }
    }
    // Draw robot
    this.spapp.model.robot.draw(
      this.spapp.view.components.graphics.top_canvas.context
    );
  }
}
