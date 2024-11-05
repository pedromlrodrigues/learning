"use strict";

// 1.
const Car = function (make, currentSpeed) {
  this.make = make;
  this.currentSpeed = currentSpeed;
};

Car.prototype.test = function () {
  console.log("This is a test");
};

const EV = function (make, currentSpeed, charge) {
  Car.call(this, make, currentSpeed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

// 2.
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

// 3.
EV.prototype.accelerate = function () {
  this.currentSpeed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.currentSpeed}, with a charge of ${this.charge}%`
  );
};

// 4.
const tesla = new EV("Tesla", 120, 24);
console.log(tesla);
tesla.accelerate();
tesla.chargeBattery(25);
tesla.test();
