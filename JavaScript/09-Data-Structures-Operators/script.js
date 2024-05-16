'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.includes('Delayed') ? '+' : ''} ${type
    .replace('_', '')
    .replace('_', ' ')} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    ':',
    'h'
  )})`.padStart(45);
  console.log(output);
}

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 12 + 12,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // ES6 enhanced object literals
  openingHours,
  // ES6 enhanced function literals
  order(starterMenuIndex, mainMenuIndex) {
    return [this.starterMenu[starterMenuIndex], this.mainMenu[mainMenuIndex]];
  },
  orderDelivery({ starterIndex, mainIndex = 1, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },
  orderPizza(mainIngredient, ...otherIngredients) {
    // console.log(`Here is your delicious pizza with ${}`);
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};
// ### Working with Strings ###
const airline = 'TAP Air Portugal';
const plane = 'A320';

const workingWithStringsPart1 = function () {
  console.log(plane[0]);
  console.log(plane[1]);
  console.log(plane[2]);
  console.log(plane[3]);
  console.log(airline.length);

  console.log(airline.indexOf('r'));
  console.log(airline.lastIndexOf('r'));
  console.log(airline.indexOf('portugal'));

  console.log(airline.slice(4));
  console.log(airline.slice(4, 7));

  console.log(airline.slice(0, airline.indexOf(' ')));
  console.log(airline.slice(airline.lastIndexOf(' ') + 1));

  console.log(airline.slice(-2));
  console.log(airline.slice(1, -1));

  const checkMiddleSeat = function (seat) {
    // B and E are middle seats
    const s = seat.slice(-1);
    if (s === 'B' || s === 'E') console.log('You got the middle seat!');
    else console.log('You got lucky!');
  };

  checkMiddleSeat('11B');
  checkMiddleSeat('23C');
  checkMiddleSeat('3E');

  console.log(new String('pedro'));
  console.log(typeof new String('pedro').slice(1));
};

const workingWithStringsPart2 = function () {
  const correctName = function (name) {
    const nameLower = name.toLowerCase();
    return nameLower[0].toUpperCase() + nameLower.slice(1);
  };

  console.log(airline.toLowerCase());
  console.log(airline.toUpperCase());

  const passenger = 'pEdRo'; // Pedro
  console.log(correctName(passenger));

  // Comparing emails
  const email = 'hello@pedro.io';
  const loginEmail = '   Hello@Pedro.io  \n';
  const emailNormalized = loginEmail.toLowerCase().trim();
  console.log(email === emailNormalized);

  // replacing
  const priceGB = '288,97£';
  const priceUS = priceGB.replace(',', '.').replace('£', '$');
  console.log(priceUS);

  const announcement =
    'All passengers come to boarding door 23. Boarding door 23!';
  // console.log(announcement.replace('door', 'gate'));
  console.log(announcement.replace(/door/g, 'gate'));

  // Booleans
  const plane = 'Airbus A320neo';
  console.log(plane.includes('A320'));
  console.log(plane.includes('Boeing'));
  console.log(plane.startsWith('Airbus'));
  console.log(plane.endsWith('neo'));

  if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
    console.log('Part of the NEW Airbus family');
  }
};

const workingWithStringsPart3 = function () {
  // Split and Join
  console.log('a+very+nice+string'.split('+'));

  const [firstName, lastName] = 'Pedro Rodrigues'.split(' ');
  console.log(firstName, lastName);

  const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
  console.log(newName);

  const capitalizeName = function (name) {
    let nameCapitalized = [];
    const nameSplit = name.split(' ');
    for (const n of nameSplit) {
      // nameCapitalized.push(n[0].toUpperCase() + n.slice(1));
      nameCapitalized.push(n.replace(n[0], n[0].toUpperCase()));
    }

    // nameSplit.forEach(n => {
    //   nameCapitalized.push(n[0].toUpperCase() + n.slice(1));
    // });
    console.log(nameCapitalized.join(' '));
  };

  capitalizeName('jessica ann smith davis');
  capitalizeName('pedro rodrigues');

  // Padding
  const message = 'Go to gate 23!';
  console.log(message.padStart(25, '+').padEnd(35, '+'));

  const maskCreditCard = function (number) {
    const str = number + '';
    return str.slice(-4).padStart(str.length, '*');
  };

  console.log(maskCreditCard('4124123456789012'));

  // Repeat
  const message2 = 'Bad weather... All departures delayed... ';
  console.log(message2.repeat(5));

  const planesInLine = function (numberOfPlanes) {
    console.log(
      `There are ${numberOfPlanes} planes in line ${'#'.repeat(numberOfPlanes)}`
    );
  };

  planesInLine(5);
  planesInLine(3);
  planesInLine(12);
};

// ### Maps: Iteration ###
// const question = new Map([
//   ['question', 'What is the best programming language in the world?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   ['correct', 3],
//   [true, 'Correct'],
//   [false, 'Wrong'],
// ]);

// Convert object to map
// console.log(Object.entries(openingHours));
// const hoursMap = new Map(Object.entries(openingHours));

// console.log(hoursMap);

// Quiz app
// console.log(question.get('question'));
// for (const [key, value] of question) {
//   Number.isFinite(key) && console.log(`Option ${key}: ${value}`);
// }

// const answer = Number(prompt('Your answer'));
// console.log(question.get(answer === question.get('correct')));

// Convert map to array
// console.log([...question]);
// console.log([...question.keys()]);
// console.log([...question.values()]);

// // ### Maps (Fundamentals) ###
// const rest = new Map();
// rest.set('name', 'Classico Italiano');
// rest.set(1, 'Firenze, Italy');
// rest.set(2, 'Lisbon, Portugal');
// console.log(rest);

// rest
//   .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//   .set('open', 11)
//   .set('close', 23)
//   .set(true, 'We are open')
//   .set(false, 'We are closed');

// console.log(rest.get('name'));
// console.log(rest.get(true));

// const time = 8;
// console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// console.log(rest.has('categories'));
// rest.delete(2);
// console.log(rest);
// console.log(rest.size);
// // rest.clear();
// const arr = [1, 2];
// rest.set(arr, 'Test');
// rest.set(document.querySelector('h1'), 'Heading');
// console.log(rest);

// console.log(rest.get([1, 2])); // undefined
// console.log(rest.get(arr)); // 'Test'
// console.log(rest.get('h1'));

// ### Sets ###
// const orders = ['Pasta', 'Pizza', 'Pizza', 'Risotto', 'Pasta', 'Pizza'];
// const ordersSet = new Set(orders);
// console.log(ordersSet);

// console.log(new Set('Pedro'));

// console.log(ordersSet.size);
// console.log(ordersSet.has('Pizza'));
// console.log(ordersSet.has('Bread'));
// ordersSet.add('Garlic Bread');
// ordersSet.add('Garlic Bread');
// ordersSet.delete('Risotto');
// // ordersSet.clear();
// console.log(ordersSet);

// for (const order of ordersSet) console.log(order);

// // Example
// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// const staffSet = [...new Set(staff)];
// console.log(staffSet);

// console.log(new Set('pedrorodrigues').size);

// ### Looping Objects: Object Keys, Values and Entries ###

// // Property Names (Object keys)
// const properties = Object.keys(openingHours);
// let openStr = `We are open on ${properties.length} days: `;

// for (const day of Object.keys(openingHours)) {
//   openStr += `${day}, `;
// }
// console.log(openStr);

// // Property Values (Object values)
// const values = Object.values(openingHours);
// console.log(values);

// // Entire Object
// const entries = Object.entries(openingHours);
// console.log(entries);

// for (const [key, { open, close }] of entries) {
//   console.log(`On ${key} we open at ${open} and close at ${close}`);
// }

// ### Looping Arrays: The for-of Loop ###
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of menu) console.log(item);
// for (const [index, item] of menu.entries()) {
//   console.log(`${index + 1}: ${item}`);
// }

// ### Logical Assignment Operators ###
// const rest1 = {
//   name: 'Capri',
//   numGuests: 0,
// };

// const rest2 = {
//   name: 'La Piazza',
//   owner: 'Andretti',
// };

// OR assignment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// nullish assignment operator
// rest1.numGuests ??= 10;
// rest2.numGuests ??= 10;

// AND assignment operator
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';

// rest1.owner &&= '<ANONYMOUS>';
// rest2.owner &&= '<ANONYMOUS>';

// console.log(rest1);
// console.log(rest2);

// ### Nullish Coalescing Operator (??) ###
// restaurant.numGuest = 0;
// const guests = restaurant.numGuest ? restaurant.numGuest : 10;
// console.log(guests);

// // Nulish values: null and undefined (NOT 0 or '')
// const guestCorrect = restaurant.numGuest ?? 10;
// console.log(guestCorrect);

// ### Short Circuiting (&& and ||) ###
// console.log('----------- OR -----------');
// console.log(3 || 'Pedro'); // 3
// console.log('' || 'Pedro'); // Pedro
// console.log(true || 0); // true
// console.log(undefined || null); // null (both are falsy values)
// console.log(null || undefined); // undefined (both are falsy values)

// console.log(undefined || 0 || '' || 'Hello' || 23 || null); // Hello

// restaurant.numGuest = 0;
// const guests1 = restaurant.numGuest ? restaurant.numGuest : 10;
// console.log(guests1);

// const guests2 = restaurant.numGuest || 17;
// console.log(guests2);

// console.log('----------- AND -----------');
// console.log(0 && 'Pedro'); // 0
// console.log(7 && 'Pedro'); // Pedro
// console.log('Pedro' && false); // false
// console.log('Hello' && 23 && null && 'Pedro'); // null

// if (restaurant.orderPizza) {
//   restaurant.orderPizza('meat', 'onions');
// }

// restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

// ### Rest Pattern and Rest Parameters ###
// 1) Destructuring Arrays and Objects
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(pizza, risotto, otherFood);

// const { sat, ...weekDays } = restaurant.openingHours;
// console.log(sat, weekDays);

// // 2) Functions
// const add = function (...numbersToAdd) {
//   let sum = 0;
//   for (let i = 0; i < numbersToAdd.length; i++) {
//     sum += numbersToAdd[i];
//   }
//   console.log(sum);
// };

// add(2, 3);
// add(5, 3, 7, 2);
// add(8, 2, 3, 1, 2, 3, 4, 5, 6, 9);

// const x = [23, 5, 7];
// add(...x);

// restaurant.orderPizza('Cheese', 'Olives', 'Pepper', 'Onion');
// restaurant.orderPizza('Meat');

// ### Spread Operator ###
// const arr = [7, 8, 9];
// const newArr = [5, 6, ...arr];
// console.log(...newArr);

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// // Copy array
// const mainMenuCopy = [...restaurant.mainMenu];
// console.log(mainMenuCopy);

// // Join 2 arrays
// const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
// console.log(menu);

// // Iterables: arrays, string, maps, sets. NOT objects
// const str = 'Pedro';
// const letters = [...str, '', 'R.'];
// console.log(letters);
// console.log(...str);

// //Real-world example
// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt("Let's make pasta! Ingredient 2?"),
//   prompt("Let's make pasta! Ingredient 3?"),
// ];

// // restaurant.orderPasta(...ingredients);

// // Objects
// const newRestaurant = { foundIn: 2003, ...restaurant, founder: 'Giuseppe' };
// console.log(newRestaurant);

// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Ristorante Roma';
// console.log(restaurantCopy);

// ### Destructuring Objects
// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// // Change variable names
// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName, hours, tags);

// // Default values
// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// // Mutating variables
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };
// a = obj.a;
// b = obj.b;
// ({ a, b } = obj);
// console.log(obj, a, b);

// // Destructuring nested objects
// const {
//   fri: { open: o, close: c },
// } = openingHours;
// console.log(o, c);

// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Via del Sole, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// });

// restaurant.orderDelivery({
//   address: 'Via del Sole, 21',
//   starterIndex: 2,
// });

// ### Destructuring Arrays ###
// const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// const [x, y, z] = arr;

// console.log(a, b, c);
// console.log(x, y, z);

// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// // const temp = main;
// // main = secondary;
// // secondary = temp;
// // console.log(main, secondary);

// [secondary, main] = [main, secondary];
// console.log(main, secondary);

// // Receive 2 return values from a function
// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// // Destructuring nested array
// const nested = [2, 4, [5, 6]];
// const [i, j, [k, l]] = nested;

// console.log(i, j, k, l);

// // Default values
// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);
