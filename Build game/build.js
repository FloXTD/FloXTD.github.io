// Global variables for resources and cooldowns
let wood = 0, stone = 0, food = 10, ores = 0, planks = 0;
let iron = 0, copper = 0, gold = 0;
let villagers = 0, idleVillagers = 0, maxVillagers = 0;
let woodCooldown = 0, stoneCooldown = 0, foodCooldown = 0;
let cookingCooldown = 0;

// Update displayed resources
function updateResources() {
    document.getElementById('wood').innerText = wood;
    document.getElementById('stone').innerText = stone;
    document.getElementById('food').innerText = food;
    document.getElementById('ores').innerText = ores;
    document.getElementById('planks').innerText = planks;
    document.getElementById('iron').innerText = iron;
    document.getElementById('copper').innerText = copper;
    document.getElementById('gold').innerText = gold;
    document.getElementById('villagers').innerText = villagers;
    document.getElementById('max-villagers').innerText = maxVillagers;
    document.getElementById('idleVillagers').innerText = idleVillagers;
}

// Function to gather resources manually
function gatherResource(type) {
    if (type === 'wood') {
        if (woodCooldown === 0) {
            let gatheredWood = Math.floor(Math.random() * 6) + 5; // Gather 5-10 wood
            wood += gatheredWood;
            updateResources();
            showCooldown('wood', 7);
        }
    } else if (type === 'stone') {
        if (stoneCooldown === 0) {
            let gatheredStone = Math.floor(Math.random() * 6) + 5; // Gather 5-10 stone
            stone += gatheredStone;
            updateResources();
            showCooldown('stone', 7);
        }
    } else if (type === 'food') {
        if (foodCooldown === 0) {
            let gatheredFood = Math.floor(Math.random() * 3) + 1; // Gather 1-3 food
            food += gatheredFood;
            updateResources();
            showCooldown('food', 7);
        }
    }
}

// Function to display cooldown progress bar
function showCooldown(type, time) {
    let progressBar = document.getElementById(`${type}-progress`);
    let progressContainer = progressBar.parentElement;
    progressContainer.style.display = 'block';

    let timeRemaining = time;
    let interval = setInterval(function() {
        timeRemaining--;
        progressBar.style.width = `${(1 - timeRemaining / time) * 100}%`;
        if (timeRemaining <= 0) {
            clearInterval(interval);
            progressContainer.style.display = 'none';
            if (type === 'wood') woodCooldown = 0;
            if (type === 'stone') stoneCooldown = 0;
            if (type === 'food') foodCooldown = 0;
        }
    }, 1000);

    if (type === 'wood') woodCooldown = time;
    if (type === 'stone') stoneCooldown = time;
    if (type === 'food') foodCooldown = time;
}

// Assign villagers to gather resources
function assignVillagerToGather(type) {
    if (idleVillagers > 0) {
        if (type === 'wood') {
            idleVillagers--;
            let gatheredWood = Math.floor(Math.random() * 6) + 5; // Gather 5-10 wood
            wood += gatheredWood;
            updateResources();
        } else if (type === 'stone') {
            idleVillagers--;
            let gatheredStone = Math.floor(Math.random() * 6) + 5; // Gather 5-10 stone
            stone += gatheredStone;
            updateResources();
        } else if (type === 'food') {
            idleVillagers--;
            let gatheredFood = Math.floor(Math.random() * 3) + 1; // Gather 1-3 food
            food += gatheredFood;
            updateResources();
        }
    }
}

// Ore cooking function
function cookOre() {
    if (ores > 0 && planks >= 2) {
        ores--;
        planks -= 2;
        updateResources();
        showCooldown('cooking', 5);

        // Random chance to get iron, copper, or gold
        setTimeout(function() {
            let result = Math.random();
            if (result < 0.33) iron++;
            else if (result < 0.66) copper++;
            else gold++;
            updateResources();
        }, 5000);
    }
}

// Building purchase functions
function buyBuilding(type) {
    if (type === 'quarry') {
        if (wood >= 10 && stone >= 10) {
            wood -= 10;
            stone -= 10;
            ores += 5; // You can now gather ores
            updateResources();
            alert('You have purchased a Quarry!');
        }
    } else if (type === 'lumberMill') {
        if (wood >= 15 && stone >= 15) {
            wood -= 15;
            stone -= 15;
            planks += 5; // You can now gather planks
            updateResources();
            alert('You have purchased a Lumber Mill!');
        }
    } else if (type === 'cooker') {
        if (wood >= 20 && stone >= 10) {
            wood -= 20;
            stone -= 10;
            updateResources();
            alert('You have built an Ore Cooker!');
        }
    } else if (type === 'house') {
        if (wood >= 30 && stone >= 15) {
            wood -= 30;
            stone -= 15;
            villagers += 1;
            maxVillagers += 2; // Increase the number of max villagers
            idleVillagers++; // Add a new idle villager
            updateResources();
            alert('You have built a House!');
        }
    }
}

// Event listeners for buttons
document.getElementById('gatherWoodButton').addEventListener('click', function() {
    gatherResource('wood');
});
document.getElementById('gatherStoneButton').addEventListener('click', function() {
    gatherResource('stone');
});
document.getElementById('gatherFoodButton').addEventListener('click', function() {
    gatherResource('food');
});

// Assign villagers to gather resources
document.getElementById('assignVillagerWoodButton').addEventListener('click', function() {
    assignVillagerToGather('wood');
});
document.getElementById('assignVillagerStoneButton').addEventListener('click', function() {
    assignVillagerToGather('stone');
});
document.getElementById('assignVillagerFoodButton').addEventListener('click', function() {
    assignVillagerToGather('food');
});

// Building purchase buttons
document.getElementById('buyQuarryButton').addEventListener('click', function() {
    buyBuilding('quarry');
});
document.getElementById('buyLumberMillButton').addEventListener('click', function() {
    buyBuilding('lumberMill');
});
document.getElementById('buildCookerButton').addEventListener('click', function() {
    buyBuilding('cooker');
});
document.getElementById('buildHouseButton').addEventListener('click', function() {
    buyBuilding('house');
});

// Ore cooking
document.getElementById('cookOreButton').addEventListener('click', function() {
    cookOre();
});

// Initialize game
updateResources();
