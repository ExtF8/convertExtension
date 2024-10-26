import { MeasuresConverter } from './bodyMeasures/measuresInput.js';
import { CurrencyConverter } from './currency/currencyInput.js';
import { ShoeSizeConversion } from './shoeSize/shoeSizeInput.js';

/**
 * Instance of the CurrencyConverter class to manage currency conversion
 * @type {CurrencyConverter}
 */
const convertCurrencies = new CurrencyConverter();

/**
 * The container element fo currency input fields.
 * @type {HTMLElement|null}
 */
const currencyContainer = document.querySelector('.currency-input-container');
if (currencyContainer) {
    currencyContainer.addEventListener('input', event =>
        convertCurrencies.handleInputChanges(event)
    );
}

/**
 * Instance of the MeasuresConverter class to manage body measurement conversions.
 * @type {MeasuresConverter}
 */
const convertBodyMeasures = new MeasuresConverter();

/**
 * The container element for body measurement input fields.
 * @type {HTMLElement|null}
 */
const bodyMeasuresContainer = document.querySelector('.measures-input-container');

/**
 * A collection of input elements representing various body measurements.
 * @type {NodeListOf<HTMLInputElement>}
 */
const measureInputs = bodyMeasuresContainer.querySelectorAll('div > input[data-measure-type]');
if (bodyMeasuresContainer) {
    measureInputs.forEach(input => {
        input.addEventListener('change', event => {
            convertBodyMeasures.handleInputChanges(event);
        });
    });
}

/**
 * Instance of the ShoeSizeConversion class to manage shoe size conversions.
 * @type {ShoeSizeConversion}
 */
const convertShoSizes = new ShoeSizeConversion();

/**
 * The container element for shoe size input fields.
 * @type {HTMLElement|null}
 */
const shoeSizeContainer = document.querySelector('.shoe-input-container');
if (shoeSizeContainer) {
    shoeSizeContainer.addEventListener('change', event => {
        convertShoSizes.handleInputChanges(event);
    });
}

/**
 * The reset button element for clearing input values.
 * @type {HTMLElement|null}
 */
const resetButton = document.getElementById('reset');

/**
 * A collection of all input elements in the document.
 * @type {NodeListOf<HTMLInputElement>}
 */
const inputs = document.querySelectorAll('input');

/**
 * The textarea element for displaying output or notes.
 * @type {HTMLTextAreaElement|null}
 */
const textArea = document.getElementById('textField');

/**
 * Event listener for the reset button click event.
 * Clears all input values and resets the textarea.
 */
resetButton.addEventListener('click', () => {
    inputs.forEach(input => {
        input.value = '';
    });
    textArea.value = '';
});
