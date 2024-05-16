'use strict';

const generateNewNumber = () => {
  return Math.trunc(Math.random() * 20) + 1;
};

let secretNumber = generateNewNumber();
console.log(secretNumber);
let score = 20;
let highscore = 0;

document.querySelector('.check').addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No number!';
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Correct Number!';
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = score;
    }
  } else if (guess > secretNumber) {
    updateGameState('high');
  } else {
    updateGameState('low');
  }
});

document.querySelector('.again').addEventListener('click', () => {
  score = 20;
  secretNumber = generateNewNumber();
  console.log(secretNumber);
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.score').textContent = score;
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.guess').value = '';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
});

const updateGameState = highOrLow => {
  if (score > 1) {
    document.querySelector(
      '.message'
    ).textContent = `💥 Guess is too ${highOrLow}`;
    score--;
    document.querySelector('.score').textContent = score;
  } else {
    document.querySelector('.message').textContent = '💥 You lost the game';
    document.querySelector('.score').textContent = 0;
  }
};
