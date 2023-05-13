import Notiflix from 'notiflix';

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const API_URL = 'https://restcountries.com/v3.1/name/';
const FILTER = '?fields=name,capital,population,flags,languages';

export const fetchCountries = async (name) => {
  try {
    name = name.trim();
    const response = await fetch(`${API_URL}${name}${FILTER}`);

    if (!response.ok) {
      throw new Error(response.status);
    }

    const countries = await response.json();

    if (countries.length > 10) {
      showTooManyCountriesMessage();
    } else if (countries.length >= 2 && countries.length <= 10) {
      showFewCountriesList(countries);
    } else if (countries.length === 1) {
      showOneCountryInfo(countries);
    }
  } catch (error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    clearCountriesInfo();
  }
};

const showTooManyCountriesMessage = () => {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
};

const showFewCountriesList = (countries) => {
  clearCountriesInfo();

  const countriesList = countries
    .map((country) => {
      return `
        <li>
          <img
            src="${country.flags.svg}"
            alt="${country.flags.alt}"
            width="25"
            height="auto"
          />
          <p> ${country.name.official}</p>
        </li>
      `;
    })
    .join('');

  countryList.innerHTML = countriesList;
};

const showOneCountryInfo = (countries) => {
  clearCountriesInfo();

  const countryInfoHTML = countries
    .map((country) => {
      return `
        <h2 style="font-size: 30px">
          <img
            src="${country.flags.svg}"
            alt="${country.flags.alt}"
            width="50"
            height="auto"
          />
          ${country.name.official}
        </h2>
        <p><span style="font-weight: bold" >Capital:</span> ${
          country.capital || 'Unknown'
        }</p>
        <p><span style="font-weight: bold" >Population:</span> ${country.population?.toLocaleString() || 'Unknown'}</p>
        <p><span style="font-weight: bold" >Languages:</span> ${Object.values(
          country.languages
        ).join(', ')}</p>
      `;
    })
    .join('');

  countryInfo.innerHTML = countryInfoHTML;
};

const clearCountriesInfo = () => {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
};