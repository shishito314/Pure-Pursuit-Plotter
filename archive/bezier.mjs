const DRAW_STEP = 0.01;

export default class Bezier {
  constructor(p1, p2, p3, p4) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.p4 = p4;
  }

  drawControlPoints() {
    this.con.beginPath();
    let p1c = model.convertToCanvasCoords(this.p1);
    this.con.arc(p1c.x, p1c.y, 5, 0, 2 * Math.PI);
    let p2c = model.convertToCanvasCoords(this.p2);
    this.con.arc(p2c.x, p2c.y, 5, 0, 2 * Math.PI);
    let p3c = model.convertToCanvasCoords(this.p3);
    this.con.arc(p3c.x, p3c.y, 5, 0, 2 * Math.PI);
    let p4c = model.convertToCanvasCoords(this.p4);
    this.con.arc(p4c.x, p4c.y, 5, 0, 2 * Math.PI);
    this.con.fill();
  }

  draw() {
    this.con.beginPath();
    let start = model.convertToCanvasCoords(this.p1);
    this.con.moveTo(start.x, start.y);
    for (let i = 0; i < 1; i += DRAW_STEP) {
      let p = model.convertToCanvasCoords(this.getBezierPoint(i));
      this.con.lineTo(p.x, p.y);
    }
    this.con.stroke();
  }

  getBezierPoint(val) {
    let p5 = lerp(this.p1, this.p2, val);
    let p6 = lerp(this.p2, this.p3, val);
    let p7 = lerp(this.p3, this.p4, val);
    let p8 = lerp(p5, p6, val);
    let p9 = lerp(p6, p7, val);
    return lerp(p8, p9, val);
  }
}

function lerp(p1, p2, val) {
  return { x: p1.x + val * (p2.x - p1.x), y: p1.y + val * (p2.y - p1.y) };
}

// getBezierPoint(p1, p2, p3, p4, val) {
//   let p5 = this.lerp(p1, p2, val);
//   let p6 = this.lerp(p2, p3, val);
//   let p7 = this.lerp(p3, p4, val);
//   let p8 = this.lerp(p5, p6, val);
//   let p9 = this.lerp(p6, p7, val);
//   return this.lerp(p8, p9, val);
// }
