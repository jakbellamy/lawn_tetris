const audio = document.getElementById('tetrisAudio');
const commandsDiv = document.getElementById('commands');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
let interval = 5000; // Start interval (5 seconds)

function startMusic() {
    const songNumber = Math.floor(Math.random() * 3) + 1;
    audio.src = `music/gb_${songNumber}.mp3`;
    audio.play();
    startButton.style.display = 'none';
    stopButton.style.display = 'block';
    document.body.className = 'dark-mode'; // Ensure it starts in dark mode
    flashCommand(true);
    cycleCommands();
}

function stopMusic() {
    audio.pause();
    audio.currentTime = 0;
    commandsDiv.style.display = 'none';
    stopButton.style.display = 'none';
    startButton.style.display = 'block';
    document.body.className = 'dark-mode';
}

function flashCommand(initial = false) {
    commandsDiv.textContent = 'Insert Piece';
    commandsDiv.style.display = 'block';
    document.body.className = 'light-mode'; // Light mode when command is displayed
    setTimeout(() => {
        commandsDiv.style.display = 'none';
        document.body.className = 'dark-mode'; // Immediately revert to dark mode after flash
    }, 500);
}

function cycleCommands() {
    setTimeout(() => {
        flashCommand();
        if (!audio.paused) {
            cycleCommands();
        }
    }, interval);
}

document.getElementById('tetrisAudio').addEventListener('ended', () => {
    stopMusic();
});
