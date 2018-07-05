// Enemies our player must avoid

var Enemy = function(m, n, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.m = m;
    this.n = n;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.rotate = 'images/Rock.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.m += this.speed * dt;

    // when off canvas, reset position of enemy to move across again
    if (this.m > 550) {
        this.m = -100;
        this.speed = 100 + Math.floor(Math.random() * 256);
    }

    // Check for collision between player and enemies
    if (player.m < this.m + 60 &&
        player.m + 37 > this.m &&
        player.n < this.n + 25 &&
        30 + player.n > this.n) {
        player.m = 200;
        player.n = 380;

        // toggle background after collision between player and enemies
        document.querySelector('body').style.backgroundColor = 'black';
        alert("end game")
        setTimeout(function () {
            document.querySelector('body').style.backgroundColor = 'green';
        }, 200);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.rotate), this.m, this.n);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(m, n, speed) {
    this.m = m;
    this.n = n;
    this.speed = speed;
    this.rotate = 'images/char-horn-girl.png';
};

Player.prototype.update = function() {
    // Prevent player from moving beyond canvas wall boundaries
    if (this.n > 380) {
        this.n = 380;
    }
    if (this.m > 400) {
        this.m = 400;
    }
    if (this.m < 0) {
        this.m = 0;
    }

    // Check for player reaching top of canvas and winning the game
    if (this.n < 0) {
        this.m = 200;
        this.n = 380;
       
        alert("Win");
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.rotate), this.m, this.n);
};

Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.m -= this.speed + 50;
            break;
        case 'up':
            this.n -= this.speed + 30;
            break;
        case 'right':
            this.m += this.speed + 50;
            break;
        case 'down':
            this.n += this.speed + 30;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// Position "y" where the enemies will are created
var enemyPosition = [60, 140, 220];
var player = new Player(200, 380, 50);
var enemy;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});

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
});alert("start game!")

