import model from "./model/model.mjs";
import view from "./view/view.mjs";
import controller from "./controller/controller.mjs";

view.init();
requestAnimationFrame(animate);

function animate(timeNow) {
  let timePrior = timeNow;
  requestAnimationFrame(_animate);

  function _animate(timeNow) {
    model.run(timeNow - timePrior);
    view.run();
    timePrior = timeNow;
    requestAnimationFrame(_animate);
  }
}
