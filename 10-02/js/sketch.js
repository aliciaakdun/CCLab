let img;
let cam;

function preload() {
  // img = loadImage("https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x4.jpg")
}

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  img = createImage(500, 400);

  cam = createCapture(VIDEO);
  cam.size(500, 400);
  cam.hide();
}

function draw() {
  cam.loadPixels();
  img.loadPixels();

  let gridSize = 10;
  for (let y = 0; y < img.height; y += gridSize) {
    for (let x = 0; x < img.width; x += gridSize) {
      let index = (x + y * img.width) * 4;

      let r = cam.pixels[index];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];

      fill(r, g, b);
      // ellipse(x, y, gridSize, gridSize);
      text("whatever", x, y)
    }
  }
  // tint(355, 0, 0);
  // image(cam, 0, 0);

  //
  // background(0);
  // img.resize(500, 400);

  // for (let i = 0; i < 20; i++) {
  //   let x = floor(random(width));
  //   let y = floor(random(height));
  //   let dia = random(6, 10);
  //   let c = cam.get(x, y);

  //   noStroke();
  //   fill(red(c) + 50, green(c), blue(c));
  //   rectMode(CENTER);
  //   rect(x, y, dia, dia);
}

