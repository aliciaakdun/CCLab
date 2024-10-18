console.log("I am javascript")
alert("also javascript")

function hoverText() {
    alert('yeah');
}

function clickButton() {
    console.log('clicked');
    alert('alert stuff')
}

function setup() {
    let canvas = createCanvas(500, 400);
    canvas.parent("p5-canvas-container");
}

function draw() {
    background(0);
    fill(0, 0, 255);
    circle(mouseX, mouseY, 20);
}


// let gridSize = 40;
// let xMargin = 40;
// let yMargin = 30;

// function setup() {
//     createCanvas(800, 500);
//     background(255);
//     noStroke();
//     angleMode(DEGREES);

//     let cols = floor((width - xMargin * 2) / gridSize); // Number of columns
//     let rows = floor((height - yMargin * 2) / gridSize); // Number of rows

//     for (let x = 0; x < cols; x = x + 1) {
//         for (let y = 0; y < rows; y = y + 1) {
//             // Calculate the center position for each shape
//             let xCenter = xMargin + x * gridSize + gridSize / 2;
//             let yCenter = yMargin + y * gridSize + gridSize / 2;

//             // Squares rotating
//             push();
//             translate(xCenter, yCenter); // Move origin to the center
//             rectMode(CENTER);
//             rotate(random(-30, 30)); // Random rotation
//             let size = random(gridSize - 20, gridSize); // Slight size randomness
//             fill(random(100, 255), random(100, 255), random(150, 255)); // Random colors
//             square(0, 0, size);
//             pop();

//             // Circle
//             push();
//             translate(xCenter + random(-5, 5), yCenter + random(-5, 5)); // Slight displacement
//             let radius = random(size / 4, size / 2); // Circle size based on the square's size
//             fill(random(100, 200), random(100, 200), random(200, 255));
//             ellipse(0, 0, radius, radius); // Draw circle centered at the origin
//             pop();
//         }
//     }
//     //saveCanvas('Alicia', 'png');
// }