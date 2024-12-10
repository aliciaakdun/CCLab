let video;
let currentScene = "initial";
let isVideoPlaying = false;
let isMessageDisplayed = false; // Track whether the message has been displayed
let buttonsVisible = false; // Track whether buttons are visible

// Define scenes
let scenes = {
    "initial": {
        video: "assets/s2-s1.mp4",
        message: "The gate is locked, but the key lies in the unknown. Do you take the familiar path, or search for the key in the darkness?",
        choices: [
            { text: "Take the safe path", nextScene: "safePath" },
            { text: "Step into the mist", nextScene: "mistPath" }
        ]
    },
    "safePath": {
        video: "assets/s2-s2.mp4",
        message: "The path ahead feels quiet, but stagnant, you walk with no new sights or signs of progress. The path remains calm, but something deep within you feels restless. Is this truly peace?",
        choices: [
            { text: "Continue", nextScene: "safePath" },
            { text: "Turn back", nextScene: "initial" }
        ]
    },
    "mistPath": {
        video: "assets/s2-s3.mp4",
        message: "The fog is thick, but the light ahead calls to you. The fear of the unknown presses against you. Will you keep going?",
        choices: [
            { text: "Continue into the mist", nextScene: "keyFound" },
            { text: "Retreat", nextScene: "initial" }
        ]
    },
    "keyFound": {
        video: "assets/s2-s4.mp4",
        message: "You find a key floating in the air. It’s the key to the gate. Do you take it back, or leave it and return to safety?",
        choices: [
            { text: "Take the key back to the gate", nextScene: "gate" },
            { text: "Leave the key and go back to safety", nextScene: "safePath" }
        ]
    },
    "gate": {
        video: "assets/s2-s1.mp4",
        message: "You return to the gate with the key in hand. The key fits perfectly, and the gate swings open. What lies beyond?",
        choices: [
            { text: "Step through the gate", nextScene: "final" },
            { text: "Leave the gate and turn back to safety", nextScene: "safePath" }
        ]
    },
    "final": {
        message: "You’ve stepped through the gate. Beyond it lies nothing and everything. The journey that awaits cannot be defined, for it is not a destination, but the unfolding of a path you will shape. The future is unwritten, waiting for your first step.",
        choices: []
    }
};

function setup() {
    let canvas = createCanvas(700, 700)
    canvas.parent('p5-canvas-container');
    video = createVideo([scenes["initial"].video], () => {
        video.play();  // Play the video once it's loaded
    });
    video.hide();  // Hide the default video controls
    video.volume(0);  // Mute the video

    // Set up buttons and message
    setupButtons();
    setupMessage(scenes["initial"].message);
}

function setupButtons() {
    const choice1 = document.getElementById("choice-1");
    const choice2 = document.getElementById("choice-2");

    choice1.textContent = scenes["initial"].choices[0].text;
    choice2.textContent = scenes["initial"].choices[1].text;

    choice1.onclick = () => {
        if (!isVideoPlaying) {
            video.play(); // Play video when user clicks
            isVideoPlaying = true; // Set video as playing
        }
        updateScene(scenes["initial"].choices[0].nextScene);
    };

    choice2.onclick = () => {
        if (!isVideoPlaying) {
            video.play(); // Play video when user clicks
            isVideoPlaying = true;
        }
        updateScene(scenes["initial"].choices[1].nextScene);
    };
}

function setupMessage(message) {
    let messageText = document.getElementById("message-text");
    messageText.textContent = message;
}

function updateScene(scene) {
    // Update video source based on scene
    video.stop();
    video = createVideo([scenes[scene].video]);
    video.hide();
    video.loop();
    video.volume(0);

    // Hide the buttons initially
    hideButtons();

    // 10-second delay for the message
    if (scene === "keyFound" && !isMessageDisplayed) {
        isMessageDisplayed = true;  // Set the flag to true so the message isn't shown again
        video.play();  // Make sure the video starts playing

        // Delay the message for 10 seconds
        setTimeout(() => {
            setupMessage(scenes[scene].message); // Show the message after 10 seconds
            showButtons(); // Show the buttons after the message delay
        }, 10000); // 10 seconds delay
    } else {
        setupMessage(scenes[scene].message);  // Regular scene transitions
        showButtons();  // Show the buttons immediately after message is displayed
    }

    if (scene === "final") {
        setTimeout(() => {
            handleFinalChoice();
        }, 500);
        hideButtons();
    }

    // Set up choices for each scene
    let choice1 = document.getElementById("choice-1");
    let choice2 = document.getElementById("choice-2");
    choice1.textContent = scenes[scene].choices[0].text;
    choice2.textContent = scenes[scene].choices[1].text;

    // Update button actions
    choice1.onclick = () => updateScene(scenes[scene].choices[0].nextScene);
    choice2.onclick = () => updateScene(scenes[scene].choices[1].nextScene);
}

// Function to hide the buttons
function hideButtons() {
    let choice1 = document.getElementById("choice-1");
    let choice2 = document.getElementById("choice-2");
    choice1.style.display = 'none';
    choice2.style.display = 'none';
}

// Function to show the buttons
function showButtons() {
    let choice1 = document.getElementById("choice-1");
    let choice2 = document.getElementById("choice-2");
    choice1.style.display = 'block';
    choice2.style.display = 'block';
}

// Handle alert and localStorage when final choice is made
function handleFinalChoice() {
    alert("You have completed Stage 2. Proceed to Stage 3.");
    localStorage.setItem("stage2Completed", true); // Store stage completion
    window.location.href = "index.html"; // Navigate to Stage 3 
}

function draw() {
    background(0); // Clear canvas

    // Get the video size and scale it to fit the canvas
    let videoWidth = video.width;
    let videoHeight = video.height;

    // Scale the video to fit the canvas 
    let scaleX = width / videoWidth;
    let scaleY = height / videoHeight;
    let scaleFactor = Math.min(scaleX, scaleY); // Scale to fit

    // Draw the current video frame on the canvas
    image(video, 0, 0, videoWidth * scaleFactor, videoHeight * scaleFactor);
}


// Track the choice made by the user in Stage 2
let stage2Choice = "";

// Check if a choice is already stored in localStorage
if (!localStorage.getItem('stage2Choice')) {
    // If no choice has been made yet, allow player to choose
    document.getElementById('choice-1').onclick = function () {
        stage2Choice = 'safe-path';  // Safe path choice
        localStorage.setItem('stage2Choice', stage2Choice);  // Store choice in localStorage
    };

    document.getElementById('choice-2').onclick = function () {
        stage2Choice = 'risky-path';  // Risky path choice
        localStorage.setItem('stage2Choice', stage2Choice);  // Store choice in localStorage
    };
} else {
    // If a choice is already made, skip storing again (you can optionally add a message or action here)
    console.log("Choice already made: " + localStorage.getItem('stage2Choice'));
}
