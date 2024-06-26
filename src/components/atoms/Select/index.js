import React from "react";

const Select = ({ options, value, onChange, ...restProps }) => {
  return (
    <select value={value} onChange={onChange} {...restProps}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
