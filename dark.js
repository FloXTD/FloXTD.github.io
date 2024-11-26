// Game state
let gameState = {
    currentScene: 'start',
};

// Story content
const story = {
    start: {
        text: "You wake up in a dimly lit room. The air is cold, and the smell of damp stone fills your nostrils. A faint light flickers in the distance. What will you do?",
        choices: [
            { text: "Explore the light", nextScene: "lightRoom" },
            { text: "Wait and observe", nextScene: "waitScene" },
        ],
    },
    lightRoom: {
        text: "You cautiously approach the flickering light. It comes from an old lantern hanging on a hook. Beneath it, you find a small key on a dusty table.",
        choices: [
            { text: "Take the key", nextScene: "keyTaken" },
            { text: "Leave the key and keep exploring", nextScene: "darkHallway" },
        ],
    },
    waitScene: {
        text: "You sit still and listen. Footsteps echo in the distance. They're getting closer. You have to make a decision.",
        choices: [
            { text: "Hide in the shadows", nextScene: "hide" },
            { text: "Confront the source of the footsteps", nextScene: "confront" },
        ],
    },
    keyTaken: {
        text: "You take the key and tuck it into your pocket. The lantern casts eerie shadows as you notice a door at the far end of the room.",
        choices: [
            { text: "Use the key to open the door", nextScene: "escape" },
            { text: "Ignore the door and keep searching", nextScene: "darkHallway" },
        ],
    },
    darkHallway: {
        text: "You walk deeper into the dark hallway. The air grows colder, and you hear whispers echoing from the walls. You feel uneasy.",
        choices: [
            { text: "Turn back", nextScene: "start" },
            { text: "Keep going", nextScene: "unknownFate" },
        ],
    },
    hide: {
        text: "You hide behind a stack of crates. The footsteps stop just outside the room, but you can feel the presence of someone—or something—watching.",
        choices: [
            { text: "Stay hidden", nextScene: "caught" },
            { text: "Make a run for it", nextScene: "run" },
        ],
    },
    confront: {
        text: "You stand your ground as the footsteps grow louder. A shadowy figure emerges, holding a dagger. It's a guard!",
        choices: [
            { text: "Fight the guard", nextScene: "fightGuard" },
            { text: "Surrender", nextScene: "captured" },
        ],
    },
    // Endings and other scenes
    escape: {
        text: "You unlock the door and step into the night. Freedom! But the dark place will always haunt you.",
        choices: [],
    },
    unknownFate: {
        text: "The whispers grow louder until they consume you. You were never seen again.",
        choices: [],
    },
    caught: {
        text: "A hand grabs you from the shadows. Your story ends here.",
        choices: [],
    },
    run: {
        text: "You bolt out of the room, your heart pounding. You've escaped, but you know danger still lurks.",
        choices: [],
    },
    fightGuard: {
        text: "You fight bravely and defeat the guard, but you're wounded. You stumble onward, unsure of what lies ahead.",
        choices: [],
    },
    captured: {
        text: "The guard binds your hands and drags you away. Your fate is sealed.",
        choices: [],
    },
};

// Render the current scene
function renderScene(sceneKey) {
    const scene = story[sceneKey];
    const storyText = document.getElementById("story-text");
    const choicesSection = document.getElementById("choices-section");

    // Update story text
    storyText.textContent = scene.text;

    // Clear previous choices
    choicesSection.innerHTML = "";

    // Render new choices
    scene.choices.forEach((choice) => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.className = "choice-button";
        button.onclick = () => makeChoice(choice.nextScene);
        choicesSection.appendChild(button);
    });

    // Update game state
    gameState.currentScene = sceneKey;
}

// Handle making a choice
function makeChoice(nextScene) {
    renderScene(nextScene);
}

// Initialize the game
renderScene(gameState.currentScene);
