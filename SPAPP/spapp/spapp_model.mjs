import { FIELD_SIZE } from "../model/config.mjs";
import Pure_pursuit_controller from "../model/pure_pursuit.mjs";
import Robot_path from "../model/robot_path.mjs";
import Robot from "../model/sprite/robot.mjs";

const ROBOT_SIZE = 15;

export default class Spapp_model {
  constructor({ parent }) {
    console.log("Spapp_model()");
    this.parent = parent;
    this.field_view_size = FIELD_SIZE;
    this.path = new Robot_path(this.parent);
    this.current_motion_index = -1;
    this.robot = new Robot(
      this.parent,
      FIELD_SIZE / 2,
      FIELD_SIZE / 2,
      0,
      ROBOT_SIZE,
      ROBOT_SIZE,
      15
    );
    this.robot_controller = new Pure_pursuit_controller(
      this.parent,
      this.robot,
      this.path
    );
  }
  animate(time_change) {
    this.robot.update(time_change);
    this.robot_controller.update();
  }

  // Controller interfacing functions
  add_data_point(point, motion_index) {
    this.path.motions[motion_index].path_points.push(point);
  }
  change_motion_by_index(motion_index, id, value) {
    this.path.motions[motion_index][id] = value;
  }
  delete_motion_by_index(index) {
    this.path.motions.splice(index, 1);
  }
  change_data_point(point, { x, y, /*is_fwd, is_stop*/ }) {
    if (x) point.x = x;
    if (y) point.y = y;
    // if (is_fwd) point.is_fwd = is_fwd;
    // if (is_stop) point.is_stop = is_stop;
  }
  change_data_point_by_index(motion_index, index, id, value) {
    this.path.motions[motion_index].path_points[index][id] = value;
  }
  delete_data_point_by_index(motion_index, index) {
    this.path.motions[motion_index].path_points.splice(index, 1);
  }
  reset_robot() {
    if (!this.path.motions.length) return;
    if (this.path.motions[0].path_points.length < 2) return;
    this.robot.pos.x = this.path.motions[0].path_points[0].x;
    this.robot.pos.y = this.path.motions[0].path_points[0].y;
    this.robot.vel.l = 0;
    this.robot.vel.r = 0;
    this.robot.angle = -Math.atan2(
      this.path.motions[0].path_points[0].y - this.path.motions[0].path_points[1].y,
      this.path.motions[0].path_points[1].x - this.path.motions[0].path_points[0].x
    );
    if (!this.path.motions[0].is_fwd) this.robot.angle += Math.PI;
    this.robot.track = [];
    this.robot_controller.is_running = false;
    this.robot_controller.last_found_index = 0;
    this.parent.is_running = false;
    this.robot.isTrackingPosition = false;
    this.current_motion_index = -1;
    this.parent.model.robot_controller.at_end = true;
  }

  // conversion utilities

  // TODO: sanity check for canvas existence
  convert_to_model_coords(x, y) {
    let canvas = this.parent.view.components.graphics.top_canvas.canvas;
    return {
      x:
        (x * this.field_view_size) / canvas.width -
        (this.field_view_size - FIELD_SIZE) / 2,
      y:
        ((canvas.width - y) * this.field_view_size) / canvas.width -
        (this.field_view_size - FIELD_SIZE) / 2,
    };
  }
  convert_point_to_model_coords(p) {
    let canvas = this.parent.view.components.graphics.top_canvas.canvas;
    return {
      x:
        (p.x * this.field_view_size) / canvas.width -
        (this.field_view_size - FIELD_SIZE) / 2,
      y:
        ((canvas.width - p.y) * this.field_view_size) / canvas.width -
        (this.field_view_size - FIELD_SIZE) / 2,
    };
  }
  convert_to_canvas_coords(x, y) {
    let canvas = this.parent.view.components.graphics.top_canvas.canvas;
    return {
      x:
        (((this.field_view_size - FIELD_SIZE) / 2 + x) * canvas.width) /
        this.field_view_size,
      y:
        (((this.field_view_size - FIELD_SIZE) / 2 + (FIELD_SIZE - y)) *
          canvas.width) /
        this.field_view_size,
    };
    // interchangeable bgCanvas or fgCanvas, width or height
  }
  convert_point_to_canvas_coords(p) {
    let canvas = this.parent.view.components.graphics.top_canvas.canvas;
    return {
      x:
        (((this.field_view_size - FIELD_SIZE) / 2 + p.x) * canvas.width) /
        this.field_view_size,
      y:
        (((this.field_view_size - FIELD_SIZE) / 2 + (FIELD_SIZE - p.y)) *
          canvas.width) /
        this.field_view_size,
    };
    // interchangeable bgCanvas or fgCanvas, width or height
  }
  convert_dims_to_canvas(d) {
    return {
      x:
        (d.x / this.field_view_size) *
        this.parent.view.components.graphics.bottom_canvas.canvas.width,
      y:
        (d.y / this.field_view_size) *
        this.parent.view.components.graphics.bottom_canvas.canvas.width,
    };
  }
}
