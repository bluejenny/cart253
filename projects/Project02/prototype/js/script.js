
// Project 2 Protype
// Jen Poohachoff

// ************************************** //
//            Féérie d'Hiver             //
// ************************************ //

// A winter simulation that
// guides the user through
// a snowy landscape
// in search of the perfect moment
// under the winter sun.
// Gifts and curiousities can be
// found along the way and
// will be keys in accessing
// the ending/exit animation

//darker background behind animation to make it appear as if getting darker
let bgDark = {
  r: 48,
  g: 65,
  b: 79
}

//sky bacground, opacity fades as mouseY moves down
let bgLight = {
  r: 202,
  g: 225,
  b: 244
}

//for the ice crystals
let hex = {
  x: 0,
  y: 0,
  fill: 255,
  size: 10,
  speed: .01
}

let spotRect = {
  x: 0,
  y: 0,
  width: 50,
  height: 50
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

//images for key pressed
let halo;
let yay;
let yayX = -150;
let yayY = 50;
let yaySpeed = 50;

let state = `animation`; // possible states are title, animation and ending

//sound effects for key pressed
let aSFX;



function preload() {
    halo = loadImage('assets/images/halo.png');
    yay = loadImage('assets/images/yay.png');
    aSFX = loadSound(`assets/sounds/a-sigh.mp3`);
  }


function setup() {
  createCanvas(windowWidth, windowHeight);

  noStroke();
  noCursor();

  //for landscape function
  a = height / 3 * 2;
  b = height / 3 * 2;

  // set the starting position of sun in sky
  // resetMouse();

}

// function resetMouse() {
//   mouseX = width/2;
//   mouseY = height/2;
// }


function draw() {
  background(bgDark.r, bgDark.g, bgDark.b);

  if (state === `title`) {

    // title
    title();

  }
  else if (state === `animation`) {
  animation();
}

  else if (state === `ending`) {
    ending();
  }

}

function mouseClicked() {

    if (yayX > width*2) {
      yayX = -500;
    }
    else {
      yayX += yaySpeed;
    }
}

function keyPressed() {
  aSFX.play();
}

function animation() {
  sky();
  landscape();
  landscapeMovingLine();
  fallingSnow();

  push();
  fill(56, 124, 96);
  triangle(190, height-75, 300, height-400, 410, height-75);
  image(yay, yayX, yayY);
  pop();

}

function title() {
  //  title slide
  push();
  fill(bgLight.r, bgLight.g, bgLight.b, 225);
  rect(0, 0, width, height);

  let h1 = 'Snowdog Simulation\nV.1.0';
  textSize(42);
  fill(58, 66, 77, 175);
  textAlign(CENTER, TOP);
  text(h1, width/9, height/6, width/10 *8, height /10*6);

  textSize(24);
  textAlign(CENTER, CENTER);
  let text1 = 'press any key to start [ _ ]';
  text(text1, width/9, height/6, width/10 *8, height /10*6);// Text wraps within text box
  pop();

  landscape();
}

function ending() {
  push();
  landscape();
  fill(bgDark.r, bgDark.g, bgDark.b, 100)
  rect(0, 0, width, height);

  for (let i = 0; i < 10; i++) {
  translate(width-200, 50);
  stroke(random(200, 245));
  points 			= 18;					//number of points
  pointAngle 	= 360/points; //angle between points
  radius 			= 40; 		//length of each line from centre to edge of circle

  for (angle = 270; angle < 630; angle = angle + pointAngle) {
    x = cos(radians(angle)) * radius; //convert angle to radians for x and y coordinates
    y = sin(radians(angle)) * radius;
    line(radius, radius, x+radius, y+radius);

}
  }

  pop();

  fill(255, 150);
  let h1 = 'The sun has set.';
  let text1 = 'Try again tomorrow. If you can\'t find, read below. ';
  let text2 = 'Sundogs form when sunlight refracts through icy clouds containing hexagonal crystals.\nSundogs are best seen when the sun is near the horizon but can happen througout the day.\nWhen you see a rainbow circle, you are close. You can also try resizing\nyour browser window and moving your mouse around.'
  textSize(42);
  textAlign(CENTER, TOP);
  text(h1, width/9, height/6, width/10 *8, height /10*6);
  textSize(22);
  text(text1, width/9, height/6 + 60, width/10 *8, height /10*6);

  push();
  textSize(16);
  textLeading(25);
  text(text2, width/9, height/6 + 100, width/10 *8, height /10*6);
  pop();

  textSize(24);
  textAlign(CENTER, CENTER);
  let text3 = 'press any key to go back [ _ ]';
  text(text3, width/9, height/6 +30, width/10 *8, height /10*6);// Text wraps within text box

}

function fallingSnow() {
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

function sky() {

  //creates the effect of sky getting lighter or darker based on
  //mouseX position by mapping the alpha level to the mouse position
  let m = map(mouseY, 0, height, 255, 100);
  fill(bgLight.r, bgLight.g, bgLight.b, m);
  rect(0, 0, width, height); //light sky

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

  // only show in specific area\

  if (mouseX > radius - 25 && mouseX < radius + 25 && mouseY < height/2 -50) {
  noFill();
  sundogArea = true;


  //rainbow graphic
  push();



  for (let k=0; k<1; k++) {
  ellipseMode(CENTER);
  strokeWeight(8);
  //
  X = mouseY-280;
  constrain(X, 0, 60);

  //rainbow colors

  noFill();

  //violet
  stroke(100, 0, 200, X-10);
  ellipse(radius, radius, size+45);

  //indigo
  stroke(150, 0, 200, X-10);
  ellipse(radius, radius, size+35);

  //blue
  stroke(0, 150, 250, X);
  ellipse(radius, radius, size+30);

  //green
  stroke(20, 250, 20, X);
  ellipse(radius, radius, size+20);

  //yellow
  stroke(250, 250, 0, X-20);
  ellipse(radius, radius, size+15);

  //orange
  stroke(250, 150, 40, X);
  ellipse(radius, radius, size+10);

  //red
  stroke(240, 20, 20, X);
  ellipse(radius, radius, size);



  //sundog bright spots


  if (mouseIsPressed && X > 10) {
    push();
    fill(random(200, 255), 200);
    noStroke();
    hexagon(radius, radius, 7);

    //sundog circle
    imageMode(CENTER);
    image(halo, radius, radius);
    halo.resize(150, 0);
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
  if (sundogArea) {
  // flickering ice crystals
    iceCrystals();
    }
  if (mouseIsPressed) {
    iceCrystals2();
  }
}

function landscapeMovingLine() {
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

    //circle top right
    hex.fill = random(200, 255);
    hex.size = random(0, 40);
    hex.x = random(mouseX, width);
    hex.y = random(0, mouseY);
    fill(hex.fill);
    hex.x = hex.x + hex.speed;
    hexagon(hex.x, hex.y, hex.size);

    //circle bottom left
    hex.fill = random(200, 255);
    hex.size = random(0, 30);
    hex.x = random(0, mouseX);
    hex.y = random(height, mouseY);
    fill(hex.fill);
    hex.x = hex.x + hex.speed;
    hexagon(hex.x, hex.y, hex.size);
  }
}

function iceCrystals2() {
  for (let i = 0; i < 3; i++) {

    //circle top left
    hex.fill = random(200, 255);
    hex.size = random(0, 20);
    hex.x = random(0, mouseX);
    hex.y = random(0, mouseY);
    fill(hex.fill);
    // circle.x = circle.x + circle.speed;
    hexagon(hex.x, hex.y, hex.size);

    //circle bottom right
    hex.fill = random(200, 255);
    hex.size = random(0, 20);
    hex.x = random(mouseX, width);
    hex.y = random(height, mouseY);
    fill(hex.fill);
    hex.x = hex.x + hex.speed;
    hexagon(hex.x, hex.y, hex.size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
