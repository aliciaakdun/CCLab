let stageEllipses = [
  { visible: true, count: 150, bounds: { x: window.innerWidth * 0.12, y: window.innerHeight * 0.2, w: 250, h: 250 }, ellipses: [] },
  { visible: false, count: 150, bounds: { x: window.innerWidth * 0.4, y: window.innerHeight * 0.6, w: 250, h: 250 }, ellipses: [] },
  { visible: false, count: 150, bounds: { x: window.innerWidth * 0.68, y: window.innerHeight * 0.2, w: 250, h: 250 }, ellipses: [] },
];

let ellipses = [];

function setup() {
  let canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent("p5-canvas-container");

  // Generate initial random ellipses in the main area
  for (let i = 0; i < 2000; i++) {
    let ellipseData = {
      x: random(width),
      y: random(height),
      size: random(30, 60),
      opacity: random(50, 100),
      xSpeed: random(-0.5, 0.5),
      ySpeed: random(-0.5, 0.5)
    };
    ellipses.push(ellipseData); // Add the ellipse data to the array
  }

  // Generate ellipses for each stage
  for (let stage of stageEllipses) {
    generateEllipses(stage);
  }
}

function draw() {
  background(200);
  noStroke();

  // Update and draw main ellipses
  for (let e of ellipses) {
    e.x += e.xSpeed; // Update x position
    e.y += e.ySpeed; // Update y position

    // Boundary check for main ellipses (canvas edges)
    if (e.x < 0 || e.x > width) {
      e.xSpeed *= -1; // Reverse direction horizontally
    }
    if (e.y < 0 || e.y > height) {
      e.ySpeed *= -1; // Reverse direction vertically
    }

    fill(210, e.opacity); // White-ish color with random opacity
    ellipse(e.x, e.y, e.size, e.size); // Draw ellipse
  }

  // Draw and update stage ellipses based on their visibility
  for (let stage of stageEllipses) {
    if (stage.visible) {
      drawEllipses(stage.ellipses, stage.bounds);
    }
  }
}

function generateEllipses(stage) {
  stage.ellipses = []; // Clear any existing ellipses
  for (let i = 0; i < stage.count; i++) {
    let x = random(stage.bounds.x, stage.bounds.x + stage.bounds.w);
    let y = random(stage.bounds.y, stage.bounds.y + stage.bounds.h);
    let size = random(50, 100);
    let xSpeed = random(-0.5, 0.5);
    let ySpeed = random(-0.5, 0.5);

    stage.ellipses.push({ x, y, size, xSpeed, ySpeed });
  }
}

function drawEllipses(ellipses, bounds) {
  noStroke();
  fill(255, 50);

  // Update and draw each stage ellipse
  for (let e of ellipses) {
    e.x += e.xSpeed; // Update x position
    e.y += e.ySpeed; // Update y position

    // Boundary check for stage ellipses
    if (e.x - e.size / 2 < bounds.x || e.x + e.size / 2 > bounds.x + bounds.w) {
      e.xSpeed *= -1;
    }
    if (e.y - e.size / 2 < bounds.y || e.y + e.size / 2 > bounds.y + bounds.h) {
      e.ySpeed *= -1;
    }

    ellipse(e.x, e.y, e.size, e.size); // Draw ellipse
  }
}

// Function to manage stage visibility on the main page
function updateStageVisibility() {
  const stage1 = document.getElementById("link1");
  const stage2 = document.getElementById("link2");
  const stage3 = document.getElementById("link3");

  // Function to handle visibility and update fog
  function handleStageVisibility(stage, isVisible, stageIndex) {
    if (stage) {
      stage.style.display = isVisible ? "block" : "none";
      if (isVisible) {
        stageEllipses[stageIndex].visible = true;
        if (stageEllipses[stageIndex].ellipses.length === 0) {
          generateEllipses(stageEllipses[stageIndex]);
        }
      }
    }
  }

  // Stage management
  handleStageVisibility(stage1, true, 0); // Stage 1 always visible
  handleStageVisibility(stage2, localStorage.getItem("stage1Completed"), 1);
  handleStageVisibility(stage3, localStorage.getItem("stage2Completed"), 2);
}

// Call the function to update visibility on page load
window.onload = updateStageVisibility;

if (localStorage.getItem("stage3Completed")) {
  // Show the button if Stage 3 is completed
  document.getElementById("clearStorageButton").style.display = "block";

  document.getElementById('clearStorageButton').addEventListener('click', function () {
    localStorage.clear();
    alert("Reload the page to start over");
  });
}

// Adjust positions dynamically on window resize
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);

  // Update bounds for each stage based on new window size
  stageEllipses[0].bounds = { x: window.innerWidth * 0.12, y: window.innerHeight * 0.2, w: 250, h: 250 };
  stageEllipses[1].bounds = { x: window.innerWidth * 0.4, y: window.innerHeight * 0.6, w: 250, h: 250 };
  stageEllipses[2].bounds = { x: window.innerWidth * 0.68, y: window.innerHeight * 0.2, w: 250, h: 250 };

  // Regenerate ellipses after resizing to adapt to the new bounds
  for (let stage of stageEllipses) {
    generateEllipses(stage);
  }
}
