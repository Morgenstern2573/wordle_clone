const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuess = "happy"

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

    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
        let box = row.children[nextLetter - 1]
        box.textContent = ""
        currentGuess.pop()
        nextLetter -= 1
        return
    }

    if (pressedKey === "Enter") {
        let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
        let guessString = ''
        for (const val of currentGuess) {
            guess += val
        }

        if (guessString.length != 5) {
            console.log("Not enough letters!")
            return
        }
        
        console.log(guessString)

        if (guessString === rightGuess) {
            console.log("You guessed right!")
            // exit game
            return
        } else {
            
            for (let i = 0; i < 5; i++) {
                let test = rightGuess.indexOf(currentGuess[i])
                if (test === -1) {
                    // shade box grey
                } else if (test === i) {
                    // shade box green
                } else {
                    // shade box yellow
                }
            }

            guessesRemaining -= 1;
            currentGuess = [];
            nextLetter = 0;
            console.log(guessesRemaining + " guesses left")
        }



    }

    let found = pressedKey.match(/[a-z]/g)
    // console.log(found, pressedKey)
    if (!found || found.length > 1) {
        return
    } else {
        console.log("single key!")
        if (nextLetter === 5) {
            return
        }
        pressedKey = pressedKey.toLowerCase()

        let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
        let box = row.children[nextLetter]
        box.textContent = pressedKey
        currentGuess.push(pressedKey)
        nextLetter += 1
    }
})

initBoard();