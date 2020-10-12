/**************************************************
conditionals
**************************************************/
let bgDark = {
  r: 48,
  g: 65,
  b: 79
}

let bgLight = {
  r: 202,
  g: 225,
  b: 244
}

let hex = {
  x: 0,
  y: 0,
  fill: 255,
  size: 10,
  speed: .01
}

let hex2 = {
  x: 0,
  y: 0,
  fill: 255,
  size: 10,
  speed: .01
}

let hex3 = {
  x: 0,
  y: 0,
  fill: 255,
  size: 10,
  speed: .01
}

let hex4 = {
  x: 0,
  y: 0,
  fill: 255,
  size: 10,
  speed: .01
}

let snowflakes = [];

// for landscape lines
let a;
let b;

// for rainbow animation
let sundogArea = false;
let size = 20;

//rainbow graphic
var X = 0;

//halo
let img;


function setup() {
  createCanvas(windowWidth, windowHeight);

  noStroke();
  noCursor();

  a = height / 3 * 2;
  b = height / 3 * 2;

  // set the starting position of sun in sky
  mouseX = width/2;
  mouseY = height/2-150;

  //adjust size for vertical screens
  if (width < 900) {
    mouseX = width/2;
    mouseY = height/2+ 200;
  }

}


function preload() {
    img = loadImage('../assets/images/halo.png');
  }


