// Player and monster objects
let player = {};
let monster = {
    name: "Goblin",
    health: 100,
    strength: 20,
    intelligence: 5,
};

// Race and class configurations
const races = {
    human: { health: 100, stamina: 100, intelligence: 100, strength: 100, maxWeight: 300 },
    orc: { health: 120, stamina: 80, intelligence: 80, strength: 120, maxWeight: 500 },
    elf: { health: 80, stamina: 120, intelligence: 120, strength: 90, maxWeight: 250 },
};

const classes = {
    warrior: { healthBonus: 20, strengthBonus: 20, weapon: "Sword" },
    rogue: { staminaBonus: 20, intelligenceBonus: 10, weapon: "Dagger" },
    mage: { intelligenceBonus: 30, manaBonus: 50, weapon: "Staff" },
};

// Start the game by showing character creation
function startCharacterCreation() {
    document.getElementById("story-container").style.display = "none";
    document.getElementById("character-container").style.display = "block";
}

// Confirm character creation and start the game
function startGame() {
    const race = document.getElementById("race-select").value;
    const name = document.getElementById("name-input").value.trim() || "Player";
    const playerClass = document.getElementById("class-select").value;

    player = { ...races[race], name, race, class: playerClass, mana: races[race].intelligence };

    // Apply class bonuses
    const classData = classes[playerClass];
    player.health += classData.healthBonus || 0;
    player.strength += classData.strengthBonus || 0;
    player.stamina += classData.staminaBonus || 0;
    player.intelligence += classData.intelligenceBonus || 0;
    player.weapon = classData.weapon;

    document.getElementById("character-container").style.display = "none";
    document.getElementById("game-section").style.display = "block";

    startStory();
}

// Update the player's stats on the page
function updateStats() {
    document.getElementById("player-name").innerText = player.name;
    document.getElementById("player-race").innerText = player.race;
    document.getElementById("player-class").innerText = player.class;
    document.getElementById("player-health").innerText = player.health;
    document.getElementById("player-stamina").innerText = player.stamina;
    document.getElementById("player-mana").innerText = player.mana;
    document.getElementById("player-strength").innerText = player.strength;
    document.getElementById("player-intelligence").innerText = player.intelligence;
}

// Story sequence
function startStory() {
    let storyText = `
    <p>You are standing at the gates of the village, unsure of what lies ahead. The sky is overcast, and the air is thick with tension. A villager approaches you with a desperate look in his eyes.</p>
    <p>"Please, I need your help," the villager says. "My son, he... he went into the woods to hunt, but he never returned. The monsters, they must have gotten him. If you could, please help me find him... I just want to know what happened."</p>
    <p>The villager looks at you with pleading eyes, clearly devastated by the loss. He hands you a map of the area with a red X marking the place where his son was last seen. "If you find him, bring back whatever you can... even if it's just his belongings," he says.</p>
    <p>As you finish talking to the villager, you hear a loud, horrifying roar echo through the air. The ground shakes, and a strange feeling of dread fills the air. Suddenly, the ground trembles more violently as the villagers start shouting in panic.</p>
    <p>"They're here!" someone yells. "The monsters! The village is under attack!"</p>
    <p>The sound of war cries and the clashing of weapons fills the air. Everyone is running in different directions, desperate to find safety.</p>
    <p>As you realize the village is under attack, a goblin leaps from the shadows, its eyes glowing with malice. It swings at you, knocking your weapon from your hand, leaving you unarmed as it advances.</p>
    <p>You must act quickly!</p>
    `;

    document.getElementById("story").innerHTML = storyText;

    // Show action buttons
    document.getElementById("action-buttons").style.display = "block";
    updateStats();
}

// Action functions (attack, run, castSpell, etc.)
function attack() {
    // Check if the player has a weapon and perform the attack
    if (player.weapon) {
        let damage = Math.floor(Math.random() * player.strength) + 1;
        monster.health -= damage;
        console.log(`${player.name} attacks with ${player.weapon} for ${damage} damage!`);
    } else {
        console.log("You don't have a weapon!");
    }
    checkMonsterHealth();
}

function run() {
    // Implement run logic here
    console.log("Running away!");
}

function castSpell() {
    // Implement cast spell logic here
    console.log("Casting spell!");
}

// Check if the monster is defeated
function checkMonsterHealth() {
    if (monster.health <= 0) {
        console.log(`${monster.name} has been defeated.`);
        endBattle();
    }
}

// End battle and give the player their weapon back
function endBattle() {
    document.getElementById("story").innerHTML = `
    <p>You successfully defeat the goblin! After a few moments, the village seems to be safe, for now.</p>
    <p>As the fight ends, you find your weapon nearby and retrieve it.</p>
    <p>Your journey has just begun. Now, you must find the missing son of the villager and uncover the mystery of the attacks.</p>
    `;
    // Weapon is returned
    player.weapon = "Sword"; // Example, this would be the class weapon
    updateStats();
}
