function initBoard() {
    let guessNumbers = 6;
    let board = document.getElementById("game-board");

    for (let i = 0; i < guessNumbers; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }
        
        board.appendChild(row)
    }
}

initBoard();