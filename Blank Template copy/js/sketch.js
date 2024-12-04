let currentStage = 0;
const stages = document.querySelectorAll(".stage");
const prompts = [
  "Reflect on your biggest achievement this year.",
  "What is one thing you would like to improve in your life?",
  "Who has influenced you the most? Why?",
  "What is a dream you haven't pursued yet?",
];
const promptContainer = document.getElementById("prompt-container");
const promptText = document.getElementById("prompt-text");

function setup() {
  let canvas = createCanvas(1000, 300);
  canvas.parent("p5-canvas-container");
  background(220, 0);
}

function draw() {
  fill(220, 20);
  noStroke();
  rect(0, 0, 120, 300);
  rect(120, 0, 1000, 50);
}

function revealNextStage() {
  // Display prompt
  if (currentStage < prompts.length) {
    promptText.innerText = prompts[currentStage];
    promptContainer.style.display = "block";
  }

  // Reveal the next stage
  if (currentStage < stages.length - 1) {
    stages[currentStage + 1].style.display = "flex";
    stages[currentStage + 1].classList.add("fade-in");
    currentStage++;
  }
}
