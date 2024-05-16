'use strict';
const julia1 = [3, 5, 2, 12, 7];
const kate1 = [4, 1, 15, 8, 3];

const julia2 = [9, 16, 6, 8, 3];
const kate2 = [10, 5, 6, 1, 4];

//1.
const checkDogs = function (dogsJulia, dogsKate) {
  //   const julia1Copy = dogsJulia.slice();
  //   julia1Copy,splice(0,1);
  //   julia1Copy.splice(-2);

  const julia1Copy = dogsJulia.slice(1, -2);
  const mergedArr = julia1Copy.concat(dogsKate);
  mergedArr.forEach(function (age, i) {
    if (age >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy`);
    }
  });
  console.log(mergedArr);
};

checkDogs(julia1, kate1);
console.log('##############');
checkDogs(julia2, kate2);
