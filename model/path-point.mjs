import utilities from "../utilities.mjs";

export class PathPoint {
  constructor(x, y, isFwd, isStop) {
    this.x = x;
    this.y = y;
    this.isFwd = isFwd; // line segment after
    this.isStop = isStop;
  }
  setLocation(newLocation) {
    this.x = newLocation.x;
    this.y = newLocation.y;
  }
}

export function makePathPoint(p, isFwd, isStop) {
  return new PathPoint(p.x, p.y, isFwd, isStop);
}

export default { PathPoint, makePathPoint };
