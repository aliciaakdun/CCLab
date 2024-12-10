let images = [];
let messages = {
    "end1": [
        "When everything you though you knew was a lie,\nyou decided to start questioning everything.",
        "You seem to have regrets about the things\nyou have yet to achieve.",
        "However, fear keeps you from trying new things.",
        "Remember, stepping out of your comfort zone often\nresults in progress."
    ],
    "end2": [
        "When everything you though you knew was a lie,\nyou decided to start questioning everything.",
        "You seem to have regrets about the things\nyou have yet to achieve.",
        "Fear may keep you grounded, but don't forget\nthe importance of letting go from time to time",
        "Remember, stepping out of your comfort zone often\nresults in progress."
    ],
    "end3": [
        "When everything you though you knew was a lie,\nyou decided to start questioning everything.",
        "You seem satisfied with your life, yet remain curious.",
        "You've found contentment in the simplicity of being,\nat the expense of the need to acheive.",
        "Remember, seeking progress does not mean\ngiving up your peace. It might\nlead you to even more contentment."
    ],
    "end4": [
        "When everything you though you knew was a lie,\nyou decided to start questioning everything.",
        "You seem satisfied with your life, yet remain curious.",
        "You've learned to overlook your fears to achieve peace.",
        "Your curiosity and capability to overcome your\nfears has led you to new adventures and discoveries."
    ],
    "end5": [
        "When everything you though you knew was a lie,\nyou decided to ignore it and keep moving.",
        "Choosing to forget all your troubles might provide\ntemporary bliss, but you cannot ignore your problems forever.",
        "By facing your fears head on, you've found a new\nstrength within yourself.",
        "Embracing the challenge means knowing that bliss\nis not an end, but a journey of constant discovery."
    ],
    "end6": [
        "When everything you though you knew was a lie,\nyou decided to ignore it and keep moving.",
        "Choosing to forget all your troubles might provide\ntemporary bliss, but you cannot ignore your problems forever.",
        "You are stuck in a cycle of running from the problem.\nThis might cause you to be stuck in place,\nunable to overcome challenges.",
        "It’s only through facing what scares you that freedom\ncan truly be yours."
    ],
    "end7": [
        "When everything you though you knew was a lie,\nyou decided to ignore it and keep moving.",
        "The past has shaped the person you are today",
        "In losing yourself, you might discover a new version of\nwho you could be.",
        "The road ahead is unclear, but it is yours to explore."
    ],
    "end8": [
        "When everything you though you knew was a lie,\nyou decided to ignore it and keep moving.",
        "The past has shaped the person you are today",
        "Though you seek to move forward, the fear of losing\ncontrol over your path lingers.",
        "The past shapes you, but it does not define you.\nIt’s only by accepting this that you can reclaim control\nover the choices yet to come."
    ],
    "end9": [
        "When everything you though you knew was a lie,\nyou decided to embrace the lie and live with it.",
        "Although you embrace the lie, you still seek for the truth.",
        "The idea of reliving a past moment to change the\nfuture speaks to your desire for control.",
        "But be careful. What you seek to change may not\nbe as valuable as what you learn to accept."
    ],
    "end10": [
        "When everything you though you knew was a lie,\nyou decided to embrace the lie and live with it.",
        "Although you embrace the lie, you still seek for the truth.",
        "Yet, in your decision to let go of the past,\nyou find liberation.",
        "It is in releasing the hold of the past that you\ngain the freedom to shape your own path."
    ],
    "end11": [
        "When everything you though you knew was a lie,\nyou decided to embrace the lie and live with it.",
        "In your acceptance of the lie, you decide that it's too\nlate to change the past anyways, letting go of your curiosity.",
        "This leads you to a place where nothing\nseems to matter anymore.",
        "When everything feels meaningless, you may begin to\nrealize that meaning is something we create ourselves."
    ],
    "end12": [
        "When everything you though you knew was a lie,\nyou decided to embrace the lie and live with it.",
        "In your acceptance of the lie, you decide that it's too\nlate to change the past anyways, letting go of your curiosity.",
        "It feels as if fate has already been decided for you",
        "Yet there lies a choice: the choice to rewrite your story,\nno matter how late it seems."
    ],
};

let currentImageIndex = 0;
let nextImageIndex = 1;
let textToShow = "";
let textIndex = 0;
let fadeAmount = 0;
let fadingOut = false;

