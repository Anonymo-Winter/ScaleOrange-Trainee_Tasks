const board = document.querySelector(".play-board");
const scoreElem = document.querySelector(".score");
const highScoreElem = document.querySelector(".high-score");
const playBtn = document.querySelector(".play-btn");
const pauseBtn = document.querySelector(".pause-btn");
const restartBtn = document.querySelector(".restart-btn");

let foodX, foodY, snakeX = 2, snakeY = 2;
let highscore = localStorage.getItem("highscore") || 0;
let score = 0, x = 0, y = 0, snakeBody = [], s, speed = 250;
let gameover = false, paused = false;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const updateHighScore = () => {
    highscore = score >= highscore ? score : highscore;
    localStorage.setItem("highscore", highscore);
    highScoreElem.innerHTML = `HighScore: ${highscore}`;
}

const Gameover = () => {
    clearInterval(s);
    board.innerHTML = `<div class="game-over">Game Over! Score: ${score}</div>`;
    restartBtn.style.display = "block";
}

const changeDirection = (e) => {
    if (paused || gameover) return;
    if (e.key === "ArrowUp" && y !== 1) {
        x = 0; y = -1;
    } else if (e.key === "ArrowDown" && y !== -1) {
        x = 0; y = 1;
    } else if (e.key === "ArrowLeft" && x !== 1) {
        x = -1; y = 0;
    } else if (e.key === "ArrowRight" && x !== -1) {
        x = 1; y = 0;
    }
}

const initGame = () => {
    if (gameover) return Gameover();
    if (paused) return;
    
    let htmlMarkup = `<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        score++;
        scoreElem.innerHTML = `Score: ${score}`;
        updateHighScore();
        snakeBody.push([foodX, foodY]);
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];
    
    snakeX += x;
    snakeY += y;

    if (snakeX <= 0 || snakeY >= 31 || snakeX >= 31 || snakeY <= 0) {
        gameover = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="snake" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
        if (i > 0 && snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]) {
            gameover = true;
        }
    }
    board.innerHTML = htmlMarkup;
}

const togglePause = () => {
    paused = !paused;
    if (paused) {
        clearInterval(s);
        pauseBtn.innerText = "Resume";
    } else {
        pauseBtn.innerText = "Pause";
        s = setInterval(initGame, speed);
    }
}

playBtn.addEventListener("click", () => {
    playBtn.style.display = "none";
    pauseBtn.style.display = "block";
    board.className = "play-board";
    s = setInterval(initGame, speed);
    document.addEventListener("keydown", changeDirection);
});

pauseBtn.addEventListener("click", togglePause);

restartBtn.addEventListener("click", () => {
    location.reload();
});

changeFoodPosition();
highScoreElem.innerHTML = `HighScore: ${highscore}`;
