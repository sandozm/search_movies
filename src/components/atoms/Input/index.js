import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 8px 16px;
  border: 1px solid ${(props) => props.theme.colors.gray.dark};
  border-radius: 4px;
`;

const Input = ({ children, ...restProps }) => {
  return <StyledInput {...restProps}>{children}</StyledInput>;
};

export default Input;
