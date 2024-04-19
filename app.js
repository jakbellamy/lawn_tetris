
const audio = document.getElementById('tetrisAudio');
const commandsDiv = document.getElementById('commands');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const scoreDisplayDiv = document.getElementById('scoreDisplay');
const scoreValueSpan = document.getElementById('scoreValue');
const scoreTextSpan = document.getElementById('scoreText')

function setParam(param, value, redirect=false) {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    params.set(param, value);
    url.search = params.toString();
}

function getParam(param) {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    return params.get(param);
}

function getLastScore() {
    const lastScore = getParam('last-score');
    if (lastScore) {
        return parseInt(lastScore);
    } else {
        return null;
    }
}

// Initial State
let score = 0;
let interval = 5000;
const lastScore = getLastScore();


// Display the last score if it exists, else hide the score
if (lastScore) {
    scoreValueSpan.textContent = lastScore;
} else {
    scoreDisplayDiv.style.display = 'none';
}

// Game functions

function startMusic() {
    const songNumber = Math.floor(Math.random() * 3) + 1;
    audio.src = `music/gb_${songNumber}.mp3`;
    audio.play();
    startButton.style.display = 'none';
    stopButton.style.display = 'block';
    document.body.className = 'dark-mode';
    scoreTextSpan.textContent = 'Score: ';
    scoreValueSpan.textContent = '0';
    flashCommand(true);
    cycleCommands();
}

function stopMusic() {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    params.set('last-score', score);
    url.search = params.toString();
    window.location.href = url.toString();
}

function flashCommand() {
    scoreDisplayDiv.style.display = 'none';
    commandsDiv.textContent = 'Insert Piece';
    commandsDiv.style.display = 'block';
    document.body.className = 'light-mode';
    setTimeout(() => {
        commandsDiv.style.display = 'none';
        document.body.className = 'dark-mode';
        score++;
        scoreValueSpan.textContent = score;
        scoreDisplayDiv.style.display = 'block';
    }, 500);
}

function cycleCommands() {
    setTimeout(() => {
        flashCommand();
        if (!audio.paused) {
            cycleCommands();
        }
    }, interval); // Initial interval is 5 seconds
    interval = Math.max(interval - 100, 1000); // Decrease interval by 100ms, but keep it at a minimum of 1 second
}

document.getElementById('tetrisAudio').addEventListener('ended', () => {
    stopMusic();
});

