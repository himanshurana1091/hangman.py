let word = "";

let guessedLetters = [];

let wrongAttempts = 0;

const maxWrongAttempts = 6;


const wordElement = document.getElementById("word");

const wrongElement = document.getElementById("wrong");

const lettersElement = document.getElementById("letters");

const messageElement = document.getElementById("message");

const newGameButton = document.getElementById("newGame");


function startGame() {

    fetch("/new-game")

        .then(response => response.json())

        .then(data => {

            word = data.word;

            guessedLetters = [];

            wrongAttempts = 0;

            messageElement.textContent = "";

            wrongElement.textContent = wrongAttempts;

            displayWord();

            createLetters();

        });
}


function displayWord() {

    let display = "";

    for (let letter of word) {

        if (guessedLetters.includes(letter)) {

            display += letter + " ";

        } else {

            display += "_ ";

        }

    }

    wordElement.textContent = display.trim();

    checkWin();
}


function createLetters() {

    lettersElement.innerHTML = "";

    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    for (let letter of alphabet) {

        const button = document.createElement("button");

        button.textContent = letter;

        button.classList.add("letter");

        button.addEventListener("click", function () {

            guessLetter(letter);

            button.disabled = true;

        });

        lettersElement.appendChild(button);
    }
}


function guessLetter(letter) {

    guessedLetters.push(letter);

    if (word.includes(letter)) {

        displayWord();

    } else {

        wrongAttempts++;

        wrongElement.textContent = wrongAttempts;

        updateHangman();

        if (wrongAttempts >= maxWrongAttempts) {

            messageElement.textContent =
                "😢 Game Over! Word was: " + word;

            disableLetters();
        }
    }
}


function checkWin() {

    if (word.length === 0) {
        return;
    }

    let won = true;

    for (let letter of word) {

        if (!guessedLetters.includes(letter)) {

            won = false;

            break;
        }
    }

    if (won) {

        messageElement.textContent =
            "🎉 Congratulations! You won!";

        disableLetters();
    }
}


function disableLetters() {

    const buttons =
        document.querySelectorAll(".letter");

    buttons.forEach(button => {

        button.disabled = true;

    });
}


function updateHangman() {

    const hangman = document.getElementById("hangman");

    const stages = [
        "🪢",
        "🪢🙂",
        "🪢😐",
        "🪢😟",
        "🪢😢",
        "🪢😵",
        "💀"
    ];

    hangman.textContent =
        stages[wrongAttempts];
}


newGameButton.addEventListener("click", startGame);


startGame();