import utilities from "../utilities.mjs";

export default class Sprite {
  constructor(img, can, con, posX, posY, angle, dimX, dimY) {
    this.img = img;
    this.can = can;
    this.con = con;
    this.pos = utilities.point(posX, posY);
    this.angle = angle;
    // ^ not putting it in pos to comply with other point object formats
    this.dim = utilities.point(dimX, dimY);
  }
  draw() {
    let viewPos = utilities.convertPointToCanvasCoords(this.pos);
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
