const canvas = document.querySelector('#canvas');

let context;

context = canvas.getContext('2d');

let backgroundImage = new Image();
backgroundImage.src = './images/background.png';

let baseImage = new Image();
baseImage.src = './images/base.png';

let caveMeleeImage = new Image();
caveMeleeImage.src = './images/cave_melee_walk0001.png';

let imagesLoaded = 0;

let scaling = 4;

let enemySpawnPointX = 0;
let enemySpawnPointY = 0;

let allySpawnPointX = 140;
let allySpawnPointY = 440;

let allyArray = [];

function onLoadImages() {
  imagesLoaded++;
  if (imagesLoaded === 3) {
    canvas.height = backgroundImage.height / scaling;
    canvas.width = backgroundImage.width / scaling;
    update();
  }
}

backgroundImage.onload = onLoadImages;
baseImage.onload = onLoadImages;
caveMeleeImage.onload = onLoadImages;

function update() {
  context.drawImage(
    backgroundImage,
    0,
    0,
    backgroundImage.width,
    backgroundImage.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  context.drawImage(
    baseImage,
    0,
    0,
    baseImage.width,
    baseImage.height,
    0,
    canvas.height - baseImage.height / scaling,
    baseImage.width / scaling,
    baseImage.height / scaling
  );

  for (let i = 0; i < allyArray.length; i++) {
    allyArray[i].draw();
  }
}

let gameRunning = setInterval(update, 30);

class caveMelee {
  constructor() {
    this.dx = allySpawnPointX;
    this.dy = allySpawnPointY - caveMeleeImage.height;
  }

  draw() {
    this.dx++;
    context.drawImage(
      caveMeleeImage,
      0,
      0,
      caveMeleeImage.width,
      caveMeleeImage.height,
      this.dx,
      this.dy,
      caveMeleeImage.width / scaling,
      caveMeleeImage.height / scaling
    );
  }
}

function createCaveMelee() {
  allyArray.push(new caveMelee());
}

// let enemy1 = new caveMelee(20, 20);
// console.log(enemy1);

setInterval(createCaveMelee, 1000);
