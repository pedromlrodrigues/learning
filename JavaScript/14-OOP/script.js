"use strict";

const constructorsAndPrototypes = function () {
  //////////////////////////////////////////////////////
  // Constructor functions
  const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;

    // Bad practice create a method inside of a consctructor function.
    // Would create a new function for each instance
    //   this.calcAge = function () {
    //     console.log(2024 - this.birthYear);
    //   };
  };

  // By using 'new' keyword:
  // 1. New empty object is created
  // 2. function is called, this = empty object
  // 3. empty object linked to prototype
  // 4. function automatically return empty object
  const pedro = new Person("Pedro", 1996);
  console.log(pedro);

  const margarida = new Person("Margarida", 1996);
  const jose = new Person("José", 2021);
  console.log(margarida, jose);

  console.log(pedro instanceof Person);

  //////////////////////////////////////////////////////
  // Prototypes
  Person.prototype.calcAge = function () {
    console.log(2024 - this.birthYear);
  };

  pedro.calcAge();

  console.log(pedro.__proto__);
  console.log(pedro.__proto__ === Person.prototype);

  // Set property via prototype
  Person.prototype.species = "Homo Sapiens";
  console.log(pedro);

  console.log(pedro.hasOwnProperty("firstName"));
  console.log(pedro.hasOwnProperty("species"));

  //////////////////////////////////////////////////////
  // Prototypal Inheritance on Build-In Objects
  console.log(pedro.__proto__.__proto__); // Person inherits the prototype of Object
  console.dir(Person.prototype.constructor);

  const arr = [1, 2, 3, 4, 1, 2, 3, 4];
  console.log(arr.__proto__ === Array.prototype); // Array inherits the prototype of Object

  Array.prototype.unique = function () {
    return [...new Set(this)];
  };

  console.log(arr.unique());

  const h1 = document.querySelector("h1");
  console.dir((x) => x + 1);
};

const es6Classes = function () {
  // Class expression
  // const PersonCl = class {
  //   constructor(firstName, birthYear) {
  //     this.firstName = firstName;
  //     this.birthYear = birthYear;
  //   }
  // };

  // Class declaration
  class PersonCl {
    constructor(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    }

    calcAge() {
      console.log(2024 - this.birthYear);
    }

    greet() {
      console.log(`Hey ${this.firstName}`);
    }
  }

  const pedro = new PersonCl("Pedro", 27);
  console.log(pedro);
  pedro.calcAge();
  console.log(pedro.__proto__);

  // PersonCl.prototype.greet = function () {
  //   console.log(`Hey ${this.firstName}`);
  // };

  pedro.greet();

  // 1. Classes are NOT hoisted
  // 2. Just like functions, Class are first-class citizens
  // 3. The body of a Class are executed in strict mode
};

const gettersAndSetters = function () {
  const account = {
    owner: "Pedro",
    movements: [100, -100, 1900, -200],

    get latest() {
      return this.movements.slice(-1).pop();
    },
    set latest(mov) {
      this.movements.push(mov);
    },
  };

  console.log(account.latest);
  account.latest = 340;
  console.log(account.movements);

  class PersonCl {
    constructor(fullName, birthYear) {
      this.fullName = fullName;
      this.birthYear = birthYear;
    }

    calcAge() {
      console.log(2024 - this.birthYear);
    }

    greet() {
      console.log(`Hey ${this.fullName}`);
    }

    get age() {
      return 2024 - this.birthYear;
    }

    set fullName(name) {
      if (name.includes(" ")) this._fullName = name;
      else alert(`${name} is not a full name!`);
    }

    get fullName() {
      return this._fullName;
    }
  }

  // The setter for fullName is treated as a normal variable assignment (also on the constructor)
  const pedro = new PersonCl("Pedro Lima Rodrigues", 1996);
  console.log(pedro.age);
  console.log(pedro.fullName);
  console.log(pedro);

  const margarida = new PersonCl("Margarida", 1996);
  console.log(margarida);
};

gettersAndSetters();