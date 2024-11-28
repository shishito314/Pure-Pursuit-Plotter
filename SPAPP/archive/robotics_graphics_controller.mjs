export default class Robotics_graphics_controller {
  constructor({ parent_controller }) {
    console.log("Spapp_controller()");
    this.parent_controller = parent_controller;
    this.view_components = this.parent_controller.parent.view.components;

    this.mouseIsDown = false;

    this.view_components.graphics.top_canvas.canvas.addEventListener(
      "mousedown",
      this.handleGraphicsMD.bind(this)
    );
    this.view_components.graphics.top_canvas.canvas.addEventListener(
      "mousemove",
      this.handleGraphicsMM.bind(this)
    );
    this.view_components.graphics.top_canvas.canvas.addEventListener(
      "mouseup",
      this.handleGraphicsMU.bind(this)
    );
  }
  handleGraphicsMD(e) {
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
  handleGraphicsMM(e) {}
  handleGraphicsMU(e) {}
}
