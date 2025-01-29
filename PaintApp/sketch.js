let colors =["red","orange","yellow","green","cyan","blue","magenta","brown","white","black"]
let currentColor = null;

function setup() {
createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 255, 255, 255, 1);
  background(255);
}

function draw() {


//palette
noStroke();
fill("lightgrey");
rect(0,0, height/2/colors.length+10, height/2+40)

  for(let i=0; i < colors.length; i++){
    noStroke();
    fill(colors[i]);
    square(5, i*35+5, height/2/colors.length);

  }

  if (mouseIsPressed){
    stroke(currentColor);
    strokeWeight(15);
    line(pmouseX,pmouseY, mouseX, mouseY);
  }
  
}

function mousePressed(){
  //change color
   for(let i=0; i < colors.length; i++){
    let size = height/2/colors.length;
    let x = 5;
    let y = i*35+5;
  

  if (mouseX > x && mouseX < x + size && mouseY > y && mouseY < y + size){

    currentColor = colors[i];
    console.log("changed color to" + colors[i]);
    return;
  
  }
  
  }
  }
