console.log("Hi, you're getting better. Appreciate the fundamentals.")

const ROCK = "ROCK"
const SCISSORS = "SCISSORS"
const PAPER = "PAPER"
const PLAYER = "PLAYER"
const COMPUTER = "COMPUTER"

const playerChoices = [ROCK,SCISSORS,PAPER]
const winningConditions = [[ROCK,SCISSORS],[PAPER,ROCK],[SCISSORS,PAPER]]
let winner = null
let playerOneWinCount = 0
let playerTwoWinCount = 0
let computerWinCount = 0

function getComputerSelection (){
    const random = Math.floor(Math.random() * playerChoices.length)
    return playerChoices[random]
}

function getPlayerSelection () {
    const playerInput = prompt("Please choose: ROCK, SCISSORS, or PAPER")

    return playerInput.toUpperCase();
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

function playGame() {
    const playerSelection = getPlayerSelection()
    const computerSelection = getComputerSelection()
    const roundChoices = [playerSelection, computerSelection]

    if (winningConditionsExists(winningConditions, roundChoices)){
        winner = PLAYER
        playerOneWinCount++;
        return `You won! ${playerSelection} beats ${computerSelection}`
    } else if ( playerSelection == computerSelection) {
        return `It's a draw!`
    } else {
        winner = COMPUTER
        computerWinCount++;
        return `You lost. ${computerSelection} beats ${playerSelection}`
    }
}

function resetPlayersScore () {
    playerOneWinCount = 0
    computerWinCount = 0
};

function playRound() {
    for (let i = 0; i < 5; i++){
        playGame()
        console.log `${winner} wins!`
    };
    const playerOneCurrentWinCount = playerOneWinCount;
    const computerCurrentWinCount = computerWinCount;
    resetPlayersScore()
    if (playerOneCurrentWinCount > computerCurrentWinCount) {
        return `Player wins with ${playerOneCurrentWinCount} wins!`;
    } else {
        return `Computer wins with ${computerCurrentWinCount} wins! Try again next time.`
    }
}