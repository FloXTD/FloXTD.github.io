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

// Update resources display
function updateResources() {
    document.getElementById('wood').textContent = wood;
    document.getElementById('stone').textContent = stone;
    document.getElementById('food').textContent = food;
}

// Update buildings display
function updateBuildings() {
    document.getElementById('huts').textContent = huts;
}

// Update villagers display
function updateVillagers() {
    document.getElementById('villager-count').textContent = villagers;
    document.getElementById('unassigned-villagers').textContent = unassignedVillagers;
    document.getElementById('woodcutters').textContent = woodcutters;
    document.getElementById('miners').textContent = miners;
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
    food += 1; // Increase food count
    updateResources();
});

// Build hut
document.getElementById('build-hut').addEventListener('click', () => {
    const woodCost = 10;
    const stoneCost = 5;

    // Check if enough resources
    if (wood >= woodCost && stone >= stoneCost) {
        wood -= woodCost;  // Deduct wood cost
        stone -= stoneCost;  // Deduct stone cost
        huts += 1;  // Increase hut count
        updateResources();
        updateBuildings();
    } else {
        alert('Not enough resources!');
    }
});

// Buy villager
document.getElementById('buy-villager').addEventListener('click', () => {
    const foodCost = 15;

    // Check if enough food
    if (food >= foodCost) {
        food -= foodCost;  // Deduct food cost
        villagers += 1;  // Increase villager count
        unassignedVillagers += 1; // New villager is unassigned
        updateResources();
        updateVillagers();
    } else {
        alert('Not enough food!');
    }
});

// Assign woodcutter job
document.getElementById('assign-woodcutter').addEventListener('click', () => {
    if (unassignedVillagers > 0) {
        unassignedVillagers -= 1;
        woodcutters += 1;
        updateVillagers();
    } else {
        alert('No unassigned villagers available!');
    }
});

// Assign miner job
document.getElementById('assign-miner').addEventListener('click', () => {
    if (unassignedVillagers > 0) {
        unassignedVillagers -= 1;
        miners += 1;
        updateVillagers();
    } else {
        alert('No unassigned villagers available!');
    }
});
