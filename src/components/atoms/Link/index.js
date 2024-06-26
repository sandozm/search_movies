import React from "react";
import NextLink from "next/link";
import styled from "styled-components";

const StyledLink = styled(NextLink)`
  color: ${({ theme }) => theme.colors.primary.normal};
  text-decoration: none;
  cursor: pointer;
`;

const Link = ({ href, children, ...restProps }) => {
  return (
    <StyledLink href={href} passHref {...restProps}>
      {children}
    </StyledLink>
  );
};

export default Link;
