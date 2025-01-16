function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 255, 255, 255, 1);
}

function draw() {
  background(255, 255,255);

  //Sketch 1
  fill(1);
  text("1", 48, 48)
  fill(0,255,0);
  noStroke();
  rect(50, 50, 180,100);
  fill(255);
  stroke(1);
  square(80,75,50);
  fill(255);
  circle(180, 100, 50);

  //Sketch 2
  fill(0);
  text("2", 300, 48)
  fill(230,230,230);
  noStroke();
  square(300, 50, 150);
  fill(0, 0, 255, .3);
  circle(350, 150, 70)
  fill(0, 255, 0, .3);
  circle(400, 150, 70)
  fill(255, 0, 0, .3);
  circle(375, 110, 70)

  //Sketch 3
  fill(0);
  text("3", 500, 48)
  fill(0,0,0);
  noStroke();
  rect(500, 50, 180,100);
  fill('yellow');
  arc(550, 100, 50, 50, PI+.8, PI-.8);
  fill('red'),
  circle(620,100, 50);
  rect(595,100, 50, 25);
  fill('white');
  circle(610,100, 15);
  circle(630,100, 15);
  fill('blue');
  circle(610,100, 10);
  circle(630,100, 10);

//Sketch 4 
fill(0);
  text("4", 800, 48)
  fill('darkblue');
  noStroke();
  square(800, 50, 180);
  fill('green');
  stroke('white');
  strokeWeight(3);
  circle(890, 135, 100);

  fill('red');
  beginShape();
  vertex(890,80);
  vertex(910, 120);
  vertex(940, 120);
  vertex(915, 144);
  vertex(930, 180);
  vertex(890,160);
  vertex(850, 180);
  vertex(865, 144);
  vertex(840, 120);
  vertex(870, 120);
  vertex(890,80);


  endShape();
  

}
