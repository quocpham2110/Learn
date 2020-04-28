const canvas = document.querySelector(".clock");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const ctx = canvas.getContext("2d");

ctx.fillStyle = "rgb(0,0,0)";
ctx.fillRect(0, 0, width, height);

function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

function draw() {
  //radius
  let r = 200;
  // clock face
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, r, degToRad(0), degToRad(360), false);
  ctx.fill();
  // decor1: black circle
  ctx.strokeStyle = "rgb(0,0,0)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, r * 0.95, degToRad(0), degToRad(360), false);
  ctx.stroke();
  // divider 1: 0, 3, 6, 9
  ctx.strokeStyle = "rgb(0,0,0)";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(width / 2, height / 2 - r * 0.9);
  ctx.lineTo(width / 2, height / 2 - r * 0.78);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(width / 2, height / 2 + r * 0.78);
  ctx.lineTo(width / 2, height / 2 + r * 0.9);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(width / 2 - r * 0.9, height / 2);
  ctx.lineTo(width / 2 - r * 0.78, height / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(width / 2 + r * 0.78, height / 2);
  ctx.lineTo(width / 2 + r * 0.9, height / 2);
  ctx.stroke();
  // divider 2: 1,2,4,5,7,8,10,11
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.beginPath();
  ctx.arc(
    width / 2 + r * 0.84 * Math.cos(degToRad(30)),
    height / 2 + r * 0.84 * Math.sin(degToRad(30)),
    8,
    degToRad(0),
    degToRad(360),
    false
  );
  ctx.fill();
  ctx.beginPath();
  ctx.arc(
    width / 2 + r * 0.84 * Math.cos(degToRad(60)),
    height / 2 + r * 0.84 * Math.sin(degToRad(60)),
    8,
    degToRad(0),
    degToRad(360),
    false
  );
  ctx.fill();
  ctx.beginPath();
  ctx.arc(
    width / 2 + r * 0.84 * Math.cos(degToRad(120)),
    height / 2 + r * 0.84 * Math.sin(degToRad(120)),
    8,
    degToRad(0),
    degToRad(360),
    false
  );
  ctx.fill();
  ctx.beginPath();
  ctx.arc(
    width / 2 + r * 0.84 * Math.cos(degToRad(150)),
    height / 2 + r * 0.84 * Math.sin(degToRad(150)),
    8,
    degToRad(0),
    degToRad(360),
    false
  );
  ctx.fill();
  ctx.beginPath();
  ctx.arc(
    width / 2 + r * 0.84 * Math.cos(degToRad(210)),
    height / 2 + r * 0.84 * Math.sin(degToRad(210)),
    8,
    degToRad(0),
    degToRad(360),
    false
  );
  ctx.fill();
  ctx.beginPath();
  ctx.arc(
    width / 2 + r * 0.84 * Math.cos(degToRad(240)),
    height / 2 + r * 0.84 * Math.sin(degToRad(240)),
    8,
    degToRad(0),
    degToRad(360),
    false
  );
  ctx.fill();
  ctx.beginPath();
  ctx.arc(
    width / 2 + r * 0.84 * Math.cos(degToRad(300)),
    height / 2 + r * 0.84 * Math.sin(degToRad(300)),
    8,
    degToRad(0),
    degToRad(360),
    false
  );
  ctx.fill();
  ctx.beginPath();
  ctx.arc(
    width / 2 + r * 0.84 * Math.cos(degToRad(330)),
    height / 2 + r * 0.84 * Math.sin(degToRad(330)),
    8,
    degToRad(0),
    degToRad(360),
    false
  );
  ctx.fill();

  // Declare variable
  let h = new Date().getHours();
  let m = new Date().getMinutes();
  let s = new Date().getSeconds();
  h = h % 12;
  // Hours
  ctx.strokeStyle = "rgb(0,0,0)";
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.moveTo(width / 2, height / 2);
  ctx.lineTo(
    width / 2 + r * 0.58 * Math.cos(degToRad(h * 30 - 90)),
    height / 2 + r * 0.58 * Math.sin(degToRad(h * 30 - 90))
  );
  ctx.stroke();
  // Minutes
  ctx.strokeStyle = "rgb(0,0,0)";
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.moveTo(width / 2, height / 2);
  ctx.lineTo(
    width / 2 + r * 0.66 * Math.cos(degToRad(m * 6 - 90)),
    height / 2 + r * 0.66 * Math.sin(degToRad(m * 6 - 90))
  );
  ctx.stroke();
  // Seconds
  ctx.strokeStyle = "rgb(255, 0, 0)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(width / 2, height / 2);
  ctx.lineTo(
    width / 2 + r * 0.84 * Math.cos(degToRad(s * 6 - 90)),
    height / 2 + r * 0.84 * Math.sin(degToRad(s * 6 - 90))
  );
  ctx.stroke();
  // decor1: center circle
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, 8, degToRad(0), degToRad(360), false);
  ctx.fill();
}

let globalID;
function loop() {
    globalID = requestAnimationFrame(loop);
    draw();
}
loop();
