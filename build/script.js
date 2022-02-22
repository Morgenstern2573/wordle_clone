const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;

function initBoard() {
    
    let board = document.getElementById("game-board");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
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

document.addEventListener("keyup", (e) => {
    console.log(e.key)

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace") {
        console.log("Backspace!")
        return
    }

    let found = pressedKey.match(/[a-z]/g)

    console.log(found, pressedKey)
    if (!found || found.length > 1) {
        return
    } else {
        console.log("single key!")
        if (nextLetter === 5) {
            return
        }
        let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
        let box = row.children[nextLetter]
        box.textContent = pressedKey
        nextLetter += 1

    }
})

initBoard();