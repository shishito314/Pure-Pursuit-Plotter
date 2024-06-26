import model, { FIELD_SIZE } from "../model/model.mjs";
import { LOOK_AHEAD_RAD } from "../model/pure-pursuit.mjs";
import utilities from "../utilities.mjs";
import Sprite from "./sprite.mjs";

const VEL_MAX = 0.2;

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
    }
    if (this.vel.r > VEL_MAX) {
      this.vel.l *= VEL_MAX / this.vel.r;
      this.vel.r = VEL_MAX;
    }
    if (this.isTrackingPosition)
      this.track.push({ x: this.pos.x, y: this.pos.y }); // for debugging and logging
    // check for this.vel.l = 0 and velL = velR
    // console.log((this.angle * 180) / Math.PI);
    if (this.vel.l === this.vel.r) {
      this.pos.x += Math.cos(this.angle) * this.vel.l;
      this.pos.x += Math.sin(this.angle) * this.vel.l;
    } else if (this.vel.l === 0) {
      let arcLenR = this.vel.r * timeChange;
      let radLeft = 0;
      let angleTravel = arcLenR / (2 * Math.PI * this.wheelBaseWidth);
      let localDelta = {
        x: Math.sin(angleTravel) * (radLeft + this.wheelBaseWidth * 0.5),
        y:
          radLeft +
          this.wheelBaseWidth * 0.5 -
          Math.cos(angleTravel) * (radLeft + this.wheelBaseWidth * 0.5),
      };
      let globalDelta = {
        x:
          localDelta.x * Math.cos(this.angle) -
          localDelta.y * Math.sin(this.angle),
        y:
          localDelta.y * Math.cos(this.angle) +
          localDelta.x * Math.sin(this.angle),
      };
      // console.log(radLeft);
      this.pos.x += globalDelta.x;
      this.pos.y += globalDelta.y; // ??? check coordinate systems
      this.angle += angleTravel; // ??
    } else {
      let arcLenL = this.vel.l * timeChange;
      let circumferenceRatio = this.vel.r / this.vel.l;
      let radLeft = this.wheelBaseWidth / (circumferenceRatio - 1);
      let angleTravel = arcLenL / (2 * Math.PI * radLeft);
      let localDelta = {
        x: Math.sin(angleTravel) * (radLeft + this.wheelBaseWidth * 0.5),
        y:
          radLeft +
          this.wheelBaseWidth * 0.5 -
          Math.cos(angleTravel) * (radLeft + this.wheelBaseWidth * 0.5),
      };
      let globalDelta = {
        x:
          localDelta.x * Math.cos(this.angle) -
          localDelta.y * Math.sin(this.angle),
        y:
          localDelta.y * Math.cos(this.angle) +
          localDelta.x * Math.sin(this.angle),
      };
      // console.log(radLeft);
      this.pos.x += globalDelta.x;
      this.pos.y += globalDelta.y; // ??? check coordinate systems
      this.angle += angleTravel; // ??
    }
    // TODO
    // this.pos.x += this.vel.x * timeChange;
    // this.pos.y += this.vel.y * timeChange;
  }
  draw() {
    super.draw();
    if (!this.track.length) return;
    this.con.strokeStyle = "red";
    this.con.beginPath(); // for debugging and logging
    let start = utilities.convertToCanvasCoords(this.track[0]);
    // console.log(this.track[0]);
    this.con.moveTo(start.x, start.y);
    // this.con.moveTo(0, 0);
    for (let point of this.track) {
      let p = utilities.convertToCanvasCoords(point);
      this.con.lineTo(p.x, p.y);
      // this.con.lineTo(200, 200);
    }
    this.con.stroke();
    this.con.strokeStyle = "black";
  }
}
