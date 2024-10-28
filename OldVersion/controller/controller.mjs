import view from "../view/view.mjs";
import model from "../model/model.mjs";
import utilities from "../utilities.mjs";
import PathPointControl from "./path-point-control.mjs";
import { makePathPoint } from "../model/path-point.mjs";

view.fgCanvas.addEventListener("mousedown", handleMD);
view.fgCanvas.addEventListener("mouseup", handleMU);
view.fgCanvas.addEventListener("mousemove", handleMM);
view.fgCanvas.addEventListener("wheel", handleWheel);
document.addEventListener("keydown", handleKD);
document.addEventListener("keyup", handleKU);
// documen

document.getElementById("addProgramButton").addEventListener("click", model.addAuton)
let pointControlContainer = document.getElementById("pointControlContainer");
pointControlContainer.addEventListener("click", handlePointControlBoxClick);
pointControlContainer.addEventListener("mousemove", handlePointControlBoxMove);
let insertGraphic = document.getElementById("insertGraphic");

let startingPath = true;
let mouseIsDown = false;
const MOVE_THRESHOLD = 5;
let movingPointIndex = -1;
let shiftIsUp = true;

export let pointControls = [];

export function removePointControl(index) {
  pointControls.splice(index, 1);
}

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
  let loc = utilities.convertToModelCoords(e.offsetX, e.offsetY);
  loc.x = Math.round(loc.x * 100) / 100;
  loc.y = Math.round(loc.y * 100) / 100;
  addControlPoint(loc);
  if (startingPath) {
    addControlPoint(loc);
    model.robot.pos.x = model.path.pathPoints[0].x;
    model.robot.pos.y = model.path.pathPoints[0].y;
  }
  document.getElementById("output").innerHTML = model.path.getCppCode();
}

function handleMU(e) {
  mouseIsDown = false;
  movingPointIndex = -1;
  startingPath = false;
}

function handleMM(e) {
  if (!mouseIsDown) return;
  let location = utilities.convertToModelCoords(e.offsetX, e.offsetY);
  location.x = Math.round(location.x * 100) / 100;
  location.y = Math.round(location.y * 100) / 100;
  // console.log(location)
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
  document.getElementById("output").innerHTML = model.path.getCppCode();
}

function handleWheel(e) {
  // console.log(e);
  model.FIELD_VIEW_SIZE += 0.1 * e.wheelDelta;
  if (model.FIELD_VIEW_SIZE < model.FIELD_SIZE + 2 * model.FIELD_BORDER_SIZE) {
    model.FIELD_VIEW_SIZE = model.FIELD_SIZE + 2 * model.FIELD_BORDER_SIZE;
  }
  view.drawBG();
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
      model.robot.vel.l = 0;
      model.robot.vel.r = 0;
      model.robot.angle = -Math.atan2(
        model.path.pathPoints[0].y - model.path.pathPoints[1].y,
        model.path.pathPoints[1].x - model.path.pathPoints[0].x
      );
      model.robot.track = [];
      model.robotController.isRunning = false;
      model.robotController.lastFoundIndex = 0;
      model.robot.isTrackingPosition = false;
      break;
    case "ShiftLeft":
      model.isZoomedOut = true;
      if (shiftIsUp) view.drawBG();
      shiftIsUp = false;
      break;
    case "KeyE":
      // model.robotController.isRunning = true;
      model.robot.isTrackingPosition = true;
      model.robotController.goToNextStop();
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
  let p = makePathPoint(
    location,
    model.path.pathPoints.length
      ? model.path.pathPoints[model.path.pathPoints.length - 1].isFwd
      : true,
    false
  );
  console.log(pointControls);
  pointControls.push(new PathPointControl(p, pointControls.length));
  console.log(pointControls);
  model.path.pathPoints.push(p);
}

function insertEmptyControlPoint(index) {
  let p = makePathPoint(
    utilities.point(0,0),
    model.path.pathPoints.length
      ? model.path.pathPoints[model.path.pathPoints.length - 1].isFwd
      : true,
    false
  );
  model.path.pathPoints = [
    ...model.path.pathPoints.slice(0, index+1),
    p,
    ...model.path.pathPoints.slice(index+1)
  ];
  let pControl = new PathPointControl(p, index+1);
  console.log(pointControls);
  pointControls = [
    ...pointControls.slice(0, index+1),
    pControl,
    ...pointControls.slice(index+1)
  ];
  console.log(pointControls);
  for (let i = index+2; i < pointControls.length; ++i) {
    ++(pointControls[i].index);
  }
  
  pointControlContainer.insertBefore(pControl.controlBlock, pointControls[index+2].controlBlock);
  
}

function handlePointControlBoxClick(e) {
  // console.log(e);
  for (let i = 0; i < pointControls.length - 1; ++i) {
    if (e.clientY > pointControls[i].controlBlock.getBoundingClientRect().bottom &&
      e.clientY < pointControls[i+1].controlBlock.getBoundingClientRect().top) {
      insertEmptyControlPoint(i);
    }
  }
}

function handlePointControlBoxMove(e) {
  // console.log(e);
  let mouseBetween = false;
  for (let i = 0; i < pointControls.length - 1; ++i) {
    let boundingBoxTop = pointControls[i].controlBlock.getBoundingClientRect();
    let boundingBoxBottom = pointControls[i+1].controlBlock.getBoundingClientRect();
    if (e.clientY > boundingBoxTop.bottom &&
      e.clientY < boundingBoxBottom.top) {
        mouseBetween = true;
        // if (!insertGraphic) {
          // insertGraphic = document.createElement("div");
          // pointControlContainer.appendChild(insertGraphic);
          // insertGraphic.style.height = "0px";
          // insertGraphic.style.width = `${boundingBoxTop.width}px`;
          // insertGraphic.style.border = "1px solid red";
          // insertGraphic.style.position = "absolute";
          insertGraphic.style.display = "block";
          insertGraphic.style.top = `${(boundingBoxTop.bottom + boundingBoxBottom.top) / 2}px`;
        // }
    }
  }
  if (!mouseBetween /*&& insertGraphic*/) {
    // insertGraphic.remove();
    insertGraphic.style.display = "none";
    // insertGraphic = null;
  }
}


export default { pointControls, removePointControl };
