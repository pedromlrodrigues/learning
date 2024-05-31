'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
const selectingCreatingAndDeletingElements = function () {
  // ### Selecting Elements ###
  console.log(document.documentElement);
  console.log(document.head);
  console.log(document.body);

  const header = document.querySelector('.header');
  const allSections = document.querySelectorAll('.section');
  console.log(allSections);

  document.getElementById('section--1');

  // Retrieves an HTMLCollection - Live collection, means that it updates when the elements of the Collection change
  const allButtons = document.getElementsByTagName('button');
  console.log(allButtons);

  // Retrieves an HTMLCollection
  document.getElementsByClassName('btn');

  // ### Creating and Insertings Elements ###
  const message = document.createElement('div');
  message.classList.add('cookie-message');
  // message.textContent = 'We use cookies for improved functionality and analytics.';
  message.innerHTML =
    'We use cookies for improved functionality and analytics. <button class = "btn btn--close-cookie">Got it!</button>';

  // It will only add one element since each DOM element is unique. Live elements.
  // header.prepend(message); // Inserts as the first child
  header.append(message); // Inserts as the last child

  // To add more than one equal element
  // header.prepend(message.cloneNode(true));

  // Before or after the whole header element (message then header or header then message)
  // header.before(message);
  // header.after(message);

  // ### Deleting Elements ###
  document.querySelector('.btn--close-cookie').addEventListener('click', () => {
    message.remove();
    // Old way of removing an element
    // message.parentElement.removeChild(message);
  });
};

selectingCreatingAndDeletingElements();
