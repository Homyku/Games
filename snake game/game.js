let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

var gameSpeed = 100; 
var gameInterval = setInterval(moveSnake, gameSpeed);
var score = 0;
var scoreElement = document.getElementById("score");


var snake = {
  x: 20,
  y: 20,
  dx: 20,
  dy: 0,
  cells: []
};

var food = {
  x: 0,
  y: 0
};


function moveSnake(){

    // snake move 1cell
  snake.x += snake.dx;
  snake.y += snake.dy;

  //add actual position in the beggining of cells table
  snake.cells.unshift({ x: snake.x, y: snake.y });

  // delete last cell element
  if (snake.cells.length > 1) {
    snake.cells.pop();
  }

  // check if snake have eaten food
  if (snake.x === food.x && snake.y === food.y) {
    
    // generating new food 
    generateFood();

    // add new cells element
    snake.cells.push({});

    score+=10;
    scoreElement.innerHTML = "Score: " + score;  

    var sound = new Audio("leech.mp3");
    sound.play();

    gameSpeed -= 2;
    clearInterval(gameInterval);
    gameInterval = setInterval(moveSnake, gameSpeed);

  }


  // if snake crash into wall
  if (snake.x < 0 || snake.x > canvas.width - 20 || snake.y < 0 || snake.y > canvas.height - 20) {
    // stop the game
    clearInterval(gameInterval);
    alert("Game over! Your score is: " + score);
  }

  // check if snake eaten himself
  for (var i = 1; i < snake.cells.length; i++) {
    if (snake.x === snake.cells[i].x && snake.y === snake.cells[i].y) {
      // stop 
      clearInterval(gameInterval);
      alert("Game over! Your score is: " + score);
    }
  }

  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 20, 20);

  // draw snake
  ctx.fillStyle = "rgba(227, 61, 148, 1)";
  for (var i = 0; i < snake.cells.length; i++) {
    ctx.fillRect(snake.cells[i].x, snake.cells[i].y, 20, 20);
  }
}


function generateFood() {

    // random food position generator
  food.x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
  food.y = Math.floor(Math.random() * (canvas.height / 20)) * 20;

  // check if food isn't generated on snake body
  for (var i = 0; i < snake.cells.length; i++) {
    if (food.x === snake.cells[i].x && food.y === snake.cells[i].y) {
      // generate new food
      generateFood();
    }
  }
}


// keybord
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 37 && snake.dx === 0  ) {
      snake.dx = -20;
      snake.dy = 0;
    } else if (event.keyCode === 38 && snake.dy === 0) {
      snake.dx = 0;
      snake.dy = -20;
    } else if (event.keyCode === 39 && snake.dx === 0) {
      snake.dx = 20;
      snake.dy = 0;
    } else if (event.keyCode === 40 && snake.dy === 0) {
      snake.dx = 0;
      snake.dy = 20;
    }
  });


  generateFood(); 
  moveSnake(); 