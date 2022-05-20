console.log("Hi, you're getting better. Appreciate the fundamentals.")
// DOM Manipulation
const container = document.querySelector("#container");
const rockBtn = document.querySelector('#rock');
const paperBtn = document.querySelector('#paper');
const scissorsBtn = document.querySelector('#scissors');
const scoreSection = document.querySelector(".scoreSection")
const roundCount = document.getElementById("roundCount")

const playerScore = document.querySelector('#playerScore')
const computerScore = document.querySelector('#computerScore')

const modal = document.querySelector(".modal");
const span = document.getElementsByClassName("close")[0];

modal.style.display = "block"

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

rockBtn.addEventListener('click', function (e) {
	playGame(e.target.value)
});
paperBtn.addEventListener('click', function (e) {
	playGame(e.target.value)
});
scissorsBtn.addEventListener('click', function (e) {
	playGame(e.target.value)
});

function updateScoreBoard() {
	playerScore.textContent = playerOneWinCount;
	computerScore.textContent = computerWinCount;
};

const div = document.createElement('div');
const resultBanner = div;
container.insertBefore(resultBanner,scoreSection);

// GAME LOGIC
const ROCK = "ROCK"
const SCISSORS = "SCISSORS"
const PAPER = "PAPER"
const PLAYER = "PLAYER"
const COMPUTER = "COMPUTER"
const DRAW = "DRAW"

const playerChoices = [ROCK,SCISSORS,PAPER]
const winningConditions = [[ROCK,SCISSORS],[PAPER,ROCK],[SCISSORS,PAPER]]
let gameCount = 0;
let winner = DRAW;
let playerOneWinCount = 0;
let playerTwoWinCount = 0;
let computerWinCount = 0;


function getComputerSelection (){
	const random = Math.floor(Math.random() * playerChoices.length)
	return playerChoices[random]
}

function isArrayEqualHelper (array1, array2){
	if(array1.length != array2.length) return false;
	
	for(let i = 0; i < array1.length; i++){
		if(array1[i] != array2[i]) return false;
	} 
	return true;
}

function winningConditionsExists (winningConditions, gameRoundChoices){
	for (let i = 0; i < winningConditions.length; i++){
		if(isArrayEqualHelper(winningConditions[i], gameRoundChoices)) return true;
	}
	return false;
}

function annouceGameWinner (){
	if (winner !== DRAW){
		resultBanner.textContent = `${winner} wins this round!`
	} else {
		resultBanner.textContent = `It's a draw!`
	}
}

function resetPlayersScore () {
	playerOneWinCount = 0
	computerWinCount = 0
};

function resetGameCount (){
	gameCount = 0
};

function playGame(buttonValue) {
	const playerSelection = buttonValue
	const computerSelection = getComputerSelection()
	const roundChoices = [playerSelection, computerSelection]
	
	if (winningConditionsExists(winningConditions, roundChoices)){
		winner = PLAYER
		playerOneWinCount++;
		updateScoreBoard()
		annouceGameWinner()
	} else if ( playerSelection == computerSelection) {
		winner = DRAW
		annouceGameWinner()
	} else {
		winner = COMPUTER
		computerWinCount++;
		updateScoreBoard()
		annouceGameWinner()
	}
	gameCount++;

	if (gameCount > 0) roundCount.textContent = `Round: ${gameCount}`;
	
	if(gameCount === 5){
		const playerOneEndingWinCount = playerOneWinCount;
		const computerEndingWinCount = computerWinCount;
		resetGameCount()
		resetPlayersScore()
		if (playerOneEndingWinCount > computerEndingWinCount) {
			resultBanner.textContent = `Player wins with ${playerOneEndingWinCount} wins!`;
		} else {
			resultBanner.textContent =  `Computer wins with ${computerEndingWinCount} wins! Try again next time.`
		}
	}
}
