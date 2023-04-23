const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const coundownBoard = document.querySelector(".countdown");
const startButton = document.querySelector(".startButton");

let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countdown;

function pickRandomHole(hole) {
  const randomHole = Math.floor(Math.random() * holes.length);
  hole = holes[randomHole];
  if (hole === lastHole) {
    return pickRandomHole(holes);
  }
  lastHole = hole;
  return hole;
}
function popOut() {
  const time = Math.random() * 1300 + 400;
  const hole = pickRandomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) popOut();
  }, time);
}

function startGame() {
  countdown = timeLimit / 1000;
  scoreBoard.textContent = score;
  scoreBoard.style.display = "block";
  coundownBoard.textContent = countdown;
  timeUp = false;
  score = 0;
  popOut();
  setTimeout(() => {
    timeUp = true;
  }, timeLimit);
  let startCountDown = setInterval(() => {
    countdown -= 1;
    coundownBoard.textContent = countdown;
    if (countdown < 0) {
      countdown = 0;
      clearInterval(startCountDown);
      coundownBoard.textContent = "TIMES UP! Thanks for protecting our planet";
      startButton.style.display = "block";
    }
  }, 1000);
}
startButton.addEventListener("click", () => {
  startGame();
  startButton.style.display = "none";
});

function whack(e) {
  score++;
  scoreBoard.textContent = score;
  this.style.pointerEvents = "none";
  this.style.backgroundImage = 'url("yoda2.png")';
  setTimeout(() => {
    this.style.pointerEvents = "all";
    this.style.backgroundImage = 'url("yoda1.png")';
  }, 800);
}

moles.forEach((mole) => mole.addEventListener("click", whack));
