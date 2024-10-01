import { calculateRate } from './calculateRate.js';

document.getElementById('eurToUsd').addEventListener('input', async function () {
    const amount = document.getElementById('eurToUsd').value;
    const resultElement = document.getElementById('resultEurToUsd');

    if (!amount) {
        resultElement.textContent = '';
        return;
    }

    try {
        const result = await calculateRate('eur', amount);
        resultElement.textContent = `USD: ${result}`;
    } catch (error) {
        resultElement.textContent = 'Error converting EUR to USD.';
        console.error(error);
    }
});

document.getElementById('usdToEur').addEventListener('input', async function () {
    const amount = document.getElementById('usdToEur').value;
    const resultElement = document.getElementById('resultUsdToEur');

    if (!amount) {
        resultElement.textContent = '';
        return;
    }

    try {
        const result = await calculateRate('usd', amount);
        resultElement.textContent = `EUR: ${result}`;
    } catch (error) {
        resultElement.textContent = 'Error converting USD to EUR.';
        console.error(error);
    }
});