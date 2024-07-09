'use strict';

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

// 1)
const whereAmI = function (lat, lng) {
  // 2)
  const geocodeUrl = 'https://geocode.xyz';
  const countriesApiUrl = 'https://countries-api-836d.onrender.com/countries';
  fetch(`${geocodeUrl}/${lat},${lng}?geoit=json`)
    .then(res => {
      // 5)
      if (!res.ok)
        throw new Error(
          `Access to the requested resource is forbidden! ${res.status} 💥💥💥`
        );

      return res.json();
    })
    .then(data => {
      // 3)
      console.log(`You are in ${data.city}, ${data.country}`);
      // 6)
      return fetch(`${countriesApiUrl}/name/${data.country}`);
    })
    .then(res2 => {
      if (!res2.ok) throw new Error(`${res2.status} 💥💥💥`);

      return res2.json();
    })
    // 7)
    .then(data2 => renderCountry(data2[0]))
    // 4)
    .catch(err => console.log(err.message))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

whereAmI(52.508, 13.381);
