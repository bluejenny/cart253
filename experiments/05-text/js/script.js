/**************************************************
05 - Functions 2 - Text

**************************************************/
// let hamlet = "to be or not to be";
//
// let hamlet2 = 'that is the question';
//
// let hamlet3 = `whether it is nobler in the mind...`

let hello = {
  string: `Hello, world!`,
  x: 0,
  y: 0,
  vx: 5,
  vy: 1,
  size: 64
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  let hotCelsius = toCelsius(100);
  console.log(`100 desgrees fahrenheit is ${hotCelsius} degrees celsius.`);

}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  hello.x = hello.x + hello.vx;
  hello.y = hello.y + hello.vy;

  hello.size += 1;

  textAlign(CENTER, CENTER);
  textSize(hello.size);
  fill(200, 50, 200);
  text(hello.string, hello.x, hello.y);

  let x = random(0, width);
  let y = random(0, height);

  ellipse(x, y, 100);

}

function toCelsius(f) {
  let celsius = (f - 32) * 5/9;
  return celsius;
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