// Preload images based on user choices in Stage 1 and Stage 2
function preload() {
    // Retrieve choices from localStorage
    let stage1Choice = localStorage.getItem('stage1Choice');
    let stage2Choice = localStorage.getItem('stage2Choice') || 'risky-path'; // Default to 'risky-path' if not set

    // Construct the key for the messages object
    let choiceKey = `${stage1Choice}`;

    // Based on stage 1 and stage 2 choices, load appropriate images
    if (stage1Choice === 'end1') {
        images[0] = loadImage('assets/E1-2-3-4_p1.jpg');
        images[1] = loadImage('assets/E1-2_p2.jpg');
        images[2] = loadImage('assets/E1_p3.jpg');
    } else if (stage1Choice === 'end2') {
        images[0] = loadImage('assets/E1-2-3-4_p1.jpg');
        images[1] = loadImage('assets/E1-2_p2.jpg');
        images[2] = loadImage('assets/E2_p3.jpg');
    } else if (stage1Choice === 'end3') {
        images[0] = loadImage('assets/E1-2-3-4_p1.jpg');
        images[1] = loadImage('assets/E3-4_p2.jpg');
        images[2] = loadImage('assets/E3_p3.jpg');
    } else if (stage1Choice === 'end4') {
        images[0] = loadImage('assets/E1-2-3-4_p1.jpg');
        images[1] = loadImage('assets/E3-4_p2.jpg');
        images[2] = loadImage('assets/E4_p3.jpg');
    } else if (stage1Choice === 'end5') {
        images[0] = loadImage('assets/E5-6-7-8_p1.jpg');
        images[1] = loadImage('assets/E5-6_p2.jpg');
        images[2] = loadImage('assets/E5_p3.jpg');
    } else if (stage1Choice === 'end6') {
        images[0] = loadImage('assets/E5-6-7-8_p1.jpg');
        images[1] = loadImage('assets/E5-6_p2.jpg');
        images[2] = loadImage('assets/E6_p3.jpg');
    } else if (stage1Choice === 'end7') {
        images[0] = loadImage('assets/E5-6-7-8_p1.jpg');
        images[1] = loadImage('assets/E7-8_p2.jpg');
        images[2] = loadImage('assets/E7_p3.jpg');
    } else if (stage1Choice === 'end8') {
        images[0] = loadImage('assets/E5-6-7-8_p1.jpg');
        images[1] = loadImage('assets/E7-8_p2.jpg');
        images[2] = loadImage('assets/E8_p3.jpg');
    } else if (stage1Choice === 'end9') {
        images[0] = loadImage('assets/E9-10-11-12_p1.jpg');
        images[1] = loadImage('assets/E9-10_p2.jpg');
        images[2] = loadImage('assets/E9_p3.jpg');
    } else if (stage1Choice === 'end10') {
        images[0] = loadImage('assets/E9-10-11-12_p1.jpg');
        images[1] = loadImage('assets/E9-10_p2.jpg');
        images[2] = loadImage('assets/E10_p3.jpg');
    } else if (stage1Choice === 'end11') {
        images[0] = loadImage('assets/E9-10-11-12_p1.jpg');
        images[1] = loadImage('assets/E11-12_p2.jpg');
        images[2] = loadImage('assets/E11_p3.jpg');
    } else if (stage1Choice === 'end12') {
        images[0] = loadImage('assets/E9-10-11-12_p1.jpg');
        images[1] = loadImage('assets/E11-12_p2.jpg');
        images[2] = loadImage('assets/E12_p3.jpg');
    }


    // Load the fourth image based on Stage 2 choice
    if (stage2Choice === 'safe-path') {
        images[3] = loadImage('assets/safe.jpg');
    } else if (stage2Choice === 'risky-path') {
        images[3] = loadImage('assets/risky.jpg');
    }

    // Store the message set for this combination of choices
    texts = messages[choiceKey];
}

function setup() {
    let canvas = createCanvas(700, 700);
    canvas.parent('p5-canvas-container');
    textSize(24);
    textAlign(CENTER, TOP);

    document.getElementById('next-button').addEventListener('click', moveToNextImage);
}

function draw() {
    background(255);

    // Fade out the current image
    if (fadingOut) {
        fadeAmount += 5;
        textToShow = "";
        textIndex = 0;
        if (fadeAmount >= 255) {
            fadingOut = false;
            currentImageIndex = nextImageIndex;
            nextImageIndex = (nextImageIndex + 1) % images.length;
            fadeAmount = 0;
        }
    }

    // Display the current image with fading effect
    tint(255, 255 - fadeAmount); // Fade effect
    image(images[currentImageIndex], 0, 0, width, height);
    noTint(); // Reset tint

    textWrap(WORD);

    // Display the typing text
    stroke(0);
    strokeWeight(2);
    fill(255);
    text(textToShow, width / 2, height - 200);

    // Typing text effect
    if (textIndex < texts[currentImageIndex].length) {
        textToShow += texts[currentImageIndex].charAt(textIndex);
        textIndex++;
    }
}

// Move to the next image when the button is clicked
function moveToNextImage() {
    // Check if the current image is the last one
    if (currentImageIndex === images.length - 1) {
        // Show the alert message
        alert("Every choice you made impacted your journey. Now that you have reached the end, you may choose to start over.");
        localStorage.setItem("stage3Completed", true); // Store stage completion
        window.location.href = "index.html";
        // Disable the button or hide it
        document.getElementById('next-button').disabled = true;
        return; // Stop the function from proceeding further
    }

    fadingOut = true; // Trigger fade-out
    textIndex = 0;
    textToShow = "";
}
