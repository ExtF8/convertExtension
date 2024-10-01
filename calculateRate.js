const CURRENCIES_API_URL = (date, currency) => {
    return `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${currency}.min.json`;
};

async function fetchCurrenciesApi(date, currency) {
    try {
        const response = await fetch(CURRENCIES_API_URL(date, currency), {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error('Error fetching schedule data: ', error);
        throw error;
    }
}

async function getCurrenciesData(date, currency) {
    const response = await fetchCurrenciesApi(date, currency);
    const responseData = await response.json();
    return responseData;
}

export async function calculateRate(currency, value) {
    let currentDate = getCurrentDate();
    const responseData = await getCurrenciesData(currentDate, currency);

    let conversionRate;

    if (currency === 'eur') {
        conversionRate = responseData.eur.usd;
    } else if (currency === 'usd') {
        conversionRate = responseData.usd.eur;
    } else {
        throw new Error('Unsupported currency');
    }

    const result = value * conversionRate;

    return result.toFixed(2);
}

function getCurrentDate() {
    return new Date().toJSON().slice(0, 10);
}

// let resultEurToUsd = await calculateRate('eur', 1);
// let resultUsdToEur = await calculateRate('usd', 1);

// console.log('resultEurToUsd: ', resultEurToUsd);
// console.log('resultUsdToEur: ', resultUsdToEur);
