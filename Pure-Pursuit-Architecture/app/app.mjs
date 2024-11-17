import AppController from "./app-controller.mjs";
import AppModel from "./app-model.mjs";
import AppView from "./app-view.mjs";

export default class App {
  constructor() {
    console.log("App");
    this.model = new AppModel(this);
    this.view = new AppView(this);
    this.controller = new AppController(this);
  }
}
