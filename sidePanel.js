import { calculateRate } from './calculateRate.js';

// Currency: needs some refactor
document.getElementById('eur_input').addEventListener('input', async function () {
    const amount = document.getElementById('eur_input').value;
    const resultElement = document.getElementById('usd_output');

    if (!amount) {
        resultElement.value = 'Please enter a valid amount!';
        return;
    }

    try {
        const result = await calculateRate('eur', amount);
        resultElement.value = result;
    } catch (error) {
        resultElement.innerText = 'Error converting EUR to USD.';
        console.error(error);
    }
});

document.getElementById('usd_input').addEventListener('input', async function () {
    const amount = document.getElementById('usd_input').value;
    const resultElement = document.getElementById('eur_output');

    if (!amount) {
        resultElement.innerText = 'Please enter a valid amount!';
        return;
    }

    try {
        const result = await calculateRate('usd', amount);
        resultElement.value = result;
    } catch (error) {
        resultElement.innerText = 'Error converting USD to EUR.';
        console.error(error);
    }
});
