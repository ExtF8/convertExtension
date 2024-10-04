import { MeasuresConverter } from './bodyMeasures/measuresInput.js';
import { CurrencyConverter } from './currency/currencyInput.js';
import { ShoeSizeConversion } from './shoeSize/shoeSizeInput.js';

const convertCurrencies = new CurrencyConverter();
const currencyContainer = document.querySelector('.currency-input-container');
if (currencyContainer) {
    currencyContainer.addEventListener('input', event =>
        convertCurrencies.handleInputChanges(event)
    );
}

const convertShoSizes = new ShoeSizeConversion();
const shoeSizeContainer = document.querySelector('.shoe-input-container');
if (shoeSizeContainer) {
    shoeSizeContainer.addEventListener('change', event => {
        convertShoSizes.handleInputChanges(event);
    });
}

const convertBodyMeasures = new MeasuresConverter();
const bodyMeasuresContainer = document.querySelector('.measures-input-container');
if (bodyMeasuresContainer) {
    bodyMeasuresContainer.addEventListener('change', event => {
        convertBodyMeasures.handleInputChanges(event);
    });
}
