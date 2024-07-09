'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
          <article class="country ${className}">
              <img class="country__img" src="${data.flag}" />
              <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
                ).toFixed(1)}</p>
                <p class="country__row"><span>🗣️</span>${
                  data.languages[0].name
                }</p>
                <p class="country__row"><span>💰</span>${
                  data.currencies[0].name
                }</p>
              </div>
          </article>
        `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
};

///////////////////////////////////////
const url = 'https://countries-api-836d.onrender.com/countries';

const aJAXCallXMLHttpRequestAndCallbackHell = () => {
  // XMLHttpRequest is the old way to do HTTP requests
  const getCountryAndNeighbour = function (country) {
    const request = new XMLHttpRequest();
    request.open('GET', `${url}/name/${country}`);
    request.send();

    request.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);

      // Render country 1
      renderCountry(data);

      // Get neighbour country (2)
      const [neighbour] = data.borders;
      if (!neighbour) return;

      const request2 = new XMLHttpRequest();
      request2.open('GET', `${url}/alpha/${neighbour}`);
      request2.send();

      request2.addEventListener('load', function () {
        const data = JSON.parse(this.responseText);
        renderCountry(data, 'neighbour');
      });
    });
  };

  getCountryAndNeighbour('usa');

  // Callback Hell -> Callback inside of Callback n times which intends to run asynchronous tasks synchronously.
  // It turns the code into a mess and hard to read
  // Solution: Promises

  // setTimeout(() => {
  //   console.log('1 second passed');
  //   setTimeout(() => {
  //     console.log('2 seconds passed');
  //     setTimeout(() => {
  //       console.log('3 seconds passed');
  //       setTimeout(() => {
  //         console.log('4 seconds passed');
  //       }, 1000);
  //     }, 1000);
  //   }, 1000);
  // }, 1000);
};

const fetchApiAndPromises = function () {
  // Modern way to do Http Requests
  // const request = fetch(`${url}/name/`);

  //////////////////////////////////////////////////////////////////////////////
  // Chaining Promises, Handling Rejected Promises and Throwing Errors Manually
  const getJSON = function (url, errorMsg = 'Something went wrong') {
    return fetch(url).then(res => {
      if (!res.ok) throw new Error(`${errorMsg} (${res.status})`);

      return res.json();
    });
  };
  const getCountryAndNeighbour = function (country) {
    // Country 1
    getJSON(`${url}/name/${country}`, 'Country not found')
      .then(data => {
        renderCountry(data[0]);
        const neighbour = data[0].borders?.[0];
        if (!neighbour) throw new Error('No neighbour found!');

        // Country 2
        return getJSON(`${url}/alpha/${neighbour}`, 'Country not found');
      })
      .then(data => renderCountry(data, 'neighbour'))
      .catch(err => {
        console.log(`${err} 💥😁`);
        renderError(`Something went wrong! 💥 ${err.message}. Try again!`);
      })
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
  };

  btn.addEventListener('click', function () {
    getCountryAndNeighbour('australia');
  });
};

fetchApiAndPromises();
