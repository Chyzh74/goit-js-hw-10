import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const inputEL = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

const DEBOUNCE_DELAY = 300;

inputEL.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange() {
  let nameCountry = inputEL.value.trim();

  if (nameCountry === '') {
    return;
  }
  fetchCountries(nameCountry)
    .then(country => {
      if (country.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.');
        clearAll();
      } else if (country.length >= 2 && country.length < 10) {
        clearAll();
        createMarkupList(country); 
      } else if (country.length === 1) {
        clearAll();
        createMarkupCard(country);

        console.log(country);
      }
    })
    .catch(onFetchError);
}

function onFetchError(error) {
  clearAll();
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function createMarkupCard(country) {
  const countryCard = country
    .map(
      ({ flags, name, capital, population, languages }) => `<img src="${
        flags.svg
      }" alt="${flags.alt}" width=50 />
        <h2>${name.official}</h2>
        <ul>
          <li>
            <p><b>Capital:</b> ${capital}</p>
          </li>
          <li>
            <p><b>Population:</b> ${population}</p>
          </li>
          <li>
            <p><b>Languages:</b> ${Object.values(languages)} </p>
          </li>
        </ul>`
    )
    .join('');
  countryInfo.innerHTML = countryCard;
}

function createMarkupList(countries) {
  const countriesList = countries
    .map(
      ({ flags, name }) =>
        `<li class="country-list__item">
        <img src="${flags.svg}" alt="${flags.alt}" width=56 height=42 />
        <p class="country-list__text">${name.official}</p>
      </li>`
    )
    .join('');

  countryList.innerHTML = countriesList;
}

function clearAll() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}