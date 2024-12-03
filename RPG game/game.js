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

// Game setup
function startGame() {
    const race = document.getElementById("race-select").value;
    const name = document.getElementById("name-input").value.trim() || "Player";
    const playerClass = document.getElementById("class-select").value;

    player = { ...races[race], name, race, class: playerClass, mana: races[race].intelligence, inventory: [] };
    const classData = classes[playerClass];
    Object.keys(classData).forEach(key => {
        if (key.endsWith("Bonus")) player[key.replace("Bonus", "")] += classData[key];
    });

    player.weapon = classData.weapon;
    document.getElementById("setup-section").style.display = "none";
    document.getElementById("game-section").style.display = "block";
    updateStats();
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

// Admin panel
function toggleAdmin() {
    const adminSection = document.getElementById("admin-section");
    adminSection.style.display = adminSection.style.display === "none" ? "block" : "none";
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
