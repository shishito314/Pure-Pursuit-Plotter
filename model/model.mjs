import controller from "../controller/controller.mjs";
import Robot from "../sprite/robot.mjs";
import view from "../view/view.mjs";
import PurePursuitController from "./pure-pursuit.mjs";
import RobotPath from "./robot-path.mjs";

export const FIELD_SIZE = 144;
export const ZOOM_OUT_SIZE = 300;
export let isZoomedOut = false;
// export let purePursuitIsRunning = false;

export let path = new RobotPath(view.fgCanvas, view.fgContext);
export let robot = new Robot(
  view.fgCanvas,
  view.fgContext,
  FIELD_SIZE * 0.5,
  FIELD_SIZE * 0.5,
  0,
  FIELD_SIZE / 20,
  FIELD_SIZE / 20,
  FIELD_SIZE / 20
);
export let robotController = new PurePursuitController(
  view.fgCanvas,
  view.fgContext,
  robot,
  path
);

export function run(timeChange) {
  robot.update(timeChange);
  robotController.update();
  // console.log("in");
  // for (let barrel of barrels) {
  //   barrel.update(timeChange);
  // }
}

export default {
  FIELD_SIZE,
  ZOOM_OUT_SIZE,
  isZoomedOut,
  path,
  robot,
  robotController,
  run,
};
