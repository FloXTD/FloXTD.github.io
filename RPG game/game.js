let gameState = {
    inStory: true,
    storyIndex: 0,
    player: {
        name: "Hero",
        health: 100,
        mana: 50,
        stamina: 75,
        inventory: [],
    },
};

// Array of story events
const storyEvents = [
    "Welcome to the world of Eldoria. Your journey begins in a small village.",
    "A villager approaches you, looking distressed. 'Please help me find my son! He wandered into the forest...'",
    "You introduce yourself. Choose your name, race, and class to prepare for your journey.",
    "Before you can decide what to do, a dark shadow looms over the village. The Corruption Entity appears, radiating malevolent energy.",
    "The villagers scream in fear as goblins storm into the village. One leaps at you, disarming you!",
    "It's time to fight the goblin barehanded!"
];

// Function to progress through the story
function nextStory() {
    const storyText = document.getElementById("story-text");
    const storyOptions = document.getElementById("story-options");

    if (gameState.storyIndex < storyEvents.length) {
        storyText.textContent = storyEvents[gameState.storyIndex];
        gameState.storyIndex++;

        if (gameState.storyIndex === 3) {
            // Transition to character creation
            storyOptions.innerHTML = `
                <button onclick="chooseCharacter()">Create Character</button>`;
        } else if (gameState.storyIndex === storyEvents.length) {
            // Transition to combat
            storyOptions.innerHTML = `
                <button onclick="startCombat()">Prepare for Combat</button>`;
        }
    }
}

// Function to handle character creation
function chooseCharacter() {
    const name = prompt("Enter your name:", "Hero");
    const race = prompt("Choose your race (Human, Elf, Orc):", "Human");
    const playerClass = prompt("Choose your class (Warrior, Mage, Rogue):", "Warrior");

    gameState.player.name = name || "Hero";
    gameState.player.race = race || "Human";
    gameState.player.class = playerClass || "Warrior";

    alert(`You are ${gameState.player.name}, a ${gameState.player.race} ${gameState.player.class}.`);

    nextStory();
}

// Function to start combat
function startCombat() {
    document.getElementById("story-container").style.display = "none";
    document.getElementById("game-container").style.display = "flex";

    updateStats();
}

// Function to update player stats in the stats section
function updateStats() {
    const { name, health, mana, stamina, inventory } = gameState.player;

    document.getElementById("player-name").textContent = name;
    document.getElementById("player-health").textContent = health;
    document.getElementById("player-mana").textContent = mana;
    document.getElementById("player-stamina").textContent = stamina;

    const inventoryList = document.getElementById("inventory-list");
    inventoryList.innerHTML = inventory.map((item) => `<li>${item}</li>`).join("") || "<li>Empty</li>";
}

// Combat functions
function attack() {
    alert("You attack the goblin barehanded!");
    gameState.player.health -= 10; // Goblin counter-attack
    updateStats();
}

function castSpell() {
    if (gameState.player.mana < 10) {
        alert("Not enough mana!");
        return;
    }
    alert("You cast a spell!");
    gameState.player.mana -= 10;
    updateStats();
}

function run() {
    alert("You run away, but the goblin gives chase!");
    gameState.player.stamina -= 10;
    updateStats();
}
