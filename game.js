// Game object to store player and monster information
let player = {
    name: "Player's Name",
    health: 100,
    stamina: 100,
    mana: 100,
    strength: 100,
    intelligence: 100,
    maxWeight: 300, // Example weight limit for Human
};

let monster = {
    name: "Goblin",
    health: 100,
};

// Function to log battle events
function logBattle(message) {
    const battleLog = document.getElementById("battle-entries");
    const logEntry = document.createElement("li");
    logEntry.innerText = message;
    battleLog.appendChild(logEntry);
}

// Attack function
function attack() {
    if (player.stamina >= 5) {
        let damage = Math.floor(Math.random() * player.strength) + 1;
        player.stamina -= 5;
        monster.health -= damage;
        logBattle(`${player.name} attacks for ${damage} damage!`);
        updateStats();
    } else {
        logBattle("Not enough stamina to attack.");
    }
}

// Run function
function run() {
    if (player.stamina >= 20) {
        player.stamina -= 20;
        logBattle(`${player.name} runs away!`);
        // Implement escape logic or consequences here
        updateStats();
    } else {
        logBattle("Not enough stamina to run!");
    }
}

// Cast spell function
function castSpell() {
    if (player.mana >= 10) {
        player.mana -= 10;
        logBattle(`${player.name} casts a spell!`);
        // Implement spell effects here
        updateStats();
    } else {
        logBattle("Not enough mana to cast spell!");
    }
}

// Update the player stats displayed on the page
function updateStats() {
    document.getElementById("player-name").innerText = player.name;
    document.getElementById("player-health").innerText = player.health;
    document.getElementById("player-stamina").innerText = player.stamina;
    document.getElementById("player-mana").innerText = player.mana;
    document.getElementById("player-strength").innerText = player.strength;
    document.getElementById("player-intelligence").innerText = player.intelligence;
}

// Initialize player and monster stats
updateStats();
