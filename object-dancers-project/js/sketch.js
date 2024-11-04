/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new AliciaDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class AliciaDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.armAngle = 0; // For arm rotation
    this.armDirection = 1; // For direction arm moves in
    this.lowerLegAngle = 0; // For lower leg rotation
    this.lowerLegDirection = 1; //For direction lower leg moves in
    this.upperLegAngle = 0; // For upper leg rotation
    this.upperLegDirection = 1; //For direction upper leg moves in
    this.crouchTimer = 0;
    this.crouchInterval = 50;
    this.isCrouching = false;
    this.waitDuration = 60; // Duration of 'wait' motion
    this.isWaiting = false; // State for waiting
    this.waitTimer = 0;
    this.normalDuration = 300; // Duration of normal movement
    this.normalTimer = 0;
    this.crouchCount = 0;
  }

  update() {
    angleMode(DEGREES);

    // Arm rotation (always active)
    this.armAngle += this.armDirection * 3;
    if (this.armAngle > 20 || this.armAngle < -20) {
      this.armDirection *= -1;
    }

    if (this.isWaiting) {
      // Waiting posture
      this.armAngle = 45; // Arm raised for "wait" position
      this.waitTimer++;

      // Exit waiting state after the specified duration
      if (this.waitTimer >= this.waitDuration) {
        this.isWaiting = false;
        this.waitTimer = 0;
        this.crouchCount = 0; // Reset crouch count
        this.crouchTimer = 0; // Reset crouch timer
        this.isCrouching = false;
        this.armAngle = 0; // Reset arm position
      }

    } else if (this.isCrouching) {
      // Crouching leg motion
      this.lowerLegAngle += this.lowerLegDirection * 2;
      if (this.lowerLegAngle > 20 || this.lowerLegAngle < 0) {
        this.lowerLegDirection *= -1;
      }

      this.upperLegAngle += this.upperLegDirection * 2;
      if (this.upperLegAngle > 20 || this.upperLegAngle < 0) {
        this.upperLegDirection *= -1;
      }

      // Complete a full crouch cycle when angles reset to starting position
      if (this.lowerLegAngle === 0 && this.upperLegAngle === 0) {
        this.crouchTimer = 0; // Reset timer only after full cycle
        this.isCrouching = false; // End crouch state
        this.crouchCount++; // Increment crouch count

        // Enter waiting state after three full crouch cycles
        if (this.crouchCount >= 3) {
          this.isWaiting = true;
        }
      }

    } else {
      // Normal movement phase: trigger crouch after a set interval
      this.crouchTimer++;
      if (this.crouchTimer >= this.crouchInterval) {
        this.isCrouching = true;
      }
    }
  }

  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️
    push();
    rectMode(CENTER);
    noStroke();
    fill(255);

    let yChange;
    if (this.isCrouching || this.isWaiting) {
      yChange = 10; // Move down when crouching
    } else {
      yChange = 0; // No movement when not crouching
    }

    // Draw head
    push();
    translate(0, -70 + yChange); // Adjust head position based on yChange
    circle(0, 0, 35); // Head shape
    fill(0);
    circle(-8, 0, 5); // Left eye
    circle(8, 0, 5); // Right eye
    stroke(0);
    strokeWeight(2);
    bezier(-5, 8, -5, 15, 5, 15, 5, 8); // Mouth
    pop();

    push();
    translate(0, -15 + yChange); // Adjust body position based on yChange
    rect(0, 0, 40, 60, 15); // Body
    pop();

    // Arm movement
    if (this.isWaiting) {
      // Left arm
      push();
      translate(-32.5, -30 + yChange);
      rotate(0);
      rect(0, 20, 15, 60, 10);
      pop();

      // Upper arm
      push();
      translate(32.5, -40 + yChange);
      rotate(-this.armAngle / 2);
      rect(0, 20, 15, 40, 10);
      pop();

      // Forearm
      push();
      translate(50, 5);
      rotate(-this.armAngle);
      rect(0, 0, 17, 30, 10); // Thicker forearm (bad attempt at perspective)
      pop();
    } else {
      // Regular arms when not in "wait" position
      push();
      translate(-32.5, -30 + yChange);
      rotate(this.armAngle);
      rect(0, 20, 15, 60, 10);
      pop();

      push();
      translate(32.5, -30 + yChange);
      rotate(this.armAngle);
      rect(0, 20, 15, 60, 10);
      pop();
    }

    // Leg movement
    if (this.isWaiting) {
      push();
      translate(-10, 20);
      rotate(-this.upperLegAngle);
      rect(0, 20, 18, 40, 10); // Left upper leg
      pop();

      push();
      translate(10, 20);
      rotate(10);
      rect(0, 20, 18, 40, 10); // Right upper leg
      pop();

      push();
      translate(-10, 85);
      rotate(this.lowerLegAngle);
      rect(0, -20, 18, 40, 10); // Left lower leg
      pop();

      push();
      translate(-20, 85);
      rotate(40);
      rect(0, -20, 18, 40, 10); // Right lower leg
      pop();
    } else {
      // Left upper leg
      push();
      translate(-10, 20);
      rotate(-this.upperLegAngle);
      rect(0, 20, 18, 40, 10);
      pop();

      // Right upper leg
      push();
      translate(10, 20);
      rotate(-this.lowerLegAngle);
      rect(0, 20, 18, 40, 10);
      pop();

      // Left lower leg
      push();
      translate(-10, 85);
      rotate(this.lowerLegAngle);
      rect(0, -20, 18, 40, 10);
      pop();

      //Right lower leg
      push();
      translate(10, 85);
      rotate(this.lowerLegAngle);
      rect(0, -20, 18, 40, 10); // Right lower leg
      pop();
    }

    pop();


    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    // this.drawReferenceShapes()

    pop();
  }

  // drawReferenceShapes() {
  //   noFill();
  //   stroke(255, 0, 0);
  //   line(-5, 0, 5, 0);
  //   line(0, -5, 0, 5);
  //   stroke(255);
  //   rect(-100, -100, 200, 200);
  //   fill(255);
  //   stroke(0);
  // }
}




/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/