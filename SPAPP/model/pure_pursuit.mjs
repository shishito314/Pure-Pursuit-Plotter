import { angle_range_pn_pi, angle_range_zero_to_two_pi, boundedCircleLineIntersect, dist } from "../utilities/methods/math.mjs";

export const LOOK_AHEAD_RAD = 6; // total guess
const kPLinear = 0.05 / LOOK_AHEAD_RAD;
const kPAngle = 1 / LOOK_AHEAD_RAD;
const STOP_TOLERANCE = 1;

export default class Pure_pursuit_controller {
  constructor(spapp, robot, path) {
    this.spapp = spapp;
    this.log_point; // for debugging and visualizing
    this.robot = robot;
    this.path = path;
    this.look_ahead_rad = LOOK_AHEAD_RAD;
    this.last_found_index = 0;
    this.is_running = false;
    this.is_fwd = true;
    this.at_stop_yet = false;
  }

  choose_goal_point() {
    for (
      let i = this.last_found_index;
      i < this.path.path_points.length - 1;
      ++i
    ) {
      let p1 = this.path.path_points[i];
      let p2 = this.path.path_points[i + 1];
      let ints = boundedCircleLineIntersect(
        p1,
        p2,
        this.robot.pos,
        this.look_ahead_rad
      );
      for (let int of ints) {
        if (!int.x) continue;
        // needed to check if (int.x)??
        // if (
        //   this.path.path_points[this.last_found_index].is_fwd !=
        //   this.path.path_points[this.last_found_index + 1].is_fwd
        // ) {
        // }
        if (i != this.last_found_index) {
          if (this.path.path_points[this.last_found_index + 1].is_stop) {
            if (
              dist(this.robot.pos, this.path.path_points[i]) >
              STOP_TOLERANCE
            ) {
              // edit - will go all the way back if a flip backwards point is missed
              return this.path.path_points[i];
            } else {
              this.at_stop_yet = true;
            }
          } else if (
            this.path.path_points[this.last_found_index].is_fwd !=
            this.path.path_points[this.last_found_index + 1].is_fwd
          ) {
            if (
              dist(this.robot.pos, this.path.path_points[i]) >
              STOP_TOLERANCE
            ) {
              // edit - will go all the way back if a flip backwards point is missed
              return this.path.path_points[i];
            }
          }
        }
        if (
          dist(int, this.path.path_points[i + 1]) <
          dist(this.robot.pos, this.path.path_points[i + 1])
        ) {
          this.last_found_index = i;
          this.is_fwd = this.path.path_points[this.last_found_index].is_fwd;
          return int;
        }
      }
    }
    this.is_fwd = this.path.path_points[this.last_found_index].is_fwd;
    return this.path.path_points[this.last_found_index + 1];
  }

  update() {
    if (!this.is_running) return;
    if (!this.path.path_points.length) return;
    let goal_point = this.choose_goal_point();
    this.log_point = goal_point;
    let angle_to_goal_point = Math.atan2(
      // 180 to -180
      goal_point.y - this.robot.pos.y,
      goal_point.x - this.robot.pos.x
    );
    let deltaAngle = angle_range_pn_pi(
      angle_range_zero_to_two_pi(angle_to_goal_point) -
      angle_range_zero_to_two_pi(
          this.is_fwd ? this.robot.angle : Math.PI + this.robot.angle
        )
    );
    let deltaDist = dist(goal_point, this.robot.pos);
    let linearVel = kPLinear * deltaDist * (this.is_fwd ? 1 : -1);
    let angleVel = kPAngle * deltaAngle;
    // if (Math.abs(deltaAngle) > Math.PI / 3) {
    //   linearVel = 0;
    // }

    this.robot.vel.l = linearVel - angleVel;
    this.robot.vel.r = linearVel + angleVel;
    if (this.at_stop_yet) {
      this.is_running = false;
      this.robot.vel.l = 0;
      this.robot.vel.r = 0;
    }
  }

  go_to_next_stop() {
    this.is_running = true;
    this.at_stop_yet = false;
  }

  draw(context) {
    let viewPos = this.spapp.model.convert_point_to_canvas_coords(this.robot.pos);
    context.beginPath();
    context.arc(
      viewPos.x,
      viewPos.y,
      this.spapp.model.convert_dims_to_canvas({x:this.look_ahead_rad, y:0}).x,
      0,
      2 * Math.PI
    );
    context.stroke();
    if (this.log_point) {
      let viewPoslog_point = this.spapp.model.convert_point_to_canvas_coords(this.log_point);
      context.beginPath();
      context.arc(viewPoslog_point.x, viewPoslog_point.y, 5, 0, 2 * Math.PI);
      context.fillStyle = "#00ffff";
      context.fill();
      context.fillStyle = "black";
    }
  }
}
