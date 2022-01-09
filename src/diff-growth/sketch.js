const RBush = require('rbush');
const Vec2 = require('vec2');

const Point = require('./point');

const points = [];
const tree = new RBush();

const sketch = (p5) => {


  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    // p5.background(255);
    // p5.stroke(0, 0, 0, 50);
    p5.stroke(0);

    for (let i = 0; i < 100; i++) {
      const neighbours = [];

      if (i !== 0) {
        neighbours.push(points[i - 1]);
      }

      // const point = new Point(p5, Vec2(i * p5.width/40, p5.height/2 + p5.random(-20, 20)), neighbours);

      const point = new Point(
        p5,
        Vec2(
          200 * p5.cos(i * p5.TWO_PI/100) + p5.random(-1, 1),
          200 * p5.sin(i * p5.TWO_PI/100) + p5.random(-1, 1)
        ),
        neighbours
      );

      if (i !== 0) {
        points[i - 1].neighbours.push(point);
      }

      points.push(point);
    }
  };

  p5.draw = () => {
    p5.translate(p5.width/2, p5.height/2);
    p5.background(255);

    tree.clear();
    tree.load(points);

    // update velocities
    for (const point of points) {
      point.attract();
      point.repel(tree);
    }

    // update positions
    for (let i = points.length - 1; i >= 0; i--) {
      const point = points[i];
      point.update();

      for (const n of point.neighbours) {
        const d = n.pos.subtract(point.pos, true).length();

        if (d > 10) {
          const newPoint = new Point(p5, point.pos.lerp(n.pos, 0.5, true), [point, n]);
          point.split(n, newPoint);
          n.split(point, newPoint);
          points.push(newPoint);
        }
      }
    }

    // draw the paths
    for (let i = 0; i < points.length; i++) {
      const point = points[i];

      p5.strokeWeight(4);
      p5.line(point.pos.x, point.pos.y, point.pos.x, point.pos.y);

      p5.strokeWeight(1);
      for (const n of point.neighbours) {
        p5.line(point.pos.x, point.pos.y, n.pos.x, n.pos.y);
      }
    }
  };
};

// eslint-disable-next-line no-undef
new p5(sketch);
