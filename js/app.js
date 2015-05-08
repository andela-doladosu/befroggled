var gameStarted = false;
var lives = 0;
var score = 0;
var level = 1;
var allEnemies = [];
var scoreSpan = document.getElementById('score');
var lifeSpan = document.getElementById('life');
var levelSpan = document.getElementById('level');
var statsDiv = document.getElementById('stats');
var gameOverP = document.createElement('p');
var hintsDiv = document.getElementById('hints');
soundDir = 'sounds/';

function updateScore(){
  score += 10;
  updateLevel();
  scoreSpan.innerHTML = score;
}
function updateLevel(){
  if(score % 40 == 0){
    level += .5;
  }
  levelSpan.innerHTML = Math.round(level);
}
function updateLife(){
  lives -= 1;
  lifeSpan.innerHTML = lives;
}
function stopGame(){
  allEnemies = [];
  gem.x = 900;
  player.sprite = '';
  statsDiv.style.color = 'red';
  document.removeEventListener('keydown',function(e){
  });
  gameOverP.innerHTML = 'GAME OVER!<br/>Score: '+score+'<br/><a href="">Try again</a>';
  statsDiv.innerHTML = gameOverP.innerHTML;
}



var startGame = function(){
  hintsDiv.style.display = 'none';
  lives = 5;
  gameStarted = true;
  allEnemies.push(new Enemy(110,70,3));
  allEnemies.push(new Enemy(180,150,1));
  allEnemies.push(new Enemy(330,230,4));
  allEnemies.push(new Enemy(100,310,2));
}

// Enemies our player must avoid

var Enemy = function(x,y,speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = x ;
  this.y = y;
  this.speed = speed; 
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  
  var oldX = this.x ;
  var random = dt * 10 + this.speed * level ;
  if(oldX >= 700){
    this.x = 0 ;
  }else{
    this.x = oldX + random;

  }

  //bug collision

  if(player.x >= this.x - 30 && player.x <= this.x + 30){
    if(player.y >= this.y - 30 && player.y <= this.y + 30){
      //player loses a life
      updateLife();
      if(lives == -1){
        gameStopped = true;
        stopGame();
      }
      //reset player position
      player.y = 390;
      player.x = 700;
    }
  }
};

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
function Player(){
  var x = 700;
  var y = 390;
  this.x = x;
  this.y = y;

 
  this.faces = [
        'images/char-boy.png',
        'images/char-princess-girl.png',
        'images/char-pink-girl.png',
        'images/char-horn-girl.png',
        'images/char-cat-girl.png'
        ];
  this.lastFace = 0;
  this.sprite = this.faces[0];
}

Player.prototype.change = function(k){
  if(k == 'enter'){
    startGame();

  }else{
    if(this.lastFace == 4){
    this.lastFace = 0;
    }else{
      this.lastFace += 1;
    }
    this.sprite = this.faces[this.lastFace];

  }
  
}


Player.prototype.update = function(){

}
Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(k){
   
  var posX = this.x;
  var posY = this.y;
  var move;
  var ySteps = 80;
  var xSteps = 100;

    
  switch (k){
    case 'up':
      move = posY - ySteps;
      if(move == -10){
      }else{
        this.y = move ;
      }
      break;
    case 'down':
      move = posY + ySteps;
      if(move <= 390){
        this.y = move ;
      }
      break;
    case 'left':
      move = posX - xSteps;
      if(move >= 0){
        this.x = move ;
      }
      break;
    case 'right':
      move = posX + xSteps;
      if(move <= 700){
        this.x = move ;
      }
      break;
  }
}




gem = new Gem();
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player




var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    13: 'enter'
  };

  if(gameStarted){
    player.handleInput(allowedKeys[e.keyCode]);
  }else{
    player.change(allowedKeys[e.keyCode]);
  }    
});

function Gem(){

  this.x = 400 ;
  this.y = 390 ;

  this.sprite = 'images/Gem-Blue.png' ;
}

Gem.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.update = function() {
  

  //gem collection

  if(player.x >= this.x - 30 && player.x <= this.x + 30){
    if(player.y >= this.y - 30 && player.y <= this.y + 30){
      
      //increase score
      updateScore();

      var yPoints = [70,150,230,310,390];
      var xPoints = [0,101,202,303,404,505,606,707];

      var randY = yPoints[Math.floor(Math.random() * yPoints.length)];
      var randX = xPoints[Math.floor(Math.random() * xPoints.length)];

      //change gem position 
      this.y = randY;
      this.x = randX;    
    }
  }
};




