// Resources
let wood = 0;
let stone = 0;

// Buildings
let huts = 0;

// Update resources display
function updateResources() {
    document.getElementById('wood').textContent = wood;
    document.getElementById('stone').textContent = stone;
}

// Update buildings display
function updateBuildings() {
    document.getElementById('huts').textContent = huts;
}

// Collect wood
document.getElementById('collect-wood').addEventListener('click', () => {
    wood += 1; // Increase wood count
    updateResources();
});

// Collect stone
document.getElementById('collect-stone').addEventListener('click', () => {
    stone += 1; // Increase stone count
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
