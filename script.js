let cells = document.querySelectorAll(".cell");
let restartBtn = document.querySelector(".restart");
let statusText = document.querySelector(".status");

let winningStreaks = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];
let options= ["","","","","","","","",""];
let currentPlayer = "X";
let gameStat = false;

initialization();

function initialization(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restart);
    statusText.textContent = `${currentPlayer}'s turn`;
    gameStat = true;
}

function checkWinner(){
    let won = false;
    for(let i = 0; i < winningStreaks.length; i++){
        let streak = winningStreaks[i];
        let c1 = options[streak[0]];
        let c2 = options[streak[1]];
        let c3 = options[streak[2]];

        if(c1 == "" || c2 == "" || c3 == ""){
            continue;
        }
        else if(c1==c2 && c2==c3){
            won = true;
            break;
        }
    }

    if(won){
        statusText.textContent = `${currentPlayer} won!`;
        gameStat = false;
    }
    else if(!options.includes("")){
        statusText.textContent = "It's a draw!"
        gameStat = false;
    }
    else{
        changePlayer();
    }

}

function cellClicked(){
    let cIndex = this.getAttribute("data-index");

    if(options[cIndex]!="" || !gameStat){
        return;
    }

    updateCell(this, cIndex);
    checkWinner();
}

function updateCell(clickedCell, index){
    options[index] = currentPlayer;
    clickedCell.textContent = currentPlayer;

}

function changePlayer() {
    currentPlayer = (currentPlayer == 'X')? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
}

function restart(){
    currentPlayer = "X";
    options= ["","","","","","","","",""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    gameStat = true;
}

