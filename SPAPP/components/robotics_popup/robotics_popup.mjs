import create_element from "../../utilities/methods/create_element.mjs";

export default class Robotics_popup {
  constructor(/* {TODO} */) {
    // this.parent = parent;
    this.container = create_element({
      type: "div",
      styles: {
        position: "fixed",
        "background-color": "rgba(0, 0, 0, 0.5)",
        display: "none",
        width: "100%",
        height: "100%",
        left: "0",
        top: "0"
      },
      parent: document.body,
    });
    this.popup = create_element({
      type: "div",
      styles: {
        position: "fixed",
        "background-color": "rgb(19, 88, 156)",
        width: "400px",
        height: "300px",
        left: "calc(100% / 2 - 200px)",
        top: "calc(100% / 2 - 150px)"
      },
      parent: this.container,
    });
    
  }
}
