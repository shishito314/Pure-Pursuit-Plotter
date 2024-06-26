import utilities from "../utilities.mjs";
import view from "../view/view.mjs";
import model from "./model.mjs";

export const LOOK_AHEAD_RAD = 6; // total guess
const kPLinear = 0.15 / LOOK_AHEAD_RAD;
const kPAngle = 1.5 / LOOK_AHEAD_RAD;

export default class PurePursuitController {
  constructor(can, con, robot, path) {
    this.can = can; // for debugging and visualizing
    this.con = con; // for debugging and visualizing
    this.logPoint; // for debugging and visualizing
    this.robot = robot;
    this.path = path;
    this.lookAheadRadius = LOOK_AHEAD_RAD;
    this.lastFoundIndex = 0;
    this.isRunning = false;
  }

  chooseGoalPoint() {
    for (
      let i = this.lastFoundIndex;
      i < this.path.pathPoints.length - 1;
      ++i
    ) {
      let p1 = this.path.pathPoints[i];
      let p2 = this.path.pathPoints[i + 1];
      let ints = utilities.boundedCircleLineIntersect(
        p1,
        p2,
        this.robot.pos,
        this.lookAheadRadius
      );
      // this.lastFoundIndex = i;
      // console.log(ints);
      for (let int of ints) {
        if (!int.x) continue;
        // needed to check if (int.x)??
        if (
          utilities.dist(int, this.path.pathPoints[i + 1]) <
          utilities.dist(this.robot.pos, this.path.pathPoints[i + 1])
        ) {
          this.lastFoundIndex = i;
          return int; // ???
        } else {
          // this.lastFoundIndex = i + 1;
          // ++this.lastFoundIndex;
        }
        // TODO
      }
    }
    // console.log(this.path.pathPoints[this.lastFoundIndex]);
    // return this.path.pathPoints[this.lastFoundIndex + 1];
    return this.path.pathPoints[this.lastFoundIndex + 1];
    // no valid found, so return pathpoints[lastfound]
  }

  update() {
    if (!this.isRunning) return;
    if (!this.path.pathPoints.length) return;
    let goalPoint = this.chooseGoalPoint();
    this.logPoint = goalPoint;

    // console.log(goalPoint);
    let angleToGoalPoint = Math.atan2(
      // 180 to -180
      goalPoint.y - this.robot.pos.y,
      goalPoint.x - this.robot.pos.x
    );
    // if (angleToGoalPoint < 0) angleToGoalPoint += 2 * Math.PI;
    let deltaAngle = utilities.angleRangePNPi(
      utilities.angleRangeZeroToTwoPi(angleToGoalPoint) -
        utilities.angleRangeZeroToTwoPi(this.robot.angle)
    );
    // if (deltaAngle > Math.PI) {
    //   deltaAngle = -(2 * Math.PI) + deltaAngle;
    // } else if (deltaAngle < -Math.PI) {
    //   deltaAngle = 2 * Math.PI + deltaAngle;
    // }
    // console.log((this.robot.angle * 180) / Math.PI);

    let deltaDist = utilities.dist(goalPoint, this.robot.pos);
    // console.log(deltaDist);

    let linearVel = kPLinear * deltaDist;
    let angleVel = kPAngle * deltaAngle;

    this.robot.vel.l = linearVel - angleVel;
    this.robot.vel.r = linearVel + angleVel;
  }

  draw() {
    let viewPos = utilities.convertToCanvasCoords(this.robot.pos);
    this.con.beginPath();
    this.con.arc(
      viewPos.x,
      viewPos.y,
      (LOOK_AHEAD_RAD * this.can.width) / model.FIELD_SIZE,
      0,
      2 * Math.PI
    );
    this.con.stroke();
    if (this.logPoint) {
      let viewPosLogPoint = utilities.convertToCanvasCoords(this.logPoint);
      this.con.beginPath();
      this.con.arc(viewPosLogPoint.x, viewPosLogPoint.y, 5, 0, 2 * Math.PI);
      this.con.fillStyle = "green";
      this.con.fill();
      this.con.fillStyle = "black";
    }
  }
}
