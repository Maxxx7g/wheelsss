const SEGMENTS = [30, 35, 45, 50, 49, 80, 63, 78, 94, 56, 39, 105, 149, 130, 99];
const ALLOWED_WINNERS = [30, 35, 45, 50, 49, 80];
const COLORS = ["#2b6cb0","#3182ce","#4299e1","#63b3ed","#3182ce",
                "#2b6cb0","#4299e1","#63b3ed","#3182ce","#2b6cb0",
                "#4299e1","#63b3ed","#3182ce","#2b6cb0","#4299e1"];

const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const resultEl = document.getElementById("result");
const wheel = document.getElementById("wheelContainer");

let currentRotation = 0;
let spinning = false;

function drawWheel() {
  const size = canvas.width;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2;
  const arc = (2 * Math.PI) / SEGMENTS.length;

  ctx.clearRect(0,0,size,size);
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-Math.PI/2);

  for(let i=0;i<SEGMENTS.length;i++){
    const start = i * arc;
    const end = start + arc;

    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.arc(0,0,radius,start,end);
    ctx.closePath();
    ctx.fillStyle = COLORS[i % COLORS.length];
    ctx.fill();

    ctx.save();
    ctx.rotate(start + arc/2);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(SEGMENTS[i], radius-10, 5);
    ctx.restore();
  }

  ctx.restore();
}
drawWheel();

function spin(){
  if(spinning) return;
  spinning = true;
  spinBtn.disabled = true;
  resultEl.textContent = "Spinning...";

  // Random winner only from allowed
  const winnerValue = ALLOWED_WINNERS[Math.floor(Math.random()*ALLOWED_WINNERS.length)];
  const winnerIndex = SEGMENTS.indexOf(winnerValue);

  const segmentAngle = 360 / SEGMENTS.length;
  const stopAngle = winnerIndex * segmentAngle + segmentAngle/2;

  const fullTurns = 5; // extra spins
  const targetRotation = 360*fullTurns - stopAngle;

  currentRotation = targetRotation;

  wheel.style.transition = "transform 5s ease-out";
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(()=>{
    resultEl.textContent = `You Won: ₹${winnerValue}`;
    spinning = false;
    spinBtn.disabled = false;
  },5000);
}

spinBtn.addEventListener("click", spin);
