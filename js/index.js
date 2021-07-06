

// game variables
let direction = { x: 0, y: 0 }
let foodSound = new Audio('music/mixkit-arcade-retro-changing-tab-206.wav');
let gameOverSound = new Audio('music/mixkit-wrong-answer-fail-notification-946.wav');
let moveSound = new Audio('music/mixkit-positive-interface-beep-221.wav');
let musicSound = new Audio('music/Free Game Loop.wav');
let speed = 7;
let lastPaintTime = 0;
let board = document.querySelector('.board');
let scoreContent = document.querySelector('#scoreBox');
let highScoreContent = document.querySelector('#highScore');
let snakeArray = [
    { x: 5, y: 9 }
]
let inputDir = { x: 0, y: 1 }
let food = { x: 6, y: 7 }
let highScoreVal=0;
let score=0;
//Game functions
musicSound.volume=0.2;
foodSound.volume=0.7;
gameOverSound.volume=0.8
const main = (ctime) => {

    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    // console.log(ctime);
};

function isCollide(snake) {
    // bump into tail
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //bump into wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    return false;
}
function gameEngine() {
    // 1 : Updating snake array * food
    if (isCollide(snakeArray)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 }
        alert("Game over! Press any key to play again");
        snakeArray = [{ x: 5, y: 9 }]
        musicSound.play();
       
        score = 0;
    }
    // If snake had eaten food, increment score and regenerate food;
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        foodSound.play();
        score++;
        if(score>highScore){
            highScoreVal=score
            localStorage.setItem('SNAKE_GAME_HIGH_SCORE',JSON.stringify(highScoreVal));
            highScoreContent.innerHTML = "High Score "+highScoreVal;
        }
        scoreContent.innerHTML = "Score " +score;
        snakeArray.unshift({ x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //Move snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        const element = snakeArray[i];
        snakeArray[i + 1] = { ...snakeArray[i] };
    }
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;
    //2 : Render snake and good


    board.innerHTML = '';
    snakeArray.forEach((e, i) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (i == 0) snakeElement.classList.add('head');
        else snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    });
    // food 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



//start main logic
let highScore = localStorage.getItem('SNAKE_GAME_HIGH_SCORE');
if(highScore===null){
    highScoreVal=0;
    localStorage.setItem('SNAKE_GAME_HIGH_SCORE',JSON.stringify(highScoreVal));
}else{
    highScoreVal = JSON.parse(highScore)
    highScoreContent.innerHTML = "High score : "+highScore
}
window.requestAnimationFrame(main);


window.addEventListener('keydown', (e) => {
    inputDir = { x: 0, y: 1 }//start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
})