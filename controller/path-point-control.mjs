import model from "../model/model.mjs";

export default class PathPointControl {
  constructor(pathPoint) {
    this.pathPoint = pathPoint;

    // HTML Setup
    let controlBlock = document.createElement("div");
    controlBlock.className = "controlPointBlock";
    document.getElementById("pointControlContainer").appendChild(controlBlock);
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
    controlBlock.appendChild(xInputBox);
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
    controlBlock.appendChild(yInputBox);
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
    controlBlock.appendChild(isFwdBox);
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
    controlBlock.appendChild(isStopBox);
    this.deleteButton = document.createElement("button");
    this.deleteButton.className = "deleteButton";
    this.deleteButton.innerHTML = "X";
    controlBlock.appendChild(this.deleteButton);
    // End HTML Setup

    this.xInput.addEventListener("change", this.changeX.bind(this));
    this.yInput.addEventListener("change", this.changeY.bind(this));
  }
  changeX() {
    this.pathPoint.x = Number(this.xInput.value);
  }
  changeY() {
    this.pathPoint.y = Number(this.yInput.value);
  }
}
