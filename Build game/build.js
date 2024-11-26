// Game state
const gameState = {
    resources: { wood: 0, stone: 0, food: 10 },
    villagers: 0,
    maxVillagers: 0,
    buildings: { houses: 0, lumberMills: 0, quarries: 0 },
    actions: 0, // Counts actions for food consumption
};

// Update UI
function updateUI() {
    document.getElementById("wood").textContent = gameState.resources.wood;
    document.getElementById("stone").textContent = gameState.resources.stone;
    document.getElementById("food").textContent = gameState.resources.food;
    document.getElementById("villagers").textContent = gameState.villagers;
    document.getElementById("max-villagers").textContent = gameState.maxVillagers;
}

// Log message
function logMessage(message) {
    const log = document.getElementById("log-entries");
    const entry = document.createElement("li");
    entry.textContent = message;
    log.appendChild(entry);
}

// Gather resource
function gatherResource(resource) {
    gameState.resources[resource]++;
    logMessage(`You gathered 1 ${resource}.`);
    gameState.actions++;
    checkFoodConsumption();
    updateUI();
}

// Build structure
function build(structure) {
    if (structure === "house" && gameState.resources.wood >= 50 && gameState.resources.stone >= 30) {
        gameState.resources.wood -= 50;
        gameState.resources.stone -= 30;
        gameState.buildings.houses++;
        gameState.maxVillagers += 2;
        logMessage("You built a house. (+2 max villagers)");
    } else if (structure === "lumberMill" && gameState.resources.wood >= 100 && gameState.resources.stone >= 50) {
        gameState.resources.wood -= 100;
        gameState.resources.stone -= 50;
        gameState.buildings.lumberMills++;
        logMessage("You built a lumber mill.");
    } else if (structure === "quarry" && gameState.resources.wood >= 150 && gameState.resources.stone >= 100) {
        gameState.resources.wood -= 150;
        gameState.resources.stone -= 100;
        gameState.buildings.quarries++;
        logMessage("You built a quarry.");
    } else {
        logMessage("Not enough resources to build that!");
    }
    updateUI();
}

// Food consumption
function checkFoodConsumption() {
    if (gameState.actions >= 20) {
        const totalFoodNeeded = 1 + gameState.villagers;
        if (gameState.resources.food >= totalFoodNeeded) {
            gameState.resources.food -= totalFoodNeeded;
            logMessage(`Food consumed: ${totalFoodNeeded}`);
        } else {
            logMessage("Not enough food! Villagers starve.");
        }
        gameState.actions = 0; // Reset actions
    }
}

// Buy a villager
function buyVillager() {
    if (gameState.resources.food >= 5 && gameState.villagers < gameState.maxVillagers) {
        gameState.resources.food -= 5;
        gameState.villagers++;
        logMessage("You hired a villager.");
    } else {
        logMessage("Not enough food or housing space!");
    }
    updateUI();
}

// Initial UI update
updateUI();
