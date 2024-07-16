'use strict';

const movements = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'pedro' },
  { value: -45, description: 'Groceries 🥑', user: 'pedro' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'pedro' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'pedro' },
  { value: -1100, description: 'New iPhone 📱', user: 'pedro' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'pedro' },
]);

const spendingLimits = Object.freeze({
  pedro: 1500,
  matilda: 110,
});

// spendingLimits.jay = 200;
console.log(spendingLimits);

// Pure function - produces the same output for the same input every time it is called
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'pedro'
) {
  const cleanUser = user.toLowerCase();

  // let lim;
  // if (spendingLimits[user]) {
  //   lim = spendingLimits[user];
  // } else {
  //   lim = 0;
  // }

  const limit = limits[user] ? limits[user] : 0;

  return value <= limit
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};

const newMovements1 = addExpense(movements, spendingLimits, 10, 'Pizza 🍕');
const newMovements2 = addExpense(
  newMovements1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'matilda'
);
const newMovements3 = addExpense(
  newMovements2,
  spendingLimits,
  200,
  'Stuff',
  'Jay'
);

const checkExpenses = function (state, limits) {
  // for (const el of movements) {
  //   let lim;
  //   if (spendingLimits[el.user]) {
  //     lim = spendingLimits[el.user];
  //   } else {
  //     lim = 0;
  //   }

  //   if (el.value < -lim) {
  //     el.flag = 'limit';
  //   }
  // }

  // state.forEach(mov => {
  //   if (limits?.[mov.user] < -mov.value) mov.flag = 'limit';
  // });

  return state.map(mov =>
    limits?.[mov.user] < -mov.value ? { ...mov, flag: 'limit' } : mov
  );
};

const newMovements4 = checkExpenses(newMovements3, spendingLimits);
console.log(newMovements4);

// Impure because of the console.logs (side effect)
const logBigExpenses = function (state, limit) {
  const bigExpenses = state.reduce(
    (output, cur) =>
      output + (cur.value <= -limit ? `${cur.description.slice(-2)} / ` : ''),
    ''
  );
  console.log(bigExpenses.slice(0, -2));
  // for (const el of movements) {
  //   if (el.value <= -limit) {
  //     output += el.description.slice(-2) + ' / '; // Emojis are 2 chars
  //   }
  // }
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};

logBigExpenses(movements, 1000);
