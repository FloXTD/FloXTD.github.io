// Game state
const gameState = {
    resources: { wood: 0, stone: 0, food: 10, ores: 0, planks: 0, iron: 0, copper: 0, gold: 0 },
    villagers: 0,
    maxVillagers: 0,
    idleVillagers: 0,
    villagerJobs: { wood: 0, stone: 0, food: 0 },
    buildings: { houses: 0, lumberMill: false, quarry: false, smelter: false },
    tools: { pickaxe: false, saw: false },
    gatheredItems: 0, // Tracks how many items have been gathered
    gatherCooldown: false, // Tracks cooldown for manual gathering
};

// Update the UI with current game state
function updateUI() {
    document.getElementById("wood").textContent = gameState.resources.wood;
    document.getElementById("stone").textContent = gameState.resources.stone;
    document.getElementById("food").textContent = gameState.resources.food;
    document.getElementById("ores").textContent = gameState.resources.ores;
    document.getElementById("planks").textContent = gameState.resources.planks;
    document.getElementById("iron").textContent = gameState.resources.iron;
    document.getElementById("copper").textContent = gameState.resources.copper;
    document.getElementById("gold").textContent = gameState.resources.gold;
    document.getElementById("villagers").textContent = gameState.villagers;
    document.getElementById("max-villagers").textContent = gameState.maxVillagers;
    document.getElementById("idleVillagers").textContent = gameState.idleVillagers;
}

// Add a log message to the log section
function logMessage(message) {
    const log = document.getElementById("log-entries");
    const entry = document.createElement("li");
    entry.textContent = message;
    log.appendChild(entry);
}

// Manual gathering with cooldown
function gatherManually(resource) {
    if (gameState.gatherCooldown) {
        logMessage("You need to wait before gathering again!");
        return;
    }

    gameState.resources[resource] += 1;
    gameState.gatheredItems += 1;
    logMessage(`You gathered 1 ${resource}.`);
    checkFoodConsumption();

    gameState.gatherCooldown = true;
    setTimeout(() => {
        gameState.gatherCooldown = false;
    }, 1000); // 1-second cooldown

    updateUI();
}

// Check if food needs to be consumed
function checkFoodConsumption() {
    if (gameState.gatheredItems >= 10) {
        const totalFoodNeeded = gameState.villagers + 1;
        if (gameState.resources.food >= totalFoodNeeded) {
            gameState.resources.food -= totalFoodNeeded;
            logMessage(`Food consumed: ${totalFoodNeeded}`);
        } else {
            logMessage("Not enough food! Villagers starve.");
        }
        gameState.gatheredItems = 0; // Reset gathered item count
    }
}

// Assign a villager to a specific job
function assignVillager(job) {
    if (gameState.idleVillagers > 0) {
        gameState.idleVillagers--;
        gameState.villagerJobs[job]++;
        logMessage(`A villager is now gathering ${job}.`);
    } else {
        logMessage("No idle villagers available!");
    }
    updateUI();
}

// Villagers gather resources automatically (slower pace)
function gatherResources() {
    gameState.resources.wood += Math.floor(gameState.villagerJobs.wood / 2);
    gameState.resources.stone += Math.floor(gameState.villagerJobs.stone / 2);
    gameState.resources.food += Math.floor(gameState.villagerJobs.food / 2);

    if (gameState.buildings.quarry && gameState.tools.pickaxe) {
        gameState.resources.ores += Math.floor(gameState.villagerJobs.stone / 4); // Quarry uses stone gatherers
    }

    if (gameState.buildings.lumberMill && gameState.tools.saw) {
        gameState.resources.planks += Math.floor(gameState.villagerJobs.wood / 4); // Lumber mill uses wood gatherers
    }

    gameState.gatheredItems++;
    checkFoodConsumption();
    updateUI();
}

// Smelting ores into minerals
function smeltOre() {
    if (gameState.resources.ores > 0 && gameState.resources.planks >= 2) {
        gameState.resources.ores--;
        gameState.resources.planks -= 2;

        const roll = Math.random();
        if (roll < 0.6) {
            gameState.resources.iron++;
            logMessage("You smelted an ore into iron.");
        } else if (roll < 0.9) {
            gameState.resources.copper++;
            logMessage("You smelted an ore into copper.");
        } else {
            gameState.resources.gold++;
            logMessage("You smelted an ore into gold!");
        }
    } else {
        logMessage("Not enough ores or planks to smelt!");
    }
    updateUI();
}

// Build structures
function build(structure) {
    if (structure === "house" && gameState.resources.wood >= 50 && gameState.resources.stone >= 30) {
        gameState.resources.wood -= 50;
        gameState.resources.stone -= 30;
        gameState.buildings.houses++;
        gameState.maxVillagers += 2;
        logMessage("You built a house. (+2 max villagers)");
    } else if (structure === "lumberMill" && !gameState.buildings.lumberMill && gameState.resources.wood >= 100 && gameState.resources.stone >= 50) {
        gameState.resources.wood -= 100;
        gameState.resources.stone -= 50;
        gameState.buildings.lumberMill = true;
        logMessage("You built a lumber mill.");
    } else if (structure === "quarry" && !gameState.buildings.quarry && gameState.resources.wood >= 150 && gameState.resources.stone >= 100) {
        gameState.resources.wood -= 150;
        gameState.resources.stone -= 100;
        gameState.buildings.quarry = true;
        logMessage("You built a quarry.");
    } else if (structure === "smelter" && !gameState.buildings.smelter && gameState.resources.wood >= 200 && gameState.resources.stone >= 150) {
        gameState.resources.wood -= 200;
        gameState.resources.stone -= 150;
        gameState.buildings.smelter = true;
        logMessage("You built a smelter.");
    } else {
        logMessage("Not enough resources or building already exists!");
    }
    updateUI();
}

// Event listeners
document.getElementById("gatherWoodButton").addEventListener("click", () => gatherManually("wood"));
document.getElementById("gatherStoneButton").addEventListener("click", () => gatherManually("stone"));
document.getElementById("gatherFoodButton").addEventListener("click", () => gatherManually("food"));
document.getElementById("assignWoodButton").addEventListener("click", () => assignVillager("wood"));
document.getElementById("assignStoneButton").addEventListener("click", () => assignVillager("stone"));
document.getElementById("assignFoodButton").addEventListener("click", () => assignVillager("food"));
document.getElementById("buildHouseButton").addEventListener("click", () => build("house"));
document.getElementById("buildLumberMillButton").addEventListener("click", () => build("lumberMill"));
document.getElementById("buildQuarryButton").addEventListener("click", () => build("quarry"));
document.getElementById("buildSmelterButton").addEventListener("click", () => build("smelter"));
document.getElementById("smeltOreButton").addEventListener("click", smeltOre);

// Automated resource gathering every 2 seconds (slower pace)
setInterval(gatherResources, 2000);

// Initial UI update
updateUI();
