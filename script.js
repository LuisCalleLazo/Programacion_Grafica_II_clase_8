const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: box * 5, y: box * 5 }]; 
let direction = { x: 0, y: 0 };
let food = spawnFood(); 
let score = 0; 


function spawnFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
}


document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && direction.y === 0) {
        direction = { x: 0, y: -box };
    } else if (e.key === "ArrowDown" && direction.y === 0) {
        direction = { x: 0, y: box };
    } else if (e.key === "ArrowLeft" && direction.x === 0) {
        direction = { x: -box, y: 0 };
    } else if (e.key === "ArrowRight" && direction.x === 0) {
        direction = { x: box, y: 0 };
    }
});


function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = spawnFood();
    } else {
        snake.pop(); 
    }

    
    snake.unshift(head);

    
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || collision(head)) {
        alert("¡Game Over! Tu puntuación: " + score);
        document.location.reload(); 
    }
}


function collision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibuja la comida
    ctx.fillStyle = "rgb(255, 99, 71)"; 
    ctx.fillRect(food.x, food.y, box, box);

    // Dibuja la serpiente
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "rgb(50, 205, 50)" : "rgb(34, 139, 34)"; 
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Dibuja la puntuación
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.font = "20px Arial";
    ctx.fillText("Puntuación: " + score, 10, 20);

    document.getElementById("score").innerText = score;
}



function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}

gameLoop();