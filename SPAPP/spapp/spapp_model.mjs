export default class Spapp_model {
  constructor({ parent }) {
    console.log("Spapp_model()");
    this.parent = parent;
    this.path = [];
  }
  add_data_point(point) {
    this.path.push(point);
  }
}
