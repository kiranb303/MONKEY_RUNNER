var PLAY = 1;
var END = 0;
var gameState = PLAY;
var banana;
var monkey , monkey_running;
var bananaImage,obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var collected=0;
var land;
var bg,bg_loader;
var GO,GO_loader,rs,rs_loader,end,end_loader;
var obstacle;
function preload()
      {
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bg_loader = loadImage("road image.jpg");
  GO_loader = loadImage("GO.png");
  rs_loader = loadImage("restart.png");
  end_loader = loadImage("end.png");
       }

function setup() {
bg=createSprite(300,200);
bg.addImage("bg",bg_loader);
bg.x=bg.width/2;  
monkey = createSprite(100,100);
monkey.addAnimation("monkey",monkey_running);
monkey.scale=0.15;
bg.scale=1.5;  
land = createSprite(200,300,500,20);
GO = createSprite(200,100);
GO.addImage("GO",GO_loader);
FoodGroup=new Group();  
obstacleGroup=new Group();    
rs = createSprite(200,200);
rs.addImage("RS",rs_loader);
GO.scale=1.5;
end=createSprite(200,200);
end.addImage("end",end_loader);
}


function draw() {
background("white");
if(gameState===PLAY){  
bg.velocityX=-3;
GO.visible=false;
rs.visible = false;
end.visible=false;
land.visible=false;  
score = score + Math.round(getFrameRate()/60);
if (bg.x < -70){
      bg.x = 200;
    }

    if(keyDown("space")&& monkey.y >= 240) {
        monkey.y = monkey.y-2;
        monkey.velocityY = -15;
        }    
  
    monkey.velocityY = monkey.velocityY + 0.8; 
    monkey.collide(land);
    if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    collected=collected+1;
      }
    spawnFood();
    spawnObstacles();
    if(obstacleGroup.isTouching(monkey)){
       gameState=END; 
    }
}
    else
        {
          if(gameState===END){
            bg.velocityX=0;
            monkey.velocityY=0;
            FoodGroup.setVelocityXEach(0);
            obstacleGroup.setVelocityXEach(0);
            FoodGroup.setLifetimeEach(-1);
            obstacleGroup.setLifetimeEach(-1);
            GO.visible = true;
            rs.visible = true;
            end.depth = banana.depth+1;
            rs.depth=end.depth+1;
            GO.depth=end.depth+1;
            end.visible=true;
            
            
  if(mousePressedOver(rs)){ 
               reset();
               }
          }
        }
    drawSprites();
    fill("brown");
    textSize(20);  
    stroke(0.01);
    text("Bananas Collected:- "+collected,230,50);
    textSize(20);
    stroke(2);
    text("SURVIVAL TIME: "+score,120,20);

}

function reset(){
  gameState=PLAY;
 score=0;  
 collected=0;
 obstacleGroup.destroyEach();
 FoodGroup.destroyEach(); 
}

function spawnFood()
     {
  if(World.frameCount%80===0){
  banana = createSprite(400,0,10,40);
  banana.velocityX=-7;
  banana.addImage("banana",bananaImage);
  banana.scale=0.1;  
  banana.y = Math.round(random(120,200));
  banana.lifetime=80;  
  FoodGroup.add(banana);
     }      
     }


function spawnObstacles(){
 if (frameCount % 300 === 0){
    obstacle = createSprite(400,270,10,40);
    obstacle.velocityX=-7;
    obstacle.scale = 0.15;
    obstacle.lifetime = 60;
   
    obstacle.addImage("ob",obstacleImage);
    obstacle.setCollider("circle",0,0,50);
   
    obstacleGroup.add(obstacle);
 }
}
