const displayEl = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const hundredths = Math.floor((ms % 1000) / 10);

    const parts = [hours, minutes, seconds]
        .map(unit => String(unit).padStart(2, '0'))
        .join(':');

    return `${parts}.${String(hundredths).padStart(2, '0')}`;
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    displayEl.textContent = formatTime(elapsedTime);
}

function start() {
    if (isRunning) {
        return
    }

    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateDisplay, 10);
    isRunning = true;
}

function stop() {
    if (!isRunning) {
        return
    }

    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    startTime = 0;
    isRunning = false;
    displayEl.textContent = formatTime(0);
}

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);