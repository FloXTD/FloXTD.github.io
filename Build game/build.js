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
    gatherCooldown: { wood: false, stone: false, food: false },
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
    if (gameState.gatherCooldown[resource]) {
        logMessage(`You need to wait before gathering ${resource} again!`);
        return;
    }

    const amount = Math.floor(Math.random() * 6) + 5; // Random between 5 and 10
    gameState.resources[resource] += amount;
    gameState.gatheredItems += amount;
    logMessage(`You gathered ${amount} ${resource}.`);
    checkFoodConsumption();

    // Start cooldown
    gameState.gatherCooldown[resource] = true;
    startCooldown(resource, 7000); // 7 seconds cooldown

    updateUI();
}

// Start a cooldown for a resource
function startCooldown(resource, duration) {
    const progressBar = document.getElementById(`${resource}-progress`);
    progressBar.style.width = "0%";
    progressBar.style.display = "block";

    let elapsed = 0;
    const interval = 100; // Update every 100ms
    const timer = setInterval(() => {
        elapsed += interval;
        const percentage = (elapsed / duration) * 100;
        progressBar.style.width = `${percentage}%`;

        if (elapsed >= duration) {
            clearInterval(timer);
            gameState.gatherCooldown[resource] = false;
            progressBar.style.display = "none";
            logMessage(`You can now gather ${resource} again.`);
        }
    }, interval);
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

// Villagers gather resources automatically
function gatherResources() {
    gameState.resources.wood += Math.floor(gameState.villagerJobs.wood / 2);
    gameState.resources.stone += Math.floor(gameState.villagerJobs.stone / 2);
    gameState.resources.food += Math.floor(gameState.villagerJobs.food / 2);

    if (gameState.buildings.quarry && gameState.tools.pickaxe) {
        gameState.resources.ores += Math.floor(gameState.villagerJobs.stone / 4);
    }

    if (gameState.buildings.lumberMill && gameState.tools.saw) {
        gameState.resources.planks += Math.floor(gameState.villagerJobs.wood / 4);
    }

    gameState.gatheredItems++;
    checkFoodConsumption();
    updateUI();
}

// Event listeners
document.getElementById("gatherWoodButton").addEventListener("click", () => gatherManually("wood"));
document.getElementById("gatherStoneButton").addEventListener("click", () => gatherManually("stone"));
document.getElementById("gatherFoodButton").addEventListener("click", () => gatherManually("food"));

// Automated resource gathering every 2 seconds (slower pace)
setInterval(gatherResources, 2000);

// Initial UI update
updateUI();
