'use strict';

const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// Select tabs elements
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

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
// Smooth Scrolling
btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' });
});

/////////////////////////////////////////////////
// Page Navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     const section = document.querySelector(id);
//     section.scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    const section = document.querySelector(id);
    section.scrollIntoView({ behavior: 'smooth' });
  }
});

/////////////////////////////////////////////////
// Operations tabbed component
tabsContainer.addEventListener('click', function (e) {
  const elClicked = e.target.closest('button');

  // Guard clause
  if (![...tabs].includes(elClicked)) return;

  // Activate tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  elClicked.classList.add('operations__tab--active');

  // Activate content
  tabsContent.forEach(tabContent =>
    tabContent.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${elClicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

/////////////////////////////////////////////////
// Nav links fade animation on hover
const onMouseHover = function (e) {
  if (!e.target.classList.contains('nav__link')) return;

  const elClicked = e.target;
  const parent = elClicked.closest('.nav');
  const siblings = parent.querySelectorAll('.nav__link');
  const logo = elClicked.closest('.nav').querySelector('img');

  siblings.forEach(el => {
    if (el !== elClicked) el.style.opacity = this;
  });
  logo.style.opacity = this;
};

// Passing "argument" into onMouseHover function
nav.addEventListener('mouseover', onMouseHover.bind(0.5));
nav.addEventListener('mouseout', onMouseHover.bind(1));

/////////////////////////////////////////////////
// Sticky nav

// Bad practice because the callback function is triggered multiple times (scroll event)
// const section1InitialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (window.scrollY >= section1InitialCoords.top) nav.classList.add('sticky')
//   else nav.classList.remove('sticky');
// });

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const observerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const headerObserver = new IntersectionObserver(stickyNav, observerOptions);
headerObserver.observe(header);

/////////////////////////////////////////////////
// Reveal sections
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

const allSections = document.querySelectorAll('.section');
allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

/////////////////////////////////////////////////
// Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
let message;
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
  message = document.createElement('div');
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

const stylesAttributesAndClasses = function () {
  // Styles
  {
    message.style.backgroundColor = '#37383d';
    message.style.width = '120%';

    // .style only returns applied inline styles
    console.log(message.style.height); // empty
    console.log(message.style.backgroundColor); // color

    console.log(getComputedStyle(message).color);
    console.log(getComputedStyle(message).height);

    message.style.height =
      Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';

    document.documentElement.style.setProperty('--color-primary', 'orangered');
  }

  // Attributes
  {
    const logo = document.querySelector('.nav__logo');
    console.log(logo.src); // absolute path
    console.log(logo.alt);
    console.log(logo.className);

    // Non-standard
    console.log(logo['custom- attr']); // undefined
    console.log(logo.getAttribute('custom-attr'));
    logo.setAttribute('company', 'Bankist');

    console.log(logo.getAttribute('src')); // relative path

    const link = document.querySelector('.nav__link--btn');
    console.log(link.href);
    console.log(link.getAttribute('href'));

    // Data attributes
    console.log(logo.dataset.versionNumber);
    console.log(logo.dataset.test);
  }

  // Classes
  {
    logo.classList.add('c', 'p');
    logo.classList.remove('c', 'p');
    logo.classList.toggle('c');
    logo.classList.contains('c');

    // Don't use because it will override
    // logo.className = 'pedro';
  }
};

const implementingSmoothScrolling = function () {
  const btnScrollTo = document.querySelector('.btn--scroll-to');
  const section1 = document.querySelector('#section--1');

  btnScrollTo.addEventListener('click', function (e) {
    e.preventDefault();
    const s1coords = section1.getBoundingClientRect();
    console.log(s1coords);

    // console.log(e.target.getBoundingClientRect());
    // console.log('Current scroll (X/Y)', window.scrollX, window.scrollY);
    // console.log(
    //   'Height/Width viewport',
    //   document.documentElement.clientHeight,
    //   document.documentElement.clientWidth
    // );

    // Scrolling
    {
      // Old way of implemeting
      // window.scrollTo(s1coords.left, s1coords.top + window.scrollY);
      // window.scrollTo({
      //   left: s1coords.left + window.scrollX,
      //   top: s1coords.top + window.scrollY,
      //   behavior: 'smooth',
      // });

      section1.scrollIntoView({ behavior: 'smooth' });
    }
  });
};

const typesOfEventsAndEventHandlers = function () {
  const h1 = document.querySelector('h1');
  const alertH1 = () => {
    alert('addEventListener: Great! You are reading the heading');

    h1.removeEventListener('mouseenter', alertH1);
  };
  // Can have multiple event listeners applied to the same DOM Element
  h1.addEventListener('mouseenter', alertH1);

  // Old way of listening to events
  // h1.onmouseenter = () => {
  //   alert('addEventListener: Great! You are reading the heading');
  // };
};

const eventPropagation = function () {
  // rgb(255,255,255)
  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);
  const randomColor = () =>
    `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

  document.querySelector('.nav__link').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV_LINK', e.target, e.currentTarget);
    console.log(this === e.currentTarget);

    // Stop propagation (not recommended)
    // e.stopPropagation();
  });

  document.querySelector('.nav__links').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV_LINKS', e.target, e.currentTarget);
  });

  document.querySelector('.nav').addEventListener(
    'click',
    function (e) {
      this.style.backgroundColor = randomColor();
      console.log('NAV', e.target, e.currentTarget);
    },
    false // true = catch events on capturing phase
  );
};

const domTraversing = function () {
  const h1 = document.querySelector('h1');

  // Going downwards: child
  console.log(h1.querySelectorAll('.highlight'));
  console.log(h1.childNodes);
  console.log(h1.children);
  h1.firstElementChild.style.color = 'white';
  h1.lastElementChild.style.color = 'red';

  // Going upwards: parents
  console.log(h1.parentNode);
  console.log(h1.parentElement);

  h1.closest('.header').style.background = 'var(--gradient-secondary)';
  h1.closest('h1').style.background = 'var(--gradient-primary)';

  // Going sideways: siblings
  console.log(h1.previousElementSibling);
  console.log(h1.nextElementSibling);

  console.log(h1.previousSibling);
  console.log(h1.nextSibling);

  console.log(h1.parentElement.children);
  [...h1.parentElement.children].forEach(function (el) {
    if (el !== h1) {
      el.style.transform = 'scale(0.5)';
    }
  });
};

const theIntersectionObserverApi = function () {
  const observerCallback = function (entries, observer) {
    entries.forEach(entry => console.log(entry));
  };

  const observerOptions = {
    root: null, // root null means viewport
    threshold: [0, 0.2], // callback is called everytime it passes the configured thresholds values
  };
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  observer.observe(section1);
};
