var bg,bgI;
var plane, planeImg;
var ms1Img,ms2Img,ms3Img,ms4Img,ms5Img,msG,msG1;
var missileI,missileG;
var gameState = PLAY;
var PLAY = 1;
var END = 2;
var start,startI;
var Score = 0;
var go,goI;
var s1I,s2I,dia,diaI,sG,diaG;
var ufo1I,ufo2I,ufoG;
var space,spaceI;

function preload(){
 
  bgI = loadImage("background.png");
  planeImg = loadImage("plane.png");
  ms1Img = loadImage("ms1.png");
  ms2Img = loadImage("ms2.png");
  ms3Img = loadImage("ms3.png");
  ms4Img = loadImage("ms4.png");
  ms5Img = loadImage("ms5.png");
  missileI = loadImage("missile.png");
  startI = loadImage("start.png");
 
  goI = loadImage("gameover.png");
  s1I = loadImage("star2.png");
  s2I = loadImage("star3.png");
  diaI = loadImage("diamond.png");
  ufo1I = loadImage("ufo.png");
  ufo2I = loadImage("ufo1.png");
  spaceI = loadImage("space.png");

}

function setup() {
  createCanvas(700,700);

  msG = new Group();
  msG1 = new Group();
  missileG = new Group();
  sG = new Group();
  diaG = new Group();
  ufoG = new Group();

  bg = createSprite(350,350,0,0);
  bg.addImage(bgI);
  bg.scale = 2;

  plane = createSprite(0,330,0,0);
  plane.addImage(planeImg);
  plane.scale = 0.25;

  start = createSprite(350,350,0,0);
  start.addImage(startI);
  start.scale = 1;

  space = createSprite(350,670,0,0);
  space.addImage(spaceI);
  space.scale = 0.3;

  go = createSprite(330,290,0,0);
  go.addImage(goI);
  go.scale = 0.5;

}

function draw() {
  background(0);
  edges = createEdgeSprites();

  bg.visible = false;
  plane.visible = false;
  go.visible = false;

  if(mousePressedOver(start)){
    gameState = PLAY;
    Score = 0;
    plane.y = 330;
  }
  
  if(gameState === PLAY){
    
    bg.visible = true;
    plane.visible = true;
    start.y = 1000;
    
  if(keyDown(UP_ARROW)){ 
    plane.y = plane.y - 7;
  }

  if(keyDown(DOWN_ARROW)){
    plane.y = plane.y + 7;
  }

  if(keyWentDown("space")){
    missile();
  }

  if(plane.isTouching(msG)){
    gameState = END;
  }

  if(plane.isTouching(diaG)){
    Score = Score+3;
    diaG.destroyEach();
  }

  if(plane.isTouching(sG)){
    Score = Score+2;
    sG.destroyEach();
  }

  if(plane.isTouching(ufoG)){
    gameState = END;
  }

  if(plane.isTouching(msG1)){
    gameState = END;
  }

  if(missileG.isTouching(ufoG)){
    ufoG.destroyEach();
    Score = Score + 1;
    missileG.destroyEach();
  }

  plane.collide(edges);
  monsters();  
  monsters1();
  diamond();
  stars();
  ufos();

  }

  else if(gameState === END) {

    msG.destroyEach();
    msG1.destroyEach();
    missileG.destroyEach();
    sG.destroyEach();
    diaG.destroyEach();
    ufoG.destroyEach();
    start.y = 350;

    go.visible = true;

    if(mousePressedOver(start)) {
      gameState = PLAY;   
      Score = 0;
      go.visible = false;
      plane.y = 330;
   
    }
  }

  drawSprites();

  textSize(25);            
  fill("cyan");
  stroke("cyan");
  text("Score:" +Score, 300,50 );
  
  textSize(30);            
  fill("orange");
  stroke("orange");
  text("Press",210,680);
  text("to shoot",410,680);

}

function monsters(){
    
  if(frameCount % 240 === 0){
    var ms = createSprite(750,0,10,10);
    ms.velocityX = -6;
    ms.y = Math.round(random(25,600));
    msG.add(ms);
    
    var rand = Math.round(random(1,3));
    switch(rand) {

      case 1: ms.addImage(ms3Img);
      ms.scale = 0.3;
      break;

      case 2: ms.addImage(ms4Img);
      ms.scale = 0.3;
      break;

      case 3: ms.addImage(ms5Img);
      ms.scale = 0.3;
      break;

    }}}

function monsters1(){
    
  if(frameCount % 190 === 0){
    var ms1 = createSprite(750,0,10,10);
    ms1.velocityX = -5;
    ms1.y = Math.round(random(25,600));
    msG1.add(ms1);
    
    var rand = Math.round(random(1,2));
    switch(rand) {

      case 1: ms1.addImage(ms1Img);
      ms1.scale = 0.3;
      break;

      case 2: ms1.addImage(ms2Img);
      ms1.scale = 0.3;
      break;

    }}}

function missile(){
  var missile = createSprite(80,0,0,0);
    missile.addImage(missileI);
    missile.scale = 0.1;
    missile.y = plane.y;
    missile.lifetime = 300;
    missile.velocityX = 8;
    missileG.add(missile);
    missile.visible = true;
  }

function diamond() {
  if(frameCount % 230 === 0){
    var dia = createSprite(750,0,0,0);
    dia.y = Math.round(random(20,600));
    dia.addImage(diaI);
    dia.scale = 0.12;
    dia.lifetime = 300;
    dia.velocityX = -6;
    diaG.add(dia);
  }}

function stars(){
    
  if(frameCount % 260 === 0){
    var st = createSprite(750,0,10,10);
      st.velocityX = -7;
      st.y = Math.round(random(25,600));
      sG.add(st);
      
      var rand = Math.round(random(1,2));
      switch(rand) {
  
        case 1: st.addImage(s1I);
        st.scale = 0.09;
        break;
  
        case 2: st.addImage(s2I);
        st.scale = 0.2;
        break;
      }}}

function ufos(){
    
  if(frameCount % 240 === 0){
    var ufo = createSprite(750,0,10,10);
      ufo.velocityX = -6;
      ufo.y = Math.round(random(25,700));
      ufoG.add(ufo);
          
      var rand = Math.round(random(1,2));
      switch(rand) {
      
        case 1: ufo.addImage(ufo1I);
        ufo.scale = 0.2;
        break;
      
        case 2: ufo.addImage(ufo2I);
        ufo.scale = 0.2;
        break;
      }}}   