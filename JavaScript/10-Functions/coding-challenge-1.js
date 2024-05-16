'use strict';

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  // 1.
  registerNewAnswer() {
    const answer = Number(
      prompt(`${this.question}\n${this.options.join('\n')}`)
    );

    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;
    // 4.
    this.displayResults();
    this.displayResults('string');
  },
  // 3.
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string')
      console.log(`Poll results are ${this.answers.join(', ')}`);
  },
};

// 2.
const registerNewAnswer = poll.registerNewAnswer.bind(poll);
document.body
  .querySelector('.poll')
  .addEventListener('click', registerNewAnswer);

// 5.
poll.displayResults.call({ answers: [5, 2, 3] });

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');

poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });

poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
