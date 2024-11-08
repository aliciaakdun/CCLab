// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 60; // Decide the initial number of particles.

let particles = [];

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas-container");

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  background(0, 30, 70);

  // consider generating particles in draw(), using Dynamic Array

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
    p.checkBounds();
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = random(5, 10);
    this.brightness = random(150, 255);
    this.glowSpeed = random(1, 3);

    this.xSpeed = random(-1, 1);
    this.ySpeed = random(-1, 1);
  }


  // methods (functions): particle's behaviors
  update() {
    // calculate the distance between the mouse and the particle
    let mouseDist = dist(this.x, this.y, mouseX, mouseY);

    // normal particle movement
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // if the mouse is close, move the particle away from the mouse
    if (mouseDist < 50) {
      let repulsionStrength = map(mouseDist, 0, 50, 0.3, 0.6);
      let angle = atan2(this.y - mouseY, this.x - mouseX);

      this.xSpeed += cos(angle) * repulsionStrength;
      this.ySpeed += sin(angle) * repulsionStrength;
    }

    let speed = sqrt(this.xSpeed * this.xSpeed + this.ySpeed * this.ySpeed); // calculate current speed
    if (mouseDist > 50 && speed > 1.5) {  // Only apply friction if the particle is moving fast enough
      this.xSpeed *= 0.99;  // friction
      this.ySpeed *= 0.99;
    }

    // handle glowing effect
    this.brightness += this.glowSpeed;
    if (this.brightness > 255 || this.brightness < 150) {
      this.glowSpeed *= -1;
    }
  }

  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    noStroke();

    drawingContext.shadowBlur = this.dia * 3;
    drawingContext.shadowColor = color(255, 255, 150, this.brightness * 10);
    fill(255, 255, 150, this.brightness);
    circle(0, 0, this.dia);

    pop();
  }

  checkBounds() {
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;
  }
}