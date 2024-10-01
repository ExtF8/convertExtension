const CURRENCIES_API_URL = () => {
    return `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.min.json`;
};


async function fetchCurreciesApi() {
    try {
        const response = await fetch(CURRENCIES_API_URL(), {
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


async function getCurreciesData() {
    const response = await fetchCurreciesApi();
    const responseData = await response.json();
    console.log(responseData.eur.usd)
    return responseData;
}


await getCurreciesData()