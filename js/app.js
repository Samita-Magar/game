/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */


document.querySelector('#btn__reset').addEventListener('click', () => {
  game = new Game();
  game.startGame();
  game.addKeyboardEventListener();
});

let game = new Game();

const keyboard = document.querySelector('#qwerty');
keyboard.addEventListener('click', (event) => {
  if (event.target.classList.contains('key')) {
    game.handleInteraction(event.target);
  }
});

