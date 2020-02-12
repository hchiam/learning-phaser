/* eslint-disable no-invalid-this */
/* eslint-disable require-jsdoc */

import Phaser from 'phaser';
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

  // can create collider "watcher" after create relevant groups/objects:
  this.physics.add.collider(player, platforms);
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160); // physics
    player.anims.play('left', true); // animation (see this.anims)
  } else if (cursors.right.isDown) {
    player.setVelocityX(160); // physics
    player.anims.play('right', true); // animation (see this.anims)
  } else if (cursors.down.isDown) {
    // player.setVelocityY(300); // physics
    // player.anims.play('turn', true); // animation (see this.anims)
  } else {
    player.setVelocityX(0); // physics
    player.anims.play('turn'); // animation (see this.anims)
  }

  const isTouchingGround = player.body.touching.down;
  if (cursors.up.isDown && isTouchingGround) {
    player.setVelocityY(-330); // physics
  }
}
