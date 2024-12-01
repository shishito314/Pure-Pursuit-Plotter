
export default class Robot_path {
  constructor(spapp) {
    this.spapp = spapp;
    this.path_points = [];
  }
  draw(context) {
    if (this.path_points.length) {
      context.beginPath();
      let start = this.spapp.model.convert_point_to_canvas_coords(
        this.path_points[0]
      );
      context.moveTo(start.x, start.y);
      for (let point of this.path_points) {
        let p = this.spapp.model.convert_point_to_canvas_coords(point);
        context.lineTo(p.x, p.y);
      }
      context.strokeStyle = "darkGreen";
      context.lineWidth = 3;
      context.stroke();
      context.strokeStyle = "black";
      context.lineWidth = 1;
      for (let point of this.path_points) {
        let p = this.spapp.model.convert_point_to_canvas_coords(point);
        context.beginPath();
        context.arc(p.x, p.y, 5, 0, 2 * Math.PI);
        context.fillStyle = "white";
        context.fill();
        context.fillStyle = "black";
      }
    }
  }

//   getCppCode() {
//     let codeStr = "const PathPoint path[] = {<br>"
//     // console.log(this.pathPoints);
//     for (const i in this.pathPoints) {
//       const p = this.pathPoints[i];
//       // console.log(p);
//       codeStr += "&emsp;PathPoint("
//       codeStr += p.x + ", ";
//       codeStr += p.y + ", ";
//       codeStr += p.isFwd + ", ";
//       codeStr += p.isStop + "),<br>";
//     }
//     codeStr += "};<br><br>";
//     codeStr += "constexpr size_t numPathPoints{" + this.pathPoints.length + "};"

//     return codeStr;
//   }
}
