import Path_point from "../model/path_point.mjs";

export default class Spapp_controller {
  constructor({ parent }) {
    console.log("Spapp_controller()");
    this.parent = parent;
    this.view_components = this.parent.view.components;

    this.view_components.menu.button_random_mixed.button.addEventListener(
      "click",
      () =>
        this.add_data_point(
          new Path_point({
            x: Math.floor(1000 * Math.random()) / 100,
            y: Math.floor(1000 * Math.random()) / 100,
            is_fwd: true,
            is_stop: false,
          })
        )
    );
  }
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
  change_data_point() {}
}
