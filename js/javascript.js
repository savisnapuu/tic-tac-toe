const gameSquare = document.querySelectorAll(".game-item");
const displayTurn = document.getElementById("display-turn")
const CIRCLE_TURN = "circle";
const CROSS_TURN = "cross";
let circleTurn = false;
let currentMark;
let v = []

gameBoard = [
    "", "", "", "", "", "", "","",""
]

const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function handleClick(e){
    if(e.target.classList.contains("cross") || e.target.classList.contains("circle")) return
    const currentTurn = circleTurn ? CIRCLE_TURN : CROSS_TURN;
    displayTurn.textContent = circleTurn ? "X turn" : "O turn"
    place(currentTurn, e.target);
    if(checkWinner(currentTurn)){
        alert(`${currentTurn} WINS!`);
        resetBoard();
    } else if(checkDraw()){
        alert("IT IS A DRAW");
        resetBoard();
    } else {
        circleTurn = !circleTurn;
    }
}

function checkWinner(currentTurn){
    currentTurn = currentTurn === "cross" ? "X" : "O";
    v = gameBoard.flatMap((v, i) => v === currentTurn ? i : [])
    for(let i = 0; i < WINNING_COMBINATIONS.length; i++){
        if(WINNING_COMBINATIONS[i].every( i => v.includes(i))){
            return true
        }
    }
}

function checkDraw(){
    return !gameBoard.includes("");
}

function resetBoard(){
    gameSquare.forEach(square => square.classList.remove("circle","cross"));
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    circleTurn = false;
    displayTurn.textContent = "X turn"
}

function place(currentTurn, square){
    square.classList.add(currentTurn);
    const currentValue = square.getAttribute("data-value");
    gameBoard.splice(currentValue, 1, circleTurn ? "O" : "X")
}

gameSquare.forEach(square => square.addEventListener("click", handleClick))