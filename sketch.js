var dog,sadDog,happydog,database;
var fedTime,lastFed;
var foodS,foodStock;
var foodObj;
var feed,addFood

function preload () {
  saddog = loadImage("images/Dog.png")
  happydog = loadImage("images/dogImg1.png")

  
}
function setup(){
  database = firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

foodStock = database.ref('Food');
foodStock.on("value",readStock);

dog = createSprite(200,100,250,300);
dog.addImage(sadDog);
dog.scale = 0.2;

feed = createButton("feed the dog");
feed.positon(700,95);
feed.mousePressed(feedDog)

addFood = createbutton(" Add food")
addFood.positon(800,95);
addFood.mousePressed(addFoods)


}
function draw() {
  background(46,139,87)
  foodObj.display()
  
  fedTime = database.ref("Feed time")
  fedTime.on("value",function(data){
 lastFed =  data.val()
  })
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("last time:", lastFed%12 + "PM",350,30)
    
  }
  else if (lastFed == 0){
    text("last feed:12 AM",350,30)
  }
  else{
    text("last feed:" + lastFed +"AM",350,30)
  }
  drawSprites();
}
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
  
}
function feedDog() {
  dog.addImage(happydog);
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0)
    
  }
  else {
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  
}

database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()

  
})
}
function addFoods() {
  foodS++
  database.ref('/').update({
    Food:foodS
  })
  
}