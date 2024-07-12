'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const geocodeUrl = 'https://geocode.xyz';
const countriesApiUrl = 'https://countries-api-836d.onrender.com/countries';

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
  countriesContainer.style.opacity = 1;
};

const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
  countriesContainer.style.opacity = 1;
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
        console.error(`${err} 💥😁`);
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

// Top level code priority > Microtasks queue priority > Callback queue priority
const theEventLoopInPractice = function () {
  console.log('Test start');
  setTimeout(() => console.log('0 sec timer'), 0);
  Promise.resolve('Resolved promise 1').then(res => console.log(res));
  Promise.resolve('Resolved promise 2').then(res => {
    for (let i = 0; i < 1000000000; i++) {}
    console.log(res);
  });
  console.log('Test end');
};

const buildingASimplePromise = function () {
  const lotteryPromise = new Promise(function (resolve, reject) {
    console.log('Lottery draw is happening 🔮');

    setTimeout(function () {
      if (Math.random() >= 0.5) {
        resolve('We WON the lottery!!! 💰💰💰');
      } else {
        reject(new Error('We lost the lottery! 😤😤😤'));
      }
    }, 2000);
  });

  lotteryPromise.then(res => console.log(res)).catch(res => console.error(res));

  // Promisifying setTimeout
  const wait = function (seconds) {
    return new Promise(function (resolve) {
      setTimeout(() => resolve(), seconds * 1000);
    });
  };

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

  wait(1)
    .then(() => {
      console.log('1 second passed');
      return wait(1);
    })
    .then(() => {
      console.log('2 seconds passed');
      return wait(1);
    })
    .then(() => {
      console.log('3 seconds passed');
      return wait(1);
    })
    .then(() => {
      console.log('4 seconds passed');
    });

  Promise.resolve('abc').then(res => console.log(res));
  Promise.reject(new Error('Error')).catch(res => console.error(res));
};

const promisifyingTheGeolocationApi = function () {
  // Async task
  // navigator.geolocation.getCurrentPosition(
  //   pos => console.log(pos),
  //   err => console.error(err)
  // );

  const getPosition = function () {
    return new Promise(function (resolve, reject) {
      // navigator.geolocation.getCurrentPosition(
      //   pos => resolve(pos),
      //   err => reject(new Error(err))
      // );
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  getPosition()
    .then(pos => console.log(pos))
    .catch(err => console.error(err));

  console.log('Getting position');

  const whereAmI = function () {
    getPosition()
      .then(pos => {
        const { latitude: lat, longitude: lng } = pos.coords;

        return fetch(`${geocodeUrl}/${lat},${lng}?geoit=json`);
      })
      .then(res => {
        if (!res.ok)
          throw new Error(
            `Access to the requested resource is forbidden! ${res.status} 💥💥💥`
          );

        return res.json();
      })
      .then(data => {
        console.log(`You are in ${data.city}, ${data.country}`);
        return fetch(`${countriesApiUrl}/name/${data.country}`);
      })
      .then(res2 => {
        if (!res2.ok) throw new Error(`${res2.status} 💥💥💥`);

        return res2.json();
      })
      .then(data2 => renderCountry(data2[0]))
      .catch(err => console.error(err.message))
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
  };

  btn.addEventListener('click', whereAmI);
};

const consumingPromisesWithAsyncAwaitAndErrorHandlingWithTryCatch =
  function () {
    const getPosition = function () {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };

    const whereAmI = async function () {
      try {
        // Get current position
        const pos = await getPosition();
        const { latitude: lat, longitude: lng } = pos.coords;

        // Reverse geocoding (convert location into a human readable address)
        const resGeo = await fetch(`${geocodeUrl}/${lat},${lng}?geoit=json`);
        if (!resGeo.ok) throw new Error('Problem getting location data');

        const dataGeo = await resGeo.json();

        // Fetch Country Data
        const res = await fetch(`${countriesApiUrl}/name/${dataGeo.country}`);
        if (!resGeo.ok) throw new Error('Problem getting country data');

        const [data] = await res.json();
        renderCountry(data);

        return `You are in ${dataGeo.city}, ${dataGeo.country}`;
      } catch (err) {
        console.error(`🤦🏼‍♂️ Something went wrong: ${err}`);
        renderError(`🤦🏼‍♂️ Something went wrong: ${err.message}`);

        // Reject promise returned from async function
        throw err;
      }
    };

    console.log('1: Will get location');
    // const location = whereAmI();
    // console.log(location);

    // Mix of old/new way of handling promises (not nice 😅)
    // whereAmI()
    //   .then(location => console.log(`2: ${location}`))
    //   .catch(err => console.error(`2: ${err.message}`))
    //   .finally(() => console.log('3: Finished getting location'));

    (async function () {
      try {
        const location = await whereAmI();
        console.log(`2: ${location}`);
      } catch (err) {
        console.error(`2: ${err.message}`);
      }
      console.log('3: Finished getting location');
    })();
  };

consumingPromisesWithAsyncAwaitAndErrorHandlingWithTryCatch();
