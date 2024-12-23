import { FIELD_SIZE } from "../../model/config.mjs";
import create_element from "../../utilities/methods/create_element.mjs";
import load_image from "../../utilities/methods/load_image.mjs";
import observe_resizing from "../../utilities/methods/observe_resizing.mjs";
import Maximal_square_canvas from "./maximal_square_canvas.mjs";

export default class Resizable_background_canvas extends Maximal_square_canvas {
  constructor({ parent, spapp, path_to_background_image }) {
    super({parent});
    this.spapp = spapp;
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
    if (!this.background_image) return;
    this.context.drawImage(
      this.background_image,
      (this.canvas.width - this.canvas.width * FIELD_SIZE / this.spapp.model.field_view_size) / 2,
      (this.canvas.height - this.canvas.height * FIELD_SIZE / this.spapp.model.field_view_size) / 2,
      this.canvas.width * FIELD_SIZE / this.spapp.model.field_view_size,
      this.canvas.height * FIELD_SIZE / this.spapp.model.field_view_size
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
