/**************************************************
05-looking-for-love
JPoohachoff
**************************************************/

let circle1 = {
  x: 150,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 3
}

let circle2 = {
  x: 350,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 3
}

let state = `title`; // can be title, simulation, love or sadness

function setup() {
  createCanvas(500, 500);

  setupCircles();
}

function setupCircles() {
  circle1.x = width/3;
  circle2.x = 2 * width/3;
  circle1.vx = random(-circle1.speed, circle1.speed);
  circle2.vx = random(-circle2.speed, circle2.speed);

  circle1.vy = random(-circle1.speed, circle1.speed);
  circle2.vy = random(-circle2.speed, circle2.speed);
}



function draw() {
  background(0);

  if (state === `title`) {
    title();
  }
  else if (state === `simulation`) {
    simulation();
  }
  else if (state === `love`) {
    love();
  }
  else if (state === `sadness`) {
    sadness();
  }
}

function title() {
  push();
  textSize(64);
  fill(200, 100, 100);
  textAlign(CENTER, CENTER);
  text(`LOVE?`, width/2, height/2);
  pop();
}

function simulation() {
  move();
  checkOffscreen();
  checkOverlap();
  displayCircles();
}

function love() {
  push();
  textSize(84);
  fill(255, 100, 100);
  textAlign(CENTER, CENTER);
  text(`LOVE!`, width/2, height/2);
  pop();
}

function sadness() {
  push();
  textSize(84);
  fill(150, 255, 200);
  textAlign(CENTER, CENTER);
  text(`:(`, width/2, height/2);
  pop();
}


function move() {
  // move circles
  circle1.x += circle1.vx;
  circle1.y += circle1.vy;

  circle2.x += circle2.vx;
  circle2.y += circle2.vy;
}

function checkOffscreen() {
  //check to see if circles have gone off screen
  if (isOffscreen(circle1) || isOffscreen(circle2)) {
    state = `sadness`;
  }
}

function isOffscreen(circle) {
  if (circle.x < 0 || circle.x > width || circle.y < 0 || circle.y > height) {
    return true;
  }
  else {
    return false;
  }
}

function checkOverlap() {
  // check to see if the circles overlap
  let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);
  if (d < circle1.x/2 + circle2.size/2) {
    state = `love`;
  }
}

function displayCircles() {
  //display circles
  ellipse(circle1.x, circle1.y, circle1.size);
  ellipse(circle2.x, circle2.y, circle2.size);
}

function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  }
}
