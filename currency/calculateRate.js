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
        console.error('Error fetching currency data: ', error);
        throw error;
    }
}

async function getCurrenciesData(date, currency) {
    const response = await fetchCurrenciesApi(date, currency);
    const responseData = await response.json();
    return responseData;
}

export async function calculateRate(fromCurrency, toCurrency, value) {
    let currentDate = getCurrentDate();
    const responseData = await getCurrenciesData(currentDate, fromCurrency);

    let conversionRate;

    if (!responseData[fromCurrency] || !responseData[fromCurrency][toCurrency]) {
        throw new Error(`Conversion rate not available from ${fromCurrency} to ${toCurrency}`);
    }

    conversionRate = responseData[fromCurrency][toCurrency];

    const result = value * conversionRate;

    return result.toFixed(2);
}

function getCurrentDate() {
    return new Date().toJSON().slice(0, 10);
}
