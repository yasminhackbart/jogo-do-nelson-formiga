var bg,bgImg;
var floresta,caverna,floor;
var nelson,nelson2,rato,formiga,formigaIcon,formigaIconimg,countAnts,boloDeFormigueiro,life,life1,life2,life3,lifes,shield;
var florestaimg,cavernaimg,semiCaverna,nelsonimg,nelson2img,nelson3img,nelson4img,nelson5img,nelson6img,nelsonXimg,nelsonYimg,nelsonZimg,ratoimg,moscaimg,mosca2img,formigaimg,
formiga2img,boloDeFormigueiroimg,lifeimg,backtime = 0;
var randomAnts, leftAntsGroup, rightAntsGroup;
var chooseDirection = 0;
var fase =1;

//sempre carregar as imagens primeiro aqui
function preload(){
  nelsonimg = loadImage("nelson 2.png")
  nelson2img = loadImage("nelson.png")
  nelson3img = loadImage("nelson 3.png")
  nelson4img = loadImage("nelson 4.png")
  nelson5img = loadImage("nelson 5.png")
  nelson6img = loadImage("nelson 6.png")
  nelsonXimg = loadImage("nelsonX.png")
  nelsonYimg = loadImage("nelsonY.png")
  nelsonZimg = loadImage("nelsonZ.png")
  ratoimg = loadImage("rato.png")
  formigaimg = loadImage("formiga.png")
  formiga2img = loadImage("formiga 2.png")
  formigaIconimg = loadImage("antIcon.png")
  boloDeFormigueiroimg = loadImage("bolo de formigueiro.png")
  florestaimg = loadImage("floresta.png")
  cavernaimg = loadImage("caverna.png")
  semiCaverna = loadImage("semi-caverna.png")
  lifeimg = loadImage("life.png")

}
//aqui cria as sprites quando forem uma vez só
function setup() {
  createCanvas(windowWidth,windowHeight);
  leftAntsGroup = new Group();
  rightAntsGroup = new Group();
  lifes = 3;
  shield = 0;
  countAnts = 2;
  formigaIcon = createSprite(250,80)
  nelson = createSprite(700,500)
  floor = createSprite(680,680,windowWidth)
  life1 = createSprite(1100,80)
  life2 = createSprite(1200,80)
  life3 = createSprite(1300,80)
  floor.visible=0
  life = createSprite(980,80)
  life.addImage("lifeimg",lifeimg)
  life1.addImage("boloDeFormigueiroimg",boloDeFormigueiroimg)
  life2.addImage("boloDeFormigueiroimg",boloDeFormigueiroimg)
  life3.addImage("boloDeFormigueiroimg",boloDeFormigueiroimg)
  nelson.addImage("nelsonimg",nelsonimg)
  nelson.addImage("nelson4img",nelson4img)
  nelson.addImage("nelson2img",nelson2img)
  nelson.addImage("nelson3img",nelson3img)
  nelson.addImage("nelson5img",nelson5img)
  nelson.addImage("nelson6img",nelson6img)
  nelson.addImage("nelsonXimg",nelsonXimg)
  nelson.addImage("nelsonYimg",nelsonYimg)
  nelson.addImage("nelsonZimg",nelsonZimg)
  formigaIcon.addImage("formigaIconimg",formigaIconimg)
  nelson.scale = 0.7
  life.scale = 0.2
  life1.scale = 0.3
  life2.scale = 0.3
  life3.scale = 0.3
  formigaIcon.scale = 0.5
  
}
// o que repete várias vezes
function draw() {
  // testa a quantidade de formigas que foram matadas
  // caso seja zero, passamos de fase
  if(fase == 1){
    if(countAnts == 0){
      fase = 2
    }

  background(florestaimg); 
// a cada 200 frames é criado uma formiga aleatoriamente
  if(frameCount%200==0){
    randomAnts = Math.round(random(1,2))
    if(randomAnts == 1){
      formiga = createSprite(0,490)
  formiga.addImage(formiga2img)
  formiga.scale = 0.7
  formiga.velocityX = 4
  leftAntsGroup.add(formiga);
    }
    if(randomAnts == 2){
      formiga = createSprite(1300,490)
      rightAntsGroup.add(formiga);
  formiga.addImage(formigaimg)
  formiga.scale = 0.7
  formiga.velocityX = -4
    }
    
  }

  // movimentos
  if(keyDown("a")){
    nelson.x-=16
    nelson.changeImage("nelson4img")
    chooseDirection = 1
  }
  if(keyDown("d")){
    nelson.x+=16
    nelson.changeImage("nelsonimg")
    chooseDirection = 0
  }
  if(nelson.collide(floor)){
  if(keyDown("SPACE")){
    nelson.velocityY -=40

  }
}
  if(keyWentDown("q")){
    if(chooseDirection == 0){
      nelson.changeImage("nelson2img")
      nelson.overlap(rightAntsGroup,function(colector,colected){
        colected.remove()
        countAnts-=1
      })
    }
    if(chooseDirection == 1){
      nelson.changeImage("nelson3img")
      nelson.overlap(leftAntsGroup,function(colector,colected){
        colected.remove()
        countAnts-=1
      })
    }
}
    if(keyWentDown("e")){
      if(chooseDirection == 0){
        nelson.changeImage("nelsonXimg")
        nelson.overlap(rightAntsGroup,function(colector,colected){
          colected.remove()
          countAnts-=1
        })
        nelson.x += 70
      }
      if(chooseDirection == 1){
        nelson.changeImage("nelsonYimg")
        nelson.overlap(leftAntsGroup,function(colector,colected){
          colected.remove()
          countAnts-=1
        })
        nelson.x -= 70
      }
    } 
//codigo para quando o e for levantado voltar ao normal
    if(keyWentUp("e")){
      if(chooseDirection==0){
        nelson.changeImage("nelsonimg")
      }
      if(chooseDirection==1){
        nelson.changeImage("nelson4img")
      }
    
    }

  nelson.velocityY +=2
  nelson.overlap(leftAntsGroup,function(colector,colected){
    if(shield==0){
      lifes-=1
    }
    shield+=1
    nelson.changeImage("nelson5img")
  })
  nelson.overlap(rightAntsGroup,function(colector,colected){
    if(shield==0){
      lifes-=1
    }
    shield+=1
    nelson.changeImage("nelson6img")
  })
  if(shield>=80){
    shield=0
  }
  if(lifes==2){
    life3.destroy();
  }
  if(lifes==1){
    life2.destroy();
  }
  if(lifes==0){
    life1.destroy();
  }
  if(lifes  <=0){
    nelson.changeImage("nelsonZimg")
    fase  = 3
  }
  textSize(100)
  fill("black")
text(countAnts,100,130)

drawSprites();
  }
  
  //muda o fundo com o tempo como se fosse um flash
  if(fase == 2){
    backtime+=1;
    leftAntsGroup.destroyEach();
    rightAntsGroup.destroyEach();
    nelson.collide(floor);

    if(backtime>=0 && backtime<=100){
      background(semiCaverna)
      nelson.visible=false;
    }
    if(backtime>=100 && backtime<=200){
      background("gray")
      nelson.visible=false;
    }
    if(backtime>=200 && backtime<=300){
      background("white")
      nelson.visible=false;
    }
    if(backtime>=300 && backtime<=400){
      background(semiCaverna)
      nelson.visible=true;
    }
    if(backtime>=400 && backtime<=500){
      background("gray")
      nelson.visible=false;
    }
    if(backtime>=500 && backtime<=600){
      background("white")
      nelson.visible=false;
      fase=3
    }
    drawSprites();
  }

  if(fase==3){
    background(cavernaimg);
    drawSprites();
  }
}

