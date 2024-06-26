import React from "react";

const Button = ({ children, ...restProps }) => {
  return <button {...restProps}>{children}</button>;
};

export default Button;
