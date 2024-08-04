import utilities from "../utilities.mjs";

export default class RobotPath {
  constructor(can, con) {
    this.can = can;
    this.con = con;
    this.pathPoints = [];
  }
  drawPathPoints() {
    if (!this.pathPoints.length) return;
    this.con.beginPath();
    let start = utilities.convertToCanvasCoords(this.pathPoints[0]);
    this.con.moveTo(start.x, start.y);
    for (let point of this.pathPoints) {
      let p = utilities.convertToCanvasCoords(point);
      this.con.lineTo(p.x, p.y);
    }
    this.con.stroke();
    for (let point of this.pathPoints) {
      let p = utilities.convertToCanvasCoords(point);
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
