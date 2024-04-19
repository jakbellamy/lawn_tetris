// app.js
const audio = document.getElementById('tetrisAudio');
const commandsDiv = document.getElementById('commands');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const scoreValueSpan = document.getElementById('scoreValue');

let score = 0;

function startMusic() {
    const songNumber = Math.floor(Math.random() * 3) + 1;
    audio.src = `music/gb_${songNumber}.mp3`;
    audio.play();
    startButton.style.display = 'none';
    stopButton.style.display = 'block';
    document.body.className = 'dark-mode';
    flashCommand(true);
    cycleCommands();
}

function stopMusic() {
    window.location.search = `last-score=${score}`;
    window.location.reload();
    
    score = 0;
}

function flashCommand(initial = false) {
    commandsDiv.textContent = 'Insert Piece';
    commandsDiv.style.display = 'block';
    document.body.className = 'light-mode';
    setTimeout(() => {
        commandsDiv.style.display = 'none';
        document.body.className = 'dark-mode';
        if (!initial) {
            score++;
            scoreValueSpan.textContent = score;
        }
    }, 500);
}

function cycleCommands() {
    setTimeout(() => {
        flashCommand();
        if (!audio.paused) {
            cycleCommands();
        }
    }, 5000); // Initial interval is 5 seconds
}

document.getElementById('tetrisAudio').addEventListener('ended', () => {
    stopMusic();
});