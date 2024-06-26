import React from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  padding: 6px 16px;
  font-size: ${(props) => props.theme.font.size.md};
  border: 1px solid ${(props) => props.theme.colors.gray.dark};
  border-radius: 4px;
  outline: none;
`;

const Option = styled.option``;

const Select = ({ options, value, onChange, ...restProps }) => {
  return (
    <StyledSelect value={value} onChange={onChange} {...restProps}>
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </StyledSelect>
  );
};

export default Select;
