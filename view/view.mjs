import model from "../model/model.mjs";
import utilities from "../utilities.mjs";

const TOTAL_ASPECT_RATIO = 4 / 3;
const CANVAS_BORDER_THICKNESS = 5;

const bgCanvas = document.getElementById("bgCanvas");
const fgCanvas = document.getElementById("fgCanvas");
const bgContext = bgCanvas.getContext("2d");
const fgContext = fgCanvas.getContext("2d");
const sideBar = document.getElementById("sideBar");

const bgImg = document.getElementById("fieldImage");

function drawBG() {
  bgContext.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  let cornerBL = utilities.convertToCanvasCoords({ x: 0, y: 0 });
  let cornerTR = utilities.convertToCanvasCoords({
    x: model.FIELD_SIZE,
    y: model.FIELD_SIZE,
  });
  bgContext.drawImage(
    bgImg,
    cornerBL.x,
    cornerTR.y,
    cornerTR.x - cornerBL.x,
    cornerBL.y - cornerTR.y
  );
  // for (let platform of model.platforms) {
  //   platform.draw();
  // }
  // for (let ladder of model.ladders) {
  //   ladder.draw();
  // }
}

function drawFG() {
  fgContext.clearRect(0, 0, fgCanvas.width, fgCanvas.height);
  model.robot.draw();
  model.path.draw();
  model.robotController.draw();
  // for (let barrel of model.barrels) {
  //   barrel.draw();
  // }
}

function resize() {
  const aspectRatio = innerWidth / innerHeight;
  if (aspectRatio < TOTAL_ASPECT_RATIO) {
    bgCanvas.width = fgCanvas.width =
      innerWidth / TOTAL_ASPECT_RATIO - 2 * CANVAS_BORDER_THICKNESS;
    bgCanvas.height = fgCanvas.height =
      innerWidth / TOTAL_ASPECT_RATIO - 2 * CANVAS_BORDER_THICKNESS;
  } else {
    bgCanvas.height = fgCanvas.height =
      innerHeight - 2 * CANVAS_BORDER_THICKNESS;
    bgCanvas.width = fgCanvas.width = innerHeight - 2 * CANVAS_BORDER_THICKNESS;
  }
  // if (innerWidth < innerHeight) {
  //   bgCanvas.width =
  //     fgCanvas.width =
  //     bgCanvas.height =
  //     fgCanvas.height =
  //       innerWidth;
  // } else {
  //   bgCanvas.width =
  //     fgCanvas.width =
  //     bgCanvas.height =
  //     fgCanvas.height =
  //       innerHeight;
  // }
  // bgCanvas.style.left = fgCanvas.style.left =
  //   innerWidth - bgCanvas.width - 2 * CANVAS_BORDER_THICKNESS + "px";
  // bgCanvas.style.top =
  //   fgCanvas.style.top =
  //   sideBar.style.top =
  //     (innerHeight - bgCanvas.height) / 2 - CANVAS_BORDER_THICKNESS + "px";
  // sideBar.style.width =
  //   innerWidth - bgCanvas.width - 2 * CANVAS_BORDER_THICKNESS + "px";
  // sideBar.style.height = bgCanvas.height + 2 * CANVAS_BORDER_THICKNESS + "px";
  drawBG();
}

export function init() {
  onresize = resize;
  resize();
}

export function run() {
  drawFG();
}

export default {
  bgCanvas,
  bgContext,
  fgCanvas,
  fgContext,
  drawBG,
  init,
  run,
};
