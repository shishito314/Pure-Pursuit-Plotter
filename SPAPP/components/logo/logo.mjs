import create_element from "/utilities/methods/create_element.mjs";
import load_image from "/utilities/methods/load_image.mjs";
export default class Logo {
  constructor({ parent, path_to_image, styles }) {
    console.log("Logo()");
    this.parent = parent;
    this.image = load_image({ path_to_image }).then((image) => {
      create_element({
        preexisting: image,
        parent: this.parent,
        styles,
      });
    });
  }
}
