const Engine=Matter.Engine;
const World=Matter.World;
const Bodies=Matter.Bodies;
const Constraint = Matter.Constraint;


var engine,world,ground,launcher;
var mango1, mango2, mango3, mango4, mango5;
var tree, boy, stone, boyImage;

function preload(){
  boyImage = loadImage("sprites/boy.png");
}

function setup() {
  createCanvas(800,400);
  engine = Engine.create(); 
  world = engine.world;

  ground = new Ground(400,height,800,20);
  stone = new Stone(170,295,60);
  launcher = new Launcher(stone.body,{x:170,y:295}); 
  tree = new Tree(0,0,300,400);
  mango1 = new Mango(0,0,50);
  mango2 = new Mango(0,0,10);
  mango3 = new Mango(0,0,10);
  mango4 = new Mango(0,0,10);
  mango5 = new Mango(0,0,10);
  boy = createSprite(220,350,0,0);
  boy.addImage(boyImage);
  boy.scale = 0.1;
}

function draw() {
  background(255,255,255);  
  Engine.update(engine);

  // console.log(mouseY);
 
  ground.display();
  stone.display();
  launcher.display();
  tree.display();
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();

  detectCollision(stone,mango1);
  detectCollision(stone,mango2);
  detectCollision(stone,mango3);
  detectCollision(stone,mango4);
  detectCollision(stone,mango5);

  drawSprites();
}

function mouseDragged(){
  Matter.Body.setPosition(stone.body,{x:mouseX,y:mouseY});
}

function mouseReleased(){
  launcher.fly();
}

function detectCollision(lstone,lmango){
  mangoBodyPosition = lmango.body.position;
  stoneBodyPosition = lstone.body.position;

  var distance=dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y);
    if(distance<=lmango.r+lstone.r){
      Matter.Body.setStatic(lmango.body,false);
    }
}

function keyPressed(){
  if(keyCode === 32) {
    Matter.Body.setPosition(stone.body, {x:235, y:420})
    launcher.attach(stone.body);
  }
}
