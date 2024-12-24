import { FIELD_SIZE } from "../model/config.mjs";
import Path_point from "../model/path_point.mjs";
import { dist } from "../utilities/methods/math.mjs";
import observe_resizing from "../utilities/methods/observe_resizing.mjs";

const MOVE_THRESHOLD = 2;

export default class Spapp_controller {
  constructor({ parent }) {
    console.log("Spapp_controller()");
    this.parent = parent;
    this.view_components = this.parent.view.components;

    // Resize
    this.resize_observer = observe_resizing({
      parent: this.view_components.graphics.container,
      callback: this.handle_resize.bind(this),
    });

    // Menu Buttons
    // this.view_components.menu.button_random_mixed.button.addEventListener(
    //   "click",
    //   this.add_random_data_point.bind(this)
    // );
    this.view_components.menu.buttom_play_mixed.button.addEventListener("click", this.start.bind(this));
    this.view_components.menu.buttom_pause_mixed.button.addEventListener("click", this.pause.bind(this));
    this.view_components.menu.buttom_stop_mixed.button.addEventListener("click", this.reset.bind(this));
    // this.view_components.menu.buttom_import_mixed.button.addEventListener("click", this.import.bind(this));
    // this.view_components.menu.buttom_export_mixed.button.addEventListener("click", this.export.bind(this));

    // Graphics Mouse Controls
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
    this.view_components.graphics.top_canvas.canvas.addEventListener(
      "mousewheel",
      this.handle_graphics_MW.bind(this)
    );
    this.mouse_is_down = false;
    this.moving_point;

    // Keyboard
    document.addEventListener("keydown", this.handleKD.bind(this));
    document.addEventListener("keyup", this.handleKU.bind(this));
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
    for (const p of this.parent.model.path.path_points) {
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
    let loc = this.parent.model.convert_to_model_coords(e.offsetX, e.offsetY);
    this.view_components.footer.update(loc);
    if (!this.mouse_is_down) return;
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
  handle_graphics_MW(e) {
    // console.log(e);
    this.parent.model.field_view_size += 0.1 * e.wheelDelta;
    if (this.parent.model.field_view_size < FIELD_SIZE) {
      this.parent.model.field_view_size = FIELD_SIZE;
    }
    this.view_components.graphics.update();
    // TODO: resize background
  }

  handleKD(e) {
    switch (e.code) {
      case "KeyR":
        this.reset();
        break;
      case "KeyE":
        if (!this.parent.is_running) this.start();
        else this.pause();
        break;
      // todo: control z
    }
  }
  handleKU(e) {
    // TODO: control z/y
  }

  handle_resize(e) {
    this.view_components.graphics.update();
  }

  handle_data_component_change(data_point_index, id, value) {
    this.parent.model.change_data_point_by_index(data_point_index, id, value);
    this.view_components.graphics.update();
    this.view_components.code.update();
  }
  handle_data_component_delete(data_point_index) {
    this.parent.model.delete_data_point_by_index(data_point_index);
    this.view_components.data.update();
    this.view_components.graphics.update();
    this.view_components.code.update();
  }

  // Model Interfacing Functions
  pause() {
    this.parent.model.robot_controller.is_running = false;
    this.parent.is_running = false;
  }
  // play() {}
  reset() {
    this.parent.model.reset_robot();
    this.view_components.graphics.update();
    this.view_components.data.unshow_overlay();
  }
  start() {
    if (!this.parent.is_running) {
      this.parent.is_running = true;
      requestAnimationFrame(this.parent.animate.bind(this.parent));
      this.parent.model.robot.isTrackingPosition = true;
      // Lock out side panel
      this.view_components.data.show_overlay();
    }
    this.parent.model.robot_controller.go_to_next_stop();
  }
  add_data_point(point) {
    this.parent.model.add_data_point(point);
    this.view_components.graphics.update();
    this.view_components.data.update();
    this.view_components.code.update();
  }
  delete_data_point() {}
  insert_data_point() {}
  move_data_point() {}
  change_data_point(point, new_props) {
    this.parent.model.change_data_point(point, new_props);
    this.view_components.graphics.update();
    this.view_components.data.update();
    this.view_components.code.update();
  }

  // Animation functions
}
