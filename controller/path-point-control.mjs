
export class PathPointControl {
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
        this.xInput.value = pathPoint.x;
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
        this.yInput.value = pathPoint.y;
        yInputBox.appendChild(yInputLabel);
        yInputBox.appendChild(this.yInput);
        controlBlock.appendChild(yInputBox);

        this.xInput.addEventListener("change", this.changeX.bind(this));
    }
    changeX() {
        console.log(this.pathPoint);
        this.pathPoint.x = this.xInput.value;
    }
}

export default {PathPointControl}