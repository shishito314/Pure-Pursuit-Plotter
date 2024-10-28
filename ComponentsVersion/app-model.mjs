import Robot from "../sprite/robot.mjs";
import view from "../view/view.mjs";
import PurePursuitController from "./pure-pursuit.mjs";
import RobotPath from "./robot-path.mjs";

export const FIELD_BORDER_SIZE = 4.5;
export const FIELD_SIZE = 144;
export let FIELD_VIEW_SIZE = FIELD_SIZE + 2 * FIELD_BORDER_SIZE;
export let isZoomedOut = false;

let robotPaths = [new RobotPath(view.fgCanvas, view.fgContext)];
export let path = robotPaths[0];
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

export function addAuton() {
  robotPaths.push(new RobotPath(view.fgCanvas, view.fgContext));
  console.log(robotPaths);
}

export function resetRobot() {
  // TODO
}

export function run(timeChange) {
  robot.update(timeChange);
  robotController.update();
}

export default {
  FIELD_SIZE,
  FIELD_VIEW_SIZE,
  FIELD_BORDER_SIZE,
  isZoomedOut,
  path,
  robot,
  robotController,
  run,
  addAuton,
};
