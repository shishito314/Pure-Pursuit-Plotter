import utilities from "../utilities.mjs";
import Sprite from "./sprite.mjs";

const VEL_MAX = 0.075;

export default class Robot extends Sprite {
  constructor(can, con, posX, posY, angle, dimX, dimY, wheelBaseWidth) {
    super(
      document.getElementById("robotImage"),
      can,
      con,
      posX,
      posY,
      angle,
      dimX,
      dimY
    );
    this.vel = { l: 0, r: 0 }; // change to left and right wheel?
    this.wheelBaseWidth = wheelBaseWidth;
    this.track = []; // for debugging and logging
    this.isTrackingPosition = false;
    // TODO: doesn't do anything right now
  }

  update(timeChange) {
    if (this.vel.l > VEL_MAX) {
      this.vel.r *= VEL_MAX / this.vel.l;
      this.vel.l = VEL_MAX;
    } else if (this.vel.l < -VEL_MAX) {
      this.vel.r *= -VEL_MAX / this.vel.l;
      this.vel.l = -VEL_MAX;
    }
    if (this.vel.r > VEL_MAX) {
      this.vel.l *= VEL_MAX / this.vel.r;
      this.vel.r = VEL_MAX;
    } else if (this.vel.r < -VEL_MAX) {
      this.vel.l *= -VEL_MAX / this.vel.r;
      this.vel.r = -VEL_MAX;
    }
    if (this.isTrackingPosition)
      this.track.push(utilities.point(this.pos.x, this.pos.y)); // for debugging and logging
    if (this.vel.l === this.vel.r) {
      // console.log("In");
      this.pos.x += Math.cos(this.angle) * this.vel.l * timeChange;
      this.pos.y += Math.sin(this.angle) * this.vel.l * timeChange;
    } else if (this.vel.l === 0) {
      let arcLenR = this.vel.r * timeChange;
      let angleTravel = arcLenR / (Math.PI * this.wheelBaseWidth);
      let localDelta = utilities.point(
        2 *
          Math.sin((arcLenR * 0.5) / (Math.PI * this.wheelBaseWidth)) *
          (this.wheelBaseWidth * 0.5),
        (1 - Math.cos(angleTravel)) * (this.wheelBaseWidth * 0.5)
      );
      let globalDelta = utilities.point(
        localDelta.x * Math.cos(this.angle) -
          localDelta.y * Math.sin(this.angle),
        localDelta.y * Math.cos(this.angle) +
          localDelta.x * Math.sin(this.angle)
      );
      this.pos.x += globalDelta.x;
      this.pos.y += globalDelta.y; // ??? check coordinate systems
      this.angle += angleTravel; // ??
    } else {
      let arcLenL = this.vel.l * timeChange;
      let circumferenceRatio = this.vel.r / this.vel.l;
      let radLeft = this.wheelBaseWidth / (circumferenceRatio - 1);
      let angleTravel =
        (timeChange * (this.vel.r - this.vel.l) * Math.PI) /
        (Math.PI * this.wheelBaseWidth);
      // console.log(angleTravel);
      let localDelta = utilities.point(
        2 *
          Math.PI *
          Math.sin((arcLenL / Math.PI / radLeft) * 0.5) *
          (radLeft + this.wheelBaseWidth * 0.5),
        (1 - Math.cos(-angleTravel)) * (radLeft + this.wheelBaseWidth * 0.5)
      );
      // console.log(localDelta.x / timeChange, localDelta.y / timeChange);
      let globalDelta = utilities.point(
        localDelta.x * Math.cos(this.angle) -
          localDelta.y * Math.sin(this.angle),
        localDelta.y * Math.cos(this.angle) +
          localDelta.x * Math.sin(this.angle)
      );
      this.pos.x += globalDelta.x;
      this.pos.y += globalDelta.y; // ??? check coordinate systems
      this.angle += angleTravel; // ??
    }
    // console.log(utilities.dist(this.pos, prevPos) / timeChange);
    // TODO
    // this.pos.x += this.vel.x * timeChange;
    // this.pos.y += this.vel.y * timeChange;
  }
  draw() {
    super.draw();
    if (!this.track.length) return;
    this.con.strokeStyle = "red";
    this.con.beginPath(); // for debugging and logging
    let start = utilities.convertPointToCanvasCoords(this.track[0]);
    // console.log(this.track[0]);
    this.con.moveTo(start.x, start.y);
    // this.con.moveTo(0, 0);
    for (let point of this.track) {
      let p = utilities.convertPointToCanvasCoords(point);
      this.con.lineTo(p.x, p.y);
      // this.con.lineTo(200, 200);
    }
    this.con.stroke();
    this.con.strokeStyle = "black";
  }
}
