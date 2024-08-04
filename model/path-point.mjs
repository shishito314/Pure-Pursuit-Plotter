import Point from "./point.mjs";

export class PathPoint {
    constructor(location, isFwd, isStop) {
        this.pos = location;
        this.isFwd = isFwd; // line segment after
        this.isStop = isStop;
    }
}

export function makePathPoint(x, y, isFwd, isStop) {
    return new PathPoint(new Point(x,y), isFwd, isStop)
}

export default {PathPoint, makePathPoint}