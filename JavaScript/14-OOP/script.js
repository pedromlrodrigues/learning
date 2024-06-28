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

const staticMethods = function () {
  console.log(Array.from(document.querySelectorAll("h1")));
  // console.log([1, 2, 3].from());

  const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  };

  Person.hey = function () {
    console.log("Hey there 👋");
    console.log(this);
  };

  const pedro = new Person("Pedro", "1996");
  Person.hey();

  // Error: from is part of the Person namespace and is attached to the constructor and not to the prototype
  // Static methods are not available on the instances
  // pedro.hey();
};

const objectCreate = function () {
  const PersonProto = {
    calcAge() {
      console.log(2024 - this.birthYear);
    },
    init(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    },
  };

  const pedro = Object.create(PersonProto);
  pedro.name = "Pedro";
  pedro.birthYear = 1996;
  console.log(pedro);
  pedro.calcAge();

  const margarida = Object.create(PersonProto);
  margarida.init("Margarida", "1996");
  margarida.calcAge();
};

const inheritanceBetweenClassesConstructorFunctions = function () {
  const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  };

  Person.prototype.calcAge = function () {
    console.log(2024 - this.birthYear);
  };

  const Student = function (firstName, birthYear, course) {
    Person.call(this, firstName, birthYear);
    this.course = course;
  };

  // If it is set after adding a new method to the prototype, Object.create will override
  Student.prototype = Object.create(Person.prototype);

  Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
  };

  const pedro = new Student("Pedro", 2003, "Computer Science");
  console.log(pedro);
  pedro.introduce();
  pedro.calcAge();

  console.log(pedro.__proto__);
  console.log(pedro.__proto__.__proto__);

  console.log(pedro instanceof Student);
  console.log(pedro instanceof Person);
  console.log(pedro instanceof Object);

  Student.prototype.constructor = Student;
  console.dir(Student.prototype.constructor);
};

const inheritanceBetweenClassesES6Classes = function () {
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

  class StudentCl extends PersonCl {
    constructor(firstName, birthYear, course) {
      super(firstName, birthYear);
      this.course = course;
    }

    calcAge() {
      console.log(2040 - this.birthYear);
    }
  }

  const pedro = new StudentCl("Pedro", 1996, "Computer Science");
  console.log(pedro);
  pedro.greet();
  pedro.calcAge();
};

const inheritanceBetweenClassesObjectCreate = function () {
  const PersonProto = {
    calcAge() {
      console.log(2024 - this.birthYear);
    },
    init(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    },
  };

  const pedro = Object.create(PersonProto);

  const StudentProto = Object.create(PersonProto);

  StudentProto.init = function (firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
  };

  StudentProto.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
  };

  const margarida = Object.create(StudentProto);
  margarida.init("Margarida", 1996, "Accounting");

  console.log(margarida);
  margarida.introduce();
  margarida.calcAge();
};

const anotherClassExampleAndEncapsulationProtectedPropertiesAndMethods =
  function () {
    class Account {
      constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        // protected properties convention, it should not be manipulated directly
        this._pin = pin;
        this._movements = [];
        this.locale = navigator.language;

        console.log(`Thanks for opening an account, ${this.owner}!`);
      }

      // Public interface
      getMovements() {
        return this._movements;
      }

      deposit(val) {
        this._movements.push(val);
      }

      withdraw(val) {
        this.deposit(-val);
      }

      _approveLoan() {
        return true;
      }

      requestLoan(val) {
        if (this._approveLoan()) {
          this.deposit(val);
          console.log(`Loan approved: +${val}`);
        }
      }
    }

    const acc1 = new Account("Pedro", "EUR", 1111);
    console.log(acc1);

    acc1.deposit(250);
    acc1.withdraw(140);
    acc1.requestLoan(1000);
    console.log(acc1.getMovements());
  };

const encapsulationPrivateClassFieldsAndMethodsAndChainingMethods =
  function () {
    // 1) Public fields
    // 2) Private fields
    // 3) Public methods
    // 4) Private methods
    // (there is also the static version)

    class Account {
      // 1) Public fields (instances)
      locale = navigator.language;

      // 2) Private fields (instances)
      #movements = [];
      #pin;

      constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;
        // this._movements = [];
        // this.locale = navigator.language;
      }

      // 3) Public methods

      // Public interface
      getMovements() {
        return this.#movements;
      }

      deposit(val) {
        this.#movements.push(val);
        return this;
      }

      withdraw(val) {
        this.deposit(-val);
        return this;
      }

      requestLoan(val) {
        if (this.#approveLoan()) {
          this.deposit(val);
          console.log(`Loan approved: +${val}`);
          return this;
        }
      }

      static helper() {
        console.log("I am helping!");
      }

      // 4) Private methods
      #approveLoan() {
        return true;
      }
    }

    const acc1 = new Account("Pedro", "EUR", 1111);
    acc1.deposit(250);
    acc1.withdraw(140);
    acc1.requestLoan(1000);

    console.log(acc1);

    // Property '#movements' is not accessible outside class 'Account' because it has a private identifier.
    // console.log(acc1.#movements);
    console.log(acc1.getMovements());

    // Property '#pin' is not accessible outside class 'Account' because it has a private identifier.
    // console.log(acc1.#pin);

    // console.log(acc1.#approveLoan(100));

    Account.helper();

    // Chaining methods
    acc1.deposit(300).withdraw(560);

    console.log(acc1.getMovements());
  };

encapsulationPrivateClassFieldsAndMethodsAndChainingMethods();
