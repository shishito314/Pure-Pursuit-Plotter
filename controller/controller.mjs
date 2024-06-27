import view from "../view/view.mjs";
import model from "../model/model.mjs";
import utilities from "../utilities.mjs";

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

function handleMD(e) {
  // TODO cntrl key
  mouseIsDown = true;
  let location = utilities.convertToModelCoords({ x: e.offsetX, y: e.offsetY });
  for (let i = 0; i < model.path.controlPoints.length; ++i) {
    if (
      utilities.dist(model.path.controlPoints[i], location) < MOVE_THRESHOLD
    ) {
      movingPointIndex = i;
      return;
    }
  }
  addControlPoint(location);
  addControlPoint(location);
  if (!startingPath) {
    addControlPoint(location);
  }
  if (startingPath) {
    model.robot.pos.x = model.path.controlPoints[0].x;
    model.robot.pos.y = model.path.controlPoints[0].y;
  }
}
function handleMU(e) {
  model.path.generatePathPoints();
  mouseIsDown = false;
  movingPointIndex = -1;
  startingPath = false;
}

function handleMM(e) {
  if (!mouseIsDown) return;
  model.path.generatePathPoints();
  if (movingPointIndex >= 0) {
    let location = utilities.convertToModelCoords({
      x: e.offsetX,
      y: e.offsetY,
    });
    model.path.controlPoints[movingPointIndex] = location;
    setNumInputs(movingPointIndex, location);
  } else if (startingPath) {
    let location = utilities.convertToModelCoords({
      x: e.offsetX,
      y: e.offsetY,
    });
    model.path.controlPoints[1] = location;
    setNumInputs(1, location);

    // y value swapped below because of different coordinate systems
    model.robot.angle = -Math.atan2(
      model.path.controlPoints[0].y - model.path.controlPoints[1].y,
      model.path.controlPoints[1].x - model.path.controlPoints[0].x
    );
  } else {
    let locationA = utilities.convertToModelCoords({
      x: e.offsetX,
      y: e.offsetY,
    });
    model.path.controlPoints[model.path.controlPoints.length - 3] = locationA;
    setNumInputs(model.path.controlPoints.length - 3, locationA);
    let locationB = utilities.lerp(
      model.path.controlPoints[model.path.controlPoints.length - 2],
      model.path.controlPoints[model.path.controlPoints.length - 3],
      -1
    );
    model.path.controlPoints[model.path.controlPoints.length - 1] = locationB;
    setNumInputs(model.path.controlPoints.length - 1, locationB);
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
    case "Space":
      model.robot.pos.x = model.path.controlPoints[0].x;
      model.robot.pos.y = model.path.controlPoints[0].y;
      model.robot.angle = -Math.atan2(
        model.path.controlPoints[0].y - model.path.controlPoints[1].y,
        model.path.controlPoints[1].x - model.path.controlPoints[0].x
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
      // console.log("here");
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

function addControlPoint(location) {
  model.path.controlPoints.push(location);
  let controlBlock = document.createElement("div");
  controlBlock.className = "controlPointBlock";
  document.getElementById("pointControlContainer").appendChild(controlBlock);
  let xInputBox = document.createElement("span");
  xInputBox.className = "controlPointInputBox";
  let xInputLabel = document.createElement("label");
  xInputLabel.className = "controlPointLabel";
  xInputLabel.innerHTML = "x:";
  let xInput = document.createElement("input");
  xInput.className = "numInput";
  xInput.type = "number";
  xInput.value = location.x;
  // xInput.addEventListener("change", () => {
  //   model.path.controlPoints
  // });
  xInputBox.appendChild(xInputLabel);
  xInputBox.appendChild(xInput);
  controlBlock.appendChild(xInputBox);
  let yInputBox = document.createElement("span");
  yInputBox.className = "controlPointInputBox";
  let yInputLabel = document.createElement("label");
  yInputLabel.className = "controlPointLabel";
  yInputLabel.innerHTML = "y:";
  let yInput = document.createElement("input");
  yInput.className = "numInput";
  yInput.type = "number";
  yInput.value = location.y;
  yInputBox.appendChild(yInputLabel);
  yInputBox.appendChild(yInput);
  controlBlock.appendChild(yInputBox);
}

export default {};
