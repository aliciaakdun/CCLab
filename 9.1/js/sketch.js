let particles = [];
let num = 100;

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");


  for (let i = 0; i < num; i++) {
    let x = random(width);
    let y = random(height);
    let rad = random(10, 30);
    particles.push(new Particle(x, y, rad))
  }
}

function draw() {
  background(220);
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.reappear();
    p.display();
  }
}

class Particle {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.xSpeed = random(-0.1, 0.1);
    this.ySpeed = random(-5, -1);
  }
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  reappear() {
    if (this.x > width) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = width;
    }
    if (this.y > height) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = height;
    }
  }
  display() {
    push();
    circle(this.x, this.y, this.rad);
    pop();
  }
}