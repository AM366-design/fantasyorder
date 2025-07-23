const names = ["Aidan", "matt c", "matt v", "kyle", "ricky", "stein", "gunner", "Zach", "schwab", "log", "shane", "cruc"];
const canvas = document.getElementById("track");
const ctx = canvas.getContext("2d");
const horses = [];
const startButton = document.getElementById("start");
const results = document.getElementById("results");

function initRace() {
  horses.length = 0;
  names.forEach((name, i) => {
    horses.push({
      name,
      x: 0,
      y: 30 + i * 30,
      speed: Math.random() * 2 + 1
    });
  });
  results.innerHTML = "";
}

function drawHorses() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  horses.forEach(horse => {
    ctx.fillStyle = "#444";
    ctx.fillRect(horse.x, horse.y, 50, 20);
    ctx.fillStyle = "#fff";
    ctx.font = "12px Arial";
    ctx.fillText(horse.name, horse.x + 5, horse.y + 14);
  });
}

function startRace() {
  initRace();
  let startTime = Date.now();

  function raceLoop() {
    let elapsed = Date.now() - startTime;
    horses.forEach(horse => {
      horse.x += horse.speed * Math.random(); // keeps movement chaotic
    });

    drawHorses();

    if (elapsed < 60000) {
      requestAnimationFrame(raceLoop);
    } else {
      const finalOrder = [...horses].sort((a, b) => b.x - a.x);
      results.innerHTML = "<h2>🏁 Final Draft Order</h2><ol>" +
        finalOrder.map(h => `<li>${h.name}</li>`).join("") + "</ol>";
    }
  }

  raceLoop();
}

startButton.addEventListener("click", startRace);
