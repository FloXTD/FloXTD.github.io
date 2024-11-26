// Player and monster objects
let player = {};
let monster = {
    name: "Goblin",
    health: 100,
    strength: 20,
    intelligence: 5,
};

// Race and class configurations
const races = {
    human: { health: 100, stamina: 100, intelligence: 100, strength: 100, maxWeight: 300 },
    orc: { health: 120, stamina: 80, intelligence: 80, strength: 120, maxWeight: 500 },
    elf: { health: 80, stamina: 120, intelligence: 120, strength: 90, maxWeight: 250 },
};

const classes = {
    warrior: { healthBonus: 20, strengthBonus: 20, weapon: "Sword" },
    rogue: { staminaBonus: 20, intelligenceBonus: 10, weapon: "Dagger" },
    mage: { intelligenceBonus: 30, manaBonus: 50, weapon: "Staff" },
};

// Game setup
function startGame() {
    const race = document.getElementById("race-select").value;
    const name = document.getElementById("name-input").value.trim() || "Player";
    const playerClass = document.getElementById("class-select").value;

    player = { ...races[race], name, race, class: playerClass, mana: races[race].intelligence };

    // Apply class bonuses
    const classData = classes[playerClass];
    player.health += classData.healthBonus || 0;
    player.strength += classData.strengthBonus || 0;
    player.stamina += classData.staminaBonus || 0;
    player.intelligence += classData.intelligenceBonus || 0;
    player.weapon = classData.weapon;

    document.getElementById("setup-section").style.display = "none";
    document.getElementById("game-section").style.display = "block";
    updateStats();
}

// Update the player's and monster's stats on the page
function updateStats() {
    document.getElementById("player-name").innerText = player.name;
    document.getElementById("player-race").innerText = player.race;
    document.getElementById("player-class").innerText = player.class;
    document.getElementById("player-health").innerText = player.health;
    document.getElementById("player-stamina").innerText = player.stamina;
    document.getElementById("player-mana").innerText = player.mana;
    document.getElementById("player-strength").innerText = player.strength;
    document.getElementById("player-intelligence").innerText = player.intelligence;

    document.getElementById("monster-name").innerText = monster.name;
    document.getElementById("monster-health").innerText = monster.health;
}

// Attack function
function attack() {
    if (player.stamina >= 5) {
        let damage = Math.floor(Math.random() * player.strength) + 1;
        monster.health -= damage;
        player.stamina -= 5;
        logBattle(`${player.name} attacks with their ${player.weapon} for ${damage} damage!`);
        checkMonsterHealth();
    } else {
        logBattle("Not enough stamina to attack.");
    }
    updateStats();
}

// Run function
function run() {
    if (player.stamina >= 20) {
        player.stamina -= 20;
        logBattle(`${player.name} runs away!`);
    } else {
        logBattle("Not enough stamina to run!");
    }
    updateStats();
}

// Log battle actions
function logBattle(message) {
    const battleLog = document.getElementById("battle-entries");
    const logEntry = document.createElement("li");
    logEntry.innerText = message;
    battleLog.appendChild(logEntry);
}

// Check monster health
function checkMonsterHealth() {
    if (monster.health <= 0) {
        logBattle(`${monster.name} has been defeated!`);
    }
}

// Initialize game
updateStats();
