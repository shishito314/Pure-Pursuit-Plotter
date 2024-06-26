import model from "../model/model.mjs";
import utilities from "../utilities.mjs";
import view from "../view/view.mjs";

export default class Sprite {
  constructor(img, can, con, posX, posY, angle, dimX, dimY) {
    this.img = img;
    this.can = can;
    this.con = con;
    this.pos = {
      x: posX,
      y: posY,
    };
    this.angle = angle;
    // ^ not putting it in pos to comply with other point object formats
    this.dim = {
      x: dimX,
      y: dimY,
    };
  }
  draw() {
    let viewPos = utilities.convertToCanvasCoords(this.pos);
    this.con.translate(viewPos.x, viewPos.y);
    this.con.rotate(-this.angle); // bc of clockwise rotation
    let viewDim = utilities.convertDimToCanvasCoords(this.dim);
    this.con.drawImage(
      this.img,
      -viewDim.x * 0.5,
      -viewDim.y * 0.5,
      viewDim.x,
      viewDim.y
    );
    this.con.rotate(this.angle);
    this.con.translate(-viewPos.x, -viewPos.y);
  }
}
