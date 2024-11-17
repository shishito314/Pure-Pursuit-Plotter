const styles = "app/app.css";

export default class AppView {
  constructor(parent) {
    console.log("AppView");
    this.parent = parent;

    this.container = document.createElement("div");
    this.container.classList.add("app");

    this.dataPanel = document.createElement("div");
    this.dataPanel.classList.add("dataPanel");
    this.container.appendChild(this.dataPanel);

    this.test = document.createElement("canvas");
    this.test.width = 200;
    this.test.height = 300;
    this.dataPanel.appendChild(this.test);

    this.graphicPanel = document.createElement("div");
    this.graphicPanel.classList.add("graphicPanel");
    this.container.appendChild(this.graphicPanel);

    this.outputPanel = document.createElement("div");
    this.outputPanel.classList.add("outputPanel");
    this.container.appendChild(this.outputPanel);

    document.body.appendChild(this.container);

    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = styles;
    document.head.appendChild(cssLink);
  }
}
