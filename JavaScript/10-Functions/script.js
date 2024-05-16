'use strict';

const closures = function () {
  const secureBooking = function () {
    let passengerCount = 0;

    return function () {
      passengerCount++;
      console.log(`${passengerCount} passengers`);
    };
  };

  const booker = secureBooking();

  // booker();
  // booker();
  // booker();
  // console.dir(booker);

  let f;
  const g = function () {
    const a = 23;
    f = function () {
      console.log(a * 2);
    };
  };

  const h = function () {
    const b = 777;
    f = function () {
      console.log(b * 2);
    };
  };

  // g();
  // f();
  // h();
  // f();

  // console.dir(f);

  const boardPassengers = function (n, wait) {
    const perGroup = n / 3;

    setTimeout(function () {
      console.log(`We are now boarding all ${n} passengers`);
      console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000);

    console.log(`Will start boarding in ${wait} seconds`);
  };

  const perGroup = 1000;
  boardPassengers(180, 3);
};

closures();

// Immediately Invoked Function Expressions (IIFE)
const immediatelyInvokedFunctionExpressions = function () {
  const runOnce = function () {
    console.log('This will never run again');
  };

  // IIFE
  (function () {
    console.log('This will never run again');
  })();

  (() => console.log('This will ALSO never run again'))();

  {
    const isPrivate = 23;
    var notPrivate = 1;
  }

  //console.log(isPrivate);
  console.log(notPrivate);
};

// ### The call, apply and bind Methods
const theCallApplyAndBindMethods = function () {
  const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    book(flightNum, name) {
      console.log(
        `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
      );
      this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    },
  };

  lufthansa.book(432, 'Pedro');
  lufthansa.book(768, 'João');
  console.log(lufthansa);

  const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
  };

  const book = lufthansa.book;

  // Does NOT work
  // book(23, 'Margarida P.');

  book.call(eurowings, 23, 'Margarida P.');
  console.log(eurowings);

  book.call(lufthansa, 76, 'José C.');
  console.log(lufthansa);

  const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
  };

  book.call(swiss, 879, 'Pedro R.');
  console.log(swiss);

  const flightData = [521, 'Margarida P.'];
  book.apply(swiss, flightData);

  book.call(swiss, ...flightData);
  console.log(swiss);

  const bookLH = book.bind(lufthansa);
  const bookLX = book.bind(swiss);
  const bookEW = book.bind(eurowings);

  bookLH(67, 'Pedro R.');

  const bookEW23 = book.bind(eurowings, 23);
  bookEW23('José C.');

  // With Event Listeners
  lufthansa.planes = 300;
  lufthansa.buyPlane = function () {
    console.log(this);
    this.planes++;

    console.log(this.planes);
  };

  document
    .querySelector('.buy')
    .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

  // Partial application
  const addTax = (rate, value) => value + value * rate;
  console.log(addTax(0.1, 200));

  const addVAT = addTax.bind(null, 0.23);
  console.log(addVAT(200));

  const addTax2 = rate => value => value + value * rate;
  const addVAT2 = addTax2(0.23);
  console.log(addVAT2(23));
};

// ### Functions Returning Functions ###
const functionsReturningFunctions = function () {
  const greet = function (greeting) {
    return function (name) {
      console.log(`${greeting} ${name}`);
    };
  };

  const greeterHey = greet('Hey');
  greeterHey('Pedro');
  greeterHey('Lima');

  greet('Hello')('Pedro');

  const greetArrow = greeting => name => console.log(`${greeting} ${name}`);

  greetArrow('Hello')('Arrow');
};

// ### Functions Accepting Callback Functions ###
const functionsAcceptingCallBackFunctions = function () {
  const oneWord = function (str) {
    return str.replaceAll(' ', '').toLowerCase();
  };

  const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
  };

  // Higher-Order function (function as parameter)
  const transformer = function (str, fn) {
    console.log(`Original String: ${str}`);
    console.log(`Transformed String: ${fn(str)}`);
    console.log(`Transformed by: ${fn.name}`);
  };

  transformer('JavaScript is the best!', upperFirstWord);
  transformer('JavaScript is the best!', oneWord);

  const high5 = function () {
    console.log('][_, ([]) ][_,');
  };

  document.body.addEventListener('click', high5);

  ['Pedro', 'Margarida', 'António'].forEach(high5);
};

// ### How Passing Arguments Works (Value vs Reference)
const howPassingArgumentsWorks = function () {
  const flight = 'LH234';
  const pedro = {
    name: 'Pedro Rodrigues',
    passport: 2312312312312,
  };

  const checkIn = function (flightNum, passenger) {
    flightNum = 'LH999';
    pedro.name = 'Mr. ' + passenger.name;

    if (passenger.passport === 2312312312312) {
      alert('Checked In');
    } else {
      alert('Wrong passport!');
    }
  };

  const newPassport = function (person) {
    person.passport = Math.trunc(Math.random() * 1000000000);
  };

  newPassport(pedro);
  checkIn(flight, pedro);
  console.log(pedro);
};

// ### Default Parameters
const defaultParameters = function () {
  const bookings = [];

  const createBooking = function (
    flightNum,
    numPassengers = 1,
    price = 199 * numPassengers
  ) {
    // ES5
    //   numPassengers = numPassengers || 1;
    //   price = price || 199;

    const booking = { flightNum, numPassengers, price };
    console.log(booking);
    bookings.push(booking);
  };

  createBooking('LH123');
  createBooking('LH123', 2, 800);
  createBooking('LH123', 5);
  createBooking('LH123', undefined, 1000);
};
