'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2024-05-23T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2024-05-22T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2024-05-19T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions
const formatMovementValue = function (number, locale, currency) {
  const options = { style: 'currency', currency: currency };
  return new Intl.NumberFormat(locale, options).format(number);
};

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed < 1) return 'Today';
  if (daysPassed >= 1 && daysPassed < 2) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // const hour = `${date.getHours()}`.padStart(2, 0);
  // const minutes = `${date.getMinutes()}`.padStart(2, 0).padStart(2, 0);
  // return `${day}/${month}/${year}, ${hour}:${minutes}`;
};

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';
  const movements = account.movements;

  const sortedMovements = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;

  sortedMovements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.movementsDates[i]);
    const displayDate = formatMovementDate(date, account.locale);

    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formatMovementValue(
            mov,
            account.locale,
            account.currency
          )}</div>
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
  labelBalance.textContent = formatMovementValue(
    acc.balance,
    acc.locale,
    acc.currency
  );
};

const calcDisplaySummary = function (account) {
  const incomingMovs = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const outgoingMovs = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * account.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  // console.log(incomingMovs, outgoingMovs, interest);

  labelSumIn.textContent = formatMovementValue(
    incomingMovs,
    account.locale,
    account.currency
  );
  labelSumOut.textContent = formatMovementValue(
    Math.abs(outgoingMovs),
    account.locale,
    account.currency
  );

  labelSumInterest.textContent = formatMovementValue(
    Math.abs(interest),
    account.locale,
    account.currency
  );
};

const updateUI = function () {
  // Display movements
  displayMovements(currentAccount);

  // Display balance
  calcPrintBalance(currentAccount);

  // Display summary
  calcDisplaySummary(currentAccount);
};

const startLogoutTimer = function () {
  // Set time to 5 minutes
  let time = 10;
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    console.log(`You will be logged out in ${min}:${sec}`);
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started';
    }
    time--;
  };

  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

const resetLogoutTimer = function () {
  clearInterval(logoutTimer);
  logoutTimer = startLogoutTimer();
};

let currentAccount, logoutTimer;

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  const username = inputLoginUsername.value;
  const pin = inputLoginPin.value;

  currentAccount = accounts.find(
    acc => acc.username === username && acc.pin === +pin
  );

  if (currentAccount) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner}!`;
    containerApp.style.opacity = 100;

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`;
    // const minutes = `${now.getMinutes()}`;
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear login fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (logoutTimer) clearInterval(logoutTimer);
    logoutTimer = startLogoutTimer();

    updateUI();
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const transferTo = inputTransferTo.value;
  const transferAmount = +inputTransferAmount.value;
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
    transferToAccount.movementsDates.push(new Date().toISOString());
    currentAccount.movements.push(-transferAmount);
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUI();
  }
  resetLogoutTimer();
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const loanAmount = Math.floor(+inputLoanAmount.value);

  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov >= 0.1 * loanAmount)
  ) {
    setTimeout(() => {
      currentAccount.movements.push(loanAmount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI();
    }, 3000);
  }

  // Clear request loan fields
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
  resetLogoutTimer();
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  const closeUsername = inputCloseUsername.value;
  const closePin = inputClosePin.value;
  console.log(accounts);
  if (
    currentAccount.username === closeUsername &&
    currentAccount.pin === +closePin
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
  resetLogoutTimer();
});

let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  sorted = !sorted;
  displayMovements(currentAccount, sorted);

  resetLogoutTimer();
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
const convertingAndCheckingNumbers = function () {
  console.log(23 === 23.0);

  // False, saves as binary and it's hard to represent fractional numbers
  console.log(0.1 + 0.2);
  console.log(0.1 + 0.2 === 0.3);

  // String to Number
  console.log(Number('23'));
  console.log(+'23');

  // Parsing
  console.log(Number.parseInt('23rem', 10));
  console.log(Number.parseInt('e23', 10)); // NaN, starts with a letter

  console.log(Number.parseInt('   2.5rem   ', 10));
  console.log(Number.parseFloat('2.5rem'));

  // Checking Numbers
  console.log(Number.isNaN(20)); // false
  console.log(Number.isNaN('20')); // false
  console.log(Number.isNaN(+'20X')); // true
  console.log(Number.isNaN(23 / 0)); // false

  console.log(Number.isFinite(20)); // true
  console.log(Number.isFinite(20.55)); // true
  console.log(Number.isFinite('20')); // false
  console.log(Number.isFinite(+'20X')); // false
  console.log(Number.isFinite(23 / 0)); // false

  console.log(Number.isInteger(23)); // true
  console.log(Number.isInteger(23.0)); // true
  console.log(Number.isInteger(23.5)); // false
};

