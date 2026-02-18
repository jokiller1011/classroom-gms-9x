if (!localStorage.getItem("crg9x_current_user")) {
  location.href = "../../login.html";
}

const c = document.getElementById("game");
const ctx = c.getContext("2d");

let x = 240, y = 160;
let dx = 3, dy = -3;
let paddleX = 180;
const bricks = [];

for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 5; c++) {
    bricks.push({ x: c * 90 + 30, y: r * 30 + 30, hit: false });
  }
}

document.addEventListener("mousemove", e => {
  paddleX = e.clientX - 60;
});

function loop() {
  ctx.clearRect(0, 0, 480, 320);

  // Ball
  x += dx; y += dy;
  if (x < 0 || x > 480) dx *= -1;
  if (y < 0) dy *= -1;

  // Paddle
  if (y > 300 && x > paddleX && x < paddleX + 120) dy *= -1;
  if (y > 320) location.reload();

  ctx.fillRect(paddleX, 300, 120, 10);
  ctx.beginPath();
  ctx.arc(x, y, 6, 0, Math.PI * 2);
  ctx.fill();

  // Bricks
  bricks.forEach(b => {
    if (!b.hit) {
      ctx.fillRect(b.x, b.y, 70, 20);
      if (x > b.x && x < b.x + 70 && y > b.y && y < b.y + 20) {
        b.hit = true;
        dy *= -1;
      }
    }
  });

  requestAnimationFrame(loop);
}

loop();
