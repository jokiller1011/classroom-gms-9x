const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// auth check (NO redirect)
const user = localStorage.getItem("crg9x_current_user");
if (!user) {
  ctx.font = "20px Arial";
  ctx.fillText("Please log in to play", 120, 160);
  throw new Error("Not logged in");
}

let ball = { x: 240, y: 160, dx: 3, dy: -3, r: 6 };
let paddle = { x: 180, w: 120 };
let bricks = [];

function resetBall() {
  ball.x = 240;
  ball.y = 160;
  ball.dx = 3;
  ball.dy = -3;
}

for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 5; c++) {
    bricks.push({
      x: c * 90 + 30,
      y: r * 30 + 30,
      hit: false
    });
  }
}

document.addEventListener("mousemove", e => {
  const rect = canvas.getBoundingClientRect();
  paddle.x = e.clientX - rect.left - paddle.w / 2;
});

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // move ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // walls
  if (ball.x - ball.r < 0 || ball.x + ball.r > canvas.width) {
    ball.dx *= -1;
  }
  if (ball.y - ball.r < 0) {
    ball.dy *= -1;
  }

  // paddle
  if (
    ball.y + ball.r >= 300 &&
    ball.x > paddle.x &&
    ball.x < paddle.x + paddle.w
  ) {
    ball.dy *= -1;
    ball.y = 300 - ball.r;
  }

  // bottom → reset ball (NO reload)
  if (ball.y - ball.r > canvas.height) {
    resetBall();
  }

  // draw paddle
  ctx.fillStyle = "#1a73e8";
  ctx.fillRect(paddle.x, 300, paddle.w, 10);

  // draw ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fillStyle = "#000";
  ctx.fill();

  // bricks
  bricks.forEach(b => {
    if (!b.hit) {
      ctx.fillRect(b.x, b.y, 70, 20);
      if (
        ball.x > b.x &&
        ball.x < b.x + 70 &&
        ball.y > b.y &&
        ball.y < b.y + 20
      ) {
        b.hit = true;
        ball.dy *= -1;
      }
    }
  });

  requestAnimationFrame(loop);
}

loop();