const mathAndRounding = function () {
  // Math.squareroot
  console.log('## Math.squareroot ##');
  console.log(Math.sqrt(25));
  console.log(25 ** (1 / 2)); // square root
  console.log(8 ** (1 / 3)); // cubic root

  // Math.max
  console.log('## Math.max ##');
  console.log(Math.max(5, 18, 23, 11, 2));
  console.log(Math.max('5', 18, '23  ', 11, 2));
  console.log(Math.max('5', 18, '23px', 11, 2));

  // Math.min
  console.log('## Math.min ##');
  console.log(Math.min(5, 18, 23, 11, 2));

  // Constants in Math namespace
  console.log('## Constants in Math namespace ##');
  console.log(Math.PI);
  console.log(Math.PI * Number.parseFloat('10px') ** 2);

  // Math.random
  console.log('## Math Random ##');
  console.log(Math.floor(Math.random() * 6) + 1);
  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min) + 1) + min;
  console.log(randomInt(50, 70));

  // Rounding integers
  console.log('## Rounding Integers ##');
  console.log(Math.round(23.4));
  console.log(Math.round(23.5));

  console.log(Math.ceil(23.4));
  console.log(Math.ceil(23.5));

  console.log(Math.floor(23.4));
  console.log(Math.floor('23.5'));

  console.log(Math.trunc(-23.3));
  console.log(Math.floor(-23.3));

  // Rounding decimals
  console.log('## Rounding Decimals ##');
  console.log((2.7).toFixed(0));
  console.log((2.7).toFixed(3));
  console.log(+(2.345).toFixed('2'));
};

const theRemainderOperator = function () {
  console.log(5 % 2);

  console.log(5 % 2 === 0); // Odd number
  console.log(10 % 2 === 0); // Even number

  const isEven = n => n % 2 === 0;
  console.log(isEven(102));
  console.log(isEven(577));

  labelBalance.addEventListener('click', () =>
    [...document.querySelectorAll('.movements__row')]
      .reverse()
      .forEach(function (row, i) {
        if (i % 2 === 0) row.style.backgroundColor = 'red';
        if (i % 3 === 0) row.style.backgroundColor = 'yellow';
      })
  );
};

const numericSeparators = function () {
  const diameter = 287_460_000_000;
  console.log(diameter);

  const price = 345_99;
  console.log(price);

  const transferFee1 = 15_00;
  const transferFee2 = 1_500;
  console.log(transferFee1, transferFee2);

  // const PI = 3_.1415; //  Only works between numbers
  // console.log(PI);

  console.log(Number('230_000')); // Only works with numbers
  console.log(parseInt('230_000'));
};

const workingWithBigInt = function () {
  console.log(2 ** 53 - 1);
  console.log(Number.MAX_SAFE_INTEGER);

  console.log(11123043895123123123n);
  console.log(BigInt(11123043895123123123));

  // Operations
  console.log(10000n + 10000n);
  // console.log(12n * 10); // Cannot mix BigInt and other types
  console.log(12n * BigInt(10));

  // Math.sqrt(16n); // Cannot convert a BigInt value to a number

  console.log(20n > 10); // true
  console.log(20n === 20); // false
  console.log(20n == 20); // true
  console.log(typeof 20n); // bigint

  // Divisions
  console.log(10n / 3n);
  console.log(10 / 3);
};

const creatingDates = function () {
  // // Create a date
  // const now = new Date();
  // console.log(now);

  // // Based on strings
  // console.log(new Date('Thu May 23 2024 18:04:39'));
  // console.log(new Date('May 23, 2024'));
  // console.log(new Date(account1.movementsDates[0]));

  // // Based on given year, month, day, etc.
  // console.log(new Date(2037, 10, 8, 15, 23, 14));
  // console.log(new Date(2037, 10, 31, 15, 23, 14));

  // // Based on a timestamp
  // console.log(new Date(0));
  // console.log(new Date(3 * 24 * 60 * 60 * 1000));

  // Working with dates
  const future = new Date(2037, 10, 19, 15, 23);
  console.log(future);
  console.log(future.getFullYear());
  console.log(future.getMonth());
  console.log(future.getDate());
  console.log(future.getDay());
  console.log(future.getHours());
  console.log(future.getMinutes());
  console.log(future.getSeconds());
  console.log(future.toISOString());
  console.log(future.getTime());

  console.log(new Date(2142256980000));

  console.log(Date.now());

  future.setFullYear(2041);
  console.log(future);
};

const operationsWithDates = function () {
  const future = new Date(2037, 10, 19, 15, 23);
  console.log(+future);

  const calcDaysPassed = (date1, date2) =>
    Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

  console.log(calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24)));
};

const internationalizingDates = function () {
  // Experimenting with Intl API
  const now = new Date();

  // 2-digit, numeric, long, short, narrow
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  };
  const locale = navigator.language;

  // labelDate.textContent = new Intl.DateTimeFormat('pt-PT', options).format(now);
  labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);
};

const internationalizingNumbers = function () {
  const num = 3123213.32;

  const options = {
    style: 'currency',
    unit: 'mile-per-hour',
    currency: 'EUR',
    // useGrouping: false
  };

  console.log('US: ', new Intl.NumberFormat('en-US', options).format(num));
  console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
  console.log('Syria: ', new Intl.NumberFormat('ar-SY', options).format(num));
  console.log(
    navigator.language,
    new Intl.NumberFormat(navigator.language, options).format(num)
  );
};

const timers = function () {
  // setTimeout
  const ingredients = ['olives', 'spinach'];
  const ingredientsTimeout = setTimeout(
    (ing1, ing2) => console.log(`Ingredients: ${ing1} and ${ing2}`),
    3000,
    ...ingredients
  );
  console.log('Waiting...');

  if (ingredients.includes('spinach')) {
    clearTimeout(ingredientsTimeout);
  }

  // setInterval
  setInterval((ing1, ing2) => {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    console.log(new Intl.DateTimeFormat('pt-PT', options).format(now));
  }, 1000);
};
