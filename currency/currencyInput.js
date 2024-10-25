import { getInputValue, displayError } from '../utils/utils.js';
import { calculateRate } from './calculateRate.js';

/**
 * Represets a currency converter that handles currency input changer and conversion calculations.
 * Initializes the `currencyOutputs` object for storing conversion results
 */
export class CurrencyConverter {
    constructor() {
        // The structure of the currencyOutputs object
        this.currencyOutputs = {
            eur: null,
            usd: null,
            gbp: null,
        };
    }

    /**
     * Handles input changes for currency conversion.
     * Clears any existing error messages and validates the input format.
     * If valid, proceeds with converting the input value to other currencies.
     * @param {Event} event - The input event triggered when the user changes the value.
     * @async
     */
    async handleInputChanges(event) {
        // Clear the error message
        displayError('', 'error-message-currency');

        let value = getInputValue(event.target);
        const baseCurrency = event.target.getAttribute('data-input-type');

        // Replace commas with periods (for locales that use commas)
        value = value.replace(',', '.');

        // Validate that input only contains numbers and a single period (decimal point)
        if (!/^(\d*\.?\d*)$/.test(value)) {
            displayError(
                '*Invalid format. Please enter a valid decimal number.',
                'error-message-currency'
            );
            return;
        }

        // Set the value back to the input to reflect correct format (e.g., allowing "34.")
        event.target.value = value;

        // If value is now a valid number, proceed with conversion
        const floatValue = parseFloat(value);

        if (isNaN(value)) {
            displayError(
                `*Error converting ${baseCurrency.toUpperCase()} to the other currency.`,
                'error-message-currency'
            );
            console.error('Invalid input type');
            return;
        }

        // Process calculations based on baseCurrency and input value
        await this.processCalculations(baseCurrency, floatValue);
    }

    async processCalculations(baseCurrency, value) {
        await this.calculateOutputs(baseCurrency, value);
        this.updateOutputs(baseCurrency);
    }

    async calculateOutputs(baseCurrency, value) {
        try {
            switch (baseCurrency) {
                case 'eur':
                    this.currencyOutputs.usd = await calculateRate('eur', 'usd', value);
                    this.currencyOutputs.gbp = await calculateRate('eur', 'gbp', value);
                    break;
                case 'usd':
                    this.currencyOutputs.eur = await calculateRate('usd', 'eur', value);
                    this.currencyOutputs.gbp = await calculateRate('usd', 'gbp', value);
                    break;
                case 'gbp':
                    this.currencyOutputs.eur = await calculateRate('gbp', 'eur', value);
                    this.currencyOutputs.usd = await calculateRate('gbp', 'usd', value);
                    break;
                default:
                    break;
            }
        } catch (error) {
            displayError(
                `Error converting ${baseCurrency.toUpperCase()} to the other currency.`,
                'error-message-currency'
            );
            console.error(error);
        }
    }

    updateOutputs(baseCurrency) {
        const usdInput = document.querySelector(`[data-input-type='usd']`);
        const eurInput = document.querySelector(`[data-input-type='eur']`);
        const gbpInput = document.querySelector(`[data-input-type='gbp']`);

        switch (baseCurrency) {
            case 'eur':
                usdInput.value = this.currencyOutputs.usd;
                gbpInput.value = this.currencyOutputs.gbp;

                break;
            case 'usd':
                eurInput.value = this.currencyOutputs.eur;
                gbpInput.value = this.currencyOutputs.gbp;
                break;
            case 'gbp':
                usdInput.value = this.currencyOutputs.usd;

                eurInput.value = this.currencyOutputs.eur;
                break;
            default:
                break;
        }
    }
}
