import React from "react";

const Input = ({ children, ...restProps }) => {
  return <input {...restProps}>{children}</input>;
};

export default Input;
