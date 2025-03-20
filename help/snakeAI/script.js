const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const scoreElement = document.getElementById('score');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 1, dy = 0;
let score = 0;
let gameInterval;
let aiInterval;

function drawSnake() {
    ctx.fillStyle = 'lime';
    snake.forEach(part => {
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        placeFood();
        score++;
        scoreElement.textContent = score;
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount || snakeCollision(head)) {
        resetGame();
    }
}

function snakeCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) return true;
    }
    return false;
}

function placeFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
}

function resetGame() {
    clearInterval(gameInterval);
    clearInterval(aiInterval);
    snake = [{ x: 10, y: 10 }];
    dx = 1;
    dy = 0;
    score = 0;
    scoreElement.textContent = score;
    placeFood();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
    moveSnake();
}

function aiMove() {
    const head = snake[0];
    if (food.x > head.x) {
        dx = 1;
        dy = 0;
    } else if (food.x < head.x) {
        dx = -1;
        dy = 0;
    } else if (food.y > head.y) {
        dx = 0;
        dy = 1;
    } else if (food.y < head.y) {
        dx = 0;
        dy = -1;
    }
}

startButton.addEventListener('click', () => {
    clearInterval(gameInterval);
    clearInterval(aiInterval);
    gameInterval = setInterval(update, 100);
    aiInterval = setInterval(aiMove, 100);
});

resetButton.addEventListener('click', () => {
    resetGame();
});
