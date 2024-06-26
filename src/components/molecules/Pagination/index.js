import React from "react";
import Button from "@/components/atoms/Button";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  ...restProps
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <PaginationContainer {...restProps}>
      {currentPage !== 1 && (
        <Button onClick={handlePrevious} css="margin-right:16px;">
          {"<"}
        </Button>
      )}
      <span>{`Page ${currentPage} sur ${totalPages}`}</span>
      {currentPage !== totalPages && (
        <Button onClick={handleNext} css="margin-left:16px;">
          {">"}
        </Button>
      )}
    </PaginationContainer>
  );
};

export default Pagination;
