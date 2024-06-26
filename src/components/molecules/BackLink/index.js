import React from "react";
import Link from "@/components/atoms/Link";
import styled from "styled-components";

const StyledLink = styled(Link)`
  display: flex;
  gap: 8px;
`;

const BackLink = () => {
  return (
    <StyledLink href="/">
      <span>←</span>
      <span>Retour</span>
    </StyledLink>
  );
};

export default BackLink;
