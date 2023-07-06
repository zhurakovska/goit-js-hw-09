const startBtn = document.querySelector('[data-start]')
const stopBtn = document.querySelector('[data-stop]')
const body = document.querySelector('body')

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
let timerIntervalId = null;

const onStartBtnClick = () => {
    timerIntervalId = setInterval (()=> {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000)
    startBtn.disabled = true;
  stopBtn.disabled = false;
}

const onStopBtnClick = () => {
    clearInterval(timerIntervalId)
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

startBtn.addEventListener('click', onStartBtnClick)
stopBtn.addEventListener('click', onStopBtnClick)