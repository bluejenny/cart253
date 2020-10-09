/**************************************************
conditionals
**************************************************/
let bg = {
  r: 202,
  g: 225,
  b: 244
}

let circle = {
  x: 0,
  y: 0,
  fill: 255,
  size: 10,
  speed: .01
}

let circle2 = {
  x: 0,
  y: 0,
  fill: 255,
  size: 10,
  speed: .01
}

let circle3 = {
  x: 0,
  y: 0,
  fill: 255,
  size: 10,
  speed: .01
}

let circle4 = {
  x: 0,
  y: 0,
  fill: 255,
  size: 10,
  speed: .01
}

let snowflakes = [];

// let num = 15;
// let mx = [];
// let my = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  noCursor();

  // push();
  // fill(255, 153);
  // for (let i = 0; i < num; i++) {
  //   mx.push(i);
  //   my.push(i);
  // }
  // pop()
}

function draw() {
  background(bg.r, bg.g, bg.b);

  // draw lines
  stroke(245);
  strokeWeight(1);
  // stroke(random(225, 255));
  push();
  // ellipseMode(CENTER);
  translate(mouseX + -width, mouseY + -height/2 - 580);
  points 			= 16;					//number of points
  pointAngle 	= 360/points; //angle between points
  radius 			= width; 		//length of each line from centre to edge of circle

  for (angle=270;angle<630;angle=angle+pointAngle){
  	x = cos(radians(angle)) * radius; //convert angle to radians for x and y coordinates
  	y = sin(radians(angle)) * radius;
  	line(radius, radius, x+radius, y+radius); //draw a line from each point back to the centre
	}
  pop();

  push();
  //circle2.fill = random(235, 255);
  //stroke(circle2.fill);
  // noFill();
  // fill(random(225, 255));
  // fill(245);
  // ellipse(mouseX, mouseY+190, 100);
  // ellipse(mouseX, mouseY+190, 290);
  // ellipse(mouseX, mouseY+190, 250);
  pop();

  push();
  //noFill();
  // stroke(255);
  // fill(202, 225, 244);
  //stroke(182, 203, 220);
  //stroke(162, 180, 195);
  stroke(255);
  //fill(157, 175, 190);
  fill(162, 180, 195);
  // fill(60, 76, 64);
  triangle(mouseX-150, 2*height/3, 0, 250, 0, height);
  triangle(mouseX+150, 2*height/3, width, 200, width, height);

  // fill(162, 180, 195);
  // fill(141, 158, 171);
  //fill(162, 180, 195);
  fill(157, 175, 190);
  triangle(mouseX-10, 2*height/3, 0, 350, 0, height);
  triangle(mouseX+10, 2*height/3, width, 350, width, height);
  //fill(39, 57, 44);
  stroke(235);
  fill(182, 203, 220);
  rect(0, 2*height/3, width, height/2);
  rect(0, 2*height/3+5, width, height/2);
  rect(0, 2*height/3+10, width, height/2);
  rect(0, 2*height/3+20, width, height/2);
  rect(0, 2*height/3+33, width, height/2);
  // rect(0, 2*height/3+55, width, height/2);
  // rect(0, 2*height/3+85, width, height/2);
  // rect(0, 2*height/3+125, width, height/2);
  // rect(0, 2*height/3+200, width, height/2)
  pop();

  //draw snowball tracer
  // Cycle through the array, using a different entry on each frame.
  // Using modulo (%) like this is faster than moving all the values over.
  // let which = frameCount % num;
  // mx[which] = mouseX;
  // my[which] = mouseY;
  //
  // for (let i = 0; i < num; i++) {
  //   // which+1 is the smallest (the oldest in the array)
  //   let index = (which + 1 + i) % num;
  //   ellipse(mx[index], my[index], i, i);
  // }


// draw falling snow
 let t = frameCount / 60; // update time

 //create a random number of snowflakes each frame
 for (let i = 0; i < random(1); i++) {
   snowflakes.push(new snowflake()); // append snowflake object
 }

 //loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }

  for (let i = 0; i < 0; i++) {

    //circle top left
    // circle.fill = random(0, 150);
    // circle.size = random(0, 70);
    // circle.x = random(0, mouseX);
    // circle.y = random(0, mouseY);
    // fill(circle.fill);
    // // circle.x = circle.x + circle.speed;
    // ellipse(circle.x, circle.y, circle.size);

    //circle top right
    circle2.fill = random(200, 255);
    circle2.size = random(0, 50);
    circle2.x = random(mouseX, width);
    circle2.y = random(0, mouseY);
    fill(circle2.fill);
    circle2.x = circle2.x + circle2.speed;
    ellipse(circle2.x, circle2.y, circle2.size);

    //circle bottom left
    circle3.fill = random(200, 255);
    circle3.size = random(0, 30);
    circle3.x = random(0, mouseX);
    circle3.y = random(height, mouseY);
    fill(circle3.fill);
    circle3.x = circle3.x + circle3.speed;
    ellipse(circle3.x, circle3.y, circle3.size);

    //circle bottom right
    // circle4.fill = random(0, 150);
    // circle4.size = random(0, 40);
    // circle4.x = random(mouseX, width);
    // circle4.y = random(height, mouseY);
    // fill(circle4.fill);
    // circle4.x = circle4.x + circle4.speed;
    // ellipse(circle4.x, circle4.y, circle4.size);
  }
}

// snowflake class
function snowflake() {
    fill(240);
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}





// console.log(`circle.x: $(circle.x)`);
 // console.log(randomNumber);
