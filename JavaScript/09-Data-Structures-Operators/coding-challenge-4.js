'use strict';

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const button = document
  .querySelector('button')
  .addEventListener('click', () => {
    const text = document.querySelector('textarea').value.split('\n');
    for (const [index, value] of text.entries()) {
      const [firstValue, secondValue] = value.trim().toLowerCase().split('_');
      const camelCaseValue = `${firstValue}${secondValue.replace(
        secondValue[0],
        secondValue[0].toUpperCase()
      )}`;
      console.log(`${camelCaseValue.padEnd(20)}${'+'.repeat(index + 1)}`);
    }
  });
