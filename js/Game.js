/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

// Game class
class Game{
    constructor() {
        this.missed = 0;
        this.phrases = [
            new Phrase("full stack javascript"),
            new Phrase("hello world"),
            new Phrase("keep it simple"),
            new Phrase("learn by doing"),
            new Phrase("coding is fun")
        ];
        this.activePhrase = null;
    }

/**
* Begins game by selecting a random phrase and displaying it to user
*/
startGame() {
    const overlay = document.querySelector('#overlay');
    overlay.style.display = 'none';

    this.resetGameboard(); 

    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();

}

/**
* Selects random phrase from phrases property
* @return {Object} Phrase object chosen to be used
*/
getRandomPhrase() {
  const randomIndex = Math.floor(Math.random() * this.phrases.length);
  return this.phrases[randomIndex];
}


handleInteraction(button) {
    console.log('Button clicked:', button);
    button.disabled = true;

    const letter = button.textContent;
    const isMatch = this.activePhrase.checkLetter(letter);

    if (isMatch) {
      button.classList.add('chosen');
      this.activePhrase.showMatchedLetter(letter);

      if (this.checkForWin()) {
        this.gameOver(true);
      }
    } else {
      button.classList.add('wrong');
      this.removeLife();

      if (this.missed === 5) {
        this.gameOver(false);
      }
    }
  }
/**
* Checks for winning move
* @return {boolean} True if game has been won, false if game wasn't
won
*/
checkForWin() {
    const hiddenLetters = document.querySelectorAll('.hide');
    return hiddenLetters.length === 0;
};

/**
* Increases the value of the missed property
* Removes a life from the scoreboard
* Checks if player has remaining lives and ends game if player is out
*/
removeLife() {
    const scoreboard = document.querySelector('#scoreboard ol');
    const hearts = scoreboard.querySelectorAll('.tries');
    hearts[this.missed].innerHTML = '<img src="images/lostHeart.png" alt="Lost Heart Icon" height="35" width="30">';
    this.missed++;

    if (this.missed === 5) {
      this.gameOver(false);
    }
};

/**
* Displays game over message
* @param {boolean} gameWon - Whether or not the user won the game
*/
gameOver(gameWon) {
    const overlay = document.querySelector('#overlay');
    const gameOverMessage = document.querySelector('#game-over-message');

    overlay.style.display = 'flex';
    overlay.className = gameWon ? 'win' : 'lose';
    gameOverMessage.textContent = gameWon ? 'Congratulations! You won!' : 'Game over. Better luck next time!';
};

resetGameboard() {
  // Clear the phrase list items
  const phraseList = document.querySelector('#phrase ul');
  phraseList.innerHTML = '';

  // Enable all onscreen keyboard buttons and remove CSS classes
  const keyboardButtons = document.querySelectorAll('.key');
  keyboardButtons.forEach(button => {
    button.disabled = false;
    button.classList.remove('chosen', 'wrong');
  });

  // Reset the heart images in the scoreboard
  const scoreboard = document.querySelectorAll('#scoreboard ol li img');
  scoreboard.forEach(heart => {
    heart.src = 'images/liveHeart.png';
  });
}

 /**
   * Adds event listener for keydown or keyup event
   */
addKeyboardEventListener() {
  document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    const keyboardButtons = document.querySelectorAll('.key');

    for (let i = 0; i < keyboardButtons.length; i++) {
      if (keyboardButtons[i].textContent === key && !keyboardButtons[i].disabled) {
        this.handleInteraction(keyboardButtons[i]);
        break;
      }
    }
  });
}
}