// const board = document.getElementById("tic-tac-toe-board");
const cells = document.querySelectorAll(".cell");
const img_msg = document.querySelector(".ziko_amine");
const resetButton = document.getElementById("reset-button");
// const message = document.querySelector(".message-container");
const message02 = document.querySelector(".message02");
const message01 = document.querySelector(".message01");
const playerXScoreElement = document.getElementById("score_x");
const playerOScoreElement  = document.getElementById("score_o");
const resetScoresButton = document.getElementById("reset-scores-button");
const counterElement = document.getElementById("counter");
const info_counter = document.querySelector(".info_counter");
const change_player_name = document.getElementById("change_player_name");
const change_player_btn = document.getElementById("change_player");
const img_vs_score = document.getElementById("img_vs_score");
const info_change_player = document.querySelector(".info_change_player");

let currentPlayer = "X";
let gameActive = true;

let count = 13;

change_player_btn.disabled = false; 

let playerXScore = 0;
let playerOScore = 0;

const board = ["", "", "", "", "", "", "", "", ""];
console.log(board)

// Images for X and O
const images = {
    X: "images/amine_x_o_game.png",
    AI: "images/ziko_x_o_game.png",
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

function change_player_func() {
    if (images.X === "images/amine_x_o_game.png") {
        console.log("amine");
        images.X = "images/simo_x_o_game.png";
        change_player_name.textContent = "امين";
        img_msg.src = "images/simo_x_o_game.png";
        img_vs_score.src = "images/simo_x_o_game.png";
    }else{
        console.log("simo");
        images.X = "images/amine_x_o_game.png";
        change_player_name.textContent = "محمد";
        img_msg.src = "images/amine_x_o_game.png";
        img_vs_score.src = "images/amine_x_o_game.png";
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        
        if (cells[a].dataset.cell === "X" && cells[b].dataset.cell === "X" && cells[c].dataset.cell === "X") {
            gameActive = false;
            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");
            playRandomWinSound(); // Play the win sound
            message02.textContent = "أمين يربح المباراة";
            message01.style.display = "none";
            message02.style.textAlign = "center";
            message02.style.display = "block";
            playerOScore++;
            updateScores();
            localStorage.setItem("playerOScore", playerOScore);
            updateCounter();
            counterElement.style.display = "block";
            info_counter.style.display = "block";
            return;
        }else if (cells[a].dataset.cell === "AI" && cells[b].dataset.cell === "AI" && cells[c].dataset.cell === "AI") {
            gameActive = false;
            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");
            playRandomWinSound(); // Play the win sound
            message02.textContent = "زكرياء يربح المباراة";
            message01.style.display = "none";
            message02.style.textAlign = "center";
            message02.style.display = "block";
            playerXScore++;
            updateScores();
            localStorage.setItem("playerXScore", playerXScore);
            updateCounter();
            counterElement.style.display = "block";
            info_counter.style.display = "block";
            return;
        }
    }

    if ([...cells].every(cell => cell.dataset.cell)) {
        gameActive = false;
        message02.textContent = "تعادل للطرفين!";
        message01.style.display = "none";
        message02.style.display = "block";
    }
}

function makeAIMove() {
    // Convert the NodeList to an array
    const cellArray = [...cells];
    
    // Create an array of available empty cells
    const availableCells = cellArray.filter(cell => cell.dataset.cell === "");

    checkWinner();

    // Check if there are available cells
    if (availableCells.length > 0) {
        // Shuffle the available cells randomly to add unpredictability
        const shuffledCells = shuffleArray(availableCells);

        // Choose a random cell from the shuffled list
        const randomCell = shuffledCells[0];

        // Set the cell as AI's move
        randomCell.dataset.cell = "AI";
        const img = new Image();
        img.src = images.AI;
        img.style.marginTop = '8px';
        randomCell.appendChild(img);

        // Update the board with AI's move
        board[parseInt(randomCell.dataset.index)] = "AI";
        console.log(parseInt(randomCell.dataset.index));

        checkWinner(); 
        // console.log(board);

        if(gameActive){
            img_msg.src = "images/amine_x_o_game.png";
            currentPlayer = "X";
        }

    }
}

// Function to shuffle an array (Fisher-Yates shuffle algorithm)
function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    // checkWinner();

    return array;
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

    const btn_allow_condition = true; // Change to your condition

    if (btn_allow_condition) {
        change_player_btn.disabled = true;
        change_player_btn.style.cursor = "not-allowed";
        change_player_btn.style.opacity = ".6";
    } else {
        change_player_btn.disabled = false;
    }

    info_change_player.style.display = "block";

    checkWinner();

    if (gameActive) {
        if (currentPlayer === "X") {
            img_msg.src = 'images/ziko_x_o_game.png';
            currentPlayer = "AI"; // Switch to AI's turn
            setTimeout(makeAIMove, 1000); // Delay AI's move for 1 second
        } else if (currentPlayer === "AI"){
            img_msg.src = 'images/amine_x_o_game.png';
            currentPlayer = "X"; // Switch back to the human player's turn
        }
        // message.textContent = `Player ${currentPlayer}'s turn`;
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
