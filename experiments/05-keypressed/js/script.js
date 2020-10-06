/**************************************************
05 - keypressed

**************************************************/


let bg = 0;

let circle = {
  x: 250,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 2
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

}


function draw() {
  background(bg);

  // let change = random();
  // if (change < 0.02) {
  //   circle.vx = random(-circle.speed, circle.speed);
  //   circle.vy = random(-circle.speed, circle.speed);
  // }

  let dx = circle.x - mouseX;
  let dy = circle.y - mouseY;

  if (dx > 0) {
    circle.vx = circle.speed;
  }
  else if (dx <0) {
    circle.vx = -circle.speed;
  }

  if (dy < 0) {
    circle.vy = circle.speed;
  }
  else if (dy > 0) {
    circle.vy = -circle.speed;
  }

  circle.x += circle.vx;
  circle.y += circle.vy;

  ellipse(circle.x, circle.y, circle.size);

  textAlign(CENTER, CENTER);
  textSize(64);
  fill(255);
  text(keyCode, width/2, height/2);

  if (keyIsDown(65)) {
    rectMode(CENTER);
    rect(width/2, height/2, 100, 100);
  }

}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    bg += 10;
    bg = constrain(bg, 0, 255);
  }
  else if (keyCode === DOWN_ARROW) {
    bg += -10;
    bg = constrain(bg, 0, 255);
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
