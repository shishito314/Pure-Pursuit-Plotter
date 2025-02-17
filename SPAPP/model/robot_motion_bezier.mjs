import Robot_motion from "./robot_motion.mjs";
import { get_bezier_point } from "../utilities/methods/math.mjs";

const POINT_STEP = 0.02;

export default class Robot_motion_bezier extends Robot_motion {
  constructor(spapp, is_fwd, is_stop) {
    super(spapp, is_fwd, is_stop);
    this.spapp = spapp;
    this.control_points = [];
    this.path_points = [];
    this.is_fwd = is_fwd;
    this.is_stop = is_stop;
    this.motion_type = "bezier";
  }
  draw(context) {
    this.generate_path_points(); // could do this somewhere else
    this.draw_control_points(context);
    this.draw_path_points(context);
  }
  draw_control_points(context) {
    for (let point of this.control_points) {
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
  draw_path_points(context) {
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
    }
  }

  generate_path_points() {
    this.path_points = [];
    if (this.control_points.length < 4) {
      return;
    }
    for (let i = 0; i + 3 < this.control_points.length; i += 3) {
      let pFirst = this.control_points[i];
      let pSecond = this.control_points[i + 1];
      let pThird = this.control_points[i + 2];
      let pFourth = this.control_points[i + 3];
      for (let i = 0; i < 1 / POINT_STEP; ++i) {
        // doing it this way to avoid rounding error
        this.path_points.push(
          get_bezier_point(
            pFirst,
            pSecond,
            pThird,
            pFourth,
            i * POINT_STEP
          )
        );
      }
    }
    this.path_points.push(this.control_points[this.control_points.length - 1]);
  }
}