function draw() {
  background(bgDark.r, bgDark.g, bgDark.b);

  //creates the effect of sky getting lighter or darker based on
  //mouseX position by mapping the alpha level to the mouse position
  let m = map(mouseY, 0, height, 255, 100);
  fill(bgLight.r, bgLight.g, bgLight.b, m);
  rect(0, 0, width, height); //light sky


  sky();
  landscape();





  // moving line landscape
  push();
  stroke(182, 203, 220, 200);
  fill(0, 10);
  rect(0, a, width, a);
  a = a + .1;
  if (a > height-100) {
    a = height/3 *2;
  }

  // 2nd set of lines
  // line(0, b, width, b);
  // b = b + .2;
  // if (b > height-20) {
  //   b = height/3 *2;
  // }
  pop();


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

if (sundogArea) {
// flickering ice crystals
  iceCrystals();
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




//first state, text slide.
  // push();
  // fill(255, 175);
  // rect(width/10, height/10, width/10 *8, height /10*8)
  //
  // let title = 'Snowdog\nSimulation\nV.1.0';
  // textSize(50);
  // fill(58, 66, 77, 175);
  // textAlign(CENTER, TOP);
  // text(title, width/9, height/5, width/10 *8, height /10*6);
  //
  // textSize(28);
  // textAlign(CENTER, BOTTOM);
  // let text1 = 'press any key to start [ ]';
  // text(text1, width/9, height/6, width/10 *8, height /10*6);// Text wraps within text box
  // pop();
}

function sky() {
  // draw star/sun lines
  // stroke(245);

  push();
  strokeWeight(1);
  stroke(random(225, 255));

  // centering the star/sun around cursor or close enough
  translate(mouseX + -width/2, mouseY + -height/2 - 200);

  points 			= 18;					//number of points
  pointAngle 	= 360/points; //angle between points
  radius 			= width/2; 		//length of each line from centre to edge of circle

  for (angle = 270; angle < 630; angle = angle + pointAngle) {
  	x = cos(radians(angle)) * radius; //convert angle to radians for x and y coordinates
  	y = sin(radians(angle)) * radius;
  	line(radius, radius, x+radius, y+radius);

}

  // only show in specific area
  if (mouseX > width/2 - 75 && mouseX < width/2 + 75 && mouseY < height/2-143 && mouseY > height/4) {
  noFill();
  sundogArea = true;

  //rainbow graphic
  push();



  for (let k=0; k<1; k++) {
  ellipseMode(CENTER);
  strokeWeight(10);

  X = mouseY-193;

  //rainbow colors

  noFill();

  //violet
  stroke(100,0,200,X-10);
  ellipse(radius, radius, size+45);

  //indigo
  stroke(150,0,200,X-10);
  ellipse(radius, radius, size+35);

  //blue
  stroke(0,150,250,X);
  ellipse(radius, radius, size+30);

  //green
  stroke(20,250,20,X);
  ellipse(radius, radius, size+20);

  //yellow
  stroke(250,250,0,X-20);
  ellipse(radius, radius, size+15);

  //orange
  stroke(250,150,40,X);
  ellipse(radius, radius, size+10);

  //red
  stroke(240,20,20,X);
  ellipse(radius, radius, size);



  //sundog bright spots


  if (mouseIsPressed && X > 10) {
    // if (size > width) {
    //   size =10;
    // }else {
    //   size += 10;
    // }
    push();
    // fill(random(200, 255), 200);
    // noStroke();
    // hexagon(radius, radius, 7);
    // hexagon(radius + size, radius - 5, 5);
    // hexagon(radius - size, radius - 5, 5);

    //sundog circle
    // imageMode(CENTER);
    // image(img, radius, radius);
    // img.resize(150, 0);
    pop();
  }
  pop();
  }
}
else {
  sundogArea = false;
}

  pop();
}

function landscape() {
  // create the landscape
  push();
  stroke(225);
  let m2 = map(mouseY, 0, height, 225, 0);
  fill(87, 97, 109);
  triangle(mouseX-150, 2*height/3, 0, 250, 0, height);
  triangle(mouseX+150, 2*height/3, width, 200, width, height);

  fill(162, 180, 195, m2);
  triangle(mouseX-150, 2*height/3, 0, 250, 0, height);
  triangle(mouseX+150, 2*height/3, width, 200, width, height);

  fill(182, 203, 220, 200);
  rect(0, 2*height/3, width, height/2);


  let m3 = map(mouseY, 0, height, 225, 50);
  fill(87, 97, 109);
  triangle(mouseX-10, 2*height/3, 0, 350, 0, height);
  triangle(mouseX+10, 2*height/3, width, 350, width, height);
  fill(157, 175, 190, m3);
  triangle(mouseX-10, 2*height/3, 0, 350, 0, height);
  triangle(mouseX+10, 2*height/3, width, 350, width, height);
  stroke(235);
  fill(182, 203, 220, 200);
  rect(0, 2*height/3, width, height/2);

  pop();
}

//draws a hexagon
function hexagon (x, y, r) {

	push();
  translate(x, y);
  beginShape();
	for (var i = 0; i < 7; i++) {

		let x = r * cos(TWO_PI/6 * i + TWO_PI/12);
		let y = r * sin(TWO_PI/6 * i + TWO_PI/12);
		vertex(x, y);

	}
	endShape();
  pop();

}

function iceCrystals() {
  for (let i = 0; i < 1; i++) {

    //circle top left
    // circle.fill = random(0, 150);
    // circle.size = random(0, 70);
    // circle.x = random(0, mouseX);
    // circle.y = random(0, mouseY);
    // fill(circle.fill);
    // // circle.x = circle.x + circle.speed;
    // ellipse(circle.x, circle.y, circle.size);

    //circle top right
    hex2.fill = random(200, 255);
    hex2.size = random(0, 40);
    hex2.x = random(mouseX, width);
    hex2.y = random(0, mouseY);
    fill(hex2.fill);
    hex.x = hex2.x + hex2.speed;
    hexagon(hex2.x, hex2.y, hex2.size);

    //circle bottom left
    hex3.fill = random(200, 255);
    hex3.size = random(0, 30);
    hex3.x = random(0, mouseX);
    hex3.y = random(height, mouseY);
    fill(hex3.fill);
    hex3.x = hex3.x + hex3.speed;
    hexagon(hex3.x, hex3.y, hex3.size);

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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
