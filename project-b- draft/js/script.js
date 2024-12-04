let stageEllipses = [
  { visible: true, count: 50, bounds: { x: 125, y: 50, w: 150, h: 150 }, ellipses: [] },
  { visible: false, count: 50, bounds: { x: 300, y: 320, w: 150, h: 150 }, ellipses: [] },
  { visible: false, count: 50, bounds: { x: 550, y: 50, w: 150, h: 150 }, ellipses: [] },
  { visible: false, count: 50, bounds: { x: 725, y: 320, w: 150, h: 150 }, ellipses: [] }
];

let ellipses = [];

function setup() {
  let canvas = createCanvas(1000, 500);
  canvas.parent("p5-canvas-container");

  // Generate initial random ellipses in the main area
  for (let i = 0; i < 1000; i++) {
    let ellipseData = {
      x: random(width),
      y: random(height),
      size: random(30, 60),
      opacity: random(50, 100),
      xSpeed: random(-0.5, 0.5), // Horizontal speed
      ySpeed: random(-0.5, 0.5)  // Vertical speed
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

    fill(210, e.opacity); // White color with random opacity
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
    let size = random(50, 100); // Random ellipse size
    let xSpeed = random(-0.5, 0.5); // Small horizontal movement speed
    let ySpeed = random(-0.5, 0.5); // Small vertical movement speed

    stage.ellipses.push({ x, y, size, xSpeed, ySpeed });
  }
}

function drawEllipses(ellipses, bounds) {
  noStroke();
  fill(255, 50); // Light translucent color for fog

  // Update and draw each stage ellipse
  for (let e of ellipses) {
    e.x += e.xSpeed; // Update x position
    e.y += e.ySpeed; // Update y position

    // Boundary check for stage ellipses (keep them within the stage bounds)
    if (e.x - e.size / 2 < bounds.x || e.x + e.size / 2 > bounds.x + bounds.w) {
      e.xSpeed *= -1; // Reverse direction horizontally
    }
    if (e.y - e.size / 2 < bounds.y || e.y + e.size / 2 > bounds.y + bounds.h) {
      e.ySpeed *= -1; // Reverse direction vertically
    }

    ellipse(e.x, e.y, e.size, e.size); // Draw ellipse
  }
}

// Function to manage stage visibility on the main page
function updateStageVisibility() {
  const stage1 = document.getElementById("link1");
  const stage2 = document.getElementById("link2");
  const stage3 = document.getElementById("link3");
  const stage4 = document.getElementById("link4");

  // Helper function to handle visibility and update fog
  function handleStageVisibility(stage, isVisible, stageIndex) {
    if (stage) {
      stage.style.display = isVisible ? "block" : "none";
      if (isVisible) {
        stageEllipses[stageIndex].visible = true;
        if (stageEllipses[stageIndex].ellipses.length === 0) {
          generateEllipses(stageEllipses[stageIndex]); // Generate ellipses if not already done
        }
      }
    }
  }

  // Stage management
  handleStageVisibility(stage1, true, 0); // Stage 1 always visible
  handleStageVisibility(stage2, localStorage.getItem("stage1Completed"), 1);
  handleStageVisibility(stage3, localStorage.getItem("stage2Completed"), 2);
  handleStageVisibility(stage4, localStorage.getItem("stage3Completed"), 3);
}

// Call the function to update visibility on page load
window.onload = updateStageVisibility;

// Handle answer submission on stage pages
const submitAnswerBtn = document.getElementById("submit-answer");
if (submitAnswerBtn) {
  submitAnswerBtn.addEventListener("click", () => {
    const currentStage = submitAnswerBtn.dataset.stage;
    const answerInput = document.getElementById("q1answer");
    const answerInput2 = document.getElementById("q2answer");
    const answerInput3 = document.getElementById("q3answer");
    const answerInput4 = document.getElementById("q4answer"); // Adjust for other stages

    if (
      (answerInput && answerInput.value.trim().length > 0) ||
      (answerInput2 && answerInput2.value.trim().length > 0) ||
      (answerInput3 && answerInput3.value.trim().length > 0) ||
      (answerInput4 && answerInput4.value.trim().length > 0)
    ) {
      // Mark the current stage as completed
      localStorage.setItem(`${currentStage}Completed`, true);

      // Redirect to the main page
      window.location.href = "index.html";
    } else {
      alert("Please enter a response before submitting.");
    }
  });
}