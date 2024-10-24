let ants = [];
let trails = [];
let explosions = [];
let explosionLocations = [];
let swarming = false;
let swarmTarget = { x: 0, y: 0 };
let timer = 0;
let gameEnded = false;

function setup() {
    createCanvas(800, 500);

    // Initialize the normal ants with sizes between 10 and 20
    for (let i = 0; i < 6; i++) {
        createAnt(random(width), 0, random(10, 20), false); // Updated size range
    }
}

function draw() {
    background("Moccasin");

    // Draw the trails first (so they appear beneath the ants)
    for (let i = 0; i < ants.length; i++) {
        drawTrail(i);
    }

    // Draw explosion effects next
    for (let i = explosions.length - 1; i >= 0; i--) {
        explosions[i].update();
        explosions[i].show();

        if (explosions[i].finished()) {
            explosions.splice(i, 1);
        }
    }

    // Move and draw all ants 
    for (let i = 0; i < ants.length; i++) {
        if (!ants[i].exploded) {
            if (!swarming) {
                move(i);
            } else {
                swarmTowards(i);
            }
            drawAnt(ants[i].x, ants[i].y, ants[i].size, ants[i].exploded, ants[i].direction);
        } else {
            // Draw exploded ants without movement
            drawAnt(ants[i].x, ants[i].y, ants[i].size, true, ants[i].direction);
        }
    }

    // Display the number of ants left
    fill(0); // Set text color to black
    textSize(16); // Set text size
    text(`Creatures Left: ${ants.filter(ant => !ant.exploded).length}`, 10, 20); // Display the count in the top left corner

    // Update and display the timer
    timer += deltaTime; // Increment timer by the time passed since the last frame
    let seconds = Math.floor(timer / 1000); // Convert milliseconds to seconds
    text(`Timer: ${seconds}`, 10, 40); // Display the timer below the creature count

    if (ants.every(ant => ant.exploded)) {
        gameEnded = true; // Set gameEnded to true
        noLoop(); // Stop the draw loop
        displayEndScreen(); // Call the end screen display function
    }
}

function displayEndScreen() {
    fill(0); // Set text color to black
    textSize(32); // Set larger text size
    textAlign(CENTER, CENTER);
    text("Congratulations!", width / 2, height / 2 - 40); // Display congratulatory message
    text(`You killed them all in ${Math.floor(timer / 1000)} seconds!`, width / 2, height / 2); // Display time taken
}

function createAnt(x, y, size, isSmall) {
    ants.push({
        x: x,
        y: y,
        size: size,
        speedX: random(0.001, 0.01),
        speedY: random(0.001, 0.01),
        exploded: false,
        isSmall: isSmall,
        trails: [],
        direction: createVector(random(-1, 1), random(-1, 1)).normalize(), // Add direction
    });
}

function drawAnt(x, y, size, isExploded, direction) {
    push();
    translate(x, y);
    noStroke();

    // Set color with glow effect
    let fillColor;
    if (isExploded) {
        fillColor = color(255, 0, 0); // Red for exploded ants
    } else {
        fillColor = color(map(x, 0, width, 0, 100), map(y, 0, height, 50, 200), 255);
    }
    fill(fillColor);

    // Glow effect
    drawingContext.shadowBlur = size * 0.1; // Adjusted shadow blur for a softer glow
    drawingContext.shadowColor = fillColor;

    // Create a pulsing effect with a small amplitude
    let pulseSize = size + sin(frameCount * 0.1) * 1; // Adjusted amplitude for pulsing (±1)
    pulseSize = constrain(pulseSize, 10, 20); // Ensure the size stays within the desired range

    // Draw the triangular arrow shape
    drawArrow(0, 0, pulseSize, direction);
    pop();
}

function drawArrow(x, y, size, direction) {
    push();
    translate(x, y);

    // Define the points for the arrow shape
    let halfSize = size / 2;
    let arrowHeight = size;

    // Calculate the angle from the direction vector
    let angle = atan2(direction.y, direction.x);

    // Rotate the arrow based on the angle of movement (tip forward)
    rotate(angle + HALF_PI); // Adjusted to make the tip point forward

    beginShape();
    vertex(0, -arrowHeight / 2); // Tip of the arrow (front)
    vertex(-halfSize, arrowHeight / 2); // Bottom left
    vertex(-halfSize / 2, arrowHeight / 2); // Left dent
    vertex(0, arrowHeight / 4); // Center of the dent
    vertex(halfSize / 2, arrowHeight / 2); // Right dent
    vertex(halfSize, arrowHeight / 2); // Bottom right
    endShape(CLOSE);

    pop();
}

