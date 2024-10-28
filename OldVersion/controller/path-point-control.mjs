import model from "../model/model.mjs";
import controller from "./controller.mjs";

export default class PathPointControl {
  constructor(pathPoint, index) {
    this.pathPoint = pathPoint;
    this.index = index;

    // HTML Setup
    this.controlBlock = document.createElement("div");
    this.controlBlock.className = "controlPointBlock";
    document.getElementById("pointControlContainer").appendChild(this.controlBlock);
    let xInputBox = document.createElement("span");
    xInputBox.className = "controlPointInputBox";
    let xInputLabel = document.createElement("label");
    xInputLabel.className = "controlPointLabel";
    xInputLabel.innerHTML = "x:";
    this.xInput = document.createElement("input");
    this.xInput.className = "numInput";
    this.xInput.type = "number";
    this.xInput.value = this.pathPoint.x;
    xInputBox.appendChild(xInputLabel);
    xInputBox.appendChild(this.xInput);
    this.controlBlock.appendChild(xInputBox);
    let yInputBox = document.createElement("span");
    yInputBox.className = "controlPointInputBox";
    let yInputLabel = document.createElement("label");
    yInputLabel.className = "controlPointLabel";
    yInputLabel.innerHTML = "y:";
    this.yInput = document.createElement("input");
    this.yInput.className = "numInput";
    this.yInput.type = "number";
    this.yInput.value = this.pathPoint.y;
    yInputBox.appendChild(yInputLabel);
    yInputBox.appendChild(this.yInput);
    this.controlBlock.appendChild(yInputBox);
    let isFwdBox = document.createElement("span");
    isFwdBox.className = "controlPointInputBox";
    let isFwdLabel = document.createElement("label");
    isFwdLabel.className = "controlPointLabel";
    isFwdLabel.innerHTML = "Fwd:";
    this.isFwdButton = document.createElement("input");
    this.isFwdButton.className = "checkInput";
    this.isFwdButton.type = "checkbox";
    if (this.pathPoint.isFwd) this.isFwdButton.checked = "true";
    isFwdBox.appendChild(isFwdLabel);
    isFwdBox.appendChild(this.isFwdButton);
    this.controlBlock.appendChild(isFwdBox);
    let isStopBox = document.createElement("span");
    isStopBox.className = "controlPointInputBox";
    let isStopLabel = document.createElement("label");
    isStopLabel.className = "controlPointLabel";
    isStopLabel.innerHTML = "Stop:";
    this.isStopButton = document.createElement("input");
    this.isStopButton.className = "checkInput";
    this.isStopButton.type = "checkbox";
    if (this.pathPoint.isStop) this.isStopButton.checked = "true";
    isStopBox.appendChild(isStopLabel);
    isStopBox.appendChild(this.isStopButton);
    this.controlBlock.appendChild(isStopBox);
    this.deleteButton = document.createElement("button");
    this.deleteButton.className = "deleteButton";
    this.deleteButton.innerHTML = "X";
    this.controlBlock.appendChild(this.deleteButton);
    // End HTML Setup

    this.xInput.addEventListener("change", this.changeX.bind(this));
    this.yInput.addEventListener("change", this.changeY.bind(this));
    this.isFwdButton.addEventListener("click", this.changeFwd.bind(this));
    this.isStopButton.addEventListener("click", this.changeStop.bind(this));
    this.deleteButton.addEventListener("click", this.deletePoint.bind(this));
    // FOR DRAG AND DROP
    // this.controlBlock.addEventListener("mousedown", () => {
    //   this.controlBlock.style.position = "relative";
    //   this.controlBlock.addEventListener("mousemove", this.changeOrder.bind(this));
    // });
    // this.controlBlock.addEventListener("mouseup", () => {
    //   this.controlBlock.style.position = "static";
    //   this.controlBlock.removeEventListener("mousemove", this.changeOrder.bind(this));
    // });
  }
  changeX() {
    this.pathPoint.x = Number(this.xInput.value);
  }
  changeY() {
    this.pathPoint.y = Number(this.yInput.value);
  }
  changeFwd() {
    this.pathPoint.isFwd = this.isFwdButton.checked;
  }
  changeStop() {
    this.pathPoint.isStop = this.isStopButton.checked;
  }
  deletePoint() {
    model.path.pathPoints.splice(this.index, 1);
    console.log(controller.pointControls);
    controller.removePointControl(this.index);
    // controller.pointControls.splice(this.index, 1);
    console.log(controller.pointControls);
    console.log(this.index);
    for (let i = this.index; i < controller.pointControls.length; ++i) {
      --(controller.pointControls[i].index);
    }
    this.controlBlock.remove();
    delete this;
  }
  // FOR DRAG AND DROP
  // changeOrder() {
  //   this.controlBlock.style.translate = ""
  // }
}