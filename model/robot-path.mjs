import utilities from "../utilities.mjs";
import view from "../view/view.mjs";

export default class RobotPath {
  constructor() {
    this.can = view.fgCanvas;
    this.con = view.fgContext;
    this.pathPoints = [];
  }
  drawPathPoints() {
    if (!this.pathPoints.length) return;
    this.con.beginPath();
    let start = utilities.convertPointToCanvasCoords(this.pathPoints[0]);
    this.con.moveTo(start.x, start.y);
    for (let point of this.pathPoints) {
      let p = utilities.convertPointToCanvasCoords(point);
      this.con.lineTo(p.x, p.y);
    }
    this.con.stroke();
    for (let point of this.pathPoints) {
      let p = utilities.convertPointToCanvasCoords(point);
      this.con.beginPath();
      this.con.arc(p.x, p.y, 5, 0, 2 * Math.PI);
      this.con.fillStyle = "white";
      this.con.fill();
      this.con.fillStyle = "black";
    }
  }
  draw() {
    this.drawPathPoints();
  }
}
