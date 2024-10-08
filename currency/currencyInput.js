import { getInputValue, displayError } from '../utils/utils.js';
import { calculateRate } from './calculateRate.js';

export class CurrencyConverter {
    constructor() {
        // The structure of the currencyOutputs object
        this.currencyOutputs = {
            eur: null,
            usd: null,
        };
    }

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

        await this.processCalculations(baseCurrency, floatValue);
    }

    async processCalculations(baseCurrency, value) {
        await this.calculateOutputs(baseCurrency, value);
        this.updateOutputs(baseCurrency);
    }

    async calculateOutputs(baseCurrency, value) {
        try {
            const result = await calculateRate(baseCurrency, value);

            if (baseCurrency === 'eur') {
                this.currencyOutputs.usd = result;
            } else {
                this.currencyOutputs.eur = result;
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
        // Update the input field of the opposite currency
        if (baseCurrency === 'eur') {
            // Update USD input field
            const usdInput = document.querySelector(`[data-input-type='usd']`);
            if (usdInput) {
                usdInput.value = this.currencyOutputs.usd;
            }
        } else if (baseCurrency === 'usd') {
            // Update EUR input field
            const eurInput = document.querySelector(`[data-input-type='eur']`);
            if (eurInput) {
                eurInput.value = this.currencyOutputs.eur;
            }
        }
    }
}
