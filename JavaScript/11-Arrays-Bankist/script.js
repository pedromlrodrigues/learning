'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  // containerMovements.textContent = 0;
  const sortedMovements = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;

  sortedMovements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUsernames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .split(' ')
      .map(name => name[0])
      .join('')
      .toLowerCase();
  });
};
createUsernames(accounts);

const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (movements, interestRate) {
  const incomingMovs = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const outgoingMovs = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  const interest = movements
    .filter(mov => mov > 0)
    .map(mov => (mov * interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  // console.log(incomingMovs, outgoingMovs, interest);

  labelSumIn.textContent = `${incomingMovs}€`;
  labelSumOut.textContent = `${Math.abs(outgoingMovs)}€`;
  labelSumInterest.textContent = `${interest}€`;
};

const updateUI = function () {
  // Display movements
  displayMovements(currentAccount.movements);

  // Display balance
  calcPrintBalance(currentAccount);

  // Display summary
  calcDisplaySummary(currentAccount.movements, currentAccount.interestRate);
};

let currentAccount;
btnLogin.addEventListener('click', e => {
  e.preventDefault();

  const username = inputLoginUsername.value;
  const pin = inputLoginPin.value;

  currentAccount = accounts.find(
    acc => acc.username === username && acc.pin === Number(pin)
  );

  if (currentAccount) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner}!`;
    containerApp.style.opacity = 100;

    // Clear login fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI();
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const transferTo = inputTransferTo.value;
  const transferAmount = Number(inputTransferAmount.value);
  const transferToAccount = accounts.find(acc => acc.username === transferTo);

  // Clear transfer money fields
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();

  if (
    transferAmount &&
    transferToAccount &&
    transferAmount > 0 &&
    currentAccount.balance >= transferAmount &&
    currentAccount.username !== transferToAccount.username
  ) {
    transferToAccount.movements.push(transferAmount);
    currentAccount.movements.push(-transferAmount);
    updateUI();
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);

  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov >= 0.1 * loanAmount)
  ) {
    currentAccount.movements.push(loanAmount);
    updateUI();
  }

  // Clear request loan fields
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  const closeUsername = inputCloseUsername.value;
  const closePin = inputClosePin.value;
  console.log(accounts);
  if (
    currentAccount.username === closeUsername &&
    currentAccount.pin === Number(closePin)
  ) {
    const closeAccIndex = accounts.findIndex(
      acc => acc.username === closeUsername
    );

    // Clear close account fields
    inputCloseUsername.value = inputClosePin.value = '';
    inputClosePin.blur();

    // Close account
    accounts.splice(closeAccIndex, 1);
    console.log(accounts);

    // "Redirect" to Login
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  }
});

let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  sorted = !sorted;
  displayMovements(currentAccount.movements, sorted);
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const simpleArrayMethods = function () {
  let arr = ['a', 'b', 'c', 'd', 'e'];

  // SLICE (shallow copy of the original array)
  console.log(arr.slice(2));
  console.log(arr.slice(-2));
  console.log(arr.slice(1, -2));
  console.log(arr.slice());
  console.log([...arr]);

  // SPLICE (changes the original array)
  //console.log(arr.splice(2));
  arr.splice(-1);
  console.log(arr);
  arr.splice(1, 2);
  console.log(arr);

  // REVERSE (changes the original array)
  arr = ['a', 'b', 'c', 'd', 'e'];
  const arr2 = ['j', 'i', 'h', 'g', 'f'];
  console.log(arr2.reverse());
  console.log(arr2);

  // CONCAT
  const letters = arr.concat(arr2);
  console.log(letters);
  console.log([...arr, ...arr2]);

  // JOIN
  console.log(letters.join(' - '));
};

const theNewAtMethod = function () {
  // AT
  const arr = [23, 11, 64];
  console.log(arr.at(0));

  console.log(arr[arr.length - 1]);
  console.log(arr.at(-1));
};

const loopingArraysForEach = function () {
  // for (const movement of movements) {
  for (const [i, movement] of movements.entries()) {
    console.log(
      `Movement ${i + 1}: You ${
        movement < 0 ? 'withdrew' : 'deposited'
      } ${Math.abs(movement)}`
    );
  }

  console.log('######## FOR EACH #########');
  movements.forEach(function (mov, i, arr) {
    console.log(
      `Movement ${i + 1}: You ${mov < 0 ? 'withdrew' : 'deposited'} ${Math.abs(
        mov
      )}`
    );
  });
};

const forEachWithMapsAndSets = function () {
  // Map
  currencies.forEach(function (value, key, map) {
    console.log(`${key}: ${value}`);
  });

  console.log('######################');

  // Set
  const currenciesUnique = new Set(['USD', 'USD', 'EUR', 'GBP', 'EUR']);
  currenciesUnique.forEach(function (value, _, set) {
    console.log(`${value}`);
  });
};

const theMapMethod = function () {
  const eurToUsd = 1.1;
  const movementsUsd = movements.map(mov => mov * eurToUsd);
  console.log(movements, movementsUsd);

  const movementsDesc = movements.map(
    (mov, i) =>
      `Movement ${i + 1}: You ${mov < 0 ? 'withdrew' : 'deposited'} ${Math.abs(
        mov
      )}€`
  );

  console.log(movementsDesc);
};

const theFilterMethod = function () {
  const deposits = movements.filter((mov, i, arr) => mov > 0);

  const withdrawals = movements.filter(mov => mov < 0);
  console.log(deposits);
  console.log(withdrawals);
};

const theReduceMethod = function () {
  const balance = movements.reduce((acc, cur) => acc + cur, 0);
  console.log(balance);

  let balance2 = 0;
  for (const mov of movements) balance2 += mov;
  console.log(balance2);

  // Maximum value
  const maximumValue = movements.reduce((acc, cur) => (cur > acc ? cur : acc));
  console.log(maximumValue);
};

const theMagicOfChainingMethods = function () {
  const totalDepositsInUSD = movements
    .filter(mov => mov > 0)
    .map(mov => mov * 1.1)
    .reduce((acc, mov) => acc + mov, 0);
  console.log(totalDepositsInUSD);
};

const theFindMethod = function () {
  const firstWithdrawal = movements.find(mov => mov < 0);
  console.log(movements, firstWithdrawal);
};

const theFindIndexMethod = function () {
  const firstWithdrawalIndex = movements.findIndex(mov => mov < 0);
  console.log(movements, movements[firstWithdrawalIndex]);
};

const someAndEveryMethods = function () {
  console.log(movements);
  console.log(movements.some(mov => mov > 0));
  console.log(
    movements.every(mov => {
      return typeof mov === 'number';
    })
  );
};

const theFlatAndFlatMapMethods = function () {
  const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
  console.log(arr.flat());

  const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
  console.log(arrDeep.flat(2));

  const overallBalance = accounts
    .map(acc => acc.movements)
    .flat()
    .reduce((acc, mov) => acc + mov, 0);

  console.log(overallBalance);

  const overallBalanceFlatMap = accounts
    .flatMap(acc => acc.movements)
    .reduce((acc, mov) => acc + mov, 0);

  console.log(overallBalanceFlatMap);
};

const sortingArrays = function () {
  // Strings
  const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
  console.log(owners.sort());
  console.log(owners);

  // Numbers
  // Return < 0, A before B (keep order)
  // Return > 0, B before A (switch order)

  // ASC
  // movements.sort((a, b) => {
  //   if (a > b) return 1;
  //   if (a < b) return -1;
  // });
  movements.sort((a, b) => a - b);
  console.log(movements);
  // DESC
  // movements.sort((a, b) => {
  //   if (a > b) return -1;
  //   if (a < b) return 1;
  // });
  movements.sort((a, b) => a - b);
  console.log(movements);
};

const moreWaysOfCreatingAndFillingArrays = function () {
  console.log(new Array(1, 2, 3, 4, 5, 6, 7, 8, 9));

  // Empty arrays + fill method
  console.log('Empty arrays + fill method');
  const arr1 = new Array(7);
  console.log(arr1);
  arr1.fill(1);
  arr1.fill(3, 3, 5);
  console.log(arr1);

  const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  arr2.fill(23, 2, 6);
  console.log(arr2);

  // Array.from
  console.log('Array.from');
  const arr3 = Array.from({ length: 7 }, () => 1);
  console.log(arr3);

  const arr4 = Array.from({ length: 7 }, (_, i) => i + 1);
  console.log(arr4);

  labelBalance.addEventListener('click', e => {
    e.preventDefault();

    const movementsUI = Array.from(
      document.querySelectorAll('.movements__value'),
      el => el.textContent.replace('€', '')
    );
    console.log(movementsUI);

    const movementsUI2 = [...document.querySelectorAll('.movements__value')];

    console.log(movementsUI2);
  });
};

const arrayMethodsPractice = function () {
  // 1. Amount of total money deposited in the bank
  const bankDepositSum = accounts
    .flatMap(acc => acc.movements)
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  console.log(bankDepositSum);

  // 2. Count how many deposits in the bank with at least 1000 euros
  // const deposits1000Count = accounts
  //   .flatMap(acc => acc.movements)
  //   .filter(mov => mov >= 1000).length;

  const deposits1000Count = accounts
    .flatMap(acc => acc.movements)
    .reduce((acc, mov) => (mov >= 1000 ? ++acc : acc), 0);
  console.log(deposits1000Count);

  // 3. Create a new object that contains the sum of the deposits and the sum of the withdrawals with the reduce method
  const { deposits, withdrawals } = accounts
    .flatMap(acc => acc.movements)
    .reduce(
      (acc, cur) => {
        // cur > 0 ? (acc.deposits += cur) : (acc.withdrawals += cur);
        acc[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
        return acc;
      },
      { deposits: 0, withdrawals: 0 }
    );
  console.log(deposits, withdrawals);

  // 4. Create a function to convert any String into a title case (all the words are capitalized except for some of them ex.: this is a nice title -> This Is a Nice Title)
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
  const convertAnyStringToTitleCase = str => {
    const titleCase = str
      .toLowerCase()
      .split(' ')
      .map(word =>
        exceptions.includes(word)
          ? word
          : word[0].toUpperCase() + word.substring(1)
      )
      .join(' ');

    return titleCase;
  };

  const convertedStr = convertAnyStringToTitleCase(
    'test a converter With an EXAMPLE'
  );
  console.log(convertedStr);
};
