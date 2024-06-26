import Bezier from "./bezier.mjs";
import model from "./model.mjs";


export default class RobotPath {
  constructor(can, con) {
    this.can = can;
    this.con = con;
    this.segments = [];
    this.pathPoints = [];
  }
  draw() {
    for (let segment of this.segments) {
      segment.draw();
      segment.drawControlPoints();
    }
    // TODO
  }
  generatePathPoints() {
    // TODO
  }
  addPoint() {
    
  }
}
