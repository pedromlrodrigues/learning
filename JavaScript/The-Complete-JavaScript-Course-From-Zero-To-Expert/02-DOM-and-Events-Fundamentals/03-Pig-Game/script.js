'use strict';

// Selecting elements
const diceElement = document.querySelector('.dice');
const player1Element = document.querySelector('.player--0');
const player2Element = document.querySelector('.player--1');
const player1ScoreElement = document.querySelector('#score--0');
const player2ScoreElement = document.querySelector('#score--1');
const player1CurrentScoreElement = document.querySelector('#current--0');
const player2CurrentScoreElement = document.querySelector('#current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// State variables
let dice = 0;
let player1Score;
let player2Score;
let currentScore;
let isPlayer1Turn;

const init = () => {
  isPlayer1Turn = true;
  player1Score = 0;
  player2Score = 0;
  currentScore = 0;
  player1CurrentScoreElement.textContent = 0;
  player2CurrentScoreElement.textContent = 0;
  player1ScoreElement.textContent = player1Score;
  player2ScoreElement.textContent = player2Score;

  diceElement.classList.add('hidden');

  player1Element.classList.remove('player--winner');
  player2Element.classList.remove('player--winner');

  player1Element.classList.add('player--active');
  player2Element.classList.remove('player--active');
};
init();

// Rolling dice functionality
const rollDice = () => {
  dice = Math.trunc(Math.random() * 6) + 1;
};

const setPlayerCurrentScore = () => {
  isPlayer1Turn
    ? (player1CurrentScoreElement.textContent = currentScore)
    : (player2CurrentScoreElement.textContent = currentScore);
};

const switchActivePlayer = () => {
  currentScore = 0;
  setPlayerCurrentScore();
  isPlayer1Turn = !isPlayer1Turn;
  player1Element.classList.toggle('player--active');
  player2Element.classList.toggle('player--active');
};

btnRoll.addEventListener('click', () => {
  if (
    !player1Element.classList.contains('player--winner') &&
    !player2Element.classList.contains('player--winner')
  ) {
    // 1. Generating a random dice roll
    rollDice();

    // 2. Display dice
    diceElement.src = `dice-${dice}.png`;
    diceElement.classList.remove('hidden');

    // 3. Check for rolled 1
    if (dice !== 1) {
      currentScore += dice;
      setPlayerCurrentScore();
    } else {
      // Switch active player
      switchActivePlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (
    !player1Element.classList.contains('player--winner') &&
    !player2Element.classList.contains('player--winner')
  ) {
    if (isPlayer1Turn) {
      player1Score += currentScore;
      player1ScoreElement.textContent = player1Score;
      if (player1Score >= 20) {
        player1Element.classList.add('player--winner');
        player1Element.classList.remove('player--active');
        diceElement.classList.add('hidden');
      } else {
        switchActivePlayer();
      }
    } else {
      player2Score += currentScore;
      player2ScoreElement.textContent = player2Score;
      if (player2Score >= 20) {
        player2Element.classList.add('player--winner');
        player2Element.classList.remove('player--active');
        diceElement.classList.add('hidden');
      } else {
        switchActivePlayer();
      }
    }
  }
});

btnNew.addEventListener('click', init);
