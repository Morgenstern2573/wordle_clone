import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(rightGuessString)

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

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            elem.style.backgroundColor = color
            break
        }
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
        let rightGuess = Array.from(rightGuessString)

        for (const val of currentGuess) {
            guessString += val
        }

        if (guessString.length != 5) {
            toastr.error("Not enough letters!")
            return
        }

        if (!WORDS.includes(guessString)) {
            toastr.error("Word not in list!")
            return
        }
        
        console.log(guessString)

        if (guessString === rightGuessString) {
            toastr.success("You guessed right! Game over!")
            // color all squares green
            for (let i = 0; i < 5; i++) {
                row.children[i].style.backgroundColor = 'green'
            }
            // exit game
            guessesRemaining = 0
            return
        } else {
            let letterColor = ''
            for (let i = 0; i < 5; i++) {
                let box = row.children[i]
                let test1 = rightGuessString.indexOf(currentGuess[i])
                // is letter in the correct guess
                if (test1 === -1) {
                    letterColor = 'grey'
                } else {
                    // now, letter is definitely in word
                    // if letter index and right guess index are the same
                    // letter is in the right position 
                    if (currentGuess[i] === rightGuess[i]) {
                        // shade green 
                        letterColor = 'green'
                    } else {
                        // shade box yellow
                        letterColor = 'yellow'
                    }
                }
                
                //shade box
                box.style.backgroundColor = letterColor
                shadeKeyBoard(currentGuess[i], letterColor)
            }



            guessesRemaining -= 1;
            currentGuess = [];
            nextLetter = 0;
            console.log(guessesRemaining + " guesses left")

            if (guessesRemaining === 0) {
                toastr.error("You've run out of guesses! Game over!")
            }
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

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

initBoard();