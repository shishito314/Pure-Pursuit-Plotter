export default class Robot_motion {
    constructor(spapp, is_fwd, is_stop) {
      this.spapp = spapp;
      this.path_points = [];
      this.is_fwd = is_fwd;
      this.is_stop = is_stop;
      this.motion_type = "standard";
    }
    draw(context) {
      if (this.path_points.length) {
        context.beginPath();
        let start = this.spapp.model.convert_point_to_canvas_coords(
          this.path_points[0]
        );
        context.moveTo(start.x, start.y);
        for (let point of this.path_points) {
          let p = this.spapp.model.convert_point_to_canvas_coords(point);
          context.lineTo(p.x, p.y);
        }
        context.strokeStyle = this.is_fwd? "darkGreen" : "darkred";
        context.shadowColor = "#ffffff";
        context.shadowBlur = 10;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.lineWidth = 3;
        context.stroke();
        context.lineWidth = 1;
        for (let point of this.path_points) {
          let p = this.spapp.model.convert_point_to_canvas_coords(point);
          context.beginPath();
          context.arc(p.x, p.y, 5, 0, 2 * Math.PI);
          context.fillStyle = "white";//point.is_stop ? "red" : "white";
          context.strokeStyle = "black";//point.is_fwd ? "black" : "yellow";
          context.lineWidth = 2;
          context.fill();
          context.stroke();
          context.fillStyle = "black";
          context.strokeStyle = "black";
        }
      }
    }
  }
  