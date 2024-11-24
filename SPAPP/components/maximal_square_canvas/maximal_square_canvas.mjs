import create_element from "../../utilities/methods/create_element.mjs";
import load_image from "../../utilities/methods/load_image.mjs";
import observe_resizing from "../../utilities/methods/observe_resizing.mjs";

export default class Maximal_square_canvas {
  constructor({ parent, path_to_background_image }) {
    this.parent = parent;
    this.canvas = create_element({
      type: "canvas",
      styles: { position: "absolute" },
      parent: this.parent,
    });
    this.context = this.canvas.getContext("2d");
    if (path_to_background_image) {
      load_image({ path_to_image: path_to_background_image }).then((image) => {
        this.background_image = image;
        this.resize(this.parent.getBoundingClientRect());
      });
    }
    this.resize_observer = observe_resizing({
      parent: this.parent,
      callback: this.resize.bind(this),
    });
  }
  draw_background() {
    this.context.drawImage(
      this.background_image,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }
  resize({ width, height }) {
    const size = Math.min(width, height);
    this.canvas.style.left = (width - size) / 2 + "px";
    this.canvas.style.top = (height - size) / 2 + "px";
    this.canvas.width = this.canvas.height = size;
    if (this.background_image) this.draw_background();
  }
}
