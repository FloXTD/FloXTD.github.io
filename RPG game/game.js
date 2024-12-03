let player = {
    inventory: [],
};
let monster = {
    name: "Goblin",
    health: 100,
    strength: 20,
    intelligence: 5,
};

const races = { /* Same as before */ };
const classes = { /* Same as before */ };

//Starts the game
function startGame() {
    const race = document.getElementById("race-select").value;
    const name = document.getElementById("name-input").value.trim() || "Player";
    const playerClass = document.getElementById("class-select").value;

    // Configure player stats
    player = { ...races[race], name, race, class: playerClass, mana: races[race].intelligence };

    // Apply class bonuses
    const classData = classes[playerClass];
    player.health += classData.healthBonus || 0;
    player.strength += classData.strengthBonus || 0;
    player.stamina += classData.staminaBonus || 0;
    player.intelligence += classData.intelligenceBonus || 0;
    player.weapon = classData.weapon;

    // Update UI
    document.getElementById("setup-section").style.display = "none";
    document.getElementById("game-section").style.display = "block";
    updateStats();
    console.log("Game started with player:", player);
}


// Inventory functions
function addToInventory(item) {
    player.inventory.push(item);
    updateInventory();
}

function updateInventory() {
    const inventoryList = document.getElementById("inventory");
    inventoryList.innerHTML = "";
    player.inventory.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        inventoryList.appendChild(li);
    });
}

// Admin panel toggle function
function toggleAdmin() {
    const adminSection = document.getElementById("admin-section");
    if (adminSection.style.display === "none" || !adminSection.style.display) {
        adminSection.style.display = "block"; // Show admin panel
        console.log("Admin panel opened.");
    } else {
        adminSection.style.display = "none"; // Hide admin panel
        console.log("Admin panel closed.");
    }
}


function resetGame() {
    player = {};
    monster.health = 100;
    logBattle("Game has been reset.");
    location.reload();
}

function changeRaceClass() {
    player.race = prompt("Enter new race (human, orc, elf):", player.race) || player.race;
    player.class = prompt("Enter new class (warrior, rogue, mage):", player.class) || player.class;
    logBattle(`Player race changed to ${player.race} and class to ${player.class}.`);
    updateStats();
}

function spawnMonster() {
    const monsterName = prompt("Enter monster name:", "Goblin");
    monster.name = monsterName;
    monster.health = 100;
    logBattle(`${monsterName} has been spawned!`);
    updateStats();
}

// Existing functions like attack, run, etc., remain unchanged
function logBattle(message) {
    const log = document.getElementById("battle-entries");
    const entry = document.createElement("li");
    entry.textContent = message;
    log.appendChild(entry);
}
