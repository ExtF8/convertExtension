import { calculateRate } from './calculateRate.js';

(function () {
    // The structure of the currencyOutputs object
    const currencyOutputs = {
        eur: null,
        usd: null,
    };

    const handleInputChanges = async event => {
        const value = getInputValue(event.target);
        const baseCurrency = event.target.getAttribute('data-input-type');

        if (isNaN(value)) {
            displayError(`*Error converting ${baseCurrency.toUpperCase()} to the other currency.`);
            console.error('Invalid input type');
            return;
        }

        await processCalculations(baseCurrency, value);
    };

    const processCalculations = async (baseCurrency, value) => {
        await calculateOutputs(baseCurrency, value);
        await updateOutputs();
    };

    const calculateOutputs = async (baseCurrency, value) => {
        try {
            const result = await calculateRate(baseCurrency, value);

            if (baseCurrency === 'eur') {
                currencyOutputs.usd = result;
            } else {
                currencyOutputs.eur = result;
            }
        } catch (error) {
            displayError(`Error converting ${baseCurrency.toUpperCase()} to the other currency.`);
            console.error(error);
        }
    };

    const updateOutputs = async () => {
        Object.keys(currencyOutputs).forEach(type => {
            const outputElement = document.querySelector(`[data-output-type='${type}']`);
            if (outputElement) {
                outputElement.value = currencyOutputs[type];
            }
        });
    };

    const getInputValue = element => {
        return Number(element.value);
    };

    const displayError = message => {
        const resultElement = document.querySelector('.error-message');

        const p = document.createElement('p');
        p.textContent = message;
        resultElement.innerHTML = '';

        resultElement.appendChild(p);
    };

    document
        .querySelector('.currency-input-container')
        .addEventListener('input', handleInputChanges);
})();
