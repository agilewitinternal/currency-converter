// Returns the currency symbol
export function getSymbol(data, code) {
  const res = data.filter((d) => d.code_key === code);
  if (res && res.length > 0) return res[0].symbol;
}

// Formats amount value to 2 decimal places and appends currency symbol
export function formatAmount(value, symbol) {
  let amt = value.split(".").join("");
  amt = parseInt(amt);
  if (amt > 0) {
    amt = (amt * 0.01).toFixed(2);
    return `${symbol} ${amt}`;
  } else {
    return `${symbol} 0.00`;
  }
}

//To verify currency availability
export function isCurrencyAvailable(data, code) {
  const currency = data[code];
  if (currency) {
    return { currency, error: false };
  }
  return {
    error: true,
    message: "Currency not available",
  };
}

export function getAmountValue(amount, symbol) {
  // Check if currency symbol is present
  if (amount.indexOf(symbol) !== -1) {
    const arr = amount.split(symbol);
    return arr[1];
  }
  return amount;
}

//To verify the empty string
export function isEmptyString(value) {
  return !value || value === "";
}
