const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
  };

  p.draw = () => {
    p.background(255);
  };
};

// eslint-disable-next-line no-undef
new p5(sketch);
