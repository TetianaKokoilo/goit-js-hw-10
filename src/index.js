import './css/styles.css';
import API from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryInput.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
    event.preventDefault();
    const entryCountry = e.target.value.trim();
    console.dir(entryCountry);

}