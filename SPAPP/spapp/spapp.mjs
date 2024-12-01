import Spapp_controller from "./spapp_controller.mjs";
import Spapp_model from "./spapp_model.mjs";
import Spapp_view from "./spapp_view.mjs";

export default class Spapp {
  constructor() {
    this.model = new Spapp_model({ parent: this });
    this.view = new Spapp_view({ parent: this });
    this.controller = new Spapp_controller({ parent: this });
    this.is_running = false;
  }
  animate(timeNow) {
    let timePrior = timeNow;
    requestAnimationFrame(_animate.bind(this));

    function _animate(timeNow) {
      this.model.animate(timeNow - timePrior);
      this.view.animate();
      timePrior = timeNow;
      if (this.is_running)
        requestAnimationFrame(_animate.bind(this));
    }
  }
}
