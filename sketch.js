var edges;
var flappy,flappyImage,flappystop;
var back,backImage = "images/day_back.png",backBottom,backBottomImage;

var topImage,bottomImage,Ob1,obG1,Ob2,obG2;

var coinImage,coin,coinG;

var start,startImage,getReadyImg,getReady;
var gameOver,gameOverImg;

var gameState = "start";
var scoreSprite,scoreSpriteImg,score=0;

var pause,play,pauseImg,playImg;

var fly,die,point;

var replay,replayImg;

function preload(){
    flappyImage = loadAnimation("images/flappy1.png","images/flappy2.png","images/flappy3.png");
    flappystop = loadAnimation("images/flappy_stop.png");

    getBackgroundImg();
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
    restartImg = loadImage("images/restart.png");

    fly = loadSound("sounds/wing.mp3");
    point = loadSound("sounds/point.mp3");
    die = loadSound("sounds/die.mp3");

    


}

function setup(){
  createCanvas(600,600)

  back = createSprite(150,-200);
  back.addImage("up_back",backImage)
  back.scale = 8.5;

  backBottom = createSprite(290,650);
  backBottom.addImage("down_back",backBottomImage)
  backBottom.scale = 7.5;

  flappy = createSprite(150,100);
  flappy.addAnimation("flappy",flappyImage)
  flappy.addAnimation("flappystop",flappystop)
  flappy.scale = 3.5;

  start = createSprite(290,350)
  start.addImage("start",startImage)
  start.scale = 3

  getReady = createSprite(290,250)
  getReady.addImage("getReady",getReadyImg)
  getReady.scale = 3

  gameOver = createSprite(279,250)
  gameOver.addImage("gameOver",gameOverImg)
  gameOver.visible = false;
  gameOver.scale = 3

  restart = createSprite(300,350);
  restart.addImage("restart",restartImg);
  restart.scale = 0.3;
  restart.visible = false;


  pause = createSprite(500,30)
  pause.addImage("pause",pauseImg);
  pause.scale = 3

  play = createSprite(550,30)
  play.addImage("play",playImg);
  play.scale = 3
  play.visible = false;

  // scoreSprite = createSprite(20,20);
  // scoreSprite.addImage("score",scoreSpriteImg);
  edges = createEdgeSprites();

  obG1 = new Group();
  obG2 = new Group();
  coinG = new Group();

  flappy.debug = false
  flappy.setCollider("circle",0,0,5)
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

    if(flappy.isTouching(obG1)||flappy.isTouching(obG2) || flappy.y >700){
      gameState = "end"
      die.play();
    }

    if(flappy.isTouching(coinG)){
      coinG[0].destroy();
      score+=5;
      point.play();
    }

    if(mousePressedOver(pause) && gameState === "play" ){
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
    if(mousePressedOver(play) && gameState === "pause"){
      gameState = "play";
      play.visible = false;
      pause.visible = true;
      obG1.setVelocityXEach(-2)
      obG2.setVelocityXEach(-2)
      coinG.setVelocityXEach(-2)
    }

    
  }


  if(gameState === "end"){
    flappy.changeAnimation("flappystop",flappystop)
    restart.visible = true;
    gameOver.visible = true;
    back.velocityX = 0
    backBottom.velocityX = 0
    flappy.velocityY = 0
    obG1.setVelocityXEach(0)
    obG2.setVelocityXEach(0)
    coinG.setVelocityXEach(0)

    if(mousePressedOver(restart)){
      reset();
    }

    // if(mousePressedOver(replay)){
    //   console.log("hi")
    //   resetfunction();
    // }
  }

  
  drawSprites();
  //text(mouseX+","+mouseY,mouseX,mouseY)
  stroke("#f2e985"); //#f2e985
  strokeWeight(2);
  textSize(30)
  //textStyle("BOLDITALIC")
  fill("#f2e985")
  
  text("SCORE: "+score,23,34)
}


function reset(){
  score = 0;
  flappy.x = 150
  flappy.y = 100
  gameState = "play"
  flappy.visible=true;
  obG1.setVelocityXEach(-4);
  obG2.setVelocityXEach(-4);
  coinG.setVelocityXEach(-4);
  gameOver.visible = false
  restart.visible = false
  obG1.destroyEach();
  coinG.destroyEach();
  obG2.destroyEach()
  

}

//top obstacle spawning
function spawnObs1(){
 if(frameCount %120 === 0){
   Ob1 = createSprite(700,10,300,300);
   Ob1.addImage(topImage);
   Ob1.velocityX = -2;
   Ob1.scale = 2.5;
   Ob1.y = Math.round(random(5,20))
   gameOver.depth = Ob1.depth;
    gameOver.depth+=1

    pause.depth = Ob1.depth;
    pause.depth+=1
    play.depth = Ob1.depth;
    play.depth+=1
    restart.depth = Ob1.depth;
    restart.depth+=1
   obG1.add(Ob1);
 }
}
function spawnObs2(){
  if(frameCount %120 === 0){
    Ob2 = createSprite(700,10,300,300);
    Ob2.addImage(bottomImage);
    Ob2.velocityX = -2;
    Ob2.scale = 2.5;
    Ob2.y = Math.round(random(520,600))
    gameOver.depth = Ob2.depth;
    gameOver.depth+=1
    pause.depth = Ob2.depth;
    pause.depth+=1
    play.depth = Ob2.depth;
    play.depth+=1
    restart.depth = Ob2.depth;
    restart.depth+=1
    obG2.add(Ob2);
  }
 }
 function spawncoin(){
  if(frameCount %120 === 0){
    coin = createSprite(700,300,300,300);
    coin.addImage(coinImage);
    coin.velocityX = -2;
    coin.scale = 2.5;
    //coin.y = random(100,200)
    gameOver.depth = coin.depth;
    gameOver.depth+=1
    pause.depth = coin.depth;
    pause.depth+=1
    play.depth = coin.depth;
    play.depth+=1
    restart.depth = coin.depth;
    restart.depth+=1
    coinG.add(coin);
  }
 }

 async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
  if(hour>=06 && hour<=19){
      bg = "images/day_back.png";
  }
  else{
      bg = "images/night_back.png";
  }

  backImage = loadImage(bg);
  console.log(backImage);
}
