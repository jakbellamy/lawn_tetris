// DOM Elements
const audio = document.getElementById('tetrisAudio');
const commandsDiv = document.getElementById('commands');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const scoreDisplayDiv = document.getElementById('scoreDisplay');
const scoreValueSpan = document.getElementById('scoreValue');
const scoreTextSpan = document.getElementById('scoreText')
const highScoreValueSpan = document.getElementById('highScoreValue');

console.log('Custom Parameters: ', '\n1. interval\n2. fastest-interval' )
// URL Parameter Functions
function setParamsAndRedirect(paramProps, valueProps) {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    for (let i = 0; i < paramProps.length; i++) {
        params.set(paramProps[i], valueProps[i]);
    }
    url.search = params.toString();
    window.location.href = url.toString();

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

function getHighScore() {
    const highScore = getParam('high-score');
    if (highScore) {
        return parseInt(highScore);
    } else {
        return null;
    }
}

function saveEndingScore(score) {
    const params = ['last-score'];
    const values = [score];

    if(!getHighScore() || score > getHighScore()) {
        params.push('high-score');
        values.push(score);
    }

    setParamsAndRedirect(params, values);
}

function getCustomInterval() {
    const customInterval = getParam('interval');
    if (customInterval) {
        return parseInt(customInterval);
    } else {
        return null;
    }
}

function getCustomFastetInterval() {
    const customInterval = getParam('fastest-interval');
    if (customInterval) {
        return parseInt(customInterval);
    } else {
        return null;
    }
}

// Initial Game State
let score = 0;
const lastScore = getLastScore();
const highScore = getHighScore();
let interval = getCustomInterval() || 5000;
const fastestInterval = getCustomFastetInterval() || 1000;

// Display the last score if it exists, else hide the score
scoreValueSpan.textContent = lastScore || '';
scoreDisplayDiv.style.display = lastScore ? 'block' : 'none';

// Display the high score if it exists, else hide the high score
highScoreValueSpan.textContent = highScore || 0;

// Game start and stop functions
function startGame() {
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

function stopGame() {
    saveEndingScore(score);
}

// Game loop functions
function flashCommand() {
    scoreDisplayDiv.style.display = 'none';
    commandsDiv.textContent = 'Insert Piece';
    commandsDiv.style.display = 'block';
    document.body.className = 'light-mode';
    setTimeout(() => {
        commandsDiv.style.display = 'none';
        document.body.className = 'dark-mode';
        score += 1;
        scoreValueSpan.textContent = score;
        scoreDisplayDiv.style.display = 'block';
    }, Math.min(500, interval / 2));
}

function cycleCommands() {
    setTimeout(() => {
        flashCommand();
        if (!audio.paused) {
            cycleCommands();
        }
    }, interval); // Initial interval is 5 seconds
    interval = Math.max(interval - 100, fastestInterval); // Decrease interval by 100ms, but keep it at a minimum of 1 second
}

// Event Listeners
audio.addEventListener('ended', stopGame);