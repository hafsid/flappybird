var edges;
var flappy,flappyImage,flappystop;
var back,backImage,backBottom,backBottomImage;

var topImage,bottomImage,Ob1,obG1,Ob2,obG2;

var coinImage,coin,coinG;

var start,startImage,getReadyImg,getReady;
var gameOver,gameOverImg;

var gameState = "start";
var scoreSprite,scoreSpriteImg,score=0;

var pause,play,pauseImg,playImg;

var fly,die,point;

function preload(){
    flappyImage = loadAnimation("images/flappy1.png","images/flappy2.png","images/flappy3.png");
    flappystop = loadAnimation("images/flappy_stop.png");

    backImage = loadImage("images/day_back.png");
    backBottomImage = loadImage("images/bottom_back.png");

    topImage = loadImage("images/top.png");
    bottomImage = loadImage("images/bottom.png");

    coinImage = loadImage("images/coin.png");

    startImage = loadImage("images/start.png");

    getReadyImg = loadImage("images/get_ready.png");

    gameOverImg = loadImage("images/game_over.png");

    scoreSpriteImg = loadImage("images/score.png");

    pauseImg = loadImage("images/pause.png");
    playImg = loadImage("images/play.png");

    fly = loadSound("sounds/wing.mp3");
    point = loadSound("sounds/point.mp3");
    die = loadSound("sounds/die.mp3");


}

function setup(){
  createCanvas(300,300)

  back = createSprite(150,-100);
  back.addImage("up_back",backImage)
  back.scale = 4.5;

  backBottom = createSprite(190,350);
  backBottom.addImage("down_back",backBottomImage)
  backBottom.scale = 4;

  flappy = createSprite(50,100);
  flappy.addAnimation("flappy",flappyImage)
  flappy.addAnimation("flappystop",flappystop)
  flappy.scale = 1.5;

  start = createSprite(150,150)
  start.addImage("start",startImage)

  getReady = createSprite(150,100)
  getReady.addImage("getReady",getReadyImg)

  gameOver = createSprite(150,150)
  gameOver.addImage("gameOver",gameOverImg)
  gameOver.visible = false;
  gameOver.scale = 1.5


  pause = createSprite(260,14)
  pause.addImage("pause",pauseImg);

  play = createSprite(280,14)
  play.addImage("play",playImg);
  play.visible = false;

  // scoreSprite = createSprite(20,20);
  // scoreSprite.addImage("score",scoreSpriteImg);
  edges = createEdgeSprites();

  obG1 = new Group();
  obG2 = new Group();
  coinG = new Group();
}

function draw(){
  background("lightgray")

  if(gameState === "start"){
    flappy.visible = false

    if(mousePressedOver(start)){
      gameState = "play";
      start.visible = false;
      getReady.visible = false;
    }

  }
  
  if(gameState === "play"){
    flappy.changeAnimation("flappy",flappyImage)
    flappy.visible = true
    back.velocityX = -2
    backBottom.velocityX = -2
    if(keyDown("space")){
      flappy.velocityY = -5
      fly.play()
    }

    flappy.velocityY +=0.5

    if(back.x <0){
      back.x= back.width/2
    }
    if(backBottom.x <0){
      backBottom.x= backBottom.width/2
    }
    spawnObs1();
    spawnObs2();
    spawncoin();

    if(flappy.isTouching(obG1)||flappy.isTouching(obG2)){
      gameState = "end"
      die.play();
    }

    if(flappy.isTouching(coinG)){
      coinG[0].destroy();
      score+=5;
      point.play();
    }

    if(mousePressedOver(pause) ){
      gameState = "pause"
    }

    
    

  }

  if(gameState === "pause"){
    play.visible = true;
    pause.visible = false;
    back.velocityX = 0
    backBottom.velocityX = 0
    flappy.velocityY = 0
    obG1.setVelocityXEach(0)
    obG2.setVelocityXEach(0)
    coinG.setVelocityXEach(0)
    flappy.changeAnimation("flappystop",flappystop)
    pause.changeImage("play",playImg);
    if(mousePressedOver(play)){
      gameState = "play";
      play.visible = false;
      pause.visible = true;

    }

    
  }





  if(gameState === "end"){
    flappy.changeAnimation("flappystop",flappystop)
    gameOver.visible = true;
    back.velocityX = 0
    backBottom.velocityX = 0
    flappy.velocityY = 0
    obG1.setVelocityXEach(0)
    obG2.setVelocityXEach(0)
    coinG.setVelocityXEach(0)

    
  }

  
  drawSprites();
  //text(mouseX+","+mouseY,mouseX,mouseY)
  stroke("#f2e985");
  //strokeWeight(5);
  fill("#f2e985")
  text("Score: "+score,23,24)
}

function spawnObs1(){
 if(frameCount %60 === 0){
   Ob1 = createSprite(400,10,300,300);
   Ob1.addImage(topImage);
   Ob1.velocityX = -2;
   Ob1.scale = 1.0;
   Ob1.y = random(10,30)
   gameOver.depth = Ob1.depth;
    gameOver.depth+=1

    pause.depth = Ob1.depth;
    pause.depth+=1
    play.depth = Ob1.depth;
    play.depth+=1
   obG1.add(Ob1);
 }
}
function spawnObs2(){
  if(frameCount %60 === 0){
    Ob2 = createSprite(400,10,300,300);
    Ob2.addImage(bottomImage);
    Ob2.velocityX = -2;
    Ob2.scale = 1.0;
    Ob2.y = random(250,300)
    gameOver.depth = Ob2.depth;
    gameOver.depth+=1
    pause.depth = Ob2.depth;
    pause.depth+=1
    play.depth = Ob2.depth;
    play.depth+=1
    obG2.add(Ob2);
  }
 }
 function spawncoin(){
  if(frameCount %120 === 0){
    coin = createSprite(400,150,300,300);
    coin.addImage(coinImage);
    coin.velocityX = -2;
    coin.scale = 1.0;
    //coin.y = random(100,200)
    gameOver.depth = coin.depth;
    gameOver.depth+=1
    pause.depth = coin.depth;
    pause.depth+=1
    play.depth = coin.depth;
    play.depth+=1
    coinG.add(coin);
  }
 }
