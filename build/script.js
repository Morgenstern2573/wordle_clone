import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 6;
const WORD_LENGTH = 5;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];

let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];

console.log(rightGuessString);

function initBoard() {
  let board = document.getElementById("game-board");

  for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
    let row = document.createElement("div");
    row.className = "letter-row";

    for (let j = 0; j < WORD_LENGTH; j++) {
      let box = document.createElement("div");
      box.className = "letter-box";
      row.appendChild(box);
    }

    board.appendChild(row);
  }
}

function shadeKeyBoard(letter, color) {
  for (const elem of document.getElementsByClassName("keyboard-button")) {
    if (elem.textContent === letter) {
      let oldColor = elem.style.backgroundColor;
      if (oldColor === "green") {
        return;
      }

      if (oldColor === "yellow" && color !== "green") {
        return;
      }

      elem.style.backgroundColor = color;
      break;
    }
  }
}

function deleteLetter() {
  const row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
  const box = row.children[currentGuess.length - 1];
  box.textContent = "";
  box.classList.remove("filled-box");
  currentGuess.pop();
}

function checkGuess() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let guessString = "";
  let rightGuess = Array.from(rightGuessString);

  for (const val of currentGuess) {
    guessString += val;
  }

  if (guessString.length != WORD_LENGTH) {
    toastr.error("Not enough letters!");
    return;
  }

  if (!WORDS.includes(guessString)) {
    toastr.error("Word not in list!");
    return;
  }

  var letterColor = ["gray", "gray", "gray", "gray", "gray"];

  //check green
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (rightGuess[i] == currentGuess[i]) {
      letterColor[i] = "green";
      rightGuess[i] = "#";
    }
  }

  //check yellow
  //checking guess letters
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (letterColor[i] == "green") continue;

    //checking right letters
    for (let j = 0; j < WORD_LENGTH; j++) {
      if (rightGuess[j] == currentGuess[i]) {
        letterColor[i] = "yellow";
        rightGuess[j] = "#";
      }
    }
  }

  for (let i = 0; i < WORD_LENGTH; i++) {
    let box = row.children[i];
    let delay = 250 * i;
    setTimeout(() => {
      //flip box
      animateCSS(box, "flipInX");
      //shade box
      box.style.backgroundColor = letterColor[i];
      shadeKeyBoard(guessString.charAt(i) + "", letterColor[i]);
    }, delay);
  }

  if (guessString === rightGuessString) {
    toastr.success("You guessed right! Game over!");
    guessesRemaining = 0;
    return;
  } else {
    guessesRemaining -= 1;
    currentGuess = [];

    if (guessesRemaining === 0) {
      toastr.error("You've run out of guesses! Game over!");
      toastr.info(`The right word was: "${rightGuessString}"`);
    }
  }
}

function insertLetter(pressedKey) {
  if (currentGuess.length === WORD_LENGTH) {
    return;
  }

  pressedKey = pressedKey.toLowerCase();

  const row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
  const box = row.children[currentGuess.length];
  animateCSS(box, "pulse");
  box.textContent = pressedKey;
  box.classList.add("filled-box");
  currentGuess.push(pressedKey);
}

const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element;
    node.style.setProperty("--animate-duration", "0.3s");

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

document.addEventListener("keyup", (e) => {
  if (guessesRemaining === 0) {
    return;
  }

  let pressedKey = String(e.key);
  if (pressedKey === "Backspace" && currentGuess.length !== 0) {
    deleteLetter();
    return;
  }

  if (pressedKey === "Enter") {
    checkGuess();
    return;
  }

  let found = pressedKey.match(/[a-z]/gi);
  if (!found || found.length > 1) {
    return;
  } else {
    insertLetter(pressedKey);
  }
});

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
  const target = e.target;

  if (!target.classList.contains("keyboard-button")) {
    return;
  }
  let key = target.textContent;

  if (key === "Del") {
    key = "Backspace";
  }

  document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
});

initBoard();
