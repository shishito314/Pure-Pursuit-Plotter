import Path_point from "../model/path_point.mjs";
import { dist } from "../utilities/methods/math.mjs";
import observe_resizing from "../utilities/methods/observe_resizing.mjs";

const MOVE_THRESHOLD = 2;

export default class Spapp_controller {
  constructor({ parent }) {
    console.log("Spapp_controller()");
    this.parent = parent;
    this.view_components = this.parent.view.components;

    this.resize_observer = observe_resizing({
      parent: this.view_components.graphics.container,
      callback: this.handle_resize.bind(this),
    });

    this.view_components.menu.button_random_mixed.button.addEventListener(
      "click",
      this.add_random_data_point.bind(this)
    );

    this.view_components.graphics.top_canvas.canvas.addEventListener(
      "mousedown",
      this.handle_graphics_MD.bind(this)
    );
    this.view_components.graphics.top_canvas.canvas.addEventListener(
      "mouseup",
      this.handle_graphics_MU.bind(this)
    );
    this.view_components.graphics.top_canvas.canvas.addEventListener(
      "mousemove",
      this.handle_graphics_MM.bind(this)
    );
    this.mouse_is_down = false;
    this.moving_point;
  }
  // Event Handling Functions
  // NOTE: These might cause regenerations more than necessary by calling
  // the Model Interfacing Functions
  add_random_data_point() {
    this.add_data_point(
      new Path_point({
        x: Math.floor(1000 * Math.random()) / 100,
        y: Math.floor(1000 * Math.random()) / 100,
        is_fwd: true,
        is_stop: false,
      })
    );
  }
  handle_graphics_MD(e) {
    this.mouse_is_down = true;
    let loc = this.parent.model.convert_to_model_coords(e.offsetX, e.offsetY);
    loc.x = Math.round(loc.x * 100) / 100;
    loc.y = Math.round(loc.y * 100) / 100;
    let moving = false;
    for (const p of this.parent.model.path) {
      if (dist(p, loc) < MOVE_THRESHOLD) {
        // TODO: base off of canvas coordinates instead of model ones
        this.moving_point = p;
        moving = true;
        break;
      }
    }
    if (!moving) {
      this.add_data_point(
        new Path_point({ x: loc.x, y: loc.y, is_fwd: true, is_stop: false })
      );
    }
    // TODO: starting path logic
  }
  handle_graphics_MM(e) {
    if (!this.mouse_is_down) return;
    let loc = this.parent.model.convert_to_model_coords(e.offsetX, e.offsetY);
    loc.x = Math.round(loc.x * 100) / 100;
    loc.y = Math.round(loc.y * 100) / 100;
    if (this.moving_point) {
      this.change_data_point(this.moving_point, loc);
    }
    // TODO: starting path stuff
  }
  handle_graphics_MU(e) {
    this.moving_point = undefined;
    this.mouse_is_down = false;
  }

  handle_resize(e) {
    this.view_components.graphics.update();
  }
  // Model Interfacing Functions
  pause() {}
  play() {}
  start() {
    // TODO: lock out
  }
  add_data_point(point) {
    this.parent.model.add_data_point(point);
    this.view_components.graphics.update();
    this.view_components.data.update();
  }
  delete_data_point() {}
  insert_data_point() {}
  move_data_point() {}
  change_data_point(point, new_props) {
    this.parent.model.change_data_point(point, new_props);
    this.view_components.graphics.update();
    this.view_components.data.update();
  }
}
