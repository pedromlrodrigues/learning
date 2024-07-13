"use strict";

// 1.
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
}

class EVCl extends CarCl {
  // 2.
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed}, with a charge of ${this.#charge}`
    );
    return this;
  }
}

const tesla = new EVCl("Tesla", 100, 24);
console.log(tesla);
tesla.accelerate().chargeBattery(90);
console.log(tesla);
