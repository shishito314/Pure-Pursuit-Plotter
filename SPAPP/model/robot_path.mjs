import Robot_motion from "./robot_motion.mjs";
import Robot_motion_bezier from "./robot_motion_bezier.mjs";

export default class Robot_path {
  constructor(spapp) {
    this.spapp = spapp;
    this.motions = [
      // new Robot_motion_bezier(this.spapp, true, false)
    ];
  }
  draw(context) {
    for (let motion of this.motions) {
      motion.draw(context);
    }
  }
}
