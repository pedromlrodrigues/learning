"use strict";

// 1.
const Car = function (model, speed) {
  this.model = model;
  this.speed = speed;
};

// 2.
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.model} going at ${this.speed} km/h`);
};

// 3.
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.model} going at ${this.speed} km/h`);
};

// 4.
const lamborghini = new Car("Lamborghini Huracan", 324);
console.log(lamborghini);

const bmw = new Car("BMW M3", 308);
console.log(bmw);

for (let index = 0; index < 5; index++) {
  lamborghini.accelerate();
  bmw.accelerate();
}

for (let index = 0; index < 5; index++) {
  lamborghini.brake();
  bmw.brake();
}
