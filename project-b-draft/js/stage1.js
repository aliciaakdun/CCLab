let maze = [
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1]
];
// man never have I ever had to write this many 1s and 0s I feel like a computer

let player = { x: 1, y: 8 };
let camera = { x: 0, y: 0, width: 5, height: 5 };
let tileSize = 140; // Adjustable tile size to scale everything proportionally

let ends = [
    { x: 0, y: 2 },
    { x: 0, y: 0 },
    { x: 10, y: 0 },
    { x: 10, y: 2 },
    { x: 8, y: 5 },
    { x: 12, y: 5 },
    { x: 12, y: 11 },
    { x: 8, y: 11 },
    { x: 10, y: 14 },
    { x: 10, y: 16 },
    { x: 0, y: 14 },
    { x: 0, y: 16 },
];

let textPoints = [
    { x: 3, y: 8, text: "What would you do if everything you've\never believed was actually a lie?" },
    { x: 5, y: 7, text: "Start questioning\neverything" },
    { x: 6, y: 8, text: "Ignore it and\nkeep moving" },
    { x: 5, y: 9, text: "Embrace the lie\nand live with it" },

    { x: 5, y: 2, text: "If time were to stop right now,\nwould you be satisfied with what you've achieved?" },
    { x: 4, y: 1, text: "I would regret not\nhaving done more" },
    { x: 6, y: 1, text: "I would be\nat peace" },

    { x: 9, y: 8, text: "If you could\nforget all your\npast troubles,\nwould you?" },
    { x: 10, y: 7, text: "Yes, it would\nbe bliss" },
    { x: 10, y: 9, text: "No, my past makes\nme who I am" },

    { x: 5, y: 14, text: "Knowing you've been living a lie your whole life,\nwould you want to know the truth behind it?" },
    { x: 4, y: 15, text: "I don't care, it's\ntoo late anyways" },
    { x: 6, y: 15, text: "Of course I'd want\nto know the truth" },

    { x: 1, y: 1, text: "How does fear\nof failure shape\nyour actions?" },
    { x: 0, y: 0, text: "Fear keeps me\ngrounded, I can't\nlive without it" },
    { x: 0, y: 2, text: "I would take more\nrisks if fear wasn't\nin the way" },

    { x: 9, y: 1, text: "What are you\nwilling to let go of\nto maintain that\npeace?" },
    { x: 10, y: 0, text: "I'm willing to\nlet go of the need\nfor more" },
    { x: 10, y: 2, text: "I'm willing to\nignore my doubts\nand fears" },

    { x: 10, y: 5, text: "How do you\nconfront fear?" },
    { x: 8, y: 5, text: "I face it head on\nand embrace it" },
    { x: 12, y: 5, text: "I hide from\nit and avoid\nconfrontation" },

    { x: 10, y: 11, text: "Imagine you never\nmade the 'wrong'\nchoice, but still\nwalked down paths you\nnever intended to." },
    { x: 12, y: 11, text: "I would be lost\nbut maybe find\nsomething new" },
    { x: 8, y: 11, text: "I would regret\nit, feeling like\nI lost control" },

    { x: 1, y: 15, text: "What if all your\nchoices are just\nillusions of freedom?\nWhat if they've been\nleading you to the\nsame place all\nalong?" },
    { x: 0, y: 14, text: "It would feel\nlike nothing matters" },
    { x: 0, y: 16, text: "It would feel\nlike my life is\npredetermined" },

    { x: 9, y: 15, text: "If you could relive\na moment from\nyour past to change\nit, would you?" },
    { x: 10, y: 14, text: "I would relive it\nto change my future" },
    { x: 10, y: 16, text: "I would let it\ngo, the past doesn't\ndefine me" }
];

function setup() {
    createCanvas(700, 700);
    noStroke();
    textSize(15);
    textAlign(CENTER, CENTER); // Align text to be centered
}

function draw() {
    background(220);

    // Draw the visible portion of the maze with tiles
    for (let row = 0; row < camera.height; row++) {
        for (let col = 0; col < camera.width; col++) {
            const mazeX = col + camera.x;
            const mazeY = row + camera.y;

            if (mazeY < maze.length && mazeX < maze[0].length) {
                if (maze[mazeY][mazeX] === 1) {
                    fill(0); // Wall color (just black, might change later)
                    rect(col * tileSize, row * tileSize, tileSize, tileSize); // Draw wall
                } else {
                    fill(255); // Empty space color (white, might also change later)
                    rect(col * tileSize, row * tileSize, tileSize, tileSize); // Draw empty space
                }
            }
        }
    }

    // Draw text points inside the maze
    drawText();

    // Draw the player 
    fill(255, 0, 0); // Player color (red, might also also change later)
    rect((player.x - camera.x) * tileSize, (player.y - camera.y) * tileSize, tileSize, tileSize);

    if (checkEnd()) {
        noLoop(); // Stops the game when an end is reached
        alert("End message. Click OK to continue."); // Alert message

        // When the alert is closed, update the stage visibility and redirect to the main page
        localStorage.setItem("stage1Completed", true); // Mark stage 1 as completed
        window.location.href = "index.html"; // Redirect to the main page
        // reminder: type "localStorage.clear();" into page console to reset the page
    }

    // Update and draw the camera to follow the player
    updateCamera();
}

// Function to check if the player has reached an end
function checkEnd() {
    // Check if the player is in any of the ending positions
    for (let i = 0; i < ends.length; i++) {
        if (player.x === ends[i].x && player.y === ends[i].y) {
            return true;
        }
    }
    return false; // No end reached
}

// Function to draw text at specific points inside the maze
function drawText() {
    textPoints.forEach(point => {
        let screenX = (point.x - camera.x) * tileSize + tileSize / 2;
        let screenY = (point.y - camera.y) * tileSize + tileSize / 2;

        // Check if the text is within the camera view
        if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
            fill(0, 150, 0); // Text color (Green for now... I wonder if I can make the color different for the questions and answers)
            text(point.text, screenX, screenY); // Draw the text
        }
    });
}

function keyPressed() {
    if (keyCode === 87) { // 'W' key
        movePlayer(0, -1); //up
    } else if (keyCode === 65) { // 'A' key
        movePlayer(-1, 0); //left
    } else if (keyCode === 83) { // 'S' key
        movePlayer(0, 1); //down
    } else if (keyCode === 68) { // 'D' key
        movePlayer(1, 0); //right
    }
}

function movePlayer(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;

    // Check if the new position is within bounds and not a wall
    if (newX >= 0 && newX < maze[0].length && newY >= 0 && newY < maze.length && maze[newY][newX] === 0) {
        player.x = newX;
        player.y = newY;
    }
}

function updateCamera() {
    let targetX = player.x - Math.floor(camera.width / 2);
    let targetY = player.y - Math.floor(camera.height / 2);

    camera.x = constrain(targetX, 0, maze[0].length - camera.width);
    camera.y = constrain(targetY, 0, maze.length - camera.height);
}
