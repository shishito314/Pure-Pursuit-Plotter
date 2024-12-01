import Sprite from "./sprite.mjs";

const VEL_MAX = 0.075;
const PATH_TO_IMAGE = "assets/robot-image2.svg";

export default class Robot extends Sprite {
  constructor(spapp, posX, posY, angle, dimX, dimY, wheelBaseWidth) {
    super(spapp, PATH_TO_IMAGE, posX, posY, angle, dimX, dimY);
    this.vel = { l: 0, r: 0 }; // change to left and right wheel?
    this.wheelBaseWidth = wheelBaseWidth;
    this.track = []; // for debugging and logging
    this.isTrackingPosition = false;
    // TODO: doesn't do anything right now
  }

  update(timeChange) {
    // console.log(this.pos.x);
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
      this.track.push({x:this.pos.x, y:this.pos.y}); // for debugging and logging
    if (this.vel.l === this.vel.r) {
      // console.log("In");
      this.pos.x += Math.cos(this.angle) * this.vel.l * timeChange;
      this.pos.y += Math.sin(this.angle) * this.vel.l * timeChange;
    } else if (this.vel.l === 0) {
      let arcLenR = this.vel.r * timeChange;
      let angleTravel = arcLenR / (Math.PI * this.wheelBaseWidth);
      let localDelta = {x:
        2 *
          Math.sin((arcLenR * 0.5) / (Math.PI * this.wheelBaseWidth)) *
          (this.wheelBaseWidth * 0.5),
        y:(1 - Math.cos(angleTravel)) * (this.wheelBaseWidth * 0.5)
      };
      let globalDelta = {x:
        localDelta.x * Math.cos(this.angle) -
          localDelta.y * Math.sin(this.angle),
          y:
        localDelta.y * Math.cos(this.angle) +
          localDelta.x * Math.sin(this.angle)
      };
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
      let localDelta = {x:
        2 *
          Math.PI *
          Math.sin((arcLenL / Math.PI / radLeft) * 0.5) *
          (radLeft + this.wheelBaseWidth * 0.5),
          y:
        (1 - Math.cos(-angleTravel)) * (radLeft + this.wheelBaseWidth * 0.5)
      };
      // console.log(localDelta.x / timeChange, localDelta.y / timeChange);
      let globalDelta = {x:
        localDelta.x * Math.cos(this.angle) -
          localDelta.y * Math.sin(this.angle),
          y:
        localDelta.y * Math.cos(this.angle) +
          localDelta.x * Math.sin(this.angle)
      };
      this.pos.x += globalDelta.x;
      this.pos.y += globalDelta.y; // ??? check coordinate systems
      this.angle += angleTravel; // ??
    }
    // console.log(utilities.dist(this.pos, prevPos) / timeChange);
    // TODO
    // this.pos.x += this.vel.x * timeChange;
    // this.pos.y += this.vel.y * timeChange;
  }
  draw(context) {
    super.draw(context);
    if (!this.track.length) return;
    context.strokeStyle = "red";
    context.lineWidth = 3;
    context.beginPath(); // for debugging and logging
    let start = this.spapp.model.convert_point_to_canvas_coords(this.track[0]);
    // console.log(this.track[0]);
    context.moveTo(start.x, start.y);
    // context.moveTo(0, 0);
    for (let point of this.track) {
      let p = this.spapp.model.convert_point_to_canvas_coords(point);
      context.lineTo(p.x, p.y);
      // context.lineTo(200, 200);
    }
    context.stroke();
    context.strokeStyle = "black";
    context.lineWidth = 1;
  }
}
