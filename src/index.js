import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');
const input = document.querySelector('#search-box');

const searchCountry = e => {
  const searchName = input.value.trim();

  fetchCountries(searchName)
    .then(data => {
      countriesData(data);
    })
    .catch(() => {
      if (searchName !== '') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });
};

input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function countriesData(data) {
  clearData(list);
  clearData(info);
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length > 1 && data.length <= 10) {
    return (list.innerHTML = data
      .map(
        ({ flags: { svg }, name: { common } }) => `<li class="country">
      <img src= '${svg}' />
      <p>${common}</p>
      </li>
       `
      )
      .join(''));
  } else {
    return (info.innerHTML = data
      .map(
        ({
          flags: { svg },
          name: { common },
          capital,
          population,
          languages,
        }) => `
                <div class="country" >
                <img src='${svg}' />
                <div class="country-body"
                <h3>${common}</h3>
                <p><b>Capital: </b> ${capital} </p>
                <p><b>Population: </b> ${population}</p>
                <p><b>Languages: </b> ${Object.values(languages)}</p>
                        </div>
                    </div>
 `
      )

      .join(''));
  }
}

function clearData(element) {
  element.innerHTML = '';
}

input.placeholder = 'find your counrty';
