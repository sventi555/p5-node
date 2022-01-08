const sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
  };

  p5.draw = () => {
    p5.background(255);
  };
};

// eslint-disable-next-line no-undef
new p5(sketch);
