# Learning phaser

Just one of the things I'm learning. <https://github.com/hchiam/learning>

Learning the updated version 3 <https://github.com/photonstorm/phaser> (my old repo: <https://github.com/hchiam/phaserGame>)

My live demo: <https://hchiam-phaser-demo.surge.sh/>

Phaser 3 webpack project template: <https://github.com/photonstorm/phaser3-project-template>

More examples to learn from: <https://phaser.io/examples/v3>

Phaser 3 guide: <https://phaser.io/tutorials/getting-started-phaser3/index>

## Using this repo

```bash
yarn
yarn webpack-build
yarn start
```

Or:

```bash
yarn
yarn build # and when prompted, enter y
```

Example code to make image respond to clicks:

```js
// clickable image:
function preload() {
  this.load.image('logo', logoImg);
}

function create() {
  const image = this.add.image(400, 150, 'logo');
  image.setInteractive();
  image.on('pointerdown', function(pointer) {
    alert('Image clicked!');
  });
}
```

---

## Other notes

[![generator-hchiam-learning](https://img.shields.io/badge/built%20with-generator--hchiam--learning-brightgreen.svg)](https://github.com/hchiam/generator-hchiam-learning) [![Build Status](https://travis-ci.org/hchiam/learning-phaser.svg?branch=master)](https://travis-ci.org/hchiam/learning-phaser) [![Coverage Status](https://coveralls.io/repos/github/hchiam/learning-phaser/badge.svg?branch=master)](https://coveralls.io/github/hchiam/learning-phaser?branch=master)

You can generate a [dependency graph](https://github.com/hchiam/learning-dependency-cruiser) with `bash show_dep_graph.sh`.

You can publish a live site to [surge](https://github.com/hchiam/learning-surge) with `bash publish_live_site.sh` (Just go into the relevant enclosing `src` or `public` folder of your site files - a CNAME file is there for convenience).

This file was first created using the Yeoman generator [`generator-hchiam-learning`](https://www.npmjs.com/package/generator-hchiam-learning).
