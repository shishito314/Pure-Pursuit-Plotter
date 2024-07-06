import utilities from "../utilities.mjs";
import model from "./model.mjs";

// const POINT_STEP = 0.02; // why doesn't pure pursuit work with smaller step size?

export default class RobotPath {
  constructor(can, con) {
    this.can = can;
    this.con = con;
    // this.controlPoints = [];
    this.pathPoints = [];
  }
  // drawControlPoints() {
  //   for (let controlPoint of this.controlPoints) {
  //     let p = utilities.convertToCanvasCoords(controlPoint);
  //     this.con.beginPath();
  //     this.con.arc(p.x, p.y, 5, 0, 2 * Math.PI);
  //     this.con.fillStyle = "white";
  //     this.con.fill();
  //     this.con.fillStyle = "black";
  //   }
  // }
  drawPathPoints() {
    // this.generatePathPoints();
    if (!this.pathPoints.length) return;
    this.con.beginPath();
    let start = utilities.convertToCanvasCoords(this.pathPoints[0]);
    this.con.moveTo(start.x, start.y);
    for (let point of this.pathPoints) {
      let p = utilities.convertToCanvasCoords(point);
      this.con.lineTo(p.x, p.y);
      // this.con.arc(p.x, p.y, 3, 0, 2 * Math.PI);
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
    // this.drawControlPoints();
    this.drawPathPoints();
  }
  // generatePathPoints() {
  //   this.pathPoints = [];
  //   if (!this.controlPoints[0]) {
  //     return;
  //   }
  //   for (let i = 0; i + 3 < this.controlPoints.length; i += 3) {
  //     let pFirst = this.controlPoints[i];
  //     let pSecond = this.controlPoints[i + 1];
  //     let pThird = this.controlPoints[i + 2];
  //     let pFourth = this.controlPoints[i + 3];
  //     for (let i = 0; i <= 1 / POINT_STEP; ++i) {
  //       // doing it this way to avoid rounding error
  //       this.pathPoints.push(
  //         utilities.getBezierPoint(
  //           pFirst,
  //           pSecond,
  //           pThird,
  //           pFourth,
  //           i * POINT_STEP
  //         )
  //       );
  //     }
  //   }
  // }
  // circleSmoothPath() {}
}
