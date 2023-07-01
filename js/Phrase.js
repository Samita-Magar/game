/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

//Phrase Class
class Phrase{
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

   /**
* Display phrase on game board
*/
addPhraseToDisplay() {
    const phraseContainer = document.querySelector('#phrase ul');
    phraseContainer.innerHTML = '';

    for (let i = 0; i < this.phrase.length; i++) {
      const character = this.phrase[i];
      const li = document.createElement('li');

      if (character === ' ') {
        li.className = 'space';
        li.textContent = ' ';
      } else {
        li.className = `hide letter ${character}`;
        li.textContent = character;
      }

      phraseContainer.appendChild(li);
    }
};

/**
* Checks if passed letter is in phrase
* @param (string) letter - Letter to check
*/
checkLetter(letter) {
    return this.phrase.includes(letter);
};

/**
* Displays passed letter on screen after a match is found
* @param (string) letter - Letter to display
*/
showMatchedLetter(letter) {
  const letterElements = document.querySelectorAll(`.letter.${letter}`);
  letterElements.forEach(letterElement => {
    letterElement.classList.remove('hide');
    letterElement.classList.add('show');
  });
};
}