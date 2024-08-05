import view from "../view/view.mjs";
import model from "../model/model.mjs";
import utilities from "../utilities.mjs";
import PathPointControl from "./path-point-control.mjs";
import { makePathPoint } from "../model/path-point.mjs";

view.fgCanvas.addEventListener("mousedown", handleMD);
view.fgCanvas.addEventListener("mouseup", handleMU);
view.fgCanvas.addEventListener("mousemove", handleMM);
document.addEventListener("keydown", handleKD);
document.addEventListener("keyup", handleKU);

let startingPath = true;
let mouseIsDown = false;
const MOVE_THRESHOLD = 5;
let movingPointIndex = -1;
let shiftIsUp = true;

// -------------------- PATHING CONTROLS --------------------
function handleMD(e) {
  mouseIsDown = true;
  for (let i = 0; i < model.path.pathPoints.length; ++i) {
    if (
      utilities.dist(
        model.path.pathPoints[i],
        utilities.convertToModelCoords(e.offsetX, e.offsetY)
      ) < MOVE_THRESHOLD
    ) {
      movingPointIndex = i;
      return;
    }
  }
  addControlPoint(utilities.convertToModelCoords(e.offsetX, e.offsetY));
  if (startingPath) {
    addControlPoint(utilities.convertToModelCoords(e.offsetX, e.offsetY));
    model.robot.pos.x = model.path.pathPoints[0].x;
    model.robot.pos.y = model.path.pathPoints[0].y;
  }
}

function handleMU(e) {
  mouseIsDown = false;
  movingPointIndex = -1;
  startingPath = false;
}

function handleMM(e) {
  if (!mouseIsDown) return;
  let location = utilities.convertToModelCoords(e.offsetX, e.offsetY);
  if (movingPointIndex >= 0) {
    model.path.pathPoints[movingPointIndex].setLocation(location);
    setNumInputs(movingPointIndex, location);
  } else if (startingPath) {
    model.path.pathPoints[1].setLocation(location);
    setNumInputs(1, location);
    // y value swapped below because of different coordinate systems
    model.robot.angle = -Math.atan2(
      model.path.pathPoints[0].y - model.path.pathPoints[1].y,
      model.path.pathPoints[1].x - model.path.pathPoints[0].x
    );
  }
}

function setNumInputs(pointIndex, location) {
  let xInput = document.getElementsByClassName("numInput")[2 * pointIndex];
  let yInput = document.getElementsByClassName("numInput")[2 * pointIndex + 1];
  xInput.value = location.x;
  yInput.value = location.y;
}

function handleKD(e) {
  switch (e.code) {
    case "KeyR":
      model.robot.pos.x = model.path.pathPoints[0].x;
      model.robot.pos.y = model.path.pathPoints[0].y;
      model.robot.angle = -Math.atan2(
        model.path.pathPoints[0].y - model.path.pathPoints[1].y,
        model.path.pathPoints[1].x - model.path.pathPoints[0].x
      );
      break;
    case "ShiftLeft":
      model.isZoomedOut = true;
      if (shiftIsUp) view.drawBG();
      shiftIsUp = false;
      break;
    case "Enter":
      model.robotController.isRunning = true;
      model.robot.isTrackingPosition = true;
      break;
    // todo: control z
    // todo: shift
  }
}

function handleKU(e) {
  switch (e.code) {
    case "ShiftLeft":
      model.isZoomedOut = false;
      view.drawBG();
      shiftIsUp = true;
      break;
    // todo: control z
    // todo: shift
  }
}

// -------------------- HTML CONTROLS --------------------
function addControlPoint(location) {
  let p = makePathPoint(location, true, false);
  model.path.pathPoints.push(p);
  new PathPointControl(p);
}

export default {};
