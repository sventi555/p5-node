const Vec2 = require('vec2');

const attractionForce = 0.001;
const repulsionForce = 0.003;
const repulsionRadius = 15;

class Point {
  constructor(p5, pos, neighbours) {
    this.p5 = p5;
    this.pos = pos;
    this.vel = Vec2(0, 0);
    this.neighbours = neighbours;
  }

  get minX() {
    return this.pos.x;
  }

  get maxX() {
    return this.pos.x;
  }

  get minY() {
    return this.pos.y;
  }

  get maxY() {
    return this.pos.y;
  }

  attract() {
    if (this.neighbours.length > 0) {
      const attraction = Vec2(0, 0);
      for (const n of this.neighbours) {
        attraction.add(n.pos.subtract(this.pos, true));
      }
      attraction.multiply(attractionForce);
      this.vel.add(attraction);
    }
  }

  repel(tree) {
    if (this.neighbours.length > 0) {
      const near = tree.search({
        minX: this.pos.x - repulsionRadius,
        minY: this.pos.y - repulsionRadius,
        maxX: this.pos.x + repulsionRadius,
        maxY: this.pos.y + repulsionRadius
      });

      const repulsion = Vec2(0, 0);
      for (const n of near) {
        let r = this.pos.subtract(n.pos, true);
        r = r.normalize(true).multiply(-1 * r.length() + repulsionRadius, true);
        repulsion.add(r);
      }
      repulsion.multiply(repulsionForce);
      this.vel.add(repulsion);
    }
  }

  update() {
    this.pos.add(this.vel);
    this.vel = Vec2(0, 0);
  }

  split(oldPoint, newPoint) {
    for (let i = 0; i < this.neighbours.length; i++) {
      if (this.neighbours[i] === oldPoint) {
        this.neighbours[i] = newPoint;
        break;
      }
    }
  }
}

module.exports = Point;
