const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
let timerId = null;

startBtn.addEventListener("click", changeBgnColor);
stopBtn.addEventListener("click", stopChangeBgnColor);

function changeBgnColor() {
  document.body.style.background = getRandomHexColor();
  startBtn.disabled = true;
  stopBtn.disabled = false;

  timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
}

function stopChangeBgnColor() {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
