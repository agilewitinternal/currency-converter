import {API_URLS} from '../utility/Constants';

// Fetch all currencies
export const fetchCurrencies = async () => {
  const response = await fetch(API_URLS.FETCH_COMMON_CURRENCY);
  const data = await response.json();
  return Object.values(formatCurrenciesResponse(data));
};

// Adding currency code to the data
const formatCurrenciesResponse = (response) => {
  let data = { ...response };
  for (let key in data) {
    data[key].code_key = key;
  }
  return data;
};

// Fetch latest exchange rates
export const fetchExchangeRates = async () => {
  const response = await fetch(API_URLS.EXCHANGE_RATES_API);
  const data = await response.json();
  return data.rates;
};
