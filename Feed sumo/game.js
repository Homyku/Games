// Variables for the game
var canvas;
var canvasContext;
var playerX = 200;
var playerY = 520;
var playerSpeed = 20;
var foodX = 100;
var foodY = 0;
var foodSpeed = 2;
var gameRunning = false;
var score = 0;
var life = 3;

var pointSound = new Audio('eating.wav');
pointSound.volume = 0.3;

var badSound = new Audio('ohno.mp3');
badSound.volume = 0.3;

var booSound = new Audio('boo.mp3');
booSound.volume=0.3;

// Function to start the game
function startGame() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  gameRunning = true;
  moveObjects();
}

// Function to move the player and enemy objects
function moveObjects() {
  // Clear the canvas
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  
  // Move the player
  if (playerX < 0) {
    playerX = 0;
  }
  if (playerX > canvas.width - 50) {
    playerX = canvas.width - 50;
  }
  drawPlayer();
  
  // Move the enemy
  if (foodY > canvas.height) {
    foodX = Math.floor(Math.random() * (canvas.width-25));
    foodY = 0;
    
   } // Increment the score when the enemy goes off the screen
  
  else {
    foodY += foodSpeed;
  }
  drawEnemy();


  
  // Check for collisions
if (playerX < foodX + 50 && playerX + 50 > foodX && playerY < foodY + 50 && playerY + 50 > foodY) {
  
  score += 10; // Add 10 points if the player touches the block
  pointSound.play();  // Enemy disappears when hit by player
  foodX = Math.floor(Math.random() * (canvas.width-25));
  foodY = 0;
  
}
else {
  if (foodY >= canvas.height) { // Only subtract life if the block has disappeared off the bottom of the screen
    life -= 0.5;
    
    if (life == 2) {
      document.getElementById("heart3").style.display = "none";
      badSound.play();
    }
    else if (life == 1) {
     
      document.getElementById("heart2").style.display = "none";
      document.getElementById("heart3").style.display = "none";
      badSound.play();
    }
    else if (life == 0.5) {
      document.getElementById("heart1").style.display = "none";
      document.getElementById("heart2").style.display = "none";
      document.getElementById("heart3").style.display = "none";
      booSound.play();
      gameRunning = false;
      alert("Game Over! Score: " + score);
    }

  }
}

  
  // Display the score
  canvasContext.fillStyle = "black";
  canvasContext.font = "20px Arial";
  canvasContext.fillText("Score: " + score, 10, 30);
  
  // Repeat the game loop
  if (gameRunning) {
    window.requestAnimationFrame(moveObjects);
  }
}

var playerImg = new Image();
playerImg.src = 'sumo.png';

// Function to draw the player
function drawPlayer() {
  canvasContext.drawImage(playerImg, playerX, playerY, 90, 90);
}

var enemyImg = new Image();
enemyImg.src = "burger.png";

// Function to draw the enemy
function drawEnemy() {
  canvasContext.drawImage(enemyImg, foodX, foodY, 50, 50);
}

// Function to move the player with arrow keys
document.onkeydown = function(event) {
  if (event.keyCode == 37) {
    playerX -= playerSpeed;
  }
  if (event.keyCode == 39) {
    playerX += playerSpeed;
  }
}

// Event listener for the start button
document.getElementById('startButton').addEventListener('click', startGame);
