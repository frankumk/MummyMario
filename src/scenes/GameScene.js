import Phaser from 'phaser';
 
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game')
    this.hitBaddie = this.hitBaddie.bind(this)
    this.collectGold = this.collectGold.bind(this)
    this.win = this.win.bind(this)
  }
  init(){
    this.lives = 3
    this.score = 0
    this.timer = 2
    this.velocity_x = 200
    this.velocity_y = 300
    this.dragonMaxY = 580
    this.dragonMinY = 100
    this.ballMaxX = 150
    this.ballMinX = 100

  }

  preload () {
    // load images
    this.load.image('logo', '../assets/logo.png')
    this.load.image('floor','../assets/sf2floor.png')
    this.load.image('flag','../assets/palm-tree-left.png')
    this.load.image('sky','../assets/cyberpunk-street.png')
    this.load.spritesheet('mummy', '../assets/metalslug_mummy37x45.png', { frameWidth: 37, frameHeight: 45})
    this.load.spritesheet('dragon', '../assets/stormlord-dragon.png', { frameWidth: 96, frameHeight: 64})
    this.load.image('gold','../assets/mushroom.png')
    this.load.image('wizball','../assets/wizball.png')
  }

  collectGold(player,gold){
    console.log(gold)
    this.score = this.score + 1;
    console.log(this.score)
    gold.disableBody(true,true);
    this.scoreBoard.setText(`Gold: ` + this.score)
  }

  hitBaddie(player,monster){
    if(this.lives>0){
      this.lifeCount.setText('Lives: ' + this.lives)
      this.scene.start('Game');
      this.lives = this.lives-1;
    }
  }

  win(player, palm) {
    // console.log('win')
  }
 
  create () {
    this.floor = this.add.image(400, 430, 'floor') + this.add.image(800, 430, 'floor') + this.add.image(1200, 430, 'floor') + this.add.image(1600, 430, 'floor')
    this.scoreBoard = this.add.text(16,16,`Gold: ` + this.score, { fontSize: '32px'})
    this.lifeCount = this.add.text(16,50,`Lives: ` + this.lives, { fontSize: '32px'})

    this.mummy = this.physics.add.sprite(100, 400, 'mummy')
    //this.mummy.setBounce(0.2);

    
    this.dragons = this.physics.add.group({
      key: 'dragon',
      repeat: 6,
      setXY: {x: 200, y: 30, stepX: 200, stepY: 40}
    })
    let dragons = this.dragons.getChildren();
    Phaser.Actions.Call(dragons, function(dragon) {
      dragon.speed = Math.random() * 2 + 2;
    }, this);
    

    this.balls = this.physics.add.group({
      key: 'wizball',
      repeat: 5,
      setXY: {x: 260, y: 420, stepX: 200},
      setScale: { x: 0.2, y: 0.2 }
    })
    let balls = this.balls.getChildren();
    Phaser.Actions.Call(balls, function(ball) {
      ball.speed = 3;
      ball.xOrig = ball.x;
    }, this);

    //this.dragons.forEach(dragon => dragon.setFlipX=true)

    this.palm = this.physics.add.sprite(1480, 360, 'flag')

    //this.gold = this.add.sprite(420, 370, 'gold')
    this.mushrooms = this.physics.add.group({
      key: 'gold',
      repeat: 3,
      setXY: {x: 250, y:380, stepX: 15, stepY:-10}
    }) + this.physics.add.group({
      key: 'gold',
      repeat: 2,
      setXY: {x: 313, y:360, stepX: 15, stepY:10}
    })



    this.physics.world.setBounds(0, 0, 1500, 430);
    this.mummy.setCollideWorldBounds(true)
    this.physics.add.collider(this.floor, this.mummy)
    this.mummy.body.setGravityY(1000)
    this.physics.add.collider(this.mummy, this.floor)

  }

  update(){

      const cursors = this.input.keyboard.createCursorKeys();

      this.cameras.main.setBounds(0, 0, 2000, 600)
      this.cameras.main.startFollow(this.mummy)

      if(cursors.left.isDown){
        this.mummy.setVelocityX(-150).setFlipX(true)
      }else if (cursors.right.isDown){
        this.mummy.setVelocityX(150).setFlipX(false)
      }else{
        this.mummy.setVelocityX(0)
      }

      if((cursors.space.isDown || cursors.up.isDown)) //&& this.mummy.body.onFloor()
    {
        this.mummy.body.setVelocityY(-500); // jump up
    }
      //this.game.camera.follow(this.mummy)

      let dragons = this.dragons.getChildren();
      for(let i = 0; i < dragons.length; i++){
        dragons[i].y += dragons[i].speed;
        if(dragons[i].y >= this.dragonMaxY && dragons[i].speed>0){
          dragons[i].speed *= -1;
        }else if(dragons[i].y <= this.dragonMinY && dragons[i].speed<0){
          dragons[i].speed *= -1;
        }
      }

      let balls = this.balls.getChildren();
      for(let i = 0; i < balls.length; i++){
        balls[i].x += balls[i].speed;
        if(balls[i].x >= balls[i].xOrig+50 && balls[i].speed>0){
          balls[i].speed *= -1;
        }else if(balls[i].x <= balls[i].xOrig && balls[i].speed<0){
          balls[i].speed *= -1;
        }
      }

      this.physics.add.overlap(this.mummy, this.palm, this.win, null, this);
      this.physics.add.overlap(this.mummy, this.mushrooms, this.collectGold, null, this);
      //this.physics.add.overlap(this.mummy, this.dragons, this.hitBaddie, null, this);
    

    }

  end() {
    if(this.lives <= 0) {
      this.scene.restart();
    } else {
      this.create();
    }
  }
};