
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  console.log(ground.x);
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
createCanvas(600,400);  
background("white");
  
  ground.x = ground.width/2;
  
  if(keyDown("space")&& monkey.y >= 100){
    monkey.velocityY = -12;
  }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: "+survivalTime,100,50);
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  spawnFood();
  
  spawnObstacle();
  
  drawSprites();
  
}

 function spawnFood(){
   if(frameCount % 80 === 0){
     var banana = createSprite(600,160,40,20);
     banana.y = Math.round(random(120,200));
     banana.addImage(bananaImage);
     banana.scale = 0.1;
     banana.velocityX = -8;
     
     banana.lifetime = 60;
     
     bananaGroup.add(banana);
   }
 } 

 function spawnObstacle(){
   if(frameCount % 300 === 0){
     var obstacle = createSprite(600,310,40,10);
     obstacle.addImage(obstacleImage);
     obstacle.velocityX = -10;
     obstacle.scale = 0.2;
     obstacle.lifetime = 200;
     
     obstacleGroup.add(obstacle);
   }
 }

