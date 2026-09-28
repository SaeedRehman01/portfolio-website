// Simple responsive Pong game, playable inline via mouse/touch, no page navigation.
(function () {
  const canvas = document.getElementById("pongCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const overlay = document.getElementById("gameOverlay");
  const startBtn = document.getElementById("gameStartBtn");
  const resetBtn = document.getElementById("gameResetBtn");
  const playerScoreEl = document.getElementById("playerScore");
  const cpuScoreEl = document.getElementById("cpuScore");

  const PADDLE_WIDTH_RATIO = 0.015;
  const PADDLE_HEIGHT_RATIO = 0.2;
  const BALL_RADIUS_RATIO = 0.015;

  let width = 0;
  let height = 0;
  let dpr = Math.max(window.devicePixelRatio || 1, 1);

  let player = { y: 0, height: 0, width: 0 };
  let cpu = { y: 0, height: 0, width: 0 };
  let ball = { x: 0, y: 0, r: 0, vx: 0, vy: 0 };

  let playerScore = 0;
  let cpuScore = 0;
  let running = false;
  let rafId = null;

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = rect.width;
    height = rect.width * 0.6; // fixed aspect ratio, responsive width

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    player.width = cpu.width = width * PADDLE_WIDTH_RATIO;
    player.height = cpu.height = height * PADDLE_HEIGHT_RATIO;
    player.y = Math.min(
      player.y || height / 2 - player.height / 2,
      height - player.height,
    );
    cpu.y = Math.min(cpu.y || height / 2 - cpu.height / 2, height - cpu.height);
    ball.r = height * BALL_RADIUS_RATIO;
  }

  function resetBall(direction) {
    ball.x = width / 2;
    ball.y = height / 2;
    const speed = height * 0.006 + 2.5;
    const angle = Math.random() * 0.6 - 0.3; // slight vertical variance
    ball.vx = speed * (direction || (Math.random() > 0.5 ? 1 : -1));
    ball.vy = speed * angle;
  }

  function resetGame() {
    playerScore = 0;
    cpuScore = 0;
    playerScoreEl.textContent = "0";
    cpuScoreEl.textContent = "0";
    player.y = height / 2 - player.height / 2;
    cpu.y = height / 2 - cpu.height / 2;
    resetBall();
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // background
    ctx.fillStyle = "rgba(0, 13, 31, 0.9)";
    ctx.fillRect(0, 0, width, height);

    // center dashed line
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.setLineDash([8, 10]);
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
    ctx.setLineDash([]);

    // paddles
    ctx.fillStyle = "#4dabf7";
    ctx.fillRect(10, player.y, player.width, player.height);
    ctx.fillStyle = "#9775fa";
    ctx.fillRect(width - 10 - cpu.width, cpu.y, cpu.width, cpu.height);

    // ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  }

  function update() {
    ball.x += ball.vx;
    ball.y += ball.vy;

    // bounce off top/bottom
    if (ball.y - ball.r <= 0 || ball.y + ball.r >= height) {
      ball.vy *= -1;
      ball.y = Math.max(ball.r, Math.min(height - ball.r, ball.y));
    }

    // player paddle collision
    if (
      ball.x - ball.r <= 10 + player.width &&
      ball.x - ball.r > 10 &&
      ball.y >= player.y &&
      ball.y <= player.y + player.height &&
      ball.vx < 0
    ) {
      ball.vx *= -1.05;
      const hitPos =
        (ball.y - (player.y + player.height / 2)) / (player.height / 2);
      ball.vy = hitPos * Math.abs(ball.vx);
    }

    // cpu paddle collision
    if (
      ball.x + ball.r >= width - 10 - cpu.width &&
      ball.x + ball.r < width - 10 &&
      ball.y >= cpu.y &&
      ball.y <= cpu.y + cpu.height &&
      ball.vx > 0
    ) {
      ball.vx *= -1.05;
      const hitPos = (ball.y - (cpu.y + cpu.height / 2)) / (cpu.height / 2);
      ball.vy = hitPos * Math.abs(ball.vx);
    }

    // score
    if (ball.x < 0) {
      cpuScore++;
      cpuScoreEl.textContent = String(cpuScore);
      resetBall(1);
    } else if (ball.x > width) {
      playerScore++;
      playerScoreEl.textContent = String(playerScore);
      resetBall(-1);
    }

    // simple AI tracking with capped speed (beatable)
    const cpuCenter = cpu.y + cpu.height / 2;
    const cpuSpeed = height * 0.012 + 2;
    if (cpuCenter < ball.y - 10) {
      cpu.y += cpuSpeed;
    } else if (cpuCenter > ball.y + 10) {
      cpu.y -= cpuSpeed;
    }
    cpu.y = Math.max(0, Math.min(height - cpu.height, cpu.y));
  }

  function loop() {
    if (!running) return;
    update();
    draw();
    rafId = requestAnimationFrame(loop);
  }

  function startGame() {
    if (running) return;
    running = true;
    overlay.style.display = "none";
    rafId = requestAnimationFrame(loop);
  }

  function pauseGame() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
  }

  function movePaddleTo(clientY) {
    const rect = canvas.getBoundingClientRect();
    const relativeY = clientY - rect.top;
    player.y = Math.max(
      0,
      Math.min(height - player.height, relativeY - player.height / 2),
    );
  }

  canvas.addEventListener("mousemove", (e) => movePaddleTo(e.clientY));

  canvas.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault(); // stop page scroll while playing
      if (e.touches && e.touches[0]) {
        movePaddleTo(e.touches[0].clientY);
      }
    },
    { passive: false },
  );

  canvas.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      if (!running) startGame();
      if (e.touches && e.touches[0]) {
        movePaddleTo(e.touches[0].clientY);
      }
    },
    { passive: false },
  );

  startBtn.addEventListener("click", startGame);

  resetBtn.addEventListener("click", () => {
    pauseGame();
    resetGame();
    draw();
    overlay.style.display = "flex";
  });

  window.addEventListener("resize", () => {
    dpr = Math.max(window.devicePixelRatio || 1, 1);
    resizeCanvas();
    draw();
  });

  // initial setup
  resizeCanvas();
  resetGame();
  draw();
})();
