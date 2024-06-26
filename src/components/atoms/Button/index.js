import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 8px 16px;
  border: none;
  background-color: ${(props) => props.theme.colors.primary.normal};
  color: ${(props) => props.theme.colors.black};
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary.light};
  }
`;

const Button = ({ children, ...restProps }) => {
  return <StyledButton {...restProps}>{children}</StyledButton>;
};

export default Button;
