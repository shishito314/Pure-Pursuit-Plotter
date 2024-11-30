export function lerp(p1, p2, val) {
  return { x: p1.x + val * (p2.x - p1.x), y: p1.y + val * (p2.y - p1.y) };
}

export function dist(p1, p2) {
  return Math.sqrt(
    (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y)
  );
}

export function angleRangeZeroToTwoPi(angle) {
  // there's probably a better way to do this
  return angle - Math.floor(angle / 2 / Math.PI) * 2 * Math.PI;
}

export function angleRangePNPi(angle) {
  // there's probably a better way to do this
  return angle - Math.floor((angle + Math.PI) / (2 * Math.PI)) * (2 * Math.PI);
}

export function getBezierPoint(p1, p2, p3, p4, val) {
  let p5 = this.lerp(p1, p2, val);
  let p6 = this.lerp(p2, p3, val);
  let p7 = this.lerp(p3, p4, val);
  let p8 = this.lerp(p5, p6, val);
  let p9 = this.lerp(p6, p7, val);
  return this.lerp(p8, p9, val);
}

export function circleLineIntersect(p1, p2, pc, r) {
  // TODO: change if vertical line
  let slope = (p2.y - p1.y) / (p2.x - p1.x);
  let a = slope * slope + 1;
  let b = -(
    2 * slope * slope * p1.x +
    2 * slope * pc.y -
    2 * slope * p1.y +
    2 * pc.x
  );
  let c =
    slope * slope * p1.x * p1.x +
    p1.y * p1.y +
    pc.y * pc.y -
    2 * slope * p1.y * p1.x +
    2 * slope * pc.y * p1.x -
    2 * p1.y * pc.y +
    pc.x * pc.x -
    r * r;
  let xInts = solveQuadratic(a, b, c);
  let yInts = [
    slope * (xInts[0] - p1.x) + p1.y,
    slope * (xInts[1] - p1.x) + p1.y,
  ];
  return [
    { x: xInts[0], y: yInts[0] },
    { x: xInts[1], y: yInts[1] },
  ];
}

export function boundedCircleLineIntersect(p1, p2, pc, r) {
  // TODO: vertical line case
  let intersects = circleLineIntersect(p1, p2, pc, r);
  let result = [];
  let greaterX = Math.max(p1.x, p2.x);
  let lesserX = Math.min(p1.x, p2.x);
  if (
    intersects[0].x &&
    intersects[0].x > lesserX &&
    intersects[0].x < greaterX
  ) {
    result.push(intersects[0]);
  }
  if (
    intersects[1].x &&
    intersects[1].x > lesserX &&
    intersects[1].x < greaterX
  ) {
    result.push(intersects[1]);
  }
  return result;
}

export function solveQuadratic(a, b, c) {
  return [
    (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a),
    (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a),
  ];
}

export default {
  lerp,
  dist,
  angleRangeZeroToTwoPi,
  angleRangePNPi,
  getBezierPoint,
  circleLineIntersect,
  boundedCircleLineIntersect,
};
