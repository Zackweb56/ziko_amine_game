const board = document.getElementById("tic-tac-toe-board");
const cells = document.querySelectorAll(".cell");
const img_msg = document.querySelector(".ziko_amine");
const resetButton = document.getElementById("reset-button");
// const message = document.querySelector(".message-container");
const message02 = document.querySelector(".message02");
const message01 = document.querySelector(".message01");
const playerXScoreElement = document.getElementById("score_x");
const playerOScoreElement = document.getElementById("score_o");
const resetScoresButton = document.getElementById("reset-scores-button");
const counterElement = document.getElementById("counter");

let currentPlayer = "X";
let gameActive = true;

let count = 13;

let playerXScore = 0;
let playerOScore = 0;

// Images for X and O
const images = {
    X: "images/ziko_x_o_game.png",
    O: "images/amine_x_o_game.png",
};

// Add an array of audio filenames
const winSounds = ["audio/01.m4a", "audio/02.mp3", "audio/03.m4a", "audio/04.m4a", "audio/05.m4a", "audio/06.mp3"]; // Add more as needed

function getRandomSound() {
    return winSounds[Math.floor(Math.random() * winSounds.length)];
}

function playRandomWinSound() {
    const audio = new Audio(getRandomSound());
    return audio.play();
}

function updateScores() {
    playerXScoreElement.textContent = playerXScore;
    playerOScoreElement.textContent = playerOScore;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].dataset.cell === currentPlayer && cells[b].dataset.cell === currentPlayer && cells[c].dataset.cell === currentPlayer) {
            gameActive = false;
            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");
            playRandomWinSound(); // Play the win sound
            if(currentPlayer == "X"){
                message02.textContent = `زكرياء يربح المباراة`;
            }else{
                message02.textContent = `امين  يربح المباراة`;
            }
            message01.style.display = "none";
            message02.style.textAlign = "center";
            message02.style.display = "block";

            // Update the score
            if (currentPlayer === "X") {
                playerXScore++;
            } else {
                playerOScore++;
            }
            updateScores();
            localStorage.setItem("playerXScore", playerXScore);
            localStorage.setItem("playerOScore", playerOScore);

            updateCounter();

            counterElement.style.opacity = "1";

            return;
        }
    }

    if ([...cells].every(cell => cell.dataset.cell)) {
        gameActive = false;
        message02.textContent = "It's a draw!";
        message01.style.display = "none";
        message02.style.display = "block";
    }
}

function handleCellClick(event) {
    const cell = event.target;

    if (cell.dataset.cell || !gameActive) {
        return;
    }

    cell.dataset.cell = currentPlayer;
    const img = new Image();
    img.src = images[currentPlayer];
    img.style.marginTop = '8px';
    cell.appendChild(img);

    checkWinner();

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (currentPlayer === "X") {
        img_msg.src = 'images/ziko_x_o_game.png';
        // message01.textContent = 'test_1';
    }else{
        img_msg.src = 'images/amine_x_o_game.png';
        // message01.textContent = 'test_2';
    }
}

function resetGame(e) {
    e.preventDefault();
    location.reload();
    cells.forEach(cell => {
        cell.dataset.cell = "";
        cell.classList.remove("winner");
        cell.innerHTML = "";
    });
    gameActive = true;
    message01.style.display = "block";
    message02.style.display = "none";
    currentPlayer = "X";
}

// update time
function updateCounter() {
    count--;
    counterElement.textContent = count;
    if(count === 0){
        location.reload();
    }else{
        setTimeout(updateCounter, 1000);
    }
}

// Function to reset scores
function resetScores() {
    playerXScore = 0;
    playerOScore = 0;
    updateScores();
    localStorage.setItem("playerXScore", playerXScore);
    localStorage.setItem("playerOScore", playerOScore);
}

resetScoresButton.addEventListener("click", resetScores);

// Retrieve scores from local storage and update
playerXScore = parseInt(localStorage.getItem("playerXScore")) || 0;
playerOScore = parseInt(localStorage.getItem("playerOScore")) || 0;
updateScores();

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

// restart
// resetButton.addEventListener("click",(e)=>{
//     location.reload();
// })