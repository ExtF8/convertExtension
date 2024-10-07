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
const measureInputs = bodyMeasuresContainer.querySelectorAll('div > input[data-measure-type]');
if (bodyMeasuresContainer) {
    measureInputs.forEach(input => {
        input.addEventListener('change', event => {
            convertBodyMeasures.handleInputChanges(event);
        });
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

// Reset button for clearing input values
const resetButton = document.getElementById('reset');
const inputs = document.querySelectorAll('input');
const textArea = document.getElementById('textField');
resetButton.addEventListener('click', () => {
    inputs.forEach(input => {
        input.value = '';
    });
    textArea.value = '';
});
