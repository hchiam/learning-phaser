/* eslint-disable new-cap */
/* eslint-disable no-invalid-this */
/* eslint-disable require-jsdoc */

import Phaser from 'phaser';
import instructions from './instructions'; // eslint-disable-line no-unused-vars
import bomb from '../phaser3-tutorial-src/assets/bomb.png';
import dude from '../phaser3-tutorial-src/assets/dude.png';
import platform from '../phaser3-tutorial-src/assets/platform.png';
import sky from '../phaser3-tutorial-src/assets/sky.png';
import star from '../phaser3-tutorial-src/assets/star.png';
// apparently need to import this
import css from './style.css'; // eslint-disable-line no-unused-vars

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 300},
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
let platforms;
let player;
let cursors; // for common keyboard listeners
let stars;
let bombs;
let score = 0;
let scoreText; // an object
let gameOver = false;

function preload() {
  this.load.image('sky', sky);
  this.load.image('ground', platform);
  this.load.image('star', star);
  this.load.image('bomb', bomb);
  this.load.spritesheet('dude', dude, {frameWidth: 32, frameHeight: 48});
}

function create() {
  // this.add.image(400, 300, 'sky'); // because positioned by center by default
  this.add.image(0, 0, 'sky').setOrigin(0, 0); // setOrigin as top-left

  platforms = this.physics.add.staticGroup(); // static physics body
  // refreshBody for physics to know about the resize of this "ground":
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  player = this.physics.add.sprite(100, 450, 'dude'); // dynamic physics body
  // -> this sprite has 9 frames: 4 = run left, 1 = face you, 4 = run right
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  this.anims.create({
    key: 'left', // frames 0 to 3
    frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
    frameRate: 10,
    repeat: -1, // -1 = loop
  });
  this.anims.create({
    key: 'turn', // frame at index 4
    frames: [{key: 'dude', frame: 4}],
    frameRate: 20,
  });
  this.anims.create({
    key: 'right', // frames 5 to 8
    frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
    frameRate: 10,
    repeat: -1, // -1 = loop
  });

  // convenient way to add common key listeners:
  cursors = this.input.keyboard.createCursorKeys();

  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: {x: 12, y: 0, stepX: 70},
  });
  stars.children.iterate(function(child) {
    // set random bounce value:
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  bombs = this.physics.add.group();

  const x = 16;
  const y = 16;
  scoreText = this.add.text(
      x, y, 'score: 0',
      {
        fontSize: '32px',
        fill: '#000',
      },
  );

  // can create collider "watchers" after create relevant groups/objects:
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(player, bombs, hitBomb, null, this);
  // collider: obj1, obj2, collideCallback, processCallback, callbackContext

  // special callback for overlap "watcher":
  this.physics.add.overlap(player, stars, collectStar, null, this);
  // collider: obj1, obj2, collideCallback, processCallback, callbackContext
}

function update() {
  if (gameOver) return;

  if (cursors.left.isDown) {
    player.setVelocityX(-160); // physics
    player.anims.play('left', true); // animation (see this.anims)
  } else if (cursors.right.isDown) {
    player.setVelocityX(160); // physics
    player.anims.play('right', true); // animation (see this.anims)
  } else if (cursors.down.isDown) {
    // smash down!
    player.setVelocityY(300); // physics
    player.anims.play('turn', true); // animation (see this.anims)
  } else {
    player.setVelocityX(0); // physics
    player.anims.play('turn'); // animation (see this.anims)
  }

  const isTouchingGround = player.body.touching.down;
  if (cursors.up.isDown && isTouchingGround) {
    player.setVelocityY(-330); // physics
  }
}

function collectStar(player, star) {
  player.setVelocityY(-100);
  star.disableBody(true, true);
  // disableBody parameters: disableGameObject, hideGameObject
  score += 1;
  scoreText.setText('Score: ' + score);
  generateBombs();
}

function hitBomb(player, bomb) {
  // this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play('turn');
  scoreText.setText('Score: ' + score + ' - GAME OVER');
  gameOver = true;
  platforms.children.iterate(function(child) {
    child.disableBody(true, true);
  });
  stars.children.iterate(function(child) {
    child.setCollideWorldBounds(false);
  });
  bombs.children.iterate(function(child) {
    child.setCollideWorldBounds(false);
  });
  player.setCollideWorldBounds(false);
}

function generateBombs() {
  if (stars.countActive(true) > 0) return;

  // show all stars again:
  stars.children.iterate(function(child) {
    child.enableBody(true, child.x, 0, true, true);
    // enableBody: reset, x, y, enableGameObject, showGameObject
  });

  let randomX;
  if (player.x < 400) {
    randomX = Phaser.Math.Between(400, 800);
  } else {
    randomX = Phaser.Math.Between(0, 400);
  }

  const bomb = bombs.create(randomX, 16, 'bomb');
  bomb.setBounce(1);
  bomb.setCollideWorldBounds(true);
  bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  // setVelocity: x, y
}
