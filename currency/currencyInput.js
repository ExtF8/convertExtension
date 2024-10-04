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
        const value = this.getInputValue(event.target);
        const baseCurrency = event.target.getAttribute('data-input-type');

        if (isNaN(value)) {
            this.displayError(
                `*Error converting ${baseCurrency.toUpperCase()} to the other currency.`
            );
            console.error('Invalid input type');
            return;
        }

        await this.processCalculations(baseCurrency, value);
    }

    async processCalculations(baseCurrency, value) {
        await this.calculateOutputs(baseCurrency, value);
        await this.updateOutputs();
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
            this.displayError(
                `Error converting ${baseCurrency.toUpperCase()} to the other currency.`
            );
            console.error(error);
        }
    }

    async updateOutputs() {
        Object.keys(this.currencyOutputs).forEach(type => {
            const outputElement = document.querySelector(`[data-output-type='${type}']`);
            if (outputElement) {
                outputElement.value = this.currencyOutputs[type];
            }
        });
    }

    getInputValue(element) {
        return Number(element.value);
    }

    displayError(message) {
        const resultElement = document.querySelector('.error-message');
        const p = document.createElement('p');
        p.textContent = message;
        resultElement.innerHTML = '';
        resultElement.appendChild(p);
    }
}
