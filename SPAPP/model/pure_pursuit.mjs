import { angle_range_pn_pi, angle_range_zero_to_two_pi, boundedCircleLineIntersect, dist } from "../utilities/methods/math.mjs";

export const LOOK_AHEAD_RAD = 8; // total guess
const kPLinear = 0.020625 * Math.PI / LOOK_AHEAD_RAD;
const kPAngle = 1.5 / LOOK_AHEAD_RAD;
const STOP_TOLERANCE = 0.5;

export default class Pure_pursuit_controller {
  constructor(spapp, robot) {
    this.spapp = spapp;
    this.log_point; // for debugging and visualizing
    this.robot = robot;
    // this.path = path;
    this.look_ahead_rad = LOOK_AHEAD_RAD;
    this.last_found_index = 0;
    this.is_running = false;
    this.is_fwd = true;
    this.at_end = true;
  }

  choose_goal_point() {
    const motion = this.spapp.model.path.motions[this.spapp.model.current_motion_index];
    for (
      let i = this.last_found_index;
      i < motion.path_points.length - 1;
      ++i
    ) {
      let p1 = motion.path_points[i];
      let p2 = motion.path_points[i + 1];
      let ints = boundedCircleLineIntersect(
        p1,
        p2,
        this.robot.pos,
        this.look_ahead_rad
      );
      // console.log(ints);
      for (const int of ints) {
        if (!int.x) continue;
        if (
          dist(int, motion.path_points[i + 1]) <
          dist(this.robot.pos, motion.path_points[i + 1])
        ) {
          this.last_found_index = i;
          this.is_fwd = motion.is_fwd;
          // console.log(int);
          return int;
        }
      }
    }
    this.is_fwd = motion.is_fwd;
    return motion.path_points[this.last_found_index + 1];
  }

  update() {
    if (!this.is_running) return;
    if (!this.spapp.model.path.motions.length) return;
    if (this.spapp.model.current_motion_index >= this.spapp.model.path.motions.length) return;
    if (!this.spapp.model.path.motions[this.spapp.model.current_motion_index].path_points.length) return;
    let goal_point = this.choose_goal_point();
    const motion = this.spapp.model.path.motions[this.spapp.model.current_motion_index];
    if (
      goal_point == motion.path_points[motion.path_points.length - 1] &&
      dist(this.robot.pos, goal_point) < STOP_TOLERANCE
    ) {
      this.at_end = true;
    }
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
    if (this.at_end) {
      this.is_running = false;
      this.robot.vel.l = 0;
      this.robot.vel.r = 0;
    }
  }

  do_next_motion() {
    this.is_running = true;
    this.last_found_index = 0;
    ++this.spapp.model.current_motion_index;
    this.at_end = false;
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
