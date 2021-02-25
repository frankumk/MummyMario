import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title')
    this.clickButton = this.clickButton.bind(this)
  }
  clickButton() {
    this.scene.switch('Game');
  }

  preload () {
    this.load.image('button','../assets/button.jpeg')
  }

  create () {

    this.add.text(100,100,"MUMMY MARIO!",20)
    const button = this.add.sprite(300,300,"button")
    this.add.text(400,300,"Press to Play")
    button.setInteractive({ useHandCursor: true })
    button.on('pointerdown', () => this.clickButton());


    // this.gameButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    // this.centerButton(this.gameButton, 1);
     
    // this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
    // this.centerButtonText(this.gameText, this.gameButton);
     
    // this.gameButton.on('pointerdown', function (pointer) {
    //   this.scene.start('Game');
    // }.bind(this));
     
    // this.input.on('pointerover', function (event, gameObjects) {
    //   gameObjects[0].setTexture('blueButton2');
    // });
     
    // this.input.on('pointerout', function (event, gameObjects) {
    //   gameObjects[0].setTexture('blueButton1');
    // });

    // centerButton (gameObject, offset = 0) {
    //   Phaser.Display.Align.In.Center(
    //     gameObject,
    //     this.add.zone(config.width/2, config.height/2 - offset * 100, config.width, config.height)
    //   );
    // }
     
    // centerButtonText (gameText, gameButton) {
    //   Phaser.Display.Align.In.Center(
    //     gameText,
    //     gameButton
    //   );
    // }

  }

}