const movements = [
  { value: 250, description: 'Sold old TV 📺', user: 'pedro' },
  { value: -45, description: 'Groceries 🥑', user: 'pedro' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'pedro' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'pedro' },
  { value: -1100, description: 'New iPhone 📱', user: 'pedro' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'pedro' },
];

const spendingLimits = {
  pedro: 1500,
  matilda: 100,
};

const addExpense = function (value, description, user = 'pedro') {
  user = user.toLowerCase();

  // let lim;
  // if (spendingLimits[user]) {
  //   lim = spendingLimits[user];
  // } else {
  //   lim = 0;
  // }

  const limit = spendingLimits[user] ? spendingLimits[user] : 0;

  if (value <= limit) {
    movements.push({ value: -value, description, user });
  }
};

addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Matilda');
addExpense(200, 'Stuff', 'Jay');

const checkExpenses = function () {
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

  movements.forEach(mov => {
    if (spendingLimits?.[mov.user] < -mov.value) mov.flag = 'limit';
  });
};

checkExpenses();

const logBigExpenses = function (limit) {
  const bigExpenses = movements.reduce(
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

console.log(movements);
logBigExpenses(1000);
