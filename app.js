//Use querySelectorAll to select all the buttons inside the element with an ID of qwerty
const qwerty = document.querySelectorAll('#qwerty button');

//Get the element with a class of btn__reset and save it to a variable
const startButton = document.querySelector('.btn__reset');

//Create a missed variable, initialized to 0
let missed = 0;

//Declare and initialize the phrases array
const phrases = ["Forever Young", "Be patient", "Have a good dream", "I like flowers", "Enjoy your day"];

//return a random phrase from an array
const getRandomPhraseAsArray = arr => {
    const randomNumber = Math.floor(Math.random() * arr.length);
    return arr[randomNumber].split('');
};

//adds the letters of a string to the display
const addPhraseToDisplay = arr => {
    //Use querySelector to target the ul inside of the element with the ID phrase
    const phrase = document.querySelector('#phrase ul');

    for (const ch of arr) {
        const li = document.createElement('li');
        li.textContent = ch;
        phrase.appendChild(li);
        if (ch !== ' ') {
            li.className = 'letter';
        }
    }
}

//check if a letter is in the phrase
const checkLetter = button => {
    const allLetters = document.querySelectorAll('.letter');
    let isMatched = false;
    allLetters.forEach(element => {
        if (button == element.textContent.toLowerCase()) {
            element.classList.add('show');
            isMatched = true;
        }
    });
    return isMatched ? button : null;

}

//check if the game has been won or lost
const checkWin = () => {
    const allLetters = document.querySelectorAll('.letter');
    const allShownLetters = document.querySelectorAll('.show');
    if (allLetters.length == allShownLetters.length) {
        document.querySelector('#overlay').classList.add('win');
        document.querySelector('.title').innerHTML = "You Win!";
        document.querySelector('#overlay').style.display = 'flex';
        startButton.textContent="Reset Game";
    }
    if (missed > 4) {
        document.querySelector('#overlay').classList.add('lose');
        document.querySelector('#overlay').style.display = 'flex';
        document.querySelector('.title').innerHTML = "You lose!";
        startButton.textContent="Reset Game";
    }
}

//reset game
const resetGame = () => {
    document.querySelector('#phrase ul').remove();
    const ul = document.createElement('ul');
    document.querySelector('#phrase').appendChild(ul);

    const chosenBtns = document.querySelectorAll('.chosen');
    chosenBtns.forEach(btn => {
        btn.classList.remove('chosen');
    });

    missed = 0;

    const chooseScoreboard = document.querySelector('#scoreboard ol');
    chooseScoreboard.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        chooseScoreboard.innerHTML += `<li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>`;
    }

    document.querySelector('#overlay').className='start';
}

//listen for the start game button to be pressed
startButton.addEventListener('click', () => {
    resetGame();

    document.querySelector('#overlay').style.display = "none";
    const randomPhrase = getRandomPhraseAsArray(phrases);
    console.log(randomPhrase);
    addPhraseToDisplay(randomPhrase);

    console.log(missed);
});

//listen for the onscreen keyboard to be clicked
qwerty.forEach(element => {
    element.addEventListener('click', e => {
        const chosenLetter = e.target.textContent;
        e.target.classList.add('chosen');
        const addCheckLetter = checkLetter(chosenLetter);
        if (addCheckLetter == null) {
            missed++;
            console.log(missed);

            if (missed <= 4) {
                document.querySelector('.tries').remove();
            }
        }
        checkWin();
    });
});