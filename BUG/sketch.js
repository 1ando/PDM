let GameStates = Object.freeze({
  START: 'start',
  PLAY: 'play',
  END: 'end',
});

let gameState = GameStates.START;
let score = 0;
let time = 30;
let highScore = 0;
let gameFont;
let bugSpriteSheet;
let bugSpeed = 1;
let bugTurnSpeed = 30;
let bugs = [];
let splattedBugs = [];

function preload() {
  gameFont = loadFont('media/PressStart2P-Regular.ttf');
  bugSpriteSheet = loadImage('media/Bug.png');
}

function setup() {
  createCanvas(400, 400);
  textFont(gameFont);
  for (let i = 0; i < 5; i++) {
    let bug = new Bug(Math.random() * (width - 32), Math.random() * (height - 32));
    bug.addAnimation('down', new Animation(bugSpriteSheet, 0, 0, 32, 32, 4, 5));
    bug.addAnimation('up', new Animation(bugSpriteSheet, 0, 34, 32, 32, 4, 5));
    bug.addAnimation('right', new Animation(bugSpriteSheet, 0, 66, 32, 32, 4, 5));
    bug.addAnimation('left', new Animation(bugSpriteSheet, 0, 66, 32, 32, 4, 5));
    bug.addAnimation('final', new Animation(bugSpriteSheet, 0, 98, 32, 32, 1, 5));
    bugs.push(bug);
  }

  crusher = new Tone.BitCrusher(12).toDestination();
  synth = new Tone.Synth().connect(crusher);

  homeLoop = new Tone.Sequence((time, note) => {
    synth.triggerAttackRelease(note, 1, time);
  }, ["C4", "G4", "E4", "B4", "B4", "G4", "A4"], .4);
  homeLoop.loop = true; 

  gameLoop = new Tone.Sequence((time, note) => {
    synth.triggerAttackRelease(note, 1, time);
  }
  , ["C4", ["G4", "E4"], "D4", ["E4", "D4"], ], .4, .2, .6);
  gameLoop.loop = true;

  endLoop = new Tone.Sequence((time, note) => {
    synth.triggerAttackRelease(note, 1, time);
  }
  , [["D2"], ["G2"]], .4, .6);
   

  squished = new Tone.Player("media/squish.mp3").toDestination();

  running = new Tone.Player("media/run.mp3").toDestination();

  buzz = new Tone.Player("media/buzzer.mp3").toDestination();
  

}

function draw() {
  background(220);
  

  switch (gameState) {
    case GameStates.START:
      textAlign(CENTER, CENTER);
      textSize(15);
      text('Press ENTER key to start', width / 2, height / 2);
      
      splattedBugs = [];
      score = 0;
      time = 30;
      bugSpeed = 1;
      bugTurnSpeed = 30;
      if (Tone.Transport !== "started") {
        Tone.Transport.start();
      } 
      endLoop.stop();
      homeLoop.start(0);
      break;

    case GameStates.PLAY:
      homeLoop.stop();
      gameLoop.start();
      textSize(15);
      textAlign(LEFT, TOP);
      text('Score: ' + score, 10, 10);
      textAlign(RIGHT, TOP);
      text('Time: ' + Math.ceil(time), width - 10, 10);
      
      time -= deltaTime / 1000;
      if (time <= 0) {
        gameState = GameStates.END;
        gameLoop.playbackRate = .4, .2, .6;
        buzz.start(0,.5);
      }

      for (let pos of splattedBugs) {
        image(bugSpriteSheet, pos.x, pos.y, 32, 32, 0, 98, 32, 32);
      }

      for (let bug of bugs) {
        bug.moveRandomly();
        bug.draw();
      }
      break;

    case GameStates.END:
    
      gameLoop.stop();
        endLoop.start(2);
    

      textAlign(CENTER, CENTER);
      textSize(15);
      text('TIMES UP!', width / 2, height / 2);
      text('Score: ' + score, width / 2, height / 2 + 30);
      if (score > highScore) {
        highScore = score;
      }
      text('Highscore: ' + highScore, width / 2, height / 2 + 60);
      break;
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    switch (gameState) {
      case GameStates.START:
        gameState = GameStates.PLAY;
        break;
      case GameStates.PLAY:
        break;
      case GameStates.END:
        gameState = GameStates.START;
        break;
    }
  }
}

function mousePressed() {
  if (gameState === GameStates.PLAY) {
    for (let bug of bugs) {
      if (bug.isClicked(mouseX, mouseY)) {
        score++;
        bugSpeed++;
        bugTurnSpeed--;
        gameLoop.playbackRate += .1;
        squished.start(0, .1);
        splattedBugs.push({ x: bug.x, y: bug.y });
        bug.x = Math.random() * (width - 32);
        bug.y = Math.random() * (height - 32);
      }
  }
}
}

class Bug {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentAnimation = null;
    this.animations = {};
    this.directionChangeDelay = 60;
    this.currentDirection = Math.floor(Math.random() * 4);
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      push();
      translate(this.x, this.y);
      if (this.currentAnimation === 'left') {
        animation.draw(true);
      } else {
        animation.draw();
      }
      pop();
    }
  }

  moveRandomly() {
    switch (this.currentDirection) {
      case 0:
        this.currentAnimation = 'down';
        if (this.y < height - 32) {
          this.y += bugSpeed;
        }
        break;
      case 1:
        this.currentAnimation = 'up';
        if (this.y > 0) {
          this.y -= bugSpeed;
        }
        break;
      case 2:
        this.currentAnimation = 'right';
        if (this.x < width - 32) {
          this.x += bugSpeed;
        }
        break;
      case 3:
        this.currentAnimation = 'left';
        if (this.x > 0) {
          this.x -= bugSpeed;
        }
        break;
    }

    this.directionChangeDelay--;

    if (this.directionChangeDelay <= 0) {
      this.currentDirection = Math.floor(Math.random() * 4);
      this.directionChangeDelay = bugTurnSpeed;
    }
  }

  isClicked(mx, my) {
    return mx > this.x && mx < this.x + 32 && my > this.y && my < this.y + 32;
  }
}

class Animation {
  constructor(spriteSheet, x, y, w, h, frameCount, frameDelay = 5) {
    this.spriteSheet = spriteSheet;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.frameCount = frameCount;
    this.currentFrame = 0;
    this.frameDelay = frameDelay;
    this.frameCounter = 0;
  }

  draw(flip = false) {
    push();
    if (flip) {
      scale(-1, 1);
      image(this.spriteSheet, -this.w, 0, this.w, this.h, this.x + this.currentFrame * this.w, this.y, this.w, this.h);
    } else {
      image(this.spriteSheet, 0, 0, this.w, this.h, this.x + this.currentFrame * this.w, this.y, this.w, this.h);
    }
    pop();
    
    this.frameCounter++;
    
    if (this.frameCounter >= this.frameDelay) {
      this.currentFrame = (this.currentFrame + 1) % this.frameCount;
      this.frameCounter = 0;
    }
  }
}