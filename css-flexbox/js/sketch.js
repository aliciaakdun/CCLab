function setup() {
  let canvas = createCanvas(800, 200);
  canvas.parent("p5-canvas-container");
  background(255);
}

function draw() {
  background(255, 0.8);
  circle(mouseX, mouseY, 20);
}