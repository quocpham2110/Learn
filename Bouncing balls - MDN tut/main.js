// setup canvas
const para = document.querySelector('h5');
// const frame = document.querySelector('h6');
let count = 0;
// let fps = 0;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const messBox = document.querySelector('.messBox');
const btn = document.querySelector('button');
// const input = document.querySelector('#number');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
// function to generate random number
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}
// Shape constructor
function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

// Ball constructor
function Ball(x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, velX, velY, exists);
  this.color = color;
  this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

// drawning the ball
Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};
// Updating the ball's data
Ball.prototype.update = function () {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }
  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }
  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }
  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }
  this.x += this.velX;
  this.y += this.velY;
};
// collision detection
Ball.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
        this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
      }
    }
  }
};
// Evil ball
const vel = 7; //Velocity of Evil ball!
function EvilCircle(x, y, exists) {
  Shape.call(this, x, y, 0, 0, exists);
  this.color = 'white';
  this.size = 25;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;
// Draw Evil
EvilCircle.prototype.draw = function () {
  const theta = Math.atan2(this.velY, this.velX);
  const startTheta = theta + 0.25 * Math.PI;
  const endTheta = theta + 1.75 * Math.PI;
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, startTheta, endTheta);
  // ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x + this.size * Math.cos(startTheta), this.y + this.size * Math.sin(startTheta));
  ctx.stroke();
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x + this.size * Math.cos(endTheta), this.y + this.size * Math.sin(endTheta));
  ctx.stroke();
};
// checkBounds Evil
EvilCircle.prototype.checkBounds = function () {
  if ((this.x + this.size) >= width) {
    this.x -= this.size;
    this.velX = 0;
  }
  if ((this.x - this.size) <= 0) {
    this.x += this.size;
    this.velX = 0;
  }
  if ((this.y + this.size) >= height) {
    this.y -= this.size;
    this.velY = 0;
  }
  if ((this.y - this.size) <= 0) {
    this.y += this.size;
    this.velY = 0;
  }

  if (this.velX < -vel) {
    this.velX = -vel;
    if (this.velY) this.velY > 0 ? this.velY-- : this.velY++;
  }
  if (this.velY < -vel) {
    this.velY = -vel;
    if (this.velX) this.velX > 0 ? this.velX-- : this.velX++;
  }
  if (this.velX > vel) {
    this.velX = vel;
    if (this.velY) this.velY > 0 ? this.velY-- : this.velY++;
  }
  if (this.velY > vel) {
    this.velY = vel;
    if (this.velX) this.velX > 0 ? this.velX-- : this.velX++;
  }
  this.x += this.velX;
  this.y += this.velY;
};
// setControls Evil
EvilCircle.prototype.setControls = function () {
  let _this = this;
  window.onkeydown = function (e) {
    if (e.keyCode == '37' || e.key === 'a') {
      _this.velX--;
    } else if (e.keyCode == '39' || e.key === 'd') {
      _this.velX++;
    } else if (e.keyCode == '38' || e.key === 'w') {
      _this.velY--;
    } else if (e.keyCode == '40' || e.key === 's') {
      _this.velY++;
    } else if (e.keyCode == '32') {
      _this.velY = 0;
      _this.velX = 0;
    }
  };
};
// collisionDetect Evil
EvilCircle.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {
    if (balls[j].exists) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
        count--;
        para.textContent = `Ball count: ${count}`;
        balls.splice(j, 1);
      }
    }
  }
};
// Creating the balls
let balls = [];
const amountBall = 100;
function createBall() {
  while (balls.length < amountBall) {
    const size = random(10, 20);
    let ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      true,
      `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`,
      size
    );
    balls.push(ball);
    count++;
    para.textContent = `Ball count: ${count}`;
  }
}
createBall();
// Creating Evil ball
const evil = new EvilCircle(0.5 * width, 0.5 * height, true);
evil.setControls();
// Loop
let globalID;
let start, now, elapsed, fpsInterval, fps;
startAnimating(60);

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  loop();
}

function loop() {
  globalID = requestAnimationFrame(loop);

  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    // draw
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
      if (balls[i].exists) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
      }
    }

    evil.draw();
    evil.checkBounds();
    evil.collisionDetect();

    then = now - (elapsed % fpsInterval);
  }
  // Win?
  if (count === 0) {
    canvas.style.display = 'none';
    playAgain();
  }
}
// Play again
function playAgain() {
  messBox.style.display = 'block';
  balls = [];
  createBall();
  evil.x = 0.5 * width;
  evil.y = 0.5 * height;
  evil.velX = 0;
  evil.velY = 0;
  btn.addEventListener('click', function () {
    messBox.style.display = 'none';
    canvas.style.display = 'block';
  }
  );
  document.addEventListener('keypress', function (e) {
    if (e.keyCode == '32' || e.keyCode == '13') {
      messBox.style.display = 'none';
      canvas.style.display = 'block';
    }
  });
}
