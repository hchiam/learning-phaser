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

  platforms = this.physics.add.staticGroup();

  // refreshBody for physics to know about the resize of this "ground":
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');
}

function update() {
}
