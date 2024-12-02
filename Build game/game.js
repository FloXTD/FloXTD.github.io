// Resources
let wood = 0;
let stone = 0;
let food = 0;

// Buildings
let huts = 0;

// Villagers
let villagers = 0;
let unassignedVillagers = 0;

// Jobs
let woodcutters = 0;
let miners = 0;
let foodGatherers = 0;

// Costs
let hutCost = { wood: 10, stone: 5 };
let villagerCost = 15;

// Load saved game data
function loadGame() {
    const savedGame = JSON.parse(localStorage.getItem('villageBuilderSave'));
    if (savedGame) {
        wood = savedGame.wood || 0;
        stone = savedGame.stone || 0;
        food = savedGame.food || 0;
        huts = savedGame.huts || 0;
        villagers = savedGame.villagers || 0;
        unassignedVillagers = savedGame.unassignedVillagers || 0;
        woodcutters = savedGame.woodcutters || 0;
        miners = savedGame.miners || 0;
        foodGatherers = savedGame.foodGatherers || 0;
        hutCost = savedGame.hutCost || { wood: 10, stone: 5 };
        villagerCost = savedGame.villagerCost || 15;
    }
}

// Save game data
function saveGame() {
    const gameData = {
        wood,
        stone,
        food,
        huts,
        villagers,
        unassignedVillagers,
        woodcutters,
        miners,
        foodGatherers,
        hutCost,
        villagerCost,
    };
    localStorage.setItem('villageBuilderSave', JSON.stringify(gameData));
}

// Update resources display
function updateResources() {
    document.getElementById('wood').textContent = wood;
    document.getElementById('stone').textContent = stone;
    document.getElementById('food').textContent = food;
}

// Update buildings display
function updateBuildings() {
    document.getElementById('huts').textContent = huts;
    document.getElementById('hut-cost-wood').textContent = hutCost.wood;
    document.getElementById('hut-cost-stone').textContent = hutCost.stone;
}

// Update villagers display
function updateVillagers() {
    document.getElementById('villager-count').textContent = villagers;
    document.getElementById('villager-capacity').textContent = huts * 2; // Capacity = 2 villagers per hut
    document.getElementById('unassigned-villagers').textContent = unassignedVillagers;
    document.getElementById('villager-cost-food').textContent = villagerCost;
    document.getElementById('woodcutters').textContent = woodcutters;
    document.getElementById('miners').textContent = miners;
    document.getElementById('food-gatherers').textContent = foodGatherers;
}

// Manual gathering
document.getElementById('collect-wood').addEventListener('click', () => {
    wood += 1;
    updateResources();
    saveGame();
});

document.getElementById('collect-stone').addEventListener('click', () => {
    stone += 1;
    updateResources();
    saveGame();
});

document.getElementById('collect-food').addEventListener('click', () => {
    food += 1;
    updateResources();
    saveGame();
});

// Automatically gather resources
function gatherResources() {
    wood += woodcutters; // 1 resource per second per woodcutter
    stone += miners; // 1 resource per second per miner
    food += foodGatherers; // 1 resource per second per food gatherer
    updateResources();
    saveGame();
}

// Build hut
document.getElementById('build-hut').addEventListener('click', () => {
    if (wood >= hutCost.wood && stone >= hutCost.stone) {
        wood -= hutCost.wood;
        stone -= hutCost.stone;
        huts += 1;
        hutCost.wood += 5;
        hutCost.stone += 5;
        updateResources();
        updateBuildings();
        updateVillagers();
        saveGame();
    } else {
        alert('Not enough resources!');
    }
});

// Buy villager
document.getElementById('buy-villager').addEventListener('click', () => {
    const capacity = huts * 2;
    if (villagers < capacity) {
        if (food >= villagerCost) {
            food -= villagerCost;
            villagers += 1;
            unassignedVillagers += 1;
            villagerCost += 5;
            updateResources();
            updateVillagers();
            saveGame();
        } else {
            alert('Not enough food!');
        }
    } else {
        alert('Not enough hut capacity! Build more huts.');
    }
});

// Assign and unassign jobs
function assignJob(job) {
    if (unassignedVillagers > 0) {
        unassignedVillagers -= 1;
        if (job === 'woodcutter') woodcutters += 1;
        if (job === 'miner') miners += 1;
        if (job === 'foodGatherer') foodGatherers += 1;
        updateVillagers();
        saveGame();
    } else {
        alert('No unassigned villagers available!');
    }
}

function unassignJob(job) {
    if (job === 'woodcutter' && woodcutters > 0) woodcutters -= 1;
    if (job === 'miner' && miners > 0) miners -= 1;
    if (job === 'foodGatherer' && foodGatherers > 0) foodGatherers -= 1;
    unassignedVillagers += 1;
    updateVillagers();
    saveGame();
}

document.getElementById('assign-woodcutter').addEventListener('click', () => assignJob('woodcutter'));
document.getElementById('unassign-woodcutter').addEventListener('click', () => unassignJob('woodcutter'));

document.getElementById('assign-miner').addEventListener('click', () => assignJob('miner'));
document.getElementById('unassign-miner').addEventListener('click', () => unassignJob('miner'));

document.getElementById('assign-food-gatherer').addEventListener('click', () => assignJob('foodGatherer'));
document.getElementById('unassign-food-gatherer').addEventListener('click', () => unassignJob('foodGatherer'));

// Automatic resource collection interval
setInterval(gatherResources, 1000);

// Load the saved game when the page loads
loadGame();
updateResources();
updateBuildings();
updateVillagers();
