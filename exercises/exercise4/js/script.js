"use strict";

/**************************************************
Exercise 04: The Age of Aquariums
Jen Poohachoff
**************************************************/

let user = {
  x: 0,
  y: 0,
  size: 100
}

let aphids = [];

let numAphids = 20;
let counter;

let state = `animation`; // animation, greenthumb, deadplant

// let flower = {
//   x: 0,
//   y: -35,
//   rad: 300,
//   numLeafs: 9
// }

function setup() {
  createCanvas(windowWidth, windowHeight);

  counter = numAphids;

  for (let i = 0; i < numAphids; i++) {
    aphids[i] = createAphids(random(0, width), random(0, height));
  }
}

function createAphids(x, y) {
  let aphid = {
    x: x,
    y: y,
    size: 30,
    vx: .1,
    vy: .25,
    speed: .25
  }
  return aphid;
}


function draw() {
  background(100,200,255);


  if (state === `animation`) {
    animation();
  }
  else if (state === `greenthumb`) {
    greenthumb();
  }
  else if (state === `deadplant`) {
    deadplant();
  }
}

function animation() {
  moveUser();

  // draw leaves
  drawLeaves();

  for (let i = 0; i < aphids.length; i++) {
      push();
      checkAphids(aphids[i]);
      moveAphids(aphids[i]);
      displayAphids(aphids[i]);
      pop();
    }
  displayUser();

  console.log(counter);

  if (counter <= 0) {
    state = `greenthumb`;
  }else if (counter >= 30) {
    state = `deadplant`;
  }
}

function greenthumb() {
  drawLeaves();
}

function deadplant() {
  drawDeadLeaves2();
}

function drawLeaves() {
  push();
  fill(7, 99, 29);
  stroke(0, 139, 70);
  rotate(PI/6);
  displayLeaf(420, 80);
  pop();

  push();
  fill(0,159,90);
  stroke(7, 89, 29);
  translate(100, height/2);
  displayLeaf(0, 0);
  pop();

  push();
  fill(0,159,90);
  stroke(7, 99, 29);
  translate(width/2, height/2);
  rotate(PI /4)
  displayLeaf(0, 0);

  fill(7, 89, 29);
  stroke(0, 139, 70);
  displayLeaf(50, 200);

  translate(width/4, height/4);
  rotate(PI / 8)
  fill(0,159,90);
  stroke(7, 89, 29);
  displayLeaf(0, 0);
  pop();
}

function drawDeadLeaves2() {
  push();
  fill(71, 48, 26);
  stroke(44, 32, 20);
  rotate(PI/6);
  displayLeaf(420, 80);
  pop();

  push();
  fill(54, 42, 30);
  stroke(81, 58, 36);
  translate(100, height/2);
  displayLeaf(0, 0);
  pop();

  push();
  fill(54, 42, 30);
  stroke(81, 58, 36);
  translate(width/2, height/2);
  rotate(PI /4)
  displayLeaf(0, 0);

  fill(71, 48, 26);
  stroke(44, 32, 20);
  displayLeaf(50, 200);

  translate(width/4, height/4);
  rotate(PI / 8)
  fill(54, 42, 30);
  stroke(81, 58, 36);
  displayLeaf(0, 0);
  pop();
}



function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}

function moveAphids(aphid) {
  let change = random(0, 1);
  if (change < .05) {
    aphid.vx = random(-aphid.speed, aphid.speed);
    aphid.vy = random(-aphid.speed, aphid.speed);
  }

  aphid.x = aphid.x + aphid.vx;
  aphid.y = aphid.y + aphid.vy;

  aphid.x = constrain(aphid.x, 0, width/3*2);
  aphid.y = constrain(aphid.y, 100, height);
}


function checkAphids(aphid) {
  if (!aphid.eaten) {
    let d = dist(user.x, user.y, aphid.x, aphid.y);
    if (d < user.size / 2 + aphid.size /2) {
      aphid.eaten = true;
      counter += -1;
    }
  }
}

function displayUser() {
  push();
  strokeWeight(6);
  stroke(41, 25, 31);
  fill(255, 0, 0);
  ellipse(user.x, user.y, user.size);
  line(user.x - user.size/2+10, user.y - user.size/4, user.x + user.size/2-10, user.y - user.size/4);
  line(user.x, user.y + user.size/2, user.x, user.y - user.size/4);
  fill(41, 25, 31);
  // ellipse(user.x, user.y ,60);
  ellipse(user.x - user.size/4, user.y - user.size/4+20, user.size/6);
  ellipse(user.x + user.size/4, user.y - user.size/4+20, user.size/6);
  ellipse(user.x - user.size/4 +5, user.y - user.size/4+50, user.size/6);
  ellipse(user.x + user.size/4 -5, user.y - user.size/4+50, user.size/6);
  pop();
}

function displayLeaf(leafX, leafY) {

  push();
  strokeWeight(9);

  arc(leafX, leafY, 500, 900, -90, 90);
  arc(leafX, leafY, 500, 900, 90, -90);

  line(leafX, leafY-450, leafX, leafY+450);

  line(leafX-115, leafY-400, leafX, leafY-200);
  line(leafX+115, leafY-400, leafX, leafY-200);

  line(leafX-180, leafY-300, leafX, leafY-100);
  line(leafX+180, leafY-300, leafX, leafY-100);

  line(leafX-220, leafY-200, leafX, leafY);
  line(leafX+220, leafY-200, leafX, leafY);

  line(leafX-245, leafY-90, leafX, leafY+100);
  line(leafX+245, leafY-90, leafX, leafY+100);

  line(leafX-250, leafY, leafX, leafY+290);
  line(leafX+250 , leafY, leafX, leafY+290);
  pop();
}

function displayAphids(aphid) {
  if (!aphid.eaten) {
    push();
    fill(0, 255, 0);
    noStroke();
    ellipse(aphid.x, aphid.y, random(13, 15), random(15, 18));
    pop();
  }
}

function mousePressed() {
  let aphid = createAphids(random(0, width), random(0, height));
  aphids.push(aphid);
  counter += 1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
