/**************************************************
conditionals
**************************************************/
// let backgroundShade = 0;
// let bg = {
//   r: 0,
//   g: 0,
//   b: 0
// }
let circle = {
  x: 0,
  y: 0,
  fill: 124,
  size: 50,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  acceleration: 0.1,
  maxSpeed: 5,
}


var points = []
var i = 0

function setup() {
  createCanvas(windowWidth, windowHeight);
  // circle.x = width/2;
  // circle.y = height/2;
}

function draw() {
  // background(bg.r, bg.g, bg.b);
  // noStroke();

  push();
  // noFill()
  translate(width/2, height/2)
  // fill(`red`);
  stroke(255)
  strokeWeight(2)


  beginShape()
  points.forEach(point => {
    vertex(point.x,point.y)
  })
  endShape()

  i+= 0.01
        var r = 5
        var x = r * 16 * pow(sin(i), 3)
        var y = - r * 1* (13 * cos(i) - 5 * cos(2*i) - 2*cos(3*i) - cos(4* i))
        points.push({x, y})

  pop();

  // movement of circle around cursor
  if (mouseX < circle.x) {
    circle.ax = -circle.acceleration;
  }
  else {
    circle.ax = circle.acceleration;
  }

  if (mouseY < circle.y) {
    circle.ay = -circle.acceleration;
  }
  else {
    circle.ay = circle.acceleration;
  }

  // To use noise we need to provide an argument to it
  // that changes over time, circle.tx for our horizontal movement
  // and circle.ty for our vertical movement. t is for "time" here.
  circle.tx = circle.tx + 0.025;
  circle.ty = circle.ty + 0.025;
  // Changing the number we add to our "time" values changes the
  // resulting "smoothness" of the movement.

  // Now we calculate the noise value based on those "time" values
  // Because they increase over time, noise() returns different values
  // each frame.
  let noiseX = noise(circle.tx);
  let noiseY = noise(circle.ty);

  circle.vx = circle.vx + circle.ax;
  circle.vx = constrain(circle.vx, -circle.maxSpeed, circle.maxSpeed)
  circle.vy = circle.vy + circle.ay;
  circle.vy = constrain(circle.vy, -circle.maxSpeed, circle.maxSpeed)

  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;

  // circle.x = mouseX;
  // circle.y = mouseY;
  ellipse(circle.x, circle.y, circle.size);


  //fill(100, 200, 100);

  // let x = caterpillar.x;
  // let numSegments = 10;
  //let segmentsDrawn = 0;

  // while (segmentsDrawn < numSegments) {
  //   ellipse(x, caterpillar.y, caterpillar.segmentSize)
  //   x += 40;
  //   segmentsDrawn++;
  // }
  //
  // for (let i = 0; i < numSegments; i++) {
  //     ellipse(x, caterpillar.y, caterpillar.segmentSize)
  //     x += 40;
  // }



  // ellipse(caterpillar.x,caterpillar.y, caterpillar.segmentSize)
  // x = x + 40;
  //
  // ellipse(x,caterpillar.y, caterpillar.segmentSize)

  // ellipse(caterpillar.x + 40,caterpillar.y, caterpillar.segmentSize)
  // ellipse(caterpillar.x + 80,caterpillar.y, caterpillar.segmentSize)
  // ellipse(caterpillar.x + 120,caterpillar.y, caterpillar.segmentSize)
  // ellipse(caterpillar.x + 160,caterpillar.y, caterpillar.segmentSize)

  // if (mouseIsPressed) {
  //   displayCircle = true;
  // }
  //
  // if (displayCircle) {
  //   ellipse(width/2, height/2, 100, 100);
  // }

  // if (keyIsPressed) {
  //   background(255);
  // }
  // else {
  //   background(0);
  // }

  // circle.fill = random(0, 255);
  // fill(circle.fill);
  // circle.x = circle.x + circle.speed;

  // if (circle.x > width) {
  //   circle.speed = -circle.speed;
  // }
  //
  // if (circle.x < 0) {
  //   circle.speed = -circle.speed;
  // }

  // ellipse(circle.x, height/2-30, circle.size );

  // if (mouseX < width/3) {
  //   fill(255, 0, 0);
  // }
  // else if (mouseX < 2 * width/3) {
  //   fill(0, 255, 0);
  // }
  // else {
  //   fill(0, 0, 255);
  // }

  // fill(255, 255, 255);

  // if (circle.x > width/3) {
  //   if (circle.x < 2 * width/3) {
  //     fill(255, 0, 0)
  //   }
  // }

  // if (circle.x < width/3 || circle.x > 2 * width/3) {
  //   fill(255, 0, 0);
  // }

  // if (!(circle.x < width/3)) {
  //   fill(255, 0, 0);
  // }

}

function mousePressed() {
  bg.r = random(0, 255);
  bg.g = random(0, 255);
  br.b = random(0, 255);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



// console.log(`circle.x: $(circle.x)`);
 // console.log(randomNumber);
