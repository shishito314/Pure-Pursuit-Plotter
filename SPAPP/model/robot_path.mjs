import Robot_motion from "./robot_motion.mjs";

export default class Robot_path {
  constructor(spapp) {
    this.spapp = spapp;
    this.motions = [
      new Robot_motion(this.spapp, true, false)
    ];
  }
  draw(context) {
    for (let motion of this.motions) {
      motion.draw(context);
    }
  }
}
