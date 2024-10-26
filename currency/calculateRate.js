/**
 * Constructs the API URL for fetching currency data based on the provided date and base currency.
 * @param {string} date - The date in YYYY-MM-DD format to fetch the currency data for.
 * @param {string} currency - The base currency to fetch data for.
 * @returns {string} - The full API URL for fetching the currency data.
 */
const CURRENCIES_API_URL = (date, currency) => {
    return `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${currency}.min.json`;
};

/**
 * Fetches the currency data from the API for the specified date and currency.
 * @param {string} date - The date for which to fetch the currency data.
 * @param {string} currency - The base currency for which to fetch the data.
 * @returns {Promise<Response>} - The response from the API.
 * @throws - Will throw an error if the response is not successful.
 */
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

/**
 * Retrieves the currency data for a given date and base currency, and parses the JSON response.
 * @param {string} date - The date for which to fetch currency data.
 * @param {string} currency - The base currency for which to retrieve exchange rates.
 * @returns {Promise<Object>} - A promise that resolves to the parsed JSON object containing the currency data.
 */
async function getCurrenciesData(date, currency) {
    const response = await fetchCurrenciesApi(date, currency);
    const responseData = await response.json();
    return responseData;
}

/**
 * Calculates the exchange rate between two currencies and returns the converted value.
 * @param {string} fromCurrency - The base currency to convert from.
 * @param {string} toCurrency - The target currency to convert to.
 * @param {number} value - The amount to be converted from the base currency.
 * @returns {Promise<string>} - The converted value as a string rounded to two decimal places.
 * @throws - Will throw an error if the conversion rate between the specified currencies is not available.
 */
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

/**
 * Returns the current date in YYYY-MM-DD format.
 * @returns {string} - The current date.
 */
function getCurrentDate() {
    return new Date().toJSON().slice(0, 10);
}
