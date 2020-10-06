/**************************************************
05 - States

**************************************************/

let circle = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 2
}

let bg = 0;

let state = `title`; // possible states are title, animation and ending

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  circle.vx = circle.speed;
  textSize(32);
  textAlign(CENTER, CENTER);
  circle.y = height/2;

}

function draw() {
  background(bg);

  if (state === `title`) {

  // title
  title();

  }
  else if (state === `animation`) {

  // animation
  circle.x += circle.vx;
  circle.y += circle.vy;

  if (circle.x > width) {
    state = `ending`;
  }
  ellipse(circle.x, circle.y, 100);
  }

  else if (state === `ending`) {

  // ending
  fill(127);
  text(`It's all over.`, width/2, height/2);
  }

  textAlign(CENTER, CENTER);
  textSize(64);
  fill(255);
  text(key, width/2, height/2);

}

function title() {
  fill(255);
  text(`Life.`, width/2, height/2);
}

function keyPressed() {
  if (state === `title`) {
    state = `animation`;
  }

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
