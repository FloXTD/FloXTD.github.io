// Get the canvas element and its context for drawing
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Get the start and reset buttons and the score element
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const scoreElement = document.getElementById('score');

// Define the size of the grid and the number of tiles
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// Initialize the snake, food, direction, score, and intervals
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 }];
let dx = 1, dy = 0;
let score = 0;
let gameInterval;
let aiInterval;

// Function to draw the snake on the canvas
function drawSnake() {
    ctx.fillStyle = 'lime';
    snake.forEach(part => {
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
    });
}

// Function to draw the food on the canvas
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Function to move the snake based on the current direction
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check if the snake has eaten the food
    if (head.x === food.x && head.y === food.y) {
        placeFood();
        score++;
        scoreElement.textContent = score;
    } else {
        snake.pop();
    }

    // Check for collisions with walls or itself
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount || snakeCollision(head)) {
        stopGame();
    }
}

// Function to check if the snake has collided with itself
function snakeCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) return true;
    }
    return false;
}

// Function to place the food at a random position
function placeFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
}

// Function to stop the game
function stopGame() {
    clearInterval(gameInterval);
    clearInterval(aiInterval);
}

// Function to reset the game
function resetGame() {
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

// Function to update the game state and redraw the game
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
    moveSnake();
}

// Function to control the AI movement of the snake
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

// Event listener for the start button to start the game
startButton.addEventListener('click', () => {
    resetGame(); // Initialize the game state
    clearInterval(gameInterval);
    clearInterval(aiInterval);
    gameInterval = setInterval(update, 100);
    aiInterval = setInterval(aiMove, 100);
});

// Event listener for the reset button to reset the game
resetButton.addEventListener('click', () => {
    stopGame();
    resetGame();
});

// Initial call to reset the game and draw the initial state
resetGame();
