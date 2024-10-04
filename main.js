import { CurrencyConverter } from './currency/currencyInput.js';

const convertCurrencies = new CurrencyConverter();

document
    .querySelector('.currency-input-container')
    .addEventListener('input', event => convertCurrencies.handleInputChanges(event));
