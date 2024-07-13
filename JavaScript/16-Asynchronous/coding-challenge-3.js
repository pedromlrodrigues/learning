'use strict';

const imgContainer = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(), seconds * 1000);
  });
};

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

// PART 1
const loadNPause = async function () {
  try {
    // Load img1
    let img = await createImage('img/img-1.jpg');
    await wait(2);
    img.style.display = 'none';

    // Load img2
    img = await createImage('img/img-2.jpg');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

// loadNPause();

// PART 2
const loadAll = async function (imgPaths) {
  try {
    const imgsPromises = imgPaths.map(imgPath => createImage(imgPath));
    console.log(imgsPromises);
    const imgs = await Promise.all(imgsPromises);
    imgs.forEach(img => img.classList.add('parallel'));
    console.log(imgs);
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
