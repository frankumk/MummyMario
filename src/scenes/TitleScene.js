import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title')
    this.clickButton = this.clickButton.bind(this)
  }
  clickButton() {
    this.scene.start('Game',{lives: 3, score: 0});
  }

  preload () {
    this.load.image('button','../assets/button.jpeg')
  }

  create () {

    this.add.text(100,100,"MUMMY MARIO!",{ fontSize: '32px'})
    const button = this.add.sprite(300,300,"button")
    this.add.text(400,300,"Press to Play")
    button.setInteractive({ useHandCursor: true })
    button.on('pointerdown', () => this.clickButton());


    this.add.text(400,430, "You have three chances.")
    this.add.text(400,460, "Use mouse to start and arrow keys to get")
    this.add.text(400, 490, "mummy mario to Las Vegas without touching")
    this.add.text(400,520, "the baddies.")

  }

}