import model from "../model/model.mjs";
import utilities from "../utilities.mjs";

// const TOTAL_ASPECT_RATIO = 4 / 3;
const CANVAS_BORDER_THICKNESS = 0;
const CANVAS_SIZE_RATIO = 0.96;

const bgCanvas = document.getElementById("bgCanvas");
const fgCanvas = document.getElementById("fgCanvas");
const bgContext = bgCanvas.getContext("2d");
const fgContext = fgCanvas.getContext("2d");
const sideBarLeft = document.getElementById("sideBarLeft");

const bgImg = document.getElementById("fieldImage");

function drawBG() {
  bgContext.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  bgContext.drawImage(
    bgImg,
    bgCanvas.width * ((1 - model.FIELD_SIZE / model.FIELD_VIEW_SIZE) / 2 - model.FIELD_BORDER_SIZE / model.FIELD_VIEW_SIZE),
    bgCanvas.width * ((1 - model.FIELD_SIZE / model.FIELD_VIEW_SIZE) / 2 - model.FIELD_BORDER_SIZE / model.FIELD_VIEW_SIZE),
    bgCanvas.width * (model.FIELD_SIZE / model.FIELD_VIEW_SIZE + model.FIELD_BORDER_SIZE / model.FIELD_VIEW_SIZE * 2),
    bgCanvas.width * (model.FIELD_SIZE / model.FIELD_VIEW_SIZE + model.FIELD_BORDER_SIZE / model.FIELD_VIEW_SIZE * 2)
  );
}

function drawFG() {
  fgContext.clearRect(0, 0, fgCanvas.width, fgCanvas.height);
  model.path.draw();
  model.robotController.draw();
  model.robot.draw();
  // for (let barrel of model.barrels) {
  //   barrel.draw();
  // }
}

function resize() {
  let eisel = document.getElementById("eisel").getBoundingClientRect();
  bgCanvas.width =
    fgCanvas.width =
    bgCanvas.height =
    fgCanvas.height =
      eisel.width * CANVAS_SIZE_RATIO - CANVAS_BORDER_THICKNESS * 2;

  // const aspectRatio = innerWidth / innerHeight;
  // if (aspectRatio < TOTAL_ASPECT_RATIO) {
  //   bgCanvas.width = fgCanvas.width =
  //     (innerWidth / TOTAL_ASPECT_RATIO) * CANVAS_SIZE_RATIO -
  //     2 * CANVAS_BORDER_THICKNESS;
  //   bgCanvas.height = fgCanvas.height =
  //     (innerWidth / TOTAL_ASPECT_RATIO) * CANVAS_SIZE_RATIO -
  //     2 * CANVAS_BORDER_THICKNESS;
  // } else {
  //   bgCanvas.height = fgCanvas.height =
  //     innerHeight * CANVAS_SIZE_RATIO - 2 * CANVAS_BORDER_THICKNESS;
  //   bgCanvas.width = fgCanvas.width =
  //     innerHeight * CANVAS_SIZE_RATIO - 2 * CANVAS_BORDER_THICKNESS;
  // }
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
  //   sideBarLeft.style.top =
  //     (innerHeight - bgCanvas.height) / 2 - CANVAS_BORDER_THICKNESS + "px";
  // sideBarLeft.style.width =
  //   innerWidth - bgCanvas.width - 2 * CANVAS_BORDER_THICKNESS + "px";
  // sideBarLeft.style.height = bgCanvas.height + 2 * CANVAS_BORDER_THICKNESS + "px";
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
