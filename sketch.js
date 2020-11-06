var monkey;
var monkey_running;
var monkey_image;
var ground;
var banana,banana_anime;

var obstacle,obstacle_anime,obstacleGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;
var BananasGroup;

function preload(){
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","  sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_image=loadAnimation("sprite_8.png");
  
  banana_anime=loadImage("banana.png");
  obstacle_anime = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600, 400);
  
  monkey = createSprite(50,300,30,30);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200,333,800,10);
  
  ground.shapeColor = "green";
  
  BananasGroup = new Group();
  obstacleGroup = new Group();  
}

function draw() {
  background("lightblue");
  
  text("Score: "+ score, 170,30);
  
 if(gameState === PLAY){
   spawnObstacles();
   spawnBanana();
   
   if(keyDown("space")&& monkey.y>=120){ 
     monkey.velocityY = -12;
    }
   if(BananasGroup.isTouching(monkey)){
   score= score+1;
   BananasGroup.destroyEach();
    }
   if(obstacleGroup.isTouching(monkey)){
      gameState = END;
   }
 } else if(gameState === END){
   text ("gameover",170,200);
              monkey.changeAnimation("image",monkey_image);
     score = 0;
     obstacleGroup.destroyEach();
     BananasGroup.destroyEach();
 }

  monkey.velocityY = monkey.velocityY+0.5;
  monkey.collide(ground);
  
  drawSprites();
}

function spawnBanana(){
  if(frameCount%80===0){
    banana = createSprite(400,250,20,20);
    BananasGroup.add(banana);
    banana.velocityX = -4;
    banana.y = Math.round(random(120,200));
    banana.addImage("anime",banana_anime);
    banana.scale = 0.1;
    banana.lifetime = 100;
  }
 
}

function spawnObstacles(){
  if(frameCount%300===0){
    obstacle = createSprite(400,280);
    obstacle.velocityX = -4;
    obstacle.addImage("anime",obstacle_anime);
    obstacle.scale = 0.3;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}




