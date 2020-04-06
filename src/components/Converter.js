import React, { useState, useEffect } from "react";
import CurrencySelector from "./CurrencySelector";
import {
  getSymbol,
  formatAmount,
  isCurrencyAvailable,
  isEmptyString,
  getAmountValue,
} from "../utility/Utils";
import { fetchCurrencies, fetchExchangeRates } from "../services/Services";

const fx = require("money");

function Converter(props) {
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("0.00");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [fromSymbol, setFromSymbol] = useState("");
  const [toSymbol, setToSymbol] = useState("");
  const [fromErrorMessage, setFromErrorMessage] = useState("");
  const [toErrorMessage, setToErrorMessage] = useState("");

  useEffect(() => {
    Promise.all([fetchCurrencies(), fetchExchangeRates()]).then(
      ([allCurrencies, rates]) => {
        setCurrencies(allCurrencies);
        // Set exchange rates to money.js library
        fx.rates = rates;
      }
    );
  }, []);

  // Function to handle change in from currency selection
  const onFromCurrencyChange = (event) => {
    const code = event.target.value;
    const response = isCurrencyAvailable(fx.rates, code);
    const symbol = getSymbol(currencies, code);
    setFromCurrency(code);
    setFromSymbol(symbol);
    setAmount(`${symbol} 0.00`);
    // If currency is not available in money.js then display error message
    setFromErrorMessage(response.message);
    setConvertedAmount("0.00");
  };

  // Function to handle change in to currency selection
  const onToCurrencyChange = (event) => {
    const code = event.target.value;
    setToCurrency(code);
    setToSymbol(getSymbol(currencies, code));
    const response = isCurrencyAvailable(fx.rates, code);
    // If currency is not available in money.js then display error message
    setToErrorMessage(response.message);
    setConvertedAmount("0.00");
  };

  // Function to handle change in amount text field
  const onAmountChange = (event) => {
    const value = getAmountValue(event.target.value, fromSymbol);
    if (!isNaN(value)) {
      setAmount(formatAmount(value, fromSymbol));
      setConvertedAmount("0.00");
    }
  };

  // Converts the selected currenices
  const onConvert = () => {
    const amt = getAmountValue(amount, fromSymbol);
    const value = fx.convert(amt, { from: fromCurrency, to: toCurrency });
    setConvertedAmount(`${toSymbol} ${value.toFixed(2)}`);
  };

  // Button is enabled when the proper currencies are selected
  const isButtonDisabled = () =>
    isEmptyString(fromCurrency) ||
    isEmptyString(toCurrency) ||
    !isEmptyString(fromErrorMessage) ||
    !isEmptyString(toErrorMessage);

  return (
    <div className="converter">
      <h1 className="header">Currency Converter</h1>
      <div className="row" style={{ justifyContent: "center", paddingTop: 50 }}>
        <CurrencySelector
          style={{ marginRight: 20 }}
          label="From"
          options={currencies}
          value={fromCurrency}
          onChange={onFromCurrencyChange}
        />
        <CurrencySelector
          label="To"
          options={currencies}
          value={toCurrency}
          onChange={onToCurrencyChange}
        />
      </div>
      <div className="row">
        <p className="error-message" style={{ marginRight: 20 }}>
          {fromErrorMessage}
        </p>
        <p className="error-message">{toErrorMessage}</p>
      </div>

      <div className="amount-field">
        <label>Amount: </label>
        <input type="text" value={amount} onChange={onAmountChange} />
      </div>

      <div className="convert-button">
        <button disabled={isButtonDisabled()} onClick={onConvert}>
          Convert
        </button>
      </div>

      <div className="output">
        <label>{convertedAmount}</label>
      </div>
    </div>
  );
}

export default Converter;
