/* eslint-disable no-invalid-this */
/* eslint-disable require-jsdoc */

import Phaser from 'phaser';
import _2DNote from '2dnote';
import logoImg from './assets/logo.png';
// apparently need to import this
import css from './style.css'; // eslint-disable-line no-unused-vars

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
  },
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);

function preload() {
  this.load.image('logo', logoImg);
}

function create() {
  const image = this.add.image(400, 150, 'logo');
  image.setInteractive();
  image.on('pointerdown', function(pointer) {
    alert('Image clicked!');
  });

  this.tweens.add({
    targets: image,
    y: 450,
    duration: 2000,
    ease: 'Power2',
    yoyo: true,
    loop: -1,
  });

  _2DNote.setAs2DArea(document.getElementsByTagName('canvas'));
  this.input.keyboard.on('keydown-SPACE', function() {
    alert('You hit the spacebar!');
  });

  this.input.keyboard.on('keydown-W', function() {
    alert('You hit the W key');
  });

  this.input.keyboard.on('keydown-A', function() {
    alert('You hit the A key');
  });

  this.input.keyboard.on('keydown-S', function() {
    // alert('You hit the S key');
    const screenWidth = document.documentElement.clientWidth;
    const screenHeight = document.documentElement.clientHeight;
    const simulatedCenterClick = { // center: guaranteed != edge
      currentTarget: true,
      clientX: screenWidth / 2,
      clientY: screenHeight / 2,
    };
    _2DNote.play(simulatedCenterClick);
    setTimeout(function() {
      _2DNote.stop();
    }, 100);
  });

  this.input.keyboard.on('keydown-D', function() {
    alert('You hit the D key');
  });
}
