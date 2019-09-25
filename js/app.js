/*************************************** FUNCTIONALITY OF THE GAME *******************************************************

1. The player can move left, right, up and down
2. The enemies move at varying speeds on the paved block portion of the game board
3. Once a the player collides with an enemy, the game is reset and the player moves back to the starting square
4. Once the player reaches the water (i.e., the top of the game board), the game is won 

***********************************************************************************************************************/



// Enemies 
let Enemy = function(x, y, speed) {

    // Variables denoting x and y axis for enemy
    this.x = x;
    this.y = y;
    // Variables denoting speed
    this.speed = speed;

    // Adds enemy bugs to the screen
    this.sprite = 'images/enemy-bug.png';
};



Enemy.prototype.update = function(dt) {

    // Multiplying movememnt by dt
    this.x = this.x + this.speed * dt;

    //************Respawning enemies*************
    // If enemies go off the canvas on the right,
    // they get repositioned on the left and
    // start moving again with random speeds
    if (this.x > 550) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 123);
    };

    //*************Collision check***************
    // If player collides with any of the bugs they
    // respawn to their original coordinates
    if (player.x < this.x + 75 &&
        player.y < this.y + 62 &&
        this.x < player.x + 75 &&
        this.y < player.y + 62) {
        player.x = 202;
        player.y = 405;
    }
};

// Rendering enemy bugs on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player
let Player = function(x, y) {

    // Denoting x and y axis for Player
    this.x = x;
    this.y = y;

    // Image of our player
    this.player = "images/char-boy.png";
};



// Renders image of player into the game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};


//Allows player to jump from tile to tile using arrow keys
Player.prototype.handleInput = function(pressedKey) {

    // Using up, down, left and right to move 
    if (pressedKey == "up" && this.y > 0) {
        this.y = this.y - 83;
    } else if (pressedKey == "down" && this.y < 405) {
        this.y = this.y + 83;
    } else if (pressedKey == "left" && this.x > 0) {
        this.x = this.x - 102;
    } else if (pressedKey == "right" && this.x < 405) {
        this.x = this.x + 102;
    };

    //Player respawns once it reaches the top
    if (this.y < 0) {
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
            alert("Congratulations! You Won.")
        }, 300);
    };
};

//Starting point for player
let player = new Player(202, 405);

//Placing all the enemies in an array
let allEnemies = [];

// Providing coordinates for enemy spawning
let enemyCoordinates = [65, 145, 230];


// Applying forEach loop over enemyCoordinates
// array to start movement of enemy bugs
enemyCoordinates.forEach(function(coordinateY) {
    enemy = new Enemy(0, coordinateY, 9999999);
    allEnemies.push(enemy);
});

Player.prototype.update = function(dt) {

};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});