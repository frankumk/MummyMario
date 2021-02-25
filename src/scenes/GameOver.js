import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
  constructor () {
    super('GameOver')
  }

  init(data){
    this.finalScore = data.score
    this.won = data.won
  }

  preload(){
    this.load.image('purpbutton','../assets/button-purple.png')
  }

  clickButton(){
    this.scene.switch('Game');
  }

  create(){
    if(this.won){
      this.add.text(100,100,"YOU WIN!",{ fontSize: '32px'})
      this.add.text(150,150,"Final Score: " + this.finalScore)
    }else{
      this.add.text(100,100,"YOU LOST!",{ fontSize: '32px'})
    }

    const purpbutton = this.add.sprite(300,300,"purpbutton")
    purpbutton.setScale(0.1)
    this.add.text(400,300,"Play Again?")
    purpbutton.setInteractive({ useHandCursor: true })
    purpbutton.on('pointerdown', ()=>this.clickButton())

  }

}
