// Game state
const gameState = {
    resources: { wood: 0, stone: 0, food: 0 },
    villagers: 0,
    maxVillagers: 0,
    buildings: { houses: 0, lumberMills: 0, quarries: 0 },
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
        logMessage("You built a lumber mill. (Automates wood gathering)");
        automateResource("wood", 2);
    } else if (structure === "quarry" && gameState.resources.wood >= 150 && gameState.resources.stone >= 100) {
        gameState.resources.wood -= 150;
        gameState.resources.stone -= 100;
        gameState.buildings.quarries++;
        logMessage("You built a quarry. (Automates stone gathering)");
        automateResource("stone", 2);
    } else {
        logMessage("Not enough resources to build that!");
    }
    updateUI();
}

// Automate resource gathering
function automateResource(resource, amountPerSecond) {
    setInterval(() => {
        gameState.resources[resource] += amountPerSecond;
        updateUI();
    }, 1000);
}

// Initial UI update
updateUI();
