'use strict';
const imgContainer = document.querySelector('.images');
let currentImg;
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(), seconds * 1000);
  });
};

// 1)
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const imgEl = document.createElement('img');
    imgEl.src = imgPath;

    // 2)
    imgEl.addEventListener('load', function () {
      imgContainer.insertAdjacentElement('beforeend', this);
      resolve(this);
    });

    imgEl.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

// 4)
createImage('img/img-1.jpg')
  .then(imgEl => {
    currentImg = imgEl;
    // 5)
    return wait(2);
  })
  // 6)
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(imgEl => {
    currentImg = imgEl;
    // 7)
    return wait(2);
  })
  // 8)
  .then(() => (currentImg.style.display = 'none'))
  .catch(err => console.error(err));
