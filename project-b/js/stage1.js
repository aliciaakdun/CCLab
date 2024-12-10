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
let tileSize = 140; // Adjustable tile size to scale everything


let textPoints = [
    { x: 1, y: 7, text: "There is no 'right' or 'wrong' choice" },
    { x: 1, y: 9, text: "But the choices will affect your path" },

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
    let canvas = createCanvas(700, 700);
    canvas.parent("p5-canvas-container");
    noStroke();
    textSize(15);
    textAlign(CENTER, CENTER);
}


function draw() {
    background(220);

    // Draw the visible portion of the maze with tiles
    for (let row = 0; row < camera.height; row++) {
        for (let col = 0; col < camera.width; col++) {
            let mazeX = col + camera.x;
            let mazeY = row + camera.y;

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
    // Update and draw the camera to follow the player
    updateCamera();

    checkEnd();

    // Draw the player 
    fill(255, 0, 0);
    rect((player.x - camera.x) * tileSize, (player.y - camera.y) * tileSize, tileSize, tileSize);

}

const endBlocks = [
    { x: 0, y: 2, message: "You stand on the edge of curiosity, constantly questioning the world around you. The regrets of missed opportunities weigh on you, but your desire to embrace life’s risks shines through. Fear may hold you back, but it’s the courage to move forward that will define who you become." },
    { x: 0, y: 0, message: "You are caught in a paradox, seeking answers yet held back by the very thing you fear. Your regrets show a longing for more, but the fear that keeps you grounded also protects you. In this tension, you must decide whether your fear will be a shield or a prison." },
    { x: 10, y: 0, message: "You’ve learned to question everything, yet you’ve found peace in letting go. By surrendering the need for more, you’ve come to understand that true peace comes not from accumulation, but from acceptance of what is. What you’ve found is contentment in the simplicity of being." },
    { x: 10, y: 2, message: "Your questioning mind brings you closer to understanding, but you’ve chosen peace over anxiety. In ignoring your doubts and fears, you’ve learned to live without the weight of uncertainty. True peace is found not by avoiding challenges, but by embracing the present moment, free from the burden of what might be." },
    { x: 8, y: 5, message: "You’ve chosen to keep moving forward, seeking bliss in the release of your past. By facing your fears head on, you’ve found a strength within yourself. Embracing the challenge means knowing that bliss is not an end, but a journey of constant evolution." },
    { x: 12, y: 5, message: "You’ve chosen to keep moving, to seek bliss in a world that sometimes feels overwhelming. By avoiding confrontation, you might find temporary relief, but it’s only through facing what scares you that freedom and bliss can truly be yours." },
    { x: 12, y: 11, message: "The past has shaped the person you are today. Moving forward may leave you uncertain of where you’re going, but sometimes in losing yourself, you might discover a new version of who you could be. The road ahead is unclear, but it is yours to explore." },
    { x: 8, y: 11, message: "You cannot ignore the weight of your past. Though you seek to move forward, the fear of losing control over your path lingers. The past shapes you, but it does not define you. It’s only by accepting this truth that you can reclaim your agency over the choices yet to come." },
    { x: 10, y: 14, message: "You’ve embraced the comfort of the lie, but in the depths of your mind, you yearn for truth. The idea of reliving a past moment to change the future speaks to your desire for control. But be careful. What you seek to change may not be as valuable as what you learn to accept." },
    { x: 10, y: 16, message: "You may live with the lie, but your heart seeks the truth. Yet, in your decision to let go of the past, you find liberation. The truth may be elusive, but it is in releasing the hold of the past that you gain the freedom to shape your own destiny, independent of what has come before." },
    { x: 0, y: 14, message: "Living with the lie and feeling as though it’s too late to change leads you to a place where nothing seems to matter anymore. Yet, perhaps in this acceptance, you’ve found a strange peace. When everything feels meaningless, you may begin to realize that meaning is something we create ourselves." },
    { x: 0, y: 16, message: "In accepting the lie, you resign yourself to the belief that it’s too late to make a change. Your path feels predetermined, as if fate has already been decided for you. But even in this acceptance, there lies a choice: the choice to rewrite your story, no matter how late it seems." }
];

// Function to show the pop-up and start the typing animation
function showPopup(message) {
    let popup = document.getElementById('popup');
    let typedMessage = document.getElementById('typedMessage');

    // Show the popup
    popup.style.display = 'flex';

    // Clear previous text in case the popup is reused
    typedMessage.innerHTML = '';

    let index = 0;
    let speed = 50;  // Typing speed in milliseconds

    // Function to type the message one character at a time
    function typeWriter() {
        if (index < message.length) {
            typedMessage.innerHTML += message.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        } else {
            // Once typing is complete, show an alert
            setTimeout(() => {
                alert("Click OK to continue to the next stage.");
                localStorage.setItem("stage1Completed", true);
                // After alert is closed, go to the main page
                window.location.href = "index.html";
            }, 500);  // Delay to ensure the alert shows after typing finishes
        }
    }
    // Start the typing animation
    typeWriter();
}

// Function to check if the player has reached an end block
function checkEnd() {
    // Loop through the predefined end blocks
    for (let i = 0; i < endBlocks.length; i++) {
        // Check if the player's position matches any of the end blocks
        if (player.x === endBlocks[i].x && player.y === endBlocks[i].y) {
            // Trigger the popup with the corresponding message
            showPopup(endBlocks[i].message);

            if (endBlocks[i].message.includes("You stand on the edge of curiosity")) {
                localStorage.setItem('stage1Choice', 'end1');
            } else if (endBlocks[i].message.includes("You are caught in a paradox")) {
                localStorage.setItem('stage1Choice', 'end2');
            } else if (endBlocks[i].message.includes("You’ve learned to question everything")) {
                localStorage.setItem('stage1Choice', 'end3');
            } else if (endBlocks[i].message.includes("Your questioning mind")) {
                localStorage.setItem('stage1Choice', 'end4');
            } else if (endBlocks[i].message.includes("You’ve chosen to keep moving forward")) {
                localStorage.setItem('stage1Choice', 'end5');
            } else if (endBlocks[i].message.includes("to seek bliss in a world that sometimes feels overwhelming")) {
                localStorage.setItem('stage1Choice', 'end6');
            } else if (endBlocks[i].message.includes("The past has shaped the person you are today")) {
                localStorage.setItem('stage1Choice', 'end7');
            } else if (endBlocks[i].message.includes("You cannot ignore the weight of your past")) {
                localStorage.setItem('stage1Choice', 'end8');
            } else if (endBlocks[i].message.includes("You’ve embraced the comfort of the lie")) {
                localStorage.setItem('stage1Choice', 'end9');
            } else if (endBlocks[i].message.includes("You may live with the lie")) {
                localStorage.setItem('stage1Choice', 'end10');
            } else if (endBlocks[i].message.includes("Living with the lie and feeling as though")) {
                localStorage.setItem('stage1Choice', 'end11');
            } else if (endBlocks[i].message.includes("In accepting the lie, you resign yourself")) {
                localStorage.setItem('stage1Choice', 'end12');
            }

            noLoop();  // Stops the game when an end block is reached

            return true;  // Exit the loop once an end block is found
        }
    }

    return false;  // No end block reached
}

// Function to draw text at specific points inside the maze
function drawText() {
    textPoints.forEach(point => {
        let screenX = (point.x - camera.x) * tileSize + tileSize / 2;
        let screenY = (point.y - camera.y) * tileSize + tileSize / 2;

        // Check if the text is in the camera view
        if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
            fill(0, 150, 0);
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
    let newX = player.x + dx;
    let newY = player.y + dy;

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


// Show the first pop-up when the close button is clicked
document.getElementById("close-btn").addEventListener("click", function () {
    document.getElementById("close-modal").style.display = "flex"; // Show the first modal
});

// When the user clicks "Yes" in the first modal (close confirmation)
document.getElementById("confirm-close").addEventListener("click", function () {
    // Hide the first modal
    document.getElementById("close-modal").style.display = "none";

    // Show the second modal
    document.getElementById("final-close-modal").style.display = "flex";
});

// When the user clicks "Cancel" in the first modal
document.getElementById("cancel-close").addEventListener("click", function () {
    // Hide the first modal
    document.getElementById("close-modal").style.display = "none";
});

// When the user clicks "Yes, Exit" in the second modal (final close)
document.getElementById("confirm-final-close").addEventListener("click", function () {
    // Close the fake window (hide it)
    document.querySelector(".window").style.display = "none";
    document.getElementById("final-close-modal").style.display = "none";
});

// When the user clicks "Cancel" in the second modal
document.getElementById("cancel-final-close").addEventListener("click", function () {
    // Hide the second modal
    document.getElementById("final-close-modal").style.display = "none";
});



// Show the camera modal when the final close action is confirmed
document.getElementById("confirm-final-close").addEventListener("click", function () {
    // Hide the second modal
    document.getElementById("final-close-modal").style.display = "none";

    // Show the camera modal
    document.getElementById("camera-modal").style.display = "flex";

    // Access the user's webcam
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            let videoElement = document.getElementById("user-video");
            videoElement.srcObject = stream;
        })
        .catch(function (error) {
            console.error("Error accessing webcam: ", error);
            alert("Could not access the webcam.");
        });
});

// Close the camera modal and bring the user back to the game
document.getElementById("close-camera").addEventListener("click", function () {
    // Hide the camera modal
    document.getElementById("camera-modal").style.display = "none";
    document.querySelector(".window").style.display = "block";  // Show the maze/game window

    // Stop the webcam stream to prevent the camera from running in the background
    const videoElement = document.getElementById("user-video");
    const stream = videoElement.srcObject;
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop()); // Stop all video tracks
    }
});