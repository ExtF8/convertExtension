import { MeasuresConverter } from './bodyMeasures/measuresInput.js';
import { CurrencyConverter } from './currency/currencyInput.js';
import { ShoeSizeConversion } from './shoeSize/shoeSizeInput.js';

// Instance of the CurrencyConverter class
const convertCurrencies = new CurrencyConverter();
const currencyContainer = document.querySelector('.currency-input-container');
if (currencyContainer) {
    currencyContainer.addEventListener('input', event =>
        convertCurrencies.handleInputChanges(event)
    );
}

// Instance of the MeasuresConverter class for body measurements
const convertBodyMeasures = new MeasuresConverter();
const bodyMeasuresContainer = document.querySelector('.measures-input-container');
if (bodyMeasuresContainer) {
    bodyMeasuresContainer.addEventListener('change', event => {
        convertBodyMeasures.handleInputChanges(event);
    });
}

// Instance of the ShoeSizeConversion class for shoe size conversions
const convertShoSizes = new ShoeSizeConversion();
const shoeSizeContainer = document.querySelector('.shoe-input-container');
if (shoeSizeContainer) {
    shoeSizeContainer.addEventListener('change', event => {
        convertShoSizes.handleInputChanges(event);
    });
}
