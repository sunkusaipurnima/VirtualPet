//Create variables here

var database,dog,hungryDogImg,happyDogImg,foodAte,foodLeft;
var count;
function preload()
{
  //load images here
  hungryDogImg = loadImage("images/dogImg.png");
  happyDogImg=loadImage("images/happydog.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog= createSprite(250,250);
  dog.addImage("hungry",hungryDogImg);
  dog.scale = 0.5;

  database = firebase.database();

  console.log(database);

  foodLeft = database.ref('Food');

  foodLeft.on("value",readFoodLeft,showError);

  
  
}


function draw() {  

  background(46,139,87);
  
  if(keyDown(UP_ARROW)){
    foodAte(count);
    dog.changeImage("happy",happyDogImg);
  }

  drawSprites();
  //add styles here
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+count,170,50);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);


}

function foodAte(x){
  if(x<=0){
    x = 0;
  }else {
    x=x-1;
  }
  console.log(x);
 database.ref('/').set({
   Food:x
 });
}

function readFoodLeft(data){
  count =data.val();
  
}

function showError(){
  console.log("Error in reading data");
}


