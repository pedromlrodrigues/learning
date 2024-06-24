"use strict";

// 1.
class CarCl {
  constructor(model, speed) {
    this.model = model;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.model} going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.model} going at ${this.speed} km/h`);
  }

  // 2.
  get speedUS() {
    return this.speed / 1.6;
  }

  // 3.
  set speedUS(newSpeed) {
    this.speed = newSpeed * 1.6;
  }
}

// 4.
const ford = new CarCl("Ford", 120);
console.log(ford);
ford.accelerate();
ford.brake();
ford.speedUS = "200";
console.log(ford);
console.log(ford.speedUS);
