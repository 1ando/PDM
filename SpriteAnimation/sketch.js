let splunk, green, viki;
let characters = [];
let players;

function preload() {
  splunk = loadImage('media/PC Computer - Spelunky - Spelunky Guy.png');
  green = loadImage('media/PC Computer - Spelunky - Green.png');
  viki = loadImage('media/PC Computer - Spelunky - Viking.png');
  players = [splunk, green, viki];
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  for (let i = 0; i < players.length; i++) {
    let player = players[i];
    let character = new Character(random(80, width - 80), random(80, height - 80));
    character.addAnimation("down", new SpriteAnimation(player, 6, 5, 6));
    character.addAnimation("up", new SpriteAnimation(player, 0, 5, 6));
    character.addAnimation("right", new SpriteAnimation(player, 1, 0, 6));
    character.addAnimation("left", new SpriteAnimation(player, 1, 0, 6));
    character.addAnimation("still_R", new SpriteAnimation(player, 0, 0, 1));
    character.addAnimation("still_U", new SpriteAnimation(player, 0, 5, 1));
    character.addAnimation("still_D", new SpriteAnimation(player, 6, 5, 1));
    character.currentAnimation = "still_R";
    characters.push(character); 
  }
}

function draw() {
  background(220);

  for (let character of characters) {
    character.draw(); 
  }
}

function keyPressed() {
  for (let character of characters) {
    character.keyPressed(); 
  }
}

function keyReleased() {
  for (let character of characters) {
    character.keyReleased(); 
  }
}

class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentAnimation = null;
    this.animations = {};
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      switch (this.currentAnimation) {
        case "down":
          if (this.y < height) {
            this.y += 1;
          }
          break;
        case "up":
          if (this.y > 0) {
            this.y -= 1;
          }
          break;
        case "right":
          if (this.x < width) {
            this.x += 1;
          }
          break;
        case "left":
          if (this.x > 0) {
            this.x -= 1;
          }
          break;
      }
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  keyPressed() {
    switch (keyCode) {
      case UP_ARROW:
        this.currentAnimation = "up";
        break;
      case DOWN_ARROW:
        this.currentAnimation = "down";
        break;
      case RIGHT_ARROW:
        this.currentAnimation = "right";
        break;
      case LEFT_ARROW:
        this.currentAnimation = "left";
        this.animations[this.currentAnimation].flipped = true;
        break;
    }
  }

  keyReleased() {
    switch (keyCode) {
      case UP_ARROW:
        this.currentAnimation = "still_U";
        break;
      case DOWN_ARROW:
        this.currentAnimation = "still_D";
        break;
      case RIGHT_ARROW:
        this.currentAnimation = "still_R";
        this.animations[this.currentAnimation].flipped = false;
        break;
      case LEFT_ARROW:
        this.currentAnimation = "still_R";
        this.animations[this.currentAnimation].flipped = true;
        break;
    }
  }
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = false;
  }

  draw() {
    let s = this.flipped ? -1 : 1;
    scale(s, 1);
    image(this.spritesheet, 0, 0, 80, 80, this.u * 80, this.v * 80, 80, 80);

    this.frameCount++;
    if (this.frameCount % 10 == 0) {
      this.u++;
    }

    if (this.u == this.startU + this.duration) {
      this.u = this.startU;
    }
  }
}