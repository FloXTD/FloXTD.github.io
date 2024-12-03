let player = {};
let monster = {
    name: "Goblin",
    health: 100,
    strength: 20,
    intelligence: 5,
};

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

// NPC Dialogue and Start of the Game
function startCharacterCreation() {
    document.getElementById("npc-dialogue").innerText = "The stranger looks you up and down. 'Ah, a newcomer... Tell me, who are you?'";
    document.querySelector("button").style.display = "none"; // Hide Talk to NPC button

    setTimeout(function () {
        document.getElementById("npc-dialogue").innerText = "I can see the village is in danger. But before you go, tell me... who are you?";
        document.getElementById("setup-section").style.display = "block"; // Show character creation section
    }, 3000);
}

// Start the game with player choices
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

    document.getElementById("setup-section").style.display = "none";
    document.getElementById("game-section").style.display = "block";
    updateStats();
}

// Update player's and monster's stats on the page
function updateStats() {
    document.getElementById("player-name").innerText = player.name;
    document.getElementById("player-race").innerText = player.race;
    document.getElementById("player-class").innerText = player.class;
    document.getElementById("player-health").innerText = player.health;
    document.getElementById("player-stamina").innerText = player.stamina;
    document.getElementById("player-mana").innerText = player.mana;
    document.getElementById("player-strength").innerText = player.strength;
    document.getElementById("player-intelligence").innerText = player.intelligence;

    document.getElementById("monster-name").innerText = monster.name;
    document.getElementById("monster-health").innerText = monster.health;
}

// Attack function
function attack() {
    if (player.stamina >= 5) {
        let damage = Math.floor(Math.random() * player.strength) + 1;
        monster.health -= damage;
        player.stamina -= 5;
        logBattle(`${player.name} attacks with their ${player.weapon} for ${damage} damage!`);
        checkMonsterHealth();
        monsterAttack();
    } else {
        logBattle("Not enough stamina to attack.");
    }
    restoreStamina();
    updateStats();
}

// Run function
function run() {
    if (player.stamina >= 20) {
        player.stamina -= 20;
        logBattle(`${player.name} runs away!`);
    } else {
        logBattle("Not enough stamina to run!");
    }
    restoreStamina();
    updateStats();
}

// Cast Spell function
function castSpell() {
    document.getElementById("action-buttons").style.display = "none";
    document.getElementById("spell-choice").style.display = "block";
}

// Fireball spell
function castFireball() {
    if (player.mana >= 25) {
        let damage = Math.floor(Math.random() * 30) + 10;
        monster.health -= damage;
        player.mana -= 25;
        logBattle(`${player.name} casts Fireball for ${damage} damage!`);
        checkMonsterHealth();
    } else {
        logBattle("Not enough mana for Fireball.");
    }
    endSpellCast();
}

// Lightning Strike spell
function castLightningStrike() {
    if (player.mana >= 40) {
        let damage = Math.floor(Math.random() * 50) + 20;
        monster.health -= damage;
        player.mana -= 40;
        logBattle(`${player.name} casts Lightning Strike for ${damage} damage!`);
        checkMonsterHealth();
    } else {
        logBattle("Not enough mana for Lightning Strike.");
    }
    endSpellCast();
}

// End spell cast
function endSpellCast() {
    document.getElementById("action-buttons").style.display = "block";
    document.getElementById("spell-choice").style.display = "none";
    monsterAttack();
    restoreStamina();
    updateStats();
}

// Monster attack
function monsterAttack() {
    if (monster.health > 0) {
        let damage = Math.floor(Math.random() * monster.strength) + 1;
        player.health -= damage;
        logBattle(`${monster.name} attacks back for ${damage} damage!`);
    }
    if (player.health <= 0) {
        logBattle(`${player.name} has been defeated.`);
    }
}

// Check monster's health
function checkMonsterHealth() {
    if (monster.health <= 0) {
        logBattle(`${monster.name} has been defeated.`);
    }
}

// Restore stamina
function restoreStamina() {
    player.stamina = Math.min(player.stamina + 10, races[player.race].stamina);
}

// Log battle events
function logBattle(message) {
    const log = document.getElementById("battle-entries");
    const entry = document.createElement("li");
    entry.textContent = message;
    log.appendChild(entry);
}
