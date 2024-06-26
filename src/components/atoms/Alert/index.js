import React from "react";
import styled from "styled-components";

const StyledAlert = styled.div`
  padding: 8px 16px;
  background-color: ${(props) =>
    props.$type === "info"
      ? props.theme.colors.gray.dark
      : props.theme.colors.error.dark};
  color: white;
  width: 100%;
`;

const Alert = ({ text, type = "info", ...restProps }) => {
  return (
    <StyledAlert $type={type} {...restProps}>
      {text}
    </StyledAlert>
  );
};

export default Alert;
