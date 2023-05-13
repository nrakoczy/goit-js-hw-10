import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const debounce = require('lodash.debounce');

const inputEl = document.getElementById('search-box');

const DEBOUNCE_DELAY = 300;

inputEl.addEventListener(
  'input',
  debounce(name => {
    name = inputEl.value;
    fetchCountries(name);
  }, DEBOUNCE_DELAY)
);