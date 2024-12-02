// Game state
const gameState = {
    resources: { wood: 0, stone: 0, food: 10, ores: 0, planks: 0 },
    villagers: 0,
    maxVillagers: 0,
    idleVillagers: 0,
    villagerJobs: { wood: 0, stone: 0, food: 0 },
    buildings: { houses: 0, lumberMill: false, quarry: false },
    tools: { pickaxe: false, saw: false },
    actions: 0, // Tracks actions for food consumption
};

// Update the UI with current game state
function updateUI() {
    document.getElementById("wood").textContent = gameState.resources.wood;
    document.getElementById("stone").textContent = gameState.resources.stone;
    document.getElementById("food").textContent = gameState.resources.food;
    document.getElementById("ores").textContent = gameState.resources.ores;
    document.getElementById("planks").textContent = gameState.resources.planks;
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

// Manual gathering of resources
function gatherManually(resource) {
    gameState.resources[resource] += 1;
    logMessage(`You gathered 1 ${resource}.`);
    updateUI();
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

// Villagers gather resources automatically
function gatherResources() {
    gameState.resources.wood += gameState.villagerJobs.wood;
    gameState.resources.stone += gameState.villagerJobs.stone;
    gameState.resources.food += gameState.villagerJobs.food;

    if (gameState.buildings.quarry && gameState.tools.pickaxe) {
        gameState.resources.ores += 1; // Quarry produces ores with pickaxe
    }

    if (gameState.buildings.lumberMill && gameState.tools.saw) {
        gameState.resources.planks += 1; // Lumber mill produces planks with saw
    }

    gameState.actions++;
    checkFoodConsumption();
    updateUI();
}

// Handle food consumption every 20 actions
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
    } else {
        logMessage("Not enough resources or building already exists!");
    }
    updateUI();
}

// Buy tools
function buyTool(tool) {
    if (tool === "pickaxe" && !gameState.tools.pickaxe && gameState.resources.wood >= 20 && gameState.resources.stone >= 10) {
        gameState.resources.wood -= 20;
        gameState.resources.stone -= 10;
        gameState.tools.pickaxe = true;
        logMessage("You bought a pickaxe.");
    } else if (tool === "saw" && !gameState.tools.saw && gameState.resources.wood >= 20 && gameState.resources.stone >= 10) {
        gameState.resources.wood -= 20;
        gameState.resources.stone -= 10;
        gameState.tools.saw = true;
        logMessage("You bought a saw.");
    } else {
        logMessage("Not enough resources or tool already owned!");
    }
    updateUI();
}

// Hire villagers with food
function hireVillager() {
    if (gameState.resources.food >= 5 && gameState.villagers < gameState.maxVillagers) {
        gameState.resources.food -= 5;
        gameState.villagers++;
        gameState.idleVillagers++;
        logMessage("You hired a villager.");
    } else {
        logMessage("Not enough food or housing space!");
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
document.getElementById("hireVillagerButton").addEventListener("click", hireVillager);
document.getElementById("buyPickaxeButton").addEventListener("click", () => buyTool("pickaxe"));
document.getElementById("buySawButton").addEventListener("click", () => buyTool("saw"));

// Start automatic resource gathering every second
setInterval(gatherResources, 1000);

// Initial UI update
updateUI();
