// import utilities from "../utilities.mjs";
// import view from "../view/view.mjs";

// export default class RobotPath {
//   constructor() {
//     this.can = view.fgCanvas;
//     this.con = view.fgContext;
//     this.pathPoints = [];
//   }
//   drawPathPoints() {
//     if (!this.pathPoints.length) return;
//     this.con.beginPath();
//     let start = utilities.convertPointToCanvasCoords(this.pathPoints[0]);
//     this.con.moveTo(start.x, start.y);
//     for (let point of this.pathPoints) {
//       let p = utilities.convertPointToCanvasCoords(point);
//       this.con.lineTo(p.x, p.y);
//     }
//     this.con.strokeStyle = "darkGreen";
//     this.con.lineWidth = 3;
//     this.con.stroke();
//     this.con.strokeStyle = "black";
//     this.con.lineWidth = 1;
//     for (let point of this.pathPoints) {
//       let p = utilities.convertPointToCanvasCoords(point);
//       this.con.beginPath();
//       this.con.arc(p.x, p.y, 5, 0, 2 * Math.PI);
//       this.con.fillStyle = "white";
//       this.con.fill();
//       this.con.fillStyle = "black";
//     }
//   }
//   draw() {
//     this.drawPathPoints();
//   }

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
// }
