import load_image from "../../utilities/methods/load_image.mjs";

export default class Sprite {
  constructor(spapp, path_to_image, posX, posY, angle, dimX, dimY) {
    this.spapp = spapp;
    load_image({ path_to_image }).then((image) => {
      this.image = image;
    });
    this.pos = { x: posX, y: posY };
    this.angle = angle;
    this.dim = { x: dimX, y: dimY };
  }
  draw(context) {
    let viewPos = this.spapp.model.convert_point_to_canvas_coords(this.pos);
    context.translate(viewPos.x, viewPos.y);
    context.rotate(-this.angle); // bc of clockwise rotation
    let viewDim = this.spapp.model.convert_dims_to_canvas(this.dim);
    context.drawImage(
      this.image,
      -viewDim.x * 0.5,
      -viewDim.y * 0.5,
      viewDim.x,
      viewDim.y
    );
    context.rotate(this.angle);
    context.translate(-viewPos.x, -viewPos.y);
  }
}
