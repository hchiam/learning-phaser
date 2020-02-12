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
  physics: {
    default: 'impact',
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
let graphics;
let mouseCircle;

function preload() {
  this.load.image('logo', logoImg);
}

function create() {
  const image = this.impact.add.image(0, 150, 'logo');
  const image2 = this.impact.add.image(500, 150, 'logo');
  image.setInteractive();
  image.on('pointerdown', function(pointer) {
    alert('Image clicked!');
  });

  image.setTypeA().setCheckAgainstB().setActiveCollision().setMaxVelocity(300);
  image2.setTypeB().setCheckAgainstA().setFixedCollision();
  image.setVelocityX(300);
  this.impact.world.on('collide', collide);

  // this.tweens.add({
  //   targets: image,
  //   y: 450,
  //   duration: 2000,
  //   ease: 'Power2',
  //   yoyo: true,
  //   loop: -1,
  // });

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

  graphics = this.add.graphics();
  mouseCircle = new Phaser.Geom.Circle(0, 0, 48);
  this.input.on('pointermove', function(pointer) {
    mouseCircle.x = pointer.x;
    mouseCircle.y = pointer.y;
  });
}

function collide(bodyA, bodyB, axis) {
  bodyA.gameObject.setTint(0xff0000);
}

function update() {
  graphics.clear();
  graphics.lineStyle(5, 0x0000ff, 1);
  graphics.strokeCircleShape(mouseCircle);
  graphics.fillStyle(0x00ff00, 1);
  graphics.fillCircleShape(mouseCircle);
}
