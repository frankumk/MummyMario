// import Phaser from 'phaser';
// import logoImg from './assets/logo.png';

// class MyGame extends Phaser.Scene
// {
//     constructor ()
//     {
//         super();
//     }

//     preload ()
//     {
//         this.load.image('logo', logoImg);
//     }
      
//     create ()
//     {
//         const logo = this.add.image(400, 150, 'logo');
      
//         this.tweens.add({
//             targets: logo,
//             y: 450,
//             duration: 2000,
//             ease: "Power2",
//             yoyo: true,
//             loop: -1
//         });
//     }
// }

// const config = {
//     type: Phaser.AUTO,
//     parent: 'phaser-example',
//     width: 800,
//     height: 600,
//     scene: MyGame
// };

// const game = new Phaser.Game(config);


import 'phaser';
import config from './config/config'
import GameScene from './scenes/GameScene'
import TitleScene from './scenes/TitleScene'
import GameOver from './scenes/GameOver'
 
class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Title', TitleScene)
    this.scene.add('Game', GameScene)
    this.scene.add('GameOver', GameOver)
    this.scene.start('Game')
  }
}
 
const game = new Game();