function move(i) {
    ants[i].trails.push({ x: ants[i].x, y: ants[i].y });

    let speedFactor = map(noise(frameCount + i), -1, 1, 1, 1);
    let noiseScale = 0.01;

    // Update positions based on noise
    ants[i].speedX = map(noise(frameCount * noiseScale + i), 0, 1, -speedFactor * 6, speedFactor * 6);
    ants[i].speedY = map(noise(frameCount * noiseScale + i + 100), 0, 1, -3, 4.4);

    ants[i].x += ants[i].speedX;
    ants[i].y += ants[i].speedY + 0.02 * speedFactor;

    // Update the direction based on movement
    ants[i].direction = createVector(ants[i].speedX, ants[i].speedY).normalize();

    // Wrap ants around canvas
    if (ants[i].x < 0) ants[i].x = width;
    if (ants[i].x > width) ants[i].x = 0;
    if (ants[i].y < 0) ants[i].y = 0;
    if (ants[i].y > height) ants[i].y = 0;
}

function swarmTowards(i) {
    let targetX = swarmTarget.x;
    let targetY = swarmTarget.y;

    let distToTarget = dist(ants[i].x, ants[i].y, targetX, targetY);

    if (distToTarget > 30) {
        let angle = atan2(targetY - ants[i].y, targetX - ants[i].x);
        ants[i].x += cos(angle) * 2 + random(-1, 1) * 2;
        ants[i].y += sin(angle) * 2 + random(-1, 1) * 2;

        // Update the direction for swarming
        ants[i].direction = createVector(cos(angle), sin(angle)).normalize();
    } else {
        ants[i].x += random(-1, 1) * 2;
        ants[i].y += random(-1, 1) * 2;

        // Adjust direction randomly when not moving toward a target
        ants[i].direction = createVector(random(-1, 1), random(-1, 1)).normalize();
    }

    ants[i].trails.push({ x: ants[i].x, y: ants[i].y });

    if (ants[i].y > height) {
        ants[i].y = 0;
        ants[i].x = random(width);
    }
}

function mousePressed() {
    for (let i = 0; i < ants.length; i++) {
        if (dist(mouseX, mouseY, ants[i].x, ants[i].y) < 10) {
            explode(i);
            break;
        }
    }
}

function explode(index) {
    ants[index].exploded = true;
    explosionLocations[index] = { x: ants[index].x, y: ants[index].y };
    swarmTarget = { x: ants[index].x, y: ants[index].y };
    swarming = true;

    // Create a new explosion effect at the ant's location
    explosions.push(new Explosion(ants[index].x, ants[index].y));

    // Spawn smaller ants if this is a normal ant
    if (!ants[index].isSmall) {
        spawnSmallAnts(ants[index].x, ants[index].y);
    }

    setTimeout(() => {
        swarming = false;
    }, 4000);
}

function spawnSmallAnts(x, y) {
    // Spawn 3 smaller ants from the explosion
    for (let i = 0; i < 2; i++) {
        createAnt(x + random(-20, 20), y + random(-20, 20), random(3, 7), true); // Smaller size and mark as small ant
    }
}

function drawTrail(index) {
    for (let i = 0; i < ants[index].trails.length; i++) {
        fill(255, 40); // Set trail color with transparency
        noStroke();
        circle(ants[index].trails[i].x, ants[index].trails[i].y, 5); // Draw trails as small circles
    }
}

class Explosion {
    constructor(x, y) {
        this.particles = [];
        for (let i = 0; i < 10; i++) {
            this.particles.push({
                x: x,
                y: y,
                alpha: 255,
                vx: random(-2, 2),
                vy: random(-2, 2),
            });
        }
    }

    update() {
        for (let p of this.particles) {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 5; // Fade out the explosion particles
        }

        this.particles = this.particles.filter(p => p.alpha > 0);
    }

    show() {
        for (let p of this.particles) {
            fill(255, 0, 0, p.alpha); // Red color for explosion effect
            noStroke();
            ellipse(p.x, p.y, 5);
        }
    }

    finished() {
        return this.particles.length === 0;
    }
}
