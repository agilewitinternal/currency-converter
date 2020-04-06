import React from "react";

function CurrencySelector({ label, options, value, onChange, style }) {
  return (
    <div className="row" style={style}>
      <label>{label}: </label>
      <select  className="css-currency-selector" value={value} onChange={onChange}>
        <option value="">Select currency</option>
        {options &&
          options.map((option, index) => (
            <option key={index} value={option.code_key}>
              {option.name}
            </option>
          ))}
      </select>
    </div>
  );
}

export default CurrencySelector;
