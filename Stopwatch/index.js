const displayEl = document.getElementById('display');

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start() {

    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }

    console.log(startTime);
    
}

function stop() {
    
}

function reset() {
    
}

function update() {

}