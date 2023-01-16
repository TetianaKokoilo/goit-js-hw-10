import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  const entryCountry = event.target.value.trim();

  countryInfo.innerHTML = '';
  countryList.innerHTML = '';

  if (entryCountry) {
    fetchCountries(entryCountry)
      .then(data => {
        if (data.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }

        createCountrySomeInformation(data);

        if (data.length === 1) {
          countryList.innerHTML = '';
          createCountryFullInformation(data);
        }
      })
      .catch(error => Notify.failure(`${error}`));
  }
}

function createCountrySomeInformation(data) {
  const markup = data
    .map(
      ({ name: { official }, flags: { svg } }) =>
        `<li class="country-item"><img src="${svg}" class="country-flag" alt="${official}">${official}</li>`
    )
    .join('');

  countryList.insertAdjacentHTML('beforeend', markup);
}

function createCountryFullInformation(data) {
  const markup = data
    .map(
      ({
        name: { official },
        population,
        capital,
        languages,
        flags: { svg },
      }) => {
        const language = Object.values(languages);
        return `<h1 class="country-name">
     <img src="${svg}" class="country-flag" alt="${official}"> ${official}</h1>
      <h2 class="country-capital">Capital: <span class="country-style">${capital}</span></h2>
      <h2 class="country-population">Population: <span class="country-style">${population}</span></h2>
      <h2 class="country-languages">Languages: <span class="country-style">${language}</span></h2>`;
      }
    )
    .join('');

  countryInfo.insertAdjacentHTML('beforeend', markup);
}
