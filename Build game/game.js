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

// Collect wood
document.getElementById('collect-wood').addEventListener('click', () => {
    wood += 1 + woodcutters; // Woodcutters add extra wood
    updateResources();
});

// Collect stone
document.getElementById('collect-stone').addEventListener('click', () => {
    stone += 1 + miners; // Miners add extra stone
    updateResources();
});

// Gather food
document.getElementById('collect-food').addEventListener('click', () => {
    food += 1 + foodGatherers; // Food gatherers add extra food
    updateResources();
});

// Build hut
document.getElementById('build-hut').addEventListener('click', () => {
    if (wood >= hutCost.wood && stone >= hutCost.stone) {
        wood -= hutCost.wood;
        stone -= hutCost.stone;
        huts += 1;
        hutCost.wood += 5; // Increase hut wood cost
        hutCost.stone += 5; // Increase hut stone cost
        updateResources();
        updateBuildings();
        updateVillagers();
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
            villagerCost += 5; // Increase villager food cost
            updateResources();
            updateVillagers();
        } else {
            alert('Not enough food!');
        }
    } else {
        alert('Not enough hut capacity! Build more huts.');
    }
});

// Assign woodcutter
document.getElementById('assign-woodcutter').addEventListener('click', () => {
    if (unassignedVillagers > 0) {
        unassignedVillagers -= 1;
        woodcutters += 1;
        updateVillagers();
    } else {
        alert('No unassigned villagers available!');
    }
});

// Assign miner
document.getElementById('assign-miner').addEventListener('click', () => {
    if (unassignedVillagers > 0) {
        unassignedVillagers -= 1;
        miners += 1;
        updateVillagers();
    } else {
        alert('No unassigned villagers available!');
    }
});

// Assign food gatherer
document.getElementById('assign-food-gatherer').addEventListener('click', () => {
    if (unassignedVillagers > 0) {
        unassignedVillagers -= 1;
        foodGatherers += 1;
        updateVillagers();
    } else {
        alert('No unassigned villagers available!');
    }
});
