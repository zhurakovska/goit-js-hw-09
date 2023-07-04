const startBtn = document.querySelector('[data-start]')
const stopBtn = document.querySelector('[data-stop]')
const body = document.querySelector('body')

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
let timerIntervalId = null;

const onStartBtnClick = ({target}) => {
    timerIntervalId = setInterval (()=> {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000)
    target.disabled = true;
}

const onStopBtnClick = () => {
    clearInterval(timerIntervalId)
    startBtn.disabled = false;
}

startBtn.addEventListener('click', onStartBtnClick)
stopBtn.addEventListener('click', onStopBtnClick)