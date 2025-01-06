import create_element from "../../utilities/methods/create_element.mjs";

const pickerOpts = {
  types: [
    {
      description: "Text Files",
      accept: { "text/plain": [".h"] },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false,
};

export default class Robotics_popup {
  constructor({ spapp }) {
    this.spapp = spapp;
    this.container = create_element({
      type: "div",
      styles: {
        position: "fixed",
        "background-color": "rgba(0, 0, 0, 0.7)",
        display: "none",
        width: "100%",
        height: "100%",
        left: "0",
        top: "0",
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
        top: "calc(100% / 2 - 150px)",
      },
      parent: this.container,
    });

    // this.load_button = create_element({
    //   type: "button",
    //   parent: this.popup,
    // });
    // this.load_button.innerHTML = "load";
    this.save_button = create_element({
      type: "button",
      parent: this.popup,
    });
    this.save_button.innerHTML = "save";

    // this.fileHandle;
    // this.load_button.addEventListener("click", this.load_file.bind(this));
    this.save_button.addEventListener("click", async () => {
      let fileHandle;
      [fileHandle] = await window.showOpenFilePicker(pickerOpts);
      // if (!fileHandle) return;
      const writable = await fileHandle.createWritable();
      await writable.write(this.spapp.view.components.code.getCode());
      await writable.close();
    });
  }

  // async load_file() {
  //   [this.fileHandle] = await window.showOpenFilePicker(pickerOpts);
  //   const fileContent = await (await this.fileHandle.getFile()).text();
  //   textContent.value = fileContent;
  // }
}
