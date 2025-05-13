const canvas = document.getElementById('snake-canvas');
const ctx = canvas.getContext('2d');
const logDiv = document.getElementById('learning-log');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake, food, direction, running, interval, score, steps, bestScore, learningLog;

function resetGame() {
    snake = [{x: 10, y: 10}];
    direction = {x: 0, y: -1};
    placeFood();
    running = false;
    score = 0;
    steps = 0;
    if (!bestScore) bestScore = 0;
    learningLog = [];
    draw();
    updateLog("Game reset. AI ready to start learning!");
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
}

function draw() {
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = "#4caf50";
    snake.forEach((s, i) => {
        ctx.fillRect(s.x * gridSize, s.y * gridSize, gridSize-2, gridSize-2);
    });

    // Draw food
    ctx.fillStyle = "#ff5252";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize-2, gridSize-2);

    // Draw score
    ctx.fillStyle = "#fff";
    ctx.font = "16px Arial";
    ctx.fillText("Score: " + score + "  Best: " + bestScore, 10, 20);
}

function updateLog(msg) {
    learningLog.push(msg);
    if (learningLog.length > 10) learningLog.shift();
    logDiv.innerHTML = learningLog.map(m => `<div>${m}</div>`).join('');
}

function aiMove() {
    // Simple greedy AI: move towards food, avoid collisions
    let head = snake[0];
    let options = [
        {x: 0, y: -1, name: "Up"},
        {x: 0, y: 1, name: "Down"},
        {x: -1, y: 0, name: "Left"},
        {x: 1, y: 0, name: "Right"}
    ];
    // Prefer direction that brings closer to food
    options.sort((a, b) => {
        let da = Math.abs(head.x + a.x - food.x) + Math.abs(head.y + a.y - food.y);
        let db = Math.abs(head.x + b.x - food.x) + Math.abs(head.y + b.y - food.y);
        return da - db;
    });
    // Try each option, pick first that doesn't collide
    for (let opt of options) {
        let nx = head.x + opt.x;
        let ny = head.y + opt.y;
        if (nx < 0 || ny < 0 || nx >= tileCount || ny >= tileCount) continue;
        if (snake.some(s => s.x === nx && s.y === ny)) continue;
        direction = {x: opt.x, y: opt.y};
        updateLog(`Step ${steps}: AI moves ${opt.name}`);
        return;
    }
    // No safe move, keep current direction (will crash)
    updateLog(`Step ${steps}: AI has no safe moves!`);
}

function gameLoop() {
    if (!running) return;
    steps++;
    aiMove();

    let head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

    // Check collision
    if (
        head.x < 0 || head.y < 0 ||
        head.x >= tileCount || head.y >= tileCount ||
        snake.some(s => s.x === head.x && s.y === head.y)
    ) {
        running = false;
        bestScore = Math.max(score, bestScore);
        updateLog(`Game over! Final score: ${score}. Best: ${bestScore}`);
        draw();
        return;
    }

    snake.unshift(head);

    // Eat food
    if (head.x === food.x && head.y === food.y) {
        score++;
        updateLog(`Step ${steps}: AI eats food! Score: ${score}`);
        placeFood();
    } else {
        snake.pop();
    }

    draw();
    setTimeout(gameLoop, 80);
}

function startGame() {
    if (running) return;
    running = true;
    updateLog("AI starts playing...");
    gameLoop();
}

function pauseGame() {
    running = false;
    updateLog("AI paused.");
}

resetGame();
